const express = require('express');
const app = express();
const PORT = 8083; // Use 8082 for backend2.js and 8083 for backend3.js

app.get('/', (req, res) => {
    // Simulate a slow backend server
    setTimeout(() => {
        res.send('Response from slow backend server')
    }, 3000);
});

app.get('/health', (req, res) => {
    // Sending a 200 OK response to indicate that the server is healthy
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});
