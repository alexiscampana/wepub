import { useState, useEffect } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { SkeletonBlogGrid } from "../components/Skeletons.jsx";

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "grow-your-store-with-content",
    category: "Commerce",
    readTime: "5 min read",
    date: "May 28, 2026",
    title: "How content marketing drives 3x more sales for online stores",
    excerpt:
      "The stores growing fastest in 2026 aren't just selling — they're publishing. Here's the playbook that's working right now.",
    author: {
      name: "Mara Levi",
      initials: "ML",
      bg: "#e6f9f2",
      color: "#00b67a",
      role: "Commerce editor",
    },
    tags: ["Commerce", "Growth", "Content"],
    featured: true,
    emoji: "📈",
    heroBg: "linear-gradient(135deg, #e6f9f2, #f4fdf9)",
  },
  {
    id: 2,
    slug: "seo-for-ecommerce-2026",
    category: "SEO",
    readTime: "8 min read",
    date: "May 22, 2026",
    title: "The complete SEO guide for e-commerce stores in 2026",
    excerpt:
      "Google's latest updates changed the rules again. Here's what's working, what's not, and how to rank your product pages.",
    author: {
      name: "James Park",
      initials: "JP",
      bg: "#e3f2fd",
      color: "#2196f3",
      role: "SEO specialist",
    },
    tags: ["SEO", "Commerce"],
    featured: false,
    emoji: "🔍",
    heroBg: "linear-gradient(135deg, #e3f2fd, #eff6ff)",
  },
  {
    id: 3,
    slug: "block-editor-tips",
    category: "Content",
    readTime: "4 min read",
    date: "May 15, 2026",
    title: "10 block editor tricks that will change how you publish",
    excerpt:
      "Most publishers use 20% of the block editor's power. These advanced tricks will transform your workflow.",
    author: {
      name: "Sofia R.",
      initials: "SR",
      bg: "#ede9fe",
      color: "#7c3aed",
      role: "Product writer",
    },
    tags: ["Content", "Tips"],
    featured: false,
    emoji: "✏️",
    heroBg: "linear-gradient(135deg, #ede9fe, #f3e8ff)",
  },
  {
    id: 4,
    slug: "subscription-commerce-guide",
    category: "Commerce",
    readTime: "6 min read",
    date: "May 10, 2026",
    title: "Why subscription commerce is the future of DTC brands",
    excerpt:
      "Recurring revenue, higher LTV, and predictable cash flow — here's how to launch and grow a subscription product.",
    author: {
      name: "Mara Levi",
      initials: "ML",
      bg: "#e6f9f2",
      color: "#00b67a",
      role: "Commerce editor",
    },
    tags: ["Commerce", "Subscriptions"],
    featured: false,
    emoji: "🔄",
    heroBg: "linear-gradient(135deg, #fef3c7, #fffde7)",
  },
  {
    id: 5,
    slug: "building-audience-email",
    category: "Marketing",
    readTime: "7 min read",
    date: "May 3, 2026",
    title: "Building an email list that actually converts",
    excerpt:
      "Social media algorithms come and go. Your email list is the only audience you truly own. Here's how to build one from scratch.",
    author: {
      name: "James Park",
      initials: "JP",
      bg: "#e3f2fd",
      color: "#2196f3",
      role: "SEO specialist",
    },
    tags: ["Marketing", "Email"],
    featured: false,
    emoji: "📧",
    heroBg: "linear-gradient(135deg, #e0f7fa, #e8f5e9)",
  },
  {
    id: 6,
    slug: "wepub-vs-competitors",
    category: "Product",
    readTime: "10 min read",
    date: "Apr 28, 2026",
    title: "WePub vs. running Shopify + WordPress separately",
    excerpt:
      "We compared costs, complexity, and performance. The results surprised even us.",
    author: {
      name: "Sofia R.",
      initials: "SR",
      bg: "#ede9fe",
      color: "#7c3aed",
      role: "Product writer",
    },
    tags: ["Product", "Comparison"],
    featured: false,
    emoji: "⚖️",
    heroBg: "linear-gradient(135deg, #fce8e8, #fff5f5)",
  },
];

const CATEGORIES = [
  "All",
  "Commerce",
  "Content",
  "SEO",
  "Marketing",
  "Product",
];

export default function BlogPage({ onNavigate, user, onLogout }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const { getPosts } = await import("../supabaseService.js");
        const { data, error } = await getPosts({ limit: 20 });
        if (!error && data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(BLOG_POSTS);
        }
      } catch {
        setPosts(BLOG_POSTS);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const featured = posts.find((p) => p.featured);
  const rest = posts
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter(
      (p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(search.toLowerCase()),
    );

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

      {/* HEADER */}
      <section
        style={{
          padding: "clamp(24px,4vw,64px) clamp(16px,4vw,40px) 48px",
          textAlign: "center",
          borderBottom: "1px solid #f0f0f0",
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
          Blog
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
          Stories, guides & insights
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
          Tips on commerce, content, SEO, and growing your business online.
        </p>
        <div style={{ maxWidth: 400, margin: "0 auto 16px" }}>
          <input
            type="text"
            placeholder="🔍  Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 18px",
              border: "1px solid #ddd",
              borderRadius: 12,
              fontSize: 14,
              outline: "none",
              fontFamily: "'DM Sans', sans-serif",
              boxSizing: "border-box",
            }}
          />
        </div>
        {user && (
          <button
            onClick={() => onNavigate("write-post")}
            style={{
              padding: "9px 20px",
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
            ✏️ Write a post
          </button>
        )}
      </section>

      {/* FEATURED POST */}
      {featured && !search && activeCategory === "All" && (
        <section
          style={{ padding: "48px 40px 0", maxWidth: 1100, margin: "0 auto" }}
        >
          <div
            onClick={() => onNavigate("blog-post-" + featured.id)}
            style={{
              background: featured.heroBg,
              border: "1px solid #ebebeb",
              borderRadius: 20,
              padding: "40px",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 32,
              alignItems: "center",
              cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.09)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    background: "#00b67a",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 99,
                    padding: "3px 12px",
                  }}
                >
                  Featured
                </span>
                <span style={{ fontSize: 12, color: "#888" }}>
                  {featured.category} · {featured.readTime}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 700,
                  marginBottom: 12,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.3,
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#555",
                  lineHeight: 1.7,
                  marginBottom: 20,
                  maxWidth: 540,
                }}
              >
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: featured.author.bg,
                    color: featured.author.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {featured.author.initials}
                </div>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>
                    {featured.author.name}
                  </span>
                  <span style={{ fontSize: 12, color: "#aaa", marginLeft: 8 }}>
                    {featured.date}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 80, opacity: 0.85 }}>{featured.emoji}</div>
          </div>
        </section>
      )}

      {/* CATEGORY FILTER */}
      <section
        style={{
          padding: "32px 40px 0",
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            style={{
              padding: "7px 18px",
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              border: "1px solid",
              background: activeCategory === c ? "#111" : "#fff",
              color: activeCategory === c ? "#fff" : "#555",
              borderColor: activeCategory === c ? "#111" : "#ddd",
              transition: "all 0.15s",
            }}
          >
            {c}
          </button>
        ))}
      </section>

      {/* POSTS GRID */}
      <section
        style={{
          padding: "clamp(24px,4vw,32px) clamp(16px,4vw,40px) 72px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {loading ? (
          <SkeletonBlogGrid count={6} />
        ) : rest.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "64px 0", color: "#aaa" }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 16 }}>
              No posts found{search ? ` for "${search}"` : ""}.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: 20,
            }}
          >
            {rest.map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate("blog-post-" + post.id)}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    height: 120,
                    background: post.heroBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 52,
                  }}
                >
                  {post.emoji}
                </div>
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        background: "#f0f0f0",
                        color: "#555",
                        fontSize: 11,
                        fontWeight: 600,
                        borderRadius: 99,
                        padding: "3px 10px",
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ fontSize: 12, color: "#aaa" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 17,
                      fontWeight: 700,
                      marginBottom: 8,
                      lineHeight: 1.35,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#777",
                      lineHeight: 1.6,
                      marginBottom: 16,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      paddingTop: 12,
                      borderTop: "1px solid #f5f5f5",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: post.author?.bg || "#e6f9f2",
                        color: post.author?.color || "#00b67a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {post.author?.initials || "SP"}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500 }}>
                      {post.author?.name || post.author_name || "WePub"}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#aaa",
                        marginLeft: "auto",
                      }}
                    >
                      {post.date || post.created_at?.split("T")[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* NEWSLETTER */}
      <section
        style={{
          background: "linear-gradient(135deg, #f4fdf9, #eff6ff)",
          borderTop: "1px solid #f0f0f0",
          padding: "clamp(24px,4vw,64px) clamp(16px,4vw,40px)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 30,
            fontWeight: 700,
            marginBottom: 10,
            letterSpacing: "-0.5px",
          }}
        >
          Get the best posts in your inbox
        </h2>
        <p style={{ fontSize: 15, color: "#666", marginBottom: 28 }}>
          Weekly tips on commerce, content, and growth. No spam.
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: 440,
            margin: "0 auto",
          }}
        >
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              flex: 1,
              minWidth: 200,
              padding: "11px 16px",
              border: "1px solid #ddd",
              borderRadius: 10,
              fontSize: 14,
              outline: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button style={btnStyle("green")}>Subscribe</button>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
