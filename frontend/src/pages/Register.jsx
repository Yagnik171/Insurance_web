import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, ShieldCheck, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    const res = await register(name, email, password, role);
    if (!res?.success) setError(res?.message || 'Registration failed');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <UserPlus size={40} color="var(--accent)" style={{ marginBottom: '1rem' }} />
          <h2>Create Account</h2>
          <p style={{ color: 'var(--text-muted)' }}>Join InsureCell today</p>
        </div>

        {/* Role Selector */}
        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem' }}>
          <button type="button" onClick={() => setRole('user')} className="btn" style={{ flex: 1, padding: '1rem', borderRadius: '14px', background: role === 'user' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'rgba(255,255,255,0.04)', color: role === 'user' ? 'white' : 'var(--text-muted)', border: `1px solid ${role === 'user' ? '#3b82f6' : 'rgba(255,255,255,0.08)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <UserIcon size={24} />
            <span style={{ fontWeight: 600 }}>Customer</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Buy policies & file claims</span>
          </button>
          <button type="button" onClick={() => setRole('admin')} className="btn" style={{ flex: 1, padding: '1rem', borderRadius: '14px', background: role === 'admin' ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'rgba(255,255,255,0.04)', color: role === 'admin' ? 'white' : 'var(--text-muted)', border: `1px solid ${role === 'admin' ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={24} />
            <span style={{ fontWeight: 600 }}>Administrator</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Handle policies & claims</span>
          </button>
        </div>
        
        {error && <div style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '0.75rem', borderRadius: '10px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239,68,68,0.25)' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label className="input-label">Full Name</label><input type="text" required className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Sharma" /></div>
          <div><label className="input-label">Email Address</label><input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" /></div>
          <div><label className="input-label">Password</label><input type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" /></div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.9rem', fontSize: '1rem', background: role === 'admin' ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : '' }}>
            Register as {role === 'admin' ? 'Administrator' : 'Customer'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-bright)', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
