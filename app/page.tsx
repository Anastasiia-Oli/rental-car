import css from './page.module.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Find your perfect rental car — reliable and budget-friendly rentals for any journey. Browse our catalog and book online.',
  openGraph: {
    title: 'RentalCar — Find your perfect rental car',
    description:
      'Reliable and budget-friendly rentals for any journey. Browse our catalog and book online.',
    url: '/', //change after deployment
    images: [
      {
        url: '/home-pic@1x.webp',
        width: 1200,
        height: 630,
        alt: 'RentalCar',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main className={css.home}>
      <div className={css.container}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link className={css.link} href="/catalog" aria-label="Catalog">
          View Catalog
        </Link>
      </div>
    </main>
  );
}
