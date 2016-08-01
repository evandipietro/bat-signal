this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/fetch.js',
                '/index.html',
                '/batlogo.png',
                '/index.js',
                '/styles.css'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('sync', function(event) {
    if (event.tag == 'signalSync') {
        event.waitUntil(postToFCM());
    }
});

function postToFCM() {
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AIzaSyA0qWkS8Gt-1lV_3BE26LVuvYiI0lMrWzg'
        },
        body: JSON.stringify({
            content_available: true,
            to: 'fbtpjZK_Ato:APA91bEhfmti0ZidTi-pxURqqt7YcuUkdsj69U7nKdM0r9DniLi0KR311xEtjedppVv9kv5nEuBqHEkBleNpO5YEyQBFUCCZFKCzhFl_gHpL9MHDi2glvCeLCQEltnaNAZtv47s09nCh'
        })
    }).catch(function() {
        console.log('failed to signal');
    });
}
