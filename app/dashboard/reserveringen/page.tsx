'use client';

import { useState } from 'react';
import { useBookings, euro, fmtTime, fmtDate, statusBadge } from '@/components/dashboard/data';

type Filter = 'all' | 'upcoming' | 'confirmed' | 'pending' | 'cancelled';

export default function ReserveringenPage() {
  const { bookings, loading, error, updateStatus } = useBookings();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const now = new Date();
  let filtered = bookings;

  if (filter === 'upcoming') filtered = filtered.filter((b) => new Date(b.start_at) >= now && b.status !== 'cancelled');
  else if (filter !== 'all') filtered = filtered.filter((b) => b.status === filter);

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.customer_name.toLowerCase().includes(q) ||
        (b.customer_phone || '').includes(q) ||
        (b.services?.name || '').toLowerCase().includes(q)
    );
  }

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Alle' },
    { key: 'upcoming', label: 'Aankomend' },
    { key: 'confirmed', label: 'Bevestigd' },
    { key: 'pending', label: 'In afwachting' },
    { key: 'cancelled', label: 'Geannuleerd' },
  ];

  return (
    <>
      <div className="dash-header">
        <div>
          <div className="dash-eyebrow">Beheer</div>
          <h1 className="dash-title">Reserveringen</h1>
        </div>
      </div>

      <div className="cal-toolbar">
        <div className="cal-view-switch">
          {filters.map((f) => (
            <button key={f.key} className={filter === f.key ? 'active' : ''} onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <input
          className="input"
          style={{ maxWidth: 280 }}
          placeholder="Zoek op naam, telefoon of service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="login-error">{error}</div>}

      <div className="dash-card">
        {loading ? (
          <div className="loading">Reserveringen laden…</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✦</div>
            Geen reserveringen gevonden.
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Klant</th>
                <th>Telefoon</th>
                <th>Service</th>
                <th>Datum &amp; tijd</th>
                <th>Bedrag</th>
                <th>Status</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const sb = statusBadge(b.status);
                return (
                  <tr key={b.id}>
                    <td className="cell-strong">{b.customer_name}</td>
                    <td className="cell-muted">
                      <a href={`tel:${b.customer_phone}`}>{b.customer_phone}</a>
                    </td>
                    <td>{b.services?.name || '—'}</td>
                    <td>{fmtDate(b.start_at)}<br /><span className="cell-muted">{fmtTime(b.start_at)} – {fmtTime(b.end_at)}</span></td>
                    <td className="cell-strong">{euro(b.services?.price_cents)}</td>
                    <td><span className={`badge ${sb.cls}`}>{sb.label}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {b.status !== 'confirmed' && b.status !== 'cancelled' && (
                          <button className="btn btn-sm" onClick={() => updateStatus(b.id, 'confirmed')}>
                            Bevestig
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button className="btn btn-ghost btn-sm" onClick={() => updateStatus(b.id, 'cancelled')}>
                            Annuleer
                          </button>
                        )}
                        {b.status === 'cancelled' && (
                          <button className="btn btn-ghost btn-sm" onClick={() => updateStatus(b.id, 'confirmed')}>
                            Herstel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
