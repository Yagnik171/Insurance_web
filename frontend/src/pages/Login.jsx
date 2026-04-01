import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Info, User as UserIcon, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeLayout, setActiveLayout] = useState('user');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password, activeLayout);
    if (!res?.success) setError(res?.message || 'Login failed');
  };

  return (
    <div className="animate-fade-in stagger-1" style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
      <div className="glass-panel" style={{ padding: '0', width: '100%', maxWidth: '900px', display: 'flex', overflow: 'hidden' }}>
        
        <div style={{ flex: 1, background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '0.5rem', color: 'white', lineHeight: 1.1 }}>Welcome to<br/>InsureCell</h2>
          <p style={{ color: '#93c5fd', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1rem' }}>
            India's most trusted insurance management platform. Customer portal for policy tracking, and Executive portal for verified advisors.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '0.8rem', fontSize: '0.95rem' }}><Info size={18}/> Don't have an account?</h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', marginBottom: '1rem' }}>Join thousands of protected families today or register as an authorized insurance handler.</p>
            <Link to="/register" className="btn" style={{ width: '100%', background: 'white', color: '#1e3a8a', padding: '0.8rem', fontSize: '0.9rem' }}>
              Create Account
            </Link>
          </div>
        </div>

        <div style={{ flex: 1, padding: '3rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
            <h3 style={{ cursor: 'pointer', paddingBottom: '0.5rem', borderBottom: activeLayout === 'user' ? '2px solid var(--accent)' : 'none', color: activeLayout === 'user' ? 'white' : 'var(--text-muted)', marginBottom: '-0.6rem', fontSize: '1rem' }} onClick={() => setActiveLayout('user')}>Customer Login</h3>
            <h3 style={{ cursor: 'pointer', paddingBottom: '0.5rem', borderBottom: activeLayout === 'admin' ? '2px solid var(--accent)' : 'none', color: activeLayout === 'admin' ? 'white' : 'var(--text-muted)', marginBottom: '-0.6rem', fontSize: '1rem' }} onClick={() => setActiveLayout('admin')}>Admin Portal</h3>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <LogIn size={40} color={activeLayout === 'admin' ? "var(--danger)" : "var(--accent)"} style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.6rem' }}>{activeLayout === 'admin' ? 'Executive Portal' : 'Member Access'}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Securely access your account.</p>
          </div>
          
          {error && <div style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '0.75rem', borderRadius: '10px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239,68,68,0.25)' }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label className="input-label">Email Address</label>
              <input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
            <div>
              <label className="input-label">Password</label>
              <input type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem', padding: '0.9rem', fontSize: '1.05rem', background: activeLayout === 'admin' ? 'linear-gradient(135deg, #1e293b, #0f172a)' : '' }}>
              {activeLayout === 'admin' ? 'Authorize Admin Session' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
