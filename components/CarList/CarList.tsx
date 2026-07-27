import css from './CarList.module.css';
import type { Car } from '@/types/filters.types';
import { useQuery } from '@tanstack/react-query';
import { getCars } from '@/lib/api';
import Link from 'next/link';

type CarListProps = {
  cars: Car[];
};

function CarList({ cars }: CarListProps) {
  return (
    <ul className={css.list}>
      {cars.map(car => (
        <li className={css.listItem} key={car.id}>
          <div className={css.titleContainer}>
            <h2 className={css.title}>
              {car.brand} <span className={css.model}>{car.model}</span>,{' '}
              {car.year}
            </h2>
            <div className={css.price}>{car.rentalPrice}</div>
          </div>
          <div className={css.detailsContainer}>
            {car.location.city} {car.location.country} {car.rentalCompany}{' '}
            {car.type} {car.mileage}km
          </div>
          <Link href={`/catalog/${car.id}`} className={css.detailsBtn}>
            Read more
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CarList;
