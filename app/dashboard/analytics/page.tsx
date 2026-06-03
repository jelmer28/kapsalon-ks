'use client';

import { useMemo } from 'react';
import { useBookings, euro, MONTH_NAMES } from '@/components/dashboard/data';

const SERVICE_COLORS = ['#b8956a', '#1e2942', '#8a6e4b', '#5dad6e', '#c9883f', '#6b6557'];

export default function AnalyticsPage() {
  const { bookings, loading } = useBookings();
  const active = bookings.filter((b) => b.status !== 'cancelled');

  // Laatste 6 maanden omzet
  const monthly = useMemo(() => {
    const now = new Date();
    const arr: { label: string; revenue: number; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const revenue = active
        .filter((b) => {
          const bd = new Date(b.start_at);
          return bd.getFullYear() === d.getFullYear() && bd.getMonth() === d.getMonth();
        })
        .reduce((s, b) => s + (b.services?.price_cents || 0), 0);
      const count = active.filter((b) => {
        const bd = new Date(b.start_at);
        return bd.getFullYear() === d.getFullYear() && bd.getMonth() === d.getMonth();
      }).length;
      arr.push({ label: MONTH_NAMES[d.getMonth()].slice(0, 3), revenue, count });
    }
    return arr;
  }, [active]);

  const maxRev = Math.max(...monthly.map((m) => m.revenue), 1);

  // Populairste services
  const services = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of active) {
      const name = b.services?.name || 'Onbekend';
      map.set(name, (map.get(name) || 0) + 1);
    }
    const total = Array.from(map.values()).reduce((a, b) => a + b, 0) || 1;
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [active]);

  const totalRev = active.reduce((s, b) => s + (b.services?.price_cents || 0), 0);
  const avgTicket = active.length ? Math.round(totalRev / active.length) : 0;

  return (
    <>
      <div className="dash-header">
        <div>
          <div className="dash-eyebrow">Inzichten</div>
          <h1 className="dash-title">Analytics</h1>
        </div>
      </div>

      {loading ? (
        <div className="loading">Cijfers berekenen…</div>
      ) : (
        <>
          <div className="stat-grid">
            <div className="stat-tile">
              <div className="stat-tile-label">Totale omzet</div>
              <div className="stat-tile-value">{euro(totalRev)}</div>
              <div className="stat-tile-sub">alle afspraken</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile-label">Gem. besteding</div>
              <div className="stat-tile-value">{euro(avgTicket)}</div>
              <div className="stat-tile-sub">per afspraak</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile-label">Totaal afspraken</div>
              <div className="stat-tile-value">{active.length}</div>
              <div className="stat-tile-sub">bevestigd</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile-label">Annuleringen</div>
              <div className="stat-tile-value">{bookings.length - active.length}</div>
              <div className="stat-tile-sub">totaal</div>
            </div>
          </div>

          <div className="chart-grid">
            <div className="dash-card">
              <div className="dash-card-head">
                <div className="dash-card-title">Omzet <em>per maand</em></div>
              </div>
              <div className="bar-chart">
                {monthly.map((m, i) => (
                  <div className="bar-col" key={i}>
                    <div
                      className="bar"
                      style={{ height: `${(m.revenue / maxRev) * 100}%` }}
                      data-val={euro(m.revenue)}
                    />
                    <div className="bar-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-card-head">
                <div className="dash-card-title">Populaire <em>services</em></div>
              </div>
              {services.length === 0 ? (
                <div className="empty-state">Nog geen data.</div>
              ) : (
                <ul className="legend">
                  {services.map((s, i) => (
                    <li key={i}>
                      <span className="legend-name">
                        <span className="legend-dot" style={{ background: SERVICE_COLORS[i % SERVICE_COLORS.length] }} />
                        {s.name}
                      </span>
                      <span className="cell-strong">{s.count}× <span className="cell-muted">({s.pct}%)</span></span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
