import { Metadata } from 'next';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
  title: 'Student Registration — Create FREE Account',
  description:
    'Create a free student account on Prayxis Foundation to access live technical training, virtual software engineering internships, and verifiable digital credentials.',
  alternates: {
    canonical: 'https://prayxis.in/register',
  },
  openGraph: {
    title: 'Student Registration — Create FREE Account | Prayxis Technologies',
    description:
      'Create a free student account on Prayxis Foundation to access live technical training and virtual software engineering internships.',
    url: 'https://prayxis.in/register',
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
    title: 'Student Registration — Create FREE Account | Prayxis',
    description: 'Join over 2,00,000+ engineering students upskilling with Prayxis Foundation.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
  },
};

const registerSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://prayxis.in/register#webpage',
      url: 'https://prayxis.in/register',
      name: 'Student Registration — Create FREE Account | Prayxis Technologies',
      isPartOf: { '@id': 'https://prayxis.in/#website' },
      description:
        'Create a free student account on Prayxis Foundation to access live technical training, virtual software engineering internships, and verifiable digital credentials.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/register#breadcrumb',
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
          name: 'Student Registration',
          item: 'https://prayxis.in/register',
        },
      ],
    },
  ],
};

export default function RegisterPage() {
  return (
    <>
      <script
        id="register-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(registerSchema) }}
      />
      <RegisterClient />
    </>
  );
}
