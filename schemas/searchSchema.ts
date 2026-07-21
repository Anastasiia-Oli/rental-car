import { z } from 'zod';

// The form fields work with strings (native input/select elements),
// and we convert them in CarFilters only after successful validation.
const mileageField = z
  .string()
  .refine(value => value === '' || /^\d+$/.test(value), {
    message: 'Mileage must be a number',
  });

export const searchSchema = z
  .object({
    brand: z.string(),
    price: z.string(),
    minMileage: mileageField,
    maxMileage: mileageField,
  })
  .refine(
    data => {
      if (data.minMileage === '' || data.maxMileage === '') return true;
      return Number(data.minMileage) <= Number(data.maxMileage);
    },
    {
      message: 'Min mileage can not be higher than max',
      path: ['maxMileage'],
    }
  );

export type SearchSchemaType = z.infer<typeof searchSchema>;

export const defaultSearchValues: SearchSchemaType = {
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',
};
