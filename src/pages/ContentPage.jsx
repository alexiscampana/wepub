import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const CONTENT_FEATURES = [
  {
    icon: "✏️",
    title: "Block editor",
    desc: "A powerful drag-and-drop editor. Add text, images, video, product embeds, and custom HTML blocks.",
  },
  {
    icon: "📝",
    title: "Custom post types",
    desc: "Recipes, reviews, tutorials, events — define any content structure with custom fields and taxonomies.",
  },
  {
    icon: "🔍",
    title: "Advanced SEO",
    desc: "Full control over meta tags, sitemaps, structured data, Open Graph, and canonical URLs.",
  },
  {
    icon: "👥",
    title: "Multi-author workflow",
    desc: "Invite contributors and editors. Built-in review queue, scheduling, and role-based permissions.",
  },
  {
    icon: "🖼️",
    title: "Media library & CDN",
    desc: "Upload, organize, and serve images and video from a global CDN. Auto-resize on the fly.",
  },
  {
    icon: "🌐",
    title: "Multilingual content",
    desc: "Publish in any language. Translate posts, pages, and products. Serve localized content to every visitor.",
  },
  {
    icon: "📅",
    title: "Content scheduling",
    desc: "Write now, publish later. Schedule posts and campaigns down to the minute, in any timezone.",
  },
  {
    icon: "🔗",
    title: "Internal linking assistant",
    desc: "AI-powered suggestions for internal links to boost SEO and keep readers engaged longer.",
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "Write",
    desc: "Use the block editor to craft beautiful posts, pages, and landing content.",
  },
  {
    step: "02",
    title: "Review",
    desc: "Collaborate with your team. Leave comments, request edits, and approve drafts.",
  },
  {
    step: "03",
    title: "Publish",
    desc: "Schedule or publish instantly. Automatically shared to your connected channels.",
  },
  {
    step: "04",
    title: "Analyze",
    desc: "See which content drives traffic and sales. Iterate with real data.",
  },
];

export default function ContentPage({ onNavigate, user, onLogout }) {
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
        activePage="content"
        user={user}
        onLogout={onLogout}
      />

      {/* HERO */}
      <section
        style={{
          padding: "80px 40px 64px",
          background: "linear-gradient(135deg, #eff6ff 0%, #e8eaf6 100%)",
          borderBottom: "1px solid #dde8f8",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#e3f2fd",
            color: "#1565c0",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 99,
            padding: "4px 14px",
            marginBottom: 20,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Content
        </span>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: "-1px",
            maxWidth: 620,
            margin: "0 auto 16px",
          }}
        >
          Publish with purpose.
          <br />
          Own your audience.
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
          A full-featured CMS that gives you complete control over your content,
          SEO, and publishing workflow.
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
            style={btnStyle("blue", "lg")}
            onClick={() => onNavigate("signup")}
          >
            Start publishing free →
          </button>
          <button
            style={btnStyle("outline", "lg")}
            onClick={() => onNavigate("features")}
          >
            See all features
          </button>
        </div>
      </section>

      {/* WORKFLOW */}
      <section
        style={{
          padding: "72px 40px",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
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
            From idea to published in minutes
          </h2>
          <p style={{ fontSize: 16, color: "#666" }}>
            A publishing workflow built for speed and collaboration.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 24,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {WORKFLOW.map((w, i) => (
            <div
              key={w.step}
              style={{ textAlign: "center", position: "relative" }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "#e3f2fd",
                  color: "#2196f3",
                  fontSize: 16,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                {w.step}
              </div>
              {i < WORKFLOW.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 26,
                    left: "calc(50% + 30px)",
                    right: "calc(-50% + 30px)",
                    height: 2,
                    background: "#e3f2fd",
                    display: "block",
                  }}
                />
              )}
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
                {w.title}
              </h3>
              <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ padding: "72px 40px" }}>
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
            Content tools that scale
          </h2>
          <p style={{ fontSize: 16, color: "#666" }}>
            Everything a modern publisher needs — no plugins required.
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
          {CONTENT_FEATURES.map((f) => (
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
                  "0 8px 32px rgba(33,150,243,0.1)";
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
          background: "#2196f3",
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
          Your content. Your rules.
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
          No algorithm decides who sees your work. Own your audience, your data,
          and your distribution.
        </p>
        <button
          style={{
            ...btnStyle("outline", "lg"),
            background: "#fff",
            color: "#2196f3",
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
          Start publishing today
        </h2>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          Free forever. No credit card needed.
        </p>
        <button
          style={btnStyle("blue", "lg")}
          onClick={() => onNavigate("signup")}
        >
          Create free account →
        </button>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
