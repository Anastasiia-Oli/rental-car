import css from './page.module.css';
import BookingForm from '@/components/BookingForm/BookingForm';
import { getCarById } from '@/lib/api';
import { notFound } from 'next/navigation';

interface DetailsPageProps {
  params: Promise<{ carId: string }>;
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
      Catalog Card
      <div>
        image + form
        <BookingForm carId={car.id} />
      </div>
      <div>car details</div>
    </div>
  );
}
