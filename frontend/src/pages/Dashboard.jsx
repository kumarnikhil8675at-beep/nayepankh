import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Heart, Coins, Users, Calendar, Award } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.role === 'admin') {
      const fetchDonations = async () => {
        try {
          const { data } = await api.get('/donations');
          setDonations(data);
        } catch (err) {
          console.error('Error fetching donations:', err);
          setError('Failed to fetch donation data.');
        } finally {
          setLoading(false);
        }
      };
      fetchDonations();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) return null;

  if (user.role === 'admin') {
    const totalDonationsCount = donations.length;
    const totalDonatedAmount = donations.reduce((sum, item) => sum + item.amount, 0);

    return (
      <div className="page-container" style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0 }}>Controller Suite</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome, Admin {user.name}</p>
          </div>
          <Button onClick={() => navigate('/donate')} variant="primary">
            <Heart size={16} fill="white" /> Make a Donation
          </Button>
        </div>

        {/* Statistics Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
              <Coins size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '500', marginBottom: '0.25rem' }}>Total Raised</h3>
              <p style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-base)' }}>
                Rs{totalDonatedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Users size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '500', marginBottom: '0.25rem' }}>Donations Count</h3>
              <p style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-base)' }}>
                {totalDonationsCount}
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Award size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '500', marginBottom: '0.25rem' }}>Active Projects</h3>
              <p style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-base)' }}>
                5 Campaigns
              </p>
            </div>
          </div>
        </div>

        {/* Donations List Card */}
        <div className="card" style={{ padding: '2.5rem 2rem', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-base)' }}>Recent Contributions</h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading records...</div>
          ) : error ? (
            <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>{error}</div>
          ) : donations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No donations recorded yet.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem 0.75rem' }}>Donor Name</th>
                    <th style={{ padding: '1rem 0.75rem' }}>Email / Phone</th>
                    <th style={{ padding: '1rem 0.75rem' }}>Cause / Campaign</th>
                    <th style={{ padding: '1rem 0.75rem' }}>Method</th>
                    <th style={{ padding: '1rem 0.75rem' }}>Txn ID</th>
                    <th style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donate) => (
                    <tr key={donate._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} className="table-row-hover">
                      <td style={{ padding: '1rem 0.75rem', fontWeight: '600', color: 'var(--text-base)' }}>{donate.name}</td>
                      <td style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)' }}>
                        <div>{donate.email}</div>
                        <div style={{ fontSize: '0.85rem' }}>{donate.phone}</div>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', fontWeight: '500' }}>{donate.purpose}</td>
                      <td style={{ padding: '1rem 0.75rem' }}>{donate.paymentMethod}</td>
                      <td style={{ padding: '1rem 0.75rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{donate.transactionId}</td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'right', fontWeight: '700', color: 'var(--accent-primary)', fontSize: '1.05rem' }}>
                        Rs{donate.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <style>{`
                .table-row-hover:hover {
                  background-color: rgba(99, 102, 241, 0.03);
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Dashboard layout for normal user/visitor
  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', animation: 'fadeIn 0.5s ease-out' }}>
      <div className="card glass-panel" style={{ maxWidth: '600px', width: '100%', padding: '3.5rem', textAlign: 'center', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
          <Heart size={40} fill="var(--accent-primary)" />
        </div>
        
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-base)' }}>Welcome, {user.name}!</h1>
        <div style={{ display: 'inline-block', padding: '0.2rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Visitor (User Account)
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          Thank you for joining the NayePankh Foundation. Together, we can support underprivileged sectors of society by distributing food, clothes, sanitary pads, and spreading awareness.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <Button onClick={() => navigate('/donate')} variant="primary" style={{ width: '100%', maxWidth: '280px', height: '48px' }}>
            Donate to a Campaign
          </Button>
          <Button onClick={() => navigate('/about')} variant="secondary" style={{ width: '100%', maxWidth: '280px', height: '48px' }}>
            Learn More About Us
          </Button>
        </div>
      </div>
    </div>
  );
}
