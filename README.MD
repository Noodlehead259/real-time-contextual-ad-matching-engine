## 1. What problem am I solving?

We currently have a page:

> **"best budget travel destinations in europe with cheap flights and hotels"**

And We have several ads:

> **"affordable european vacation packages and cheap hotels"**
>
> **"buy the latest gaming laptops with powerful graphics cards"**
>
> **"compare cheap flights and find the best travel deals"**

We need to determine which ads are **semantically relevant** to the page.

### Why keyword matching isn't enough

A simple approach would be keyword matching:

**Page:**

> "budget travel destinations in europe"

**Ad:**

> "affordable european vacation packages"

There aren't many exact matching words.

But we can understand that:

- `budget` ≈ `affordable`
- `travel` ≈ `vacation`
- `destinations` ≈ `european vacation packages`

So the page and ad are clearly related even though they don't use the exact same words.

Therefore, **keyword matching isn't enough**.

### My approach

That's why I'm using **embeddings**.

I convert the page and ad text into numerical vectors that capture their **semantic meaning**.

I can then compare these vectors to measure how semantically similar the page and each ad are, rather than simply comparing individual words.

---

## 2. Current Architecture

The embedding part of the system currently works as a separate Python microservice:

```text
Node.js / Express
        |
        | HTTP
        v
Python / FastAPI
        |
        v
SentenceTransformer
        |
        v
NVIDIA RTX 5050 GPU
        |
        v
384-dimensional embeddings
```

The Python service exposes:

- `GET /health` — checks whether the service is running.
- `POST /embed` — converts one or multiple pieces of text into embeddings.

The model currently being used is:

```text
all-MiniLM-L6-v2
```

It produces a 384-dimensional vector for each input text.

---

## 3. GPU Acceleration

I am running the embedding model on the NVIDIA RTX 5050 Laptop GPU instead of the CPU.

The model is loaded with:

```python
model = SentenceTransformer("all-MiniLM-L6-v2", device="cuda")
```

The environment was verified with:

```text
PyTorch: 2.14.0+cu130
CUDA available: True
GPU: NVIDIA GeForce RTX 5050 Laptop GPU
```

---

## 4. Batched Embedding Inference

Instead of sending each text to the embedding model separately, I send multiple texts together in a single request.

For example, multiple ads can be embedded as one batch:

```text
ad1 ─┐
ad2 ─┤
ad3 ─┼──> SentenceTransformer ──> embeddings
ad4 ─┤
ad5 ─┘
```
---

## 5. Relevance Scoring

After generating the page and ad embeddings, I calculate the semantic relevance between them using **cosine similarity**.

```text
cosine similarity(page embedding, ad embedding) = relevance score
```

---

## 6. Ranking Strategy

After calculating the relevance score, candidate ads are ranked using three signals:

- **Relevance** — semantic similarity between page content and ad copy
- **Bid** — amount the advertiser is willing to pay
- **CTR** — historical click-through rate of the ad

The bid and CTR values are normalized before combining them with the relevance score.

```text
relevance score ──┐
                  │
normalized bid ──┼──> weighted ranking score ──> top N ads
                  │
normalized CTR ──┘
```

---

## 7. Top-N Ad Selection

The ranking service sorts candidate ads by their final ranking score and returns only the top N results.

For example, `/match` currently requests the top 3 ads:

```text
candidate ads
      |
      v
calculate final scores
      |
      v
sort by score
      |
      v
take top 3
      |
      v
API response
```