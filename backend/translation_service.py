from typing import Optional
import requests

class TranslationService:
    def __init__(self):
        self.language_codes = {
            'en': 'english',
            'hi': 'hindi',
            'ta': 'tamil',
            'bn': 'bengali'
        }
    
    def translate_text(self, text: str, target_lang: str = 'hi') -> str:
        """Simple translation using LibreTranslate API (self-hosted option available)"""
        if not text or target_lang not in self.language_codes:
            return text
        
        try:
            params = {
                'q': text,
                'source': 'en',
                'target': target_lang,
                'format': 'text'
            }
            response = requests.post(
                'https://libretranslate.de/translate',
                data=params
            )
            return response.json().get('translatedText', text)
        except:
            return text  # Fallback to original text