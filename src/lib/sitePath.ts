const RAW_BASE_URL = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
const BASE_PATH = RAW_BASE_URL === '' || RAW_BASE_URL === '/' ? '' : RAW_BASE_URL;

function ensureLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function getBasePath(): string {
  return BASE_PATH;
}

export function toSitePath(target: string): string {
  if (!target) return target;
  if (target.startsWith('#')) return target;
  if (target.startsWith('http://') || target.startsWith('https://')) return target;
  if (target.startsWith('mailto:') || target.startsWith('tel:')) return target;
  if (!target.startsWith('/')) return target;
  if (!BASE_PATH) return target;
  return `${BASE_PATH}${target}`;
}

export function stripBasePath(pathname: string): string {
  if (!BASE_PATH) return pathname || '/';
  if (pathname === BASE_PATH) return '/';
  if (pathname.startsWith(`${BASE_PATH}/`)) {
    const stripped = pathname.slice(BASE_PATH.length);
    return stripped || '/';
  }
  return pathname || '/';
}

export function applySpaRedirectIfNeeded(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const redirectedPath = params.get('p');
  if (!redirectedPath) return;

  const preservedQuery = params.get('q') || '';
  params.delete('p');
  params.delete('q');
  const remainingQuery = params.toString();

  const mergedQuery = [preservedQuery, remainingQuery].filter(Boolean).join('&');
  const restoredPath = toSitePath(ensureLeadingSlash(redirectedPath));
  const nextUrl = `${restoredPath}${mergedQuery ? `?${mergedQuery}` : ''}${window.location.hash || ''}`;

  window.history.replaceState(null, '', nextUrl);
}

