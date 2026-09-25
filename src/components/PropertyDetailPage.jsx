import React, { useState, useEffect } from 'react';

export default function PropertyDetailPage({ property, onBack }) {
  if (!property) return null;

  // Normalize image gallery from property.imgs
  const gallery = Array.isArray(property.imgs) && property.imgs.length > 0
    ? property.imgs
    : (typeof property.imgs === 'string' && property.imgs.trim().startsWith('[')
        ? JSON.parse(property.imgs)
        : [property.img || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80']);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
  }, [property]);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="property-detail-page-container">
      {/* Top Navigation Bar with Back Button */}
      <div className="detail-page-nav-bar">
        <div className="detail-page-nav-inner">
          <button
            type="button"
            className="btn-back-to-map"
            onClick={onBack}
          >
            ← Back to Map & Properties
          </button>
          <div className="detail-nav-breadcrumb">
            <span>Home</span> / <span>Properties</span> / <strong>Plot #{property.plotId || property.plot_id}</strong>
          </div>
        </div>
      </div>

      <div className="detail-page-content-wrapper">
        {/* Main Grid: Gallery & Details on Left, Action Card on Right */}
        <div className="detail-page-grid">
          {/* Left Column: Photos & Specs */}
          <div className="detail-left-column">
            {/* Header Section */}
            <div className="detail-property-header">
              <div className="detail-badge-row">
                <span className="detail-plot-badge">Plot ID: {property.plotId || property.plot_id}</span>
                <span className={`detail-status-badge badge-${property.status || 'available'}`}>
                  {property.statusLabel || property.status_label || (property.status === 'selling' ? 'Selling Fast' : property.status === 'sold' ? 'Sold Out' : property.status === 'upcoming' ? 'Upcoming' : 'Available')}
                </span>
                <span className="detail-type-badge">{property.type || 'Plot / Land'}</span>
              </div>
              <h1 className="detail-main-title">{property.title}</h1>
              <div className="detail-locality-row">
                <span>📍 {property.locality || property.city}</span>
                <span>🏛️ {property.city}, {property.state}</span>
              </div>
              <div className="detail-price-tag">{property.price}</div>
            </div>

            {/* Image Gallery Showcase */}
            <div className="detail-gallery-showcase">
              <div className="detail-main-photo-wrap">
                <img
                  src={gallery[activeImageIndex] || property.img}
                  alt={`${property.title} - Photo ${activeImageIndex + 1}`}
                  className="detail-main-photo"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="detail-gallery-arrow prev"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="detail-gallery-arrow next"
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                    <div className="detail-photo-counter">
                      {activeImageIndex + 1} / {gallery.length} Photos
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {gallery.length > 1 && (
                <div className="detail-thumbnails-row">
                  {gallery.map((thumbUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`detail-thumb-item ${idx === activeImageIndex ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={thumbUrl} alt={`Thumbnail ${idx + 1}`} className="detail-thumb-img" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detailed Property Specifications Grid */}
            <div className="detail-specs-card">
              <h3 className="detail-section-title">Property Highlights & Specifications</h3>
              <div className="detail-specs-table">
                <div className="detail-spec-row">
                  <span className="spec-name">Plot ID</span>
                  <span className="spec-val">#{property.plotId || property.plot_id}</span>
                </div>
                <div className="detail-spec-row">
                  <span className="spec-name">Locality / Corridor</span>
                  <span className="spec-val">{property.locality || 'Prime Location'}</span>
                </div>
                <div className="detail-spec-row">
                  <span className="spec-name">City</span>
                  <span className="spec-val">{property.city}</span>
                </div>
                <div className="detail-spec-row">
                  <span className="spec-name">State</span>
                  <span className="spec-val">{property.state}</span>
                </div>
                {property.pincode && (
                  <div className="detail-spec-row">
                    <span className="spec-name">Pin Code</span>
                    <span className="spec-val">{property.pincode}</span>
                  </div>
                )}
                <div className="detail-spec-row">
                  <span className="spec-name">GPS Coordinates</span>
                  <span className="spec-val">
                    {property.lat}, {property.lng}
                    {property.lat && property.lng && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${property.lat},${property.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="spec-map-link"
                      >
                        (Open in Google Maps ↗)
                      </a>
                    )}
                  </span>
                </div>
                <div className="detail-spec-row">
                  <span className="spec-name">Registry & Approvals</span>
                  <span className="spec-val status-verified">✓ 100% Freehold & Legally Verified</span>
                </div>
                <div className="detail-spec-row">
                  <span className="spec-name">Possession</span>
                  <span className="spec-val">Immediate Registry & Possession</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Booking Card */}
          <div className="detail-right-column">
            <div className="detail-booking-card">
              <div className="booking-card-badge">Instant Inquiry</div>
              <div className="booking-price-header">
                <span className="booking-price-label">Starting Price</span>
                <div className="booking-price-val">{property.price}</div>
              </div>

              <div className="booking-features-list">
                <div className="booking-feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Gated Community with 24x7 Security</span>
                </div>
                <div className="booking-feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Wide 40ft & 30ft Blacktop Roads</span>
                </div>
                <div className="booking-feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Underground Electricity & Water Supply</span>
                </div>
                <div className="booking-feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Direct Highway Connectivity</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="booking-actions">
                <a
                  href={property.contactUrl || `https://wa.me/919876543210?text=Hi, I am interested in Plot ${property.plotId || property.plot_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail-action btn-whatsapp"
                >
                  💬 Chat on WhatsApp
                </a>

                <a
                  href="tel:+919876543210"
                  className="btn-detail-action btn-call"
                >
                  📞 Call Sales Team (+91 98765 43210)
                </a>

                <button
                  type="button"
                  className="btn-detail-action btn-site-visit"
                  onClick={() => alert(`Site visit request submitted for Plot #${property.plotId || property.plot_id}. Our executive will call you shortly.`)}
                >
                  🗓️ Book Free Site Visit
                </button>
              </div>

              <div className="booking-guarantee-note">
                🔒 Direct Developer Pricing — Zero Brokerage
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
