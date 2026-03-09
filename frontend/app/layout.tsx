import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart WhatsApp Expense Tracker',
  description: 'WhatsApp integrated expense tracking PWA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
