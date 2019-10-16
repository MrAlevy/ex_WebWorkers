self.importScripts('fibonacci.js');

// activate worker immediately
self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
    console.log('SW activated!')
});

// become available to all pages
self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim()); 
    console.log('SW is available!')
});


self.addEventListener('message', function(event){
    // receive the data from the client
    const data = event.data;

    // the unique ID of the tab
    const clientId = event.source.id 

    // function that handles the message
    self.syncTabState(data, clientId);
});

self.syncTabState = function(data, clientId){
    clients.matchAll().then(function(clients) {
        // loop over all available clients
        clients.forEach(function(client) {
                let arrLength = fibonacci(data);
                self.sendTabState(client, arrLength)
        })
    })
};

self.sendTabState = function(client, data){
    // post data to a specific client
    client.postMessage(data);
};