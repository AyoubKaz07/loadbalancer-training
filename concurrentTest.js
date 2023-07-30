const axios = require('axios');

const url = 'http://localhost:8080';
const numberOfRequests = 100; // What ever you want

const makeRequest = async () => {
    try {
        const response = await axios.get(url);
        console.log(` ${counter}Received response from ${url}, Status: ${response.status}`);
    } catch (error) {
        console.error(`Error while requesting ${url}:`, error.message);
    }
};

const runConcurrentRequests = async () => {
    const requests = Array.from({ length: numberOfRequests }, makeRequest);
    try {
        await Promise.all(requests);
        console.log('All requests completed.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

runConcurrentRequests();