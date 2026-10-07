import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const CATEGORIES = [
  { icon: "🚀", label: "Getting started", id: "start" },
  { icon: "🛍️", label: "Commerce & products", id: "commerce" },
  { icon: "✏️", label: "Content & blog", id: "content" },
  { icon: "💳", label: "Billing & plans", id: "billing" },
  { icon: "🔒", label: "Account & security", id: "account" },
  { icon: "🔌", label: "Integrations", id: "integrations" },
];

const ARTICLES = [
  {
    cat: "start",
    q: "How do I create my first store?",
    a: "After signing up, go to your Dashboard and click '+ Add product'. Follow the setup wizard to add products, configure payments, and choose your theme. You can launch in under 30 minutes.",
  },
  {
    cat: "start",
    q: "Can I import products from Shopify or WooCommerce?",
    a: "Yes. Go to Settings → Import & Export and use our CSV importer or connect your existing Shopify/WooCommerce store via the migration tool. Products, images, and inventory transfer automatically.",
  },
  {
    cat: "start",
    q: "How do I connect a custom domain?",
    a: "Go to Settings → Domains and click 'Add domain'. Enter your domain name and follow the DNS configuration instructions. Changes typically propagate within 24–48 hours.",
  },
  {
    cat: "start",
    q: "Is WePub really free?",
    a: "Yes — WePub is completely free to use. There are no plans, no subscriptions, and no hidden fees. Just sign up and start building your store and blog.",
  },
  {
    cat: "commerce",
    q: "How do I set up payments?",
    a: "Go to Settings → Payments. We support Stripe, PayPal, Apple Pay, Google Pay, and 100+ other payment methods. ShopPress never charges transaction fees on top of your payment processor's fees.",
  },
  {
    cat: "commerce",
    q: "Can I sell digital products?",
    a: "Yes. When creating a product, select 'Digital product' and upload your file. After purchase, customers receive an automatic download link. You can set download limits and expiry dates.",
  },
  {
    cat: "commerce",
    q: "How does abandoned cart recovery work?",
    a: "On the Grow plan and above, ShopPress automatically emails customers who add items to cart but don't complete checkout. You can customise the email timing and content in Marketing → Automations.",
  },
  {
    cat: "commerce",
    q: "Can I sell in multiple currencies?",
    a: "Yes. Go to Settings → Store → Currencies and enable the currencies you want. Prices are automatically converted using live exchange rates. You can also set fixed prices per currency.",
  },
  {
    cat: "content",
    q: "How do I publish a blog post?",
    a: "Go to Content → New Post in your dashboard. Use the block editor to write and format your post. Add images, embed products, and set your SEO metadata. Click Publish or schedule for later.",
  },
  {
    cat: "content",
    q: "Can I embed products inside blog posts?",
    a: "Yes — this is one of ShopPress's signature features. While editing a post, add a 'Product block' and search for any product in your store. Readers can add to cart without leaving the article.",
  },
  {
    cat: "content",
    q: "How do I set up SEO for my posts?",
    a: "Each post has an SEO panel where you can set the page title, meta description, and social share image. ShopPress automatically generates a sitemap and adds structured data to all content.",
  },
  {
    cat: "billing",
    q: "How does billing work?",
    a: "You're billed monthly or annually (20% discount) in advance. Your billing date is the day you started your paid plan. You can cancel at any time and keep access until the end of your billing period.",
  },
  {
    cat: "billing",
    q: "Can I switch plans?",
    a: "Yes. Go to Settings → Billing → Change plan. Upgrades take effect immediately with prorated billing. Downgrades take effect at the start of your next billing cycle.",
  },
  {
    cat: "billing",
    q: "Do you offer refunds?",
    a: "We offer a 30-day money-back guarantee for new subscriptions. Contact support within 30 days of your first charge and we'll refund you in full, no questions asked.",
  },
  {
    cat: "account",
    q: "How do I reset my password?",
    a: "On the login page, click 'Forgot password?' and enter your email. You'll receive a reset link within a few minutes. Check your spam folder if it doesn't arrive.",
  },
  {
    cat: "account",
    q: "How do I enable two-factor authentication?",
    a: "Go to Settings → Security → Two-factor authentication and click Enable. We support authenticator apps (Google Authenticator, Authy) and SMS verification.",
  },
  {
    cat: "account",
    q: "Can I have multiple staff accounts?",
    a: "Yes. Go to Settings → Team and invite team members by email. You can assign roles (Admin, Editor, Viewer) and limit access to specific areas of the dashboard.",
  },
  {
    cat: "integrations",
    q: "What integrations are available?",
    a: "ShopPress has 10,000+ plugins in our marketplace. Popular integrations include Mailchimp, Klaviyo, Google Analytics, Facebook Pixel, Zapier, Slack, and more.",
  },
  {
    cat: "integrations",
    q: "Is there an API?",
    a: "Yes. ShopPress has a full REST API and webhooks. API documentation is available at docs.shoppress.io. API access is included on the Grow plan and above.",
  },
];

export default function HelpCenterPage({ onNavigate, user, onLogout }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openArticle, setOpenArticle] = useState(null);

  const filtered = ARTICLES.filter((a) => {
    const matchesCat = activeCategory === "all" || a.cat === activeCategory;
    const matchesSearch =
      !search ||
      a.q.toLowerCase().includes(search.toLowerCase()) ||
      a.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px) 56px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f4fdf9, #eff6ff)",
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
          Help center
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          How can we help?
        </h1>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 28 }}>
          Search 500+ articles or browse by category.
        </p>
        <div style={{ maxWidth: 500, margin: "0 auto", position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 18,
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            style={{
              width: "100%",
              padding: "14px 18px 14px 46px",
              border: "1px solid #ddd",
              borderRadius: 14,
              fontSize: 15,
              outline: "none",
              fontFamily: "'DM Sans', sans-serif",
              boxSizing: "border-box",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          />
        </div>
      </section>

      {/* CATEGORY GRID */}
      {!search && (
        <section
          style={{ padding: "48px 40px 0", maxWidth: 900, margin: "0 auto" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
              gap: 12,
            }}
          >
            <button
              onClick={() => setActiveCategory("all")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 18px",
                border: `2px solid ${activeCategory === "all" ? "#00b67a" : "#ebebeb"}`,
                borderRadius: 14,
                background: activeCategory === "all" ? "#f4fdf9" : "#fff",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 22 }}>📚</span>
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    margin: 0,
                    color: activeCategory === "all" ? "#00b67a" : "#111",
                  }}
                >
                  All articles
                </p>
                <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
                  {ARTICLES.length} articles
                </p>
              </div>
            </button>
            {CATEGORIES.map((cat) => {
              const count = ARTICLES.filter((a) => a.cat === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 18px",
                    border: `2px solid ${activeCategory === cat.id ? "#00b67a" : "#ebebeb"}`,
                    borderRadius: 14,
                    background: activeCategory === cat.id ? "#f4fdf9" : "#fff",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{cat.icon}</span>
                  <div style={{ textAlign: "left" }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        margin: 0,
                        color: activeCategory === cat.id ? "#00b67a" : "#111",
                      }}
                    >
                      {cat.label}
                    </p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
                      {count} articles
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ARTICLES ACCORDION */}
      <section
        style={{
          padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) 80px",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        {search && (
          <p style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
            <strong>{search}</strong>"
          </p>
        )}

        {filtered.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}
          >
            <div style={{ fontSize: 44, marginBottom: 14 }}>🤔</div>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#777" }}>
              No articles found
            </p>
            <p style={{ fontSize: 14, marginBottom: 24 }}>
              Try a different search term or contact our support team.
            </p>
            <button
              style={btnStyle("green")}
              onClick={() => onNavigate("contact")}
            >
              Contact support
            </button>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid #ebebeb",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {filtered.map((article, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenArticle(openArticle === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 22px",
                    background: openArticle === i ? "#fafafa" : "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    borderBottom:
                      i < filtered.length - 1 || openArticle === i
                        ? "1px solid #f0f0f0"
                        : "none",
                    transition: "background 0.15s",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#111",
                      textAlign: "left",
                    }}
                  >
                    {article.q}
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      color: "#aaa",
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: openArticle === i ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                {openArticle === i && (
                  <div
                    style={{
                      padding: "16px 22px 20px",
                      background: "#fafafa",
                      borderBottom:
                        i < filtered.length - 1 ? "1px solid #f0f0f0" : "none",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: "#555",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {article.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CONTACT SUPPORT CTA */}
      <section
        style={{
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
          padding: "clamp(24px,4vw,56px) clamp(16px,4vw,40px)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 10,
            letterSpacing: "-0.3px",
          }}
        >
          Still need help?
        </h2>
        <p style={{ fontSize: 15, color: "#666", marginBottom: 28 }}>
          Our support team is available Mon–Fri, 9am–6pm GMT. Average reply
          time: 2 hours.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={btnStyle("green", "lg")}
            onClick={() => onNavigate("contact")}
          >
            💬 Chat with us
          </button>
          <button
            style={btnStyle("outline", "lg")}
            onClick={() => onNavigate("contact")}
          >
            📧 Send an email
          </button>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
