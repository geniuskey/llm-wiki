import os
import requests
import logging

logger = logging.getLogger(__name__)

class RagClient:
    """
    RAGaaS (RAG as a Service) API 연동을 위한 클라이언트.
    추후 자체 RAG 시스템(오픈소스 VectorDB 등)으로 전환할 때,
    이 클래스의 내부 구현만 변경하면 비즈니스 로직에 영향을 주지 않습니다.
    """
    def __init__(self):
        # 환경 변수에서 RAGaaS API 정보 로드
        self.api_url = os.environ.get("RAGAAS_API_URL", "https://api.example-ragaas.com/v1")
        self.api_key = os.environ.get("RAGAAS_API_KEY", "dummy_token")
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def insert_doc(self, doc_id: str, content: str, metadata: dict = None):
        """
        문서를 RAGaaS에 업로드 (인덱싱)
        """
        metadata = metadata or {}
        print(f"[RAGaaS] Insert Doc - ID: {doc_id}, Metadata: {metadata}, Content Length: {len(content)}")
        
        # 실제 API 호출 예시 (현재는 주석 처리하여 Mocking)
        # payload = {
        #     "id": doc_id,
        #     "text": content,
        #     "metadata": metadata
        # }
        # try:
        #     response = requests.post(f"{self.api_url}/documents", json=payload, headers=self.headers)
        #     response.raise_for_status()
        # except requests.RequestException as e:
        #     logger.error(f"RAGaaS insert_doc failed: {e}")
        #     return False
            
        return True

    def delete_doc(self, doc_id: str):
        """
        RAGaaS에서 문서 삭제 (업데이트 시 delete 후 insert 수행)
        """
        print(f"[RAGaaS] Delete Doc - ID: {doc_id}")
        
        # 실제 API 호출 예시
        # try:
        #     response = requests.delete(f"{self.api_url}/documents/{doc_id}", headers=self.headers)
        #     response.raise_for_status()
        # except requests.RequestException as e:
        #     logger.error(f"RAGaaS delete_doc failed: {e}")
        #     return False
            
        return True
        
    def update_doc(self, doc_id: str, content: str, metadata: dict = None):
        """
        편의를 위한 업데이트 메서드 (delete 후 insert)
        """
        self.delete_doc(doc_id)
        return self.insert_doc(doc_id, content, metadata)

    def retrieve(self, query: str, filters: dict = None, top_k: int = 5):
        """
        주어진 쿼리와 메타데이터 필터를 기반으로 관련 문서를 검색
        """
        filters = filters or {}
        print(f"[RAGaaS] Retrieve - Query: '{query}', Filters: {filters}, Top K: {top_k}")
        
        # 실제 API 호출 예시
        # payload = {
        #     "query": query,
        #     "filters": filters,
        #     "top_k": top_k
        # }
        # try:
        #     response = requests.post(f"{self.api_url}/retrieve", json=payload, headers=self.headers)
        #     response.raise_for_status()
        #     return response.json().get("results", [])
        # except requests.RequestException as e:
        #     logger.error(f"RAGaaS retrieve failed: {e}")
        #     return []
        
        # 데모용 Mock 응답
        return [
            {
                "id": "mock_doc_1",
                "text": f"Mock result for query '{query}'",
                "score": 0.95,
                "metadata": {"source": "mock"}
            }
        ]
