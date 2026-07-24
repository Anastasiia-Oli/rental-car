'use client';

import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import {
  searchSchema,
  defaultSearchValues,
  type SearchSchemaType,
} from '@/schemas/searchSchema';
import { buildPriceOptions } from '@/utils/mapSearchValues';
import type { FiltersResponse } from '@/types/filters.types';
import CustomSelect from '../CustomSelect/CustomSelect';
import css from './Searchbar.module.css';

interface SearchBarProps {
  filtersData: FiltersResponse;
}

function Searchbar({ filtersData }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    control,
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
      <div className={css.field}>
        Car brand
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <CustomSelect
              value={field.value ?? ''}
              onValueChange={field.onChange}
              placeholder="Choose a brand"
              options={filtersData.brands}
            />
          )}
        />
      </div>

      <div className={css.field}>
        Price / 1 hour
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <CustomSelect
              value={field.value ?? ''}
              onValueChange={field.onChange}
              placeholder="Choose a price"
              options={priceOptions}
              formatLabel={price => `To $${price}`}
            />
          )}
        />
      </div>

      <label className={css.mileageGroup}>
        Car mileage / km
        <div className={css.mileageContainer}>
          <input
            className={css.mileageInputFrom}
            type="text"
            inputMode="numeric"
            placeholder="From"
            {...register('minMileage')}
          />
          <input
            className={css.mileageInputTo}
            type="text"
            inputMode="numeric"
            placeholder="To"
            {...register('maxMileage')}
          />
        </div>
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
