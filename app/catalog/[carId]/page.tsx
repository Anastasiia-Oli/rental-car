import css from './page.module.css';
import BookingForm from '@/components/BookingForm/BookingForm';
import { getCarById } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface DetailsPageProps {
  params: Promise<{ carId: string }>;
}

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { carId } = await params;

  let car;
  try {
    const response = await getCarById(carId);
    car = response;
  } catch (error) {
    console.error('[DetailsPage] getCarById failed', error);
    console.log('params:', params);
    notFound();
  }

  return (
    <div className={css.container}>
      Catalog Card
      <div className={css.gallery}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
        />
        image + form
        <BookingForm carId={car.id} />
      </div>
      <div className={css.details}>
        <div className={css.titleContainer}>
          <h2 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h2>
          <p className={css.article}>Article: {car.stockNumber}</p>
        </div>
        <p className={css.location}>
          <svg
            width="16"
            height="16"
            className={css.errorIcon}
            aria-hidden="true"
          >
            <use href="/sprite.svg#icon-location" />
          </svg>
          {car.location.city}, {car.location.country}
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>

        <h3 className={css.detailTitle}>Rental Conditions:</h3>
        <ul className={css.detailList}>
          {car.rentalConditions.map(condition => (
            <li key={condition}>
              <svg
                width="16"
                height="16"
                className={css.icon}
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-check" />
              </svg>
              {condition}
            </li>
          ))}
        </ul>

        <h3 className={css.detailTitle}>Car Specifications:</h3>
        <ul className={css.detailList}>
          <li>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-calendar" />
            </svg>
            Year: {car.year}
          </li>
          <li>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-car" />
            </svg>
            Type: {car.type}
          </li>
          <li>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-fuel" />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-gear" />
            </svg>
            Engine: {car.engine}
          </li>
          <li>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-road" />
            </svg>
            Mileage: {car.mileage} km
          </li>
        </ul>

        <h3 className={css.detailTitle}>Features:</h3>
        <ul className={css.detailList}>
          {car.features.map(feature => (
            <li key={feature}>
              <svg
                width="16"
                height="16"
                className={css.icon}
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-check" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
