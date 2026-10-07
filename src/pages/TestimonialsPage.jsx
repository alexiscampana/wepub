import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const REVIEWS = [
  {
    name: "Maya R.",
    role: "Jewelry maker",
    initials: "MR",
    bg: "#e6f9f2",
    color: "#00b67a",
    rating: 5,
    category: "Commerce",
    text: "I moved from Shopify + a separate blog and my revenue went up 40% in three months. The product embeds in blog posts are pure gold. Readers buy without even thinking about it.",
  },
  {
    name: "James C.",
    role: "Food blogger & shop owner",
    initials: "JC",
    bg: "#e3f2fd",
    color: "#2196f3",
    rating: 5,
    category: "Content",
    text: "I've tried every CMS out there. The block editor in ShopPress is the best writing experience I've had, and knowing my readers can buy directly from my recipes is something I didn't know I needed.",
  },
  {
    name: "Aisha T.",
    role: "Course creator",
    initials: "AT",
    bg: "#ede9fe",
    color: "#7c3aed",
    rating: 5,
    category: "Commerce",
    text: "Digital product delivery is seamless. My students get instant access, I get zero support tickets about downloads, and the subscription billing handles my monthly membership automatically.",
  },
  {
    name: "Tom W.",
    role: "E-commerce director",
    initials: "TW",
    bg: "#fef3c7",
    color: "#d97706",
    rating: 5,
    category: "Analytics",
    text: "The content-to-revenue analytics changed how we think about our blog. We found one article was responsible for 28% of our sales. We never would have known on Shopify.",
  },
  {
    name: "Sofia L.",
    role: "Skincare brand founder",
    initials: "SL",
    bg: "#fce8e8",
    color: "#ef4444",
    rating: 5,
    category: "Commerce",
    text: "Customer support is unlike anything I've experienced with a SaaS product. I had a complex tax setup question and got a real answer in 8 minutes. No bots, no scripts.",
  },
  {
    name: "Raj K.",
    role: "Tech reviewer & affiliate",
    initials: "RK",
    bg: "#e0f7fa",
    color: "#0891b2",
    rating: 5,
    category: "Content",
    text: "As someone who writes long-form reviews, having the product widget embedded right in my article is a conversion machine. My affiliate revenue doubled in the first month.",
  },
  {
    name: "Priya M.",
    role: "Subscription box owner",
    initials: "PM",
    bg: "#e6f9f2",
    color: "#00b67a",
    rating: 4,
    category: "Commerce",
    text: "Subscription billing is solid. Set up once, forget about it. The dunning management has recovered payments I would have lost on my old platform. Would give 5 stars but want more analytics.",
  },
  {
    name: "Daniel F.",
    role: "Marketing agency owner",
    initials: "DF",
    bg: "#e3f2fd",
    color: "#2196f3",
    rating: 5,
    category: "Platform",
    text: "We've migrated 11 clients from Shopify + WordPress to ShopPress. Every single one has seen a reduction in monthly tooling costs and an improvement in site speed. It's a no-brainer.",
  },
  {
    name: "Leila S.",
    role: "Travel blogger",
    initials: "LS",
    bg: "#ede9fe",
    color: "#7c3aed",
    rating: 5,
    category: "Content",
    text: "SEO improved noticeably within 6 weeks of moving my content here. The structured data is automatic, the sitemap updates itself, and the editor actually encourages good writing habits.",
  },
];

const CASE_STUDIES = [
  {
    company: "Bloom Studio",
    industry: "Handmade ceramics",
    emoji: "🏺",
    result: "+187% revenue",
    period: "in 6 months",
    story:
      "Moved from Etsy + a Squarespace blog. Product embeds in tutorials drove a 3x increase in average order value as readers could buy what they were learning about.",
  },
  {
    company: "The Daily Ritual",
    industry: "Coffee subscription",
    emoji: "☕",
    result: "40% less churn",
    period: "in 3 months",
    story:
      "Switched to ShopPress's native subscription billing from a patchwork of WooCommerce plugins. Automated dunning management alone recovered $12,000 in failed payments.",
  },
  {
    company: "Trail & Summit",
    industry: "Outdoor gear review blog",
    emoji: "🏔️",
    result: "3.2x conversions",
    period: "vs previous platform",
    story:
      "Embedded product widgets in gear reviews converted at 8.4% — versus 2.6% when linking to an external store. Content and commerce being on the same platform made all the difference.",
  },
];

const CATEGORIES = ["All", "Commerce", "Content", "Analytics", "Platform"];

const STATS = [
  { value: "4.9/5", label: "Average rating", sub: "across 2,400+ reviews" },
  { value: "97%", label: "Would recommend", sub: "to a friend or colleague" },
  { value: "40%", label: "Avg revenue increase", sub: "in first 6 months" },
  { value: "1M+", label: "Merchants trust us", sub: "across 90+ countries" },
];

export default function TestimonialsPage({ onNavigate, user, onLogout }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered =
    activeCategory === "All"
      ? REVIEWS
      : REVIEWS.filter((r) => r.category === activeCategory);

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
          padding: "72px 40px 56px",
          textAlign: "center",
          background: "#fafafa",
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
            marginBottom: 12,
          }}
        >
          Reviews
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 46px)",
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-1px",
          }}
        >
          Loved by merchants & publishers
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#666",
            maxWidth: 440,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          Real reviews from real customers. No cherry-picking, no paid
          placements.
        </p>
        {/* Star display */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span style={{ color: "#f59e0b", fontSize: 28 }}>★★★★★</span>
          <span style={{ fontSize: 22, fontWeight: 700 }}>4.9</span>
          <span style={{ fontSize: 14, color: "#aaa" }}>
            from 2,400+ reviews
          </span>
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
                fontSize: 30,
                fontWeight: 700,
                color: "#00b67a",
                letterSpacing: "-1px",
                marginBottom: 4,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>
              {s.label}
            </div>
            <div style={{ fontSize: 12, color: "#aaa" }}>{s.sub}</div>
          </div>
        ))}
      </section>

      {/* CASE STUDIES */}
      <section
        style={{
          padding: "clamp(24px,4vw,64px) clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 30,
              fontWeight: 700,
              marginBottom: 32,
              letterSpacing: "-0.3px",
            }}
          >
            Case studies
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.company}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 20,
                  padding: "28px 24px",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.08)";
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
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "#f4fdf9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    {cs.emoji}
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
                      {cs.company}
                    </p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
                      {cs.industry}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    background: "#f4fdf9",
                    borderRadius: 10,
                    padding: "12px 16px",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#00b67a",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {cs.result}
                  </span>
                  <span style={{ fontSize: 13, color: "#888", marginLeft: 6 }}>
                    {cs.period}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#555",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {cs.story}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section style={{ padding: "64px 40px 80px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 28,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "-0.3px",
              }}
            >
              Customer reviews
            </h2>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 99,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid",
                    background: activeCategory === c ? "#111" : "#fff",
                    color: activeCategory === c ? "#fff" : "#555",
                    borderColor: activeCategory === c ? "#111" : "#ddd",
                    transition: "all 0.15s",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: 16,
            }}
          >
            {filtered.map((r) => (
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
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <span style={{ color: "#f59e0b", fontSize: 14 }}>
                    {"★".repeat(r.rating)}
                  </span>
                  <span
                    style={{
                      background: "#f5f5f5",
                      color: "#555",
                      fontSize: 11,
                      fontWeight: 500,
                      borderRadius: 99,
                      padding: "2px 8px",
                    }}
                  >
                    {r.category}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#444",
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  "{r.text}"
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    paddingTop: 14,
                    borderTop: "1px solid #f5f5f5",
                  }}
                >
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
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {r.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#888" }}>{r.role}</div>
                  </div>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 11,
                      background: "#e6f9f2",
                      color: "#00895a",
                      borderRadius: 99,
                      padding: "2px 8px",
                      fontWeight: 600,
                    }}
                  >
                    Verified
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
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          textAlign: "center",
          background: "linear-gradient(135deg, #f4fdf9, #eff6ff)",
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
          Join 1 million merchants
        </h2>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          Free forever. No credit card required.
        </p>
        <button
          style={btnStyle("green", "lg")}
          onClick={() => onNavigate("signup")}
        >
          Get started free →
        </button>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
