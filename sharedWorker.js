self.importScripts('fibonacci.js');
let result = 0; // init connection

onconnect = (e) => {
    const port = e.ports[0];

    port.onmessage = (e) => {
        if (e.data !== 'page2') {
            // connection from page 1
            port.postMessage(fibonacci(e.data));
            result = fibonacci(e.data);
        } else { 
            // connection from page 2
            port.postMessage(result);
        }
    }  
}