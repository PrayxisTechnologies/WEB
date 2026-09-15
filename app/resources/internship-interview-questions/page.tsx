import { Metadata } from 'next';
import InterviewPrepClient from './InterviewPrepClient';

export const metadata: Metadata = {
  title: 'Virtual Internship Technical Interview Guide | PRAYXIS Internship Portal',
  description:
    'Prepare for software engineering virtual internship interviews with essential technical questions, resume tips, and project showcases.',
  alternates: {
    canonical: 'https://prayxis.in/resources/internship-interview-questions',
  },
  openGraph: {
    title: 'Virtual Internship Technical Interview Guide | PRAYXIS Internship Portal',
    description:
      'Essential interview preparation guide, technical questions, and resume advice for engineering students applying for internships.',
    url: 'https://prayxis.in/resources/internship-interview-questions',
    siteName: 'PRAYXIS Internship Portal',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': 'https://prayxis.in/resources/internship-interview-questions#article',
      url: 'https://prayxis.in/resources/internship-interview-questions',
      headline: 'Virtual Internship Technical Interview Guide',
      description:
        'Prepare for software engineering virtual internship interviews with essential technical questions, resume tips, and project showcases.',
      publisher: { '@id': 'https://prayxis.in/#educational-organization' },
      isPartOf: { '@id': 'https://prayxis.in/#website' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/resources/internship-interview-questions#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://prayxis.in' },
        { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://prayxis.in/resources' },
        { '@type': 'ListItem', position: 3, name: 'Interview Prep', item: 'https://prayxis.in/resources/internship-interview-questions' },
      ],
    },
  ],
};

export default function InterviewPrepPage() {
  return (
    <>
      <script
        id="prep-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <InterviewPrepClient />
    </>
  );
}
