import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const FEATURES = [
  {
    icon: "📦",
    title: "Manage orders on the go",
    desc: "View, fulfill, and track orders from anywhere. Get push notifications the moment a sale comes in.",
  },
  {
    icon: "🛍️",
    title: "Add & edit products",
    desc: "List new products, update prices, and manage inventory directly from your phone.",
  },
  {
    icon: "📊",
    title: "Live analytics",
    desc: "See your revenue, visitors, and conversion rate in real time. Daily and weekly summaries delivered to your lock screen.",
  },
  {
    icon: "✏️",
    title: "Publish content",
    desc: "Write, edit, and publish blog posts from anywhere. The full block editor, optimized for mobile.",
  },
  {
    icon: "💬",
    title: "Customer messages",
    desc: "Reply to customer inquiries and support tickets without opening a laptop.",
  },
  {
    icon: "🔔",
    title: "Smart notifications",
    desc: "Choose exactly what you get notified about. New orders, low stock, comments, and more.",
  },
];

const SCREENSHOTS = [
  {
    label: "Dashboard",
    emoji: "📊",
    bg: "linear-gradient(135deg, #e6f9f2, #f4fdf9)",
  },
  {
    label: "Orders",
    emoji: "📦",
    bg: "linear-gradient(135deg, #e3f2fd, #eff6ff)",
  },
  {
    label: "Analytics",
    emoji: "📈",
    bg: "linear-gradient(135deg, #ede9fe, #f3e8ff)",
  },
  {
    label: "Products",
    emoji: "🛍️",
    bg: "linear-gradient(135deg, #fef3c7, #fffde7)",
  },
];

const REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Managing my store from my phone is a game changer. I caught a viral moment and updated my inventory in 2 minutes while on the subway.",
    initials: "SM",
    bg: "#e6f9f2",
    color: "#00b67a",
  },
  {
    name: "James P.",
    rating: 5,
    text: "The push notifications for new orders are so satisfying. My kids think I have a special ringtone for money.",
    initials: "JP",
    bg: "#e3f2fd",
    color: "#2196f3",
  },
  {
    name: "Aisha K.",
    rating: 5,
    text: "I published a blog post from a coffee shop, checked my analytics at dinner, and fulfilled 3 orders before bed. All on my phone.",
    initials: "AK",
    bg: "#ede9fe",
    color: "#7c3aed",
  },
];

export default function AppDownloadPage({ onNavigate, user, onLogout }) {
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
      <SharedNav onNavigate={onNavigate} user={user} onLogout={onLogout} />

      {/* HERO */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "72px 40px",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#f4fdf9",
              border: "1px solid #c8f0e0",
              borderRadius: 99,
              padding: "5px 14px",
              fontSize: 13,
              color: "#00895a",
              marginBottom: 24,
              fontWeight: 500,
            }}
          >
            📱 Available on iOS & Android
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 700,
              marginBottom: 16,
              letterSpacing: "-1px",
              lineHeight: 1.15,
            }}
          >
            Run your store
            <br />
            from your pocket.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "#555",
              lineHeight: 1.75,
              marginBottom: 32,
              maxWidth: 420,
            }}
          >
            The WePub app puts your store, blog, orders, and analytics in your
            pocket. Everything you can do on desktop — now on mobile.
          </p>

          {/* Download buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "12px 20px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: 28 }}>🍎</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, opacity: 0.7 }}>
                  Download on the
                </div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>App Store</div>
              </div>
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "12px 20px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: 28 }}>▶️</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, opacity: 0.7 }}>Get it on</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Google Play</div>
              </div>
            </button>
          </div>

          {/* Ratings */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              ["⭐ 4.9", "App Store", "12k ratings"],
              ["⭐ 4.8", "Google Play", "8k ratings"],
            ].map(([rating, store, count]) => (
              <div
                key={store}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{rating}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {store} · {count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone mockup */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            alignItems: "flex-end",
          }}
        >
          {SCREENSHOTS.map((s, i) => (
            <div
              key={s.label}
              style={{
                width: i === 1 ? 160 : 130,
                background: s.bg,
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                transform:
                  i === 0 ? "rotate(-6deg)" : i === 2 ? "rotate(6deg)" : "none",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  padding: "20px 16px",
                  minHeight: i === 1 ? 280 : 240,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 48 }}>{s.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>
                  {s.label}
                </div>
                {/* Fake UI bars */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginTop: 8,
                  }}
                >
                  {[80, 60, 90, 40].map((w, j) => (
                    <div
                      key={j}
                      style={{
                        height: 6,
                        borderRadius: 99,
                        background: "rgba(0,0,0,0.08)",
                        width: `${w}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          padding: "72px 40px",
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: "-0.5px",
              }}
            >
              Everything you need, on the go
            </h2>
            <p style={{ fontSize: 16, color: "#666" }}>
              Full store management from your phone.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {FEATURES.map((f) => (
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
                    "0 6px 24px rgba(0,0,0,0.07)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: "72px 40px", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 36,
              textAlign: "center",
              letterSpacing: "-0.3px",
            }}
          >
            What merchants say
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "22px",
                }}
              >
                <div
                  style={{ color: "#f59e0b", fontSize: 13, marginBottom: 12 }}
                >
                  {"★".repeat(r.rating)}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#555",
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  "{r.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: r.bg,
                      color: r.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {r.initials}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>
                    {r.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 40px",
          textAlign: "center",
          background: "#111",
          borderTop: "1px solid #222",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          Your store in your pocket.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 36,
          }}
        >
          Free for all WePub users. Available now on iOS and Android.
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#fff",
              color: "#111",
              border: "none",
              borderRadius: 14,
              padding: "12px 24px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif', fontWeight: 600",
            }}
          >
            <span style={{ fontSize: 24 }}>🍎</span> App Store
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#fff",
              color: "#111",
              border: "none",
              borderRadius: 14,
              padding: "12px 24px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif', fontWeight: 600",
            }}
          >
            <span style={{ fontSize: 24 }}>▶️</span> Google Play
          </button>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            marginTop: 20,
          }}
        >
          Don't have WePub yet?{" "}
          <button
            onClick={() => onNavigate("signup")}
            style={{
              background: "none",
              border: "none",
              color: "#00b67a",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
            }}
          >
            Get started →
          </button>
        </p>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
