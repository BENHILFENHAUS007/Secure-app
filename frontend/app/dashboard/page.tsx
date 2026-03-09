'use client';

import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const balance = 1100;
const income = 2500;
const expense = 1400;

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Smart WhatsApp Expense Tracker</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card title="Balance" value={`₹${balance}`} color="text-emerald-400" />
        <Card title="Monthly Income" value={`₹${income}`} color="text-sky-400" />
        <Card title="Monthly Expense" value={`₹${expense}`} color="text-rose-400" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-900 rounded-2xl p-4">
          <h2 className="font-semibold mb-3">Category Split</h2>
          <Doughnut
            data={{
              labels: ['Food', 'Travel', 'Bills', 'Shopping'],
              datasets: [{ data: [300, 250, 500, 350], backgroundColor: ['#38bdf8', '#f97316', '#f43f5e', '#a78bfa'] }],
            }}
          />
        </div>

        <div className="bg-slate-900 rounded-2xl p-4">
          <h2 className="font-semibold mb-3">Expense Trend</h2>
          <Line
            data={{
              labels: ['W1', 'W2', 'W3', 'W4'],
              datasets: [{ label: 'Expense', data: [220, 300, 410, 470], borderColor: '#f43f5e', tension: 0.3 }],
            }}
          />
        </div>

        <div className="bg-slate-900 rounded-2xl p-4">
          <h2 className="font-semibold mb-3">Income vs Expense</h2>
          <Bar
            data={{
              labels: ['Jan', 'Feb', 'Mar'],
              datasets: [
                { label: 'Income', data: [2100, 2300, 2500], backgroundColor: '#22c55e' },
                { label: 'Expense', data: [1400, 1600, 1400], backgroundColor: '#ef4444' },
              ],
            }}
          />
        </div>
      </section>
    </main>
  );
}

function Card({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-4 shadow">
      <p className="text-sm text-slate-400">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
