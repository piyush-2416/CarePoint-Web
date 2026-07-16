import React, { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing in with', { email, password });
    // TODO: call your API here
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>CarePoint Sign In</h2>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={styles.input}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f2f4f7',
    fontFamily: 'sans-serif',
  },
  card: {
    background: '#fff',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '320px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#1f2b2a',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '6px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#0f3436',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    cursor: 'pointer',
  },
};