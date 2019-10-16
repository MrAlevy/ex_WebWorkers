self.importScripts('makeArr.js');
let arrLength = 0; // init connection

onconnect = (e) => {
    const port = e.ports[0];

    port.onmessage = (e) => {
        if (e.data !== 'page2') {
            // connection from page 1
            port.postMessage(makeArr(e.data).length);
            arrLength = makeArr(e.data).length;
        } else { 
            // connection from page 2
            port.postMessage(arrLength);
        }
    }  
}