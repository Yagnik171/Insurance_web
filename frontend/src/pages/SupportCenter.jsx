import React, { useState } from 'react';
import { LifeBuoy, Mail, Phone, MessageSquare, ChevronDown } from 'lucide-react';

const SupportCenter = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "How do I file a claim?", a: "Filing a claim is easy. Log into your User Dashboard, go to the 'File a Claim' section, select your active policy, enter the claim amount and description, and submit. An admin will review it within 2-4 business days." },
    { q: "Can I renew my policy online?", a: "Yes! Use the 'Renew Policy' portal in the navigation bar. You can extend your coverage seamlessly while retaining all existing bonuses without re-underwriting." },
    { q: "How long does claim processing take?", a: "Standard review time by an executive administrator is 2-4 business days. Once approved, the payment is automatically transferred to your registered bank account." },
    { q: "Who is my assigned administrator?", a: "For personalized service, you must specifically select your preferred executive advisor from the dropdown menu during policy checkout! They will personally handle all your claims moving forward." },
    { q: "How do I download my GST invoice?", a: "Your GST invoice for every policy is sent to your registered email. You can also download it from the 'My Policies' section in your dashboard." }
  ];

  return (
    <div className="animate-fade-in stagger-1" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <LifeBuoy size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Support & Resolution Center</h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>We're here to simplify your insurance experience.</p>
      </div>

      <div className="stagger-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <Phone size={32} color="var(--success)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h3>Talk to an Expert</h3>
          <p style={{ margin: '1rem 0' }}>24x7 toll-free helpline. Call us for immediate emergency assistance.</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>1800-258-4477</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>(Toll-free call)</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <MessageSquare size={32} color="var(--accent)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h3>Live Chat</h3>
          <p style={{ margin: '1rem 0' }}>Connect with your dedicated admin agent instantly via chat.</p>
          <button className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Start Chat</button>
        </div>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <Mail size={32} color="#8b5cf6" style={{ margin: '0 auto 1.5rem auto' }} />
          <h3>Email Support</h3>
          <p style={{ margin: '1rem 0' }}>Send documents or formal complaints via email.</p>
          <a href="mailto:support@insurecell.com" style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>support@insurecell.com</a>
        </div>
      </div>

      <div className="stagger-3 glass-panel" style={{ padding: '3rem' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {faqs.map((faq, i) => (
             <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', background: 'rgba(15, 23, 42, 0.4)' }}>
               <div onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{ padding: '1.3rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: activeFaq === i ? 'rgba(59, 130, 246, 0.08)' : 'transparent', transition: 'background 0.3s' }}>
                 <strong style={{ fontSize: '1.05rem' }}>{faq.q}</strong>
                 <ChevronDown size={20} style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s', color: 'var(--accent)', flexShrink: 0 }}/>
               </div>
               {activeFaq === i && (
                 <div className="animate-fade-in" style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                   <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>{faq.a}</div>
                 </div>
               )}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SupportCenter;
