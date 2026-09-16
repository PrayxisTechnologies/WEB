import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'PRAYXIS Internship Portal — Industrial Software Engineering & Cybersecurity Training',
  description:
    'PRAYXIS Internship Portal delivers practical, project-based virtual internships in Full Stack Development, Ethical Hacking, Python, and AI with verifiable digital certificates from Prayxis Foundation.',
  keywords: [
    'PRAYXIS Internship Portal',
    'prayxis internship portal',
    'software engineering internship',
    'cybersecurity internship',
    'full stack web development',
    'ethical hacking course',
    'python internship',
    'AI generative AI training',
    'prayxis foundation',
    'prayxis internships',
    'live technical training India',
  ],
  alternates: {
    canonical: 'https://prayxis.in',
  },
  openGraph: {
    title: 'PRAYXIS Internship Portal — Software Engineering & Cybersecurity Training',
    description:
      'Gain practical, project-based live technical training & internships in Full Stack, Ethical Hacking, Python & AI with verifiable digital certificates on PRAYXIS Internship Portal.',
    url: 'https://prayxis.in',
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
    title: 'PRAYXIS Internship Portal — Software Engineering & Cybersecurity Training',
    description:
      'PRAYXIS Internship Portal offers practical, project-based virtual internships in Full Stack, Ethical Hacking, Python & AI.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
  },
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://prayxis.in/#webpage',
      url: 'https://prayxis.in',
      name: 'PRAYXIS Internship Portal — Industrial Software Engineering & Cybersecurity Training',
      isPartOf: { '@id': 'https://prayxis.in/#website' },
      about: { '@id': 'https://prayxis.in/#organization' },
      description:
        'Practical, project-based live technical training & internships in Full Stack Development, Ethical Hacking, Python, and AI with verifiable digital certificates on PRAYXIS Internship Portal.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://prayxis.in',
        },
      ],
    },
    {
      '@type': 'Course',
      '@id': 'https://prayxis.in/#course-15d-fullstack',
      name: '15 Days Full Stack Web Development Internship',
      description:
        '15-day project-based virtual internship covering HTML, CSS, JavaScript, and React fundamentals with live mentor guidance.',
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
        duration: 'P15D',
      },
    },
    {
      '@type': 'Course',
      '@id': 'https://prayxis.in/#course-45d-fullstack',
      name: '45 Days Full Stack Web Development Master Internship',
      description:
        '45-day production full-stack engineering program covering React, Node.js, Express, and MongoDB with production cloud deployment.',
      provider: { '@id': 'https://prayxis.in/#educational-organization' },
      offers: {
        '@type': 'Offer',
        price: '199',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        duration: 'P45D',
      },
    },
    {
      '@type': 'Course',
      '@id': 'https://prayxis.in/#course-3m-fullstack',
      name: '3 Months Full Stack Specialization Internship (Live Classes)',
      description:
        '3-month comprehensive live software engineering specialization covering advanced full stack architecture, microservices, and live capstone.',
      provider: { '@id': 'https://prayxis.in/#educational-organization' },
      offers: {
        '@type': 'Offer',
        price: '5999',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        duration: 'P3M',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomeClient />
    </>
  );
}
