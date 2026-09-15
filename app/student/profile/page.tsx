import { Metadata } from 'next';
import StudentProfileClient from './StudentProfileClient';

export const metadata: Metadata = {
  title: 'Student Profile & Security Console',
  description:
    'Manage your Prayxis Foundation student account profile, account verification status, learning time metrics, and active enrollments.',
  alternates: {
    canonical: 'https://prayxis.in/student/profile',
  },
  openGraph: {
    title: 'Student Profile & Security Console | Prayxis Technologies',
    description:
      'Manage your Prayxis Foundation student account profile, account verification status, and active enrollments.',
    url: 'https://prayxis.in/student/profile',
    siteName: 'Prayxis Technologies',
    type: 'website',
    images: [
      {
        url: 'https://prayxis.in/assets/prayxis_logo.png',
        width: 800,
        height: 800,
        alt: 'Prayxis Technologies Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Profile & Security Console | Prayxis',
    description: 'Manage your Prayxis student account profile & verification status.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
  },
};

export default function StudentProfilePage() {
  return <StudentProfileClient />;
}
