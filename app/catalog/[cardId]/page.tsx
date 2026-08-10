import css from './page.module.css';
import BookingForm from '@/components/BookingForm/BookingForm';

export default function DetailsPage() {
  return (
    <div className={css.container}>
      Catalog Card
      <div>
        image + form
        <BookingForm />
      </div>
      <div>car details</div>
    </div>
  );
}
