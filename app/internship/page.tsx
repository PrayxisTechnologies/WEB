import type { Metadata } from 'next';
import InternshipClient from './InternshipClient';

export const metadata: Metadata = {
  title: 'PRAYXIS Internship Portal — Programs, Eligibility & Application',
  description:
    'Explore virtual technical internships on PRAYXIS Internship Portal. Hands-on programs in Full Stack Web Development, Ethical Hacking, Python & AI for engineering and IT students.',
  keywords: [
    'PRAYXIS Internship Portal',
    'prayxis internship portal',
    'prayxis virtual internship',
    'engineering student internship india',
    'btech internship online',
    'bca mca internship project',
    'python internship program',
    'full stack web development internship',
    'ethical hacking virtual internship',
  ],
  alternates: {
    canonical: 'https://prayxis.in/internship',
  },
  openGraph: {
    title: 'PRAYXIS Internship Portal — Programs, Eligibility & Application',
    description:
      'Explore virtual technical internships on PRAYXIS Internship Portal. Hands-on project training in Full Stack, Ethical Hacking, Python & AI for engineering students.',
    url: 'https://prayxis.in/internship',
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
    title: 'PRAYXIS Internship Portal — Programs & Application',
    description:
      'Explore virtual technical internships on PRAYXIS Internship Portal. Hands-on project training in Full Stack, Ethical Hacking, Python & AI.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
  },
};

const internshipSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://prayxis.in/internship#webpage',
      url: 'https://prayxis.in/internship',
      name: 'PRAYXIS Internship Portal — Programs, Eligibility & Application',
      isPartOf: { '@id': 'https://prayxis.in/#website' },
      about: { '@id': 'https://prayxis.in/#organization' },
      description:
        'Explore virtual technical internships on PRAYXIS Internship Portal. Hands-on programs in Full Stack Web Development, Ethical Hacking, Python & AI for engineering and IT students.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://prayxis.in/internship#breadcrumb',
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
          name: 'PRAYXIS Internship Portal',
          item: 'https://prayxis.in/internship',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://prayxis.in/internship#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is eligible to apply on the PRAYXIS Internship Portal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Students enrolled in B.Tech, M.Tech, BCA, MCA, BBA, MBA, or Diploma courses across all branches and academic years are eligible.',
          },
        },
        {
          '@type': 'Question',
          name: 'What internship durations are offered by PRAYXIS Internship Portal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PRAYXIS offers 15-Day Fast-Track, 45-Day Production Master, and 3-Month Specialization virtual internship programs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are PRAYXIS internship certificates digitally verifiable?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, all certificates issued by Prayxis Foundation include a unique SHA-256 cryptographic ID verified live at prayxis.in.',
          },
        },
      ],
    },
  ],
};

export default function InternshipPage() {
  return (
    <>
      <script
        id="internship-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(internshipSchema) }}
      />
      <InternshipClient />
    </>
  );
}
