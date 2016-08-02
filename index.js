window.addEventListener('load', function() {
    var button = document.getElementById('batbutton');
    var reg;
    button.addEventListener('click', signal);
    button.addEventListener('touchstart', signal);

    function isOnline() {
        var connectionStatus = document.getElementById('connectionStatus');

        if (navigator.onLine) {
            appendToTerminal('System Online');
        } else {
            appendToTerminal('System Offline');
        }
    }

    window.addEventListener('online', isOnline);
    window.addEventListener('offline', isOnline);
    isOnline();


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/bat-signal/sw.js')
            .then(function(registry) {
                reg = registry;
                console.log('Worker ready');
            });
    }

    function signal() {

        reg.sync.register('signalSync').then(function() {
            appendToTerminal('Signal sent');
        }).catch(function(error) {
            appendToTerminal('No network.');
        });
    }

    function appendToTerminal(text) {
        document.getElementById('terminal')
            .innerText += ('\n' + (new Date()).toISOString() + ' ' + text);
    }
});