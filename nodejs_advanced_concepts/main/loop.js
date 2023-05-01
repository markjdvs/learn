// node myFile.js

// new timers, tasks, operations are recorded from myFile running
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

myFile.runContents();

function shouldContinue() {
    // check one: any pending setTimeout, setInterval, setImmediate?
    // check two: any pending OS tasks?
        // e.g. http server listening to requests on some given port
    // check three: any pending long running operations?
        // e.g. fs module // MD: streams?

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// entire body executes in just one 'tick'
while(shouldContinue()) {
    // 1) node looks at pendingTimers and sees if any functions
    // are ready to be called. setTimeout, setInterval

    // 2) node looks at pendingOSTasks and pendingOperations
    // and calls relevant callbacks
    // e.g. callback from a file being complete

    // 3) pause execution. Continue when ...
    //  - a new pendingOSTask is done e.g. new request has come in a port we're listening to
    //  - a new pendingOperation is done e.g. fetch some file off the hard drive
    //  - a timer is about to complete e.g. setX is about to expire and relevant function needs to be called

    // 4) look at pendingTimers. Call any setImmediate.

    // 5) handle any 'close' events
}

// exit back to terminal