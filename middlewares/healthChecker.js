const backendservers = require('../config/backendservers')
const availableBackends = require('../config/availableBackends')
const axios = require('axios');


// Configure the health check URL and the check period (in milliseconds)
const healthCheckURL = '/health'; // You can adjust this URL to match your backend servers' health check endpoint
const checkPeriod = 10000; // 10 seconds

// Function to check the health of a backend server
const checkBackendHealth = async (backendURL) => {
    try {
        const response = await axios.get(`${backendURL}${healthCheckURL}`);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

// Function to periodically check the health of all backend servers
const periodicHealthCheck = async () => {
    for (const backendURL of backendservers) {
        const isHealthy = await checkBackendHealth(backendURL);
        if(isHealthy){
            availableBackends.push(backendURL);
        }
        console.log(`${backendURL} is ${isHealthy ? 'healthy' : 'unhealthy'}`);
    }

    // Schedule the next health check after the specified period
    setTimeout(periodicHealthCheck, checkPeriod);
};

module.exports = periodicHealthCheck;