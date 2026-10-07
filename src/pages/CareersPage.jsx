import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { useToast } from "../components/Toast.jsx";

const JOBS = [
  {
    id: 1,
    title: "Senior React Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$130k–$160k",
  },
  {
    id: 2,
    title: "Product Designer",
    dept: "Design",
    location: "Remote",
    type: "Full-time",
    salary: "$110k–$140k",
  },
  {
    id: 3,
    title: "Commerce Growth Lead",
    dept: "Growth",
    location: "Lisbon / Remote",
    type: "Full-time",
    salary: "$100k–$130k",
  },
  {
    id: 4,
    title: "Customer Success Manager",
    dept: "Support",
    location: "Remote",
    type: "Full-time",
    salary: "$70k–$90k",
  },
  {
    id: 5,
    title: "Backend Engineer (Node.js)",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k–$150k",
  },
  {
    id: 6,
    title: "Content Marketing Manager",
    dept: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$80k–$100k",
  },
  {
    id: 7,
    title: "DevOps / Platform Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$125k–$155k",
  },
  {
    id: 8,
    title: "Data Analyst",
    dept: "Analytics",
    location: "Remote",
    type: "Contract",
    salary: "$70–90/hr",
  },
];

const DEPTS = [
  "All",
  "Engineering",
  "Design",
  "Growth",
  "Marketing",
  "Support",
  "Analytics",
];

const PERKS = [
  {
    icon: "🌍",
    title: "Fully remote",
    desc: "Work from anywhere. We have teammates in 18 countries.",
  },
  {
    icon: "⏰",
    title: "Async-first",
    desc: "No mandatory meetings. Work when you're most productive.",
  },
  {
    icon: "💸",
    title: "Competitive pay",
    desc: "Top of market salaries plus equity in a growing company.",
  },
  {
    icon: "🏥",
    title: "Health coverage",
    desc: "Full medical, dental, and vision for you and your family.",
  },
  {
    icon: "📚",
    title: "$2k learning budget",
    desc: "Courses, books, conferences — invest in yourself.",
  },
  {
    icon: "🏖️",
    title: "Unlimited PTO",
    desc: "We mean it. Most of the team takes 4–6 weeks per year.",
  },
];

export default function CareersPage({ onNavigate, user, onLogout }) {
  const [dept, setDept] = useState("All");
  const [selected, setSelected] = useState(null);
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    why: "",
  });
  const toast = useToast();

  const filtered = JOBS.filter((j) => dept === "All" || j.dept === dept);
  const job = JOBS.find((j) => j.id === selected);

  const handleApply = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setApplied(true);
    toast.success(
      "Application submitted! We'll be in touch within 5 business days.",
    );
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
      <SharedNav
        onNavigate={onNavigate}
        activePage="careers"
        user={user}
        onLogout={onLogout}
      />

      {/* HERO */}
      <section
        style={{
          padding: "80px 40px 64px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c4b5fd",
            marginBottom: 14,
          }}
        >
          Careers
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(30px, 5vw, 50px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 16,
            letterSpacing: "-1px",
            maxWidth: 580,
            margin: "0 auto 16px",
          }}
        >
          Build the future of commerce and content
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 460,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          We're a fully remote team of 90 across 18 countries. Come do the best
          work of your career.
        </p>
        <div
          style={{
            display: "flex",
            gap: 40,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            ["90+", "Team members"],
            ["18", "Countries"],
            ["$500B+", "Merchant GMV"],
            ["1M+", "Merchants"],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#00b67a",
                  letterSpacing: "-1px",
                }}
              >
                {v}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PERKS */}
      <section
        style={{
          padding: "clamp(24px,4vw,64px) clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: "-0.5px",
                marginBottom: 8,
              }}
            >
              Why WePub
            </h2>
            <p style={{ fontSize: 16, color: "#666" }}>
              We take care of the people who build this company.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: 16,
            }}
          >
            {PERKS.map((p) => (
              <div
                key={p.title}
                style={{
                  background: "#fafafa",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "22px",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section style={{ padding: "64px 40px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Open positions
            </h2>
            <span style={{ fontSize: 13, color: "#888" }}>
              {filtered.length} role{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Dept filter */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            {DEPTS.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  border: "1px solid",
                  background: dept === d ? "#111" : "#fff",
                  color: dept === d ? "#fff" : "#555",
                  borderColor: dept === d ? "#111" : "#ddd",
                  transition: "all 0.15s",
                }}
              >
                {d}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((job) => (
              <div
                key={job.id}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 14,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  flexWrap: "wrap",
                  transition: "box-shadow 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.07)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}
                  >
                    {job.title}
                  </h3>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {[job.dept, job.location, job.type].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 12,
                          background: "#f5f5f5",
                          color: "#555",
                          borderRadius: 99,
                          padding: "3px 10px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span
                    style={{ fontSize: 14, fontWeight: 600, color: "#00b67a" }}
                  >
                    {job.salary}
                  </span>
                  <button
                    style={btnStyle("green")}
                    onClick={() => {
                      setSelected(job.id);
                      setApplied(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: 36,
              padding: "28px",
              background: "#fafafa",
              borderRadius: 16,
              border: "1px solid #ebebeb",
            }}
          >
            <p style={{ fontSize: 15, color: "#555", marginBottom: 12 }}>
              Don't see a role that fits? We're always looking for great people.
            </p>
            <button
              style={btnStyle("outline")}
              onClick={() => onNavigate("contact")}
            >
              Send us a general application
            </button>
          </div>
        </div>
      </section>

      {/* APPLY MODAL */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "32px",
              maxWidth: 520,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {applied ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 24,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  Application sent!
                </h2>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
                  Thanks for applying to <strong>{job?.title}</strong>. We'll
                  review your application and get back to you within 5 business
                  days.
                </p>
                <button
                  style={{ ...btnStyle("green"), marginTop: 20 }}
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 24,
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 22,
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      {job?.title}
                    </h2>
                    <p style={{ fontSize: 13, color: "#888" }}>
                      {job?.dept} · {job?.location} · {job?.salary}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 20,
                      color: "#aaa",
                      padding: 4,
                    }}
                  >
                    ✕
                  </button>
                </div>
                <form
                  onSubmit={handleApply}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {[
                    ["Full name", "name", "text", "Alex Johnson"],
                    ["Email address", "email", "email", "you@example.com"],
                    [
                      "LinkedIn / portfolio URL",
                      "linkedin",
                      "url",
                      "https://linkedin.com/in/...",
                    ],
                  ].map(([label, key, type, placeholder]) => (
                    <div key={key}>
                      <label
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#444",
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        value={form[key]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [key]: e.target.value }))
                        }
                        placeholder={placeholder}
                        required={key !== "linkedin"}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1px solid #ddd",
                          borderRadius: 10,
                          fontSize: 14,
                          outline: "none",
                          fontFamily: "'DM Sans', sans-serif",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#444",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Why do you want to join WePub?
                    </label>
                    <textarea
                      value={form.why}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, why: e.target.value }))
                      }
                      rows={4}
                      placeholder="Tell us a bit about yourself and why this role excites you..."
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid #ddd",
                        borderRadius: 10,
                        fontSize: 14,
                        outline: "none",
                        fontFamily: "'DM Sans', sans-serif",
                        boxSizing: "border-box",
                        resize: "vertical",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      ...btnStyle("green", "lg"),
                      justifyContent: "center",
                    }}
                  >
                    Submit application →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
