import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilter from './components/SearchFilter';
import PropertyMap from './components/PropertyMap';
import PropertyDetailPage from './components/PropertyDetailPage';
import Categories from './components/Categories';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    state: '',
    city: '',
    pincode: ''
  });

  // Fetch properties from server injected data or local endpoint
  useEffect(() => {
    // 1. Check if index.php injected properties directly on server
    if (typeof window !== 'undefined' && Array.isArray(window.__PROPERTIES_DATA__) && window.__PROPERTIES_DATA__.length > 0) {
      setProperties(normalizeProperties(window.__PROPERTIES_DATA__));
      setIsLoading(false);
      return;
    }

    // 2. Fetch from local dev proxy endpoint
    fetch('/api/properties')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.status && Array.isArray(json.data)) {
          setProperties(normalizeProperties(json.data));
        } else {
          setProperties([]);
        }
      })
      .catch(() => {
        setProperties([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const normalizeProperties = (rawList) => {
    return rawList.map((item) => {
      // Safe parsing of imgs array from API
      let imgsList = [];
      if (Array.isArray(item.imgs) && item.imgs.length > 0) {
        imgsList = item.imgs;
      } else if (typeof item.imgs === 'string') {
        const trimmed = item.imgs.trim();
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed) && parsed.length > 0) imgsList = parsed;
          } catch (e) {
            imgsList = [];
          }
        }
      }
      if (imgsList.length === 0 && item.img) {
        imgsList = [item.img];
      }

      const rawPin = item.pincode || item.pin_code || item.pin || '';

      return {
        ...item,
        id: item.id || item.plot_id,
        plotId: item.plot_id || item.plotId || item.id,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng),
        status: item.status || 'available',
        statusLabel: item.status_label || item.statusLabel || (item.status === 'selling' ? 'Selling Fast' : item.status === 'sold' ? 'Sold Out' : item.status === 'upcoming' ? 'Upcoming' : 'Available'),
        state: (item.state || '').trim(),
        city: (item.city || '').trim(),
        pincode: String(rawPin).trim(),
        title: item.title || '',
        locality: item.locality || '',
        price: item.price || '',
        type: item.type || 'project',
        img: imgsList[0] || item.img || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
        imgs: imgsList,
        detailsUrl: item.details_url || item.detailsUrl,
        contactUrl: item.contact_url || item.contactUrl || `https://wa.me/919876543210?text=Hi, I am interested in Plot ${item.plot_id || item.plotId}`
      };
    });
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType);
  };

  const handleSearch = (searchData) => {
    if (searchData.type) {
      setActiveFilter(searchData.type);
    }
    setSearchCriteria({
      state: searchData.state || '',
      city: searchData.city || '',
      pincode: searchData.pincode || ''
    });
  };

  // Handle URL route query param ?plot=13 or ?id=13
  useEffect(() => {
    const syncFromUrl = () => {
      if (typeof window === 'undefined' || properties.length === 0) return;
      const params = new URLSearchParams(window.location.search);
      const plotId = params.get('plot') || params.get('id');
      if (plotId) {
        const found = properties.find((p) => String(p.plotId) === String(plotId) || String(p.id) === String(plotId));
        if (found) {
          setSelectedProperty(found);
          return;
        }
      }
      setSelectedProperty(null);
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [properties]);

  const handleSelectProperty = (p) => {
    setSelectedProperty(p);
    if (typeof window !== 'undefined') {
      window.history.pushState({ plotId: p.plotId }, '', `?plot=${p.plotId}`);
    }
  };

  const handleBackToMap = () => {
    setSelectedProperty(null);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  const handleResetSearch = () => {
    setActiveFilter('all');
    setSearchCriteria({ state: '', city: '', pincode: '' });
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header onOpenLogin={handleOpenLogin} />

      {/* Main Content */}
      <main>
        {selectedProperty ? (
          <PropertyDetailPage
            property={selectedProperty}
            onBack={handleBackToMap}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero />

            {/* Floating Search Filter (State -> City -> Pincode Cascading) */}
            <SearchFilter
              activeTab={activeFilter}
              onTabChange={handleFilterChange}
              onSearch={handleSearch}
              properties={properties}
              searchCriteria={searchCriteria}
            />

            {/* Interactive Map Section */}
            <PropertyMap
              activeFilter={activeFilter}
              properties={properties}
              isLoading={isLoading}
              searchCriteria={searchCriteria}
              onResetSearch={handleResetSearch}
              onSelectProperty={handleSelectProperty}
            />

            {/* 4 Category Cards */}
            <Categories onSelectCategory={handleFilterChange} />
          </>
        )}
      </main>

      {/* Role-Based Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Comprehensive Professional Footer */}
      <Footer />
    </div>
  );
}
