import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const COMMERCE_FEATURES = [
  {
    icon: "🛍️",
    title: "Storefront builder",
    desc: "Drag-and-drop pages, collections, and product listings. Mobile-first, blazing fast, and conversion-optimized.",
  },
  {
    icon: "💳",
    title: "Payments & checkout",
    desc: "Accept 100+ payment methods globally. One-click checkout, express pay, and zero transaction fees.",
  },
  {
    icon: "📦",
    title: "Inventory & fulfillment",
    desc: "Real-time stock tracking across locations. Auto-alerts, bulk edits, and fulfillment integrations.",
  },
  {
    icon: "🔄",
    title: "Subscriptions",
    desc: "Sell recurring products and memberships. Manage billing cycles, pauses, and upgrades seamlessly.",
  },
  {
    icon: "🎟️",
    title: "Discounts & promotions",
    desc: "Flexible discount rules, bulk codes, BOGO deals, and automatic free shipping thresholds.",
  },
  {
    icon: "🏪",
    title: "Point of sale",
    desc: "Sell in-person with a full POS system. All your inventory and orders stay in sync, always.",
  },
  {
    icon: "🌍",
    title: "International selling",
    desc: "Localized storefronts, auto currency conversion, VAT/tax handling, and translated checkout.",
  },
  {
    icon: "🚚",
    title: "Shipping & logistics",
    desc: "Discounted rates with major carriers, calculated shipping, label printing, and tracking built in.",
  },
];

const STATS = [
  { value: "1.7M+", label: "Merchants worldwide" },
  { value: "$500B+", label: "Processed in sales" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "0%", label: "Transaction fees" },
];

export default function CommercePage({ onNavigate, user, onLogout }) {
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
        activePage="commerce"
        user={user}
        onLogout={onLogout}
      />

      {/* HERO */}
      <section
        style={{
          padding: "80px 40px 64px",
          background: "linear-gradient(135deg, #f4fdf9 0%, #e8f5e9 100%)",
          borderBottom: "1px solid #e0f0e8",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#e6f9f2",
            color: "#00895a",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 99,
            padding: "4px 14px",
            marginBottom: 20,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Commerce
        </span>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: "-1px",
            maxWidth: 640,
            margin: "0 auto 16px",
          }}
        >
          Everything you need
          <br />
          to sell, beautifully.
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "#555",
            maxWidth: 480,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          From your first sale to your millionth — WePub commerce scales with
          you every step of the way.
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
            style={btnStyle("green", "lg")}
            onClick={() => onNavigate("signup")}
          >
            Start selling free →
          </button>
          <button
            style={btnStyle("outline", "lg")}
            onClick={() => onNavigate("store")}
          >
            See demo store
          </button>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "32px 24px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid #f0f0f0" : "none",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#00b67a",
                letterSpacing: "-1px",
                marginBottom: 4,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: "#888" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* FEATURES GRID */}
      <section style={{ padding: "72px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 8,
              letterSpacing: "-0.5px",
            }}
          >
            Built for serious sellers
          </h2>
          <p style={{ fontSize: 16, color: "#666" }}>
            Every tool you need, none of the complexity you don't.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {COMMERCE_FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "24px",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0,182,122,0.1)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHT BAND */}
      <section
        style={{
          background: "#00b67a",
          padding: "56px 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 32,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          No transaction fees. Ever.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.85)",
            marginBottom: 28,
            maxWidth: 440,
            margin: "0 auto 28px",
          }}
        >
          Keep more of what you earn. WePub never takes a cut of your sales.
        </p>
        <button
          style={{
            ...btnStyle("outline", "lg"),
            background: "#fff",
            color: "#00b67a",
            border: "none",
          }}
          onClick={() => onNavigate("signup")}
        >
          Get started free →
        </button>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px 40px", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          Ready to start selling?
        </h2>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          Join 1.7 million merchants. Free forever.
        </p>
        <button
          style={btnStyle("green", "lg")}
          onClick={() => onNavigate("signup")}
        >
          Create your store →
        </button>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
