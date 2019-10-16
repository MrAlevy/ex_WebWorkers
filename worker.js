self.importScripts('makeArr.js');

onmessage = (e) => {
    postMessage(makeArr(e.data).length);
}