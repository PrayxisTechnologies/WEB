import { Metadata } from 'next';
import CyberSecurityClient from './CyberSecurityClient';

export const metadata: Metadata = {
  title: 'Cyber Security & Ethical Hacking Virtual Internship | PRAYXIS Internship Portal',
  description:
    'Enroll in the 45-day Cyber Security & Ethical Hacking virtual internship at PRAYXIS Internship Portal. Learn network defense, vulnerability assessment, ethical hacking concepts, and security protocols.',
  alternates: {
    canonical: 'https://prayxis.in/courses/cyber-security',
  },
  openGraph: {
    title: 'Cyber Security & Ethical Hacking Virtual Internship | PRAYXIS Internship Portal',
    description:
      'Learn network security, ethical hacking fundamentals, penetration testing concepts, and security operations in a hands-on virtual internship program at PRAYXIS Internship Portal.',
    url: 'https://prayxis.in/courses/cyber-security',
    siteName: 'PRAYXIS Internship Portal',
    type: 'website',
    images: [
      {
        url: 'https://prayxis.in/assets/prayxis_logo.png',
        width: 800,
        height: 800,
        alt: 'PRAYXIS Internship Portal Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Security Internship | PRAYXIS Internship Portal',
    description: '45-day practical Cyber Security & Ethical Hacking virtual training program for students.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
  },
};

const cyberSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://prayxis.in/courses/cyber-security#webpage',
      url: 'https://prayxis.in/courses/cyber-security',
      name: 'Cyber Security & Ethical Hacking Virtual Internship | PRAYXIS Internship Portal',
      isPartOf: { '@id': 'https://prayxis.in/#website' },
      description:
        'Learn network security, ethical hacking fundamentals, penetration testing concepts, and security operations in a hands-on virtual internship program at PRAYXIS Internship Portal.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/courses/cyber-security#breadcrumb',
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
          name: 'Academy Programs',
          item: 'https://prayxis.in/courses',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Cyber Security & Ethical Hacking',
          item: 'https://prayxis.in/courses/cyber-security',
        },
      ],
    },
    {
      '@type': 'Course',
      '@id': 'https://prayxis.in/courses/cyber-security#course',
      name: 'Cyber Security & Ethical Hacking Virtual Internship',
      description:
        '45-day virtual cybersecurity track covering networking fundamentals, vulnerability assessment, Linux command line security, web security basics, and ethical defense.',
      provider: { '@id': 'https://prayxis.in/#educational-organization' },
      offers: {
        '@type': 'Offer',
        price: '99',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        duration: 'P45D',
      },
    },
  ],
};

export default function CyberSecurityPage() {
  return (
    <>
      <script
        id="cyber-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cyberSchema) }}
      />
      <CyberSecurityClient />
    </>
  );
}
