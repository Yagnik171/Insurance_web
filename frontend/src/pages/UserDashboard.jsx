import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Shield, FileWarning, UserCheck } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [activeTab, setActiveTab] = useState('policies');
  const [claimPolicyId, setClaimPolicyId] = useState('');
  const [claimDesc, setClaimDesc] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimMessage, setClaimMessage] = useState('');

  const fetchData = async () => {
    try { const [polRes, claimRes] = await Promise.all([api.get('/user/policies'), api.get('/user/claims')]); setPolicies(polRes.data); setClaims(claimRes.data); } catch (err) { console.error(err); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleFileClaim = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/claims', { policyId: claimPolicyId, description: claimDesc, claimAmount: Number(claimAmount) });
      setClaimMessage('✅ Claim filed successfully. Pending admin review.');
      setClaimPolicyId(''); setClaimDesc(''); setClaimAmount(''); fetchData();
    } catch (err) { setClaimMessage(err.response?.data?.message || 'Failed to file claim.'); }
  };

  const tabStyle = (tab) => ({ cursor: 'pointer', padding: '0.8rem 1.5rem', borderRadius: '10px 10px 0 0', background: activeTab === tab ? 'rgba(59,130,246,0.12)' : 'transparent', color: activeTab === tab ? 'white' : 'var(--text-muted)', borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent', fontWeight: activeTab === tab ? 600 : 400, transition: 'all 0.2s', border: 'none', fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif' });

  return (
    <div className="animate-fade-in">
      {/* Header Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem' }}>Welcome back, {user.name} 🙏</h1>
          <p>Manage your policies and claims from your personal dashboard.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '1rem 1.5rem', textAlign: 'center', minWidth: '100px' }}>
            <h2 style={{ margin: 0, color: 'var(--accent-bright)' }}>{policies.length}</h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Policies</p>
          </div>
          <div className="glass-panel" style={{ padding: '1rem 1.5rem', textAlign: 'center', minWidth: '100px' }}>
            <h2 style={{ margin: 0, color: claims.some(c => c.status === 'pending') ? '#fbbf24' : 'var(--success)' }}>{claims.length}</h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Claims</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <button style={tabStyle('policies')} onClick={() => setActiveTab('policies')}>My Policies</button>
        <button style={tabStyle('claims')} onClick={() => setActiveTab('claims')}>My Claims</button>
        <button style={tabStyle('newClaim')} onClick={() => setActiveTab('newClaim')}>File a Claim</button>
      </div>

      {activeTab === 'policies' && (
        <div className="grid-cards">
          {policies.map(p => (
            <div key={p._id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}><Shield size={24} color="var(--accent)" /><span className={`badge ${p.status}`}>{p.status}</span></div>
              <h3 style={{ marginBottom: '0.5rem' }}>{p.plan?.title || 'Unknown Plan'}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>Policy #: {p.policyNumber}</p>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <div>Start: {new Date(p.startDate).toLocaleDateString('en-IN')}</div>
                <div>Expires: {new Date(p.endDate).toLocaleDateString('en-IN')}</div>
              </div>
              {p.handler && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(59,130,246,0.06)', padding: '0.7rem', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.15)', fontSize: '0.85rem' }}>
                  <UserCheck size={16} color="var(--accent)" />
                  <div><strong>{p.handler.name}</strong><br/><span style={{ color: 'var(--text-muted)' }}>{p.handler.email}</span></div>
                </div>
              )}
            </div>
          ))}
          {policies.length === 0 && <p className="glass-panel" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>No active policies yet. <a href="/plans" style={{ color: 'var(--accent-bright)' }}>Browse plans</a> to get started!</p>}
        </div>
      )}

      {activeTab === 'claims' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {claims.map(c => (
            <div key={c._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{c.policy?.plan?.title || 'Policy'} Claim</h4>
                <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{c.description}</p>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Amount: <span style={{ color: 'var(--accent-bright)', fontWeight: 'bold' }}>₹{c.claimAmount.toLocaleString('en-IN')}</span></span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${c.status}`}>{c.status}</span>
                {c.adminRemarks && <p style={{ fontSize: '0.78rem', marginTop: '0.5rem', fontStyle: 'italic', maxWidth: '200px', color: 'var(--text-muted)' }}>Note: {c.adminRemarks}</p>}
                <p style={{ fontSize: '0.78rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Filed: {new Date(c.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          ))}
          {claims.length === 0 && <p className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>No claims filed yet. File your first claim from the tab above.</p>}
        </div>
      )}

      {activeTab === 'newClaim' && (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}><FileWarning color="var(--accent)" /> Submit a New Claim</h2>
          {claimMessage && <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '10px', background: 'rgba(59,130,246,0.15)', color: 'var(--accent-bright)', border: '1px solid rgba(59,130,246,0.25)' }}>{claimMessage}</div>}
          <form onSubmit={handleFileClaim} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label className="input-label">Select Active Policy</label>
              <select required className="input-field" value={claimPolicyId} onChange={(e) => setClaimPolicyId(e.target.value)}>
                <option value="">-- Choose a policy --</option>
                {policies.filter(p => p.status === 'active').map(p => (<option key={p._id} value={p._id}>{p.plan?.title} ({p.policyNumber})</option>))}
              </select>
            </div>
            <div><label className="input-label">Claim Amount (₹)</label><input type="number" required min="1" className="input-field" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} placeholder="e.g. 50000" /></div>
            <div><label className="input-label">Incident Description</label><textarea required rows="4" className="input-field" value={claimDesc} onChange={(e) => setClaimDesc(e.target.value)} placeholder="Describe the reason for your claim in detail..."></textarea></div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Submit Claim Request</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default UserDashboard;
