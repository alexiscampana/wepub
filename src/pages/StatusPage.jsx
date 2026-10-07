import { useState, useEffect } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const SERVICES = [
  { name: "Storefront", status: "operational", uptime: "99.99%" },
  { name: "Dashboard", status: "operational", uptime: "99.98%" },
  { name: "Checkout & Payments", status: "operational", uptime: "99.99%" },
  { name: "API", status: "operational", uptime: "99.97%" },
  { name: "Media CDN", status: "operational", uptime: "100%" },
  { name: "Email delivery", status: "degraded", uptime: "99.91%" },
  { name: "Analytics", status: "operational", uptime: "99.95%" },
  { name: "Auth & SSO", status: "operational", uptime: "99.99%" },
];

const INCIDENTS = [
  {
    date: "May 28, 2026",
    status: "resolved",
    title: "Email delivery delays",
    updates: [
      {
        time: "14:32 UTC",
        text: "Issue resolved. All emails have been delivered. Root cause was a misconfiguration in our email routing rules following a routine infrastructure update.",
      },
      {
        time: "13:10 UTC",
        text: "We have identified the issue and are deploying a fix. Some transactional emails (order confirmations, password resets) may be delayed by up to 30 minutes.",
      },
      {
        time: "12:45 UTC",
        text: "We are investigating reports of delayed email delivery. All other services are unaffected.",
      },
    ],
  },
  {
    date: "May 10, 2026",
    status: "resolved",
    title: "Dashboard slow load times",
    updates: [
      {
        time: "09:15 UTC",
        text: "Fully resolved. We scaled up our dashboard servers and response times are back to normal.",
      },
      {
        time: "08:40 UTC",
        text: "Investigating elevated response times on the merchant dashboard. Storefronts and checkout are unaffected.",
      },
    ],
  },
  {
    date: "April 22, 2026",
    status: "resolved",
    title: "API elevated error rate",
    updates: [
      {
        time: "16:55 UTC",
        text: "Resolved. A bad deploy was rolled back and error rates have returned to baseline.",
      },
      {
        time: "16:20 UTC",
        text: "We are seeing an elevated error rate on API calls (roughly 2%). We have identified the cause and are rolling back a recent deploy.",
      },
    ],
  },
];

const UPTIME_DAYS = Array.from({ length: 90 }, (_, i) => {
  const r = Math.random();
  return r > 0.97 ? "incident" : r > 0.94 ? "degraded" : "operational";
});

const STATUS_CONFIG = {
  operational: { color: "#00b67a", bg: "#e6f9f2", label: "Operational" },
  degraded: { color: "#f59e0b", bg: "#fef3c7", label: "Degraded performance" },
  outage: { color: "#ef4444", bg: "#fee2e2", label: "Major outage" },
  incident: { color: "#ef4444", bg: "#fee2e2", label: "Incident" },
};

const allOperational = SERVICES.every((s) => s.status === "operational");

export default function StatusPage({ onNavigate, user, onLogout }) {
  const [time, setTime] = useState(new Date());
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [openIncident, setOpenIncident] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

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

      {/* OVERALL STATUS BANNER */}
      <section
        style={{
          padding: "56px 40px 48px",
          textAlign: "center",
          background: allOperational
            ? "linear-gradient(135deg, #f4fdf9, #e8f5e9)"
            : "linear-gradient(135deg, #fef3c7, #fff8e1)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: allOperational ? "#e6f9f2" : "#fef3c7",
            border: `1px solid ${allOperational ? "#c8f0e0" : "#fcd34d"}`,
            borderRadius: 99,
            padding: "8px 20px",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: allOperational ? "#00b67a" : "#f59e0b",
              boxShadow: `0 0 0 3px ${allOperational ? "rgba(0,182,122,0.2)" : "rgba(245,158,11,0.2)"}`,
            }}
          />
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: allOperational ? "#00895a" : "#92400e",
            }}
          >
            {allOperational
              ? "All systems operational"
              : "Some systems experiencing issues"}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "#aaa" }}>
          Last updated: {time.toUTCString()}
        </p>
      </section>

      <div
        style={{ maxWidth: 860, margin: "0 auto", padding: "48px 40px 80px" }}
      >
        {/* SERVICES */}
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 20,
              letterSpacing: "-0.3px",
            }}
          >
            System components
          </h2>
          <div
            style={{
              border: "1px solid #ebebeb",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {SERVICES.map((service, i) => {
              const cfg = STATUS_CONFIG[service.status];
              return (
                <div
                  key={service.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    borderBottom:
                      i < SERVICES.length - 1 ? "1px solid #f5f5f5" : "none",
                    gap: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: cfg.color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>
                      {service.name}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <span style={{ fontSize: 12, color: "#aaa" }}>
                      {service.uptime} uptime
                    </span>
                    <span
                      style={{
                        background: cfg.bg,
                        color: cfg.color,
                        fontSize: 12,
                        fontWeight: 600,
                        borderRadius: 99,
                        padding: "3px 10px",
                      }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* UPTIME HISTORY */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.3px",
              }}
            >
              Uptime history
            </h2>
            <span style={{ fontSize: 13, color: "#aaa" }}>Last 90 days</span>
          </div>
          <div
            style={{
              background: "#fafafa",
              border: "1px solid #ebebeb",
              borderRadius: 14,
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 2,
                alignItems: "flex-end",
                height: 40,
                marginBottom: 8,
              }}
            >
              {UPTIME_DAYS.map((status, i) => (
                <div
                  key={i}
                  title={status}
                  style={{
                    flex: 1,
                    height:
                      status === "operational"
                        ? "100%"
                        : status === "degraded"
                          ? "60%"
                          : "30%",
                    background:
                      status === "operational"
                        ? "#00b67a"
                        : status === "degraded"
                          ? "#f59e0b"
                          : "#ef4444",
                    borderRadius: 2,
                    opacity: 0.8,
                    transition: "opacity 0.15s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "#aaa",
              }}
            >
              <span>90 days ago</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "flex", gap: 10 }}>
                  {[
                    ["#00b67a", "Operational"],
                    ["#f59e0b", "Degraded"],
                    ["#ef4444", "Incident"],
                  ].map(([c, l]) => (
                    <span
                      key={l}
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 2,
                          background: c,
                        }}
                      />
                      {l}
                    </span>
                  ))}
                </span>
              </span>
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* PAST INCIDENTS */}
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 20,
              letterSpacing: "-0.3px",
            }}
          >
            Past incidents
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {INCIDENTS.map((incident, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ebebeb",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenIncident(openIncident === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    background: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    gap: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span
                      style={{
                        background: "#e6f9f2",
                        color: "#00895a",
                        fontSize: 11,
                        fontWeight: 600,
                        borderRadius: 99,
                        padding: "2px 10px",
                      }}
                    >
                      Resolved
                    </span>
                    <span
                      style={{ fontSize: 14, fontWeight: 500, color: "#111" }}
                    >
                      {incident.title}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span style={{ fontSize: 12, color: "#aaa" }}>
                      {incident.date}
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        color: "#aaa",
                        transform:
                          openIncident === i ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      ⌄
                    </span>
                  </div>
                </button>
                {openIncident === i && (
                  <div
                    style={{
                      padding: "0 20px 20px",
                      borderTop: "1px solid #f5f5f5",
                    }}
                  >
                    {incident.updates.map((u, j) => (
                      <div
                        key={j}
                        style={{ display: "flex", gap: 16, paddingTop: 16 }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: "#aaa",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          {u.time}
                        </span>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#555",
                            lineHeight: 1.65,
                            margin: 0,
                          }}
                        >
                          {u.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SUBSCRIBE */}
        <div
          style={{
            background: "linear-gradient(135deg, #f4fdf9, #eff6ff)",
            border: "1px solid #e0f0e8",
            borderRadius: 16,
            padding: "28px 32px",
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
            Get status updates
          </h3>
          <p style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
            Get notified by email whenever ShopPress creates, updates, or
            resolves an incident.
          </p>
          {subscribed ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#e6f9f2",
                border: "1px solid #c8f0e0",
                borderRadius: 99,
                padding: "8px 16px",
                fontSize: 13,
                color: "#00895a",
                fontWeight: 500,
              }}
            >
              ✓ You'll be notified of incidents
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  flex: 1,
                  minWidth: 220,
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
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
