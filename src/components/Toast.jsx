import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";

// ── Context ──────────────────────────────────────────────────
const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

// ── Individual Toast ─────────────────────────────────────────
const ICONS = { success: "✓", error: "✕", warning: "⚠", info: "ℹ" };
const COLORS = {
  success: {
    bg: "#f4fdf9",
    border: "#c8f0e0",
    icon: "#00b67a",
    iconBg: "#e6f9f2",
    bar: "#00b67a",
  },
  error: {
    bg: "#fff5f5",
    border: "#fecaca",
    icon: "#ef4444",
    iconBg: "#fee2e2",
    bar: "#ef4444",
  },
  warning: {
    bg: "#fffbeb",
    border: "#fcd34d",
    icon: "#f59e0b",
    iconBg: "#fef3c7",
    bar: "#f59e0b",
  },
  info: {
    bg: "#eff6ff",
    border: "#bfdbfe",
    icon: "#2196f3",
    iconBg: "#e3f2fd",
    bar: "#2196f3",
  },
};

function Toast({
  id,
  type = "info",
  title,
  message,
  duration = 4000,
  onRemove,
}) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const c = COLORS[type] || COLORS.info;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 30);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(id), 300);
    }, duration);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      onClick={() => {
        setVisible(false);
        setTimeout(() => onRemove(id), 300);
      }}
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        cursor: "pointer",
        maxWidth: 360,
        width: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: c.iconBg,
          color: c.icon,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {ICONS[type]}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#111",
              margin: "0 0 2px",
            }}
          >
            {title}
          </p>
        )}
        {message && (
          <p
            style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.5 }}
          >
            {message}
          </p>
        )}
      </div>

      <span
        style={{ fontSize: 14, color: "#bbb", flexShrink: 0, marginTop: 1 }}
      >
        ✕
      </span>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          background: c.bar,
          width: `${progress}%`,
          transition: "width 0.03s linear",
          borderRadius: "0 0 0 14px",
        }}
      />
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    ({ type = "info", title, message, duration = 4000 }) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [
        ...t.slice(-4),
        { id, type, title, message, duration },
      ]);
    },
    [],
  );

  toast.success = (message, title = "Success") =>
    toast({ type: "success", title, message });
  toast.error = (message, title = "Error") =>
    toast({ type: "error", title, message });
  toast.warning = (message, title = "Warning") =>
    toast({ type: "warning", title, message });
  toast.info = (message, title = "Info") =>
    toast({ type: "info", title, message });

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: "all" }}>
            <Toast {...t} onRemove={remove} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
