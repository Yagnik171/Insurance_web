import React, { useState } from 'react';
import api from '../api/axios';
import { Shield, Clock, Search, ExternalLink, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const RenewPolicy = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quote, setQuote] = useState(null);
  const [policyNumber, setPolicyNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFetchQuote = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setQuote(null); setSuccess('');
    try {
      const res = await api.post('/user/renew/verify', { policyNumber, email });
      setQuote(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error locating policy details.');
    } finally { setLoading(false); }
  };

  const handleRequestRenewal = async () => {
    setSubmitting(true); setError('');
    try {
      await api.post('/user/renew/submit', { policyId: quote.policyId });
      setSuccess('🎉 Renewal request successfully dispatched to your assigned advisor for approval!');
      setQuote(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing request.');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="animate-fade-in stagger-1" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Instant Policy Renewal</h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Keep your protection unbroken. Enter your existing policy details below to instantly extend your coverage.</p>
      </div>

      <div className="glass-panel stagger-2" style={{ padding: '3rem 2rem', textAlign: 'left', marginBottom: '3rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}><Search size={22} color="var(--accent)" /> Find Your Policy</h3>
        
        {error && <div className="animate-fade-in" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}><ShieldAlert size={18}/> {error}</div>}
        {success && <div className="animate-fade-in" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={18}/> {success}</div>}

        {!quote ? (
          <form onSubmit={handleFetchQuote} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
             <div><label className="input-label">Policy Number</label><input type="text" required value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} className="input-field" placeholder="e.g. IND-12345678" /></div>
             <div><label className="input-label">Registered Account Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="name@domain.com" /></div>
             <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
               <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', opacity: loading ? 0.7 : 1 }}>
                 {loading ? <span style={{ display: 'flex', alignItems: 'center', justifySelf: 'center', gap: '8px' }}><RefreshCw className="loader" style={{ width: '20px', height: '20px', margin: 0, borderWidth: '2px', borderTopColor: 'white' }}/> Authenticating Framework...</span> : 'Verify Eligibility & Quote'}
               </button>
             </div>
          </form>
        ) : (
          <div className="animate-fade-in" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
            <CheckCircle2 size={40} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: 'var(--success)', marginBottom: '0.4rem' }}>Verified Active Policy: {quote.policyNumber}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your {quote.planTitle} term is eligible for an instant direct renewal request.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
              <div><p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Registered Premium</p><p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.2rem 0 0' }}>₹{quote.premium.toLocaleString('en-IN')} / mo</p></div>
              <div><p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Current Expiry Boundary</p><p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0 0', color: 'var(--text-main)' }}>{new Date(quote.endDate).toLocaleDateString('en-IN')}</p></div>
            </div>
            <button className="btn btn-primary" onClick={handleRequestRenewal} disabled={submitting} style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', background: 'var(--success)' }}>
               {submitting ? 'Dispatching...' : 'Submit Extension Request →'}
            </button>
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '0.8rem', border: 'none' }} onClick={() => { setQuote(null); setPolicyNumber(''); setEmail(''); }}>Cancel Verification</button>
          </div>
        )}
      </div>

      <div className="stagger-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
           <Clock size={28} color="var(--success)" style={{ marginBottom: '1rem' }} />
           <h4 style={{ marginBottom: '0.5rem' }}>Zero Wait Time</h4>
           <p style={{ fontSize: '0.9rem' }}>Renewals process instantly without underwriting review if done before expiry.</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
           <Shield size={28} color="var(--accent)" style={{ marginBottom: '1rem' }} />
           <h4 style={{ marginBottom: '0.5rem' }}>Retain NCB</h4>
           <p style={{ fontSize: '0.9rem' }}>Protect your No Claim Bonus discounts with seamless renewal.</p>
        </div>
      </div>
      <div style={{ marginTop: '3rem', padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
         <p style={{ color: 'var(--text-muted)' }}>Questions about renewal? <Link to="/support" style={{ color: 'var(--accent-bright)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>Visit Support Center <ExternalLink size={14}/></Link></p>
      </div>
    </div>
  );
};
export default RenewPolicy;
