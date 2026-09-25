import React from 'react';

export default function Hero() {
  const badges = [
    {
      label: '500+ Verified Properties',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )
    },
    {
      label: 'Direct Owner & Builder Deals',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      label: 'Complete Legal Support',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.28 1.28L3 12l5.8 1.9a2 2 0 0 1 1.28 1.28L12 21l1.9-5.8a2 2 0 0 1 1.28-1.28L21 12l-5.8-1.9a2 2 0 0 1-1.28-1.28z"></path>
        </svg>
      )
    },
    {
      label: 'Instant Agent Assistance',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      )
    }
  ];

  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="hero-subtitle">Welcome to Shubharambh Reality</p>
        <h1 className="hero-title">
          Find Your Dream Property in <br />
          <span className="hero-title-accent">Lucknow</span>
        </h1>
        <p className="hero-tagline">
          Premium Residential, Commercial & Investment Properties | Building Trust for Tomorrow
        </p>

        {/* 4 Trust Badges with SVG icons */}
        <div className="trust-badges">
          {badges.map((badge, idx) => (
            <div key={idx} className="trust-badge">
              <span className="badge-icon-wrap" aria-hidden="true">{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
