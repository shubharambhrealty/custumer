import React, { useEffect } from 'react';

export default function LoginModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const roleOptions = [
    {
      id: 'customer',
      title: 'Customer Login',
      badge: 'Buyer / Seller / Rent',
      description: 'Search properties, save favorites, list property & contact agents directly',
      url: 'https://auth.eformx.in/?auth_url=https://shubharambhrealty.eformx.com/custumer',
      color: '#0284c7',
      bgLight: '#e0f2fe',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'sales-manager',
      title: 'Sales Manager',
      badge: 'Leads & Bookings',
      description: 'Manage buyer inquiries, site visits, plot sales & agent performance',
      url: 'https://auth.eformx.in/?auth_url=https://shubharambhrealty.eformx.com/sales-manager',
      color: '#d97706',
      bgLight: '#fef3c7',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
      )
    },
    {
      id: 'staff',
      title: 'Staff Login',
      badge: 'Office & Operations',
      description: 'Daily documentation, registry verification, inventory desk & support',
      url: 'https://auth.eformx.in/?auth_url=https://shubharambhrealty.eformx.com/staff',
      color: '#4f46e5',
      bgLight: '#e0e7ff',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      id: 'admin',
      title: 'Admin Login',
      badge: 'Branch Administration',
      description: 'Property approvals, agent permissions, master leads & branch desk',
      url: 'https://auth.eformx.in/?auth_url=https://shubharambhrealty.eformx.com/admin',
      color: '#0f766e',
      bgLight: '#ccfbf1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      )
    },
    {
      id: 'super-admin',
      title: 'Super Admin',
      badge: 'Full System Authority',
      description: 'Master configuration, multi-branch access, revenue audit & security governance',
      url: 'https://auth.eformx.in/?auth_url=https://shubharambhrealty.eformx.com/super-admin',
      color: '#7e22ce',
      bgLight: '#f3e8ff',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    }
  ];

  // Redirect using window.location.replace so browser back button does not loop back
  const handleSelectRole = (url) => {
    window.location.replace(url);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-dialog-title"
    >
      <div className="login-modal-card role-select-modal">
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="modal-header-section" style={{ textAlign: 'center' }}>
          <img
            src="/logo.png"
            alt="Shubharambh Reality Logo"
            className="modal-brand-logo"
          />
          <h2 id="login-dialog-title" className="modal-heading" style={{ fontSize: '22px', marginTop: '10px' }}>
            Choose Account Type
          </h2>
          <p className="modal-subtext">
            Select your account type to proceed to the secure login portal
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="select-role-list">
          {roleOptions.map((role) => (
            <div
              key={role.id}
              className="role-action-card"
              role="button"
              tabIndex={0}
              onClick={() => handleSelectRole(role.url)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectRole(role.url);
                }
              }}
            >
              <div
                className="role-action-icon"
                style={{ backgroundColor: role.bgLight, color: role.color }}
                aria-hidden="true"
              >
                {role.icon}
              </div>

              <div className="role-action-details">
                <div className="role-action-top">
                  <h3 className="role-action-title">{role.title}</h3>
                  <span
                    className="role-pill-badge"
                    style={{ backgroundColor: `${role.color}18`, color: role.color }}
                  >
                    {role.badge}
                  </span>
                </div>
                <p className="role-action-desc">{role.description}</p>
              </div>

              <div className="role-action-arrow" aria-hidden="true" style={{ color: role.color }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Security assurance note */}
        <div className="modal-secure-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Protected by eFormX</span>
        </div>
      </div>
    </div>
  );
}
