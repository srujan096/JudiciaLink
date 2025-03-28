import requests
from config import LEGAL_DB_API_KEY

class LegalDBClient:
    def __init__(self):
        self.base_url = "https://api.indialegal.info/v1"
        self.headers = {"Authorization": f"Bearer {LEGAL_DB_API_KEY}"}

    def search_act(self, act_name: str):
        response = requests.get(
            f"{self.base_url}/acts",
            params={"query": act_name},
            headers=self.headers
        )
        return response.json()

    def get_case_law(self, keywords: list):
        response = requests.post(
            f"{self.base_url}/cases/search",
            json={"keywords": keywords},
            headers=self.headers
        )
        return response.json()