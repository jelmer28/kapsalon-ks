'use client';

import { useBookings, euro, fmtTime, fmtDateShort, statusBadge, Booking } from '@/components/dashboard/data';

function todayStr() {
  const d = new Date();
  return d.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function isToday(iso: string) {
  const d = new Date(iso);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
}

function isThisMonth(iso: string) {
  const d = new Date(iso);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
}

export default function OverzichtPage() {
  const { bookings, loading, error } = useBookings();

  const active = bookings.filter((b) => b.status !== 'cancelled');
  const todays = active.filter((b) => isToday(b.start_at)).sort((a, b) => a.start_at.localeCompare(b.start_at));
  const monthBookings = active.filter((b) => isThisMonth(b.start_at));
  const revenue = monthBookings.reduce((sum, b) => sum + (b.services?.price_cents || 0), 0);
  const upcoming = active
    .filter((b) => new Date(b.start_at) >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((a, b) => a.start_at.localeCompare(b.start_at))
    .slice(0, 6);
  const uniqueCustomers = new Set(bookings.map((b) => b.customer_phone)).size;

  return (
    <>
      <div className="dash-header">
        <div>
          <div className="dash-eyebrow">Dashboard</div>
          <h1 className="dash-title">Goedendag, <em>K&amp;S</em></h1>
        </div>
        <div className="dash-date">
          Vandaag
          <strong>{todayStr()}</strong>
        </div>
      </div>

      {error && <div className="login-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}
      {loading ? (
        <div className="loading">Gegevens laden…</div>
      ) : (
        <>
          <div className="stat-grid">
            <div className="stat-tile">
              <div className="stat-tile-label">Afspraken vandaag</div>
              <div className="stat-tile-value">{todays.length}</div>
              <div className="stat-tile-sub">{todays.length ? `Eerste om ${fmtTime(todays[0].start_at)}` : 'Geen afspraken'}</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile-label">Deze maand</div>
              <div className="stat-tile-value">{monthBookings.length}</div>
              <div className="stat-tile-sub">reserveringen</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile-label">Omzet deze maand</div>
              <div className="stat-tile-value">{euro(revenue)}</div>
              <div className="stat-tile-sub">o.b.v. bevestigde afspraken</div>
            </div>
            <div className="stat-tile">
              <div className="stat-tile-label">Unieke klanten</div>
              <div className="stat-tile-value">{uniqueCustomers}</div>
              <div className="stat-tile-sub">totaal in systeem</div>
            </div>
          </div>

          <div className="two-col">
            <div className="dash-card">
              <div className="dash-card-head">
                <div className="dash-card-title">Aankomende <em>afspraken</em></div>
              </div>
              {upcoming.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">✦</div>
                  Geen aankomende afspraken.
                </div>
              ) : (
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Klant</th>
                      <th>Service</th>
                      <th>Wanneer</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcoming.map((b) => {
                      const sb = statusBadge(b.status);
                      return (
                        <tr key={b.id}>
                          <td className="cell-strong">{b.customer_name}</td>
                          <td className="cell-muted">{b.services?.name || '—'}</td>
                          <td>{fmtDateShort(b.start_at)} · {fmtTime(b.start_at)}</td>
                          <td><span className={`badge ${sb.cls}`}>{sb.label}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <div className="dash-card">
              <div className="dash-card-head">
                <div className="dash-card-title">Vandaag</div>
              </div>
              {todays.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">☕</div>
                  Een rustige dag — geen afspraken.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {todays.map((b) => (
                    <div key={b.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--line)' }}>
                      <div style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--accent-deep)', minWidth: 56 }}>
                        {fmtTime(b.start_at)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{b.customer_name}</div>
                        <div className="cell-muted">{b.services?.name || '—'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
