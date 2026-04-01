import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { ShieldAlert, CheckCircle, UserCheck } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const categoryLabels = { life: 'Life Insurance', health: 'Health Insurance', car: 'Car Insurance', bike: 'Two Wheeler Insurance', travel: 'Travel Insurance', other: 'Investment & Savings Plans' };

const BrowsePlans = () => {
  const [plans, setPlans] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseStatus, setPurchaseStatus] = useState('');
  const [selectedHandlers, setSelectedHandlers] = useState({});
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const filterCategory = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansRes, adminsRes] = await Promise.all([api.get('/plans'), api.get('/auth/admins')]);
        setPlans(plansRes.data);
        setAdmins(adminsRes.data);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleBuy = async (planId, durationYears) => {
    if (!user) { setPurchaseStatus('Please login first to purchase a plan.'); return; }
    if (user.role === 'admin') { setPurchaseStatus('Admins cannot purchase plans. Login as a customer.'); return; }
    const handlerId = selectedHandlers[planId];
    if (!handlerId) { setPurchaseStatus('Please select an advisor (handler) for this policy.'); return; }
    try {
      await api.post('/user/policies', { planId, durationYears, handlerId });
      setPurchaseStatus('🎉 Policy purchased successfully! Check your dashboard.');
      setTimeout(() => setPurchaseStatus(''), 5000);
    } catch (err) { setPurchaseStatus(err.response?.data?.message || 'Error purchasing plan'); }
  };

  const filteredPlans = filterCategory ? plans.filter(p => p.category === filterCategory) : plans;

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}><div className="loader"></div><p style={{color: 'var(--text-muted)'}}>Finding the best deals for you...</p></div>;

  return (
    <div className="animate-fade-in stagger-1">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '0.8rem', fontSize: '2.5rem' }}>{filterCategory ? categoryLabels[filterCategory] || 'Plans' : 'All Insurance Plans'}</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>Choose the right plan for your needs. Compare instantly and buy online.</p>
        {purchaseStatus && (
          <div className="animate-fade-in" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', background: purchaseStatus.includes('successfully') ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: purchaseStatus.includes('successfully') ? '#34d399' : '#f87171', padding: '0.9rem 2rem', borderRadius: '14px', border: '1px solid', borderColor: purchaseStatus.includes('successfully') ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)' }}>
            {purchaseStatus.includes('successfully') ? <CheckCircle size={20}/> : <ShieldAlert size={20}/>} {purchaseStatus}
          </div>
        )}
      </div>

      {filterCategory && <div style={{ marginBottom: '2rem' }}><Link to="/plans" className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>← View All Categories</Link></div>}

      {admins.length === 0 && user?.role === 'user' && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'center', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <p style={{ color: '#fbbf24', margin: 0, fontWeight: 600 }}>⚠️ No administrators registered yet. An admin must register first before you can purchase a policy.</p>
        </div>
      )}

      <div className="grid-cards stagger-2">
        {filteredPlans.length === 0 && <p className="glass-panel" style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem', color: 'var(--text-muted)' }}>No plans available in this category yet.</p>}
        {filteredPlans.map((plan) => (
          <div key={plan._id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span className="badge category">{plan.category}</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-bright)', letterSpacing: '-0.5px' }}>₹{plan.premiumAmount}<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></span>
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.6rem' }}>{plan.title}</h3>
            <p style={{ flex: 1, marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.88rem' }}>{plan.description}</p>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Coverage</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.88rem' }}>₹{plan.coverageAmount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Duration</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.88rem' }}>{plan.durationYears} {plan.durationYears === 1 ? 'Year' : 'Years'}</span>
              </div>
            </div>

            {/* Action Area */}
            {user?.role === 'admin' ? (
              <div style={{ padding: '0.85rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.1)', cursor: 'not-allowed' }}>
                Executive Review Only
              </div>
            ) : (
              <>
                {user?.role === 'user' && admins.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '5px' }}><UserCheck size={14}/> Choose Your Advisor</label>
                    <select className="input-field" style={{ padding: '0.6rem', fontSize: '0.88rem' }} value={selectedHandlers[plan._id] || ''} onChange={(e) => setSelectedHandlers({...selectedHandlers, [plan._id]: e.target.value})}>
                      <option value="">-- Select an advisor --</option>
                      {admins.map(a => <option key={a._id} value={a._id}>{a.name} ({a.email})</option>)}
                    </select>
                  </div>
                )}
                <button className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem' }} onClick={() => handleBuy(plan._id, plan.durationYears)}>
                  Buy Now 🛡️
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default BrowsePlans;
