'use client';

import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { META_PIXEL_ID, once, trackMeta } from '../lib/meta-pixel';
import { trackEvent } from '../lib/umami';

const NEW_USER_WINDOW_MS = 15 * 60 * 1000;

// Loads the Meta Pixel once, then reports a PageView on every client-side
// route change (the base snippet only covers the first page load).
export const MetaPixel = () => {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    trackMeta('PageView');
  }, [pathname]);

  // Sign-up completes on Clerk's side, so treat a very recently created
  // account as the registration and report it once per browser.
  useEffect(() => {
    if (!isLoaded || !user?.createdAt) return;
    if (Date.now() - user.createdAt.getTime() > NEW_USER_WINDOW_MS) return;
    once(`mp_meta_reg_${user.id}`, () => {
      trackMeta('CompleteRegistration', { status: true });
      trackEvent('signup-completed');
    });
  }, [isLoaded, user]);

  return (
    <>
      {/* Plain inline script (not next/script): it is part of the server HTML, so the
          fbq stub exists before React hydrates and early events are queued, not lost. */}
      <script
        id="meta-pixel"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Meta's standard base code
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');`,
        }}
      />
      <noscript>
        {/* biome-ignore lint/performance/noImgElement: tracking pixel */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
};
