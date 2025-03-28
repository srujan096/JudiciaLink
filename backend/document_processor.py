import os
import PyPDF2
from docx import Document
from typing import Tuple, Dict
import re

def process_document(file_path: str) -> Tuple[str, Dict]:
    """
    Process PDF and DOCX files without textract dependency
    """
    text = ""
    metadata = {
        "pages": 0,
        "sections": [],
        "keywords": [],
        "entities": []
    }

    try:
        # PDF Processing
        if file_path.endswith('.pdf'):
            with open(file_path, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                metadata['pages'] = len(reader.pages)
                for page in reader.pages:
                    text += page.extract_text() or ""
        
        # DOCX Processing
        elif file_path.endswith(('.doc', '.docx')):
            doc = Document(file_path)
            for para in doc.paragraphs:
                text += para.text + '\n'
                if para.style.name and para.style.name.startswith('Heading'):
                    metadata['sections'].append(para.text)
        
        # TXT Processing
        elif file_path.endswith('.txt'):
            with open(file_path, 'r', encoding='utf-8') as f:
                text = f.read()
        
        else:
            raise ValueError("Unsupported file type. Only PDF/DOCX/TXT files are supported.")

        # Extract legal keywords
        legal_keywords = ['section', 'act', 'article', 'court', 'judge', 
                        'plaintiff', 'defendant', 'petitioner', 'respondent',
                        'order', 'judgment', 'appeal', 'bail', 'contract']
        
        words = re.findall(r'\b\w+\b', text.lower())
        metadata['keywords'] = [word for word in words if word in legal_keywords]
        
        # Extract legal entities
        metadata['entities'] = re.findall(
            r'\b(?:Section|Act|Article|Rule|Regulation)\s+[A-Za-z0-9]+\b', 
            text, flags=re.IGNORECASE
        )
        
        return text[:50000], metadata  # Limit text size
    
    except Exception as e:
        raise Exception(f"Document processing failed: {str(e)}")