/* ── Skeleton loader components ──────────────────────────────
   Usage:
     import { SkeletonCard, SkeletonText, SkeletonProductGrid, SkeletonBlogGrid } from "../components/Skeletons.jsx";
*/

const pulse = `
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
`;

function SkeletonBox({ width = "100%", height = 16, radius = 8, style = {} }) {
  return (
    <>
      <style>{pulse}</style>
      <div
        style={{
          width,
          height,
          borderRadius: radius,
          background:
            "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
          backgroundSize: "600px 100%",
          animation: "shimmer 1.4s infinite linear",
          flexShrink: 0,
          ...style,
        }}
      />
    </>
  );
}

export function SkeletonText({ lines = 3, lastWidth = "60%" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBox
          key={i}
          width={i === lines - 1 ? lastWidth : "100%"}
          height={14}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ height = 200 }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ebebeb",
        borderRadius: 16,
        overflow: "hidden",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <SkeletonBox height={height} radius={10} />
      <SkeletonBox width="40%" height={12} />
      <SkeletonBox width="80%" height={16} />
      <SkeletonText lines={2} lastWidth="50%" />
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ebebeb",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <SkeletonBox height={160} radius={0} />
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <SkeletonBox width="35%" height={11} />
        <SkeletonBox width="75%" height={15} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <SkeletonBox width="30%" height={18} />
          <SkeletonBox width="28%" height={32} radius={8} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ebebeb",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <SkeletonBox height={120} radius={0} />
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <SkeletonBox width="25%" height={20} radius={99} />
          <SkeletonBox width="20%" height={20} radius={99} />
        </div>
        <SkeletonBox width="90%" height={18} />
        <SkeletonBox width="70%" height={18} />
        <SkeletonText lines={2} lastWidth="40%" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingTop: 8,
          }}
        >
          <SkeletonBox width={28} height={28} radius={99} />
          <SkeletonBox width="40%" height={13} />
          <SkeletonBox width="20%" height={13} style={{ marginLeft: "auto" }} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductGrid({ count = 8 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 20,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonBlogGrid({ count = 6 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 20,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBlogCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 14,
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: "1px solid #ebebeb",
            borderRadius: 16,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <SkeletonBox width="50%" height={12} />
            <SkeletonBox width={32} height={32} radius={8} />
          </div>
          <SkeletonBox width="60%" height={28} />
          <SkeletonBox width="40%" height={11} />
        </div>
      ))}
    </div>
  );
}

export function PageSpinner({ message = "Loading..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 16,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div
        style={{
          width: 40,
          height: 40,
          border: "3px solid #f0f0f0",
          borderTop: "3px solid #00b67a",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ fontSize: 14, color: "#aaa", margin: 0 }}>{message}</p>
    </div>
  );
}

export function ButtonSpinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 14,
        height: 14,
        border: "2px solid rgba(255,255,255,0.3)",
        borderTop: "2px solid #fff",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        verticalAlign: "middle",
      }}
    />
  );
}
