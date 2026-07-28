'use client';

import { CarFilters, GetCarsResponse } from '@/types/filters.types';
import css from './CarList.module.css';
import { useQuery } from '@tanstack/react-query';
import { getCars } from '@/lib/api';
import CarCard from '@/components/CarCard/CarCard';

interface CarListProps {
  initialData: GetCarsResponse;
  filters: CarFilters;
}

function CarList({ initialData, filters }: CarListProps) {
  const { data } = useQuery({
    queryKey: ['cars', filters],
    queryFn: () => getCars(filters),
    initialData,
  });

  if (data.cars.length === 0) {
    return (
      <p className={css.noResults}>
        No cars found matching the selected filters.
      </p>
    );
  }

  return (
    <ul className={css.list}>
      {data.cars.map(car => (
        <li className={css.listItem} key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}

export default CarList;
