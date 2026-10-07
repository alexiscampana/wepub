# sendEmail()

> God node · 5 connections · [C:\Users\alexi\OneDrive\Desktop\project\WePub\src\emailNotifications.js](file:///C:/Users/alexi/OneDrive/Desktop/project/WePub/src/emailNotifications.js#L24)

## Call Trace Diagram

```mermaid
sequenceDiagram
    participant P0 as sendEmail()
    participant P1 as sendOrderConfirmation()
    participant P2 as formatItems()
    participant P3 as formatCurrency()
    participant P4 as sendShippingNotification()
    participant P5 as sendLowStockAlert()
    participant P6 as sendWelcomeEmail()
    P0->>+ P1: calls
    P1-->>- P0: return
    P1->>+ P0: calls
    P0-->>- P1: return
    P1->>+ P2: calls
    P2-->>- P1: return
    P2->>+ P1: calls
    P1-->>- P2: return
    P1->>+ P3: calls
    P3-->>- P1: return
    P3->>+ P1: calls
    P1-->>- P3: return
    P0->>+ P4: calls
    P4-->>- P0: return
    P4->>+ P0: calls
    P0-->>- P4: return
    P0->>+ P5: calls
    P5-->>- P0: return
    P5->>+ P0: calls
    P0-->>- P5: return
    P0->>+ P6: calls
    P6-->>- P0: return
    P6->>+ P0: calls
    P0-->>- P6: return
```

## Connections by Relation

### calls
- [[sendOrderConfirmation()]] `EXTRACTED`
- [[sendShippingNotification()]] `EXTRACTED`
- [[sendLowStockAlert()]] `EXTRACTED`
- [[sendWelcomeEmail()]] `EXTRACTED`

### contains
- [[emailNotifications.js]] `EXTRACTED`

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*