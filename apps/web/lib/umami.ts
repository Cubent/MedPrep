// Umami (cloud) analytics helpers. The website id is public: it ships in the page source.
export const UMAMI_WEBSITE_ID = '5f8137eb-219f-4c61-ab4f-7b4c128e1576';
export const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number | boolean>) => void;
    };
  }
}

// Umami rejects event names over 50 characters.
const EVENT_NAME_MAX = 50;

/** Send a custom event. No-ops when Umami is blocked or has not loaded yet. */
export const trackEvent = (
  name: string,
  data?: Record<string, string | number | boolean>,
) => {
  if (typeof window === 'undefined') return;
  try {
    window.umami?.track(name.slice(0, EVENT_NAME_MAX), data);
  } catch {
    // Analytics must never break the page.
  }
};
