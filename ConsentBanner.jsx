import { useState, useEffect } from "react";
import { btnStyle } from "../../App.jsx";

export default function ConsentBanner({ onNavigate }) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("sp_cookie_consent");
    if (!consent) setTimeout(() => setVisible(true), 1200);
  }, []);

  const accept = (all = true) => {
    const saved = all
      ? {
          necessary: true,
          analytics: true,
          marketing: true,
          date: new Date().toISOString(),
        }
      : { ...prefs, date: new Date().toISOString() };
    localStorage.setItem("sp_cookie_consent", JSON.stringify(saved));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(
      "sp_cookie_consent",
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        date: new Date().toISOString(),
      }),
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(680px, calc(100vw - 32px))",
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 18,
        boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
        animation: "slideUp 0.4s ease",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <div style={{ padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 28, flexShrink: 0 }}>🍪</span>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>
              We use cookies
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#666",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              We use cookies to personalise content, analyse traffic, and
              improve your experience.{" "}
              <button
                onClick={() => onNavigate("privacy")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#00b67a",
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                Privacy policy
              </button>
            </p>
          </div>
        </div>

        {showDetails && (
          <div
            style={{
              background: "#fafafa",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 14,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              {
                key: "necessary",
                label: "Necessary",
                desc: "Required for the site to function. Cannot be disabled.",
                locked: true,
              },
              {
                key: "analytics",
                label: "Analytics",
                desc: "Help us understand how visitors use our site.",
                locked: false,
              },
              {
                key: "marketing",
                label: "Marketing",
                desc: "Used to show you relevant ads and promotions.",
                locked: false,
              },
            ].map((item) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                }}
              >
                <div>
                  <p
                    style={{ fontSize: 13, fontWeight: 600, margin: "0 0 2px" }}
                  >
                    {item.label}
                  </p>
                  <p style={{ fontSize: 12, color: "#888", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
                <button
                  onClick={() =>
                    !item.locked &&
                    setPrefs((p) => ({ ...p, [item.key]: !p[item.key] }))
                  }
                  style={{
                    width: 42,
                    height: 24,
                    borderRadius: 99,
                    border: "none",
                    cursor: item.locked ? "not-allowed" : "pointer",
                    background: prefs[item.key] ? "#00b67a" : "#ddd",
                    position: "relative",
                    transition: "background 0.2s",
                    flexShrink: 0,
                    opacity: item.locked ? 0.6 : 1,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      left: prefs[item.key] ? 21 : 3,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.2s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            style={{
              ...btnStyle("green"),
              flex: "1 1 auto",
              justifyContent: "center",
            }}
            onClick={() => accept(true)}
          >
            Accept all
          </button>
          {showDetails ? (
            <button
              style={{
                ...btnStyle("outline"),
                flex: "1 1 auto",
                justifyContent: "center",
              }}
              onClick={() => accept(false)}
            >
              Save preferences
            </button>
          ) : (
            <button
              style={{
                ...btnStyle("outline"),
                flex: "1 1 auto",
                justifyContent: "center",
              }}
              onClick={() => setShowDetails(true)}
            >
              Manage preferences
            </button>
          )}
          <button
            style={{
              ...btnStyle("outline"),
              flex: "1 1 auto",
              justifyContent: "center",
              color: "#888",
              borderColor: "#e5e5e5",
            }}
            onClick={decline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
