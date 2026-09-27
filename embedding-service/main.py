from fastapi import FastAPI
from sentence_transformers import SentenceTransformer

app = FastAPI()

model = SentenceTransformer("all-MiniLM-L6-v2", device="cuda")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/embed")
def embed(data: dict):
    temp = {}
    for i in data:
        text = data[i]
        embedding = model.encode(text).tolist()
        temp[i] = embedding
    return temp