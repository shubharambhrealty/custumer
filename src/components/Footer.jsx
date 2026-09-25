import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top-container">
        {/* Column 1: Brand & Credibility */}
        <div className="footer-col footer-col-brand">
          <div className="footer-brand-header">
            <img
              src="/logo.png"
              alt="Shubharambh Reality"
              className="footer-logo-img"
            />
            <div>
              <div className="footer-brand-title">SHUBHARAMBH</div>
              <div className="footer-brand-sub">REALITY</div>
              <div className="footer-brand-tagline">Building Trust for Tomorrow</div>
            </div>
          </div>

          <p className="footer-brand-desc">
            Lucknow's premier real estate consultancy. We empower families and businesses
            with verified residential homes, luxury villas, commercial showrooms, and investment
            plots across prime growth corridors.
          </p>

          <div className="footer-rera-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
            <span>RERA Registered & 100% Legal Verification</span>
          </div>

          {/* Social Links */}
          <div className="footer-social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0f172a"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3 className="footer-col-title">Quick Links</h3>
          <ul className="footer-links-list">
            <li><a href="#properties-map">Explore Map & Plots</a></li>
            <li><a href="#search-filter">Search Verified Properties</a></li>
            <li><a href="#categories">Residential & Commercial</a></li>
            <li><a href="#properties-map">Plot Status & Availability</a></li>
            <li><a href="#customer-portal">Customer & Staff Portal</a></li>
          </ul>
        </div>

        {/* Column 3: Contact & Office */}
        <div className="footer-col footer-col-contact">
          <h3 className="footer-col-title">Corporate Office</h3>
          <div className="footer-contact-details">
            <div className="footer-contact-item">
              <span className="contact-icon" aria-hidden="true">📍</span>
              <div>
                <strong>Head Office:</strong>
                <p>27 Friends Colony, Ramadevi, Kanpur Nagar, Uttar Pradesh 208007</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <span className="contact-icon" aria-hidden="true">📞</span>
              <div>
                <strong>Customer Support:</strong>
                <p><a href="tel:+917275004901">+91 72750 04901</a></p>
              </div>
            </div>

            <div className="footer-contact-item">
              <span className="contact-icon" aria-hidden="true">✉️</span>
              <div>
                <strong>Email:</strong>
                <p><a href="mailto:support@eformx.com">support@eformx.com</a></p>
              </div>
            </div>

            <div className="footer-contact-item">
              <span className="contact-icon" aria-hidden="true">🕒</span>
              <div>
                <strong>Opening Time:</strong>
                <p>09:00 AM to 08:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <div className="footer-bottom-left">
            <p>© {currentYear} <strong>Shubharambh Reality</strong>. All Rights Reserved.</p>
            <p className="footer-legal-disclaimer">
              Disclaimer: All property listings, dimensions, and prices are subject to developer terms and local authority approvals.
            </p>
          </div>

          <ul className="footer-bottom-links">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#rera">RERA Compliance</a></li>
            <li><a href="#sitemap">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
