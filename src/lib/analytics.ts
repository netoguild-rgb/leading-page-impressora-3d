export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

function normalizePayload(payload: AnalyticsPayload): Record<string, unknown> {
  return Object.entries(payload).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') return;

  const normalized = normalizePayload(payload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, normalized);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...normalized,
    });
  }

  if (typeof window.plausible === 'function') {
    window.plausible(eventName, { props: normalized });
  }
}
