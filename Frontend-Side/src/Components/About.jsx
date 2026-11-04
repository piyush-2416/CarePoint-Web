 import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  HeartPulse,
  ShieldCheck,
  Target,
  Eye,
  Sparkles,
  Users,
  Award,
  Stethoscope,
} from "lucide-react";
// import "./About.css";

/* ── Animation variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ── Animated count-up number ───────────────────────────── */
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Data ────────────────────────────────────────────────── */
const STATS = [
  { value: 25, suffix: "+", label: "Years of Service" },
  { value: 120, suffix: "+", label: "Expert Doctors" },
  { value: 15000, suffix: "+", label: "Patients Treated" },
  { value: 40, suffix: "+", label: "Departments" },
];

const VALUES = [
  { icon: HeartPulse, title: "Compassion", desc: "Every patient is treated with warmth, dignity and genuine care." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest clinical and ethical standards." },
  { icon: ShieldCheck, title: "Integrity", desc: "Honest, transparent care — always in the patient's best interest." },
  { icon: Sparkles, title: "Innovation", desc: "Modern technology and evidence-based medicine, continuously updated." },
];

const TIMELINE = [
  { year: "1998", title: "Hospital Founded", desc: "Started as a 30-bed facility with a single mission — accessible, quality care." },
  { year: "2006", title: "New Specialty Wing", desc: "Added cardiology, neurology and oncology departments to serve more patients." },
  { year: "2015", title: "Digital Transformation", desc: "Introduced electronic health records and tele-consultation services." },
  { year: "2023", title: "National Excellence Award", desc: "Recognized among the top 10 hospitals for patient care quality." },
];

export default function About() {
  return (
    <div className="ab-page">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="ab-hero">
        <div className="ab-hero-glow" />
        <div className="ab-hero-inner">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span className="ab-badge" variants={fadeUp}>
              <Stethoscope size={14} /> About Us
            </motion.span>

            <motion.h1 variants={fadeUp}>
              Trusted Care, Advanced Medicine, Compassionate People
            </motion.h1>

            <motion.p className="ab-hero-sub" variants={fadeUp}>
              For over 25 years, we've combined modern medical technology with
              genuine human care — because behind every diagnosis is a person
              who deserves to be heard.
            </motion.p>

            <motion.div className="ab-hero-cta" variants={fadeUp}>
              <button className="ab-btn-primary">Book an Appointment</button>
              <button className="ab-btn-ghost">Meet Our Doctors</button>
            </motion.div>
          </motion.div>

          <motion.div
            className="ab-hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="ab-hero-orb">🏥</div>

            <motion.div
              className="ab-float-card"
              style={{ top: "14%", left: "-6%" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="ab-dot" /> 24/7 Emergency Care
            </motion.div>

            <motion.div
              className="ab-float-card"
              style={{ bottom: "18%", right: "-8%" }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <Users size={14} /> 50+ Specialist Doctors
            </motion.div>

            <motion.div
              className="ab-float-card"
              style={{ bottom: "-4%", left: "18%" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <HeartPulse size={14} /> 15k+ Happy Patients
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────── */}
      <div className="ab-stats">
        <motion.div
          className="ab-stats-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {STATS.map((s) => (
            <motion.div className="ab-stat-card" key={s.label} variants={fadeUp}>
              <div className="ab-stat-num">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="ab-stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Mission & Vision ───────────────────────────── */}
      <section className="ab-section">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="ab-mv-grid"
        >
          <motion.div className="ab-mv-card" variants={fadeUp}>
            <div className="ab-mv-icon">
              <Target size={24} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To deliver accessible, high-quality healthcare that treats every
              patient with dignity, using the most advanced medical practices
              available — without ever losing the human touch.
            </p>
          </motion.div>

          <motion.div className="ab-mv-card" variants={fadeUp}>
            <div className="ab-mv-icon">
              <Eye size={24} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To be the region's most trusted healthcare institution — known
              equally for clinical excellence and for the compassion with
              which that care is delivered.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Our Story ──────────────────────────────────── */}
      <section className="ab-section" style={{ paddingTop: 0 }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="ab-story"
        >
          <motion.div className="ab-story-visual" variants={fadeUp}>
            🩺
          </motion.div>
          <motion.div className="ab-story-text" variants={fadeUp}>
            <p className="ab-kicker">Our Story</p>
            <h2 className="ab-heading" style={{ maxWidth: "none" }}>
              Built on one simple idea — care shouldn't feel clinical
            </h2>
            <p>
              We started in 1998 as a 30-bed facility with a single mission:
              make quality healthcare accessible to everyone in our community,
              regardless of background.
            </p>
            <p>
              Over 25 years, we've grown into a multi-specialty hospital with
              40+ departments and 120+ specialist doctors — but the founding
              principle hasn't changed. Every patient who walks through our
              doors is treated like family.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Core Values ────────────────────────────────── */}
      <section className="ab-section" style={{ paddingTop: 0 }}>
        <p className="ab-kicker">What Drives Us</p>
        <h2 className="ab-heading">Our Core Values</h2>
        <p className="ab-heading-sub">
          The principles that guide every decision we make, from the operating
          room to the front desk.
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="ab-values-grid"
        >
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              className="ab-value-card"
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: "#0f6e6e" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="ab-value-icon">
                <Icon size={20} />
              </div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Timeline ───────────────────────────────────── */}
      <section className="ab-section" style={{ paddingTop: 0 }}>
        <p className="ab-kicker">Our Journey</p>
        <h2 className="ab-heading">Milestones Along the Way</h2>
        <p className="ab-heading-sub">
          A quarter-century of growth, guided by the same mission we started
          with.
        </p>

        <motion.div
          className="ab-timeline"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {TIMELINE.map((item) => (
            <motion.div className="ab-timeline-item" key={item.year} variants={fadeUp}>
              <div className="ab-timeline-dot" />
              <div className="ab-timeline-year">{item.year}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="ab-section" style={{ paddingTop: 0 }}>
        <motion.div
          className="ab-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>Your health is our priority</h2>
          <p>Schedule a consultation with one of our specialists today.</p>
          <button className="ab-btn-primary">Book Appointment</button>
        </motion.div>
      </section>
    </div>
  );
}
