import css from './CarCard.module.css';
import Link from 'next/link';
import type { Car } from '@/types/filters.types';
import Image from 'next/image';

interface CarCardProps {
  car: Car;
}

function formatMileage(mileage: number): string {
  return mileage.toLocaleString('en-US').replace(/,/g, ' ');
}

function CarCard({ car }: CarCardProps) {
  return (
    <div className={css.card}>
      <Image
        className={css.image}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={244}
        height={268}
      />

      <div className={css.titleContainer}>
        <p
          className={css.title}
          title={`${car.brand} ${car.model}, ${car.year}`}
        >
          {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <div className={css.meta}>
        <p className={css.metaLine}>
          <span>{car.location.city}</span>
          <span>{car.location.country}</span>
          <span>{car.rentalCompany}</span>
        </p>
        <p className={css.metaLine}>
          <span>{car.type}</span>
          <span>{formatMileage(car.mileage)} km</span>
        </p>
      </div>

      <Link href={`/catalog/${car.id}`} className={css.button}>
        Read more
      </Link>
    </div>
  );
}

export default CarCard;
