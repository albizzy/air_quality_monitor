const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// require('express-async-errors');

const app = express()

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())

let sensorData = {
    temperature: 0,
    temperatureStatus: '',
    humidity: 0,
    humidityStatus: '',
    gasLevel: 0,
    gasLevelStatus: ''
};

// middleware to verify incoming sensor data
const validateSensorData = (req, res, next) => {
    const { temperature, temperatureStatus, humidity, humidityStatus, gasLevel, gasLevelStatus } = req.body;

    if (
        typeof temperature !== 'number' ||
        typeof temperatureStatus !== 'string' ||
        typeof humidity !== 'number' ||
        typeof humidityStatus !== 'string' ||
        typeof gasLevel !== 'number' ||
        typeof gasLevelStatus !== 'string'
    ) {
        const error = new Error('Invalid sensor data format');
        error.status = 400;
        return next(error);
    }
    next();
}

app.post('/update',validateSensorData, (req, res) => {
    sensorData = req.body;
    res.send('Data received');
});

app.get('/data', (req, res) => {
    res.json(sensorData);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
        message: err.message
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});