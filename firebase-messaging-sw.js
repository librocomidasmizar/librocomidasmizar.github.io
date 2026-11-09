/* Libro de comidas - Mizar: recibe los avisos al móvil aunque la aplicación esté cerrada */
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyA5dr_N0Z8VqiRWTCDMHbrRsmK6gFsUDBM",
  authDomain: "libro-comidas-mizar.firebaseapp.com",
  projectId: "libro-comidas-mizar",
  storageBucket: "libro-comidas-mizar.firebasestorage.app",
  messagingSenderId: "574865497497",
  appId: "1:574865497497:web:ec6708809617672cd50708"
});
firebase.messaging();
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
/* Al abrir la app, pedir siempre la página al servidor (así nunca se abre una versión antigua guardada).
   Sin conexión, se usa la copia guardada. */
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.mode !== "navigate" || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(fetch(r.url, {cache: "no-cache", credentials: "same-origin"}).catch(() => fetch(r)));
});
