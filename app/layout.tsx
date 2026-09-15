import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';
import React from 'react';
import '@/lib/utils/logoSync';

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
  title: 'Prayxis Technologies | Official Site — Software & Cybersecurity',
  description:
    'Prayxis Technologies (Prayxis) is a leading innovator in digital products, cybersecurity solutions, software development, and hands-on industry training. Visit the official Prayxis website.',
  keywords: [
    'Prayxis',
    'Prayxis Technologies',
    'prayxis',
    'prayxis technologies',
    'Cybersecurity',
    'Software Engineering',
    'EdTech',
    'Tech Internships',
    'Prayxis Official',
  ],
  authors: [{ name: 'Prayxis Technologies' }],
  alternates: {
    canonical: 'https://prayxis.com',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Prayxis Technologies | Official Site — Software & Cybersecurity',
    description:
      'Prayxis Technologies (Prayxis) is a leading innovator in digital products, cybersecurity solutions, software development, and hands-on industry training.',
    url: 'https://prayxis.com',
    siteName: 'Prayxis Technologies',
    images: [
      {
        url: 'https://prayxis.com/assets/prayxis_logo.png',
        width: 800,
        height: 800,
        alt: 'Prayxis Technologies Official Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prayxis Technologies | Official Site — Software & Cybersecurity',
    description:
      'Prayxis Technologies (Prayxis) is a leading innovator in digital products, cybersecurity solutions, software development, and hands-on industry training.',
    images: ['https://prayxis.com/assets/prayxis_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://prayxis.com/#organization',
      name: 'Prayxis Technologies',
      legalName: 'Prayxis Technologies',
      alternateName: ['Prayxis', 'prayxis', 'Prayxis Tech', 'Prayxis Technologies'],
      url: 'https://prayxis.com',
      logo: 'https://prayxis.com/assets/prayxis_logo.png',
      image: 'https://prayxis.com/assets/prayxis_logo.png',
      description:
        'Prayxis Technologies (Prayxis) builds high-impact digital products, software solutions, cybersecurity platforms, and industry-grade training programs.',
      sameAs: ['https://prayxis.com'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://prayxis.com/#website',
      url: 'https://prayxis.com',
      name: 'Prayxis Technologies',
      alternateName: 'Prayxis',
      publisher: {
        '@id': 'https://prayxis.com/#organization',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://prayxis.com/#edu',
      name: 'Prayxis Technologies',
      url: 'https://prayxis.com',
      logo: 'https://prayxis.com/assets/prayxis_logo.png',
      description: 'National industrial skill-development platform bridging university curriculum with production-grade engineering and cybersecurity.',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          id="json-ld-graph"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="bg-prayxis-bg text-prayxis-offwhite antialiased selection:bg-prayxis-accent/20 selection:text-white font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
