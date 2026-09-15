import { Metadata } from 'next';
import StudentCoursesClient from './StudentCoursesClient';

export const metadata: Metadata = {
  title: 'My Enrolled Internships & Courses | Student Portal',
  description:
    'Access your enrolled Prayxis technical internship tracks, daily learning modules, live timer tracking, and certificate verification.',
  alternates: {
    canonical: 'https://prayxis.in/student/courses',
  },
  openGraph: {
    title: 'My Enrolled Internships & Courses | Prayxis Student Portal',
    description:
      'Access your enrolled Prayxis technical internship tracks, daily learning modules, live timer tracking, and certificate verification.',
    url: 'https://prayxis.in/student/courses',
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
    title: 'My Enrolled Internships & Courses | Prayxis Student Portal',
    description: 'Access your enrolled Prayxis technical internship tracks & daily modules.',
    images: ['https://prayxis.in/assets/prayxis_logo.png'],
  },
};

export default function StudentCoursesPage() {
  return <StudentCoursesClient />;
}
