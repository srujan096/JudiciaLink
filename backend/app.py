import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))
from flask import Flask, request, jsonify, send_from_directory, Response
from flask_cors import CORS
from document_processor import process_document
from translation_service import TranslationService
import os
import logging
import json
import re
from werkzeug.utils import secure_filename
import requests

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

FRONTEND_DIR = os.path.join(os.path.dirname(__file__), '../frontend')
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'txt'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

translator = TranslationService()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def serve_frontend():
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(FRONTEND_DIR, path)

@app.route('/set_language', methods=['POST'])
def set_language():
    data = request.get_json()
    lang = data.get('language', 'en')
    return jsonify({"message": f"Language set to {lang}", "status": "success"})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"error": "No message provided"}), 400

        user_message = data["message"].strip()
        if not user_message:
            return jsonify({"error": "Empty message"}), 400

        language = request.headers.get('Accept-Language', 'en')
        
        if language != 'en':
            user_message = translator.translate_text(user_message, 'en')

        logger.info(f"User message ({language}): {user_message}")

        system_prompt = """
        **You are an AI assistant designed to provide information and guidance related to the Indian Judiciary system.**
        - **Scope:** Only answer questions related to Indian laws, court procedures, legal rights, case filing, and related topics.
        - **Response Rules:**
          1. **Be informative and accurate:** Provide clear and accurate information based on Indian laws and judicial procedures.
          2. **Avoid legal advice:** Do NOT provide legal advice or act as a substitute for professional legal counsel.
          3. **Provide resources:** Offer helpful resources such as links to legal acts, court services, and legal aid organizations.
          4. **No internal monologue:** Do NOT generate `<think>`, `</think>`, or any reasoning steps.
          5. **Direct answers:** Provide clear, concise responses without unnecessary explanations.
        """

        full_prompt = f"{system_prompt}\n\nUser: {user_message}\nAssistant:"

        ollama_response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "llama3", "prompt": full_prompt, "stream": True},
            stream=True
        )

        if ollama_response.status_code != 200:
            logger.error(f"Ollama error: {ollama_response.text}")
            return jsonify({"error": "Failed to connect to the AI model"}), 500

        def generate():
            complete_response = ""
            for chunk in ollama_response.iter_lines():
                if chunk:
                    decoded_chunk = chunk.decode('utf-8')
                    try:
                        chunk_json = json.loads(decoded_chunk)
                        response_text = chunk_json.get("response", "")
                        # Only remove think tags, preserve other formatting
                        response_text = re.sub(r'<think>.*?</think>', '', response_text, flags=re.DOTALL)
                        
                        complete_response += response_text
                        
                        if language != 'en':
                            translated = translator.translate_text(response_text, language)
                            yield translated
                        else:
                            yield response_text
                    except json.JSONDecodeError:
                        yield ""

        return Response(generate(), content_type='text/plain')

    except Exception as e:
        logger.error(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/upload_document', methods=['POST'])
def upload_document():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        language = request.headers.get('Accept-Language', 'en')
        
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            logger.info(f"Document uploaded: {filename}")
            
            text, metadata = process_document(file_path)
            
            system_prompt = f"""
            **Summarize this legal document with focus on:**
            - Key legal points relevant to Indian law
            - Important sections and clauses
            - Potential legal implications
            - Suggested next steps for the user
            
            **Document Metadata:**
            - Pages: {metadata.get('pages', 0)}
            - Sections: {', '.join(metadata.get('sections', []))}
            - Keywords: {', '.join(metadata.get('keywords', []))}
            
            **Important:** 
            - Provide the summary in clear, simple language
            - Include relevant Indian legal references if possible
            - Add a disclaimer that this is not legal advice
            """
            
            full_prompt = f"{system_prompt}\n\nDocument Text:\n{text[:10000]}\n\nSummary:"
            
            ollama_response = requests.post(
                "http://localhost:11436/api/generate",
                json={"model": "llama3.1", "prompt": full_prompt, "stream": True},
                stream=True
            )
            
            if ollama_response.status_code != 200:
                logger.error(f"Ollama error: {ollama_response.text}")
                return jsonify({"error": "Failed to process the document"}), 500
            
            def generate():
                complete_response = ""
                for chunk in ollama_response.iter_lines():
                    if chunk:
                        decoded_chunk = chunk.decode('utf-8')
                        try:
                            chunk_json = json.loads(decoded_chunk)
                            response_text = chunk_json.get("response", "")
                            response_text = re.sub(r'<think>.*?</think>', '', response_text, flags=re.DOTALL)
                            
                            complete_response += response_text
                            
                            if language != 'en':
                                translated = translator.translate_text(response_text, language)
                                yield translated
                            else:
                                yield response_text
                        except json.JSONDecodeError:
                            yield ""
                
                # Add disclaimer
                disclaimer = "\n\nDisclaimer: This summary is for informational purposes only and does not constitute legal advice."
                if language != 'en':
                    disclaimer = translator.translate_text(disclaimer, language)
                yield disclaimer
            
            return Response(generate(), content_type='text/plain')
        else:
            return jsonify({"error": "File type not allowed"}), 400
            
    except Exception as e:
        logger.error(f"Error in document upload: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)