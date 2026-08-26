const CACHE_VERSION="sazzad-calc-v19";
const APP_SHELL=["./","./index.html","./manifest.json","./update.json"];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE_VERSION).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 event.respondWith(fetch(event.request).then(res=>{
   const copy=res.clone(); caches.open(CACHE_VERSION).then(c=>c.put(event.request,copy)); return res;
 }).catch(()=>caches.match(event.request)));
});
