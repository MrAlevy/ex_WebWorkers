const res = document.getElementById('res');

// start counter
nonBlockingCounter();

/**
 * workers api's
 */

// web worker
const runWeb = () => {
    const val = getValue();
    const webWorker = new Worker('worker.js');

    webWorker.postMessage(val);
    webWorker.onmessage = (e) => {
        showResult('Web Worker', e.data); 
    }
}

// shared worker
const runShared = () => {
    const val = getValue();
    const sharedWorker = new SharedWorker('sharedWorker.js');
    sharedWorker.port.postMessage(val);
    sharedWorker.port.onmessage = (e) => {
        console.log(e.data)
        showResult('Shared Worker', e.data); 
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