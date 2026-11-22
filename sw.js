const BASE = new URL('./', self.location.href);
const PREFIX = `evolving-earth:${BASE.pathname}:`;
const CACHE = `${PREFIX}shell:1795262092216`;
const SHELL = [".","index.html","earth.svg","offline-assets.json","assets/earth-3d-CvKDzu3a.css","assets/index-B6CaaxDY.css","assets/index-gGgbrmYW.js"];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    for (const path of SHELL) {
      const url = new URL(path, BASE);
      const response = await fetch(url, { cache: 'reload' });
      if (!response.ok || response.type === 'opaque') throw new Error(`Offline shell failed: ${url}`);
      await cache.put(url, response);
    }
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(`${PREFIX}shell:`) && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type !== 'CHECK_OFFLINE_SHELL' || !event.ports[0]) return;
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE);
      const missing = [];
      for (const path of SHELL) {
        const response = await cache.match(new URL(path, BASE));
        if (!response?.ok) missing.push(path);
      }
      event.ports[0].postMessage({ ok: missing.length === 0, detail: missing.join(', '), version: '1795262092216' });
    } catch (error) {
      event.ports[0].postMessage({ ok: false, detail: String(error) });
    }
  })());
});
async function savedResponse(url) {
  const keys = await caches.keys();
  for (const key of keys.filter(key => key.startsWith(PREFIX)).reverse()) {
    const response = await (await caches.open(key)).match(url);
    if (response) return response;
  }
}
async function storeResponse(request, response) {
  try { await (await caches.open(CACHE)).put(typeof request === 'string' ? request : request.url ?? request.href, response); }
  catch (error) {
    const clients = await self.clients.matchAll();
    for (const client of clients) client.postMessage({ type: 'OFFLINE_STORAGE_ERROR', detail: String(error) });
  }
}
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== BASE.origin || !url.pathname.startsWith(BASE.pathname)) return;
  event.respondWith((async () => {
    const isData = url.pathname.startsWith(new URL('data/', BASE).pathname) || request.headers?.get('X-Evolving-Earth-Data') === '1';
    if (request.mode === 'navigate') {
      try {
        const response = await fetch(request);
        if (response.ok && response.headers.get('content-type')?.includes('text/html')) {
          await storeResponse(new URL('index.html', BASE), response.clone());
        }
        return response;
      } catch {
        return await (await caches.open(CACHE)).match(new URL('index.html', BASE)) ||
          new Response('Offline shell unavailable', { status: 503 });
      }
    }
    if (!isData) {
      const cached = await (await caches.open(CACHE)).match(url);
      if (cached) return cached;
    }
    try {
      const response = await fetch(request);
      if (!isData && response.ok && response.type !== 'opaque' && !response.headers.get('content-type')?.includes('text/html')) {
        await storeResponse(request, response.clone());
      }
      return response;
    } catch {
      return await savedResponse(url) || new Response('Resource not saved for offline use', { status: 503 });
    }
  })());
});
