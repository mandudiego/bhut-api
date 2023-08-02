const express = require('express');
const routes = express.Router();
const axios = require('axios');
const amqp = require('amqplib');
const logCar = require('./models/logCar');

const URL = 'http://api-test.bhut.com.br:3000/api/cars';

// Função para conectar ao RabbitMQ
async function connectToRabbitMQ() {
    try {
        // Estabelece a conexão com o servidor RabbitMQ na URL 'amqp://localhost'
        const connection = await amqp.connect('amqp://localhost');
        // Cria um canal para realizar as operações no RabbitMQ
        const channel = await connection.createChannel();

        // Nome da fila onde as mensagens serão consumidas
        const queue = 'car_created_queue';
        // Declaração da fila no RabbitMQ com a opção { durable: false }
        // Isso indica que a fila não será persistente, ou seja, será removida após o reinício do servidor RabbitMQ
        await channel.assertQueue(queue, { durable: false });

        // Chama a função consumeFromQueue para começar a consumir a fila
        consumeFromQueue(channel);

        // Retorna o canal para ser usado em outras partes do código
        return channel;
    } catch (error) {
        console.error('Erro ao conectar com o RabbitMQ', error);
    }
}

// Função para consumir as mensagens da fila
async function consumeFromQueue(channel) {
    try {
        // Nome da fila onde as mensagens serão consumidas
        const queue = 'car_created_queue';
        // Declaração da fila no RabbitMQ com a opção { durable: false }
        // Isso indica que a fila não será persistente, ou seja, será removida após o reinício do servidor RabbitMQ
        await channel.assertQueue(queue, { durable: false });

        console.log('Aguardando novos carros na fila...');

        // Inicia o consumo da fila
        // Quando uma mensagem chega na fila, a função callback será chamada
        channel.consume(queue, (message) => {
            if (message !== null) {
                // Converte a mensagem recebida (formato Buffer) para um objeto JavaScript
                const carData = JSON.parse(message.content.toString());
                console.log('Novo carro cadastrado:', carData);

                // Acknowledge (ack) da mensagem
                // Isso informa ao RabbitMQ que a mensagem foi processada com sucesso
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('Erro ao consumir a fila do RabbitMQ:', error);
    }
}

// Cria uma Promise que resolve quando a conexão com o RabbitMQ for estabelecida
const channelPromise = connectToRabbitMQ();

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
        // Extrai os dados do carro do corpo da requisição
        const { title, brand, price, age } = req.body;
        const car = {
            title,
            brand,
            price,
            age,
        };

        // Faz uma requisição POST para o endpoint externo 'http://api-test.bhut.com.br:3000/api/cars'
        const response = await axios.post(URL, car);
        const createdCar = response.data;

        // Salvando log de criação do carro no banco de dados
        const logData = {
            car_id: createdCar._id,
            data_hora: new Date(),
        };
        const log = new logCar(logData);
        await log.save();

        // Faz a conexão com o RabbitMQ e envia a mensagem para a fila 'car_created_queue'
        const channel = await channelPromise;
        channel.sendToQueue('car_created_queue', Buffer.from(JSON.stringify(createdCar)));

        // Retorna o carro criado como resposta da requisição
        res.json(createdCar);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Serviço: getLogs - Consulta todos os registros salvos na tabela log.
routes.get('/api/logs', async (req, res) => {
    try {
        const logs = await logCar.find();
        res.json(logs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: error.message });
    }
});

// Exporta as rotas para serem usadas no servidor principal
module.exports = routes;
