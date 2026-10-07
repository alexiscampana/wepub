# writeCart()

> God node · 5 connections · [C:\Users\alexi\OneDrive\Desktop\project\WePub\src\cartStore.js](file:///C:/Users/alexi/OneDrive/Desktop/project/WePub/src/cartStore.js#L17)

## Call Trace Diagram

```mermaid
sequenceDiagram
    participant P0 as writeCart()
    participant P1 as addToCart()
    participant P2 as readCart()
    participant P3 as getCart()
    participant P4 as updateQuantity()
    participant P5 as removeFromCart()
    participant P6 as clearCart()
    P0->>+ P1: calls
    P1-->>- P0: return
    P1->>+ P2: calls
    P2-->>- P1: return
    P2->>+ P3: calls
    P3-->>- P2: return
    P2->>+ P1: calls
    P1-->>- P2: return
    P2->>+ P4: calls
    P4-->>- P2: return
    P2->>+ P5: calls
    P5-->>- P2: return
    P1->>+ P0: calls
    P0-->>- P1: return
    P0->>+ P4: calls
    P4-->>- P0: return
    P4->>+ P2: calls
    P2-->>- P4: return
    P4->>+ P0: calls
    P0-->>- P4: return
    P0->>+ P5: calls
    P5-->>- P0: return
    P5->>+ P2: calls
    P2-->>- P5: return
    P5->>+ P0: calls
    P0-->>- P5: return
    P0->>+ P6: calls
    P6-->>- P0: return
    P6->>+ P0: calls
    P0-->>- P6: return
```

## Connections by Relation

### calls
- [[addToCart()]] `EXTRACTED`
- [[updateQuantity()]] `EXTRACTED`
- [[removeFromCart()]] `EXTRACTED`
- [[clearCart()]] `EXTRACTED`

### contains
- [[cartStore.js]] `EXTRACTED`

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*