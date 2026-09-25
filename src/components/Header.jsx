import React from 'react';

export default function Header({ onOpenLogin }) {
  return (
    <header className="site-header">
      {/* Official Brand Logo */}
      <a href="#" className="logo-group">
        <img
          src="./logo.png"
          alt="Shubharambh Reality Logo"
          className="brand-logo-img"
        />
        <div>
          <div className="logo-text-title">SHUBHARAMBH</div>
          <div className="logo-text-sub">REALITY</div>
          <div className="logo-text-tagline">Building Trust for Tomorrow</div>
        </div>
      </a>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><a href="#" className="nav-link active">Home</a></li>
        <li><a href="#properties-map" className="nav-link">Buy</a></li>
        <li><a href="#properties-map" className="nav-link">Rent</a></li>
        <li><a href="#properties-map" className="nav-link">Projects</a></li>
        <li><a href="#categories" className="nav-link">Services</a></li>
      </ul>

      {/* Right Action Buttons */}
      <div className="header-right">

        {/* Prominent Login button */}
        <button
          type="button"
          className="btn-header-primary-login"
          onClick={() => onOpenLogin && onOpenLogin()}
          title="Login to Shubharambh Portal"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Login
        </button>
      </div>
    </header>
  );
}
