const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

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

app.post('/update', (req, res) => {
    sensorData = req.body;
    res.send('Data received');
});

app.get('/data', (req, res) => {
    res.json(sensorData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});