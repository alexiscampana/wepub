import { useState, useEffect, useRef, useCallback } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { BLOG_POSTS } from "./BlogPage.jsx";
import { SkeletonCard } from "../components/Skeletons.jsx";

const STATIC_PRODUCTS = [
  {
    id: 1,
    name: "Minimal Desk Lamp",
    price: "$89",
    category: "Home",
    emoji: "🪔",
    type: "product",
  },
  {
    id: 2,
    name: "Ceramic Pour-Over Kit",
    price: "$64",
    category: "Kitchen",
    emoji: "☕",
    type: "product",
  },
  {
    id: 3,
    name: "Linen Notebook A5",
    price: "$28",
    category: "Stationery",
    emoji: "📓",
    type: "product",
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: "$49",
    category: "Tech",
    emoji: "⚡",
    type: "product",
  },
  {
    id: 5,
    name: "Bamboo Desk Organizer",
    price: "$39",
    category: "Home",
    emoji: "🗂️",
    type: "product",
  },
  {
    id: 6,
    name: "Scented Soy Candle",
    price: "$32",
    category: "Home",
    emoji: "🕯️",
    type: "product",
  },
];

const PAGES = [
  {
    name: "Features",
    desc: "Everything WePub can do",
    emoji: "⚡",
    page: "features",
  },
  {
    name: "Commerce",
    desc: "Tools for selling online",
    emoji: "🛍️",
    page: "commerce",
  },
  {
    name: "Content",
    desc: "CMS and publishing tools",
    emoji: "✏️",
    page: "content",
  },

  {
    name: "About",
    desc: "Our story, team, and values",
    emoji: "👋",
    page: "about",
  },
  {
    name: "Blog",
    desc: "Commerce and content guides",
    emoji: "📝",
    page: "blog",
  },
  {
    name: "Contact",
    desc: "Get in touch with our team",
    emoji: "💬",
    page: "contact",
  },
  {
    name: "Careers",
    desc: "Join the WePub team",
    emoji: "💼",
    page: "careers",
  },
  {
    name: "Help center",
    desc: "Browse 500+ support articles",
    emoji: "📚",
    page: "help",
  },
  {
    name: "Changelog",
    desc: "Latest updates and releases",
    emoji: "🚀",
    page: "changelog",
  },
  {
    name: "Status",
    desc: "System status and uptime",
    emoji: "🟢",
    page: "status",
  },
  {
    name: "Reviews",
    desc: "Customer testimonials",
    emoji: "⭐",
    page: "reviews",
  },
  {
    name: "Compare",
    desc: "WePub vs competitors",
    emoji: "⚖️",
    page: "compare",
  },
];

const POPULAR = [
  "desk lamp",
  "SEO guide",
  "store",
  "blog post",
  "features",
  "checkout",
  "careers",
];

export default function SearchPage({
  onNavigate,
  initialQuery = "",
  user,
  onLogout,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState("All");
  const [dbProducts, setDbProducts] = useState([]);
  const [dbPosts, setDbPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Search Supabase when query changes
  const searchSupabase = useCallback(async (q) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const { getProducts, getPosts } = await import("../supabaseService.js");
      const [prodRes, postRes] = await Promise.all([
        getProducts({ search: q, limit: 10 }),
        getPosts({ search: q, limit: 10 }),
      ]);
      if (prodRes.data?.length)
        setDbProducts(
          prodRes.data.map((p) => ({
            ...p,
            type: "product",
            price: `$${p.price}`,
          })),
        );
      if (postRes.data?.length) setDbPosts(postRes.data);
    } catch {
      /* fall back to static */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.trim().length >= 2) {
      debounceRef.current = setTimeout(() => searchSupabase(query), 350);
    } else {
      setDbProducts([]);
      setDbPosts([]);
    }
    return () => clearTimeout(debounceRef.current);
  }, [query, searchSupabase]);

  const q = query.toLowerCase();
  const products =
    dbProducts.length > 0
      ? dbProducts.filter((p) => p.name?.toLowerCase().includes(q))
      : STATIC_PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
        );
  const posts =
    dbPosts.length > 0
      ? dbPosts.filter((p) => p.title?.toLowerCase().includes(q))
      : BLOG_POSTS.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q),
        );
  const pages = PAGES.filter(
    (p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q),
  );
  const total = products.length + posts.length + pages.length;
  const hasResults = query.trim() && total > 0;
  const noResults = query.trim() && total === 0 && !loading;

  const filtered = { products, posts, pages };

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

      {/* SEARCH BAR */}
      <section
        style={{
          padding: "56px 40px 40px",
          borderBottom: "1px solid #f0f0f0",
          background: "#fafafa",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 20,
              letterSpacing: "-0.5px",
              textAlign: "center",
            }}
          >
            Search WePub
          </h1>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 18,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 18,
              }}
            >
              🔍
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, articles, pages..."
              style={{
                width: "100%",
                padding: "14px 48px",
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: 14,
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
                background: "#fff",
                boxSizing: "border-box",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            />
            {loading && (
              <div
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 18,
                  height: 18,
                  border: "2px solid #f0f0f0",
                  borderTop: "2px solid #00b67a",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
            )}
            {query && !loading && (
              <button
                onClick={() => {
                  setQuery("");
                  setDbProducts([]);
                  setDbPosts([]);
                }}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#aaa",
                  padding: 4,
                }}
              >
                ✕
              </button>
            )}
          </div>
          <style>{`@keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }`}</style>

          {/* Popular searches */}
          {!query && (
            <div
              style={{
                marginTop: 20,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "#aaa",
                  marginRight: 4,
                  alignSelf: "center",
                }}
              >
                Popular:
              </span>
              {POPULAR.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: 99,
                    padding: "5px 14px",
                    fontSize: 13,
                    cursor: "pointer",
                    color: "#555",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f4fdf9";
                    e.currentTarget.style.borderColor = "#c8f0e0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.borderColor = "#e5e5e5";
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RESULTS */}
      <section
        style={{ maxWidth: 800, margin: "0 auto", padding: "32px 40px 72px" }}
      >
        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} height={20} />
            ))}
          </div>
        )}

        {hasResults && !loading && (
          <>
            {/* Filter tabs */}
            <div
              style={{
                display: "flex",
                gap: 6,
                marginBottom: 28,
                flexWrap: "wrap",
              }}
            >
              {[
                ["All", total],
                ["Products", products.length],
                ["Articles", posts.length],
                ["Pages", pages.length],
              ].map(([label, count]) =>
                count > 0 || label === "All" ? (
                  <button
                    key={label}
                    onClick={() => setActiveFilter(label)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: 99,
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      border: "1px solid",
                      background: activeFilter === label ? "#111" : "#fff",
                      color: activeFilter === label ? "#fff" : "#555",
                      borderColor: activeFilter === label ? "#111" : "#ddd",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                    {count > 0 && (
                      <span
                        style={{
                          background:
                            activeFilter === label
                              ? "rgba(255,255,255,0.2)"
                              : "#f0f0f0",
                          borderRadius: 99,
                          padding: "0 7px",
                          fontSize: 12,
                        }}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                ) : null,
              )}
            </div>
            <p style={{ fontSize: 13, color: "#aaa", marginBottom: 20 }}>
              {total} result{total !== 1 ? "s" : ""} for "
              <strong style={{ color: "#555" }}>{query}</strong>"
              {dbProducts.length > 0 && (
                <span
                  style={{
                    marginLeft: 8,
                    background: "#e6f9f2",
                    color: "#00895a",
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 99,
                    padding: "2px 8px",
                  }}
                >
                  Live results
                </span>
              )}
            </p>

            {/* Products */}
            {(activeFilter === "All" || activeFilter === "Products") &&
              filtered.products.length > 0 && (
                <div style={{ marginBottom: 36 }}>
                  <h2
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#aaa",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    Products
                  </h2>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {filtered.products.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => onNavigate("product-" + p.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "14px 16px",
                          border: "1px solid #ebebeb",
                          borderRadius: 12,
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#fafafa")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#fff")
                        }
                      >
                        <span style={{ fontSize: 28 }}>{p.emoji || "🛍️"}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 600 }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: 12, color: "#aaa" }}>
                            {p.category}
                          </div>
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 700 }}>
                          {p.price}
                        </span>
                        <span style={{ color: "#ccc" }}>→</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Posts */}
            {(activeFilter === "All" || activeFilter === "Articles") &&
              filtered.posts.length > 0 && (
                <div style={{ marginBottom: 36 }}>
                  <h2
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#aaa",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    Articles
                  </h2>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {filtered.posts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => onNavigate("blog-post-" + p.id)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 14,
                          padding: "14px 16px",
                          border: "1px solid #ebebeb",
                          borderRadius: 12,
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#fafafa")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#fff")
                        }
                      >
                        <span style={{ fontSize: 28, flexShrink: 0 }}>
                          {p.emoji || "📝"}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              marginBottom: 3,
                            }}
                          >
                            {p.title}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#888",
                              lineHeight: 1.5,
                            }}
                          >
                            {(p.excerpt || "").slice(0, 100)}…
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: 11,
                            color: "#aaa",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {p.readTime || p.read_time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Pages */}
            {(activeFilter === "All" || activeFilter === "Pages") &&
              filtered.pages.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#aaa",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    Pages
                  </h2>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {filtered.pages.map((p) => (
                      <div
                        key={p.name}
                        onClick={() => onNavigate(p.page)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "14px 16px",
                          border: "1px solid #ebebeb",
                          borderRadius: 12,
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#fafafa")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#fff")
                        }
                      >
                        <span style={{ fontSize: 24 }}>{p.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 600 }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: 12, color: "#aaa" }}>
                            {p.desc}
                          </div>
                        </div>
                        <span style={{ color: "#ccc" }}>→</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </>
        )}

        {noResults && (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#555",
                marginBottom: 8,
              }}
            >
              No results for "{query}"
            </h2>
            <p style={{ fontSize: 15, marginBottom: 28 }}>
              Try a different search term, or browse our pages.
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                style={btnStyle("green")}
                onClick={() => onNavigate("store")}
              >
                Browse store
              </button>
              <button
                style={btnStyle("outline")}
                onClick={() => onNavigate("blog")}
              >
                Read the blog
              </button>
            </div>
          </div>
        )}

        {!query && !loading && (
          <div style={{ textAlign: "center", padding: "72px 0" }}>
            <p style={{ fontSize: 15, color: "#aaa" }}>
              Start typing to search across products, articles, and pages.
            </p>
          </div>
        )}
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
