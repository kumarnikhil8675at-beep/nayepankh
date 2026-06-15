import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-base)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 5% 1.5rem 5%',
      marginTop: 'auto'
    }}>
      <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
      }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                Get in touch
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '350px', lineHeight: '1.5' }}>
                contact@nayepankh.com<div>Mobile No: +91- 8318500748</div>
            </p>
        </div>

        <div style={{display:"flex", gap:"3rem", alignItems:"center", justifyContent:"space-between", flexDirection:"column"}}>

        <div style={{fontWeight:'bold',marginBottom:'-20px',fontSize:'larger'}}>Follow us</div>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          
            <a href="https://x.com/nayepankh" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-base)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
               <Twitter size={22} />
            </a>
            <a href="https://www.facebook.com/nayepankhfoundation" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-base)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
               <Facebook size={22} />
            </a>
            <a href="http://www.instagram.com/nayepankhfoundation" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-base)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
               <Instagram size={22} />
            </a>
            <a href="https://www.linkedin.com/company/nayepankh" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-base)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
               <Linkedin size={22} />
            </a>
        </div>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: "none", color: "var(--text-muted)",fontSize: '1rem',fontWeight:'bold' }} >Contact Us</a>
        <a href="/" style={{ textDecoration: "none", color: "var(--text-muted)",fontSize: '1rem',fontWeight:'bold' }} >Terms and Conditions</a>
        <a href="/" style={{ textDecoration: "none", color: "var(--text-muted)",fontSize: '1rem',fontWeight:'bold' }} >Cancellation and Refund</a>
        <a href="/" style={{ textDecoration: "none", color: "var(--text-muted)",fontSize: '1rem',fontWeight:'bold' }} >shipping and Exchange</a>
        <a href="/" style={{ textDecoration: "none", color: "var(--text-muted)",fontSize: '1rem',fontWeight:'bold' }} >Privacy Policy</a>
        
        </div>

      </div>
      </div>
      
      <div style={{
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
      }}>
          &copy; {new Date().getFullYear()}  All rights reserved.
      </div>
    </footer>
  );
};
