import css from './page.module.css';
import Link from 'next/link';

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
