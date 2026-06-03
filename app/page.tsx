'use client';

import { useEffect, useRef } from 'react';
import { siteMarkup } from './_site-markup';
import { siteScript } from './_site-script';

export default function HomePage() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    // Voer het originele site-script uit nadat de markup in de DOM staat.
    const s = document.createElement('script');
    s.textContent = siteScript;
    document.body.appendChild(s);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: siteMarkup }} />;
}
