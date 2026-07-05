import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import VisitTracker from '@/components/analytics/VisitTracker';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = 'https://rajeshrk-dev.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rajesh Kumar Jena | Full Stack Developer',
    template: '%s | Rajesh Kumar Jena',
  },
  description:
    'Rajesh Kumar Jena is a Full Stack Developer passionate about building scalable, user-focused applications. Expert in React, Next.js, Python, FastAPI, and more.',
  keywords: [
    'Rajesh Kumar Jena',
    'Rajesh Jena',
    'Rajesh RK',
    'Rajesh Kumar',
    'RajeshRK',
    'Full Stack Developer',
    'Full Stack Developer Portfolio',
    'React Developer',
    'Next.js Developer',
    'Python Developer',
    'FastAPI Developer',
    'Django Developer',
    'Flask Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'React.js',
    'Next.js',
    'React Native',
    'Redux',
    'REST API Developer',
    'PostgreSQL',
    'SQL Developer',
    'AWS Developer',
    'Docker',
    'Git',
    'GitHub',
    'Software Engineer',
    'Web Developer India',
    'Software Developer',
    'Software Developer India',
    'Software Developer Portfolio',
    'Software Developer Odisha',
    'Software Developer Cuttack',
    'Software Developer Bhubaneswar',
    'Software Developer Chennai',
    'Portfolio',
  ],
  authors: [{ name: 'Rajesh Kumar Jena', url: SITE_URL }],
  creator: 'Rajesh Kumar Jena',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Rajesh Kumar Jena | Full Stack Developer',
    description:
      'Full Stack Developer passionate about building scalable, user-focused applications. Expert in React, Next.js, Python, FastAPI, and more.',
    siteName: 'Rajesh Kumar Jena',
    images: [
      {
        url: '/profile.png',
        width: 1200,
        height: 630,
        alt: 'Rajesh Kumar Jena',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajesh Kumar Jena | Full Stack Developer',
    description:
      'Full Stack Developer passionate about building scalable, user-focused applications.',
    images: ['/profile.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Rajesh Kumar Jena',
              url: SITE_URL,
              image: `${SITE_URL}/profile.png`,
              jobTitle: 'Full Stack Developer',
              description:
                'Full Stack Developer passionate about building scalable, user-focused applications. Expert in React, Next.js, Python, FastAPI, and more.',
              sameAs: ['https://github.com/rajesh-rk-1202'],
            }),
          }}
        />
        <ThemeProvider>
          <VisitTracker />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a2e',
                color: '#f0f0f5',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: '12px',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
