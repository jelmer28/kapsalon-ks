// Auto-gegenereerd uit demo.html — de originele booking/scroll-scripts.
export const siteScript = `
  'use strict';

  const nav = document.getElementById('nav');

  let scrollRaf = null;
  function handleScroll() {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
      scrollRaf = null;
    });
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  const days = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];

  // K&S openingstijden per weekdag (0=zondag, 6=zaterdag)
  const ksHours = {
    0: null,
    1: { open: '10:00', close: '18:00' },
    2: { open: '10:00', close: '18:00' },
    3: { open: '10:00', close: '18:00' },
    4: { open: '09:00', close: '21:00' },
    5: { open: '09:00', close: '18:00' },
    6: { open: '09:00', close: '17:00' }
  };

  function updateTodayStatus() {
    const now = new Date();
    const today = days[now.getDay()];
    const hours = ksHours[now.getDay()];
    let isOpen = false;
    if (hours) {
      const [oh, om] = hours.open.split(':').map(Number);
      const [ch, cm] = hours.close.split(':').map(Number);
      const mins = now.getHours() * 60 + now.getMinutes();
      isOpen = mins >= oh * 60 + om && mins < ch * 60 + cm;
    }
    document.querySelectorAll('.hours-row').forEach(row => {
      const dayEl = row.querySelector('.hours-day');
      if (!dayEl) return;
      // textContent bevat ook de dot-span tekst, dus check op de dag-naam ergens in de tekst
      const isToday = dayEl.textContent.trim().endsWith(today);
      row.classList.toggle('today', isToday);
      row.classList.toggle('open', isToday && isOpen);
      row.classList.toggle('closed-now', isToday && !isOpen);
    });
  }
  updateTodayStatus();
  setInterval(updateTodayStatus, 60000);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true) {
    document.documentElement.classList.add('pwa-standalone');
  }

  // === BOOKING MODAL LOGIC ===
  const ksOpeningHours = {
    0: null,
    1: { open: '10:00', close: '18:00' },
    2: { open: '10:00', close: '18:00' },
    3: { open: '10:00', close: '18:00' },
    4: { open: '09:00', close: '21:00' },
    5: { open: '09:00', close: '18:00' },
    6: { open: '09:00', close: '17:00' }
  };
  const ksDayNamesShort = ['ZO','MA','DI','WO','DO','VR','ZA'];
  const ksMonthNamesShort = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];

  let bookingStep = 1;
  let bookingData = { service: null, date: null, time: null, name: '', phone: '', email: '' };
  let bookingServices = [];
  let bookingTakenSlots = [];

  function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    modal.classList.add('open');
    document.body.classList.add('booking-modal-open');
    bookingStep = 1;
    bookingData = { service: null, date: null, time: null, name: '', phone: '', email: '' };
    document.getElementById('bookingModalTitle').innerHTML = 'Boek je <em>afspraak</em>';
    showBookingStep(1);
    loadBookingServices();
  }
  function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.classList.remove('booking-modal-open');
  }

  function showBookingStep(step) {
    bookingStep = step;
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById('bookingStep' + i);
      if (el) el.style.display = (i === step) ? 'block' : 'none';
    }
    document.querySelectorAll('.booking-progress-step').forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i + 1 === step) el.classList.add('active');
      else if (i + 1 < step) el.classList.add('done');
    });
    document.getElementById('bookingError').style.display = 'none';
    const backBtn = document.getElementById('bookingBackBtn');
    const nextBtn = document.getElementById('bookingNextBtn');
    backBtn.style.display = (step > 1 && step < 4) ? 'block' : 'none';
    if (step === 4) {
      nextBtn.textContent = 'Sluiten';
      nextBtn.disabled = false;
      nextBtn.onclick = closeBookingModal;
      document.getElementById('bookingModalTitle').innerHTML = 'Tot <em>snel</em>';
    } else {
      nextBtn.onclick = bookingNext;
      nextBtn.textContent = step === 3 ? 'Bevestig reservering' : 'Volgende →';
      updateBookingNextButton();
    }
  }

  function updateBookingNextButton() {
    const btn = document.getElementById('bookingNextBtn');
    let canContinue = false;
    if (bookingStep === 1) canContinue = bookingData.service !== null;
    else if (bookingStep === 2) canContinue = bookingData.date !== null && bookingData.time !== null;
    else if (bookingStep === 3) canContinue = bookingData.name.trim().length > 1 && bookingData.phone.trim().length > 5;
    btn.disabled = !canContinue;
  }

  async function loadBookingServices() {
    const listEl = document.getElementById('bookingServiceList');
    try {
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('Kon services niet ophalen');
      bookingServices = await res.json();
      if (!bookingServices.length) {
        listEl.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--muted);">Geen services beschikbaar</div>';
        return;
      }
      listEl.innerHTML = bookingServices.map(s => \`
        <button type="button" class="booking-service-item" data-id="\${s.id}" onclick="selectBookingService('\${s.id}')">
          <div>
            <div class="booking-service-name">\${escapeHtml(s.name)}</div>
            <div class="booking-service-duration">\${s.duration_minutes} min</div>
          </div>
          <div class="booking-service-price">€\${(s.price_cents / 100).toFixed(0)}</div>
        </button>
      \`).join('');
    } catch (err) {
      listEl.innerHTML = '<div style="text-align:center;padding:2rem;color:#991b1b;">Kon services niet laden. Probeer later opnieuw.</div>';
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function selectBookingService(id) {
    const svc = bookingServices.find(s => s.id === id);
    if (!svc) return;
    bookingData.service = svc;
    document.querySelectorAll('.booking-service-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.id === id);
    });
    updateBookingNextButton();
  }

  function renderBookingDays() {
    const grid = document.getElementById('bookingDaysGrid');
    const days = [];
    const today = new Date();
    today.setHours(0,0,0,0);
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    grid.innerHTML = days.map(d => {
      const closed = ksOpeningHours[d.getDay()] === null;
      const iso = d.toISOString().split('T')[0];
      return \`
        <button type="button" class="booking-day\${closed ? ' disabled' : ''}" data-date="\${iso}" onclick="selectBookingDate('\${iso}')">
          <div class="booking-day-name">\${ksDayNamesShort[d.getDay()]}</div>
          <div class="booking-day-num">\${d.getDate()}</div>
          <div class="booking-day-month">\${ksMonthNamesShort[d.getMonth()]}</div>
        </button>
      \`;
    }).join('');
  }

  async function selectBookingDate(iso) {
    bookingData.date = iso;
    bookingData.time = null;
    document.querySelectorAll('.booking-day').forEach(el => {
      el.classList.toggle('selected', el.dataset.date === iso);
    });
    document.getElementById('bookingTimesSection').style.display = 'block';
    const grid = document.getElementById('bookingTimesGrid');
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:1rem;color:var(--muted);">Laden...</div>';
    try {
      const res = await fetch('/api/bookings?date=' + iso);
      const json = await res.json();
      bookingTakenSlots = json.taken || [];
    } catch (err) {
      bookingTakenSlots = [];
    }
    renderBookingTimes(iso);
    updateBookingNextButton();
  }

  function renderBookingTimes(iso) {
    const d = new Date(iso + 'T00:00:00');
    const hours = ksOpeningHours[d.getDay()];
    const grid = document.getElementById('bookingTimesGrid');
    if (!hours) { grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--muted);">Gesloten op deze dag</div>'; return; }
    const [oh, om] = hours.open.split(':').map(Number);
    const [ch, cm] = hours.close.split(':').map(Number);
    const slots = [];
    let cur = oh * 60 + om;
    const end = ch * 60 + cm;
    const dur = bookingData.service ? bookingData.service.duration_minutes : 30;
    while (cur + dur <= end) {
      const h = Math.floor(cur / 60);
      const m = cur % 60;
      slots.push(\`\${String(h).padStart(2,'0')}:\${String(m).padStart(2,'0')}\`);
      cur += 30;
    }
    grid.innerHTML = slots.map(t => {
      const taken = bookingTakenSlots.includes(t);
      return \`<button type="button" class="booking-time\${taken ? ' disabled' : ''}" data-time="\${t}" onclick="selectBookingTime('\${t}')">\${t}</button>\`;
    }).join('');
  }

  function selectBookingTime(t) {
    bookingData.time = t;
    document.querySelectorAll('.booking-time').forEach(el => {
      el.classList.toggle('selected', el.dataset.time === t);
    });
    updateBookingNextButton();
  }

  async function bookingNext() {
    if (bookingStep === 1) {
      showBookingStep(2);
      renderBookingDays();
    } else if (bookingStep === 2) {
      showBookingStep(3);
      ['bookingName','bookingPhone','bookingEmail'].forEach(id => {
        const el = document.getElementById(id);
        el.value = bookingData[id.replace('booking','').toLowerCase()] || '';
        el.oninput = () => {
          bookingData[id.replace('booking','').toLowerCase()] = el.value;
          updateBookingNextButton();
        };
      });
      updateBookingNextButton();
    } else if (bookingStep === 3) {
      await submitBooking();
    }
  }

  function bookingBack() {
    if (bookingStep > 1 && bookingStep < 4) showBookingStep(bookingStep - 1);
  }

  async function submitBooking() {
    const btn = document.getElementById('bookingNextBtn');
    const errEl = document.getElementById('bookingError');
    btn.disabled = true;
    btn.textContent = 'Bezig...';
    errEl.style.display = 'none';
    try {
      const startAt = new Date(bookingData.date + 'T' + bookingData.time + ':00');
      const endAt = new Date(startAt.getTime() + bookingData.service.duration_minutes * 60000);
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: bookingData.service.id,
          customer_name: bookingData.name.trim(),
          customer_phone: bookingData.phone.trim(),
          customer_email: bookingData.email.trim() || null,
          start_at: startAt.toISOString(),
          end_at: endAt.toISOString()
        })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Er ging iets mis');
      const dateObj = new Date(bookingData.date + 'T00:00:00');
      const dateStr = ksDayNamesShort[dateObj.getDay()] + ' ' + dateObj.getDate() + ' ' + ksMonthNamesShort[dateObj.getMonth()];
      document.getElementById('bookingSummary').innerHTML = \`
        <div class="booking-summary-row"><span class="booking-summary-label">Service</span><span class="booking-summary-value">\${escapeHtml(bookingData.service.name)}</span></div>
        <div class="booking-summary-row"><span class="booking-summary-label">Datum</span><span class="booking-summary-value">\${dateStr}</span></div>
        <div class="booking-summary-row"><span class="booking-summary-label">Tijd</span><span class="booking-summary-value">\${bookingData.time}</span></div>
        <div class="booking-summary-row"><span class="booking-summary-label">Naam</span><span class="booking-summary-value">\${escapeHtml(bookingData.name)}</span></div>
        <div class="booking-summary-row"><span class="booking-summary-label">Telefoon</span><span class="booking-summary-value">\${escapeHtml(bookingData.phone)}</span></div>
        <div class="booking-summary-row"><span class="booking-summary-label">Totaal</span><span class="booking-summary-value">€\${(bookingData.service.price_cents / 100).toFixed(0)}</span></div>
      \`;
      showBookingStep(4);
    } catch (err) {
      errEl.textContent = err.message || 'Verbinding mislukt';
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Bevestig reservering';
    }
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeBookingModal();
  });
`;
