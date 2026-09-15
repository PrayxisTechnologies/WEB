import { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: 'Full Stack Developer Learning Roadmap 2026 | PRAYXIS Internship Portal',
  description:
    'Detailed step-by-step roadmap for engineering students to become full-stack web developers. Learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and internship prep.',
  alternates: {
    canonical: 'https://prayxis.in/resources/full-stack-developer-roadmap',
  },
  openGraph: {
    title: 'Full Stack Developer Learning Roadmap 2026 | PRAYXIS Internship Portal',
    description:
      'Step-by-step roadmap covering frontend, backend, databases, REST APIs, and virtual internship preparation.',
    url: 'https://prayxis.in/resources/full-stack-developer-roadmap',
    siteName: 'PRAYXIS Internship Portal',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': 'https://prayxis.in/resources/full-stack-developer-roadmap#article',
      url: 'https://prayxis.in/resources/full-stack-developer-roadmap',
      headline: 'Full Stack Developer Learning Roadmap 2026',
      description:
        'Detailed step-by-step roadmap for engineering students to master frontend, backend, databases, REST APIs, and production deployment.',
      publisher: { '@id': 'https://prayxis.in/#educational-organization' },
      isPartOf: { '@id': 'https://prayxis.in/#website' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/resources/full-stack-developer-roadmap#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://prayxis.in' },
        { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://prayxis.in/resources' },
        { '@type': 'ListItem', position: 3, name: 'Full Stack Roadmap', item: 'https://prayxis.in/resources/full-stack-developer-roadmap' },
      ],
    },
  ],
};

export default function RoadmapPage() {
  return (
    <>
      <script
        id="roadmap-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleClient />
    </>
  );
}
