'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import '../dashboard/dashboard.css';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError('Onjuiste inloggegevens. Probeer het opnieuw.');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="login-shell">
      <div className="login-visual">
        <div className="login-visual-text">
          <h2>Welkom terug</h2>
          <p>Beheer je reserveringen, agenda en klanten op één plek.</p>
        </div>
      </div>

      <div className="login-form-wrap">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-logo">
            Kapsalon <span>K&amp;S</span>
          </div>
          <p className="login-sub">Log in om je dashboard te bekijken.</p>

          {error && <div className="login-error">{error}</div>}

          <div className="input-group">
            <label className="input-label" htmlFor="email">E-mailadres</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jij@kapsalon-ks.nl"
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Wachtwoord</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Bezig met inloggen...' : 'Inloggen'}
          </button>
        </form>
      </div>
    </div>
  );
}
