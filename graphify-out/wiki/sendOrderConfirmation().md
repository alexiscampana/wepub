# sendOrderConfirmation()

> God node · 4 connections · [C:\Users\alexi\OneDrive\Desktop\project\WePub\src\emailNotifications.js](file:///C:/Users/alexi/OneDrive/Desktop/project/WePub/src/emailNotifications.js#L42)

## Call Trace Diagram

```mermaid
sequenceDiagram
    participant P0 as sendOrderConfirmation()
    participant P1 as sendEmail()
    participant P2 as sendShippingNotification()
    participant P3 as sendLowStockAlert()
    participant P4 as sendWelcomeEmail()
    participant P5 as formatItems()
    participant P6 as formatCurrency()
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
    P1->>+ P4: calls
    P4-->>- P1: return
    P4->>+ P1: calls
    P1-->>- P4: return
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
- [[sendEmail()]] `EXTRACTED`
- [[formatItems()]] `EXTRACTED`
- [[formatCurrency()]] `EXTRACTED`

### contains
- [[emailNotifications.js]] `EXTRACTED`

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*