import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Rentasan — Rent Anything, List Everything',
  description: 'The premium rental marketplace. Rent furniture, electronics, appliances, sports gear, and more. Or list your own items and earn.',
  keywords: 'rent, rental, furniture, electronics, appliances, list products, earn money',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <div className="page-wrapper">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
