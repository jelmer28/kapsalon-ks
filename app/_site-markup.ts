// Auto-gegenereerd uit demo.html — de volledige website-markup.
export const siteMarkup = `<!-- ====== NAV ====== -->
<nav class="nav" id="nav">
  <div class="nav-logo">Kapsalon <span>K&S</span></div>
  <ul class="nav-links">
    <li><a href="#services">Services</a></li>
    <li><a href="#gallery">Werk</a></li>
    <li><a href="#reviews">Reviews</a></li>
    <li><a href="#about">Over Ons</a></li>
    <li><a href="#booking">Contact</a></li>
  </ul>
  <div class="nav-actions">
    <a href="tel:0515435448" class="btn-call-nav">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Bel nu
    </a>
    <button class="btn-book" onclick="openBookingModal()">Afspraak</button>
  </div>
</nav>

<!-- ====== HERO ====== -->
<section class="hero">
  <div class="hero-content">
    <div class="hero-eyebrow">Kapper · Heerenveen</div>
    <h1>Vakkundig knippen,<br><em>persoonlijke service.</em></h1>
    <p class="hero-sub">Al jaren de vertrouwde kapsalon in het hart van Heerenveen, voor dames, heren en kinderen. Goede koffie, eerlijke prijzen, en altijd het kapsel dat bij jou past.</p>
    <div class="hero-availability">
      <span class="availability-dot"></span>
      Vandaag geopend. Bel voor een afspraak
    </div>
    <div class="hero-cta">
      <button class="btn-primary" onclick="openBookingModal()">
        Plan een afspraak
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      <a href="tel:0515435448" class="btn-call">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        0515 435 448
      </a>
    </div>
  </div>
  <div class="hero-visual">
    <div class="hero-img"></div>
    <div class="hero-badge">
      <div>
        <div class="hero-badge-stars">★★★★★</div>
        <div class="hero-badge-text"><strong>Vakwerk sinds 2010</strong>Heerenveen · De Passage</div>
      </div>
    </div>
  </div>
</section>

<!-- ====== TRUST STRIP ====== -->
<div class="trust-strip">
  <div class="trust-item">
    <div class="trust-num">15+</div>
    <div class="trust-label">Jaar ervaring</div>
  </div>
  <div class="trust-item">
    <div class="trust-num">1000+</div>
    <div class="trust-label">Tevreden klanten</div>
  </div>
  <div class="trust-item">
    <div class="trust-num">★★★★★</div>
    <div class="trust-label">Google reviews</div>
  </div>
  <div class="trust-item">
    <div class="trust-num">☕</div>
    <div class="trust-label">Koffie inbegrepen</div>
  </div>
</div>

<!-- ====== SERVICES ====== -->
<section id="services" class="services">
  <div class="section-header reveal">
    <div class="section-label">Onze Services</div>
    <h2 class="section-title">Voor het hele gezin. <em>Vakkundig en eerlijk.</em></h2>
  </div>

  <div class="services-list reveal">
    <div class="service-item">
      <div class="service-num">01</div>
      <div>
        <div class="service-name">Heren Knippen</div>
      </div>
      <div class="service-desc">Vakkundig knippen voor heren, klassiek of modern, helemaal naar wens.</div>
      <div class="service-meta">
        <div class="service-price">vanaf €15</div>
        <div class="service-duration">30 min</div>
      </div>
    </div>

    <div class="service-item">
      <div class="service-num">02</div>
      <div>
        <div class="service-name">Dames Knippen & Föhnen</div>
      </div>
      <div class="service-desc">Knippen, wassen en föhnen voor een verzorgde, gestylde look.</div>
      <div class="service-meta">
        <div class="service-price">vanaf €25</div>
        <div class="service-duration">45 min</div>
      </div>
    </div>

    <div class="service-item">
      <div class="service-num">03</div>
      <div>
        <div class="service-name">Kinderen (t/m 12)</div>
      </div>
      <div class="service-desc">Geduldig en vriendelijk. Kinderen voelen zich hier op hun gemak.</div>
      <div class="service-meta">
        <div class="service-price">vanaf €12</div>
        <div class="service-duration">30 min</div>
      </div>
    </div>

    <div class="service-item">
      <div class="service-num">04</div>
      <div>
        <div class="service-name">Baard Knippen & Scheren</div>
      </div>
      <div class="service-desc">Baard trimmen, vormgeven of een klassieke scheerbeurt, alles met aandacht.</div>
      <div class="service-meta">
        <div class="service-price">vanaf €10</div>
        <div class="service-duration">20 min</div>
      </div>
    </div>

    <div class="service-item">
      <div class="service-num">05</div>
      <div>
        <div class="service-name">Kleuren & Highlights</div>
      </div>
      <div class="service-desc">Volledig kleuren, plukjes of highlights, afgestemd op jouw wens en haartype.</div>
      <div class="service-meta">
        <div class="service-price">op aanvraag</div>
        <div class="service-duration">60–120 min</div>
      </div>
    </div>
  </div>

  <p class="price-disclaimer reveal">Prijzen kunnen variëren afhankelijk van haarlengte en behandeling. Bel gerust voor een prijsopgave.</p>

  <div class="services-cta reveal">
    <button class="btn-primary" onclick="openBookingModal()">
      Plan je afspraak
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </button>
  </div>
</section>

<!-- ====== GALLERY ====== -->
<section id="gallery">
  <div class="section-header reveal">
    <div class="section-label">Ons Werk</div>
    <h2 class="section-title">Resultaten die <em>spreken</em>.</h2>
  </div>

  <div class="gallery-grid reveal">
    <div class="ba-card">
      <div class="ba-card-img" style="background-image:url('https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80')"></div>
      <div class="ba-label">Heren</div>
      <div class="ba-tag">Klassiek & verzorgd</div>
    </div>
    <div class="ba-card">
      <div class="ba-card-img" style="background-image:url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80')"></div>
      <div class="ba-label">Dames</div>
      <div class="ba-tag">Stylish & elegant</div>
    </div>
    <div class="ba-card">
      <div class="ba-card-img" style="background-image:url('https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80')"></div>
      <div class="ba-label">Kleuren</div>
      <div class="ba-tag">Warme highlights</div>
    </div>
    <div class="ba-card">
      <div class="ba-card-img" style="background-image:url('https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80')"></div>
      <div class="ba-label">Kinderen</div>
      <div class="ba-tag">Geduldig & leuk</div>
    </div>
    <div class="ba-card">
      <div class="ba-card-img" style="background-image:url('https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80')"></div>
      <div class="ba-label">Föhnen</div>
      <div class="ba-tag">Gestyled & af</div>
    </div>
    <div class="ba-card">
      <div class="ba-card-img" style="background-image:url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80')"></div>
      <div class="ba-label">Baard</div>
      <div class="ba-tag">Vakkundig getrimd</div>
    </div>
  </div>

  <div class="gallery-cta reveal">
    <button class="btn-primary" onclick="openBookingModal()">
      Plan je bezoek
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </button>
  </div>
</section>

<!-- ====== REVIEWS ====== -->
<section id="reviews" class="reviews">
  <div class="reviews-header reveal">
    <div class="reviews-rating">
      <div class="reviews-stars">★★★★★</div>
      <div class="reviews-count">Beoordeeld door honderden klanten op Google</div>
    </div>
    <h2 class="section-title">Wat onze <em>klanten</em> zeggen.</h2>
  </div>

  <div class="reviews-grid reveal">
    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <p class="review-text">"De beste kapper in de regio Heerenveen, met veel ervaring en een eerlijke prijs. Verdient zeker vijf sterren."</p>
      <div class="review-author">
        <div class="review-avatar">K</div>
        <div>
          <div class="review-name">Khalat Ibrahim</div>
          <div class="review-date">Google review</div>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <p class="review-text">"De beste kapper. Ik kom altijd helemaal vanuit Meppel hierheen en ga altijd tevreden weg."</p>
      <div class="review-author">
        <div class="review-avatar">A</div>
        <div>
          <div class="review-name">A. S.</div>
          <div class="review-date">Google review</div>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <p class="review-text">"Ze geven de kinderen mooie kapsels. Ze luisteren naar wensen en hebben geduld. Echt fijn."</p>
      <div class="review-author">
        <div class="review-avatar">S</div>
        <div>
          <div class="review-name">SD D.</div>
          <div class="review-date">Google review</div>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <p class="review-text">"Ik kom hier al jaren. De klantenservice is altijd top. Vriendelijk, attent, en er staat altijd koffie of thee klaar."</p>
      <div class="review-author">
        <div class="review-avatar">S</div>
        <div>
          <div class="review-name">Stefan Cucu</div>
          <div class="review-date">Google review</div>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <p class="review-text">"Netjes, vriendelijk en met een goed kapsel de deur uit. Geen haastwerk, maar rustig en verzorgd."</p>
      <div class="review-author">
        <div class="review-avatar">F</div>
        <div>
          <div class="review-name">Fisker 1968</div>
          <div class="review-date">Local Guide</div>
        </div>
      </div>
    </div>

    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <p class="review-text">"Eindelijk een kapper die het in één keer goed knipt. Twee keer geweest nu, daar blijft het niet bij."</p>
      <div class="review-author">
        <div class="review-avatar">N</div>
        <div>
          <div class="review-name">Nel de Haan</div>
          <div class="review-date">Google review</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ====== ABOUT ====== -->
<section class="about" id="about">
  <div class="about-grid">
    <div class="about-image reveal"></div>
    <div class="about-content reveal">
      <div class="section-label" style="margin-bottom:1.5rem">Over Ons</div>
      <h2>Een vertrouwde plek <em>in Heerenveen.</em></h2>
      <p>Kapsalon K&S is al jaren een vast adres in De Passage. Wij zijn een echte familiezaak. Vakkundig, geduldig, en altijd met aandacht voor wat jij wilt. Of je nu komt voor een snelle knipbeurt of een complete restyling: je bent welkom.</p>
      <p>Bij ons staat persoonlijke service voorop. Goede koffie of thee, een gesprek als je dat wilt, en het kapsel dat bij je past. Niet voor niets dat klanten ons al jaren trouw blijven.</p>
      <div class="about-cta">
        <button class="btn-light" onclick="openBookingModal()">
          Plan een afspraak
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
        <a href="tel:0515435448" class="btn-light-outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Bel direct
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ====== BOOKING + CONTACT ====== -->
<section class="booking" id="booking">
  <div class="booking-header reveal">
    <div class="section-label" style="justify-content:center;margin-bottom:1.5rem">Maak een afspraak</div>
    <h2 class="section-title">Plan je <em>bezoek</em>.</h2>
    <p>Bellen is het snelst, we plannen direct met je in. Liever digitaal? Vul het formulier in en we bellen je terug.</p>
  </div>

  <div class="booking-grid">
    <div class="booking-side reveal">
      <div class="quick-contact">
        <a href="tel:0515435448" class="qc-card primary">
          <div class="qc-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="qc-label">Bel direct</div>
          <div class="qc-value">0515 435 448</div>
        </a>
        <a href="mailto:Kapper.s@hotmail.com" class="qc-card">
          <div class="qc-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div class="qc-label">E-mail</div>
          <div class="qc-value">Kapper.s@hotmail.com</div>
        </a>
      </div>

      <div class="address-block">
        <div class="address-block-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div>
          <div class="address-block-label">Locatie</div>
          <div class="address-block-value">De Passage 6<br>8442 PH Heerenveen</div>
          <div class="address-block-sub">In winkelcentrum De Passage</div>
        </div>
      </div>

      <div>
        <div class="hours-table-title">Openingstijden</div>
        <div class="hours-table">
          <div class="hours-row">
            <span class="hours-day"><span class="hours-dot"></span>Maandag</span>
            <span class="hours-time">10:00 – 18:00</span>
          </div>
          <div class="hours-row">
            <span class="hours-day"><span class="hours-dot"></span>Dinsdag</span>
            <span class="hours-time">10:00 – 18:00</span>
          </div>
          <div class="hours-row">
            <span class="hours-day"><span class="hours-dot"></span>Woensdag</span>
            <span class="hours-time">10:00 – 18:00</span>
          </div>
          <div class="hours-row">
            <span class="hours-day"><span class="hours-dot"></span>Donderdag</span>
            <span class="hours-time">09:00 – 21:00</span>
          </div>
          <div class="hours-row">
            <span class="hours-day"><span class="hours-dot"></span>Vrijdag</span>
            <span class="hours-time">09:00 – 18:00</span>
          </div>
          <div class="hours-row">
            <span class="hours-day"><span class="hours-dot"></span>Zaterdag</span>
            <span class="hours-time">09:00 – 17:00</span>
          </div>
          <div class="hours-row">
            <span class="hours-day"><span class="hours-dot"></span>Zondag</span>
            <span class="hours-time closed">Gesloten</span>
          </div>
        </div>
      </div>
    </div>

    <div class="booking-form reveal">
      <div class="form-title">Bel ons <em>terug</em></div>
      <div class="form-sub">Laat je gegevens achter, we bellen op een geschikt moment terug om de afspraak in te plannen.</div>

      <div class="form-group">
        <label class="form-label">Naam</label>
        <input type="text" class="form-input" placeholder="Voor- en achternaam">
      </div>

      <div class="form-group">
        <label class="form-label">Telefoon</label>
        <input type="tel" class="form-input" placeholder="06 of 0515 ...">
      </div>

      <div class="form-group">
        <label class="form-label">Type afspraak</label>
        <select class="form-select">
          <option>Heren Knippen</option>
          <option>Dames Knippen & Föhnen</option>
          <option>Kinderen (t/m 12)</option>
          <option>Baard Knippen & Scheren</option>
          <option>Kleuren & Highlights</option>
          <option>Iets anders / advies</option>
        </select>
      </div>

      <button class="btn-submit" onclick="alert('Demo: aanvraag verstuurd! In de live versie wordt dit doorgestuurd naar de kapsalon via e-mail of een booking systeem.')">
        Verstuur aanvraag
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      <div class="form-trust">✓ We bellen binnen 24 uur · ✓ Geen verplichtingen</div>
    </div>
  </div>
</section>

<!-- ====== MAP ====== -->
<section class="map-section">
  <iframe
    class="map-frame"
    src="https://www.openstreetmap.org/export/embed.html?bbox=5.9180%2C52.9580%2C5.9280%2C52.9620&amp;layer=mapnik&amp;marker=52.9600%2C5.9230"
    loading="lazy"
    title="Kapsalon K&S Locatie, De Passage 6, Heerenveen"></iframe>
</section>

<!-- ====== FINAL CTA ====== -->
<section class="final-cta">
  <h2>Tot snel <em>in De Passage</em>.</h2>
  <p>Of je nu binnenwipt voor een kop koffie en een knipbeurt, of een complete restyling, je bent welkom.</p>
  <div class="final-cta-buttons">
    <a href="tel:0515435448" class="btn-primary">
      Bel 0515 435 448
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </a>
    <button class="btn-call" onclick="openBookingModal()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Online aanvragen
    </button>
  </div>
</section>

<!-- ====== FOOTER ====== -->
<footer>
  <div class="footer-top">
    <div>
      <div class="footer-brand">Kapsalon <span>K&S</span></div>
      <p class="footer-tagline">Al jaren de vertrouwde kapsalon in het hart van Heerenveen. Voor dames, heren en kinderen, vakwerk, persoonlijke service en goede koffie.</p>
      <div class="footer-socials">
        <a href="https://www.facebook.com/KapsalonKenS/" target="_blank" rel="noopener" class="social-link" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://www.instagram.com/kapsalon_k.s/" target="_blank" rel="noopener" class="social-link" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="#services">Heren Knippen</a></li>
        <li><a href="#services">Dames Knippen</a></li>
        <li><a href="#services">Kinderen</a></li>
        <li><a href="#services">Baard & Scheren</a></li>
        <li><a href="#services">Kleuren</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="tel:0515435448">0515 435 448</a></li>
        <li><a href="mailto:Kapper.s@hotmail.com">Kapper.s@hotmail.com</a></li>
        <li>De Passage 6</li>
        <li>8442 PH Heerenveen</li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Open</h4>
      <ul>
        <li>Ma – Wo: 10:00 – 18:00</li>
        <li>Do: 09:00 – 21:00</li>
        <li>Vr: 09:00 – 18:00</li>
        <li>Za: 09:00 – 17:00</li>
        <li>Zo: Gesloten</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div>© 2026 Kapsalon K&S · Heerenveen</div>
    <div>Demo Website</div>
  </div>
</footer>

<!-- ====== FLOATING CALL BUTTON ====== -->
<a href="tel:0515435448" class="floating-call" aria-label="Bel direct">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
</a>




<!-- ====== BOOKING MODAL ====== -->
<div class="booking-modal" id="bookingModal" role="dialog" aria-modal="true">
  <div class="booking-modal-content">
    <button class="booking-modal-close" onclick="closeBookingModal()" aria-label="Sluiten">&times;</button>
    <div class="booking-modal-header">
      <div class="booking-modal-eyebrow">Online reserveren</div>
      <div class="booking-modal-title" id="bookingModalTitle">Boek je <em>afspraak</em></div>
    </div>
    <div class="booking-modal-body">
      <div class="booking-progress">
        <div class="booking-progress-step active"></div>
        <div class="booking-progress-step"></div>
        <div class="booking-progress-step"></div>
        <div class="booking-progress-step"></div>
      </div>
      <div id="bookingStep1">
        <div class="booking-step-label">Stap 01 &middot; Kies service</div>
        <div class="booking-service-list" id="bookingServiceList">
          <div style="text-align:center;padding:2rem;color:var(--muted);">Services laden...</div>
        </div>
      </div>
      <div id="bookingStep2" style="display:none;">
        <div class="booking-step-label">Stap 02 &middot; Datum &amp; tijd</div>
        <div class="booking-days-grid" id="bookingDaysGrid"></div>
        <div id="bookingTimesSection" style="display:none;">
          <div class="booking-step-label">Beschikbare tijden</div>
          <div class="booking-times-grid" id="bookingTimesGrid"></div>
        </div>
      </div>
      <div id="bookingStep3" style="display:none;">
        <div class="booking-step-label">Stap 03 &middot; Jouw gegevens</div>
        <div class="booking-input-group">
          <label class="booking-input-label">Naam</label>
          <input type="text" class="booking-input" id="bookingName" placeholder="Voor- en achternaam">
        </div>
        <div class="booking-input-group">
          <label class="booking-input-label">Telefoon</label>
          <input type="tel" class="booking-input" id="bookingPhone" placeholder="06 of 0515 ...">
        </div>
        <div class="booking-input-group">
          <label class="booking-input-label">Email (optioneel)</label>
          <input type="email" class="booking-input" id="bookingEmail" placeholder="je@email.nl">
        </div>
      </div>
      <div id="bookingStep4" style="display:none;">
        <div class="booking-success-icon">&#10003;</div>
        <div class="booking-success-title">Reservering <em>bevestigd</em></div>
        <div class="booking-success-text">We bellen je nog kort om de afspraak te bevestigen. Tot snel bij Kapsalon K&amp;S.</div>
        <div class="booking-summary" id="bookingSummary"></div>
      </div>
      <div id="bookingError" class="booking-error" style="display:none;"></div>
    </div>
    <div class="booking-modal-footer">
      <button class="booking-btn-back" id="bookingBackBtn" onclick="bookingBack()" style="display:none;">&larr; Terug</button>
      <button class="booking-btn-next" id="bookingNextBtn" onclick="bookingNext()" disabled>Volgende &rarr;</button>
    </div>
  </div>
</div>`;
