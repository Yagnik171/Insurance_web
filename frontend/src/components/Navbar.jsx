import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, LogOut, PhoneCall, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px', color: 'white', lineHeight: 1.1 }}>
              Insure<span style={{ color: '#93c5fd' }}>Cell</span>
            </h1>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 600 }}>Every Family Insured</span>
          </div>
      </Link>
      
      <div className="nav-links">
        <Link to="/plans" className="nav-link">Insurance Products <ChevronDown size={14} color="var(--text-muted)"/></Link>
        {user?.role !== 'admin' && (
          <>
            <Link to="/renew" className="nav-link">Renew Policy</Link>
            <Link to="/dashboard" className="nav-link">File a Claim</Link>
          </>
        )}
        <Link to="/support" className="nav-link">Support Center</Link>
        
        <a href="tel:18002584477" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem' }}>
          <PhoneCall size={14}/> Talk to Expert
        </a>

        {!user ? (
          <Link to="/login" className="btn btn-primary" style={{ borderRadius: '20px', padding: '0.45rem 1.2rem', fontSize: '0.9rem' }}>Sign In</Link>
        ) : (
          <>
            {user.role === 'admin' ? (
              <Link to="/admin" className="nav-link" style={{ color: 'var(--accent-bright)', fontWeight: 'bold' }}>Admin CRM</Link>
            ) : (
              <Link to="/dashboard" className="nav-link" style={{ color: 'var(--accent-bright)', fontWeight: 'bold' }}>My Dashboard</Link>
            )}
            <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.85rem' }}>
              <LogOut size={14} /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
