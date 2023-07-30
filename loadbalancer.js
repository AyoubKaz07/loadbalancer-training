const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const periodicHealthCheck = require('./middlewares/healthChecker');
const availableBackends = require('./config/availableBackends');

const app = express();
const PORT = 8080;


// Start the periodic health checks
periodicHealthCheck();

const proxyMiddleware = (req, res, next) => {
    // Select a healthy backend server based on the status map
    if (availableBackends.length === 0) {
        // If no backend server is healthy, return a 503 Service Unavailable response
        res.sendStatus(503);
    } else {
        // Choose a backend server using round-robin from the healthy ones
        const selectedBackend = availableBackends.shift();
        availableBackends.push(selectedBackend);

        console.log(`Forwarding request to ${selectedBackend}`);

        // Use http-proxy-middleware to proxy the request to the selected backend
        createProxyMiddleware({ target: selectedBackend, changeOrigin: true })(req, res, next);
    }
};

app.use('/', proxyMiddleware);

app.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
});