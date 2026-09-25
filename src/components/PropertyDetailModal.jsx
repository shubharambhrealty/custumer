import React, { useState, useEffect } from 'react';

export default function PropertyDetailModal({ property, onClose }) {
  if (!property) return null;

  // Normalize image list
  const gallery = Array.isArray(property.imgs) && property.imgs.length > 0
    ? property.imgs
    : (typeof property.imgs === 'string' && property.imgs.startsWith('[')
        ? JSON.parse(property.imgs)
        : [property.img || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80']);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index when modal opens with new property
  useEffect(() => {
    setActiveImageIndex(0);
  }, [property]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="property-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="property-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button
          type="button"
          className="property-modal-close-btn"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>

        {/* Modal Top Header */}
        <div className="modal-header-section">
          <div className="modal-badge-row">
            <span className="modal-plot-badge">Plot ID: {property.plot_id || property.plotId}</span>
            <span className={`modal-status-badge badge-${property.status || 'available'}`}>
              {property.status_label || property.statusLabel || (property.status === 'selling' ? 'Selling Fast' : property.status === 'sold' ? 'Sold Out' : property.status === 'upcoming' ? 'Upcoming' : 'Available')}
            </span>
            <span className="modal-type-badge">{property.type || 'Property'}</span>
          </div>
          <h2 className="modal-property-title">{property.title}</h2>
          <div className="modal-property-price">{property.price}</div>
        </div>

        {/* Image Gallery Showcase */}
        <div className="modal-gallery-wrapper">
          <div className="modal-main-image-wrap">
            <img
              src={gallery[activeImageIndex] || property.img}
              alt={`${property.title} photo ${activeImageIndex + 1}`}
              className="modal-main-image"
            />
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  className="modal-gallery-nav-btn prev"
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="modal-gallery-nav-btn next"
                  onClick={() => setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                  aria-label="Next photo"
                >
                  ›
                </button>
                <span className="modal-gallery-counter">
                  {activeImageIndex + 1} / {gallery.length} Photos
                </span>
              </>
            )}
          </div>

          {/* Thumbnails list if multiple images exist */}
          {gallery.length > 1 && (
            <div className="modal-thumbnails-strip">
              {gallery.map((thumbUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`modal-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={thumbUrl} alt={`Thumbnail ${idx + 1}`} className="modal-thumb-img" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Detailed Specs */}
        <div className="modal-specs-grid">
          <div className="modal-spec-card">
            <span className="spec-icon">📍</span>
            <div>
              <span className="spec-label">Locality / Address</span>
              <span className="spec-value">{property.locality}</span>
            </div>
          </div>

          <div className="modal-spec-card">
            <span className="spec-icon">🏛️</span>
            <div>
              <span className="spec-label">City & State</span>
              <span className="spec-value">
                {property.city || 'Kanpur'}, {property.state || 'Uttar Pradesh'}
              </span>
            </div>
          </div>

          <div className="modal-spec-card">
            <span className="spec-icon">🧭</span>
            <div>
              <span className="spec-label">Map Coordinates</span>
              <span className="spec-value">
                {Number(property.lat).toFixed(6)}, {Number(property.lng).toFixed(6)}
              </span>
            </div>
          </div>

          <div className="modal-spec-card">
            <span className="spec-icon">🛡️</span>
            <div>
              <span className="spec-label">Verification</span>
              <span className="spec-value text-green">100% Legal & RERA Verified</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions-row">
          <a
            href={property.contactUrl || property.contact_url || `https://wa.me/919876543210?text=Hi, I am interested in Plot ${property.plot_id || property.plotId} - ${property.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-btn-contact"
          >
            💬 Contact Agent on WhatsApp
          </a>
          <button
            type="button"
            className="modal-btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
