import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { BLOG_POSTS } from "./BlogPage.jsx";

const POST_CONTENT = {
  1: [
    {
      type: "lead",
      text: "The stores growing fastest in 2026 aren't just selling — they're publishing. Content marketing has quietly become the highest-ROI channel for DTC brands, and the numbers back it up.",
    },
    { type: "h2", text: "Why content drives commerce" },
    {
      type: "p",
      text: "When a potential customer reads a helpful article on your site, three things happen: they trust you more, they stay longer, and they're far more likely to buy. Studies show visitors who arrive via blog content convert at 3.2x the rate of visitors who land directly on a product page.",
    },
    {
      type: "p",
      text: "The reason is simple — by the time they click 'Add to cart', they already believe you understand their problem. The sale is almost incidental.",
    },
    { type: "h2", text: "The content flywheel" },
    {
      type: "p",
      text: "The most effective approach isn't one-off articles. It's building a content flywheel: publish helpful content → attract organic search traffic → build an email list → promote products to that list → generate revenue → invest in more content.",
    },
    {
      type: "callout",
      text: "💡 WePub lets you embed products directly inside blog posts — so readers can buy without ever leaving the article.",
    },
    { type: "h2", text: "What to publish" },
    {
      type: "p",
      text: "Start with problems your customers already have. If you sell coffee equipment, write about dialing in grind size, water temperature, and brew ratios. You'll rank for searches your customers make before they even know they need your product.",
    },
    {
      type: "p",
      text: "Over time, layer in comparison posts, buying guides, and 'best of' roundups. These capture high-intent searches close to the point of purchase.",
    },
    { type: "h2", text: "Measuring the impact" },
    {
      type: "p",
      text: "Track which posts drive the most product views and purchases. WePub's unified analytics shows this directly — no stitching together GA4 and your store analytics. Double down on formats that convert.",
    },
  ],
  2: [
    {
      type: "lead",
      text: "Google's 2025 Helpful Content updates fundamentally changed what it takes to rank product pages. Here's what's working right now.",
    },
    { type: "h2", text: "The death of thin product pages" },
    {
      type: "p",
      text: "Product pages with only a title, price, and a few bullet points are struggling. Google's ranking systems now reward pages that demonstrate real expertise and give users a reason to trust the seller.",
    },
    { type: "h2", text: "What to add to every product page" },
    {
      type: "p",
      text: "Add genuine use-case descriptions written from customer experience, not manufacturer specs. Include FAQ sections that answer real questions. Add video, care guides, and comparison tables where relevant.",
    },
    {
      type: "callout",
      text: "💡 Target one primary keyword per page but write for humans first. Google is very good at detecting content written for search engines.",
    },
    { type: "h2", text: "Technical SEO still matters" },
    {
      type: "p",
      text: "Core Web Vitals remain a ranking factor. Ensure your pages load under 2.5 seconds, avoid layout shifts, and make sure all interactive elements respond quickly. WePub handles most of this automatically.",
    },
  ],
  3: [
    {
      type: "lead",
      text: "Most people open the block editor, type some text, add an image, and publish. But the editor is capable of so much more. Here are 10 tricks that will transform your workflow.",
    },
    { type: "h2", text: "1. Reusable blocks" },
    {
      type: "p",
      text: "Any block or group of blocks can be saved as reusable. CTAs, author bios, product callouts — save once, insert anywhere. When you update the reusable block, it updates everywhere.",
    },
    { type: "h2", text: "2. Global styles" },
    {
      type: "p",
      text: "Define your typography, spacing, and color palette once in Global Styles. Every block follows these rules automatically, keeping your content visually consistent.",
    },
    {
      type: "callout",
      text: "💡 Hold Shift+Alt+Z to zoom out and see your full page layout. This makes spotting spacing and rhythm issues much easier.",
    },
    { type: "h2", text: "3. Pattern library" },
    {
      type: "p",
      text: "Patterns are pre-built block layouts — hero sections, testimonials, pricing tables. You can use built-in patterns or create your own. They massively speed up page building.",
    },
  ],
};

export default function BlogPostPage({ postId, onNavigate }) {
  const post = BLOG_POSTS.find((p) => p.id === postId);
  const [liked, setLiked] = useState(false);
  const likeBase = ((postId * 37 + 23) % 80) + 20;
  const [likeCount, setLikeCount] = useState(likeBase);
  const content = POST_CONTENT[postId] || POST_CONTENT[1];

  const related = BLOG_POSTS.filter((p) => p.id !== postId).slice(0, 3);

  if (!post)
    return (
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          color: "#111",
        }}
      >
        <div style={{ fontSize: 48 }}>📭</div>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>Post not found</h2>
        <p style={{ color: "#888" }}>
          This article may have been moved or deleted.
        </p>
        <button
          style={{
            padding: "10px 22px",
            background: "#00b67a",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
          }}
          onClick={() => onNavigate("blog")}
        >
          ← Back to blog
        </button>
      </div>
    );

  const handleLike = () => {
    setLiked((l) => !l);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

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

      {/* HERO */}
      <section
        style={{
          background: post.heroBg,
          padding: "64px 40px 56px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <button
            onClick={() => onNavigate("blog")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              color: "#888",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: 0,
            }}
          >
            ← Back to blog
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
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
              {post.category}
            </span>
            <span style={{ fontSize: 13, color: "#888" }}>{post.readTime}</span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 700,
              marginBottom: 20,
              lineHeight: 1.2,
              letterSpacing: "-0.8px",
            }}
          >
            {post.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: post.author.bg,
                color: post.author.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {post.author.initials}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {post.author.name}
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {post.author.role} · {post.date}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <article
        style={{ maxWidth: 720, margin: "0 auto", padding: "48px 40px" }}
      >
        {content.map((block, i) => {
          if (block.type === "lead")
            return (
              <p
                key={i}
                style={{
                  fontSize: 19,
                  color: "#333",
                  lineHeight: 1.75,
                  marginBottom: 28,
                  fontWeight: 400,
                }}
              >
                {block.text}
              </p>
            );
          if (block.type === "h2")
            return (
              <h2
                key={i}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 26,
                  fontWeight: 700,
                  marginTop: 40,
                  marginBottom: 14,
                  letterSpacing: "-0.3px",
                }}
              >
                {block.text}
              </h2>
            );
          if (block.type === "p")
            return (
              <p
                key={i}
                style={{
                  fontSize: 16,
                  color: "#444",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                {block.text}
              </p>
            );
          if (block.type === "callout")
            return (
              <div
                key={i}
                style={{
                  background: "#f4fdf9",
                  border: "1px solid #c8f0e0",
                  borderLeft: "4px solid #00b67a",
                  borderRadius: "0 10px 10px 0",
                  padding: "16px 20px",
                  margin: "24px 0",
                  fontSize: 14,
                  color: "#333",
                  lineHeight: 1.7,
                }}
              >
                {block.text}
              </div>
            );
          return null;
        })}

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#f5f5f5",
                color: "#555",
                fontSize: 12,
                fontWeight: 500,
                borderRadius: 99,
                padding: "4px 12px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Like + Share */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 28,
          }}
        >
          <button
            onClick={handleLike}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: liked ? "#fce8e8" : "#f5f5f5",
              border: "none",
              borderRadius: 99,
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: 14,
              color: liked ? "#ef4444" : "#555",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              transition: "all 0.15s",
            }}
          >
            {liked ? "❤️" : "🤍"} {likeCount}
          </button>
          <button style={{ ...btnStyle("outline"), borderRadius: 99 }}>
            Share
          </button>
          <button style={{ ...btnStyle("outline"), borderRadius: 99 }}>
            Copy link
          </button>
        </div>
      </article>

      {/* AUTHOR BIO */}
      <section
        style={{ maxWidth: 720, margin: "0 auto 48px", padding: "0 40px" }}
      >
        <div
          style={{
            background: "#fafafa",
            border: "1px solid #ebebeb",
            borderRadius: 16,
            padding: "24px",
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: post.author.bg,
              color: post.author.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {post.author.initials}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
              {post.author.name}
            </div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>
              {post.author.role} at WePub
            </div>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
              Writing about commerce, content strategy, and what's actually
              working for online businesses. {post.author.name.split(" ")[0]}{" "}
              has been covering e-commerce since 2019.
            </p>
          </div>
        </div>
      </section>

      {/* RELATED POSTS */}
      <section
        style={{
          borderTop: "1px solid #f0f0f0",
          padding: "56px 40px 72px",
          background: "#fafafa",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 28,
              letterSpacing: "-0.3px",
            }}
          >
            More from the blog
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {related.map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate("blog-post-" + p.id)}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 14,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(0,0,0,0.07)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    height: 90,
                    background: p.heroBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40,
                  }}
                >
                  {p.emoji}
                </div>
                <div style={{ padding: "16px" }}>
                  <span
                    style={{ fontSize: 11, color: "#888", fontWeight: 500 }}
                  >
                    {p.category} · {p.readTime}
                  </span>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {p.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
