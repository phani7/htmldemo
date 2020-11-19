self.addEventListener('install', (event) => {
    console.log('service worker installed!!');
    self.skipWaiting();
})

self.addEventListener('activate', (event) => {
    console.log('sevice worker activated!!')
})

self.addEventListener('fetch', (event) => {
    console.log('sw fetch');
})

self.addEventListener('notificationclick', (event) => {
    console.log('sw notificationclick');
});

self.addEventListener('notificationclose', (event) => {
    console.log('sw notificationclose');
});

self.addEventListener('push', (event) => {
    console.log('sw push');
});