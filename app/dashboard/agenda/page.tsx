'use client';

import { useState, useMemo, Fragment } from 'react';
import { useBookings, fmtTime, DAY_SHORT, MONTH_NAMES, statusBadge, Booking } from '@/components/dashboard/data';

// Openingstijden K&S — pas aan indien nodig (rij = weekdag 0=zo)
const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;

function startOfWeek(d: Date) {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // maandag = 0
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function AgendaPage() {
  const { bookings, loading, updateStatus } = useBookings();
  const [view, setView] = useState<'week' | 'month'>('week');
  const [anchor, setAnchor] = useState(new Date());
  const [selected, setSelected] = useState<Booking | null>(null);

  const active = bookings.filter((b) => b.status !== 'cancelled' || true); // toon ook geannuleerd, doorgestreept

  function shift(dir: number) {
    const d = new Date(anchor);
    if (view === 'week') d.setDate(d.getDate() + dir * 7);
    else d.setMonth(d.getMonth() + dir);
    setAnchor(d);
  }

  // ---------- WEEK ----------
  const weekDays = useMemo(() => {
    const start = startOfWeek(anchor);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [anchor]);

  const hours = Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i);

  const weekLabel = useMemo(() => {
    const s = weekDays[0];
    const e = weekDays[6];
    if (s.getMonth() === e.getMonth()) return `${s.getDate()} – ${e.getDate()} ${MONTH_NAMES[s.getMonth()]} ${s.getFullYear()}`;
    return `${s.getDate()} ${MONTH_NAMES[s.getMonth()].slice(0, 3)} – ${e.getDate()} ${MONTH_NAMES[e.getMonth()].slice(0, 3)} ${e.getFullYear()}`;
  }, [weekDays]);

  function eventsFor(day: Date, hour: number) {
    return active.filter((b) => {
      const d = new Date(b.start_at);
      return sameDay(d, day) && d.getHours() === hour;
    });
  }

  // ---------- MONTH ----------
  const monthCells = useMemo(() => {
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const start = startOfWeek(first);
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [anchor]);

  const monthLabel = `${MONTH_NAMES[anchor.getMonth()]} ${anchor.getFullYear()}`;

  function dayEvents(day: Date) {
    return active
      .filter((b) => sameDay(new Date(b.start_at), day))
      .sort((a, b) => a.start_at.localeCompare(b.start_at));
  }

  const today = new Date();

  return (
    <>
      <div className="dash-header">
        <div>
          <div className="dash-eyebrow">Planning</div>
          <h1 className="dash-title">Agenda</h1>
        </div>
      </div>

      <div className="cal-toolbar">
        <div className="cal-nav">
          <button className="cal-nav-btn" onClick={() => shift(-1)} aria-label="Vorige">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="cal-current">{view === 'week' ? weekLabel : monthLabel}</div>
          <button className="cal-nav-btn" onClick={() => shift(1)} aria-label="Volgende">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => setAnchor(new Date())}>Vandaag</button>
        </div>
        <div className="cal-view-switch">
          <button className={view === 'week' ? 'active' : ''} onClick={() => setView('week')}>Week</button>
          <button className={view === 'month' ? 'active' : ''} onClick={() => setView('month')}>Maand</button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Agenda laden…</div>
      ) : view === 'week' ? (
        <div className="cal-week" style={{ gridTemplateRows: `auto repeat(${hours.length}, 1fr)` }}>
          {/* header rij */}
          <div className="cal-week-head" />
          {weekDays.map((d, i) => (
            <div key={i} className={`cal-week-head${sameDay(d, today) ? ' today' : ''}`}>
              <div className="cal-week-head-day">{DAY_SHORT[d.getDay()]}</div>
              <div className="cal-week-head-num">{d.getDate()}</div>
            </div>
          ))}

          {/* uren-rijen */}
          {hours.map((h) => (
            <Fragment key={`h-${h}`}>
              <div className="cal-time-label">{String(h).padStart(2, '0')}:00</div>
              {weekDays.map((d, di) => {
                const evs = eventsFor(d, h);
                return (
                  <div key={`${h}-${di}`} className="cal-slot">
                    {evs.map((b) => (
                      <div
                        key={b.id}
                        className={`cal-event ${b.status === 'pending' ? 'pending' : ''} ${b.status === 'cancelled' ? 'cancelled' : ''}`}
                        onClick={() => setSelected(b)}
                      >
                        <div className="cal-event-time">{fmtTime(b.start_at)}</div>
                        <div className="cal-event-name">{b.customer_name}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="cal-month">
          {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((d) => (
            <div key={d} className="cal-month-dayname">{d}</div>
          ))}
          {monthCells.map((d, i) => {
            const evs = dayEvents(d);
            const other = d.getMonth() !== anchor.getMonth();
            return (
              <div key={i} className={`cal-month-cell${other ? ' other' : ''}${sameDay(d, today) ? ' today' : ''}`}>
                <div className="cal-month-num">{d.getDate()}</div>
                {evs.slice(0, 3).map((b) => (
                  <div
                    key={b.id}
                    className="cal-month-event"
                    style={b.status === 'cancelled' ? { textDecoration: 'line-through', opacity: 0.6 } : undefined}
                    onClick={() => setSelected(b)}
                  >
                    {fmtTime(b.start_at)} {b.customer_name}
                  </div>
                ))}
                {evs.length > 3 && <div className="cal-month-more">+{evs.length - 3} meer</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* Detail-popover */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(30,41,66,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '1rem' }}
        >
          <div className="dash-card" style={{ maxWidth: 380, width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-card-head">
              <div className="dash-card-title">Afspraak</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Sluiten</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem' }}>
              <div><span className="cell-muted">Klant</span><br /><strong>{selected.customer_name}</strong></div>
              <div><span className="cell-muted">Service</span><br />{selected.services?.name || '—'}</div>
              <div><span className="cell-muted">Tijd</span><br />{fmtTime(selected.start_at)} – {fmtTime(selected.end_at)}</div>
              <div><span className="cell-muted">Telefoon</span><br /><a href={`tel:${selected.customer_phone}`}>{selected.customer_phone}</a></div>
              <div><span className="cell-muted">Status</span><br /><span className={`badge ${statusBadge(selected.status).cls}`}>{statusBadge(selected.status).label}</span></div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
              {selected.status !== 'confirmed' && selected.status !== 'cancelled' && (
                <button className="btn btn-sm" onClick={() => { updateStatus(selected.id, 'confirmed'); setSelected({ ...selected, status: 'confirmed' }); }}>
                  Bevestig
                </button>
              )}
              {selected.status !== 'cancelled' && (
                <button className="btn btn-ghost btn-sm" onClick={() => { updateStatus(selected.id, 'cancelled'); setSelected({ ...selected, status: 'cancelled' }); }}>
                  Annuleer
                </button>
              )}
              {selected.status === 'cancelled' && (
                <button className="btn btn-ghost btn-sm" onClick={() => { updateStatus(selected.id, 'confirmed'); setSelected({ ...selected, status: 'confirmed' }); }}>
                  Herstel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
