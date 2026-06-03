'use client';

import { useEffect, useState } from 'react';

export type Booking = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  start_at: string;
  end_at: string;
  status: 'confirmed' | 'pending' | 'cancelled' | string;
  service_id: string;
  services: {
    name: string;
    price_cents: number;
    duration_minutes: number;
  } | null;
};

export const DAY_NAMES = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
export const DAY_SHORT = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
export const MONTH_NAMES = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

export function euro(cents: number | undefined | null): string {
  if (!cents) return '€0';
  return '€' + (cents / 100).toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function fmtTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

export function fmtDateShort(iso: string): string {
  const d = new Date(iso);
  return `${DAY_SHORT[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}`;
}

export function statusBadge(status: string) {
  const map: Record<string, { cls: string; label: string }> = {
    confirmed: { cls: 'badge-confirmed', label: 'Bevestigd' },
    pending: { cls: 'badge-pending', label: 'In afwachting' },
    cancelled: { cls: 'badge-cancelled', label: 'Geannuleerd' },
  };
  return map[status] || { cls: 'badge-confirmed', label: status };
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/dashboard');
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Fout bij laden');
        if (active) setBookings(json.bookings || []);
      } catch (e: any) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function updateStatus(id: string, status: Booking['status']) {
    // Optimistisch bijwerken zodat de UI direct reageert
    const prev = bookings;
    setBookings((list) => list.map((b) => (b.id === id ? { ...b, status } : b)));
    try {
      const res = await fetch('/api/dashboard/booking', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || 'Bijwerken mislukt');
      }
    } catch (e: any) {
      // Bij fout: terugdraaien
      setBookings(prev);
      setError(e.message);
    }
  }

  return { bookings, loading, error, updateStatus };
}
