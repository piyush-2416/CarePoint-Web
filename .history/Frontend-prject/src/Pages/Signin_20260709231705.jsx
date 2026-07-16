import React, { useState } from 'react';

export default function Signin() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with your real API call
    setTimeout(() => {
      setLoading(false);
      console.log('Signing in with', form);
    }, 1500);
  };

  return (
    <div className="cp-wrap">
      <style>{css}</style>

      {/* floating blobs for the animated background */}
      <div className="cp-blob cp-blob--one" />
      <div className="cp-blob cp-blob--two" />
      <div className="cp-blob cp-blob--three" />

      <form className="cp-card" onSubmit={handleSubmit}>
        <div className="cp-logo">
          <div className="cp-logo__ring">
            <span>+</span>
          </div>
        </div>

        <h1 className="cp-title">Create your account</h1>
        <p className="cp-subtitle">Sign in to access your CarePoint dashboard</p>

        <div className={`cp-field ${focused === 'name' || form.name ? 'cp-field--active' : ''}`}>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused('')}
            autoComplete="name"
            required
          />
          <span className="cp-field__line" />
        </div>

        <div className={`cp-field ${focused === 'email' || form.email ? 'cp-field--active' : ''}`}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused('')}
            autoComplete="email"
            required
          />
          <span className="cp-field__line" />
        </div>

        <div className={`cp-field ${focused === 'password' || form.password ? 'cp-field--active' : ''}`}>
          <label htmlFor="password">Password</label>
          <div className="cp-password-row">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused('')}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="cp-eye"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <span className="cp-field__line" />
        </div>

        <button type="submit" className="cp-submit" disabled={loading}>
          <span className={loading ? 'cp-submit__text cp-submit__text--hidden' : 'cp-submit__text'}>
            Sign In
          </span>
          {loading && <span className="cp-spinner" />}
        </button>

        <p className="cp-footer">
          Already have an account? <a href="#login">Log in instead</a>
        </p>
      </form>
    </div>
  );
}

const css = `
* { box-sizing: border-box; }

.cp-wrap {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0f3436 0%, #16535a 50%, #1c6b6f 100%);
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 24px;
}

.cp-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.35;
  animation: float 12s ease-in-out infinite;
}
.cp-blob--one {
  width: 340px; height: 340px;
  background: #c89b3c;
  top: -80px; left: -80px;
  animation-delay: 0s;
}
.cp-blob--two {
  width: 260px; height: 260px;
  background: #4fd1c5;
  bottom: -60px; right: -40px;
  animation-delay: 3s;
}
.cp-blob--three {
  width: 200px; height: 200px;
  background: #f6f2e9;
  top: 40%; right: 15%;
  animation-delay: 6s;
  opacity: 0.15;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -40px) scale(1.1); }
}

.cp-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.cp-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}
.cp-logo__ring {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0f3436, #1c6b6f);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(15, 52, 54, 0.35);
  animation: pulse 2.4s ease-in-out infinite;
}
.cp-logo__ring span {
  color: #c89b3c;
  font-size: 28px;
  font-weight: 700;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 8px 20px rgba(15, 52, 54, 0.35); }
  50% { box-shadow: 0 8px 28px rgba(200, 155, 60, 0.45); }
}

.cp-title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #0f3436;
  margin: 0 0 6px;
}
.cp-subtitle {
  text-align: center;
  font-size: 13.5px;
  color: #7a8b88;
  margin: 0 0 28px;
}

.cp-field {
  position: relative;
  margin-bottom: 22px;
  animation: fieldIn 0.5s ease backwards;
}
.cp-field:nth-of-type(1) { animation-delay: 0.05s; }
.cp-field:nth-of-type(2) { animation-delay: 0.12s; }
.cp-field:nth-of-type(3) { animation-delay: 0.19s; }

@keyframes fieldIn {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

.cp-field label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #7a8b88;
  text-transform: uppercase;
  margin-bottom: 6px;
  transition: color 0.2s ease;
}
.cp-field--active label {
  color: #0f3436;
}

.cp-field input {
  width: 100%;
  padding: 10px 4px;
  border: none;
  border-bottom: 2px solid #e2e8e7;
  font-size: 15px;
  background: transparent;
  color: #1f2b2a;
  outline: none;
  transition: border-color 0.25s ease;
}

.cp-field__line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, #c89b3c, #0f3436);
  transition: width 0.3s ease;
}
.cp-field--active .cp-field__line {
  width: 100%;
}

.cp-password-row {
  display: flex;
  align-items: center;
}
.cp-password-row input {
  flex: 1;
}
.cp-eye {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 6px;
  line-height: 1;
}

.cp-submit {
  position: relative;
  width: 100%;
  padding: 13px 0;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #0f3436, #1c6b6f);
  color: #f6f2e9;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.25s ease;
  box-shadow: 0 6px 16px rgba(15, 52, 54, 0.3);
}
.cp-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(15, 52, 54, 0.4);
}
.cp-submit:active:not(:disabled) {
  transform: translateY(0);
}
.cp-submit:disabled {
  cursor: not-allowed;
  opacity: 0.85;
}

.cp-submit__text {
  transition: opacity 0.2s ease;
}
.cp-submit__text--hidden {
  opacity: 0;
}

.cp-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border: 2.5px solid rgba(246, 242, 233, 0.35);
  border-top-color: #f6f2e9;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.cp-footer {
  text-align: center;
  font-size: 13px;
  color: #7a8b88;
  margin: 22px 0 0;
}
.cp-footer a {
  color: #0f3436;
  font-weight: 600;
  text-decoration: none;
}
.cp-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 420px) {
  .cp-card { padding: 32px 24px; }
}
`;