/* Les gadgets indispensables — fonctionnement hors ligne. */

/* Le préfixe est propre à ce bloc. Le stockage des caches est partagé par
   toute l'origine fontan1789.github.io : sans préfixe, le ménage fait à
   l'activation effacerait aussi les caches des autres blocs. */
const PREFIXE = "gadget1-";
const CACHE = PREFIXE + "v14";

/* Le manifest ne figure pas dans cette liste : il porte l'identité de
   l'application et doit toujours être relu sur le réseau. */
const FICHIERS = [
  "./",
  "index.html",
  "memo.html",
  "favicon.ico",
  "icon-48.png",
  "icon-96.png",
  "icon-144.png",
  "icon-180.png",
  "icon-256.png",
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

/* Ne sont supprimés que les caches de ce bloc : ceux dont le nom commence par
   le préfixe, plus les anciens noms « gadget-vNN » d'avant cette correction.
   Les caches des autres blocs sont laissés intacts. */
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(cles => Promise.all(cles
      .filter(c => (c.indexOf(PREFIXE) === 0 || c.indexOf("gadget-v") === 0) && c !== CACHE)
      .map(c => caches.delete(c))))
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

  /* Le manifest n'est jamais mis en cache : c'est lui qui porte l'identité de
     l'application, et une version périmée ferait croire au système qu'il
     s'agit d'une autre application déjà installée. */
  if(e.request.url.indexOf(".webmanifest") !== -1){
    e.respondWith(fetch(e.request, {cache: "no-store"}).catch(() => caches.match(e.request)));
    return;
  }

  /* Icônes : cache d'abord. */
  /* Pas de repli sur index.html ici : renvoyer une page HTML à la place d'une
     icône empêcherait le navigateur de la lire. */
  e.respondWith(caches.match(e.request).then(rep => rep || fetch(e.request).then(res => {
    const copie = res.clone();
    caches.open(CACHE).then(c => c.put(e.request, copie)).catch(() => {});
    return res;
  })));
});
