import type { SearchSchemaType } from '@/schemas/searchSchema';
import type { CarFilters } from '@/types/filters.types';

// Empty string -> undefined (The field will not be included in the query),
// entered value -> Number
export function mapSearchValuesToCarFilters(
  values: SearchSchemaType
): CarFilters {
  return {
    brand: values.brand || undefined,
    price: values.price ? Number(values.price) : undefined,
    minMileage: values.minMileage ? Number(values.minMileage) : undefined,
    maxMileage: values.maxMileage ? Number(values.maxMileage) : undefined,
  };
}

// Utility for generating price increments in fixed $10 increments
export function buildPriceOptions(
  min: number,
  max: number,
  step = 10
): number[] {
  const options: number[] = [];
  let current = Math.ceil(min / step) * step;

  if (current < min) current += step;

  for (; current <= max; current += step) {
    options.push(current);
  }

  // We guarantee that the upper bound is included in the list
  if (options[options.length - 1] !== max) {
    options.push(max);
  }

  return options;
}
