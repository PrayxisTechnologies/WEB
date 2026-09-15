import { Metadata } from 'next';
import CoursesClient from './CoursesClient';

export const metadata: Metadata = {
  title: 'Academy Programs & Technical Internships',
  description:
    'Explore industry-aligned software engineering, cybersecurity, ethical hacking, Python, and full-stack development internship programs at Prayxis Technologies.',
  alternates: {
    canonical: 'https://prayxis.in/courses',
  },
  openGraph: {
    title: 'Academy Programs & Technical Internships | Prayxis Technologies',
    description:
      'Explore industry-aligned software engineering, cybersecurity, ethical hacking, Python, and full-stack development internship programs at Prayxis Technologies.',
    url: 'https://prayxis.in/courses',
  },
};

const coursesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://prayxis.in/courses#webpage',
      url: 'https://prayxis.in/courses',
      name: 'Academy Programs & Technical Internships | Prayxis Technologies',
      isPartOf: { '@id': 'https://prayxis.in/#website' },
      description:
        'Explore industry-aligned software engineering, cybersecurity, ethical hacking, Python, and full-stack development internship programs at Prayxis Technologies.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/courses#breadcrumb',
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
          name: 'Academy Internships',
          item: 'https://prayxis.in/courses',
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': 'https://prayxis.in/courses#course-list',
      name: 'Prayxis Technical Internship Programs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          url: 'https://prayxis.in/courses/full-stack',
          name: 'Full Stack Web Development Master Internship',
        },
        {
          '@type': 'ListItem',
          position: 2,
          url: 'https://prayxis.in/courses',
          name: 'Basic Ethical Hacking & Cyber Defense',
        },
        {
          '@type': 'ListItem',
          position: 3,
          url: 'https://prayxis.in/courses',
          name: 'Python Basics & DSA Zero-to-Hero',
        },
      ],
    },
  ],
};

export default function CoursesPage() {
  return (
    <>
      <script
        id="courses-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
      />
      <CoursesClient />
    </>
  );
}
