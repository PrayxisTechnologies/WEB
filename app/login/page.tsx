import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Student Portal Login',
  description:
    'Log in to your Prayxis Foundation student learning portal to access course modules, daily timer tracking, mentor reviews, and digital certificates.',
  alternates: {
    canonical: 'https://prayxis.in/login',
  },
  openGraph: {
    title: 'Student Portal Login | Prayxis Technologies',
    description:
      'Log in to your Prayxis Foundation student learning portal to access course modules and internship tracking.',
    url: 'https://prayxis.in/login',
    siteName: 'Prayxis Technologies',
    type: 'website',
    images: [
      {
        url: 'https://prayxis.in/assets/prayxis_logo.png',
        width: 800,
        height: 800,
        alt: 'Prayxis Technologies Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Portal Login | Prayxis',
    description: 'Access your engineering learning console, timer & courses.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
  },
};

const loginSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://prayxis.in/login#webpage',
      url: 'https://prayxis.in/login',
      name: 'Student Portal Login | Prayxis Technologies',
      isPartOf: { '@id': 'https://prayxis.in/#website' },
      description:
        'Log in to your Prayxis Foundation student learning portal to access course modules, daily timer tracking, mentor reviews, and digital certificates.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/login#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://prayxis.in',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Student Login',
          item: 'https://prayxis.in/login',
        },
      ],
    },
  ],
};

export default function LoginPage() {
  return (
    <>
      <script
        id="login-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(loginSchema) }}
      />
      <LoginClient />
    </>
  );
}
