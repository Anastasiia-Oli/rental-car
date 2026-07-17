'use client';

export interface CarFilters {
  brand?: string;
  rentalPrice?: string;
  mileageFrom?: string;
  mileageTo?: string;
}

import { useState } from 'react';

function Searchbar() {
  const [filters, setFilters] = useState<CarFilters>({
    brand: '',
    rentalPrice: '',
    mileageFrom: '',
    mileageTo: '',
  });
  //   const [brand, setBrand] = useState('');
  //   const [price, setPrice] = useState('');
  //   const [from, setFrom] = useState('');
  //   const [to, setTo] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Car brand
        <select name="brand" value={filters.brand} onChange={handleChange}>
          <option value="">Choose a brand</option>

          {brands?.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}

export default Searchbar;
