import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const COMPETITORS = [
  "WePub",
  "Shopify + WordPress",
  "Shopify alone",
  "WordPress + WooCommerce",
];

const FEATURES = [
  {
    category: "Commerce",
    items: [
      { name: "Unlimited products", values: [true, true, true, true] },
      { name: "No transaction fees", values: [true, false, false, true] },
      {
        name: "Subscription billing",
        values: [true, "Plugin", true, "Plugin"],
      },
      { name: "Abandoned cart recovery", values: [true, true, true, "Plugin"] },
      { name: "POS system", values: [true, true, true, "Plugin"] },
      { name: "Multi-currency", values: [true, true, true, "Plugin"] },
    ],
  },
  {
    category: "Content",
    items: [
      { name: "Built-in blog / CMS", values: [true, true, false, true] },
      { name: "Block editor", values: [true, true, false, true] },
      {
        name: "Embed products in posts",
        values: [true, false, false, "Plugin"],
      },
      { name: "Custom post types", values: [true, true, false, true] },
      {
        name: "Advanced SEO tools",
        values: [true, "Plugin", "Plugin", "Plugin"],
      },
      { name: "Multi-author workflow", values: [true, true, false, true] },
    ],
  },
  {
    category: "Platform",
    items: [
      { name: "Unified analytics", values: [true, false, false, false] },
      { name: "Single dashboard", values: [true, false, false, false] },
      { name: "One monthly bill", values: [true, false, false, true] },
      { name: "Plugin marketplace", values: [true, true, true, true] },
      { name: "99.99% uptime SLA", values: [true, true, true, false] },
      { name: "24/7 support", values: [true, true, true, false] },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        name: "Starting price / month",
        values: ["Free", "$79+", "$39", "$Free*"],
      },
      { name: "Free to use", values: [true, false, false, true] },
      {
        name: "Transaction fees",
        values: ["None", "0.5–2%", "0.5–2%", "None"],
      },
      { name: "Hosting included", values: [true, true, true, false] },
    ],
  },
];

const VERDICTS = [
  {
    title: "WePub vs Shopify + WordPress",
    winner: "WePub",
    summary:
      "Running Shopify and WordPress separately means two monthly bills, two dashboards, zero unified analytics, and plugins that constantly conflict. WePub does everything both do — in one place, for less.",
  },
  {
    title: "WePub vs Shopify alone",
    winner: "WePub",
    summary:
      "Shopify is excellent for commerce but has no real CMS. If you ever want a blog, you're stuck with Shopify's basic editor or adding WordPress on top. WePub is built for sellers who also publish.",
  },
  {
    title: "WePub vs WordPress + WooCommerce",
    winner: "WePub",
    summary:
      "WordPress + WooCommerce is powerful but requires hosting, constant maintenance, plugin management, and technical knowledge. WePub is managed, fast, and just works — without the headaches.",
  },
];

function Cell({ value }) {
  if (value === true)
    return <span style={{ color: "#00b67a", fontSize: 18 }}>✓</span>;
  if (value === false)
    return <span style={{ color: "#ddd", fontSize: 18 }}>—</span>;
  return (
    <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 500 }}>
      {value}
    </span>
  );
}

export default function ComparisonPage({ onNavigate, user, onLogout }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...FEATURES.map((f) => f.category)];

  const filtered =
    activeCategory === "All"
      ? FEATURES
      : FEATURES.filter((f) => f.category === activeCategory);

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
          Comparison
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
          WePub vs the alternatives
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#666",
            maxWidth: 480,
            margin: "0 auto 32px",
            lineHeight: 1.7,
          }}
        >
          See exactly how WePub stacks up against Shopify, WordPress, and every
          combination in between.
        </p>
        <button
          style={btnStyle("green", "lg")}
          onClick={() => onNavigate("signup")}
        >
          Try WePub free →
        </button>
      </section>

      {/* VERDICT CARDS */}
      <section
        style={{
          padding: "clamp(24px,4vw,56px) clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 24,
              letterSpacing: "-0.3px",
            }}
          >
            The verdict
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {VERDICTS.map((v) => (
              <div
                key={v.title}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "22px 24px",
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "#e6f9f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  🏆
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
                      {v.title}
                    </h3>
                    <span
                      style={{
                        background: "#e6f9f2",
                        color: "#00895a",
                        fontSize: 11,
                        fontWeight: 700,
                        borderRadius: 99,
                        padding: "2px 10px",
                      }}
                    >
                      Winner: {v.winner}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#666",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {v.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: "56px 40px 80px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.3px",
              }}
            >
              Full feature comparison
            </h2>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {categories.map((c) => (
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
              overflowX: "auto",
              borderRadius: 16,
              border: "1px solid #ebebeb",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 640,
              }}
            >
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#888",
                      borderBottom: "1px solid #f0f0f0",
                      width: "30%",
                    }}
                  >
                    Feature
                  </th>
                  {COMPETITORS.map((c, i) => (
                    <th
                      key={c}
                      style={{
                        padding: "16px 16px",
                        textAlign: "center",
                        fontSize: 13,
                        fontWeight: 600,
                        color: i === 0 ? "#00b67a" : "#111",
                        borderBottom: "1px solid #f0f0f0",
                        background: i === 0 ? "#f4fdf9" : "#fafafa",
                        borderLeft: "1px solid #f0f0f0",
                      }}
                    >
                      {i === 0 && (
                        <span
                          style={{
                            display: "block",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#00b67a",
                            marginBottom: 2,
                          }}
                        >
                          ★ BEST
                        </span>
                      )}
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((group) => (
                  <>
                    <tr key={group.category} style={{ background: "#f9f9f9" }}>
                      <td
                        colSpan={5}
                        style={{
                          padding: "10px 20px",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#aaa",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.items.map((item, j) => (
                      <tr
                        key={item.name}
                        style={{ background: "#fff" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#fafffe")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#fff")
                        }
                      >
                        <td
                          style={{
                            padding: "14px 20px",
                            fontSize: 14,
                            color: "#333",
                            borderBottom: "1px solid #f5f5f5",
                          }}
                        >
                          {item.name}
                        </td>
                        {item.values.map((val, k) => (
                          <td
                            key={k}
                            style={{
                              padding: "14px 16px",
                              textAlign: "center",
                              borderBottom: "1px solid #f5f5f5",
                              background:
                                k === 0
                                  ? "rgba(0,182,122,0.03)"
                                  : "transparent",
                              borderLeft: "1px solid #f5f5f5",
                            }}
                          >
                            <Cell value={val} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: "#aaa", marginTop: 12 }}>
            * WordPress is free but requires paid hosting ($10–30/mo) plus
            WooCommerce plugin costs. Prices accurate as of June 2026.
          </p>
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
          See it for yourself
        </h2>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          Free forever. No credit card required.
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
            Get started free
          </button>
          <button
            style={btnStyle("green", "lg")}
            onClick={() => onNavigate("signup")}
          >
            Get started free →
          </button>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
