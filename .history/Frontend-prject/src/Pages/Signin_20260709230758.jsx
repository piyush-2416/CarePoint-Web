import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function SignIn({ onSignInSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Unable to sign in. Please try again.');
      }

      localStorage.setItem('carepoint_token', data.token);
      localStorage.setItem('carepoint_doctor', JSON.stringify(data.doctor));

      if (onSignInSuccess) onSignInSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <style>{fontImport}</style>

      <div style={styles.panel}>
        <div style={styles.dotOverlay} />
        <div style={styles.brand}>
          <svg viewBox="0 0 120 40" width="96" style={styles.pulse}>
            <polyline
              points="0,20 25,20 32,6 40,34 48,20 60,20 66,10 72,20 120,20"
              fill="none"
              stroke="#c89b3c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 style={styles.brandTitle}>CarePoint</h2>
          <p style={styles.brandSub}>For the clinicians who never clock off.</p>
        </div>

        <div style={styles.quoteBlock}>
          <p style={styles.quoteText}>
            "Every chart, every referral, every 2 a.m. call — one calm place
            to hold it all."
          </p>
          <span style={styles.quoteAttr}>— Built with practicing physicians</span>
        </div>
      </div>

      <div style={styles.formWrap}>
        <div style={styles.card}>
          <span style={styles.eyebrow}>Doctor Portal</span>
          <h1 style={styles.heading}>Welcome back, Doctor</h1>
          <p style={styles.subheading}>
            Sign in to view today's schedule and patient records.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div style={styles.field}>
              <label htmlFor="email" style={styles.label}>Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="dr.sharma@carepoint.com"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.passwordWrap}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ ...styles.input, paddingRight: 56 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  style={styles.toggleBtn}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div style={styles.row}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={{ accentColor: '#0f3436' }} />
                <span>Keep me signed in</span>
              </label>
              <a href="#forgot-password" style={styles.link}>Forgot password?</a>
            </div>

            {error && <div style={styles.errorBox} role="alert">{error}</div>}

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p style={styles.footer}>
            New to CarePoint?{' '}
            <a href="#register" style={styles.link}>Request clinician access</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&display=swap');
`;

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '0.9fr 1.1fr',
    background: '#fbf9f4',
    fontFamily: "'Work Sans', sans-serif",
    color: '#1f2b2a',
  },
  panel: {
    background: 'radial-gradient(circle at 20% 15%, #164b4d 0%, #0f3436 45%, #0a2426 100%)',
    color: '#f6f2e9',
    padding: '56px 48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  dotOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(rgba(200,155,60,0.08) 1px, transparent 1px)',
    backgroundSize: '22px 22px',
    pointerEvents: 'none',
  },
  brand: { position: 'relative', zIndex: 1 },
  pulse: { display: 'block', marginBottom: 20 },
  brandTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 30,
    fontWeight: 600,
    letterSpacing: '0.02em',
    margin: '0 0 8px',
  },
  brandSub: {
    fontSize: 15,
    color: 'rgba(246,242,233,0.7)',
    margin: 0,
    maxWidth: 260,
    lineHeight: 1.5,
  },
  quoteBlock: {
    position: 'relative',
    zIndex: 1,
    borderTop: '1px solid rgba(246,242,233,0.15)',
    paddingTop: 24,
  },
  quoteText: {
    fontFamily: "'Fraunces', serif",
    fontSize: 19,
    fontWeight: 500,
    lineHeight: 1.5,
    margin: '0 0 12px',
  },
  quoteAttr: { fontSize: 13, color: 'rgba(246,242,233,0.55)', letterSpacing: '0.03em' },
  formWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px' },
  card: { width: '100%', maxWidth: 400 },
  eyebrow: {
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#a67f2e',
    marginBottom: 14,
  },
  heading: { fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, margin: '0 0 8px', color: '#0f3436' },
  subheading: { fontSize: 14.5, color: '#6d7f7c', margin: '0 0 32px' },
  field: { marginBottom: 18 },
  label: { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid rgba(15,52,54,0.12)',
    borderRadius: 8,
    fontSize: 14.5,
    fontFamily: 'inherit',
    color: '#1f2b2a',
    background: '#fff',
    boxSizing: 'border-box',
  },
  passwordWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  toggleBtn: {
    position: 'absolute',
    right: 12,
    background: 'none',
    border: 'none',
    fontSize: 12.5,
    fontWeight: 600,
    color: '#0f3436',
    cursor: 'pointer',
    padding: 4,
  },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: '#6d7f7c', cursor: 'pointer' },
  link: { fontSize: 13.5, color: '#0f3436', fontWeight: 500, textDecoration: 'none' },
  errorBox: {
    background: '#fbeae3',
    color: '#b3441f',
    fontSize: 13.5,
    padding: '10px 12px',
    borderRadius: 8,
    marginBottom: 18,
  },
  submitBtn: {
    width: '100%',
    padding: '13px 0',
    border: 'none',
    borderRadius: 8,
    background: '#0f3436',
    color: '#f6f2e9',
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  footer: { marginTop: 22, textAlign: 'center', fontSize: 13.5, color: '#6d7f7c' },
};