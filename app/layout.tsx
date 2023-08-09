import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import ClientWrapper from './components/ClientWrapper';
import RegisterModal from './components/Modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/Modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

export const metadata: Metadata = {
  title: 'Escapade',
  description: 'Escapade - Travel & Booking!'
};

const font = Nunito({
  subsets: ['latin']
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientWrapper>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientWrapper>
        {children}
      </body>
    </html>
  );
}
