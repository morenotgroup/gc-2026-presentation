import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold">
          Gente e Cultura T.Group – Plano 2026
        </h1>
        <p className="text-slate-300 max-w-md mx-auto">
          Apresentação interativa construída para compartilhar a análise e o plano de Gente e Cultura com os sócios do T.Group.
        </p>
        <Link
          href="/gc-2026"
          className="inline-flex items-center rounded-full border border-fuchsia-400/60 bg-fuchsia-500/80 px-6 py-2 text-sm font-medium text-slate-50 hover:bg-fuchsia-500 transition-colors"
        >
          Abrir apresentação
        </Link>
      </div>
    </main>
  );
}
