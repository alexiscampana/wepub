import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const RELEASES = [
  {
    version: "2.8.0",
    date: "June 3, 2026",
    tag: "Major",
    tagColor: "#00b67a",
    tagBg: "#e6f9f2",
    title: "Block editor 3.0 + product embeds",
    summary:
      "A completely rebuilt block editor with 40+ new blocks, drag-and-drop reordering, and the ability to embed live products directly inside any post or page.",
    changes: [
      {
        type: "new",
        text: "40+ new content blocks including video, testimonial, countdown, and pricing table",
      },
      {
        type: "new",
        text: "Embed live products inside blog posts — readers can add to cart without leaving the article",
      },
      {
        type: "new",
        text: "Drag-and-drop block reordering with keyboard accessibility",
      },
      {
        type: "new",
        text: "Full-width and wide-width layout options for any block",
      },
      { type: "improved", text: "50% faster editor load time" },
      { type: "improved", text: "Auto-save drafts every 30 seconds" },
      { type: "fixed", text: "Fixed image alignment bug in Safari" },
    ],
  },
  {
    version: "2.7.0",
    date: "May 20, 2026",
    tag: "Feature",
    tagColor: "#2196f3",
    tagBg: "#e3f2fd",
    title: "Subscription billing & recurring products",
    summary:
      "Sell recurring products and memberships natively. Set billing cycles, manage pauses, and handle upgrades all from one dashboard.",
    changes: [
      {
        type: "new",
        text: "Native subscription billing for physical and digital products",
      },
      {
        type: "new",
        text: "Customer subscription portal — manage, pause, or cancel without contacting support",
      },
      {
        type: "new",
        text: "Flexible billing cycles: weekly, monthly, quarterly, annually",
      },
      {
        type: "new",
        text: "Dunning management — automatic retry logic for failed payments",
      },
      {
        type: "improved",
        text: "Payment dashboard now shows MRR, churn, and LTV metrics",
      },
      {
        type: "fixed",
        text: "Fixed currency rounding issue on checkout for JPY and KRW",
      },
    ],
  },
  {
    version: "2.6.2",
    date: "May 8, 2026",
    tag: "Patch",
    tagColor: "#f59e0b",
    tagBg: "#fef3c7",
    title: "Performance & security patch",
    summary:
      "Critical security updates and performance improvements across the storefront and dashboard.",
    changes: [
      {
        type: "fixed",
        text: "Patched XSS vulnerability in custom HTML block (CVE-2026-1234)",
      },
      {
        type: "fixed",
        text: "Fixed session timeout issue affecting users in UTC+8 and beyond",
      },
      {
        type: "fixed",
        text: "Resolved duplicate order creation on slow connections",
      },
      { type: "improved", text: "Storefront JS bundle reduced by 22%" },
      {
        type: "improved",
        text: "Image CDN now serves AVIF format to supported browsers",
      },
    ],
  },
  {
    version: "2.6.0",
    date: "April 28, 2026",
    tag: "Feature",
    tagColor: "#2196f3",
    tagBg: "#e3f2fd",
    title: "Multi-language & international selling",
    summary:
      "Sell to any market with localized storefronts, automatic currency conversion, and translated checkout.",
    changes: [
      {
        type: "new",
        text: "Support for 42 languages across storefront and checkout",
      },
      {
        type: "new",
        text: "Automatic currency conversion with live exchange rates",
      },
      {
        type: "new",
        text: "Per-market pricing — set fixed prices for specific currencies",
      },
      {
        type: "new",
        text: "Localized email notifications per customer language",
      },
      {
        type: "improved",
        text: "VAT and tax handling now covers all EU countries",
      },
      { type: "fixed", text: "Fixed RTL layout issues for Arabic and Hebrew" },
    ],
  },
  {
    version: "2.5.0",
    date: "April 10, 2026",
    tag: "Major",
    tagColor: "#00b67a",
    tagBg: "#e6f9f2",
    title: "WePub Analytics 2.0",
    summary:
      "A completely rebuilt analytics dashboard showing revenue, content, and traffic side by side for the first time.",
    changes: [
      {
        type: "new",
        text: "Unified revenue + content analytics on one screen",
      },
      {
        type: "new",
        text: "Content-to-revenue attribution — see which posts drive sales",
      },
      {
        type: "new",
        text: "Cohort analysis for subscriber and customer retention",
      },
      { type: "new", text: "Exportable reports in CSV and PDF" },
      { type: "improved", text: "Dashboard now loads in under 1 second" },
      {
        type: "fixed",
        text: "Fixed timezone discrepancy in daily revenue chart",
      },
    ],
  },
];

const TYPE_STYLES = {
  new: { label: "New", bg: "#e6f9f2", color: "#00895a" },
  improved: { label: "Improved", bg: "#e3f2fd", color: "#1565c0" },
  fixed: { label: "Fixed", bg: "#fef3c7", color: "#92400e" },
};

export default function ChangelogPage({ onNavigate, user, onLogout }) {
  const [filter, setFilter] = useState("All");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const tags = ["All", "Major", "Feature", "Patch"];
  const filtered = RELEASES.filter((r) => filter === "All" || r.tag === filter);

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
          padding: "72px 40px 48px",
          textAlign: "center",
          borderBottom: "1px solid #f0f0f0",
          background: "#fafafa",
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
          Changelog
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-1px",
          }}
        >
          What's new in WePub
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#666",
            marginBottom: 28,
            maxWidth: 440,
            margin: "0 auto 28px",
          }}
        >
          New features, improvements, and fixes — shipped every two weeks.
        </p>

        {/* Subscribe */}
        {subscribed ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#e6f9f2",
              border: "1px solid #c8f0e0",
              borderRadius: 99,
              padding: "8px 18px",
              fontSize: 14,
              color: "#00895a",
              fontWeight: 500,
            }}
          >
            ✓ You'll be notified of new releases
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              maxWidth: 380,
              margin: "0 auto",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Get release emails..."
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid #ddd",
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <button
              style={btnStyle("green")}
              onClick={() => email.includes("@") && setSubscribed(true)}
            >
              Notify me
            </button>
          </div>
        )}
      </section>

      {/* FILTER */}
      <section
        style={{
          padding: "24px 40px 0",
          display: "flex",
          gap: 6,
          maxWidth: 860,
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "7px 18px",
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              border: "1px solid",
              background: filter === t ? "#111" : "#fff",
              color: filter === t ? "#fff" : "#555",
              borderColor: filter === t ? "#111" : "#ddd",
              transition: "all 0.15s",
            }}
          >
            {t}
          </button>
        ))}
      </section>

      {/* RELEASES */}
      <section
        style={{ padding: "32px 40px 80px", maxWidth: 860, margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: 11,
              top: 24,
              bottom: 0,
              width: 2,
              background: "#f0f0f0",
              zIndex: 0,
            }}
          />

          {filtered.map((release, i) => (
            <div
              key={release.version}
              style={{
                display: "flex",
                gap: 28,
                paddingBottom: 48,
                position: "relative",
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: release.tagBg,
                  border: `3px solid ${release.tagColor}`,
                  flexShrink: 0,
                  marginTop: 4,
                  zIndex: 1,
                }}
              />

              <div style={{ flex: 1 }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: release.tagBg,
                      color: release.tagColor,
                      fontSize: 11,
                      fontWeight: 700,
                      borderRadius: 99,
                      padding: "3px 10px",
                    }}
                  >
                    {release.tag}
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#111" }}
                  >
                    v{release.version}
                  </span>
                  <span style={{ fontSize: 12, color: "#aaa" }}>
                    {release.date}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 8,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {release.title}
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  {release.summary}
                </p>

                {/* Change list */}
                <div
                  style={{
                    background: "#fafafa",
                    border: "1px solid #ebebeb",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  {release.changes.map((change, j) => {
                    const s = TYPE_STYLES[change.type];
                    return (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: "12px 16px",
                          borderBottom:
                            j < release.changes.length - 1
                              ? "1px solid #f0f0f0"
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            background: s.bg,
                            color: s.color,
                            fontSize: 10,
                            fontWeight: 700,
                            borderRadius: 99,
                            padding: "2px 8px",
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          {s.label}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            color: "#444",
                            lineHeight: 1.6,
                          }}
                        >
                          {change.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
