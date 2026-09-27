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