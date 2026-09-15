import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Prayxis Technologies',
    short_name: 'Prayxis',
    description:
      'Prayxis Technologies — Build. Secure. Innovate. Leading software development, cybersecurity, and industry internship platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050507',
    theme_color: '#050507',
    icons: [
      {
        src: '/assets/prayxis_logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/prayxis_logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
