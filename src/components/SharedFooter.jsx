import { Logo } from "../../App.jsx";

export default function SharedFooter({ onNavigate }) {
  return (
    <footer style={{ borderTop: "1px solid #f0f0f0", background: "#fff" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(32px,5vw,48px) clamp(16px,4vw,40px) 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,160px), 1fr))",
          gap: "clamp(20px,3vw,32px)",
        }}
      >
        <div>
          <button
            onClick={() => onNavigate("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginBottom: 12,
            }}
          >
            <Logo />
          </button>
          <p
            style={{
              fontSize: 13,
              color: "#888",
              lineHeight: 1.6,
              maxWidth: 200,
            }}
          >
            The platform that powers your store and your stories.
          </p>
        </div>
        {[
          { heading: "Product", links: ["Features", "Commerce", "Content"] },
          {
            heading: "Company",
            links: ["About", "Blog", "Careers", "Partners", "Contact"],
          },
          {
            heading: "Resources",
            links: [
              "Reviews",
              "Compare",
              "Referral",
              "Newsletter",
              "App",
              "Changelog",
            ],
          },
          {
            heading: "Legal",
            links: ["Privacy", "Terms", "Cookies", "Status"],
          },
        ].map((col) => (
          <div key={col.heading}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#aaa",
                marginBottom: 14,
              }}
            >
              {col.heading}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {col.links.map((l) => (
                <button
                  key={l}
                  onClick={() => onNavigate(l.toLowerCase())}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 13,
                    color: "#666",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'DM Sans', sans-serif",
                    padding: 0,
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: "1px solid #f0f0f0",
          padding: "16px clamp(16px,4vw,40px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 12, color: "#aaa" }}>
          © 2026 WePub Inc. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: 16 }}>
          {["Twitter", "GitHub", "LinkedIn"].map((s) => (
            <a
              key={s}
              href="#"
              style={{ fontSize: 12, color: "#aaa", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#555")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
