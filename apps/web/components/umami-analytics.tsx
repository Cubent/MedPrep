'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID, trackEvent } from '../lib/umami';

const CLICKABLE = 'button, a[href], [role="button"], summary, input[type="submit"]';
const LABEL_MAX = 40;

const clean = (value: string | null | undefined) =>
  (value ?? '').replace(/\s+/g, ' ').trim().slice(0, LABEL_MAX);

const sectionOf = (element: Element) => {
  if (element.closest('[role="dialog"]')) return 'modal';
  if (element.closest('header')) return 'header';
  if (element.closest('footer')) return 'footer';
  if (element.closest('aside')) return 'sidebar';
  if (element.closest('nav')) return 'nav';
  return element.closest('[id]')?.id || 'page';
};

// Loads Umami and reports every click on a button or link, so new buttons are tracked
// automatically. Give an element `data-track="name"` to choose its name, or
// `data-umami-ignore` (on it or a parent) to leave it out.
export const UmamiAnalytics = () => {
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest(CLICKABLE);
      if (!element || element.closest('[data-umami-ignore]')) return;

      const explicit = clean(element.getAttribute('data-track')) || clean(element.getAttribute('aria-label'));
      const isPractice = pathRef.current.includes('/dashboard/practice');
      // On the practice screen the visible text is question and answer content:
      // only report elements that carry an explicit name.
      if (isPractice && !explicit) return;

      const label =
        explicit || clean(element.textContent) || clean(element.getAttribute('title')) || 'icon';
      const anchor = element instanceof HTMLAnchorElement ? element : null;
      const isExternal = anchor ? anchor.origin !== window.location.origin : false;
      const kind = isExternal ? 'outbound' : anchor ? 'link' : 'button';

      trackEvent(`${kind}: ${label}`, {
        label,
        kind,
        page: pathRef.current,
        section: sectionOf(element),
        ...(anchor && { href: anchor.getAttribute('href') ?? '' }),
      });
    };

    // Capture phase so handlers that stop propagation cannot hide a click.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <Script
      src={UMAMI_SCRIPT_URL}
      data-website-id={UMAMI_WEBSITE_ID}
      // Only count the real site, not localhost or preview deployments.
      data-domains="www.medprepinstitute.org,medprepinstitute.org"
      strategy="afterInteractive"
      defer
    />
  );
};
