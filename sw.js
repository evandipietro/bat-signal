this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/bat-signal/fetch.js',
                '/bat-signal/index.html',
                '/bat-signal/batlogo.png',
                '/bat-signal/index.js',
                '/bat-signal/styles.css'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    // intercept batman logo
    // if (event.request.URL.indexOf('batlogo.png')) {
    //     event.respondWith('/bat-signal/joker.jpg');
    // }
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
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
            to: 'dK68Hjg2Sx0:APA91bH6Ms_wzB_2saDVoCFIehzH7IfHReIGB-15QWlw5aR_mQ4e2WaJTbiu614uUHAc8ucQKH8Zkgy1jk1VNRzFJ6WiBoTnyc4io8_UoA96aU0T3VF7wxILy0kz7PDVNz5Pb3Jwhf5S'        })
    }).catch(function() {
        console.log('failed to signal');
    });
}