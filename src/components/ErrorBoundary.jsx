import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ShopPress error:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />

        <div style={{ fontSize: 64, marginBottom: 24 }}>⚠️</div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-0.5px",
            color: "#111",
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "#666",
            lineHeight: 1.7,
            marginBottom: 8,
            maxWidth: 460,
          }}
        >
          An unexpected error occurred. Don't worry — your data is safe. Try
          refreshing the page or going back to the homepage.
        </p>

        {import.meta.env.DEV && this.state.error && (
          <details
            style={{ marginBottom: 28, maxWidth: 600, textAlign: "left" }}
          >
            <summary
              style={{
                fontSize: 13,
                color: "#aaa",
                cursor: "pointer",
                marginBottom: 8,
              }}
            >
              Error details (dev only)
            </summary>
            <pre
              style={{
                fontSize: 12,
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 10,
                padding: "14px",
                overflowX: "auto",
                color: "#ef4444",
                lineHeight: 1.5,
              }}
            >
              {this.state.error.toString()}
            </pre>
          </details>
        )}

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "11px 24px",
              background: "#00b67a",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Refresh page
          </button>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
            style={{
              padding: "11px 24px",
              background: "#fff",
              color: "#333",
              border: "1px solid #ddd",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Go to homepage
          </button>
        </div>

        <p style={{ fontSize: 12, color: "#aaa", marginTop: 32 }}>
          If this keeps happening, contact us at{" "}
          <a href="mailto:support@shoppress.io" style={{ color: "#00b67a" }}>
            support@shoppress.io
          </a>
        </p>
      </div>
    );
  }
}
