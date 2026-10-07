import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    id: "welcome",
    title: "Welcome to WePub! 🎉",
    body: "You're all set. Let's take a quick 60-second tour so you know exactly where everything is. You can skip this any time.",
    target: null, // centered modal, no highlight
    position: "center",
    cta: "Let's go →",
  },
  {
    id: "home",
    title: "Your personal homepage 🏠",
    body: "This is your hub. See your store stats, recent orders, blog posts, and quick actions — all in one place.",
    target: null,
    position: "center",
    cta: "Next →",
  },
  {
    id: "nav-dashboard",
    title: "Dashboard link",
    body: "Click Dashboard in the nav to see your full analytics — revenue charts, order trends, and site visitors.",
    target: "nav-dashboard",
    position: "bottom",
    cta: "Next →",
  },
  {
    id: "nav-store",
    title: "Your store",
    body: "Head to Store to browse and manage your products. Customers can shop here right now.",
    target: "nav-store",
    position: "bottom",
    cta: "Next →",
  },
  {
    id: "nav-blog",
    title: "Your blog",
    body: "The Blog is your publishing home. Write articles, embed products inside posts, and grow your audience.",
    target: "nav-blog",
    position: "bottom",
    cta: "Next →",
  },
  {
    id: "add-product",
    title: "Add your first product ➕",
    body: "Click 'Add product' in your quick actions or Dashboard sidebar to list your first item. Takes under 2 minutes.",
    target: null,
    position: "center",
    cta: "Next →",
  },
  {
    id: "write-post",
    title: "Write your first post ✏️",
    body: "Hit 'Write a post' to open the editor. You can embed products directly inside articles — readers buy without leaving the page.",
    target: null,
    position: "center",
    cta: "Next →",
  },
  {
    id: "profile",
    title: "Set up your profile 👤",
    body: "Open the user menu (top right) → Profile to upload a photo and set your display name.",
    target: "user-menu",
    position: "bottom-left",
    cta: "Next →",
  },
  {
    id: "done",
    title: "You're ready! 🚀",
    body: "That's the tour. Your store is live, your blog is ready, and everything is free forever. Go build something great.",
    target: null,
    position: "center",
    cta: "Start building →",
    isDone: true,
  },
];

const TOUR_KEY = "sp_tour_done";

export default function OnboardingTour({ onNavigate, onDone }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tooltipPos, setTooltipPos] = useState({
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });
  const boxRef = useRef(null);

  const current = STEPS[step];
  const progress = Math.round((step / (STEPS.length - 1)) * 100);

  useEffect(() => {
    if (!current.target) {
      setTooltipPos({
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
      return;
    }
    const el = document.querySelector(`[data-tour="${current.target}"]`);
    if (!el) {
      setTooltipPos({
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
      return;
    }
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY;

    if (current.position === "bottom") {
      setTooltipPos({
        top: rect.bottom + scrollY + 12,
        left: Math.max(16, rect.left + rect.width / 2 - 160),
        transform: "none",
      });
    } else if (current.position === "bottom-left") {
      setTooltipPos({
        top: rect.bottom + scrollY + 12,
        left: Math.max(16, rect.right - 320),
        transform: "none",
      });
    }
  }, [step, current]);

  const handleNext = () => {
    if (current.isDone) {
      finish();
    } else {
      setStep((s) => s + 1);
    }
  };

  const finish = () => {
    localStorage.setItem(TOUR_KEY, "1");
    setVisible(false);
    if (onDone) onDone();
  };

  if (!visible) return null;

  const isCenter = current.position === "center" || !current.target;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 8000,
          background: isCenter ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.25)",
          transition: "background 0.3s",
        }}
        onClick={isCenter ? undefined : handleNext}
      />

      {/* Tooltip box */}
      <div
        ref={boxRef}
        style={{
          position: "fixed",
          zIndex: 8001,
          width: 320,
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
          ...(isCenter
            ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
            : {
                top: tooltipPos.top,
                left: tooltipPos.left,
                transform: tooltipPos.transform,
              }),
          animation: "tourPop 0.25s ease",
        }}
      >
        <style>{`
          @keyframes tourPop {
            from { opacity: 0; transform: ${isCenter ? "translate(-50%, -48%)" : "translateY(-6px)"}; }
            to   { opacity: 1; transform: ${isCenter ? "translate(-50%, -50%)" : "translateY(0)"}; }
          }
        `}</style>

        {/* Progress bar */}
        <div style={{ height: 4, background: "#f0f0f0" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg,#00b67a,#2196f3)",
              transition: "width 0.4s ease",
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>

        <div style={{ padding: "24px 24px 20px" }}>
          {/* Step indicator */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === step ? 18 : 6,
                    height: 6,
                    borderRadius: 99,
                    background:
                      i === step ? "#00b67a" : i < step ? "#c8f0e0" : "#f0f0f0",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
            <button
              onClick={finish}
              style={{
                background: "none",
                border: "none",
                fontSize: 13,
                color: "#bbb",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                padding: 0,
              }}
            >
              Skip tour
            </button>
          </div>

          {/* Content */}
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 10,
              lineHeight: 1.3,
              letterSpacing: "-0.3px",
            }}
          >
            {current.title}
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "#666",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {current.body}
          </p>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            {step > 0 && !current.isDone && (
              <button
                onClick={() => setStep((s) => s - 1)}
                style={{
                  padding: "9px 16px",
                  border: "1px solid #eee",
                  borderRadius: 10,
                  background: "#fff",
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#888",
                }}
              >
                ← Back
              </button>
            )}
            <button
              onClick={handleNext}
              style={{
                flex: 1,
                padding: "10px 20px",
                background: current.isDone
                  ? "linear-gradient(135deg,#00b67a,#2196f3)"
                  : "#00b67a",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {current.cta}
            </button>
          </div>

          {/* Quick nav shortcuts on relevant steps */}
          {current.id === "add-product" && (
            <button
              onClick={() => {
                finish();
                onNavigate("add-product");
              }}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "8px",
                background: "#f4fdf9",
                border: "1px solid #c8f0e0",
                borderRadius: 10,
                fontSize: 13,
                color: "#00895a",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              ➕ Add product now →
            </button>
          )}
          {current.id === "write-post" && (
            <button
              onClick={() => {
                finish();
                onNavigate("write-post");
              }}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "8px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                fontSize: 13,
                color: "#1565c0",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              ✏️ Write a post now →
            </button>
          )}
        </div>
      </div>

      {/* Spotlight highlight for targeted elements */}
      {current.target &&
        (() => {
          const el = document.querySelector(`[data-tour="${current.target}"]`);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return (
            <div
              style={{
                position: "fixed",
                zIndex: 7999,
                top: rect.top - 4,
                left: rect.left - 4,
                width: rect.width + 8,
                height: rect.height + 8,
                borderRadius: 10,
                border: "2px solid #00b67a",
                boxShadow: "0 0 0 4px rgba(0,182,122,0.2)",
                pointerEvents: "none",
                animation: "pulse 1.5s ease infinite",
              }}
            />
          );
        })()}

      <style>{`
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 4px rgba(0,182,122,0.2); }
          50%  { box-shadow: 0 0 0 8px rgba(0,182,122,0.08); }
          100% { box-shadow: 0 0 0 4px rgba(0,182,122,0.2); }
        }
      `}</style>
    </>
  );
}

// Hook to check if tour should show
export function useTour() {
  const shouldShow = !localStorage.getItem(TOUR_KEY);
  const reset = () => localStorage.removeItem(TOUR_KEY);
  return { shouldShow, reset };
}
