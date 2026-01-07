# RAG vs LLM 학습 프로젝트

아래는 프로젝트의 간단한 폴더 구조입니다.

```
.
├── backend
│   ├── app
│   │   ├── __init__.py
│   │   ├── db.py
│   │   └── main.py
│   └── requirements.txt
└── frontend
    ├── app.js
    ├── index.html
    └── styles.css
```

## 환경 변수

아래 환경 변수는 백엔드 실행 시 필요합니다.

- `MONGODB_URI`: MongoDB Atlas 접속 문자열
- `MONGODB_DB`: 데이터베이스 이름 (기본값: `rag_learning`)
- `MONGODB_COLLECTION`: 컬렉션 이름 (기본값: `rag_documents`)
- `VECTOR_INDEX_NAME`: Vector Search 인덱스 이름 (기본값: `rag_vector_index`)
- `OPENAI_API_KEY`: OpenAI API 키

## 실행 방법 (예시)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

프론트엔드는 `frontend/index.html`을 브라우저에서 열어 사용합니다.
