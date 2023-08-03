const express = require('express');
const routes = express.Router();
const carController = require('./controllers/carController')
const logController = require('./controllers/logController')
const {connectToRabbitMQ} = require('./rabbitmq')


// Inicia conexão com o RabbitMQ
connectToRabbitMQ();

// Serviço: listCars - Retorna os dados do endpoint 'http://api-test.bhut.com.br:3000/api/cars'
routes.get('/api/listCars', carController.listCars);

// Serviço: createCar - Cria um registro no endpoint externo
routes.post('/api/createCar', carController.createCar);

// Serviço: getLogs - Consulta todos os registros salvos na tabela log.
routes.get('/api/logs', logController.getLogs);

// Exporta as rotas para serem usadas no servidor principal
module.exports = routes;
