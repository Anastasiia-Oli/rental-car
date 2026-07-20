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
      <label>
        Car brand
        <select name="brand" value={filters.brand} onChange={handleChange}>
          <option value="">Choose a brand</option>

          {brands?.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}

export default Searchbar;
