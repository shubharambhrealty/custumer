import React from 'react';

export default function Categories({ onSelectCategory }) {
  const categories = [
    {
      id: 'residential',
      type: 'sale',
      iconClass: 'cat-residential',
      title: 'Residential',
      description: 'Flats, Villas, Builder Floors & Independent Houses',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      id: 'commercial',
      type: 'commercial',
      iconClass: 'cat-commercial',
      title: 'Commercial',
      description: 'Shops, Showrooms, Offices & Commercial Land',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
      )
    },
    {
      id: 'plots',
      type: 'project',
      iconClass: 'cat-plots',
      title: 'Plots & Land',
      description: 'Residential Plots, Agricultural & Investment Land',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
          <line x1="9" y1="3" x2="9" y2="18"></line>
          <line x1="15" y1="6" x2="15" y2="21"></line>
        </svg>
      )
    },
    {
      id: 'projects',
      type: 'project',
      iconClass: 'cat-launch',
      title: 'New Launch Projects',
      description: 'Upcoming RERA approved townships & luxury societies',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22h20"></path>
          <path d="M6 18v-7l5-4v11"></path>
          <path d="M11 7l7 5v6"></path>
          <path d="M14 18v-3"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="categories-section" id="categories" aria-label="Property Categories">
      <div className="categories-grid">
        {categories.map((c) => (
          <div
            key={c.id}
            className="category-card"
            role="button"
            tabIndex={0}
            onClick={() => onSelectCategory && onSelectCategory(c.type)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCategory && onSelectCategory(c.type);
              }
            }}
          >
            <div className={`cat-icon-circle ${c.iconClass}`} aria-hidden="true">
              {c.icon}
            </div>
            <div className="cat-info">
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
