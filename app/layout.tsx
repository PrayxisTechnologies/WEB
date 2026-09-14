import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';
import React from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PRAYXIS — Build. Secure. Innovate.',
  description:
    'PRAYXIS builds digital products, software and security solutions for the modern digital world.',
  keywords: ['PRAYXIS', 'Technology', 'Cybersecurity', 'Software', 'Digital Products', 'Innovation'],
  authors: [{ name: 'PRAYXIS' }],
  openGraph: {
    title: 'PRAYXIS — Build. Secure. Innovate.',
    description:
      'PRAYXIS builds digital products, software and security solutions for the modern digital world.',
    url: 'https://prayxis.com',
    siteName: 'PRAYXIS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRAYXIS — Build. Secure. Innovate.',
    description:
      'PRAYXIS builds digital products, software and security solutions for the modern digital world.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-prayxis-bg text-prayxis-offwhite antialiased selection:bg-prayxis-accent/20 selection:text-white font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
