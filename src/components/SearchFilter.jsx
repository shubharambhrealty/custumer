import React, { useState, useEffect, useMemo } from 'react';

export default function SearchFilter({
  activeTab = 'all',
  onTabChange,
  onSearch,
  properties = [],
  searchCriteria = { state: '', city: '', pincode: '' }
}) {
  const [stateVal, setStateVal] = useState(searchCriteria.state || '');
  const [cityVal, setCityVal] = useState(searchCriteria.city || '');
  const [pincodeVal, setPincodeVal] = useState(searchCriteria.pincode || '');

  // Keep local inputs in sync with parent searchCriteria
  useEffect(() => {
    setStateVal(searchCriteria.state || '');
    setCityVal(searchCriteria.city || '');
    setPincodeVal(searchCriteria.pincode || '');
  }, [searchCriteria]);


  // 1. Dynamic Unique States from API Data
  const availableStates = useMemo(() => {
    const set = new Set();
    properties.forEach((p) => {
      if (p.state && p.state.trim()) set.add(p.state.trim());
    });
    return Array.from(set).sort();
  }, [properties]);

  // 2. Cascading Cities (Filtered by Selected State)
  const availableCities = useMemo(() => {
    const set = new Set();
    properties.forEach((p) => {
      const matchState = !stateVal || (p.state && p.state.toLowerCase() === stateVal.toLowerCase());
      if (matchState && p.city && p.city.trim()) {
        set.add(p.city.trim());
      }
    });
    return Array.from(set).sort();
  }, [properties, stateVal]);

  // 3. Cascading Pincodes (Strictly from API JSON for Selected State & City)
  const availablePincodes = useMemo(() => {
    if (!cityVal) return [];
    const set = new Set();
    properties.forEach((p) => {
      const matchState = !stateVal || (p.state && p.state.toLowerCase() === stateVal.toLowerCase());
      const matchCity = p.city && p.city.toLowerCase() === cityVal.toLowerCase();
      const pin = p.pincode || p.pin_code || p.pin;
      if (matchState && matchCity && pin && String(pin).trim()) {
        set.add(String(pin).trim());
      }
    });
    return Array.from(set).sort();
  }, [properties, stateVal, cityVal]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setStateVal(newState);
    setCityVal(''); // Reset child city
    setPincodeVal(''); // Reset child pincode
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCityVal(newCity);
    setPincodeVal(''); // Reset child pincode
  };

  const handlePincodeChange = (e) => {
    setPincodeVal(e.target.value);
  };

  const isCityDisabled = !stateVal;
  const isPincodeDisabled = !cityVal;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        state: stateVal,
        city: cityVal,
        pincode: pincodeVal,
        type: 'all'
      });
    }
  };

  const hasActiveFilters = Boolean(stateVal || cityVal || pincodeVal);

  const handleReset = () => {
    setStateVal('');
    setCityVal('');
    setPincodeVal('');
    if (onSearch) {
      onSearch({ state: '', city: '', pincode: '', type: 'all' });
    }
  };

  return (
    <div className="search-filter-wrapper">
      <div className="search-filter-card advanced-search-card">
        {/* Cascading Dropdowns: State -> City -> Pincode */}
        <form onSubmit={handleSearchSubmit} className="filter-inputs-grid">
          {/* 1. Select State */}
          <div className="filter-input-col">
            <span className="input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </span>
            <div className="input-text-group">
              <label htmlFor="select-state" className="input-label">Select State</label>
              <select
                id="select-state"
                className="input-select-field"
                value={stateVal}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {availableStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Select City / District */}
          <div className={`filter-input-col ${isCityDisabled ? 'disabled-col' : ''}`}>
            <span className="input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            </span>
            <div className="input-text-group">
              <label htmlFor="select-city" className="input-label">Select City</label>
              <select
                id="select-city"
                className="input-select-field"
                value={cityVal}
                onChange={handleCityChange}
                disabled={isCityDisabled}
              >
                <option value="">{isCityDisabled ? 'Select State First' : 'All Cities'}</option>
                {!isCityDisabled && availableCities.map((ct) => (
                  <option key={ct} value={ct}>{ct}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Select Pincode (Pure Select Dropdown) */}
          <div className={`filter-input-col ${isPincodeDisabled ? 'disabled-col' : ''}`}>
            <span className="input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="9" x2="20" y2="9"></line>
                <line x1="4" y1="15" x2="20" y2="15"></line>
                <line x1="10" y1="3" x2="8" y2="21"></line>
                <line x1="16" y1="3" x2="14" y2="21"></line>
              </svg>
            </span>
            <div className="input-text-group">
              <label htmlFor="select-pincode" className="input-label">Select Pincode</label>
              <select
                id="select-pincode"
                className="input-select-field"
                value={pincodeVal}
                onChange={handlePincodeChange}
                disabled={isPincodeDisabled}
              >
                <option value="">
                  {isPincodeDisabled ? 'Select City First' : (availablePincodes.length > 0 ? 'All Pincodes' : 'All Pincodes')}
                </option>
                {!isPincodeDisabled && availablePincodes.map((pin) => (
                  <option key={pin} value={pin}>{pin}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons: Find Property + Reset */}
          <div className="filter-actions-group">
            <button type="submit" className="btn-find-property" aria-label="Find Property">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Find Property
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                className="btn-filter-reset"
                onClick={handleReset}
                title="Reset Filters"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
