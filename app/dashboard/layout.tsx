import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/dashboard/Sidebar';
import './dashboard.css';

export const metadata = {
  title: 'Dashboard · Kapsalon K&S',
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Geen user → login. (Middleware vangt dit ook af, dit is de fallback.)
  if (!user) redirect('/login');

  return (
    <div className="dash-shell">
      <Sidebar email={user.email || ''} />
      <main className="dash-main">{children}</main>
    </div>
  );
}
