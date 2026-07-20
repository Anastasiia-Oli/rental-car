// Итоговый объект фильтров, который уходит в API-запрос списка машин.
// Поля опциональны: если не выбраны — просто не попадают в query.
export interface CarFilters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

// Ответ GET /filters
export interface FiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

// Ответ GET /cars (используем только то, что нужно сейчас)
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
