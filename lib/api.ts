import axios from 'axios';
import type { Car, CarBrand } from '@/types/car';

const BASE_URL = 'https://car-rental-api.goit.study';

export interface GetBrandsResponse {
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

export async function getBrands(): Promise<GetBrandsResponse> {
  const response = await axios.get<GetBrandsResponse>(`${BASE_URL}/filters`);
  return response.data;
}
