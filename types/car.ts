export type CarBrand =
  | 'Aston Martin'
  | 'Audi'
  | 'BMW'
  | 'Bentley'
  | 'Buick'
  | 'Chevrolet'
  | 'Chrysler'
  | 'GMC'
  | 'HUMMER'
  | 'Hyundai'
  | 'Kia'
  | 'Lamborghini'
  | 'Land Rover'
  | 'Lincoln'
  | 'MINI'
  | 'Mercedes-Benz'
  | 'Mitsubishi'
  | 'Nissan'
  | 'Pontiac'
  | 'Subaru'
  | 'Volvo';

export interface Location {
  country: string;
  city: string;
  address: string;
}

export interface Car {
  id: string;
  year: number;
  brand: CarBrand;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  features: string[];
  location: Location;
  createdAt: string;
  updatedAt: string;
}
