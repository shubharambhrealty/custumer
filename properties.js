/**
 * Shubharambh Reality - Property Database
 * Har property ka Latitude, Longitude aur Button URLs yaha se manage karein.
 */
const propertyList = [
  {
    id: 1,
    plotId: 1,
    status: "available",
    statusLabel: "Available",
    title: "3 BHK Luxury Villa",
    locality: "Gomti Nagar, Lucknow",
    price: "₹ 1.25 Cr",
    type: "sale",
    lat: 26.8500,
    lng: 80.9990,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    detailsUrl: "https://example.com/property/gomti-nagar-villa",
    contactUrl: "https://wa.me/919876543210?text=Hi, I am interested in Plot 1 - 3 BHK Luxury Villa at Gomti Nagar"
  },
  {
    id: 2,
    plotId: 2,
    status: "selling",
    statusLabel: "Selling Fast",
    title: "Modern 2 BHK Flat",
    locality: "Hazratganj, Lucknow",
    price: "₹ 24,000 / mo",
    type: "rent",
    lat: 26.8467,
    lng: 80.9462,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
    detailsUrl: "https://example.com/property/hazratganj-flat",
    contactUrl: "https://wa.me/919876543210?text=Hi, I want to rent Plot 2 - Modern 2 BHK Flat at Hazratganj"
  },
  {
    id: 3,
    plotId: 3,
    status: "sold",
    statusLabel: "Sold Out",
    title: "Royal Heights Township",
    locality: "Aliganj, Lucknow",
    price: "₹ 85 Lakh onwards",
    type: "project",
    lat: 26.8870,
    lng: 80.9410,
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80",
    detailsUrl: "https://example.com/property/royal-heights-aliganj",
    contactUrl: "https://wa.me/919876543210?text=Hi, please share details for Plot 3 - Royal Heights Township Aliganj"
  },
  {
    id: 4,
    plotId: 4,
    status: "available",
    statusLabel: "Available",
    title: "Prime Commercial Showroom",
    locality: "Charbagh, Lucknow",
    price: "₹ 2.10 Cr",
    type: "commercial",
    lat: 26.8300,
    lng: 80.9250,
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
    detailsUrl: "https://example.com/property/charbagh-showroom",
    contactUrl: "https://wa.me/919876543210?text=Hi, I am interested in Plot 4 - Commercial Showroom Charbagh"
  },
  {
    id: 5,
    plotId: 5,
    status: "selling",
    statusLabel: "Selling Fast",
    title: "Green View Residency",
    locality: "Jankipuram, Lucknow",
    price: "₹ 62 Lakh",
    type: "sale",
    lat: 26.9150,
    lng: 80.9380,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
    detailsUrl: "https://example.com/property/green-view-jankipuram",
    contactUrl: "https://wa.me/919876543210?text=Hi, I am interested in Plot 5 - Green View Residency Jankipuram"
  },
  {
    id: 6,
    plotId: 6,
    status: "sold",
    statusLabel: "Sold Out",
    title: "Indira Nagar Plots",
    locality: "Indira Nagar, Lucknow",
    price: "₹ 4,500 / sq.ft",
    type: "project",
    lat: 26.8800,
    lng: 80.9850,
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
    detailsUrl: "https://example.com/property/indira-nagar-plots",
    contactUrl: "https://wa.me/919876543210?text=Hi, I want details regarding Plot 6 - Indira Nagar Plots"
  },
  {
    id: 7,
    plotId: 7,
    status: "upcoming",
    statusLabel: "Upcoming",
    title: "Mahanagar Boutique Home",
    locality: "Mahanagar, Lucknow",
    price: "₹ 95 Lakh",
    type: "sale",
    lat: 26.8700,
    lng: 80.9550,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    detailsUrl: "https://example.com/property/mahanagar-boutique-home",
    contactUrl: "https://wa.me/919876543210?text=Hi, I want to book visit for Plot 7 - Mahanagar Boutique Home"
  },
  {
    id: 8,
    plotId: 8,
    status: "available",
    statusLabel: "Available",
    title: "Corporate Office Hub",
    locality: "Krishna Nagar, Lucknow",
    price: "₹ 65,000 / mo",
    type: "commercial",
    lat: 26.7900,
    lng: 80.8900,
    img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80",
    detailsUrl: "https://example.com/property/krishna-nagar-office",
    contactUrl: "https://wa.me/919876543210?text=Hi, I am interested in renting Plot 8 - Corporate Office Hub at Krishna Nagar"
  },
  {
    id: 9,
    plotId: 9,
    status: "upcoming",
    statusLabel: "Upcoming",
    title: "Sarojini Nagar Estate",
    locality: "Sarojini Nagar, Lucknow",
    price: "₹ 1.10 Cr",
    type: "sale",
    lat: 26.7580,
    lng: 80.8650,
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&q=80",
    detailsUrl: "https://example.com/property/sarojini-nagar-estate",
    contactUrl: "https://wa.me/919876543210?text=Hi, I am interested in Plot 9 - Sarojini Nagar Estate"
  },
  {
    id: 10,
    plotId: 10,
    status: "selling",
    statusLabel: "Selling Fast",
    title: "Shubharambh Prime Enclave",
    locality: "Kanpur - Lucknow Highway Corridor",
    price: "₹ 45 Lakh onwards",
    type: "project",
    lat: 26.409528,
    lng: 80.389415,
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80",
    detailsUrl: "https://shubharambhrealty.eformx.com/property/prime-enclave",
    contactUrl: "https://wa.me/919876543210?text=Hi, I am interested in Plot 10 - Shubharambh Prime Enclave at Kanpur Highway (26.409528, 80.389415)"
  }
];

const nearbyAmenities = [
  {
    id: 'bank-1',
    name: 'Central Bank of India',
    branch: 'Rooma Branch',
    category: 'bank',
    icon: '🏦',
    lat: 26.4118,
    lng: 80.3922,
    desc: 'Full Service Branch & 24x7 ATM'
  },
  {
    id: 'bank-2',
    name: 'Baroda UP Bank',
    branch: 'Highway Branch',
    category: 'bank',
    icon: '🏦',
    lat: 26.4065,
    lng: 80.3860,
    desc: 'Rural & Commercial Banking'
  },
  {
    id: 'bank-3',
    name: 'State Bank of India (SBI)',
    branch: 'ATM & e-Corner',
    category: 'bank',
    icon: '🏦',
    lat: 26.4138,
    lng: 80.3855,
    desc: 'Cash Deposit Machine & ATM'
  },
  {
    id: 'bank-4',
    name: 'Punjab National Bank',
    branch: 'Chakeri Branch',
    category: 'bank',
    icon: '🏦',
    lat: 26.4152,
    lng: 80.3948,
    desc: 'PNB Retail & NRI Banking'
  },
  {
    id: 'fuel-1',
    name: 'Highway Fuel Plaza',
    branch: 'Indian Oil 24x7',
    category: 'fuel',
    icon: '⛽',
    lat: 26.4082,
    lng: 80.3938,
    desc: 'Fuel, EV Fast Charging & Snacks'
  },
  {
    id: 'health-1',
    name: 'Highway Health Center',
    branch: 'First Aid & Pharmacy',
    category: 'health',
    icon: '🏥',
    lat: 26.4124,
    lng: 80.3878,
    desc: '24x7 Emergency First Aid & Medical'
  }
];
