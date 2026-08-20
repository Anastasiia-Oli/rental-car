import css from './page.module.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page was not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: 'Page was not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://08-zustand-coral.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note Hub',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.notContainer}>
      <picture>
        <source srcSet="/not-found@2x.webp 2x, /not-found@1x.webp 1x" />
        <Image
          className={css.notImage}
          src="/not-found@1x.webp"
          alt="No results"
          width={414}
          height={388}
        />
      </picture>
      <h1 className={css.notTitle}>404 - Page not found</h1>
      <p className={css.notDescription}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/catalog" className={css.notButton}>
        Back to Catalog
      </Link>
    </div>
  );
}
