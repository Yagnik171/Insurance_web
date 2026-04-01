import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, PlusCircle, Users, AlertTriangle, FileText, ChevronDown, CheckSquare } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('crm');
  const [plans, setPlans] = useState([]);
  const [claims, setClaims] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [newPlan, setNewPlan] = useState({ title: '', category: 'health', description: '', premiumAmount: '', coverageAmount: '', durationYears: '' });
  const [claimRemarks, setClaimRemarks] = useState({});

  const fetchData = async () => {
    try {
      const [plansRes, claimsRes, usersRes, policiesRes] = await Promise.all([api.get('/plans'), api.get('/admin/claims'), api.get('/admin/users'), api.get('/admin/policies')]);
      setPlans(plansRes.data); setClaims(claimsRes.data); setCustomers(usersRes.data); setPolicies(policiesRes.data);
    } catch (err) { console.error('Error fetching admin data', err); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try { await api.post('/admin/plans', newPlan); setNewPlan({ title: '', category: 'health', description: '', premiumAmount: '', coverageAmount: '', durationYears: '' }); fetchData(); alert('Plan created successfully.'); }
    catch (err) { alert(err.response?.data?.message || 'Error creating plan'); }
  };
  const handleDeletePlan = async (id) => { if (!window.confirm('Delete this plan?')) return; try { await api.delete(`/admin/plans/${id}`); fetchData(); } catch (err) {} };
  const handleReviewClaim = async (claimId, status) => {
    try { await api.put(`/admin/claims/${claimId}`, { status, adminRemarks: claimRemarks[claimId] }); fetchData(); }
    catch (err) { alert('Failed to update claim'); }
  };
  const handleReviewRenewal = async (policyId, status) => {
    try { await api.put(`/admin/policies/${policyId}/renew`, { status }); fetchData(); }
    catch (err) { alert('Failed to update renewal'); }
  };

  return (
    <div className="animate-fade-in stagger-1">
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', letterSpacing: '-1px' }}>Administrator CRM</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your assigned client portfolio and global plans.</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>CRM Capacity</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
             <h2 style={{ margin: 0 }}>{customers.length}</h2>
             <span style={{ color: 'var(--text-muted)' }}>/ 20 Max Users</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <button className={activeTab === 'crm' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setActiveTab('crm')}><Users size={18}/> Users Directory (CRM)</button>
        <button className={activeTab === 'claims' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setActiveTab('claims')}><AlertTriangle size={18}/> Claim Review ({claims.filter(c=>c.status==='pending').length})</button>
        <button className={activeTab === 'renewals' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setActiveTab('renewals')}><CheckSquare size={18}/> Renewals ({policies.filter(p=>p.renewalStatus==='pending').length})</button>
        <button className={activeTab === 'plans' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setActiveTab('plans')}><ShieldCheck size={18}/> Manage Plans</button>
      </div>

      {activeTab === 'crm' && (
        <div className="animate-fade-in stagger-2">
          {customers.length === 0 ? (
            <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>No users are currently assigned to you.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {customers.map(customer => {
                const isExpanded = expandedUser === customer._id;
                const customerPolicies = policies.filter(p => p.user?._id === customer._id);
                const customerClaims = claims.filter(c => c.user?._id === customer._id);
                return (
                  <div key={customer._id} className="glass-panel" style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: isExpanded ? 'rgba(59,130,246,0.1)' : 'transparent', transition: '0.2s' }} onClick={() => setExpandedUser(isExpanded ? null : customer._id)}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                         <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent) 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>{customer.name.charAt(0)}</div>
                         <div>
                           <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{customer.name}</h3>
                           <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{customer.email} • Client since {new Date(customer.createdAt).toLocaleDateString('en-IN')}</p>
                         </div>
                       </div>
                       <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                         <div style={{ textAlign: 'center' }}><strong style={{ display: 'block', fontSize: '1.2rem' }}>{customerPolicies.length}</strong><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Policies</span></div>
                         <div style={{ textAlign: 'center' }}><strong style={{ display: 'block', fontSize: '1.2rem', color: customerClaims.length > 0 ? 'var(--danger)' : 'var(--text-main)' }}>{customerClaims.length}</strong><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Claims</span></div>
                         <ChevronDown style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }} color="var(--text-main)" />
                       </div>
                    </div>
                    {isExpanded && (
                      <div className="animate-fade-in" style={{ padding: '2rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: 'rgba(0,0,0,0.2)' }}>
                        <div>
                          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}><FileText size={18} color="var(--accent)"/> Active Policies</h4>
                          {customerPolicies.length === 0 ? <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No policies linked.</p> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                              {customerPolicies.map(p => (
                                <div key={p._id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{p.plan?.title || 'Policy'}</strong>
                                    <div>
                                      {p.renewalStatus === 'pending' && <span className="badge pending" style={{ marginRight: '5px' }}>Renewal Pending</span>}
                                      <span className={`badge ${p.status}`}>{p.status}</span>
                                    </div>
                                  </div>
                                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '600', marginTop: '0.6rem' }}>Policy Tracker ID: <span style={{ color: 'var(--accent)' }}>{p.policyNumber}</span></p>
                                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Expires: {new Date(p.endDate).toLocaleDateString('en-IN')}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}><AlertTriangle size={18} color="var(--danger)"/> Claim History</h4>
                          {customerClaims.length === 0 ? <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Clean record. No claims filed.</p> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                              {customerClaims.map(c => (
                                <div key={c._id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px', background: c.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.03)' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>₹{c.claimAmount.toLocaleString('en-IN')}</strong><span className={`badge ${c.status}`}>{c.status}</span></div>
                                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontStyle: 'italic' }}>"{c.description}"</p>
                                  {c.status === 'pending' && (<button className="btn" style={{ background: 'var(--accent)', color: 'white', marginTop: '1rem', width: '100%', fontSize: '0.85rem', padding: '0.5rem' }} onClick={() => setActiveTab('claims')}>Review Claim →</button>)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="animate-fade-in stagger-2">
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}><PlusCircle color="var(--accent)" /> Create New Plan</h2>
            <form onSubmit={handleCreatePlan} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div><label className="input-label">Plan Title</label><input required className="input-field" value={newPlan.title} onChange={e => setNewPlan({...newPlan, title: e.target.value})} placeholder="e.g. Gold Health Cover" /></div>
              <div><label className="input-label">Category</label><select className="input-field" value={newPlan.category} onChange={e => setNewPlan({...newPlan, category: e.target.value})}><option value="health">Health</option><option value="car">Car</option><option value="bike">Bike</option><option value="life">Life</option><option value="travel">Travel</option><option value="other">Other</option></select></div>
              <div style={{ gridColumn: '1 / -1' }}><label className="input-label">Description</label><textarea required className="input-field" rows="2" value={newPlan.description} onChange={e => setNewPlan({...newPlan, description: e.target.value})} placeholder="Plan benefits..."></textarea></div>
              <div><label className="input-label">Premium (₹/month)</label><input required type="number" className="input-field" value={newPlan.premiumAmount} onChange={e => setNewPlan({...newPlan, premiumAmount: e.target.value})} placeholder="500" /></div>
              <div><label className="input-label">Max Coverage (₹)</label><input required type="number" className="input-field" value={newPlan.coverageAmount} onChange={e => setNewPlan({...newPlan, coverageAmount: e.target.value})} placeholder="500000" /></div>
              <div><label className="input-label">Duration (Years)</label><input required type="number" className="input-field" value={newPlan.durationYears} onChange={e => setNewPlan({...newPlan, durationYears: e.target.value})} placeholder="1" /></div>
              <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}><button type="submit" className="btn btn-primary">Publish Plan</button></div>
            </form>
          </div>
          <h3 style={{ marginBottom: '1.5rem' }}>All Plans</h3>
          <div className="grid-cards">
            {plans.map(p => (
              <div key={p._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h4>{p.title} <span className="badge category" style={{ float: 'right' }}>{p.category}</span></h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.8rem 0', flex: 1 }}>{p.description}</p>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Premium:</strong> ₹{p.premiumAmount}/mo</p>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Coverage:</strong> ₹{p.coverageAmount.toLocaleString('en-IN')}</p>
                </div>
                <button className="btn" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', width: '100%', border: '1px solid rgba(239,68,68,0.3)' }} onClick={() => handleDeletePlan(p._id)}>Delete Plan</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'claims' && (
        <div className="animate-fade-in stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {claims.map(c => (
             <div key={c._id} className="glass-panel" style={{ padding: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                 <div style={{ flex: '1 1 300px' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>Action Required: {c.policy?.plan?.title || 'Unknown'}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Policy Tracker: <span style={{color: 'var(--text-main)', fontWeight: 500}}>{c.policy?.policyNumber}</span></p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                       <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent) 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>{c.user?.name?.charAt(0)}</div>
                       <div><div style={{ fontWeight: '600' }}>{c.user?.name}</div><div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Assigned Portfolio Member</div></div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontStyle: 'italic' }}>"{c.description}"</p>
                    </div>
                    <p style={{ color: 'var(--danger)', fontWeight: 'bold', fontSize: '1.4rem', marginTop: '1.5rem' }}>Claim Amount: ₹{c.claimAmount.toLocaleString('en-IN')}</p>
                 </div>
                 <div style={{ textAlign: 'right', minWidth: '150px' }}>
                   <span className={`badge ${c.status}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>{c.status}</span>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Filed: {new Date(c.createdAt).toLocaleDateString('en-IN')}</p>
                 </div>
               </div>
               {c.status === 'pending' && (
                 <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                   <label className="input-label">Decision Justification</label>
                   <input className="input-field" placeholder="Provide context for the customer regarding your decision..." value={claimRemarks[c._id] || ''} onChange={(e) => setClaimRemarks({...claimRemarks, [c._id]: e.target.value})} style={{ marginBottom: '1rem' }} />
                   <div style={{ display: 'flex', gap: '1rem' }}>
                     <button className="btn btn-primary" style={{ background: 'var(--success)', flex: 1, border: 'none' }} onClick={() => handleReviewClaim(c._id, 'approved')}>✅ Approve Claim</button>
                     <button className="btn btn-primary" style={{ background: 'var(--danger)', flex: 1, border: 'none' }} onClick={() => handleReviewClaim(c._id, 'rejected')}>❌ Reject Claim</button>
                   </div>
                 </div>
               )}
             </div>
          ))}
          {claims.length === 0 && <p className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>🎉 No pending claims. Your inbox is clear!</p>}
        </div>
      )}
      {activeTab === 'renewals' && (
        <div className="animate-fade-in stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {policies.filter(p => p.renewalStatus !== 'none').map(p => (
             <div key={p._id} className="glass-panel" style={{ padding: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                 <div style={{ flex: '1 1 300px' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>Renewal Request: {p.plan?.title || 'Unknown'}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Policy Tracker: <span style={{color: 'var(--text-main)', fontWeight: 500}}>{p.policyNumber}</span></p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                       <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent) 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>{p.user?.name?.charAt(0)}</div>
                       <div><div style={{ fontWeight: '600' }}>{p.user?.name}</div><div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Assigned Portfolio Member</div></div>
                    </div>
                    <p style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '1.5rem' }}>Original Expiration: {new Date(p.endDate).toLocaleDateString('en-IN')}</p>
                 </div>
                 <div style={{ textAlign: 'right', minWidth: '150px' }}>
                   <span className={`badge ${p.renewalStatus}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>{p.renewalStatus.toUpperCase()} RENEWAL</span>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Term: {p.plan?.durationYears} Years</p>
                 </div>
               </div>
               {p.renewalStatus === 'pending' && (
                 <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                   <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Approving this request will securely calculate the new temporal boundaries and instantly extend the customer's policy coverage by <strong>{p.plan?.durationYears}</strong> year(s).</p>
                   <div style={{ display: 'flex', gap: '1rem' }}>
                     <button className="btn btn-primary" style={{ background: 'var(--success)', flex: 1, border: 'none' }} onClick={() => handleReviewRenewal(p._id, 'approved')}>✅ Approve Renewal</button>
                     <button className="btn btn-primary" style={{ background: 'var(--danger)', flex: 1, border: 'none' }} onClick={() => handleReviewRenewal(p._id, 'rejected')}>❌ Reject Request</button>
                   </div>
                 </div>
               )}
             </div>
          ))}
          {policies.filter(p => p.renewalStatus !== 'none').length === 0 && <p className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>🎉 No pending renewals. Your inbox is clear!</p>}
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
