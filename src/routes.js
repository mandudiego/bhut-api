const express = require('express');
const routes = express.Router();
const axios = require('axios');

const logCar = require('./models/logCar');

const URL = 'http://api-test.bhut.com.br:3000/api/cars';

// Serviço: listCars - Retorna os dados do endpoint 'http://api-test.bhut.com.br:3000/api/cars'
routes.get('/api/listCars', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Serviço: createCar - Cria um registro no endpoint externo
routes.post('/api/createCar', async (req, res) => {
    try {
        const { title, brand, price, age } = req.body;
        const car = {
            title,
            brand,
            price,
            age,
        };
        const response = await axios.post(URL, car);
        const createdCar = response.data;

        // Salvando log de criação do carro
        const logData = {
            car_id: createdCar._id,
            data_hora: new Date(),
        };
        const log = new logCar(logData);
        await log.save();

        res.json(createdCar);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Serviço: getLogs - Consulta todos os registro salvos na tabela log.
routes.get('/api/logs', async (req, res) => {
    try {
        const logs = await logCar.find();
        res.json(logs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: error.message });
    }
});

module.exports = routes