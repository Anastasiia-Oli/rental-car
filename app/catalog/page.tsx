import type { Metadata } from 'next';
import Searchbar from '@/components/Searchbar/Searchbar';

export const metadata: Metadata = {
  title: 'RentalCar',
};

const Catalog = () => {
  return (
    <div>
      Catalog
      <Searchbar />
    </div>
  );
};

export default Catalog;
