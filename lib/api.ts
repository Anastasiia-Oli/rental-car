import axios from 'axios';
import type { CarBrand, Car } from '@/types/car';
import type { CarFilters, GetCarsResponse } from '@/types/filters.types';
import { cache } from 'react';

const BASE_URL = 'https://car-rental-api.goit.study';
export const CARS_PER_PAGE = 12;

export interface FiltersResponse {
  brands: CarBrand[];
  price: {
    min: number;
    max: number;
  };
}

interface BookingRequestPayload {
  name: string;
  email: string;
  comment: string;
}

interface BookingResponse {
  message: string;
}

export async function getFilters(): Promise<FiltersResponse> {
  const response = await axios.get<FiltersResponse>(`${BASE_URL}/cars/filters`);
  return response.data;
}

export async function getCars(
  filters: CarFilters,
  page = 1
): Promise<GetCarsResponse> {
  const response = await axios.get<GetCarsResponse>(`${BASE_URL}/cars`, {
    params: {
      ...filters, // brand, price, minMileage, maxMileage — only filled out
      page,
      perPage: 12,
    },
  });
  return response.data;
}

export const getCarById = cache(async (carId: string): Promise<Car> => {
  const response = await axios.get<Car>(`${BASE_URL}/cars/${carId}`);
  return response.data;
});

export async function createBooking(
  carId: string,
  payload: BookingRequestPayload
): Promise<BookingResponse> {
  const response = await axios.post<BookingResponse>(
    `${BASE_URL}/cars/${carId}/booking-requests`,
    payload
  );
  return response.data;
}
