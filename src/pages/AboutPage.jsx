import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const TEAM = [
  {
    name: "Maya Chen",
    role: "Co-founder & CEO",
    initials: "MC",
    bg: "#e6f9f2",
    color: "#00b67a",
    bio: "Former head of product at Stripe. Built her first Shopify store at 17.",
  },
  {
    name: "Ravi Patel",
    role: "Co-founder & CTO",
    initials: "RP",
    bg: "#e3f2fd",
    color: "#2196f3",
    bio: "Ex-WordPress core contributor. Obsessed with editor performance and developer experience.",
  },
  {
    name: "Leila Santos",
    role: "Head of Design",
    initials: "LS",
    bg: "#ede9fe",
    color: "#7c3aed",
    bio: "Designed commerce experiences at Shopify and Figma. Believes great UX is invisible.",
  },
  {
    name: "Tom Nakamura",
    role: "Head of Engineering",
    initials: "TN",
    bg: "#fef3c7",
    color: "#d97706",
    bio: "Built distributed systems at Cloudflare. Keeps WePub at 99.99% uptime.",
  },
  {
    name: "Amara Osei",
    role: "Head of Growth",
    initials: "AO",
    bg: "#fce8e8",
    color: "#ef4444",
    bio: "Scaled three startups from 0 to 100k users. Loves data and hates vanity metrics.",
  },
  {
    name: "Sofia Kim",
    role: "Head of Customer Success",
    initials: "SK",
    bg: "#e0f7fa",
    color: "#0891b2",
    bio: "Has personally onboarded 500+ merchants. Knows every edge case by heart.",
  },
];

const VALUES = [
  {
    icon: "🤝",
    title: "Merchant first",
    desc: "Every product decision starts with the same question: does this make our merchants more successful?",
  },
  {
    icon: "🔓",
    title: "Radical transparency",
    desc: "We publish our uptime, our roadmap, and our mistakes. No fine print, no hidden fees, no surprises.",
  },
  {
    icon: "🌱",
    title: "Long-term thinking",
    desc: "We're building a company to last decades, not to flip. That means doing things right, not just fast.",
  },
  {
    icon: "⚡",
    title: "Speed matters",
    desc: "Fast products. Fast support. Fast iteration. We believe speed is a form of respect for people's time.",
  },
];

const MILESTONES = [
  {
    year: "2021",
    event: "WePub founded in a Lisbon apartment by Maya and Ravi.",
  },
  {
    year: "2022",
    event: "Launched public beta. 1,000 merchants signed up in the first week.",
  },
  { year: "2023", event: "Reached $10M ARR. Hired our first 20 team members." },
  {
    year: "2024",
    event: "Launched the plugin marketplace with 5,000+ integrations.",
  },
  {
    year: "2025",
    event: "1 million merchants worldwide. Series B funding closed.",
  },
  {
    year: "2026",
    event: "WePub goes global. 90 team members across 18 countries.",
  },
];

export default function AboutPage({ onNavigate, user, onLogout }) {
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
        activePage="about"
        user={user}
        onLogout={onLogout}
      />

      {/* HERO */}
      <section
        style={{
          padding: "clamp(24px,4vw,88px) clamp(16px,4vw,40px) 72px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f4fdf9 0%, #eff6ff 100%)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#00b67a",
            marginBottom: 14,
          }}
        >
          About us
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 54px)",
            fontWeight: 700,
            marginBottom: 20,
            letterSpacing: "-1px",
            maxWidth: 640,
            margin: "0 auto 20px",
          }}
        >
          We're on a mission to make selling and publishing equally powerful.
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "#555",
            maxWidth: 520,
            margin: "0 auto 36px",
            lineHeight: 1.75,
          }}
        >
          WePub was born from a frustration every creator knows: why should you
          have to choose between a great store and a great blog? You shouldn't.
          So we built a platform that does both, beautifully.
        </p>
        <div
          style={{
            display: "flex",
            gap: 40,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            ["1M+", "Merchants"],
            ["90", "Team members"],
            ["18", "Countries"],
            ["$500B+", "Processed"],
          ].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#00b67a",
                  letterSpacing: "-1px",
                }}
              >
                {val}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#00b67a",
            marginBottom: 14,
          }}
        >
          Our story
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 24,
            letterSpacing: "-0.5px",
          }}
        >
          Started by two people who were tired of duct tape
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#444",
            lineHeight: 1.85,
            marginBottom: 20,
          }}
        >
          In 2021, Maya was running an online ceramics store on Shopify while
          managing a growing blog on WordPress. Every week, she'd wrestle with
          plugins that conflicted, analytics that didn't talk to each other, and
          two separate bills.
        </p>
        <p
          style={{
            fontSize: 16,
            color: "#444",
            lineHeight: 1.85,
            marginBottom: 20,
          }}
        >
          She called Ravi — who'd spent years building WordPress core and
          watching the ecosystem struggle to serve commerce — and said: "This is
          insane. We should just build the one platform that does both."
        </p>
        <p style={{ fontSize: 16, color: "#444", lineHeight: 1.85 }}>
          A year later, WePub launched in public beta. The waitlist hit 10,000
          in 72 hours. Turns out, a lot of people were tired of duct tape.
        </p>
      </section>

      {/* VALUES */}
      <section
        style={{
          padding: "clamp(24px,4vw,64px) clamp(16px,4vw,40px)",
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
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
              What we believe
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Our values
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: 20,
            }}
          >
            {VALUES.map((v) => (
              <div
                key={v.title}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "28px 24px",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{v.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
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
            Timeline
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            How we got here
          </h2>
        </div>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div
            style={{
              position: "absolute",
              left: 6,
              top: 8,
              bottom: 8,
              width: 2,
              background: "#f0f0f0",
              borderRadius: 99,
            }}
          />
          {MILESTONES.map((m, i) => (
            <div
              key={m.year}
              style={{ position: "relative", paddingBottom: 32 }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -32,
                  top: 4,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#00b67a",
                  border: "3px solid #fff",
                  boxShadow: "0 0 0 2px #00b67a",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#00b67a",
                  letterSpacing: "0.05em",
                }}
              >
                {m.year}
              </span>
              <p
                style={{
                  fontSize: 15,
                  color: "#444",
                  marginTop: 4,
                  lineHeight: 1.6,
                }}
              >
                {m.event}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section
        style={{
          padding: "clamp(24px,4vw,64px) clamp(16px,4vw,40px)",
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
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
              The team
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              The people behind WePub
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            {TEAM.map((member) => (
              <div
                key={member.name}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "24px",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: member.bg,
                    color: member.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <div
                    style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}
                  >
                    {member.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#00b67a",
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    {member.role}
                  </div>
                  <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN US */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          textAlign: "center",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          Want to join us?
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#666",
            marginBottom: 32,
            maxWidth: 420,
            margin: "0 auto 32px",
          }}
        >
          We're a fully remote team of 90 across 18 countries. Always looking
          for great people.
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
            onClick={() => onNavigate("contact")}
          >
            See open roles →
          </button>
          <button
            style={btnStyle("outline", "lg")}
            onClick={() => onNavigate("contact")}
          >
            Get in touch
          </button>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
