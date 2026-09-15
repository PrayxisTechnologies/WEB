import { Metadata } from 'next';
import FullStackClient from './FullStackClient';

export const metadata: Metadata = {
  title: 'Full Stack Web Development Master Internship',
  description:
    'Master production full-stack web development with React, Node.js, Express, MongoDB Atlas, and REST API architecture in a 45-day hands-on internship at Prayxis Technologies.',
  alternates: {
    canonical: 'https://prayxis.in/courses/full-stack',
  },
  openGraph: {
    title: 'Full Stack Web Development Master Internship | Prayxis Technologies',
    description:
      'Master production full-stack web development with React, Node.js, Express, MongoDB Atlas, and REST API architecture in a 45-day hands-on internship.',
    url: 'https://prayxis.in/courses/full-stack',
  },
};

const fullStackSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://prayxis.in/courses/full-stack#webpage',
      url: 'https://prayxis.in/courses/full-stack',
      name: 'Full Stack Web Development Master Internship | Prayxis Technologies',
      isPartOf: { '@id': 'https://prayxis.in/#website' },
      description:
        'Master production full-stack web development with React, Node.js, Express, MongoDB Atlas, and REST API architecture in a 45-day hands-on internship.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/courses/full-stack#breadcrumb',
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
          name: 'Full Stack Web Development',
          item: 'https://prayxis.in/courses/full-stack',
        },
      ],
    },
    {
      '@type': 'Course',
      '@id': 'https://prayxis.in/courses/full-stack#course',
      name: 'Full Stack Web Development Master Internship',
      description:
        '45-day production full-stack engineering program covering React, Node.js, Express, and MongoDB Atlas with production cloud deployment.',
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

export default function FullStackCourseOverviewPage() {
  return (
    <>
      <script
        id="fullstack-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fullStackSchema) }}
      />
      <FullStackClient />
    </>
  );
}
