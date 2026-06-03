import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET /api/bookings?date=YYYY-MM-DD  → { taken: ["10:00", "10:30", ...] }
export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'date ontbreekt' }, { status: 400 });
  }

  const dayStart = new Date(date + 'T00:00:00');
  const dayEnd = new Date(date + 'T23:59:59');

  const { data, error } = await supabase
    .from('bookings')
    .select('start_at, status')
    .gte('start_at', dayStart.toISOString())
    .lte('start_at', dayEnd.toISOString())
    .neq('status', 'cancelled');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const taken = (data || []).map((b) => {
    const d = new Date(b.start_at);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  });

  return NextResponse.json({ taken });
}

// POST /api/bookings  → maakt een nieuwe reservering aan
export async function POST(req: Request) {
  const supabase = await createClient();

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  const { service_id, customer_name, customer_phone, customer_email, start_at, end_at } = body;

  if (!service_id || !customer_name || !customer_phone || !start_at || !end_at) {
    return NextResponse.json({ error: 'Niet alle velden zijn ingevuld' }, { status: 400 });
  }

  // Dubbele boeking voorkomen: bestaat er al een afspraak op dit tijdstip?
  const { data: clash } = await supabase
    .from('bookings')
    .select('id')
    .eq('start_at', new Date(start_at).toISOString())
    .neq('status', 'cancelled')
    .maybeSingle();

  if (clash) {
    return NextResponse.json(
      { error: 'Dit tijdstip is helaas net bezet. Kies een ander tijdstip.' },
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      service_id,
      customer_name,
      customer_phone,
      customer_email: customer_email || null,
      start_at: new Date(start_at).toISOString(),
      end_at: new Date(end_at).toISOString(),
      status: 'pending',
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
