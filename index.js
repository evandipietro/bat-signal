window.addEventListener('load', function() {
    var button = document.getElementById('batbutton');
    button.addEventListener('click', signal);
    button.addEventListener('touchstart', signal);

    function signal() {
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
        }).then(function() {
            document.getElementById('terminal')
                .innerText += ('\n' + (new Date()).toISOString() + ' Signal sent.');
        });
    }
});
