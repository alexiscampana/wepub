import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const ALL_FEATURES = [
  {
    category: "Commerce",
    icon: "🛍️",
    color: "#00b67a",
    bg: "#e6f9f2",
    title: "Storefront builder",
    desc: "Drag-and-drop product pages, collections, and checkout flows. Fully responsive and conversion-optimized.",
  },
  {
    category: "Commerce",
    icon: "💳",
    color: "#00b67a",
    bg: "#e6f9f2",
    title: "PCI-compliant payments",
    desc: "Accept 100+ payment methods globally. Stripe, PayPal, Apple Pay, and more — built-in fraud protection.",
  },
  {
    category: "Commerce",
    icon: "📦",
    color: "#00b67a",
    bg: "#e6f9f2",
    title: "Inventory management",
    desc: "Track stock levels, variants, and locations. Set low-stock alerts and automate reorder workflows.",
  },
  {
    category: "Commerce",
    icon: "🎟️",
    color: "#00b67a",
    bg: "#e6f9f2",
    title: "Discounts & gift cards",
    desc: "Create flexible discount rules, bulk codes, and digital gift cards. Schedule sales campaigns automatically.",
  },
  {
    category: "Commerce",
    icon: "🔄",
    color: "#00b67a",
    bg: "#e6f9f2",
    title: "Subscription billing",
    desc: "Sell recurring products and memberships. Manage billing cycles, pauses, and upgrades in one place.",
  },
  {
    category: "Commerce",
    icon: "🏪",
    color: "#00b67a",
    bg: "#e6f9f2",
    title: "Point of sale (POS)",
    desc: "Sell in-person with a full POS system. Sync inventory and orders across online and offline channels.",
  },
  {
    category: "Content",
    icon: "✏️",
    color: "#2196f3",
    bg: "#e3f2fd",
    title: "Block editor",
    desc: "A powerful Gutenberg-style editor. Embed products, forms, and media blocks inside any page.",
  },
  {
    category: "Content",
    icon: "📝",
    color: "#2196f3",
    bg: "#e3f2fd",
    title: "Custom post types",
    desc: "Define your own content structures — recipes, reviews, portfolios, events — with custom fields.",
  },
  {
    category: "Content",
    icon: "🔍",
    color: "#2196f3",
    bg: "#e3f2fd",
    title: "Advanced SEO tools",
    desc: "Control meta tags, sitemaps, canonical URLs, structured data, and Open Graph from one dashboard.",
  },
  {
    category: "Content",
    icon: "👥",
    color: "#2196f3",
    bg: "#e3f2fd",
    title: "Multi-author workflow",
    desc: "Invite contributors, editors, and admins. Built-in editorial review and scheduling pipeline.",
  },
  {
    category: "Content",
    icon: "🖼️",
    color: "#2196f3",
    bg: "#e3f2fd",
    title: "Media library & CDN",
    desc: "Store and serve images, videos, and documents from a global CDN. Auto-resize and optimize assets.",
  },
  {
    category: "Analytics",
    icon: "📊",
    color: "#7c3aed",
    bg: "#ede9fe",
    title: "Unified dashboard",
    desc: "See revenue, traffic, and content performance on one screen. No tab-switching between tools.",
  },
  {
    category: "Analytics",
    icon: "🛒",
    color: "#7c3aed",
    bg: "#ede9fe",
    title: "Cart abandonment",
    desc: "Track drop-off points in your funnel and auto-send recovery emails to bring customers back.",
  },
  {
    category: "Analytics",
    icon: "📈",
    color: "#7c3aed",
    bg: "#ede9fe",
    title: "Content-to-revenue",
    desc: "See which blog posts and pages generate the most sales. Optimize content for conversion.",
  },
  {
    category: "Platform",
    icon: "🔌",
    color: "#f59e0b",
    bg: "#fef3c7",
    title: "Plugin marketplace",
    desc: "10,000+ plugins for every use case — email, loyalty, reviews, subscriptions, and more.",
  },
  {
    category: "Platform",
    icon: "🌍",
    color: "#0891b2",
    bg: "#e0f7fa",
    title: "Multi-language & currency",
    desc: "Serve any market with localized storefronts, auto currency conversion, and translated content.",
  },
  {
    category: "Platform",
    icon: "🔒",
    color: "#ef4444",
    bg: "#fee2e2",
    title: "Enterprise security",
    desc: "SOC 2 Type II certified. Two-factor auth, SAML SSO, role-based access, and audit logs included.",
  },
];

const CATEGORIES = ["All", "Commerce", "Content", "Analytics", "Platform"];

export default function FeaturesPage({ onNavigate, user, onLogout }) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? ALL_FEATURES
      : ALL_FEATURES.filter((f) => f.category === active);
  const goToApp = () => onNavigate(user ? "dashboard" : "signup");

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
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      <SharedNav
        onNavigate={onNavigate}
        activePage="features"
        user={user}
        onLogout={onLogout}
      />

      {/* HERO */}
      <section
        style={{
          padding: "72px 40px 56px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f4fdf9 0%, #eff6ff 100%)",
          borderBottom: "1px solid #e8f0fe",
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#00b67a",
            marginBottom: 12,
          }}
        >
          Features
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: "-1px",
          }}
        >
          Everything you need.
          <br />
          Nothing you don't.
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "#666",
            maxWidth: 480,
            margin: "0 auto 32px",
            lineHeight: 1.7,
          }}
        >
          One platform covering commerce, content, analytics, and integrations —
          so you can focus on growing.
        </p>
        <button style={btnStyle("green", "lg")} onClick={goToApp}>
          {user ? "Go to dashboard →" : "Get started free →"}
        </button>
      </section>

      {/* FILTER TABS */}
      <section
        style={{
          padding: "32px 40px 0",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              style={{
                padding: "8px 20px",
                borderRadius: 99,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                border: "none",
                transition: "all 0.15s",
                background: active === c ? "#111" : "transparent",
                color: active === c ? "#fff" : "#666",
                marginBottom: -1,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURE GRID */}
      <section style={{ padding: "48px 40px 80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: 16,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {filtered.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "24px",
                transition: "box-shadow 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: f.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {f.icon}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    background: f.bg,
                    color: f.color,
                    borderRadius: 99,
                    padding: "3px 10px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {f.category}
                </span>
              </div>
              <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          textAlign: "center",
          borderTop: "1px solid #f0f0f0",
          background: "#fafafa",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          Ready to get started?
        </h2>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          Free forever. No credit card required. No hidden fees.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button style={btnStyle("green", "lg")} onClick={goToApp}>
            {user ? "Go to dashboard" : "Get started free"}
          </button>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
