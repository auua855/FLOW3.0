const CACHE_NAME = 'floating-ray-cache-v24';
const ASSETS = [
    './',
    './index.html',
    './assets/images/icon_192.png',
    './assets/images/icon_512.png',
    './three.min.js',
    './assets/audio/day musho.mp3',
    './assets/audio/day gal.mp3',
    './assets/audio/day por.mp3',
    './assets/audio/day koky.mp3',
    './assets/audio/night 1.mp3',
    './assets/audio/night seka.mp3',
    './assets/audio/night seka2.mp3',
    './assets/audio/night umi.mp3'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
