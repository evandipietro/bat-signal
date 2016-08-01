window.addEventListener('load', function() {
    var button = document.getElementById('batbutton');
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


    function signal() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(function(reg) {
                    return reg.sync.register('signalSync');
                })
                .then(function() {
                    appendToTerminal('Signal sent');
                }).catch(function(error) {
                    appendToTerminal('No network.');
                });
        }
    }

    function appendToTerminal(text) {
        document.getElementById('terminal')
            .innerText += ('\n' + (new Date()).toISOString() + text);
    }
});