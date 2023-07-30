const express = require('express');
const app = express();
const PORT = 8082; // Use 8082 for backend2.js and 8083 for backend3.js

app.get('/', (req, res) => {
    
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
