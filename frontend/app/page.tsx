import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold text-center">Smart WhatsApp Expense Tracker</h1>
      <p className="text-slate-300 text-center max-w-xl">
        PWA-enabled expense tracking powered by WhatsApp message ingestion and a dashboard experience.
      </p>
      <Link
        href="/dashboard"
        className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-5 py-3"
      >
        Open Dashboard
      </Link>
    </main>
  );
}
