process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');

if (cluster.isMaster) {
    // index.js is then executed again but in slave/child mode
    // every single child has their separate thread pool
    cluster.fork();
    cluster.fork();
} else {
    const crypto = require('crypto');
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there');
        })
    });

    app.get('/fast', (req, res) => {
        res.send('Super fast');
    })

    app.listen(1818, () => {
        console.log('listening');
    });
}