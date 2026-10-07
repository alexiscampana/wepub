import { btnStyle, Logo } from "../../App.jsx";

const SUGGESTIONS = [
  { icon: "🏠", label: "Go home", page: "home" },
  { icon: "🛍️", label: "Browse store", page: "store" },
  { icon: "📝", label: "Read the blog", page: "blog" },
  { icon: "💬", label: "Contact support", page: "contact" },
  { icon: "💡", label: "See features", page: "features" },
  { icon: "🤝", label: "Partner with us", page: "partners" },
];

export default function NotFoundPage({ onNavigate }) {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "#111",
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* NAV */}
      <nav
        style={{
          padding: "20px 40px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => onNavigate("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Logo />
        </button>
        <button style={btnStyle("outline")} onClick={() => onNavigate("home")}>
          Go home
        </button>
      </nav>

      {/* MAIN */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 560 }}>
          {/* Big 404 */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                fontSize: "clamp(80px, 15vw, 140px)",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-4px",
                background: "linear-gradient(135deg, #00b67a, #2196f3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: 48,
                opacity: 0.15,
              }}
            >
              🔍
            </div>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 700,
              marginBottom: 12,
              letterSpacing: "-0.5px",
            }}
          >
            Oops! Page not found.
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 380,
              margin: "0 auto 36px",
            }}
          >
            The page you're looking for doesn't exist, was moved, or maybe never
            existed at all.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginBottom: 52,
              flexWrap: "wrap",
            }}
          >
            <button
              style={btnStyle("green", "lg")}
              onClick={() => onNavigate("home")}
            >
              Take me home
            </button>
            <button
              style={btnStyle("outline", "lg")}
              onClick={() => onNavigate("search")}
            >
              Search the site
            </button>
          </div>

          {/* SUGGESTIONS */}
          <div>
            <p
              style={{
                fontSize: 13,
                color: "#aaa",
                fontWeight: 500,
                marginBottom: 16,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Or try one of these
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => onNavigate(s.page)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 14px",
                    background: "#fafafa",
                    border: "1px solid #ebebeb",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#444",
                    fontWeight: 500,
                    transition: "background 0.15s, box-shadow 0.15s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f4fdf9";
                    e.currentTarget.style.boxShadow =
                      "0 3px 12px rgba(0,182,122,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fafafa";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: 18 }}>{s.icon}</span> {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          padding: "20px 40px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 12, color: "#aaa" }}>© 2026 WePub Inc.</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <button
              key={l}
              onClick={() => onNavigate(l.toLowerCase())}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                color: "#aaa",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
