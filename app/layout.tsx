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
  metadataBase: new URL('https://prayxis.in'),
  title: {
    default: 'Prayxis Technologies — Software Engineering & Cybersecurity Internships',
    template: '%s | Prayxis Technologies',
  },
  description:
    'Prayxis Technologies (Prayxis) offers hands-on industrial software engineering, cybersecurity, ethical hacking, Python, and full-stack development virtual internships and training across India.',
  keywords: [
    'Prayxis',
    'Prayxis Technologies',
    'Prayxis Foundation',
    'Software Engineering Internship',
    'Cybersecurity Internship',
    'Ethical Hacking Training',
    'Full Stack Web Development',
    'Python Coding Bootcamp',
    'AI and LLM Training',
  ],
  authors: [{ name: 'Prayxis Technologies' }],
  alternates: {
    canonical: 'https://prayxis.in',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Prayxis Technologies — Software Engineering & Cybersecurity Internships',
    description:
      'Prayxis Technologies (Prayxis) offers hands-on industrial software engineering, cybersecurity, ethical hacking, and full-stack development virtual internships across India.',
    url: 'https://prayxis.in',
    siteName: 'Prayxis Technologies',
    images: [
      {
        url: 'https://prayxis.in/assets/prayxis_logo.png',
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
    title: 'Prayxis Technologies — Software Engineering & Cybersecurity Internships',
    description:
      'Prayxis Technologies (Prayxis) offers hands-on industrial software engineering, cybersecurity, ethical hacking, and full-stack development virtual internships.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
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
  verification: {
    google: 'mZPKo6H3gW1uPMjIgC5nk4BhXjMicx23c0VmoywUowA',
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
      '@id': 'https://prayxis.in/#organization',
      name: 'Prayxis Technologies',
      legalName: 'Prayxis Technologies',
      alternateName: ['Prayxis', 'prayxis', 'Prayxis Tech', 'Prayxis Foundation'],
      url: 'https://prayxis.in',
      logo: 'https://prayxis.in/assets/prayxis_logo.png',
      image: 'https://prayxis.in/assets/prayxis_logo.png',
      description:
        'Prayxis Technologies provides hands-on industrial software engineering, cybersecurity, Python, and AI training and virtual internships across India.',
      email: 'info@prayxis.in',
      sameAs: ['https://prayxis.in'],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://prayxis.in/#educational-organization',
      name: 'Prayxis Foundation',
      url: 'https://prayxis.in',
      logo: 'https://prayxis.in/assets/prayxis_logo.png',
      description:
        'National technical education initiative offering project-based virtual internships and verifiable digital certificates.',
      parentOrganization: {
        '@id': 'https://prayxis.in/#organization',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://prayxis.in/#website',
      url: 'https://prayxis.in',
      name: 'Prayxis Technologies',
      alternateName: 'Prayxis',
      publisher: {
        '@id': 'https://prayxis.in/#organization',
      },
      inLanguage: 'en-US',
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
        <meta name="google-site-verification" content="mZPKo6H3gW1uPMjIgC5nk4BhXjMicx23c0VmoywUowA" />
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
