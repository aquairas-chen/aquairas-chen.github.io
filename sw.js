// 旧版缓存清理脚本：注销本 Service Worker 并清空所有 Cache Storage，
// 然后刷新所有已打开的页面（新版应用不再使用 SW）。
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => clients.forEach(c => c.navigate(c.url)))
  );
});
