import type { Metadata } from 'next';
import Searchbar from '@/components/Searchbar/Searchbar';
import { getCars, getFilters } from '@/lib/api';
import type { CarFilters } from '@/types/filters.types';

interface CatalogPageProps {
  searchParams: Promise<{
    brand?: string;
    price?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'RentalCar',
};

async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  const filters: CarFilters = {
    brand: params.brand || undefined,
    price: params.price ? Number(params.price) : undefined,
    minMileage: params.minMileage ? Number(params.minMileage) : undefined,
    maxMileage: params.maxMileage ? Number(params.maxMileage) : undefined,
  };

  const [carsData, filtersData] = await Promise.all([
    getCars(filters),
    getFilters(),
  ]);

  return (
    <div>
      Catalog
      <Searchbar filtersData={filtersData} />
    </div>
  );
}

export default CatalogPage;
