import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import ClientWrapper from './components/ClientWrapper';
import Modal from './components/Modals/Modal';
import RegisterModal from './components/Modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';

export const metadata: Metadata = {
  title: 'Escapade',
  description: 'Escapade - Travel & Booking!'
};

const font = Nunito({
  subsets: ['latin']
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientWrapper>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientWrapper>
        {children}
      </body>
    </html>
  );
}
