import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rajesh Kumar Jena | Full Stack Developer',
  description:
    'Full Stack Developer passionate about building scalable, user-focused applications. Expert in React, Next.js, Python, FastAPI, and more.',
  keywords: [
    'Rajesh Kumar Jena',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Python',
    'FastAPI',
    'Portfolio',
  ],
  authors: [{ name: 'Rajesh Kumar Jena' }],
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
        <ThemeProvider>
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
