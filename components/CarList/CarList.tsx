import css from './CarList.module.css';
import type { Car } from '@/types/filters.types';

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
            <></>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CarList;
