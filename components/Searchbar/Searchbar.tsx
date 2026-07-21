'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import {
  searchSchema,
  defaultSearchValues,
  type SearchSchemaType,
} from '@/schemas/searchSchema';
import { buildPriceOptions } from '@/utils/mapSearchValues';
import type { FiltersResponse } from '@/types/filters.types';
import css from './SearchBar.module.css';

interface SearchBarProps {
  filtersData: FiltersResponse;
}

function Searchbar({ filtersData }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      brand: searchParams.get('brand') ?? '',
      price: searchParams.get('price') ?? '',
      minMileage: searchParams.get('minMileage') ?? '',
      maxMileage: searchParams.get('maxMileage') ?? '',
    },
  });

  const priceOptions = useMemo(
    () => buildPriceOptions(filtersData.price.min, filtersData.price.max, 10),
    [filtersData]
  );

  const onSubmit = (values: SearchSchemaType) => {
    const params = new URLSearchParams();

    if (values.brand) params.set('brand', values.brand);
    if (values.price) params.set('price', values.price);
    if (values.minMileage) params.set('minMileage', values.minMileage);
    if (values.maxMileage) params.set('maxMileage', values.maxMileage);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    reset(defaultSearchValues);
    // empty object -> parent makes a request without query parameters -> default directory
    router.push(pathname); // without query -> default catalog
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className={css.field}>
        Car brand
        <select className={css.select} {...register('brand')}>
          <option value="">Choose a brand</option>

          {filtersData?.brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label className={css.field}>
        <select className={css.select} {...register('price')}>
          <option value="">Price/1 hour</option>
          {priceOptions.map(price => (
            <option key={price} value={price}>
              To ${price}
            </option>
          ))}
        </select>
      </label>

      <label className={css.mileageGroup}>
        <span className={css.mileageLabel}>Mileage from</span>
        <input
          className={css.mileageInput}
          type="text"
          inputMode="numeric"
          placeholder="From"
          {...register('minMileage')}
        />

        <span className={css.mileageLabel}>To</span>
        <input
          className={css.mileageInput}
          type="text"
          inputMode="numeric"
          placeholder="To"
          {...register('maxMileage')}
        />
      </label>

      {(errors.minMileage || errors.maxMileage) && (
        <p className={css.error}>
          {errors.maxMileage?.message ?? errors.minMileage?.message}
        </p>
      )}

      <div className={css.actions}>
        <button type="submit" className={css.searchButton}>
          Search
        </button>
        <button type="button" className={css.clearButton} onClick={handleClear}>
          Clear filters
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
