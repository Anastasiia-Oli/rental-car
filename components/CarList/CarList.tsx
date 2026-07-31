'use client';

import { CarFilters, GetCarsResponse } from '@/types/filters.types';
import css from './CarList.module.css';
// import { useQuery } from '@tanstack/react-query';
import { getCars } from '@/lib/api';
import CarCard from '@/components/CarCard/CarCard';
import { useInfiniteQuery } from '@tanstack/react-query';

interface CarListProps {
  initialData: GetCarsResponse;
  filters: CarFilters;
}

function CarList({ initialData, filters }: CarListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['cars', filters],
      queryFn: ({ pageParam }) => getCars(filters, pageParam),
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    });

  const cars = data.pages.flatMap(page => page.cars);

  if (cars.length === 0) {
    return (
      <p className={css.noResults}>
        No cars found matching the selected filters.
      </p>
    );
  }

  return (
    <>
      <ul className={css.list}>
        {cars.map(car => (
          <li className={css.listItem} key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          type="button"
          className={css.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </>
  );
}

export default CarList;
