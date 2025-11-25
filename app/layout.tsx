import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gente e Cultura T.Group – Plano 2026',
  description: 'Apresentação interativa de Gente e Cultura T.Group para 2026.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
