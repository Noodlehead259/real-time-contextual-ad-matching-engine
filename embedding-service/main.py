from fastapi import FastAPI
from sentence_transformers import SentenceTransformer

app = FastAPI()

model = SentenceTransformer("all-MiniLM-L6-v2", device="cuda")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/embed")
def embed(data: dict):
    ids = list(data.keys())
    texts = list(data.values())

    embeddings = model.encode(texts).tolist()

    return dict(zip(ids, embeddings))