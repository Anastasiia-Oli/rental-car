import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import { TanStackProvider } from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'sonner';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://твой-домен.vercel.app'), // подставь реальный домен после деплоя
  title: {
    default: 'RentalCar',
    template: '%s | RentalCar',
  },
  description:
    'Rent a car online — browse our catalog, compare brands and prices, and book in minutes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Toaster position="top-right" richColors />
        </TanStackProvider>
      </body>
    </html>
  );
}
