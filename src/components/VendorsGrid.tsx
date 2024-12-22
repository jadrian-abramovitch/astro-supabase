import { useState } from 'react';
import type { ReactElement } from 'react';

interface Vendor {
  id: string | number;
  name: string;
  image: string;
  rating: number;
  services: string;
}

interface Props {
  initialVendors: Vendor[];
  initialSearchQuery: string;
  initialRatingFilter: string;
  initialServiceFilter: string;
}

export default function VendorsGrid({ 
  initialVendors, 
  initialSearchQuery,
  initialRatingFilter,
  initialServiceFilter 
}: Props): ReactElement {
  const [vendors, setVendors] = useState(initialVendors);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [ratingFilter, setRatingFilter] = useState(initialRatingFilter);
  const [serviceFilter, setServiceFilter] = useState(initialServiceFilter);
  const filteredVendors = (query: string, rating: string, service: string) => {
    const searchParams = new URLSearchParams();
    
    if (query) {
      searchParams.set('search', query);
    }
    
    if (rating) {
      searchParams.set('rating', rating);
    }
    
    if (service) {
      searchParams.set('service', service);
    }

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
    window.location.reload();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    // Create debounced search with 1.5s delay
    const timeoutId = setTimeout(() => {
      filteredVendors(e.target.value, ratingFilter, serviceFilter);
    }, 1000);

    // Cleanup timeout on next change
    return () => clearTimeout(timeoutId);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRatingFilter(e.target.value);
    filteredVendors(searchQuery, e.target.value, serviceFilter);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServiceFilter(e.target.value);
    filteredVendors(searchQuery, ratingFilter, e.target.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Search vendors by name..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <select 
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={ratingFilter}
          onChange={handleRatingChange}
        >
          <option value="">Filter by rating</option>
          <option value="5">5 stars</option>
          <option value="4">4+ stars</option>
          <option value="3">3+ stars</option>
        </select>
        <select 
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={serviceFilter}
          onChange={handleServiceChange}
        >
          <option value="">Filter by service</option>
          <option value="photography">Photography</option>
          <option value="catering">Catering</option>
          <option value="venue">Venue</option>
          <option value="flowers">Flowers</option>
          <option value="music">Music</option>
          <option value="food">Food</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map(vendor => (
          <a 
            key={vendor.id}
            href={`/vendor/${vendor.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
          >
            <img src={vendor.image} alt={`${vendor.name} profile`} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">{"★".repeat(Math.floor(vendor.rating)) + "☆".repeat(5-Math.floor(vendor.rating))}</span>
                <span className="ml-2">{vendor.rating}</span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Services:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{vendor.services}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
} 