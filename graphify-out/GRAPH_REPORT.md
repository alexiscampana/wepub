# Graph Report - C:\Users\alexi\OneDrive\Desktop\project  (2026-07-31)

## Corpus Check
- 61 files · ~106,454 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 297 nodes · 321 edges · 39 communities detected
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 66 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]

## God Nodes (most connected - your core abstractions)
1. `btnStyle()` - 46 edges
2. `useToast()` - 21 edges
3. `readCart()` - 5 edges
4. `writeCart()` - 5 edges
5. `sendEmail()` - 5 edges
6. `ErrorBoundary` - 5 edges
7. `getCart()` - 4 edges
8. `sendOrderConfirmation()` - 4 edges
9. `AddProductPage()` - 4 edges
10. `CheckoutPage()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `HomePage()` --calls--> `btnStyle()`  [INFERRED]
  C:\Users\alexi\OneDrive\Desktop\project\App.jsx → C:\Users\alexi\OneDrive\Desktop\project\WePub\src\utils.jsx
- `btnStyle()` --calls--> `SharedNav()`  [INFERRED]
  C:\Users\alexi\OneDrive\Desktop\project\WePub\src\utils.jsx → C:\Users\alexi\OneDrive\Desktop\project\WePub\src\components\SharedNav.jsx
- `btnStyle()` --calls--> `AboutPage()`  [INFERRED]
  C:\Users\alexi\OneDrive\Desktop\project\WePub\src\utils.jsx → C:\Users\alexi\OneDrive\Desktop\project\src\pages\AboutPage.jsx
- `btnStyle()` --calls--> `CommercePage()`  [INFERRED]
  C:\Users\alexi\OneDrive\Desktop\project\WePub\src\utils.jsx → C:\Users\alexi\OneDrive\Desktop\project\src\pages\CommercePage.jsx
- `btnStyle()` --calls--> `ComparisonPage()`  [INFERRED]
  C:\Users\alexi\OneDrive\Desktop\project\WePub\src\utils.jsx → C:\Users\alexi\OneDrive\Desktop\project\src\pages\ComparisonPage.jsx

## Communities

### Community 0 - "Community 0"

Cohesion: 0.05
Nodes (24): AVATAR_KEY, AvatarUpload(), CartPage(), inputStyle, LoginPage(), MFASetup(), ProductPage(), PRODUCTS (+16 more)

### Community 1 - "Community 1"

Cohesion: 0.06
Nodes (23): BLOG_POSTS, BlogPage(), CATEGORIES, BlogPostPage(), POST_CONTENT, ChangelogPage(), RELEASES, TYPE_STYLES (+15 more)

### Community 2 - "Community 2"
_Unable to determine domain due to missing code entities._
Cohesion: 0.1
Nodes (0): 

### Community 3 - "Community 3"

Cohesion: 0.16
Nodes (13): AuthHomePage(), QUICK_ACTIONS, TIPS, addToCart(), CART_KEY, clearCart(), getCart(), readCart() (+5 more)

### Community 4 - "Community 4"

Cohesion: 0.17
Nodes (1): pulse

### Community 5 - "Community 5"

Cohesion: 0.29
Nodes (6): HomePage(), RevealSection(), SHOPIFY_FEATURES, TESTIMONIALS, useScrollReveal(), WP_FEATURES

### Community 6 - "Community 6"

Cohesion: 0.46
Nodes (7): formatCurrency(), formatItems(), sendEmail(), sendLowStockAlert(), sendOrderConfirmation(), sendShippingNotification(), sendWelcomeEmail()

### Community 7 - "Community 7"

Cohesion: 0.25
Nodes (4): SaveBar(), SettingsPage(), SIDEBAR_ITEMS, TABS

### Community 8 - "Community 8"

Cohesion: 0.33
Nodes (4): AddProductPage(), CATEGORIES, EMOJIS, inputStyle()

### Community 9 - "Community 9"

Cohesion: 0.29
Nodes (6): AdminPanel(), SAMPLE_ORDERS, SAMPLE_POSTS, SAMPLE_PRODUCTS, STATUS_COLORS, TABS

### Community 10 - "Community 10"

Cohesion: 0.29
Nodes (3): CHECKLIST, Dashboard(), SIDEBAR_ITEMS

### Community 11 - "Community 11"

Cohesion: 0.29
Nodes (6): allOperational, INCIDENTS, SERVICES, STATUS_CONFIG, StatusPage(), UPTIME_DAYS

### Community 12 - "Community 12"
_Catches rendering errors within component trees and displays a fallback UI, preventing the whole app from crashing._
Cohesion: 0.33
Nodes (1): ErrorBoundary

### Community 13 - "Community 13"

Cohesion: 0.33
Nodes (4): ComparisonPage(), COMPETITORS, FEATURES, VERDICTS

### Community 14 - "Community 14"

Cohesion: 0.33
Nodes (5): ENTERPRISE_FEATURES, EnterprisePage(), inputStyle, labelStyle, LOGOS

### Community 15 - "Community 15"

Cohesion: 0.33
Nodes (3): LegalPage(), PRIVACY_SECTIONS, TERMS_SECTIONS

### Community 16 - "Community 16"

Cohesion: 0.33
Nodes (5): GOALS, OnboardingFlow(), STEPS, STORE_TYPES, THEMES

### Community 17 - "Community 17"

Cohesion: 0.33
Nodes (5): FAQS, LOGOS, PARTNER_TYPES, PartnerPage(), PROCESS

### Community 18 - "Community 18"

Cohesion: 0.33
Nodes (5): FAQS, FEATURES, ProductLandingPage(), REVIEWS, VARIANTS

### Community 19 - "Community 19"

Cohesion: 0.33
Nodes (5): FAQS, HOW_IT_WORKS, ReferralPage(), TESTIMONIALS, TIERS

### Community 20 - "Community 20"

Cohesion: 0.33
Nodes (5): CASE_STUDIES, CATEGORIES, REVIEWS, STATS, TestimonialsPage()

### Community 21 - "Community 21"

Cohesion: 0.4
Nodes (4): AboutPage(), MILESTONES, TEAM, VALUES

### Community 22 - "Community 22"

Cohesion: 0.4
Nodes (3): FEATURES, REVIEWS, SCREENSHOTS

### Community 23 - "Community 23"

Cohesion: 0.4
Nodes (4): CareersPage(), DEPTS, JOBS, PERKS

### Community 24 - "Community 24"

Cohesion: 0.4
Nodes (4): ContactPage(), inputStyle, labelStyle, SUPPORT_OPTIONS

### Community 25 - "Community 25"

Cohesion: 0.4
Nodes (4): PAGES, POPULAR, SearchPage(), STATIC_PRODUCTS

### Community 26 - "Community 26"

Cohesion: 0.5
Nodes (3): supabase, SUPABASE_ANON_KEY, SUPABASE_URL

### Community 27 - "Community 27"

Cohesion: 0.5
Nodes (3): AUTH_LINKS, GUEST_LINKS, SharedNav()

### Community 28 - "Community 28"

Cohesion: 0.5
Nodes (3): COMMERCE_FEATURES, CommercePage(), STATS

### Community 29 - "Community 29"

Cohesion: 0.5
Nodes (3): ConsentPolicyPage(), COOKIE_TYPES, SECTIONS

### Community 30 - "Community 30"

Cohesion: 0.5
Nodes (3): CONTENT_FEATURES, ContentPage(), WORKFLOW

### Community 31 - "Community 31"

Cohesion: 0.5
Nodes (3): ALL_FEATURES, CATEGORIES, FeaturesPage()

### Community 32 - "Community 32"

Cohesion: 0.5
Nodes (3): NewsletterPage(), PAST_ISSUES, TESTIMONIALS

### Community 33 - "Community 33"

Cohesion: 0.5
Nodes (3): FAQS, PLANS, PricingPage()

### Community 34 - "Community 34"

Cohesion: 0.5
Nodes (3): inputStyle, labelStyle, SignupPage()

### Community 35 - "Community 35"
_Unable to determine domain due to missing code entities._
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
_Unable to determine domain due to missing code entities._
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
_Unable to determine domain due to missing code entities._
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
_Unable to determine domain due to missing code entities._
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **113 isolated node(s):** `SHOPIFY_FEATURES`, `WP_FEATURES`, `TESTIMONIALS`, `CART_KEY`, `SUPABASE_URL` (+108 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 35`** (2 nodes): `SharedFooter.jsx`, `SharedFooter()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.