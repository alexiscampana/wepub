import { useState, useEffect, useRef } from "react";
import LoginPage from "./src/pages/LoginPage.jsx";
import SignupPage from "./src/pages/SignupPage.jsx";
import FeaturesPage from "./src/pages/FeaturesPage.jsx";
import CommercePage from "./src/pages/CommercePage.jsx";
import ContentPage from "./src/pages/ContentPage.jsx";
import StorePage from "./src/pages/StorePage.jsx";
import SettingsPage from "./src/pages/SettingsPage.jsx";
import Dashboard from "./src/pages/Dashboard.jsx";
import BlogPage from "./src/pages/BlogPage.jsx";
import BlogPostPage from "./src/pages/BlogPostPage.jsx";
import ProductPage from "./src/pages/ProductPage.jsx";
import AboutPage from "./src/pages/AboutPage.jsx";
import ContactPage from "./src/pages/ContactPage.jsx";
import SearchPage from "./src/pages/SearchPage.jsx";
import UserProfilePage from "./src/pages/UserProfilePage.jsx";
import CartPage from "./src/pages/CartPage.jsx";
import CheckoutPage from "./src/pages/CheckoutPage.jsx";
import OrdersPage from "./src/pages/OrdersPage.jsx";
import WishlistPage from "./src/pages/WishlistPage.jsx";
import NotificationsPage from "./src/pages/NotificationsPage.jsx";
import NotFoundPage from "./src/pages/NotFoundPage.jsx";
import OnboardingFlow from "./src/pages/OnboardingFlow.jsx";
import CareersPage from "./src/pages/CareersPage.jsx";
import { TermsPage, PrivacyPage } from "./src/pages/LegalPages.jsx";
import HelpCenterPage from "./src/pages/HelpCenterPage.jsx";
import NewsletterPage from "./src/pages/NewsletterPage.jsx";
import ConsentBanner from "./src/components/ConsentBanner.jsx";
import AuthHomePage from "./src/pages/AuthHomePage.jsx";
import ReferralPage from "./src/pages/ReferralPage.jsx";
import ComparisonPage from "./src/pages/ComparisonPage.jsx";
import TestimonialsPage from "./src/pages/TestimonialsPage.jsx";
import PartnerPage from "./src/pages/PartnerPage.jsx";
import AppDownloadPage from "./src/pages/AppDownloadPage.jsx";
import ChangelogPage from "./src/pages/ChangelogPage.jsx";
import ConsentPolicyPage from "./src/pages/ConsentPolicyPage.jsx";
import StatusPage from "./src/pages/StatusPage.jsx";
import ProductLandingPage from "./src/pages/ProductLandingPage.jsx";
import AddProductPage from "./src/pages/AddProductPage.jsx";
import WritePostPage from "./src/pages/WritePostPage.jsx";
import AdminPanel from "./src/pages/AdminPanel.jsx";
import SharedNav from "./src/components/SharedNav.jsx";
import SharedFooter from "./src/components/SharedFooter.jsx";

// ── shared data ──────────────────────────────────────────────
const SHOPIFY_FEATURES = [
  "Unlimited products & variants",
  "Abandoned cart recovery",
  "Inventory & shipping management",
  "Point of sale (POS) ready",
  "Discount codes & gift cards",
  "Subscription billing",
];
const WP_FEATURES = [
  "Full block-based page editor",
  "Custom post types & taxonomies",
  "Advanced SEO controls",
  "Multi-author & editorial flow",
  "Media library with CDN",
  "Open source extensibility",
];

const TESTIMONIALS = [
  {
    initials: "LK",
    bg: "#e6f9f2",
    color: "#00b67a",
    name: "Leila Khan",
    role: "Founder, Bloom Collective",
    quote:
      "Switching from two separate tools to WePub was the best decision we made. Our content and commerce finally feel like one brand.",
  },
  {
    initials: "MJ",
    bg: "#e3f2fd",
    color: "#2196f3",
    name: "Marcus J.",
    role: "Food blogger & shop owner",
    quote:
      "I run a recipe blog with a merch store. WePub handles both — no plugins fighting each other, no maintenance headaches.",
  },
  {
    initials: "SR",
    bg: "#ede9fe",
    color: "#7c3aed",
    name: "Sofia R.",
    role: "E-commerce director, Nutura",
    quote:
      "The analytics alone are worth it. Seeing which article drove 40% of last month's sales? That's insight we never had before.",
  },
];

// ── helpers ──────────────────────────────────────────────────
import { btnStyle, Logo } from "./src/utils.jsx";
export { btnStyle, Logo };

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────
function HomePage({ onNavigate, user, onLogout }) {
  const goToApp = () => onNavigate(user ? "home" : "signup");

  const STATS = [
    { value: "1M+", label: "Active stores" },
    { value: "50M+", label: "Products listed" },
    { value: "99.99%", label: "Uptime" },
    { value: "$0", label: "Forever free" },
  ];

  const FEATURES_GRID = [
    {
      icon: "🛍️",
      title: "Storefront builder",
      desc: "Drag-and-drop product pages that convert. Beautiful on every device.",
      color: "#e6f9f2",
      accent: "#00b67a",
    },
    {
      icon: "✏️",
      title: "Block editor",
      desc: "Publish rich content with a full CMS. Embed products right inside posts.",
      color: "#e3f2fd",
      accent: "#2196f3",
    },
    {
      icon: "📊",
      title: "Unified analytics",
      desc: "See sales and content performance side by side. Know what drives revenue.",
      color: "#ede9fe",
      accent: "#7c3aed",
    },
    {
      icon: "🔌",
      title: "Plugin marketplace",
      desc: "10,000+ extensions for every workflow. SEO, email, reviews and more.",
      color: "#fef3c7",
      accent: "#d97706",
    },
    {
      icon: "🌍",
      title: "Global commerce",
      desc: "Multi-currency, multi-language. Sell to anyone, anywhere, in their currency.",
      color: "#fce8e8",
      accent: "#ef4444",
    },
    {
      icon: "⚡",
      title: "Lightning fast",
      desc: "Edge-cached storefronts. 99.99% uptime SLA. No maintenance required.",
      color: "#e0f7fa",
      accent: "#0891b2",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "#111",
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Playfair+Display:wght@700;900&display=swap"
        rel="stylesheet"
      />
      <SharedNav
        onNavigate={onNavigate}
        activePage="home"
        user={user}
        onLogout={onLogout}
      />

      {/* HERO */}
      <section
        style={{
          padding:
            "clamp(56px,8vw,112px) clamp(16px,5vw,40px) clamp(48px,6vw,80px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background blobs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,182,122,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: "5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(33,150,243,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#f4fdf9",
              border: "1px solid #c8f0e0",
              borderRadius: 99,
              padding: "6px 16px",
              fontSize: 13,
              color: "#00895a",
              marginBottom: 32,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00b67a",
                display: "inline-block",
              }}
            />
            Free forever — no credit card required
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 6.5vw, 68px)",
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: 24,
              letterSpacing: "-2px",
            }}
          >
            Your store.
            <br />
            Your stories.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #00b67a 0%, #2196f3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One platform.
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "#555",
              lineHeight: 1.75,
              marginBottom: 40,
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            WePub combines a powerful online store with a full content
            management system. Sell products, publish stories, grow your
            audience — all in one place.
          </p>

          <div
            className="hero-buttons"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 56,
            }}
          >
            <button
              onClick={goToApp}
              style={{
                padding: "14px 32px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.2px",
                transition: "transform 0.15s, opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {user ? "Go to dashboard →" : "Get started free →"}
            </button>
            <button
              onClick={() => onNavigate("features")}
              style={{
                padding: "14px 28px",
                background: "transparent",
                color: "#555",
                border: "1.5px solid #ddd",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#aaa";
                e.currentTarget.style.color = "#111";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ddd";
                e.currentTarget.style.color = "#555";
              }}
            >
              See how it works
            </button>
          </div>

          {/* Stats strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 1,
              background: "#f0f0f0",
              borderRadius: 16,
              overflow: "hidden",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    color: "#111",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#999",
                    marginTop: 3,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section
        style={{
          padding: "clamp(48px,6vw,80px) clamp(16px,4vw,40px)",
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealSection style={{ textAlign: "center", marginBottom: 56 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#00b67a",
                marginBottom: 12,
              }}
            >
              Everything in one place
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Built for creators who sell
            </h2>
          </RevealSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: 12,
            }}
          >
            {FEATURES_GRID.map((f, i) => (
              <RevealSection
                key={f.title}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "28px 26px",
                    height: "100%",
                    border: "1px solid #ebebeb",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: f.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      marginBottom: 18,
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      marginBottom: 8,
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>
                    {f.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT — Commerce + Content */}
      <section style={{ borderTop: "1px solid #f0f0f0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          }}
        >
          <RevealSection
            style={{ padding: "clamp(40px,6vw,72px) clamp(24px,5vw,64px)" }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#e6f9f2",
                  color: "#00895a",
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 99,
                  padding: "5px 14px",
                  marginBottom: 24,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                🛍️ Commerce
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                  fontWeight: 700,
                  marginBottom: 16,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                }}
              >
                Sell anything,
                <br />
                beautifully.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#666",
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                Everything you need to sell physical and digital products — from
                your first sale to your millionth.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 36,
                }}
              >
                {SHOPIFY_FEATURES.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "#444",
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "#00b67a",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate("commerce")}
                style={{
                  padding: "11px 22px",
                  background: "#00b67a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Explore commerce →
              </button>
            </div>
          </RevealSection>

          <RevealSection
            style={{
              padding: "clamp(40px,6vw,72px) clamp(24px,5vw,64px)",
              background: "#0f172a",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(33,150,243,0.15)",
                  color: "#60a5fa",
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 99,
                  padding: "5px 14px",
                  marginBottom: 24,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                ✏️ Content
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                  fontWeight: 700,
                  marginBottom: 16,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                  color: "#fff",
                }}
              >
                Publish with
                <br />
                full ownership.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#94a3b8",
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                A full-featured CMS that gives you complete control — no
                platform can take your content away.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 36,
                }}
              >
                {WP_FEATURES.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "#cbd5e1",
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "#2196f3",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate("content")}
                style={{
                  padding: "11px 22px",
                  background: "#2196f3",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Explore content →
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        style={{
          padding: "clamp(48px,6vw,80px) clamp(16px,4vw,40px)",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <RevealSection style={{ textAlign: "center", marginBottom: 52 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#00b67a",
                marginBottom: 12,
              }}
            >
              What people are saying
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 4vw, 38px)",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Loved by merchants &amp; publishers
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 12,
              }}
            >
              <span
                style={{ color: "#f59e0b", fontSize: 18, letterSpacing: 2 }}
              >
                ★★★★★
              </span>
              <span style={{ fontSize: 14, color: "#888" }}>
                4.9 from 2,400+ reviews
              </span>
            </div>
          </RevealSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <RevealSection
                key={t.name}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #ebebeb",
                    borderRadius: 20,
                    padding: "28px",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg, ${t.color}, ${t.color}88)`,
                    }}
                  />
                  <div
                    style={{
                      color: "#f59e0b",
                      fontSize: 13,
                      marginBottom: 16,
                      letterSpacing: 2,
                    }}
                  >
                    ★★★★★
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#444",
                      lineHeight: 1.75,
                      marginBottom: 24,
                      fontStyle: "italic",
                    }}
                  >
                    "{t.quote}"
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: t.bg,
                        color: t.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div
                        style={{ fontSize: 14, fontWeight: 700, color: "#111" }}
                      >
                        {t.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#999" }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(56px,8vw,100px) clamp(16px,5vw,40px)",
          textAlign: "center",
          background: "#0f172a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,182,122,0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <RevealSection style={{ position: "relative" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 900,
              marginBottom: 16,
              letterSpacing: "-1px",
              color: "#fff",
              lineHeight: 1.15,
            }}
          >
            Your store and your stories,
            <br />
            together at last.
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "#94a3b8",
              marginBottom: 40,
              lineHeight: 1.7,
            }}
          >
            Free forever. No credit card required. No hidden fees.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={goToApp}
              style={{
                padding: "14px 32px",
                background: "#00b67a",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.2px",
              }}
            >
              {user ? "Go to your dashboard →" : "Get started free →"}
            </button>
            {!user && (
              <button
                onClick={() => onNavigate("login")}
                style={{
                  padding: "14px 28px",
                  background: "transparent",
                  color: "#cbd5e1",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Log in
              </button>
            )}
          </div>
          <p style={{ fontSize: 13, color: "#475569", marginTop: 28 }}>
            Join 1M+ merchants already using WePub
          </p>
        </RevealSection>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ── Root router ───────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [history, setHistory] = useState(["home"]);
  const [transitioning, setTransitioning] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("sp_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // ── Sync auth state with Supabase if available ──────────────
  useEffect(() => {
    const trySupabase = async () => {
      try {
        const { supabase } = await import("./src/supabase.js");
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          let customName = null;
          let customAvatar = null;
          try {
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name, avatar_url")
              .eq("id", session.user.id)
              .single();
            customName = profile?.full_name || null;
            customAvatar = profile?.avatar_url || null;
          } catch {
            /* profiles table may not exist yet */
          }
          const u = {
            email: session.user.email,
            name:
              customName ||
              session.user.user_metadata?.name ||
              session.user.email.split("@")[0],
            id: session.user.id,
            avatar_url:
              customAvatar || session.user.user_metadata?.avatar_url || null,
          };
          setUser(u);
          localStorage.setItem("sp_user", JSON.stringify(u));
        }
        supabase.auth.onAuthStateChange(async (_event, session) => {
          if (session?.user) {
            let customName = null;
            let customAvatar = null;
            try {
              const { data: profile } = await supabase
                .from("profiles")
                .select("full_name, avatar_url")
                .eq("id", session.user.id)
                .single();
              customName = profile?.full_name || null;
              customAvatar = profile?.avatar_url || null;
            } catch {
              /* profiles table may not exist yet */
            }
            const u = {
              email: session.user.email,
              name:
                customName ||
                session.user.user_metadata?.name ||
                session.user.email.split("@")[0],
              id: session.user.id,
              avatar_url:
                customAvatar || session.user.user_metadata?.avatar_url || null,
            };
            setUser(u);
            localStorage.setItem("sp_user", JSON.stringify(u));
          } else {
            setUser(null);
            localStorage.removeItem("sp_user");
          }
        });
      } catch {
        /* supabase.js not present — use localStorage auth */
      }
    };
    trySupabase();
  }, []);

  const navigate = (p) => {
    setTransitioning(true);
    setTimeout(() => {
      setPage(p);
      setHistory((prev) => {
        // Don't add duplicate consecutive pages
        if (prev[prev.length - 1] === p) return prev;
        return [...prev, p];
      });
      window.scrollTo(0, 0);
      setTransitioning(false);
    }, 150);
  };

  const goBack = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    const previousPage = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    setTransitioning(true);
    setTimeout(() => {
      setPage(previousPage);
      window.scrollTo(0, 0);
      setTransitioning(false);
    }, 150);
  };

  const handleLogin = async (userData, isNew = false) => {
    setUser(userData);
    localStorage.setItem("sp_user", JSON.stringify(userData));
    if (isNew) {
      // Clear tour flag so new users see the tour on first load
      localStorage.removeItem("sp_tour_done");
      try {
        const { sendWelcomeEmail } =
          await import("./src/emailNotifications.js");
        await sendWelcomeEmail({ user: userData });
      } catch {
        /* email optional */
      }
    }
    const onboardingDone = localStorage.getItem("sp_onboarding_done");
    if (isNew && !onboardingDone) navigate("onboarding");
    else navigate("home");
  };

  const handleLogout = async () => {
    // Navigate first so dashboard pages don't try to render with null user
    navigate("home");
    // Small delay to let navigation start before clearing state
    await new Promise((r) => setTimeout(r, 50));
    try {
      const { supabase } = await import("./src/supabase.js");
      await supabase.auth.signOut();
    } catch {
      /* no supabase */
    }
    setUser(null);
    localStorage.removeItem("sp_user");
    localStorage.removeItem("sp_avatar_url");
  };

  const canGoBack =
    history.length > 1 && history[history.length - 1] !== "home";
  const dashProps = {
    onNavigate: navigate,
    onLogout: handleLogout,
    user,
    onBack: goBack,
  };
  const navProps = { user, onLogout: handleLogout, onBack: goBack, canGoBack };

  // Protected pages redirect to login if user is null
  const PROTECTED = [
    "dashboard",
    "add-product",
    "write-post",
    "admin",
    "settings",
    "orders",
    "notifications",
    "profile",
  ];
  if (!user && PROTECTED.includes(page)) {
    navigate("login");
    return null;
  }

  // ── Wrap every page in a transition div ──────────────────────
  const wrap = (component) => (
    <div
      key={page}
      className={transitioning ? "page-exit" : "page-enter"}
      style={{ willChange: "opacity, transform" }}
    >
      {component}
    </div>
  );

  if (page === "login")
    return wrap(<LoginPage onNavigate={navigate} onLogin={handleLogin} />);
  if (page === "signup")
    return wrap(
      <SignupPage
        onNavigate={navigate}
        onLogin={(u) => handleLogin(u, true)}
      />,
    );
  if (page === "onboarding")
    return wrap(<OnboardingFlow onNavigate={navigate} user={user} />);
  if (page === "features")
    return wrap(<FeaturesPage onNavigate={navigate} {...navProps} />);
  if (page === "commerce")
    return wrap(<CommercePage onNavigate={navigate} {...navProps} />);
  if (page === "content")
    return wrap(<ContentPage onNavigate={navigate} {...navProps} />);
  if (page === "store")
    return wrap(<StorePage onNavigate={navigate} {...navProps} />);
  if (page === "blog")
    return wrap(<BlogPage onNavigate={navigate} {...navProps} />);
  if (page === "about")
    return wrap(<AboutPage onNavigate={navigate} {...navProps} />);
  if (page === "contact")
    return wrap(<ContactPage onNavigate={navigate} {...navProps} />);
  if (page === "search")
    return wrap(<SearchPage onNavigate={navigate} {...navProps} />);
  if (page === "cart")
    return wrap(<CartPage onNavigate={navigate} {...navProps} />);
  if (page === "checkout") return wrap(<CheckoutPage onNavigate={navigate} />);
  if (page === "wishlist")
    return wrap(<WishlistPage onNavigate={navigate} {...navProps} />);
  if (page === "orders") return wrap(<OrdersPage {...dashProps} />);
  if (page === "notifications")
    return wrap(<NotificationsPage {...dashProps} />);
  if (page === "profile")
    return wrap(
      <UserProfilePage
        onNavigate={navigate}
        onLogout={handleLogout}
        user={user}
      />,
    );
  if (page === "dashboard") return wrap(<Dashboard {...dashProps} />);
  if (page === "add-product") return wrap(<AddProductPage {...dashProps} />);
  if (page === "write-post") return wrap(<WritePostPage {...dashProps} />);
  if (page === "admin") return wrap(<AdminPanel {...dashProps} />);
  if (page === "settings") return wrap(<SettingsPage {...dashProps} />);
  if (page === "careers")
    return wrap(<CareersPage onNavigate={navigate} {...navProps} />);
  if (page === "terms")
    return wrap(<TermsPage onNavigate={navigate} {...navProps} />);
  if (page === "privacy")
    return wrap(<PrivacyPage onNavigate={navigate} {...navProps} />);
  if (page === "help")
    return wrap(<HelpCenterPage onNavigate={navigate} {...navProps} />);
  if (page === "newsletter")
    return wrap(<NewsletterPage onNavigate={navigate} {...navProps} />);
  if (page === "referral")
    return wrap(<ReferralPage onNavigate={navigate} {...navProps} />);
  if (page === "compare")
    return wrap(<ComparisonPage onNavigate={navigate} {...navProps} />);
  if (page === "reviews")
    return wrap(<TestimonialsPage onNavigate={navigate} {...navProps} />);
  if (page === "partners")
    return wrap(<PartnerPage onNavigate={navigate} {...navProps} />);
  if (page === "app")
    return wrap(<AppDownloadPage onNavigate={navigate} {...navProps} />);
  if (page === "changelog")
    return wrap(<ChangelogPage onNavigate={navigate} {...navProps} />);
  if (page === "cookies")
    return wrap(<CoonsentPolicyPage onNavigate={navigate} {...navProps} />);
  if (page === "status")
    return wrap(<StatusPage onNavigate={navigate} {...navProps} />);
  if (page === "lamp")
    return wrap(<ProductLandingPage onNavigate={navigate} {...navProps} />);
  if (page.startsWith("blog-post-")) {
    const id = parseInt(page.replace("blog-post-", ""));
    return wrap(
      <BlogPostPage postId={id} onNavigate={navigate} {...navProps} />,
    );
  }
  if (page.startsWith("product-")) {
    const id = parseInt(page.replace("product-", ""));
    return wrap(
      <ProductPage productId={id} onNavigate={navigate} {...navProps} />,
    );
  }
  // Logged-in users see personalized homepage; guests see marketing homepage
  if (user) {
    return wrap(<AuthHomePage onNavigate={navigate} {...navProps} />);
  }
  return wrap(
    <>
      <ConsentBanner onNavigate={navigate} />
      <HomePage
        onNavigate={navigate}
        {...navProps}
        onBack={goBack}
        canGoBack={canGoBack}
      />
    </>,
  );
}
