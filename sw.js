/* Les enchères gadget — fonctionnement hors ligne. */
const CACHE = "gadget-v7";
const FICHIERS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png",
  "icon-512-maskable.png",
  "lecon-01-roudi.html",
  "lecon-02-puppet.html",
  "lecon-03-drury.html",
  "lecon-04-spoutnik.html",
  "lecon-05-landy.html",
  "lecon-06-texas.html"
];

/* Mise en cache fichier par fichier : si l'un d'eux manque dans le dépôt,
   les autres sont tout de même enregistrés (addAll aurait tout annulé). */
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(FICHIERS.map(f => c.add(f).catch(() => null))))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(cles => Promise.all(cles.filter(c => c !== CACHE).map(c => caches.delete(c))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;

  /* Pages : réseau d'abord, pour qu'une mise en ligne se voie tout de suite ;
     repli sur le cache hors connexion. */
  if(e.request.mode === "navigate"){
    e.respondWith(
      fetch(e.request).then(res => {
        const copie = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copie)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  /* Icônes, manifest : cache d'abord. */
  e.respondWith(caches.match(e.request).then(rep => rep || fetch(e.request).then(res => {
    const copie = res.clone();
    caches.open(CACHE).then(c => c.put(e.request, copie)).catch(() => {});
    return res;
  }).catch(() => caches.match("./index.html"))));
});
