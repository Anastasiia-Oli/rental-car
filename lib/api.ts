import axios from 'axios';
import type { Car, CarBrand } from '@/types/car';
import type { CarFilters, GetCarsResponse } from '@/types/filters.types';

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
  const response = await axios.get<FiltersResponse>(`${BASE_URL}/cars/filters`);
  return response.data;
}

export async function getCars(filters: CarFilters): Promise<GetCarsResponse> {
  const response = await axios.get<GetCarsResponse>(`${BASE_URL}/cars`, {
    params: {
      ...filters, // brand, price, minMileage, maxMileage — only filled out
      // perPage / page  - later when i get to pagination
    },
  });
  return response.data;
}
