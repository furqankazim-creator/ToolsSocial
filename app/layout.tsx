import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CRAZZE.AI // Autonomous Social OS',
  description: 'Plan, review, and organize social media campaigns.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark font-poppins">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070a12] dark:text-slate-100 antialiased selection:bg-purple-600 selection:text-white font-poppins transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
