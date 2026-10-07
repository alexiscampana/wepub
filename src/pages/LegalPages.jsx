import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const TERMS_SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of terms",
    content:
      "By accessing or using ShopPress, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. These terms apply to all users of the platform, including merchants, publishers, and visitors.",
  },
  {
    id: "account",
    title: "2. Account registration",
    content:
      "To access certain features of ShopPress, you must register for an account. You agree to provide accurate, current, and complete information and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.",
  },
  {
    id: "usage",
    title: "3. Acceptable use",
    content:
      "You agree not to use ShopPress for any unlawful purpose or in any way that could damage, disable, overburden, or impair the service. Prohibited activities include distributing spam, uploading malicious code, infringing intellectual property rights, and attempting to gain unauthorised access to any part of the service.",
  },
  {
    id: "payments",
    title: "4. Payments and billing",
    content:
      "ShopPress charges no transaction fees on any plan. Subscription fees are billed monthly or annually in advance. All fees are non-refundable except as required by law or as otherwise stated. We reserve the right to change pricing with 30 days notice to existing subscribers.",
  },
  {
    id: "ip",
    title: "5. Intellectual property",
    content:
      "The ShopPress platform, including all software, designs, trademarks, and content created by ShopPress, is owned by ShopPress Inc. and protected by applicable intellectual property laws. Your store content, products, and data remain yours. You grant ShopPress a limited licence to host, display, and deliver your content solely to operate the service.",
  },
  {
    id: "termination",
    title: "6. Termination",
    content:
      "We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties. Upon termination, your right to use the service ceases immediately.",
  },
  {
    id: "liability",
    title: "7. Limitation of liability",
    content:
      "To the maximum extent permitted by law, ShopPress shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability to you for any claim arising out of these terms shall not exceed the amount you paid us in the 12 months preceding the claim.",
  },
  {
    id: "changes",
    title: "8. Changes to terms",
    content:
      "We reserve the right to modify these terms at any time. We will notify you of significant changes by email or through the platform. Continued use of ShopPress after changes constitutes acceptance of the new terms. Last updated: June 1, 2026.",
  },
];

const PRIVACY_SECTIONS = [
  {
    id: "collect",
    title: "1. Information we collect",
    content:
      "We collect information you provide directly: account details (name, email, password), store and product information, payment details (processed securely by our payment partners — we never store card numbers), and communications you send us. We also collect usage data automatically: pages visited, features used, browser type, IP address, and referral sources through cookies and similar technologies.",
  },
  {
    id: "use",
    title: "2. How we use your information",
    content:
      "We use your information to provide and improve the ShopPress service, process transactions, send transactional emails (order confirmations, password resets), send product updates and marketing communications (you can opt out anytime), analyse usage to improve our product, and comply with legal obligations.",
  },
  {
    id: "sharing",
    title: "3. Information sharing",
    content:
      "We do not sell your personal information to third parties. We share data with service providers who help us operate the platform (hosting, payments, analytics, email delivery) under strict data processing agreements. We may disclose information if required by law, to protect our rights, or in connection with a business transaction such as a merger or acquisition.",
  },
  {
    id: "cookies",
    title: "4. Cookies and tracking",
    content:
      "We use cookies and similar tracking technologies to operate the service, remember your preferences, analyse traffic, and deliver relevant marketing. You can control cookie preferences through our cookie consent banner or your browser settings. Disabling certain cookies may affect functionality.",
  },
  {
    id: "retention",
    title: "5. Data retention",
    content:
      "We retain your account data for as long as your account is active. After account deletion, we delete personal data within 30 days, except where we are legally required to retain it longer. Analytics data may be retained in anonymised form indefinitely.",
  },
  {
    id: "rights",
    title: "6. Your rights",
    content:
      "Depending on your location, you may have the right to access, correct, or delete your personal data; object to or restrict certain processing; and data portability. To exercise these rights, contact us at privacy@shoppress.io. We will respond within 30 days.",
  },
  {
    id: "security",
    title: "7. Security",
    content:
      "We use industry-standard security measures including encryption in transit (TLS), encryption at rest, access controls, and regular security audits. We are SOC 2 Type II certified. However, no internet transmission is completely secure and we cannot guarantee absolute security.",
  },
  {
    id: "contact",
    title: "8. Contact us",
    content:
      "If you have questions about this Privacy Policy, contact our Data Protection Officer at privacy@shoppress.io or by mail at ShopPress Inc., Rua do Ouro 42, Lisbon, Portugal. Last updated: June 1, 2026.",
  },
];

function LegalPage({
  title,
  lastUpdated,
  sections,
  onNavigate,
  user,
  onLogout,
}) {
  const [activeSection, setActiveSection] = useState(sections[0].id);

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

      <section
        style={{
          padding: "56px 40px 40px",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              marginBottom: 8,
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 14, color: "#aaa" }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "48px 40px 80px",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 40,
          alignItems: "start",
        }}
      >
        <div style={{ position: "sticky", top: 80 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            Contents
          </p>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{
                  background: activeSection === s.id ? "#f4fdf9" : "none",
                  border: "none",
                  borderLeft: `3px solid ${activeSection === s.id ? "#00b67a" : "transparent"}`,
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  color: activeSection === s.id ? "#00b67a" : "#666",
                  textAlign: "left",
                  borderRadius: "0 8px 8px 0",
                  transition: "all 0.15s",
                  fontWeight: activeSection === s.id ? 600 : 400,
                }}
              >
                {s.title.split(". ")[1] || s.title}
              </button>
            ))}
          </nav>
        </div>

        <div>
          {sections.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              style={{
                marginBottom: 40,
                paddingBottom: 40,
                borderBottom:
                  i < sections.length - 1 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 14,
                  letterSpacing: "-0.3px",
                }}
              >
                {s.title}
              </h2>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 1.85 }}>
                {s.content}
              </p>
            </div>
          ))}
          <div
            style={{
              background: "#fafafa",
              border: "1px solid #ebebeb",
              borderRadius: 14,
              padding: "20px 24px",
            }}
          >
            <p style={{ fontSize: 14, color: "#666", margin: "0 0 12px" }}>
              Questions about this policy?
            </p>
            <button
              style={btnStyle("outline")}
              onClick={() => onNavigate("contact")}
            >
              Contact us →
            </button>
          </div>
        </div>
      </div>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

export function TermsPage({ onNavigate, user, onLogout }) {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="June 1, 2026"
      sections={TERMS_SECTIONS}
      onNavigate={onNavigate}
      user={user}
      onLogout={onLogout}
    />
  );
}

export function PrivacyPage({ onNavigate, user, onLogout }) {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="June 1, 2026"
      sections={PRIVACY_SECTIONS}
      onNavigate={onNavigate}
      user={user}
      onLogout={onLogout}
    />
  );
}
