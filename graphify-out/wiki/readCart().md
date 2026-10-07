# readCart()

> God node · 5 connections · [C:\Users\alexi\OneDrive\Desktop\project\WePub\src\cartStore.js](file:///C:/Users/alexi/OneDrive/Desktop/project/WePub/src/cartStore.js#L8)

## Call Trace Diagram

```mermaid
sequenceDiagram
    participant P0 as readCart()
    participant P1 as getCart()
    participant P2 as CheckoutPage()
    participant P3 as btnStyle()
    participant P4 as useToast()
    participant P5 as AuthHomePage()
    participant P6 as addToCart()
    participant P7 as writeCart()
    participant P8 as updateQuantity()
    participant P9 as removeFromCart()
    participant P10 as clearCart()
    P0->>+ P1: calls
    P1-->>- P0: return
    P1->>+ P0: calls
    P0-->>- P1: return
    P1->>+ P2: calls
    P2-->>- P1: return
    P2->>+ P3: calls
    P3-->>- P2: return
    P2->>+ P4: calls
    P4-->>- P2: return
    P2->>+ P1: calls
    P1-->>- P2: return
    P1->>+ P5: calls
    P5-->>- P1: return
    P5->>+ P3: calls
    P3-->>- P5: return
    P5->>+ P1: calls
    P1-->>- P5: return
    P0->>+ P6: calls
    P6-->>- P0: return
    P6->>+ P0: calls
    P0-->>- P6: return
    P6->>+ P7: calls
    P7-->>- P6: return
    P7->>+ P6: calls
    P6-->>- P7: return
    P7->>+ P8: calls
    P8-->>- P7: return
    P7->>+ P9: calls
    P9-->>- P7: return
    P7->>+ P10: calls
    P10-->>- P7: return
    P0->>+ P8: calls
    P8-->>- P0: return
    P0->>+ P9: calls
    P9-->>- P0: return
```

## Connections by Relation

### calls
- [[getCart()]] `EXTRACTED`
- [[addToCart()]] `EXTRACTED`
- [[updateQuantity()]] `EXTRACTED`
- [[removeFromCart()]] `EXTRACTED`

### contains
- [[cartStore.js]] `EXTRACTED`

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*