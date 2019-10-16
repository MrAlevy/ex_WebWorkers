self.importScripts('fibonacci.js');

onmessage = (e) => {
    postMessage(fibonacci(e.data));
}