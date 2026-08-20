'use client';

import { CarFilters, GetCarsResponse } from '@/types/filters.types';
import css from './CarList.module.css';
import { getCars } from '@/lib/api';
import CarCard from '@/components/CarCard/CarCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';

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
      <div className={css.noResultsContainer}>
        <picture>
          <source srcSet="/not-found@2x.webp 2x, /not-found@1x.webp 1x" />
          <Image
            className={css.noResultsImage}
            src="/not-found@1x.webp"
            alt="No results"
            width={414}
            height={388}
          />
        </picture>
        <h2 className={css.noResultsTitle}>No cars found</h2>
        <p className={css.noResultsDetails}>
          We couldn&apos;t find any cars that match your current filters. Try
          adjusting your search criteria, or use the &quot;Clear filters&quot;
          button above to reset them.
        </p>
      </div>
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
