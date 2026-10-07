// src/utils.js
export const btnStyle = (variant = "outline", size = "md") => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    border: "none",
    transition: "opacity 0.15s, transform 0.15s",
    fontSize: size === "lg" ? 15 : 14,
    padding: size === "lg" ? "12px 24px" : "9px 18px",
  };
  if (variant === "green")
    return { ...base, background: "#00b67a", color: "#fff" };
  if (variant === "blue")
    return { ...base, background: "#2196f3", color: "#fff" };
  if (variant === "outline")
    return {
      ...base,
      background: "#fff",
      color: "#333",
      border: "1px solid #ddd",
    };
  return base;
};

export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="9" cy="14" r="8" fill="#00b67a" />
        <circle cx="19" cy="14" r="8" fill="#2196f3" fillOpacity="0.8" />
      </svg>
      <span style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.3px" }}>
        WePub
      </span>
    </div>
  );
}
