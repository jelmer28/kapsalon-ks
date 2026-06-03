# Kapsalon K&S — Complete website + dashboard

Eén Next.js 14 project met:
- **De website** (`/`) — de K&S site met online boekingsformulier
- **Booking-API** (`/api/services`, `/api/bookings`) — praat met Supabase
- **Eigenaar-dashboard** (`/dashboard`) — overzicht, reserveringen, agenda, klanten, analytics
- **Login** (`/login`) — echte Supabase Auth, alleen voor jou

Alles draait op één Vercel-deployment en één Supabase-project.

---

## Stappenplan (in deze volgorde)

### STAP 1 — GitHub: nieuwe repo + bestanden uploaden
1. Maak op GitHub een nieuwe repo: `kapsalon-ks` (mag leeg, geen README aanvinken).
2. Pak deze ZIP uit op je computer. Je krijgt een map `kapsalon-ks` met alles erin.
3. Open de map in VS Code en push naar GitHub:

```bash
git init
git config user.email "jelmerzijl@gmail.com"
git add .
git commit -m "Kapsalon K&S website + dashboard"
git branch -M main
git remote add origin https://github.com/jelmer28/kapsalon-ks.git
git push -u origin main
```

> Let op: `.env.local` staat in `.gitignore` en wordt dus NIET geüpload — dat is goed,
> je keys horen niet op GitHub. Die zet je straks in Vercel (stap 3).

### STAP 2 — Supabase: nieuw project + database
1. Ga naar supabase.com → **New project**. Kies regio **Frankfurt (eu-central-1)**.
   Bewaar het database-wachtwoord ergens veilig.
2. Wacht tot het project klaar is (~2 min).
3. Open links **SQL Editor** → **New query** → plak de inhoud van `supabase-setup.sql`
   → klik **Run**. Dit maakt de tabellen, policies en voorbeeld-services aan.
4. Haal je sleutels op: **Settings → API**:
   - **Project URL** (bijv. `https://abcd1234.supabase.co`)
   - **anon public** key (de lange `eyJ...` sleutel)
   Bewaar deze twee even — je hebt ze nodig in stap 3.
5. Maak je eigenaar-login: **Authentication → Users → Add user**.
   - Vul je e-mail + een wachtwoord in.
   - **Vink "Auto Confirm User" AAN** (anders kun je niet inloggen).

### STAP 3 — Vercel: koppelen + keys + deploy
1. Ga naar vercel.com → **Add New → Project** → kies je `kapsalon-ks` repo → **Import**.
2. Vóór je op Deploy klikt: open **Environment Variables** en voeg toe:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | jouw Project URL uit stap 2.4 |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | jouw anon key uit stap 2.4 |

3. Klik **Deploy**. Na ~1-2 min staat je site live op een `*.vercel.app` adres.

### STAP 4 — Testen
- Open je `.vercel.app` adres → de website laadt, "Online reserveren" toont je services.
- Maak een testboeking aan via de site.
- Ga naar `/login`, log in met je eigenaar-account → je ziet de boeking in het dashboard.

---

## Lokaal draaien (optioneel, om te testen voor het pushen)
```bash
npm install
# maak een bestand .env.local met:
#   NEXT_PUBLIC_SUPABASE_URL=...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
npm run dev
```
Open http://localhost:3000

## Als er iets misgaat
- **Build faalt op Vercel** → Settings → Deployments → Redeploy en zet
  "Use existing Build Cache" UIT.
- **Services laden niet op de site** → check of `supabase-setup.sql` echt is uitgevoerd
  en of de env-vars in Vercel exact goed staan (geen spaties).
- **Kan niet inloggen** → controleer dat "Auto Confirm User" aanstond bij het aanmaken.

## Aanpassen
- **Services/prijzen**: pas aan in Supabase (tabel `services`) of in `supabase-setup.sql`.
- **Openingstijden boekingsformulier**: staan in de website-code (`ksHours`).
- **Openingstijden agenda-dashboard**: `OPEN_HOUR` / `CLOSE_HOUR` bovenin
  `app/dashboard/agenda/page.tsx`.
