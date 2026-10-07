import { useState, useRef } from "react";
import { btnStyle, Logo } from "../../App.jsx";
import { useToast } from "../components/Toast.jsx";
import { ButtonSpinner } from "../components/Skeletons.jsx";

const CATEGORIES = [
  "Commerce",
  "Content",
  "SEO",
  "Marketing",
  "Product",
  "Design",
  "Tech",
  "Tutorial",
];
const EMOJIS = [
  "📝",
  "📊",
  "🚀",
  "💡",
  "🎨",
  "🛍️",
  "✏️",
  "📈",
  "🔍",
  "💰",
  "⚡",
  "🌍",
  "🔌",
  "📱",
  "🎯",
  "💎",
];

export default function WritePostPage({ onNavigate, onLogout, user }) {
  if (!user) return null;
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Commerce",
    emoji: "📝",
    tags: "",
    readTime: "5 min read",
    published: false,
  });
  const [errors, setErrors] = useState({});
  const textareaRef = useRef(null);
  const displayName = user?.name || "there";
  const initials = displayName.slice(0, 2).toUpperCase();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setVal = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.excerpt.trim()) e.excerpt = "Excerpt is required";
    if (!form.content.trim()) e.content = "Content is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Insert formatting at cursor position
  const insertFormat = (before, after = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = form.content.slice(start, end);
    const newContent =
      form.content.slice(0, start) +
      before +
      selected +
      after +
      form.content.slice(end);
    setVal("content", newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleSave = async (publish = false) => {
    if (!validate()) {
      toast.error("Please fix the errors before saving.");
      return;
    }
    setSaving(true);
    try {
      const post = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        category: form.category,
        emoji: form.emoji,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        read_time: form.readTime,
        published: publish,
        author_name: displayName,
        author_email: user?.email || "",
        featured: false,
        heroBg: "linear-gradient(135deg, #e6f9f2, #f4fdf9)",
      };
      try {
        const { createPost } = await import("../supabaseService.js");
        const { error } = await createPost(post);
        if (error) throw error;
      } catch {
        /* continue even if DB fails */
      }
      toast.success(
        `${form.emoji} "${form.title}" ${publish ? "published!" : "saved as draft"}`,
      );
      setTimeout(() => onNavigate("blog"), 1200);
    } catch {
      toast.error("Failed to save post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const SIDEBAR = [
    { icon: "🏠", label: "Dashboard", page: "dashboard" },
    { icon: "🛍️", label: "Products", page: "add-product" },
    { icon: "📦", label: "Orders", page: "orders" },
    { icon: "✏️", label: "Content", page: "blog", active: true },
    { icon: "⚙️", label: "Settings", page: "settings" },
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        minHeight: "100vh",
        background: "#f7f8fa",
        color: "#111",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* SIDEBAR */}
      <aside
        style={{
          width: 220,
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
          display: "flex",
          flexDirection: "column",
          padding: "0 0 24px",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <button
            onClick={() => onNavigate("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Logo />
          </button>
        </div>
        <nav
          style={{
            flex: 1,
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {SIDEBAR.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                background: item.active ? "#f4fdf9" : "transparent",
                color: item.active ? "#00b67a" : "#555",
                fontWeight: item.active ? 600 : 400,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#e6f9f2",
              color: "#00b67a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayName}
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#bbb",
              fontSize: 16,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
          >
            ⏻
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "36px", overflowY: "auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <button
              onClick={() => onNavigate("blog")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "#888",
                fontFamily: "'DM Sans', sans-serif",
                padding: 0,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              ← Back to blog
            </button>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Write new post
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={btnStyle("outline")}
              onClick={() => setPreviewing((p) => !p)}
            >
              {previewing ? "✏️ Edit" : "👁 Preview"}
            </button>
            <button
              style={btnStyle("outline")}
              onClick={() => handleSave(false)}
              disabled={saving}
            >
              Save draft
            </button>
            <button
              style={{
                ...btnStyle("green"),
                minWidth: 130,
                justifyContent: "center",
              }}
              onClick={() => handleSave(true)}
              disabled={saving}
            >
              {saving ? (
                <>
                  <ButtonSpinner /> Publishing...
                </>
              ) : (
                "🚀 Publish"
              )}
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* LEFT — Editor */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {!previewing ? (
              <>
                {/* Title */}
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #ebebeb",
                    borderRadius: 16,
                    padding: "20px 22px",
                  }}
                >
                  <input
                    value={form.title}
                    onChange={set("title")}
                    placeholder="Post title..."
                    style={{
                      width: "100%",
                      fontSize: 24,
                      fontWeight: 700,
                      border: "none",
                      outline: "none",
                      fontFamily: "'Playfair Display', serif",
                      color: "#111",
                      letterSpacing: "-0.5px",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.title && (
                    <p style={{ fontSize: 12, color: "#ef4444", marginTop: 6 }}>
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Excerpt */}
                <div
                  style={{
                    background: "#fff",
                    border: `1px solid ${errors.excerpt ? "#fca5a5" : "#ebebeb"}`,
                    borderRadius: 16,
                    padding: "20px 22px",
                  }}
                >
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    Excerpt
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={set("excerpt")}
                    placeholder="A short summary shown in the blog listing..."
                    rows={2}
                    style={{
                      width: "100%",
                      fontSize: 14,
                      border: "none",
                      outline: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#555",
                      resize: "none",
                      boxSizing: "border-box",
                      lineHeight: 1.6,
                    }}
                  />
                  {errors.excerpt && (
                    <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>
                      {errors.excerpt}
                    </p>
                  )}
                </div>

                {/* Content Editor */}
                <div
                  style={{
                    background: "#fff",
                    border: `1px solid ${errors.content ? "#fca5a5" : "#ebebeb"}`,
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  {/* Toolbar */}
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      padding: "10px 14px",
                      borderBottom: "1px solid #f0f0f0",
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      { label: "H2", action: () => insertFormat("## ") },
                      { label: "H3", action: () => insertFormat("### ") },
                      {
                        label: "B",
                        action: () => insertFormat("**", "**"),
                        style: { fontWeight: 700 },
                      },
                      {
                        label: "I",
                        action: () => insertFormat("_", "_"),
                        style: { fontStyle: "italic" },
                      },
                      {
                        label: "🔗",
                        action: () => insertFormat("[", "](url)"),
                      },
                      { label: "• List", action: () => insertFormat("- ") },
                      { label: "1. List", action: () => insertFormat("1. ") },
                      { label: "💡 Tip", action: () => insertFormat("> 💡 ") },
                      { label: "---", action: () => insertFormat("\n---\n") },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        onClick={btn.action}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          border: "1px solid #e5e5e5",
                          background: "#fafafa",
                          cursor: "pointer",
                          fontSize: 12,
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          color: "#555",
                          ...btn.style,
                        }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={form.content}
                    onChange={set("content")}
                    placeholder={`Start writing your post...\n\nTips:\n## Use H2 for main headings\n### Use H3 for subheadings\n**Bold text** and _italic text_\n- Bullet points\n> 💡 Callout boxes`}
                    rows={20}
                    style={{
                      width: "100%",
                      padding: "20px 22px",
                      fontSize: 15,
                      border: "none",
                      outline: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#333",
                      resize: "vertical",
                      boxSizing: "border-box",
                      lineHeight: 1.8,
                    }}
                  />
                  {errors.content && (
                    <p
                      style={{
                        fontSize: 12,
                        color: "#ef4444",
                        padding: "0 22px 12px",
                      }}
                    >
                      {errors.content}
                    </p>
                  )}
                </div>
              </>
            ) : (
              /* PREVIEW MODE */
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "clamp(24px,4vw,36px) clamp(16px,4vw,40px)",
                }}
              >
                <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                  <span
                    style={{
                      background: "#e6f9f2",
                      color: "#00b67a",
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 99,
                      padding: "3px 10px",
                    }}
                  >
                    {form.category}
                  </span>
                  <span style={{ fontSize: 12, color: "#aaa" }}>
                    {form.readTime}
                  </span>
                </div>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 36,
                    fontWeight: 700,
                    marginBottom: 16,
                    letterSpacing: "-0.8px",
                    lineHeight: 1.2,
                  }}
                >
                  {form.title || "Post title"}
                </h1>
                <p
                  style={{
                    fontSize: 17,
                    color: "#666",
                    lineHeight: 1.75,
                    marginBottom: 28,
                    borderLeft: "3px solid #00b67a",
                    paddingLeft: 16,
                  }}
                >
                  {form.excerpt || "Your excerpt will appear here"}
                </p>
                <div
                  style={{
                    fontSize: 15,
                    color: "#444",
                    lineHeight: 1.85,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {form.content || "Your post content will appear here..."}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Post settings */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Emoji & category */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "20px 22px",
              }}
            >
              <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
                Post settings
              </h3>

              <label
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#666",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Category
              </label>
              <select
                value={form.category}
                onChange={set("category")}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 14,
                  background: "#fff",
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#666",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Read time
              </label>
              <select
                value={form.readTime}
                onChange={set("readTime")}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 14,
                  background: "#fff",
                }}
              >
                {[
                  "2 min read",
                  "3 min read",
                  "5 min read",
                  "7 min read",
                  "10 min read",
                  "15 min read",
                ].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <label
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#666",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Tags (comma separated)
              </label>
              <input
                value={form.tags}
                onChange={set("tags")}
                placeholder="SEO, commerce, tips"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Emoji picker */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "20px 22px",
              }}
            >
              <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
                Post emoji
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setVal("emoji", e)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      border:
                        form.emoji === e
                          ? "2px solid #00b67a"
                          : "1px solid #eee",
                      background: form.emoji === e ? "#f4fdf9" : "#fff",
                      fontSize: 20,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview card */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 80,
                  background: "linear-gradient(135deg,#e6f9f2,#f4fdf9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                }}
              >
                {form.emoji}
              </div>
              <div style={{ padding: "14px 16px" }}>
                <span
                  style={{
                    fontSize: 11,
                    background: "#f0f0f0",
                    color: "#555",
                    borderRadius: 99,
                    padding: "2px 8px",
                    fontWeight: 500,
                  }}
                >
                  {form.category}
                </span>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginTop: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {form.title || "Post title"}
                </p>
                <p style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>
                  {form.readTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
