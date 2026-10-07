import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { useToast } from "../components/Toast.jsx";

const ENTERPRISE_FEATURES = [
  {
    icon: "🔒",
    title: "Enterprise security",
    desc: "SOC 2 Type II, SSO/SAML, role-based access, audit logs, and data residency options.",
  },
  {
    icon: "📈",
    title: "99.99% uptime SLA",
    desc: "A contractual uptime guarantee backed by redundant infrastructure across multiple regions.",
  },
  {
    icon: "🤝",
    title: "Dedicated account manager",
    desc: "A named point of contact who knows your business and is available when you need them.",
  },
  {
    icon: "⚙️",
    title: "Custom integrations",
    desc: "Deep integrations with your ERP, CRM, WMS, and other enterprise systems via our API.",
  },
  {
    icon: "🏷️",
    title: "White-label option",
    desc: "Remove all ShopPress branding. Run the platform fully under your own brand identity.",
  },
  {
    icon: "🌍",
    title: "Multi-region deployment",
    desc: "Deploy to your preferred cloud regions for compliance, latency, and data sovereignty.",
  },
];

const LOGOS = [
  "Acme Corp",
  "Nexus Retail",
  "Bloom Group",
  "Vantara",
  "Orion Media",
  "PrimeScale",
];

export default function EnterprisePage({ onNavigate, user, onLogout }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    size: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    setSubmitted(true);
    toast.success(
      "Message received! Our sales team will be in touch within 24 hours.",
    );
  };

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
        activePage="enterprise"
        user={user}
        onLogout={onLogout}
      />

      {/* HERO */}
      <section
        style={{
          padding: "80px 40px 64px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(124,58,237,0.25)",
            color: "#c4b5fd",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 99,
            padding: "4px 14px",
            marginBottom: 20,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Enterprise
        </span>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 16,
            letterSpacing: "-1px",
            maxWidth: 620,
            margin: "0 auto 16px",
          }}
        >
          Built for teams that
          <br />
          demand the best.
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 480,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Enterprise-grade commerce and content infrastructure — with the
          security, support, and scale your business requires.
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
              ...btnStyle("outline", "lg"),
              background: "#fff",
              color: "#111",
              border: "none",
            }}
            onClick={() =>
              document
                .getElementById("contact-form")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Talk to sales →
          </button>
          <button
            style={{
              ...btnStyle("outline", "lg"),
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
              background: "transparent",
            }}
            onClick={() => onNavigate("pricing")}
          >
            See pricing
          </button>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section
        style={{
          padding: "32px 40px",
          borderBottom: "1px solid #f0f0f0",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "#aaa",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Trusted by leading teams
        </p>
        <div
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {LOGOS.map((l) => (
            <span
              key={l}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#ccc",
                letterSpacing: "-0.3px",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
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
            Everything in Grow, plus:
          </h2>
          <p style={{ fontSize: 16, color: "#666" }}>
            The tools, security, and support that enterprise teams require.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
            maxWidth: 1060,
            margin: "0 auto",
          }}
        >
          {ENTERPRISE_FEATURES.map((f) => (
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
                  "0 8px 32px rgba(124,58,237,0.1)";
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

      {/* CONTACT FORM */}
      <section
        id="contact-form"
        style={{
          padding: "72px 40px",
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: "-0.5px",
              }}
            >
              Talk to our sales team
            </h2>
            <p style={{ fontSize: 15, color: "#666" }}>
              Tell us about your needs and we'll get back to you within one
              business day.
            </p>
          </div>

          {submitted ? (
            <div
              style={{
                background: "#f4fdf9",
                border: "1px solid #c8f0e0",
                borderRadius: 16,
                padding: "40px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                We got your message!
              </h3>
              <p style={{ fontSize: 14, color: "#666" }}>
                Someone from our team will reach out to {form.email} within one
                business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 20,
                padding: "32px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <label style={labelStyle}>Full name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Alex Johnson"
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Work email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="alex@company.com"
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <label style={labelStyle}>Company name *</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={set("company")}
                    placeholder="Acme Corp"
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Company size</label>
                  <select
                    value={form.size}
                    onChange={set("size")}
                    style={{
                      ...inputStyle,
                      color: form.size ? "#111" : "#aaa",
                    }}
                  >
                    <option value="">Select...</option>
                    <option value="1-10">1–10 employees</option>
                    <option value="11-50">11–50 employees</option>
                    <option value="51-200">51–200 employees</option>
                    <option value="201+">201+ employees</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Tell us about your needs</label>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  placeholder="What are you looking to achieve with ShopPress?"
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", height: "auto" }}
                />
              </div>
              <button
                type="submit"
                style={{
                  ...btnStyle("green", "lg"),
                  justifyContent: "center",
                  marginTop: 4,
                }}
              >
                Send message →
              </button>
              <p style={{ fontSize: 12, color: "#aaa", textAlign: "center" }}>
                We'll get back to you within 1 business day.
              </p>
            </form>
          )}
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

const labelStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: "#444",
  display: "block",
  marginBottom: 6,
};
const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  fontSize: 14,
  border: "1px solid #ddd",
  borderRadius: 10,
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  color: "#111",
  background: "#fff",
  boxSizing: "border-box",
};
