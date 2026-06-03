'use client';

import { useState, useMemo } from 'react';
import { useBookings, euro, fmtDate, Booking } from '@/components/dashboard/data';

type Customer = {
  name: string;
  phone: string;
  email: string | null;
  visits: number;
  spent: number;
  lastVisit: string;
};

export default function KlantenPage() {
  const { bookings, loading, error } = useBookings();
  const [search, setSearch] = useState('');

  const customers = useMemo<Customer[]>(() => {
    const map = new Map<string, Customer>();
    for (const b of bookings) {
      if (b.status === 'cancelled') continue;
      const key = b.customer_phone || b.customer_name;
      const existing = map.get(key);
      const price = b.services?.price_cents || 0;
      if (existing) {
        existing.visits += 1;
        existing.spent += price;
        if (b.start_at > existing.lastVisit) existing.lastVisit = b.start_at;
        if (!existing.email && b.customer_email) existing.email = b.customer_email;
      } else {
        map.set(key, {
          name: b.customer_name,
          phone: b.customer_phone,
          email: b.customer_email,
          visits: 1,
          spent: price,
          lastVisit: b.start_at,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.lastVisit.localeCompare(a.lastVisit));
  }, [bookings]);

  const filtered = search.trim()
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          (c.phone || '').includes(search) ||
          (c.email || '').toLowerCase().includes(search.toLowerCase())
      )
    : customers;

  return (
    <>
      <div className="dash-header">
        <div>
          <div className="dash-eyebrow">Relaties</div>
          <h1 className="dash-title">Klanten</h1>
        </div>
        <div className="dash-date">
          Totaal
          <strong>{customers.length} klanten</strong>
        </div>
      </div>

      <div className="cal-toolbar">
        <div />
        <input
          className="input"
          style={{ maxWidth: 280 }}
          placeholder="Zoek klant…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="login-error">{error}</div>}

      <div className="dash-card">
        {loading ? (
          <div className="loading">Klanten laden…</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✦</div>
            Nog geen klanten.
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Naam</th>
                <th>Contact</th>
                <th>Bezoeken</th>
                <th>Besteed</th>
                <th>Laatste bezoek</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="dash-user-avatar" style={{ width: 34, height: 34, fontSize: '0.95rem' }}>
                        {c.name[0]?.toUpperCase()}
                      </div>
                      <span className="cell-strong">{c.name}</span>
                    </div>
                  </td>
                  <td className="cell-muted">
                    <a href={`tel:${c.phone}`}>{c.phone}</a>
                    {c.email && <><br />{c.email}</>}
                  </td>
                  <td className="cell-strong">{c.visits}×</td>
                  <td className="cell-strong">{euro(c.spent)}</td>
                  <td className="cell-muted">{fmtDate(c.lastVisit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
