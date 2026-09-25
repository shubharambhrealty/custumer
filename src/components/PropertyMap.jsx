import React, { useEffect, useRef, useState, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function PropertyMap({
  activeFilter = 'all',
  properties = [],
  isLoading = false,
  searchCriteria = { state: '', city: '', pincode: '' },
  onResetSearch,
  onSelectProperty
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const searchContainerRef = useRef(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapMode, setMapMode] = useState('vector'); // 'vector' (Roadmap) or 'satellite' (Hybrid)
  const [is3D, setIs3D] = useState(false);
  const is3DRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    is3DRef.current = is3D;
  }, [is3D]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close open popup dialog when tapping anywhere outside on the website
  useEffect(() => {
    const handleGlobalTap = (e) => {
      if (e.target.closest('.maplibregl-popup') || e.target.closest('.map-house-marker')) {
        return;
      }
      markersRef.current.forEach((item) => {
        if (item.popup && item.popup.isOpen()) {
          item.popup.remove();
        }
      });
    };

    document.addEventListener('pointerdown', handleGlobalTap);
    return () => document.removeEventListener('pointerdown', handleGlobalTap);
  }, []);

  // Filter properties based on Tab, Cascading Search Criteria & Text Search
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // 1. Tab category filter (Buy, Rent, Project, Commercial)
      if (activeFilter !== 'all' && p.type !== activeFilter) {
        return false;
      }

      // 2. State filter
      if (searchCriteria.state && p.state) {
        if (p.state.toLowerCase() !== searchCriteria.state.toLowerCase()) {
          return false;
        }
      }

      // 3. City filter
      if (searchCriteria.city && p.city) {
        if (p.city.toLowerCase() !== searchCriteria.city.toLowerCase()) {
          return false;
        }
      }

      // 4. Pincode filter
      if (searchCriteria.pincode && p.pincode) {
        if (p.pincode !== searchCriteria.pincode) {
          return false;
        }
      }

      return true;
    });
  }, [properties, activeFilter, searchCriteria]);

  // Search input dropdown suggestions (Plot ID or Location)
  const searchResults = searchQuery.trim() === '' ? [] : filteredProperties.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchId = String(p.plotId) === q || `plot ${p.plotId}`.includes(q) || `plot id ${p.plotId}`.includes(q) || `plot-${p.plotId}`.includes(q);
    const matchLoc = (p.locality || '').toLowerCase().includes(q);
    const matchTitle = (p.title || '').toLowerCase().includes(q);
    const matchCity = (p.city || '').toLowerCase().includes(q);
    return matchId || matchLoc || matchTitle || matchCity;
  });

  const goToProperty = (p) => {
    const map = mapRef.current;
    if (!map) return;
    setSearchQuery(`Plot ${p.plotId} - ${p.locality || p.city}`);
    setIsDropdownOpen(false);

    map.easeTo({
      center: [p.lng, p.lat],
      zoom: 17.5,
      pitch: is3DRef.current ? 60 : 0,
      offset: [0, -60],
      duration: 1100
    });

    const item = markersRef.current.find((m) => m.plotId === p.plotId);
    if (item && item.popup) {
      item.popup.addTo(map);
    }
  };

  // Initialize MapLibre
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/bright',
      center: [80.389415, 26.409528], // Centered around Kanpur - Lucknow Corridor
      zoom: 12,
      maxZoom: 20,
      pitch: 0,
      bearing: 0,
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-left');

    map.on('load', () => {
      // 1. Google Roadmap Source
      map.addSource('source-google-roads', {
        type: 'raster',
        tiles: [
          'https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2',
          'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2',
          'https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2',
          'https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2'
        ],
        tileSize: 256,
        maxzoom: 19
      });

      // 2. Google Hybrid Satellite Source
      map.addSource('source-google-sat', {
        type: 'raster',
        tiles: [
          'https://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&scale=2',
          'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&scale=2',
          'https://mt2.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&scale=2',
          'https://mt3.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&scale=2'
        ],
        tileSize: 256,
        maxzoom: 19
      });

      map.addLayer({
        id: 'layer-google-sat',
        type: 'raster',
        source: 'source-google-sat',
        layout: { visibility: 'none' },
        paint: { 'raster-resampling': 'linear', 'raster-fade-duration': 0 }
      });

      map.addLayer({
        id: 'layer-google-roads',
        type: 'raster',
        source: 'source-google-roads',
        layout: { visibility: 'visible' },
        paint: { 'raster-resampling': 'linear', 'raster-fade-duration': 0 }
      });
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((item) => {
        if (item.marker) item.marker.remove();
        else if (item.remove) item.remove();
      });
      map.remove();
    };
  }, []);

  // Update map markers when filtered properties change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((item) => {
      if (item.marker) item.marker.remove();
      else if (item.remove) item.remove();
    });
    markersRef.current = [];

    if (filteredProperties.length === 0) {
      return;
    }

    // Group plots that are within ~100m (0.001 deg) of each other so they are laid out side-by-side
    const groups = [];
    filteredProperties.forEach((p) => {
      if (!p.lat || !p.lng || isNaN(p.lat) || isNaN(p.lng)) return;
      const lat = Number(p.lat);
      const lng = Number(p.lng);

      let group = groups.find((g) => Math.hypot(g.centerLat - lat, g.centerLng - lng) < 0.001);
      if (group) {
        group.items.push(p);
      } else {
        groups.push({ centerLat: lat, centerLng: lng, items: [p] });
      }
    });

    // Render each group side-by-side in a horizontal line
    groups.forEach((group) => {
      // Natural numerical order: 10, 11, 12, 13
      group.items.sort((a, b) => Number(a.plotId) - Number(b.plotId));

      const total = group.items.length;
      const spacing = 46; // 46px gap ensures markers never touch or overlap
      const totalSpan = (total - 1) * spacing;

      group.items.forEach((p, idx) => {
        const dx = total > 1 ? Math.round(idx * spacing - totalSpan / 2) : 0;
        const pixelOffset = [dx, 0];

        const el = document.createElement('div');
        const statusClass = `pin-status-${p.status || 'available'}`;

        el.className = `shubharambh-marker ${statusClass}`;
        el.innerHTML = `
          <div class="marker-pin-wrapper">
            <div class="marker-pin-circle">
              <img src="/marker-logo.png" alt="Shubharambh" class="marker-pin-logo" />
            </div>
            <div class="marker-pin-tip"></div>
          </div>
          <div class="marker-plot-tag">${p.plotId}</div>
        `;

        // Popup HTML content with action buttons
        const popupHtml = `
          <div class="property-popup">
            <img src="${p.img}" alt="${p.title}" class="popup-img" />
            <div class="popup-body">
              <div class="popup-tags-row">
                <span class="popup-plot-badge">Plot ID: ${p.plotId}</span>
                <span class="popup-status-badge badge-status-${p.status || 'available'}">
                  ${p.statusLabel || (p.status === 'selling' ? 'Selling Fast' : p.status === 'sold' ? 'Sold Out' : p.status === 'upcoming' ? 'Upcoming' : 'Available')}
                </span>
              </div>
              <h4 class="popup-title">${p.title}</h4>
              <div class="popup-price">${p.price}</div>
              <div class="popup-loc">📍 ${p.locality || p.city}</div>
              <div class="popup-actions">
                <button type="button" class="popup-btn btn-view" data-plot-id="${p.plotId}">
                  View Details
                </button>
                <a href="${p.contactUrl}" target="_blank" rel="noopener noreferrer" class="popup-btn btn-contact">
                  Contact Agent
                </a>
              </div>
            </div>
          </div>
        `;

        const popup = new maplibregl.Popup({
          offset: 24,
          closeButton: true,
          closeOnClick: true,
          maxWidth: '260px'
        }).setHTML(popupHtml);

        popup.on('open', () => {
          map.easeTo({
            center: [p.lng, p.lat],
            zoom: Math.max(map.getZoom(), 16),
            pitch: is3DRef.current ? 60 : 0,
            offset: [0, -60],
            duration: 900
          });

          // Attach click handler to View Details button
          setTimeout(() => {
            const btn = document.querySelector(`.btn-view[data-plot-id="${p.plotId}"]`);
            if (btn) {
              btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onSelectProperty) {
                  onSelectProperty(p);
                } else {
                  setSelectedProperty(p);
                }
              };
            }
          }, 50);
        });

        el.addEventListener('click', (e) => {
          if (popup.isOpen()) {
            popup.remove();
            e.stopPropagation();
          }
        });

        const marker = new maplibregl.Marker({
          element: el,
          offset: pixelOffset
        })
          .setLngLat([p.lng, p.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push({ plotId: p.plotId, marker, popup, lng: p.lng, lat: p.lat });
      });
    });

    // Auto-fit map to show all matching markers
    const bounds = new maplibregl.LngLatBounds();
    let hasCoords = false;
    filteredProperties.forEach((p) => {
      if (p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng)) {
        bounds.extend([p.lng, p.lat]);
        hasCoords = true;
      }
    });

    if (hasCoords) {
      map.fitBounds(bounds, { padding: 80, maxZoom: 14, duration: 800 });
    }
  }, [filteredProperties]);

  const toggleMapMode = (mode) => {
    const map = mapRef.current;
    if (!map) return;
    setMapMode(mode);

    if (map.getLayer('layer-google-roads') && map.getLayer('layer-google-sat')) {
      if (mode === 'satellite') {
        map.setLayoutProperty('layer-google-roads', 'visibility', 'none');
        map.setLayoutProperty('layer-google-sat', 'visibility', 'visible');
      } else {
        map.setLayoutProperty('layer-google-roads', 'visibility', 'visible');
        map.setLayoutProperty('layer-google-sat', 'visibility', 'none');
      }
    }
  };

  const set3DMode = (enable3D) => {
    const map = mapRef.current;
    if (!map) return;
    setIs3D(enable3D);
    map.easeTo({
      pitch: enable3D ? 60 : 0,
      bearing: enable3D ? -20 : 0,
      duration: 1000
    });
  };

  return (
    <section className="map-section" id="properties-map">
      <div className="map-card-wrapper">
        {/* Floating Top Controls */}
        <div className="map-top-bar">
          {/* Smart Search Bar (Plot ID or Location) */}
          <div className="map-search-container" ref={searchContainerRef}>
            <div className="map-search-input-wrap">
              <span className="map-search-icon">🔍</span>
              <input
                type="text"
                className="map-search-input"
                placeholder="Search Plot ID or Location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => {
                  if (searchQuery.trim()) setIsDropdownOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    goToProperty(searchResults[0]);
                  }
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="map-search-clear-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setIsDropdownOpen(false);
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown Suggestions */}
            {isDropdownOpen && searchResults.length > 0 && (
              <div className="map-search-dropdown">
                {searchResults.map((p) => (
                  <div
                    key={p.plotId}
                    className="map-search-item"
                    onClick={() => goToProperty(p)}
                  >
                    <span className={`search-item-badge badge-${p.status || 'available'}`}>
                      Plot {p.plotId}
                    </span>
                    <div className="search-item-info">
                      <div className="search-item-title">{p.title}</div>
                      <div className="search-item-loc">📍 {p.locality || p.city}</div>
                    </div>
                    <span className="search-item-price">{p.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dedicated Simple (2D) and 3D View Buttons */}
          <div className="map-view-switch">
            <button
              type="button"
              className={`layer-toggle-btn ${!is3D ? 'active' : ''}`}
              onClick={() => set3DMode(false)}
            >
              Simple (2D)
            </button>
            <button
              type="button"
              className={`layer-toggle-btn ${is3D ? 'active' : ''}`}
              onClick={() => set3DMode(true)}
            >
              3D View
            </button>
          </div>

          <div className="map-layer-switch">
            <button
              type="button"
              className={`layer-toggle-btn ${mapMode === 'vector' ? 'active' : ''}`}
              onClick={() => toggleMapMode('vector')}
            >
              Map
            </button>
            <button
              type="button"
              className={`layer-toggle-btn ${mapMode === 'satellite' ? 'active' : ''}`}
              onClick={() => toggleMapMode('satellite')}
            >
              Satellite
            </button>
          </div>
        </div>

        {/* Map Container Viewport */}
        <div ref={mapContainerRef} className="map-viewport">
          {/* Not Found State Banner when 0 properties match filter */}
          {filteredProperties.length === 0 && !isLoading && (
            <div className="map-not-found-overlay">
              <div className="map-not-found-card">
                <span className="not-found-icon">📍</span>
                <h3 className="not-found-title">No Properties Found</h3>
                <p className="not-found-text">
                  There are no properties matching your current search or filters.
                </p>
                {onResetSearch && (
                  <button
                    type="button"
                    className="btn-not-found-reset"
                    onClick={onResetSearch}
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Legend Bar Below Map */}
        <div className="map-bottom-legend-bar">
          <div className="map-bottom-legend-item">
            <span className="legend-dot-circle available"></span>
            <span>Available ( 🟢 )</span>
          </div>
          <div className="map-bottom-legend-item">
            <span className="legend-dot-circle selling"></span>
            <span>Selling Fast ( 🟡 )</span>
          </div>
          <div className="map-bottom-legend-item">
            <span className="legend-dot-circle sold"></span>
            <span>Sold Out ( 🔴 )</span>
          </div>
          <div className="map-bottom-legend-item">
            <span className="legend-dot-circle upcoming"></span>
            <span>Upcoming ( ⚪ )</span>
          </div>
        </div>
      </div>
    </section>
  );
}
