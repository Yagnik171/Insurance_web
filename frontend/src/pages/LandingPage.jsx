import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Shield, HeartPulse, CarFront, Users, Plane, PiggyBank, Briefcase, GraduationCap, Bike, TrendingUp, CheckCircle, Phone, Award, Zap, LayoutDashboard, FileText, Lock } from 'lucide-react';

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  const categories = [
    { icon: <Shield size={36} color="#7c3aed" />, title: 'Term Life Insurance', badge: 'Upto 15% Discount', path: '/plans?category=life' },
    { icon: <HeartPulse size={36} color="#ef4444" />, title: 'Health Insurance', badge: 'Upto 25% Discount', path: '/plans?category=health' },
    { icon: <TrendingUp size={36} color="#f59e0b" />, title: 'Investment Plans', badge: 'In-Built Life Cover', path: '/plans?category=other' },
    { icon: <CarFront size={36} color="#64748b" />, title: 'Car Insurance', badge: 'Lowest Price', path: '/plans?category=car' },
    { icon: <Bike size={36} color="#10b981" />, title: '2 Wheeler Insurance', badge: 'Upto 85% Discount', path: '/plans?category=bike' },
    { icon: <Users size={36} color="#f43f5e" />, title: 'Family Health', badge: '25% Discount', path: '/plans?category=health' },
    { icon: <Plane size={36} color="#06b6d4" />, title: 'Travel Insurance', path: '/plans?category=travel' },
    { icon: <Shield size={36} color="#ec4899" />, title: "Women's Term Plan", badge: '20% Cheaper', path: '/plans?category=life' },
    { icon: <PiggyBank size={36} color="#14b8a6" />, title: 'Guaranteed Returns', path: '/plans?category=other' },
    { icon: <GraduationCap size={36} color="#8b5cf6" />, title: 'Child Savings', badge: 'Premium Waiver', path: '/plans?category=other' },
    { icon: <Briefcase size={36} color="#f97316" />, title: 'Retirement Plans', path: '/plans?category=other' },
    { icon: <Users size={36} color="#1e40af" />, title: 'Group Health', badge: 'Upto 65% Off', path: '/plans?category=health' },
  ];

  if (user?.role === 'admin') {
    return (
      <div className="animate-fade-in stagger-1" style={{ padding: '4rem 0', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Shield size={65} color="var(--accent)" style={{ margin: '0 auto 1.5rem auto', filter: 'drop-shadow(0 0 15px rgba(59,130,246,0.3))' }} />
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-1px' }}>Executive Portal</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Welcome back, <strong style={{ color: 'var(--text-main)' }}>{user.name}</strong>. The network is secure.</p>
        </div>

        {/* Executive Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          {[['Network Status', 'Optimal', 'var(--success)'], ['Active Policies', 'Monitoring', 'var(--text-main)'], ['Pending Approvals', 'Action Req.', 'var(--warning)'], ['System Logs', 'Encrypted', 'var(--accent)']].map(([title, val, color], i) => (
             <div key={i} className="glass-panel stagger-2" style={{ padding: '1.5rem', borderLeft: `3px solid ${color}`, background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
               <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</p>
               <h3 style={{ color: color, margin: 0 }}>{val}</h3>
             </div>
          ))}
        </div>

        {/* Modules Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
           <div className="glass-panel stagger-3" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column' }}>
             <div style={{ background: 'rgba(59,130,246,0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}><Lock size={26} color="#3b82f6" /></div>
             <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Core CRM Hub</h3>
             <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>Audit active claims, adjudicate policy renewals, and manage global plan architecture securely.</p>
             <Link to="/admin" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>Launch Command</Link>
           </div>
           
           <div className="glass-panel stagger-4" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column' }}>
             <div style={{ background: 'rgba(16,185,129,0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}><Users size={26} color="#10b981" /></div>
             <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Public Catalog</h3>
             <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>Review the active insurance products and pricing metrics currently deployed on the market layer.</p>
             <Link to="/plans" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>Inspect Market</Link>
           </div>
           
           <div className="glass-panel stagger-5" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', border: '1px dashed rgba(255,255,255,0.1)' }}>
             <div style={{ background: 'rgba(139,92,246,0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}><FileText size={26} color="#8b5cf6" /></div>
             <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Compliance Logs</h3>
             <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>Access the immutable system logs and regulatory compliance checks. (Locked)</p>
             <button disabled className="btn btn-secondary" style={{ width: '100%', textAlign: 'center', opacity: 0.5 }}>System Locked</button>
           </div>
        </div>
      </div>
    );
  }


  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero */}
      <div className="animate-fade-in stagger-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '3rem 0 1rem' }}>
        <div style={{ flex: 1, paddingRight: '2rem' }}>
          <p style={{ color: 'var(--accent-bright)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Every Family Insured</p>
          <h1 style={{ marginBottom: '1.2rem', fontSize: '3.5rem', letterSpacing: '-1px', lineHeight: 1.1 }}>Let's find you<br/>the <strong style={{color: 'white'}}>Best Insurance</strong></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>Compare plans from 51+ insurers at the lowest prices. Buy online instantly. Choose your own personal advisor.</p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <Link to="/plans" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>Explore Plans →</Link>
            <Link to="/register" className="btn btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>Get Started Free</Link>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ background: 'rgba(59,130,246,0.12)', padding: '8px', borderRadius: '50%' }}><Shield size={18} color="#60a5fa"/></div>
              <p style={{ color: '#93c5fd', margin: 0, fontSize: '0.85rem', fontWeight: 500 }}>51+ Insurers</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ background: 'rgba(16,185,129,0.12)', padding: '8px', borderRadius: '50%' }}><CheckCircle size={18} color="#34d399"/></div>
              <p style={{ color: '#6ee7b7', margin: 0, fontSize: '0.85rem', fontWeight: 500 }}>Instant Policy</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ background: 'rgba(245,158,11,0.12)', padding: '8px', borderRadius: '50%' }}><Zap size={18} color="#fbbf24"/></div>
              <p style={{ color: '#fcd34d', margin: 0, fontSize: '0.85rem', fontWeight: 500 }}>Quick Claims</p>
            </div>
          </div>
        </div>
        <div style={{ flex: 1.4, textAlign: 'right' }} className="animate-fade-in stagger-2">
          <img className="hero-banner-img" src="/banner.png" alt="Insurance Banner" />
        </div>
      </div>

      {/* Category Grid */}
      <div style={{ marginTop: '3rem' }}>
        <h2 className="animate-fade-in stagger-2" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem' }}>Insurance Products</h2>
        <p className="animate-fade-in stagger-2" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Explore our wide range of insurance products designed for every need</p>
        <div className="grid-icons animate-fade-in stagger-3">
          {categories.map((item, i) => (
            <Link to={item.path} key={i} className="icon-card">
              {item.badge && <div className="badge-top">{item.badge}</div>}
              <div className="icon-placeholder">{item.icon}</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={{ marginTop: '5rem' }}>
        <h2 className="animate-fade-in" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem' }}>Why Choose InsureCell?</h2>
        <p className="animate-fade-in" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>India's most trusted insurance comparison platform</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
            <Award size={36} color="#f59e0b" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Lowest Price Guarantee</h3>
            <p style={{ fontSize: '0.9rem' }}>We guarantee the lowest premiums. If you find a better price elsewhere, we'll match it — no questions asked.</p>
          </div>
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
            <Users size={36} color="#3b82f6" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Personal Advisor</h3>
            <p style={{ fontSize: '0.9rem' }}>Choose your own dedicated advisor when purchasing a policy. They'll handle your claims and renewals personally.</p>
          </div>
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
            <Zap size={36} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Instant Claims Processing</h3>
            <p style={{ fontSize: '0.9rem' }}>File claims directly from your dashboard. Your assigned advisor reviews and processes claims within 2-4 business days.</p>
          </div>
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
            <Phone size={36} color="#8b5cf6" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>24×7 Support</h3>
            <p style={{ fontSize: '0.9rem' }}>Round-the-clock toll-free helpline and live chat support. We're always here when you need us.</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {[['5 Cr+', 'Customers Served'], ['51+', 'Insurance Partners'], ['₹50,000 Cr+', 'Claims Settled'], ['4.8 ★', 'Customer Rating']].map(([val, label], i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--accent-bright)' }}>{val}</h2>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="glass-panel" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(59,130,246,0.2)' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Ready to Secure Your Future?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>Create your account in 30 seconds. Compare, buy, and manage all your insurance from one dashboard.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem' }}>Create Free Account</Link>
          <Link to="/plans" className="btn btn-secondary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem' }}>Browse Plans</Link>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
