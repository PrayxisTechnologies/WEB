import { Metadata } from 'next';
import PythonClient from './PythonClient';

export const metadata: Metadata = {
  title: 'Python Programming & DSA Virtual Internship | PRAYXIS Internship Portal',
  description:
    'Enroll in the 45-day Python Programming & Data Structures internship at PRAYXIS Internship Portal. Master Python syntax, OOPs, algorithms, automation, and real student projects.',
  alternates: {
    canonical: 'https://prayxis.in/courses/python',
  },
  openGraph: {
    title: 'Python Programming & DSA Virtual Internship | PRAYXIS Internship Portal',
    description:
      'Master Python syntax, OOPs, data structures, automation, and project development in a hands-on virtual internship program at PRAYXIS Internship Portal.',
    url: 'https://prayxis.in/courses/python',
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
    title: 'Python Virtual Internship | PRAYXIS Internship Portal',
    description: '45-day hands-on Python & Data Structures internship program for engineering students.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
  },
};

const pythonSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://prayxis.in/courses/python#webpage',
      url: 'https://prayxis.in/courses/python',
      name: 'Python Programming & DSA Virtual Internship | PRAYXIS Internship Portal',
      isPartOf: { '@id': 'https://prayxis.in/#website' },
      description:
        'Master Python syntax, OOPs, data structures, automation, and project development in a hands-on virtual internship program at PRAYXIS Internship Portal.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/courses/python#breadcrumb',
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
          name: 'Python Programming & DSA',
          item: 'https://prayxis.in/courses/python',
        },
      ],
    },
    {
      '@type': 'Course',
      '@id': 'https://prayxis.in/courses/python#course',
      name: 'Python Programming & Data Structures Internship',
      description:
        '45-day Python specialization covering basic syntax, object-oriented programming, file handling, automation, and core data structures.',
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
    {
      '@type': 'FAQPage',
      '@id': 'https://prayxis.in/courses/python#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who can apply for the Python Internship?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Diploma, B.Tech, BCA, BSc, and MCA students of any academic year looking to learn Python from scratch and build real projects.',
          },
        },
        {
          '@type': 'Question',
          name: 'What topics are covered in the Python internship curriculum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Topics include Python fundamentals, loops, functions, OOPs, file I/O, error handling, lists/tuples/dictionaries, and basic algorithmic problem solving.',
          },
        },
      ],
    },
  ],
};

export default function PythonCoursePage() {
  return (
    <>
      <script
        id="python-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pythonSchema) }}
      />
      <PythonClient />
    </>
  );
}
