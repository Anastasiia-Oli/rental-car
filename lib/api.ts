import axios from 'axios';
import type { Car, CarBrand } from '@/types/car';

const BASE_URL = 'https://car-rental-api.goit.study';

export interface FiltersResponse {
  brands: CarBrand[];
  price: {
    min: number;
    max: number;
  };
}

export interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export async function getFilters(): Promise<FiltersResponse> {
  const response = await axios.get<FiltersResponse>(`${BASE_URL}/filters`);
  return response.data;
}
