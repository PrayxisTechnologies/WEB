import { Metadata } from 'next';
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: 'Student Tech Resources, Roadmaps & Guides | PRAYXIS Internship Portal',
  description:
    'Explore developer roadmaps, technical interview guides, Python project ideas, and career preparation articles for engineering students at PRAYXIS Internship Portal.',
  alternates: {
    canonical: 'https://prayxis.in/resources',
  },
  openGraph: {
    title: 'Student Tech Resources, Roadmaps & Guides | PRAYXIS Internship Portal',
    description:
      'Free developer roadmaps, student internship guides, programming tutorials, and tech career insights provided by PRAYXIS Internship Portal.',
    url: 'https://prayxis.in/resources',
    siteName: 'PRAYXIS Internship Portal',
    type: 'website',
    images: [
      {
        url: 'https://prayxis.in/assets/prayxis_logo.png',
        width: 800,
        height: 800,
        alt: 'PRAYXIS Internship Portal Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Resources & Roadmaps | PRAYXIS Internship Portal',
    description: 'Tech roadmaps, internship guides, and developer tutorials for students.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
  },
};

const resourcesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://prayxis.in/resources#webpage',
      url: 'https://prayxis.in/resources',
      name: 'Student Tech Resources, Roadmaps & Guides | PRAYXIS Internship Portal',
      isPartOf: { '@id': 'https://prayxis.in/#website' },
      description:
        'Explore developer roadmaps, technical interview guides, Python project ideas, and career preparation articles for engineering students.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/resources#breadcrumb',
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
          name: 'Student Resources',
          item: 'https://prayxis.in/resources',
        },
      ],
    },
  ],
};

export default function ResourcesPage() {
  return (
    <>
      <script
        id="resources-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesSchema) }}
      />
      <ResourcesClient />
    </>
  );
}
