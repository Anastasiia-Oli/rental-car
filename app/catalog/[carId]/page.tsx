import css from './page.module.css';
import BookingForm from '@/components/BookingForm/BookingForm';
import { getCarById } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';

interface DetailsPageProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({
  params,
}: DetailsPageProps): Promise<Metadata> {
  const { carId } = await params;

  try {
    const car = await getCarById(carId);
    const title = `${car.brand} ${car.model}, ${car.year}`;
    const description = `Rent a ${car.brand} ${car.model} from $${car.rentalPrice}/hour in ${car.location.city}, ${car.location.country}.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://YOUR-DOMAIN.vercel.app/catalog/${carId}`, // поменяй после деплоя
        images: [
          {
            url: car.img,
            width: 640,
            height: 512,
            alt: `${car.brand} ${car.model}`,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Car not found | RentalCar',
      description: 'Sorry, the car you are looking for does not exist.',
    };
  }
}

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { carId } = await params;

  let car;
  try {
    const response = await getCarById(carId);
    car = response;
  } catch {
    notFound();
  }

  return (
    <div className={css.container}>
      <div className={css.gallery}>
        <Image
          className={css.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
        />
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
            className={css.locationIcon}
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
            <li className={css.detailListItem} key={condition}>
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
          <li className={css.detailListItem}>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-calendar" />
            </svg>
            Year: {car.year}
          </li>
          <li className={css.detailListItem}>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-car" />
            </svg>
            Type: {car.type}
          </li>
          <li className={css.detailListItem}>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-fuel" />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={css.detailListItem}>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-gear" />
            </svg>
            Engine: {car.engine}
          </li>
          <li className={css.detailListItem}>
            <svg width="16" height="16" className={css.icon} aria-hidden="true">
              <use href="/sprite.svg#icon-road" />
            </svg>
            Mileage: {car.mileage} km
          </li>
        </ul>

        <h3 className={css.detailTitle}>Features:</h3>
        <ul className={css.detailList}>
          {car.features.map(feature => (
            <li className={css.detailListItem} key={feature}>
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
