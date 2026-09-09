import type { Metadata } from 'next';
import './globals.css';

const title = 'Randy A. Medina | Analista de Datos y Estadístico';
const description =
  'Portafolio de Randy A. Medina: estadística, análisis de datos, Power BI, Python, R, SQL y sistemas de información para entender y decidir.';

export const metadata: Metadata = {
  metadataBase: new URL('https://randy-portfolio-delta.vercel.app'),
  title,
  description,
  authors: [
    {
      name: 'Randy A. Medina',
      url: 'https://www.linkedin.com/in/randymedinaa5',
    },
  ],
  creator: 'Randy A. Medina',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    url: '/',
    title,
    description,
    siteName: 'Portafolio de Randy A. Medina',
    images: [
      {
        url: '/og.png',
        width: 1728,
        height: 907,
        alt: 'Randy A. Medina · Analista de Datos y Estadístico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
