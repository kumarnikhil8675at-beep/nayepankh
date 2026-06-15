import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Heart, CreditCard, Smartphone, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DonateForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [purpose, setPurpose] = useState('General Donation');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  
  // Simulated Card Info States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // UI Flow States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

  const presetAmounts = ['10', '25', '50', '100'];

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*$/.test(val)) {
      setCustomAmount(val);
      setAmount('custom');
    }
  };

  const getFinalAmount = () => {
    return amount === 'custom' ? customAmount : amount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();

    if (!finalAmount || Number(finalAmount) <= 0) {
      setError('Please specify a valid donation amount.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    
    // Simulate transaction steps for high feedback and visual wow
    try {
      setSubmissionStep('Connecting to secure payment gateway...');
      await new Promise(resolve => setTimeout(resolve, 800));

      setSubmissionStep('Authorizing simulated credentials...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmissionStep('Recording contribution details securely...');
      await new Promise(resolve => setTimeout(resolve, 700));

      const payload = {
        name,
        email,
        phone,
        amount: Number(finalAmount),
        purpose,
        paymentMethod
      };

      const { data } = await api.post('/donations', payload);
      
      setSuccessData(data.donation);
      setIsSubmitting(false);
      setSubmissionStep('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Transaction failed. Please try again.');
      setIsSubmitting(false);
      setSubmissionStep('');
    }
  };

  if (successData) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="card glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '3rem', textAlign: 'center', animation: 'scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '1.5rem' }}>
            <CheckCircle2 size={50} />
          </div>
          
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-base)' }}>Thank You!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Dear <strong>{successData.name}</strong>, your kind contribution has been processed successfully. You are bringing a smile to many faces!
          </p>

          <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Transaction ID:</span>
              <strong style={{ fontFamily: 'monospace' }}>{successData.transactionId}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Cause / Purpose:</span>
              <strong>{successData.purpose}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
              <strong>{successData.paymentMethod}</strong>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>Amount Donated:</span>
              <strong style={{ fontSize: '1.25rem', color: 'var(--accent-primary)' }}>${successData.amount.toFixed(2)}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button onClick={() => navigate('/')} variant="primary" style={{ padding: '0.8rem 2rem' }}>
              Back to Home
            </Button>
            {user && (
              <Button onClick={() => navigate('/dashboard')} variant="secondary" style={{ padding: '0.8rem 2rem' }}>
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh', position: 'relative' }}>
      {isSubmitting && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
          zIndex: 9999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          color: 'white', padding: '2rem'
        }}>
          <div className="spinner" style={{
            border: '4px solid rgba(255, 255, 255, 0.1)',
            width: '60px', height: '60px', borderRadius: '50%',
            borderLeftColor: 'var(--accent-primary)',
            animation: 'spin 1s linear infinite',
            marginBottom: '1.5rem'
          }}></div>
          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          `}</style>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '600', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Processing Contribution</h3>
          <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>{submissionStep}</p>
        </div>
      )}

      <div className="card glass-panel" style={{ maxWidth: '650px', width: '100%', padding: '2.5rem 3rem', margin: '2rem 0' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-base)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
            <Heart size={36} fill="var(--accent-primary)" />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-base)' }}>Empower a Life Today</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '450px', margin: '0.5rem auto 0', lineHeight: '1.4' }}>
            Your donation directly funds meals, clothes, sanitary pads, and quality education for families in need.
          </p>
        </div>

        {error && (
          <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Preset/Custom Amounts Selection */}
          <div className="input-group">
            <label className="input-label" style={{ marginBottom: '0.75rem' }}>Select Donation Amount (Rs)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountSelect(amt)}
                  style={{
                    padding: '0.75rem 0', borderRadius: '8px', border: 'none',
                    fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: amount === amt ? 'var(--accent-primary)' : 'var(--bg-base)',
                    color: amount === amt ? 'white' : 'var(--text-base)',
                    boxShadow: amount === amt ? '0 4px 12px rgba(99,102,241,0.3)' : 'var(--shadow-sm)'
                  }}
                >
                  Rs{amt}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAmount('custom')}
                style={{
                  padding: '0.75rem 0', borderRadius: '8px', border: 'none',
                  fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: amount === 'custom' ? 'var(--accent-primary)' : 'var(--bg-base)',
                  color: amount === 'custom' ? 'white' : 'var(--text-base)',
                  boxShadow: amount === 'custom' ? '0 4px 12px rgba(99,102,241,0.3)' : 'var(--shadow-sm)'
                }}
              >
                Custom
              </button>
            </div>
            {amount === 'custom' && (
              <Input
                placeholder="Enter custom amount"
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                required
                style={{ marginTop: '0.25rem', textAlign: 'center', fontSize: '1.1rem' }}
              />
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Full Name"
              type="text"
              id="donate-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              id="donate-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Phone Number"
              type="tel"
              id="donate-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="e.g. +91 98765 43210"
            />

            <div className="input-group">
              <label className="input-label" htmlFor="donate-purpose">Support Cause</label>
              <select
                id="donate-purpose"
                className="input-field"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                <option value="General Donation">General Donation</option>
                <option value="Hunger Relief">Hunger Relief (Food Distribution)</option>
                <option value="Sanitary Pads Drive">Sanitary Pads Drive (Women Hygiene)</option>
                <option value="Education Support">Education Support (Kids Books & Tuition)</option>
                <option value="Clothes Distribution">Clothes Distribution (Winter Support)</option>
              </select>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="input-group" style={{ marginTop: '0.5rem' }}>
            <label className="input-label">Select Payment Method</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                style={{
                  flex: 1, padding: '1rem', borderRadius: '12px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  fontWeight: '600', transition: 'all 0.2s',
                  backgroundColor: paymentMethod === 'Card' ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-base)',
                  border: paymentMethod === 'Card' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  color: 'var(--text-base)'
                }}
              >
                <CreditCard size={20} /> Credit/Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                style={{
                  flex: 1, padding: '1rem', borderRadius: '12px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  fontWeight: '600', transition: 'all 0.2s',
                  backgroundColor: paymentMethod === 'UPI' ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-base)',
                  border: paymentMethod === 'UPI' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  color: 'var(--text-base)'
                }}
              >
                <Smartphone size={20} /> UPI / QR Scan
              </button>
            </div>
          </div>

          {/* Simulated Card Fields */}
          {paymentMethod === 'Card' ? (
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)',
              borderRadius: '12px', padding: '1.5rem', marginTop: '1rem', marginBottom: '1.5rem',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} /> Secured Simulated Card Entry
              </h4>
              <Input
                label="Card Number"
                type="text"
                placeholder="1111 - 2222 - 3333 - 4444"
                maxLength="19"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                required
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  label="Expiration Date"
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value.replace(/[^\d/]/g, ''))}
                  required
                />
                <Input
                  label="CVV Code"
                  type="password"
                  placeholder="•••"
                  maxLength="3"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>
          ) : (
            /* Simulated UPI Details */
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)',
              borderRadius: '12px', padding: '1.5rem', marginTop: '1rem', marginBottom: '1.5rem',
              textAlign: 'center', animation: 'fadeIn 0.3s ease-out'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                Scan Code below to donate via any UPI App
              </h4>
              <div style={{
                display: 'inline-block', padding: '1rem', backgroundColor: 'white',
                borderRadius: '12px', boxShadow: 'var(--shadow-sm)', marginBottom: '1rem'
              }}>
                {/* Simulated QR Code representation */}
                <div style={{ width: '130px', height: '130px', background: 'repeating-concentric-gradient(black 0px, black 4px, white 4px, white 8px)', opacity: 0.85 }}></div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Simulating UPI: Scanning is not required; hitting donate will execute the simulation.
              </p>
            </div>
          )}

          <Button type="submit" style={{ width: '100%', height: '52px', fontSize: '1.1rem', marginTop: '1rem' }}>
            Donate Rs{getFinalAmount() || '0'} Now
          </Button>
        </form>
      </div>
    </div>
  );
}
