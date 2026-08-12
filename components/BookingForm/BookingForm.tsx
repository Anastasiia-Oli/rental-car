'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import css from './BookingForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '@/lib/api';

const bookingFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name.')
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, 'Please enter your name.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .email('Please enter your email.'),
  comment: z.string().trim().min(1, 'Comment is required'),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  carId: string;
}

export default function BookingForm({ carId }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    mode: 'onSubmit',
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: BookingFormValues) => createBooking(carId, data),
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      const response = await mutateAsync(data);
      reset();

      toast.success(response.message ?? 'Booking request sent!');
    } catch {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.field}>
          <div className={css.inputWrapper}>
            <input
              id="name"
              type="text"
              placeholder=" "
              className={`${css.input} ${errors.name ? css.inputError : ''}`}
              {...register('name')}
            />
            <label htmlFor="name" className={css.label}>
              Name*
            </label>
            {errors.name && (
              <svg
                width="24"
                height="24"
                className={css.errorIcon}
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-error" />
              </svg>
            )}
          </div>
          {errors.name && (
            <p className={css.errorText}>{errors.name.message}</p>
          )}
        </div>

        <div className={css.field}>
          <div className={css.inputWrapper}>
            <input
              id="email"
              type="email"
              placeholder=" "
              className={`${css.input} ${errors.email ? css.inputError : ''}`}
              {...register('email')}
            />
            <label htmlFor="email" className={css.label}>
              Email*
            </label>
            {errors.email && (
              <svg
                width="24"
                height="24"
                className={css.errorIcon}
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-error" />
              </svg>
            )}
          </div>
          {errors.email && (
            <p className={css.errorText}>{errors.email.message}</p>
          )}
        </div>

        <div className={css.field}>
          <div className={css.inputWrapper}>
            <textarea
              id="comment"
              placeholder=" "
              rows={4}
              className={`${css.textarea} ${errors.comment ? css.inputError : ''}`}
              {...register('comment')}
            />
            <label htmlFor="comment" className={css.label}>
              Comment
            </label>
            {errors.comment && (
              <svg
                width="24"
                height="24"
                className={css.errorIcon}
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-error" />
              </svg>
            )}
          </div>
          {errors.comment && (
            <p className={css.errorText}>{errors.comment.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting || isPending}
        >
          Send
        </button>
      </form>
    </div>
  );
}
