import { useState } from "react";
import { btnStyle, Logo } from "../../App.jsx";

const STEPS = ["Welcome", "Store type", "Goals", "Look & feel", "You're set!"];

const STORE_TYPES = [
  {
    id: "physical",
    icon: "📦",
    label: "Physical products",
    desc: "Sell tangible goods — clothing, electronics, home goods, etc.",
  },
  {
    id: "digital",
    icon: "💾",
    label: "Digital products",
    desc: "Ebooks, courses, templates, music, software.",
  },
  {
    id: "services",
    icon: "🛠️",
    label: "Services",
    desc: "Bookings, consulting, freelance, subscriptions.",
  },
  {
    id: "blog",
    icon: "✏️",
    label: "Blog / content only",
    desc: "Publishing, newsletters, membership content.",
  },
  {
    id: "mixed",
    icon: "🔀",
    label: "Mix of the above",
    desc: "Products + content combined on one platform.",
  },
];

const GOALS = [
  { id: "sales", icon: "💰", label: "Increase sales" },
  { id: "audience", icon: "👥", label: "Grow my audience" },
  { id: "content", icon: "📝", label: "Publish more content" },
  { id: "brand", icon: "🎨", label: "Build my brand" },
  { id: "automate", icon: "⚙️", label: "Automate my workflow" },
  { id: "global", icon: "🌍", label: "Sell internationally" },
];

const THEMES = [
  {
    id: "minimal",
    label: "Minimal",
    bg: "#ffffff",
    accent: "#111",
    preview: "Clean, white, focused",
  },
  {
    id: "bold",
    label: "Bold",
    bg: "#111111",
    accent: "#00b67a",
    preview: "Dark, high contrast",
  },
  {
    id: "warm",
    label: "Warm",
    bg: "#fdf6ec",
    accent: "#d97706",
    preview: "Cosy, earthy tones",
  },
  {
    id: "fresh",
    label: "Fresh",
    bg: "#f0fdf4",
    accent: "#00b67a",
    preview: "Green, natural, calm",
  },
  {
    id: "creative",
    label: "Creative",
    bg: "#faf5ff",
    accent: "#7c3aed",
    preview: "Purple, expressive",
  },
  {
    id: "ocean",
    label: "Ocean",
    bg: "#eff6ff",
    accent: "#2196f3",
    preview: "Blue, clean, open",
  },
];

export default function OnboardingFlow({ onNavigate, user }) {
  const [step, setStep] = useState(0);
  const [storeType, setStoreType] = useState(null);
  const [goals, setGoals] = useState([]);
  const [theme, setTheme] = useState("minimal");
  const [storeName, setStoreName] = useState("");

  const displayName = user?.name?.split(" ")[0] || "there";
  const progress = (step / (STEPS.length - 1)) * 100;

  const toggleGoal = (id) =>
    setGoals((g) =>
      g.includes(id)
        ? g.filter((x) => x !== id)
        : g.length < 3
          ? [...g, id]
          : g,
    );

  const finish = () => {
    localStorage.setItem("sp_onboarding_done", "true");
    onNavigate("dashboard");
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          padding: "16px 40px",
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <div style={{ display: "flex", align: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "#aaa" }}>
            Step {step + 1} of {STEPS.length}
          </span>
          <button
            onClick={finish}
            style={{
              background: "none",
              border: "none",
              fontSize: 13,
              color: "#aaa",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Skip setup
          </button>
        </div>
      </div>

      <div style={{ height: 3, background: "#f0f0f0" }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#00b67a",
            transition: "width 0.4s ease",
            borderRadius: 99,
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 600 }}>
          {step === 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 24 }}>👋</div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 36,
                  fontWeight: 700,
                  marginBottom: 12,
                  letterSpacing: "-0.5px",
                }}
              >
                Welcome to ShopPress, {displayName}!
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "#666",
                  lineHeight: 1.7,
                  marginBottom: 32,
                  maxWidth: 440,
                  margin: "0 auto 32px",
                }}
              >
                Let's get your store set up in just a few steps. It only takes 2
                minutes.
              </p>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "24px",
                  marginBottom: 32,
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#aaa",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 14,
                  }}
                >
                  What we'll set up
                </p>
                {[
                  ["🛍️", "Your store type and products"],
                  ["🎯", "Your business goals"],
                  ["🎨", "Your storefront theme"],
                  ["🚀", "Your first dashboard"],
                ].map(([icon, label]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "8px 0",
                      borderBottom: "1px solid #f5f5f5",
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <span style={{ fontSize: 14, color: "#444" }}>{label}</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        color: "#00b67a",
                        fontSize: 13,
                      }}
                    >
                      ✓
                    </span>
                  </div>
                ))}
              </div>
              <button
                style={{
                  ...btnStyle("green", "lg"),
                  width: "100%",
                  justifyContent: "center",
                }}
                onClick={() => setStep(1)}
              >
                Let's get started →
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 30,
                  fontWeight: 700,
                  marginBottom: 8,
                  letterSpacing: "-0.5px",
                }}
              >
                What are you selling?
              </h1>
              <p style={{ fontSize: 15, color: "#666", marginBottom: 28 }}>
                Choose the option that best describes your store.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 32,
                }}
              >
                {STORE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setStoreType(type.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "16px 18px",
                      border: `2px solid ${storeType === type.id ? "#00b67a" : "#e5e5e5"}`,
                      borderRadius: 14,
                      background: storeType === type.id ? "#f4fdf9" : "#fff",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      textAlign: "left",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ fontSize: 28, flexShrink: 0 }}>
                      {type.icon}
                    </span>
                    <div>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          margin: "0 0 2px",
                          color: storeType === type.id ? "#00b67a" : "#111",
                        }}
                      >
                        {type.label}
                      </p>
                      <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                        {type.desc}
                      </p>
                    </div>
                    {storeType === type.id && (
                      <span
                        style={{
                          marginLeft: "auto",
                          color: "#00b67a",
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={btnStyle("outline")} onClick={() => setStep(0)}>
                  ← Back
                </button>
                <button
                  style={{
                    ...btnStyle("green", "lg"),
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onClick={() => storeType && setStep(2)}
                  disabled={!storeType}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 30,
                  fontWeight: 700,
                  marginBottom: 8,
                  letterSpacing: "-0.5px",
                }}
              >
                What are your goals?
              </h1>
              <p style={{ fontSize: 15, color: "#666", marginBottom: 28 }}>
                Pick up to 3. We'll personalise your dashboard accordingly.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 32,
                }}
              >
                {GOALS.map((goal) => {
                  const selected = goals.includes(goal.id);
                  const disabled = !selected && goals.length >= 3;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      disabled={disabled}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "14px 16px",
                        border: `2px solid ${selected ? "#00b67a" : "#e5e5e5"}`,
                        borderRadius: 12,
                        background: selected ? "#f4fdf9" : "#fff",
                        cursor: disabled ? "not-allowed" : "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        opacity: disabled ? 0.4 : 1,
                        transition: "all 0.15s",
                      }}
                    >
                      <span style={{ fontSize: 22 }}>{goal.icon}</span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: selected ? "#00b67a" : "#333",
                        }}
                      >
                        {goal.label}
                      </span>
                      {selected && (
                        <span
                          style={{
                            marginLeft: "auto",
                            color: "#00b67a",
                            fontSize: 14,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={btnStyle("outline")} onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button
                  style={{
                    ...btnStyle("green", "lg"),
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onClick={() => setStep(3)}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 30,
                  fontWeight: 700,
                  marginBottom: 8,
                  letterSpacing: "-0.5px",
                }}
              >
                Choose your vibe
              </h1>
              <p style={{ fontSize: 15, color: "#666", marginBottom: 20 }}>
                Pick a starter theme — you can customise everything later.
              </p>

              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#444",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Store name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Luna Studio"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  marginBottom: 32,
                }}
              >
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    style={{
                      padding: "14px 12px",
                      border: `2px solid ${theme === t.id ? "#00b67a" : "#e5e5e5"}`,
                      borderRadius: 14,
                      background: t.bg,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 6,
                        background: t.accent,
                        borderRadius: 99,
                        marginBottom: 10,
                      }}
                    />
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        margin: "0 0 2px",
                        color: t.accent,
                      }}
                    >
                      {t.label}
                    </p>
                    <p style={{ fontSize: 11, color: "#888", margin: 0 }}>
                      {t.preview}
                    </p>
                    {theme === t.id && (
                      <p
                        style={{
                          fontSize: 11,
                          color: "#00b67a",
                          fontWeight: 600,
                          margin: "6px 0 0",
                        }}
                      >
                        ✓ Selected
                      </p>
                    )}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={btnStyle("outline")} onClick={() => setStep(2)}>
                  ← Back
                </button>
                <button
                  style={{
                    ...btnStyle("green", "lg"),
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onClick={() => setStep(4)}
                >
                  Finish setup →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 72,
                  marginBottom: 24,
                  animation: "pop 0.5s ease",
                }}
              >
                🚀
              </div>
              <style>{`@keyframes pop { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 34,
                  fontWeight: 700,
                  marginBottom: 12,
                  letterSpacing: "-0.5px",
                }}
              >
                You're all set!
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "#666",
                  lineHeight: 1.7,
                  marginBottom: 32,
                  maxWidth: 400,
                  margin: "0 auto 32px",
                }}
              >
                {storeName ? `${storeName} is` : "Your store is"} ready to go.
                Head to your dashboard and start building.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {[
                  ["🛍️", "Add your first product", "store"],
                  ["✏️", "Write a blog post", "blog"],
                  ["🎨", "Customise theme", "settings"],
                  ["📊", "View analytics", "dashboard"],
                ].map(([icon, label, page]) => (
                  <button
                    key={label}
                    onClick={() => onNavigate(page)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "14px",
                      border: "1px solid #ebebeb",
                      borderRadius: 12,
                      background: "#fff",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#333",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f4fdf9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                  >
                    <span style={{ fontSize: 20 }}>{icon}</span> {label}
                  </button>
                ))}
              </div>
              <button
                style={{
                  ...btnStyle("green", "lg"),
                  width: "100%",
                  justifyContent: "center",
                }}
                onClick={finish}
              >
                Go to my dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
