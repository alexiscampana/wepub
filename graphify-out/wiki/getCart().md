# getCart()

> God node · 4 connections · [C:\Users\alexi\OneDrive\Desktop\project\WePub\src\cartStore.js](file:///C:/Users/alexi/OneDrive/Desktop/project/WePub/src/cartStore.js#L26)

## Call Trace Diagram

```mermaid
sequenceDiagram
    participant P0 as getCart()
    participant P1 as readCart()
    participant P2 as addToCart()
    participant P3 as writeCart()
    participant P4 as updateQuantity()
    participant P5 as removeFromCart()
    participant P6 as CheckoutPage()
    participant P7 as btnStyle()
    participant P8 as AddProductPage()
    participant P9 as ConsentBanner()
    participant P10 as MFASetup()
    participant P11 as AdminPanel()
    participant P12 as AuthHomePage()
    participant P13 as CareersPage()
    participant P14 as CartPage()
    participant P15 as ContactPage()
    participant P16 as EnterprisePage()
    participant P17 as LoginPage()
    participant P18 as NewsletterPage()
    participant P19 as PartnerPage()
    participant P20 as ProductPage()
    participant P21 as SignupPage()
    participant P22 as StorePage()
    participant P23 as UserProfilePage()
    participant P24 as WishlistPage()
    participant P25 as WritePostPage()
    participant P26 as HomePage()
    participant P27 as SharedNav()
    participant P28 as AboutPage()
    participant P29 as BlogPage()
    participant P30 as BlogPostPage()
    participant P31 as ChangelogPage()
    participant P32 as CommercePage()
    participant P33 as ComparisonPage()
    participant P34 as ConsentPolicyPage()
    participant P35 as ContentPage()
    participant P36 as Dashboard()
    participant P37 as FeaturesPage()
    participant P38 as HelpCenterPage()
    participant P39 as LegalPage()
    participant P40 as NotFoundPage()
    participant P41 as NotificationsPage()
    participant P42 as OnboardingFlow()
    participant P43 as OrdersPage()
    participant P44 as PricingPage()
    participant P45 as ProductLandingPage()
    participant P46 as ReferralPage()
    participant P47 as SearchPage()
    participant P48 as SaveBar()
    participant P49 as StatusPage()
    participant P50 as TestimonialsPage()
    participant P51 as useToast()
    P0->>+ P1: calls
    P1-->>- P0: return
    P1->>+ P0: calls
    P0-->>- P1: return
    P1->>+ P2: calls
    P2-->>- P1: return
    P2->>+ P1: calls
    P1-->>- P2: return
    P2->>+ P3: calls
    P3-->>- P2: return
    P1->>+ P4: calls
    P4-->>- P1: return
    P4->>+ P1: calls
    P1-->>- P4: return
    P4->>+ P3: calls
    P3-->>- P4: return
    P1->>+ P5: calls
    P5-->>- P1: return
    P5->>+ P1: calls
    P1-->>- P5: return
    P5->>+ P3: calls
    P3-->>- P5: return
    P0->>+ P6: calls
    P6-->>- P0: return
    P6->>+ P7: calls
    P7-->>- P6: return
    P7->>+ P8: calls
    P8-->>- P7: return
    P7->>+ P6: calls
    P6-->>- P7: return
    P7->>+ P9: calls
    P9-->>- P7: return
    P7->>+ P10: calls
    P10-->>- P7: return
    P7->>+ P11: calls
    P11-->>- P7: return
    P7->>+ P12: calls
    P12-->>- P7: return
    P7->>+ P13: calls
    P13-->>- P7: return
    P7->>+ P14: calls
    P14-->>- P7: return
    P7->>+ P15: calls
    P15-->>- P7: return
    P7->>+ P16: calls
    P16-->>- P7: return
    P7->>+ P17: calls
    P17-->>- P7: return
    P7->>+ P18: calls
    P18-->>- P7: return
    P7->>+ P19: calls
    P19-->>- P7: return
    P7->>+ P20: calls
    P20-->>- P7: return
    P7->>+ P21: calls
    P21-->>- P7: return
    P7->>+ P22: calls
    P22-->>- P7: return
    P7->>+ P23: calls
    P23-->>- P7: return
    P7->>+ P24: calls
    P24-->>- P7: return
    P7->>+ P25: calls
    P25-->>- P7: return
    P7->>+ P26: calls
    P26-->>- P7: return
    P7->>+ P27: calls
    P27-->>- P7: return
    P7->>+ P28: calls
    P28-->>- P7: return
    P7->>+ P29: calls
    P29-->>- P7: return
    P7->>+ P30: calls
    P30-->>- P7: return
    P7->>+ P31: calls
    P31-->>- P7: return
    P7->>+ P32: calls
    P32-->>- P7: return
    P7->>+ P33: calls
    P33-->>- P7: return
    P7->>+ P34: calls
    P34-->>- P7: return
    P7->>+ P35: calls
    P35-->>- P7: return
    P7->>+ P36: calls
    P36-->>- P7: return
    P7->>+ P37: calls
    P37-->>- P7: return
    P7->>+ P38: calls
    P38-->>- P7: return
    P7->>+ P39: calls
    P39-->>- P7: return
    P7->>+ P40: calls
    P40-->>- P7: return
    P7->>+ P41: calls
    P41-->>- P7: return
    P7->>+ P42: calls
    P42-->>- P7: return
    P7->>+ P43: calls
    P43-->>- P7: return
    P7->>+ P44: calls
    P44-->>- P7: return
    P7->>+ P45: calls
    P45-->>- P7: return
    P7->>+ P46: calls
    P46-->>- P7: return
    P7->>+ P47: calls
    P47-->>- P7: return
    P7->>+ P48: calls
    P48-->>- P7: return
    P7->>+ P49: calls
    P49-->>- P7: return
    P7->>+ P50: calls
    P50-->>- P7: return
    P6->>+ P51: calls
    P51-->>- P6: return
    P6->>+ P0: calls
    P0-->>- P6: return
    P0->>+ P12: calls
    P12-->>- P0: return
```

## Connections by Relation

### calls
- [[readCart()]] `EXTRACTED`
- [[CheckoutPage()]] `INFERRED`
- [[AuthHomePage()]] `INFERRED`

### contains
- [[cartStore.js]] `EXTRACTED`

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*