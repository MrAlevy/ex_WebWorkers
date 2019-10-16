const res = document.getElementById('res');

// start counter
nonBlockingCounter();

/**
 * workers api's
 */

//** web worker **
const runWeb = () => {
    const val = getValue();
    const webWorker = new Worker('worker.js');

    webWorker.postMessage(val);
    webWorker.onmessage = (e) => {
        console.log('get: ', e.data)
        showResult('Web Worker', e.data); 
    }
}


//** shared worker **
const runShared = () => {
    const val = getValue();
    const sharedWorker = new SharedWorker('sharedWorker.js');

    sharedWorker.port.postMessage(val);
    sharedWorker.port.onmessage = (e) => {
        console.log('get: ', e.data)
        showResult('Shared Worker', e.data); 
    }
}


//** service worker **
const runService = () => {
    const val = getValue();

    navigator.serviceWorker.controller.postMessage(val);
    navigator.serviceWorker.onmessage = (e) => {
        console.log('get: ', e.data)
        showResult('Service Worker', e.data); 
    }
}

// register service worker
const regService = () => {
    if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
        navigator.serviceWorker
            .register('service-worker.js', { scope: '/' })
            .then(function(reg) {
                res.innerText = 'Service Worker registered!'; 
                console.log('Registration succeeded. Scope is ' + reg.scope);
            })
            .catch(function(error) {
                res.innerText = 'Service Worker register failed!'; 
                console.log('Registration failed with ' + error);
            })
    } else {
        res.innerText = 'Error: Service Worker already registered!';
    }
}


/**
 * functions
 */

function nonBlockingCounter() {
    mS = typeof(mS) === 'undefined' ? 0 : mS;
    document.getElementById('timer').innerHTML = mS;
    mS++;
    setTimeout(nonBlockingCounter, 100);
}

function getValue() {
    res.innerText = ''
    return document.getElementById('val').value;
}

function showResult(workerType, result) {
    res.innerText = workerType + ' is FINISH! array length: ' + result;
}