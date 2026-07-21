'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import {
  searchSchema,
  defaultSearchValues,
  type SearchSchemaType,
} from '@/schemas/searchSchema';
import { getFilters } from '@/lib/api';
import {
  mapSearchValuesToCarFilters,
  buildPriceOptions,
} from '@/utils/mapSearchValues';
import type { CarFilters } from '@/types/filters.types';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (filters: CarFilters) => void;
}

function Searchbar({ onSearch }: SearchBarProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: defaultSearchValues,
    mode: 'onSubmit',
  });

  const { data: filtersData, isLoading } = useQuery({
    queryKey: ['filters'],
    queryFn: getFilters,
  });

  const priceOptions = useMemo(() => {
    if (!filtersData?.price) return [];
    return buildPriceOptions(filtersData.price.min, filtersData.price.max, 10);
  }, [filtersData]);

  const onSubmit = (values: SearchSchemaType) => {
    onSearch(mapSearchValuesToCarFilters(values));
  };

  const handleClear = () => {
    reset(defaultSearchValues);
    // empty object -> parent makes a request without query parameters -> default directory
    onSearch({});
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className={css.field}>
        Car brand
        <select
          className={css.select}
          disabled={isLoading}
          {...register('brand')}
        >
          <option value="">Choose a brand</option>

          {filtersData?.brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label className={css.field}>
        <select
          className={css.select}
          disabled={isLoading}
          {...register('price')}
        >
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
