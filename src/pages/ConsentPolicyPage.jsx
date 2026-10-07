import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const COOKIE_TYPES = [
  {
    type: "Strictly necessary",
    color: "#00b67a",
    bg: "#e6f9f2",
    desc: "These cookies are required for the website to function and cannot be switched off. They are usually set in response to actions you take such as logging in or filling in forms.",
    cookies: [
      {
        name: "sp_session",
        purpose: "Keeps you logged in during your visit",
        duration: "Session",
        provider: "WePub",
      },
      {
        name: "sp_user",
        purpose: "Stores your authentication state",
        duration: "30 days",
        provider: "WePub",
      },
      {
        name: "sp_csrf",
        purpose: "Prevents cross-site request forgery attacks",
        duration: "Session",
        provider: "WePub",
      },
    ],
  },
  {
    type: "Analytics",
    color: "#2196f3",
    bg: "#e3f2fd",
    desc: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the platform.",
    cookies: [
      {
        name: "_ga",
        purpose: "Google Analytics — distinguishes unique users",
        duration: "2 years",
        provider: "Google",
      },
      {
        name: "_ga_*",
        purpose: "Google Analytics — maintains session state",
        duration: "2 years",
        provider: "Google",
      },
      {
        name: "sp_analytics",
        purpose: "Tracks feature usage to improve the product",
        duration: "1 year",
        provider: "WePub",
      },
    ],
  },
  {
    type: "Functional",
    color: "#7c3aed",
    bg: "#ede9fe",
    desc: "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we use.",
    cookies: [
      {
        name: "sp_prefs",
        purpose: "Remembers your language and display preferences",
        duration: "1 year",
        provider: "WePub",
      },
      {
        name: "sp_theme",
        purpose: "Stores your selected theme preference",
        duration: "1 year",
        provider: "WePub",
      },
      {
        name: "intercom-*",
        purpose: "Live chat support widget",
        duration: "9 months",
        provider: "Intercom",
      },
    ],
  },
  {
    type: "Marketing",
    color: "#f59e0b",
    bg: "#fef3c7",
    desc: "These cookies are set by our advertising partners to build a profile of your interests and show you relevant ads on other sites. You can opt out at any time.",
    cookies: [
      {
        name: "_fbp",
        purpose: "Facebook Pixel — tracks conversions from Facebook ads",
        duration: "3 months",
        provider: "Meta",
      },
      {
        name: "fr",
        purpose: "Facebook — delivers and measures ad effectiveness",
        duration: "3 months",
        provider: "Meta",
      },
      {
        name: "sp_ref",
        purpose: "Tracks referral source for attribution",
        duration: "30 days",
        provider: "WePub",
      },
    ],
  },
];

const SECTIONS = [
  {
    id: "what",
    title: "What are cookies?",
    content:
      "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners. Cookies do not contain personally identifiable information, but personal information that we store about you may be linked to information stored in and obtained from cookies.",
  },
  {
    id: "how",
    title: "How we use cookies",
    content:
      "WePub uses cookies to operate our platform, remember your preferences, analyse how our service is used, and deliver relevant marketing. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them).",
  },
  {
    id: "third",
    title: "Third-party cookies",
    content:
      "Some cookies are placed by third-party services that appear on our pages, such as Google Analytics for traffic analysis, Intercom for live chat support, and Meta Pixel for advertising measurement. These third parties have their own privacy policies governing the use of such information.",
  },
  {
    id: "control",
    title: "How to control cookies",
    content:
      "You can control and manage cookies in several ways. You can use our cookie consent banner to accept or decline non-essential cookies at any time. You can also set or amend your web browser controls to accept or refuse cookies. If you choose to refuse cookies, please note that some parts of the WePub platform may not function correctly.",
  },
  {
    id: "updates",
    title: "Updates to this policy",
    content:
      "We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. We will notify you of significant changes by updating the date at the top of this page or by sending you a notification. Last updated: June 1, 2026.",
  },
];

export default function ConsentPolicyPage({ onNavigate, user, onLogout }) {
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

      {/* HEADER */}
      <section
        style={{
          padding: "64px 40px 48px",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
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
            Legal
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              marginBottom: 8,
              letterSpacing: "-0.5px",
            }}
          >
            Cookie Policy
          </h1>
          <p style={{ fontSize: 14, color: "#aaa", marginBottom: 20 }}>
            Last updated: June 1, 2026
          </p>
          <p
            style={{
              fontSize: 16,
              color: "#555",
              lineHeight: 1.7,
              maxWidth: 600,
            }}
          >
            This Cookie Policy explains how WePub Inc. uses cookies and similar
            tracking technologies when you use our platform. It explains what
            these technologies are, why we use them, and your rights to control
            their use.
          </p>
        </div>
      </section>

      <div
        style={{ maxWidth: 900, margin: "0 auto", padding: "48px 40px 80px" }}
      >
        {/* INFO SECTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            marginBottom: 56,
          }}
        >
          {SECTIONS.map((s) => (
            <div
              key={s.id}
              style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 32 }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 12,
                  letterSpacing: "-0.3px",
                }}
              >
                {s.title}
              </h2>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 1.85 }}>
                {s.content}
              </p>
            </div>
          ))}
        </div>

        {/* COOKIE TABLES */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 8,
            letterSpacing: "-0.5px",
          }}
        >
          Cookies we use
        </h2>
        <p style={{ fontSize: 15, color: "#666", marginBottom: 32 }}>
          A full list of the cookies placed on your device when you use WePub.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {COOKIE_TYPES.map((ct) => (
            <div
              key={ct.type}
              style={{
                border: "1px solid #ebebeb",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Category header */}
              <div
                style={{
                  padding: "16px 20px",
                  background: ct.bg,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderBottom: "1px solid #ebebeb",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: ct.color,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: ct.color,
                    margin: 0,
                  }}
                >
                  {ct.type} cookies
                </h3>
              </div>
              <div
                style={{
                  padding: "14px 20px 16px",
                  borderBottom: "1px solid #f5f5f5",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    color: "#666",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {ct.desc}
                </p>
              </div>

              {/* Cookie table */}
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr style={{ background: "#fafafa" }}>
                      {["Cookie name", "Purpose", "Duration", "Provider"].map(
                        (h) => (
                          <th
                            key={h}
                            style={{
                              padding: "10px 16px",
                              textAlign: "left",
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#aaa",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {ct.cookies.map((c, i) => (
                      <tr
                        key={c.name}
                        style={{
                          borderBottom:
                            i < ct.cookies.length - 1
                              ? "1px solid #f5f5f5"
                              : "none",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: "#111",
                            fontWeight: 600,
                          }}
                        >
                          {c.name}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#555",
                            lineHeight: 1.5,
                          }}
                        >
                          {c.purpose}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#888",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {c.duration}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              background: "#f5f5f5",
                              color: "#555",
                              borderRadius: 99,
                              padding: "2px 10px",
                              fontSize: 12,
                            }}
                          >
                            {c.provider}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* MANAGE PREFERENCES */}
        <div
          style={{
            marginTop: 48,
            background: "linear-gradient(135deg, #f4fdf9, #eff6ff)",
            border: "1px solid #e0f0e8",
            borderRadius: 16,
            padding: "28px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
              Manage your cookie preferences
            </h3>
            <p style={{ fontSize: 14, color: "#666", margin: 0 }}>
              You can update your preferences at any time.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={btnStyle("outline")}
              onClick={() => {
                localStorage.removeItem("sp_cookie_consent");
                window.location.reload();
              }}
            >
              Reset preferences
            </button>
            <button
              style={btnStyle("green")}
              onClick={() => onNavigate("privacy")}
            >
              Privacy policy →
            </button>
          </div>
        </div>
      </div>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
