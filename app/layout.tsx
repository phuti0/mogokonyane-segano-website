import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ClientProviders } from '@/components/ClientProviders';

// Primary font - Clean, modern sans-serif
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Display font - Elegant serif for headings (optional accent)
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mogokonyane-Segano Holdings | Empowering South African Farmers',
  description: 'Connecting rural farmers with urban markets through technology-driven solutions. Access marketplace, farming knowledge, and sustainable agriculture resources.',
  keywords: 'agriculture, farming, South Africa, agritech, marketplace, rural development, sustainable farming',
  authors: [{ name: 'Mogokonyane-Segano Holdings' }],
  openGraph: {
    title: 'Mogokonyane-Segano Holdings',
    description: 'Empowering South African farmers with market access, knowledge, and digital tools.',
    type: 'website',
    locale: 'en_ZA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <ClientProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
