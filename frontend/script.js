// Chat functionality
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message === "") return;

    const chatWindow = document.getElementById('chat-messages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = `You: ${message}`;
    chatWindow.appendChild(userMessage);

    input.value = '';

    // Add bot message container
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.textContent = 'Judiciary Bot: ';
    chatWindow.appendChild(botMessage);

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept-Language': document.documentElement.lang || 'en'
            },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        await streamResponse(response, botMessage, chatWindow);
    } catch (error) {
        botMessage.textContent = `Judiciary Bot: Sorry, I am unable to process your request at the moment. (Error: ${error.message})`;
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function streamResponse(response, botMessage, chatWindow) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let botResponse = 'Judiciary Bot: ';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        botResponse += chunk;
        
        // Update the content while preserving newlines
        botMessage.innerHTML = botResponse.replace(/\n/g, '<br>');
        
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

// Voice recognition
const voiceBtn = document.getElementById('voice-btn');
let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = document.documentElement.lang === 'hi' ? 'hi-IN' : 'en-IN';

    voiceBtn.addEventListener('click', () => {
        if (recognition) {
            voiceBtn.classList.add('listening');
            recognition.start();
        }
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('chat-input').value = transcript;
        voiceBtn.classList.remove('listening');
    };

    recognition.onerror = () => {
        voiceBtn.classList.remove('listening');
    };

    recognition.onend = () => {
        voiceBtn.classList.remove('listening');
    };
} else {
    voiceBtn.style.display = 'none';
}

// Language controls
const languageToggle = document.getElementById('language-toggle');
languageToggle.addEventListener('click', () => {
    const options = document.querySelector('.language-options');
    options.style.display = options.style.display === 'none' ? 'block' : 'none';
});

document.querySelectorAll('.language-options button').forEach(button => {
    button.addEventListener('click', async (e) => {
        const lang = e.target.dataset.lang;
        try {
            const response = await fetch('/set_language', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language: lang })
            });
            
            if (response.ok) {
                document.documentElement.lang = lang;
                const toggleText = {
                    'en': 'Switch Language',
                    'hi': 'भाषा बदलें',
                    'ta': 'மொழியை மாற்றவும்',
                    'bn': 'ভাষা পরিবর্তন করুন'
                };
                languageToggle.textContent = toggleText[lang] || 'Switch Language';
                
                // Update speech recognition language
                if (recognition) {
                    recognition.lang = lang === 'hi' ? 'hi-IN' : 
                                     lang === 'ta' ? 'ta-IN' : 
                                     lang === 'bn' ? 'bn-IN' : 'en-IN';
                }
                
                document.querySelector('.language-options').style.display = 'none';
            }
        } catch (error) {
            console.error('Language switch failed:', error);
        }
    });
});

// Document upload
document.getElementById('upload-btn').addEventListener('click', async () => {
    const fileInput = document.getElementById('document-input');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const chatWindow = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = `You: Uploaded ${file.name}`;
    chatWindow.appendChild(userMessage);

    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.textContent = 'Judiciary Bot: Processing your document... ';
    chatWindow.appendChild(botMessage);

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:5000/upload_document', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept-Language': document.documentElement.lang || 'en'
            }
        });

        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        botMessage.textContent = 'Judiciary Bot: ';
        await streamResponse(response, botMessage, chatWindow);
    } catch (error) {
        botMessage.textContent = `Judiciary Bot: Error processing document: ${error.message}`;
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
});