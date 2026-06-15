import React from 'react';
import { Facebook, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';

export const SocialSidebar = () => {
  return (
    <div className="social-sidebar">
      <a href="https://www.facebook.com/nayepankhfoundation" target="_blank" rel="noreferrer" className="social-item bg-facebook">
        <div className="social-icon-wrapper">
            <Facebook size={26} strokeWidth={1.5} absoluteStrokeWidth={false} fill="white" color="white" />
        </div>
        <span className="social-text">Facebook</span>
      </a>
      <a href="https://www.linkedin.com/company/nayepankh" target="_blank" rel="noreferrer" className="social-item bg-linkedin">
        <div className="social-icon-wrapper">
            <Linkedin size={26} strokeWidth={1.5} fill="white" color="white" />
        </div>
        <span className="social-text">LinkedIn</span>
      </a>
      <a href="https://x.com/nayepankh" target="_blank" rel="noreferrer" className="social-item bg-twitter">
        <div className="social-icon-wrapper">
             {/* X Logo representation using Twitter icon */}
            <Twitter size={24} strokeWidth={2} fill="white" color="white" />
        </div>
        <span className="social-text">X (Twitter)</span>
      </a>
      <a href="https://www.instagram.com/nayepankhfoundation" target="_blank" rel="noreferrer" className="social-item bg-instagram">
        <div className="social-icon-wrapper">
            <Instagram size={26} strokeWidth={2} color="white" />
        </div>
        <span className="social-text">Instagram</span>
      </a>
      <a href="https://www.youtube.com/@nayepankhfoundation" target="_blank" rel="noreferrer" className="social-item bg-youtube">
        <div className="social-icon-wrapper">
            <Youtube size={26} strokeWidth={2} fill="white" color="white" />
        </div>
        <span className="social-text">YouTube</span>
      </a>
    </div>
  );
};
