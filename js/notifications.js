let permission;
let swReg = null;
function featureDetect() {
    if (!('Notification' in window)) {
        console.log('Notifications are not supported');
        return false;
    } else if (!('serviceWorker' in navigator)) {
        console.log('Service Worker is not supported');
        return false;
    } else if (!('PushManager' in window)) {
        console.log('Push Manager is not supported');
        return false;
    } else {
        return true;
    }
}

function registerServiceWorker() {
    navigator.serviceWorker.register('../service.worker.js')
        .then(registration => console.log('service worked registered!!'))
        .catch(error => console.error(error));
}

function unregisterServiceWorker() {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
            registration.unregister();
            console.log('service worker unregistered!!')
        }
    })
}

function subscribeUser() {
    // check subscription
    swReg.pushManager.getSubscription().then(subscription => {
        console.log(subscription);
        const appServerKey = '';
        // new subscription
        swReg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: appServerKey, }).then(sub => {

        })
    })
}

window.addEventListener('beforeunload', (event) => { console.log('before unload'); })
window.addEventListener('unload', (event) => { console.log('unload'); unregisterSW(); })

function pageInit() {
    featureDetect() ? registerServiceWorker() : null;
    let notifyBtn = document.getElementById('notify-btn');
    let notifyswBtn = document.getElementById('notifysw-btn');
    let pushBtn = document.getElementById('push-btn');
    let subscribeBtn = document.getElementById('subscribe-btn');

    Notification.requestPermission().then(response => {
        permission = response;
        if (response === 'granted') {
            let notifyOptions = {
                // actions: [],
                badge: '',
                body: 'Simple Notification <b>hh</b>',
                data: {},
                dir: 'auto',    //auto |ltr |rtl
                lang: '',
                tag: '',
                icon: '../assets/briefcase_512.png',
                image: '../assets/apple.png',
                renotify: false,
                requireInteraction: true,
                silent: false,
                sound: '../assets/notify.mp3',
                timestamp: '',
                vibrate: [50, 100, 50, 200]
            }
            notifyBtn.addEventListener('click', (e) => {

                let notify = new Notification('In-app Notification', notifyOptions)

                notify.onshow = ev => { console.log('notification onshow event'); };
                notify.onclick = ev => { console.log('notification onclick event'); };
                notify.onclose = ev => { console.log('notification onclose event'); };
                notify.onerror = ev => { console.log('notification onerror event'); };
            })

            notifyswBtn.addEventListener('click', (e) => {
                navigator.serviceWorker.getRegistration().then(reg => {
                    swReg = reg;
                    reg.showNotification('In-app Notification', { ...notifyOptions, body: 'notification from service worker' });
                })
            })
        }
    });
}

pageInit();