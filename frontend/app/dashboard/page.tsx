'use client';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const balance = 1100;
const income = 2500;
const expense = 1400;

export default function DashboardPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950 text-white p-4 md:p-8">
      <AnimatedBackdrop />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-6 md:mb-8 glass-panel p-4 md:p-6 animate-float">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-300">ReactBits-inspired motion UI</p>
          <h1 className="text-2xl md:text-4xl font-bold">Smart WhatsApp Expense Tracker</h1>
          <p className="text-slate-300 text-sm md:text-base mt-2">
            Auto-switches between mobile and desktop layouts for Chrome/Safari on Android, iOS, and desktop.
          </p>
        </header>

        <div className="md:hidden">
          <MobileDashboard />
        </div>

        <div className="hidden md:block">
          <DesktopDashboard />
        </div>
      </div>
    </main>
  );
}

function DesktopDashboard() {
  return (
    <>
      <section className="grid grid-cols-3 gap-4 mb-6">
        <Card title="Balance" value={`₹${balance}`} color="text-emerald-400" />
        <Card title="Monthly Income" value={`₹${income}`} color="text-sky-400" />
        <Card title="Monthly Expense" value={`₹${expense}`} color="text-rose-400" />
      </section>

      <section className="grid grid-cols-3 gap-4">
        <ChartCard title="Category Split">
          <Doughnut
            data={{
              labels: ['Food', 'Travel', 'Bills', 'Shopping'],
              datasets: [{ data: [300, 250, 500, 350], backgroundColor: ['#38bdf8', '#f97316', '#f43f5e', '#a78bfa'] }],
            }}
          />
        </ChartCard>

        <ChartCard title="Expense Trend">
          <Line
            data={{
              labels: ['W1', 'W2', 'W3', 'W4'],
              datasets: [{ label: 'Expense', data: [220, 300, 410, 470], borderColor: '#f43f5e', tension: 0.3 }],
            }}
          />
        </ChartCard>

        <ChartCard title="Income vs Expense">
          <Bar
            data={{
              labels: ['Jan', 'Feb', 'Mar'],
              datasets: [
                { label: 'Income', data: [2100, 2300, 2500], backgroundColor: '#22c55e' },
                { label: 'Expense', data: [1400, 1600, 1400], backgroundColor: '#ef4444' },
              ],
            }}
          />
        </ChartCard>
      </section>
    </>
  );
}

function MobileDashboard() {
  return (
    <section className="space-y-4">
      <Card title="Balance" value={`₹${balance}`} color="text-emerald-400" />
      <div className="grid grid-cols-2 gap-4">
        <Card title="Income" value={`₹${income}`} color="text-sky-400" />
        <Card title="Expense" value={`₹${expense}`} color="text-rose-400" />
      </div>

      <ChartCard title="Category Split">
        <Doughnut
          data={{
            labels: ['Food', 'Travel', 'Bills', 'Shopping'],
            datasets: [{ data: [300, 250, 500, 350], backgroundColor: ['#38bdf8', '#f97316', '#f43f5e', '#a78bfa'] }],
          }}
        />
      </ChartCard>

      <ChartCard title="Expense Trend">
        <Line
          data={{
            labels: ['W1', 'W2', 'W3', 'W4'],
            datasets: [{ label: 'Expense', data: [220, 300, 410, 470], borderColor: '#f43f5e', tension: 0.3 }],
          }}
        />
      </ChartCard>

      <ChartCard title="Income vs Expense">
        <Bar
          data={{
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [
              { label: 'Income', data: [2100, 2300, 2500], backgroundColor: '#22c55e' },
              { label: 'Expense', data: [1400, 1600, 1400], backgroundColor: '#ef4444' },
            ],
          }}
        />
      </ChartCard>
    </section>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel p-4 animate-fade-in">
      <h2 className="font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Card({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="glass-panel p-4 animate-fade-in">
      <p className="text-sm text-slate-400">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function AnimatedBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 -right-16 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" />
    </>
  );
}
