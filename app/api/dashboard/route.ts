import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }

  // Alle reserveringen + gekoppelde service ophalen.
  // Pas 'services' join aan als je kolomnamen anders heten.
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(
      'id, customer_name, customer_phone, customer_email, start_at, end_at, status, service_id, services ( name, price_cents, duration_minutes )'
    )
    .order('start_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: bookings || [] });
}
