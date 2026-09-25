import React from 'react';

export default function ListBanner({ onOpenLogin }) {
  return (
    <section className="list-banner-section" id="list-banner">
      <div className="list-banner-card">
        <div className="list-banner-info">
          <h2>Are you an Owner, Builder or Agent?</h2>
          <p>
            List your property with us for free & get connected with verified genuine buyers instantly.
          </p>
        </div>

        <button
          className="btn-list-now"
          type="button"
          onClick={() => onOpenLogin && onOpenLogin('customer')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          List Your Property Now
        </button>

        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=350&q=80"
          alt="List property"
          className="list-banner-img"
        />
      </div>
    </section>
  );
}
