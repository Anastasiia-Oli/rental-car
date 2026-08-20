// The final filter object that is included in the API request for the list of machines.
// Fields are optional: if not selected, they are simply not included in the query.
export interface CarFilters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

// Answer GET /filters
export interface FiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

// Answer GET /cars
export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  rentalConditions: string[];
  mileage: number;
}

export interface GetCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
