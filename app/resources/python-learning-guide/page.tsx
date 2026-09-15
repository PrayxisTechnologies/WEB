import { Metadata } from 'next';
import PythonGuideClient from './PythonGuideClient';

export const metadata: Metadata = {
  title: 'Python Learning Guide & Beginner Project Ideas | PRAYXIS Internship Portal',
  description:
    'Learn Python programming from scratch with real project ideas, syntax tips, data structures, and virtual internship preparation steps.',
  alternates: {
    canonical: 'https://prayxis.in/resources/python-learning-guide',
  },
  openGraph: {
    title: 'Python Learning Guide & Beginner Project Ideas | PRAYXIS Internship Portal',
    description:
      'Step-by-step Python programming guide for students, including OOPs, data structures, and practical project ideas.',
    url: 'https://prayxis.in/resources/python-learning-guide',
    siteName: 'PRAYXIS Internship Portal',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': 'https://prayxis.in/resources/python-learning-guide#article',
      url: 'https://prayxis.in/resources/python-learning-guide',
      headline: 'Python Learning Guide & Beginner Project Ideas',
      description:
        'Learn Python programming from scratch with real project ideas, syntax tips, data structures, and virtual internship preparation steps.',
      publisher: { '@id': 'https://prayxis.in/#educational-organization' },
      isPartOf: { '@id': 'https://prayxis.in/#website' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/resources/python-learning-guide#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://prayxis.in' },
        { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://prayxis.in/resources' },
        { '@type': 'ListItem', position: 3, name: 'Python Learning Guide', item: 'https://prayxis.in/resources/python-learning-guide' },
      ],
    },
  ],
};

export default function PythonGuidePage() {
  return (
    <>
      <script
        id="pyguide-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PythonGuideClient />
    </>
  );
}
