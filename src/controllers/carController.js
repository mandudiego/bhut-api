const axios = require('axios')
const logCar = require('../models/logCar')
const {connectToRabbitMQ} = require('../rabbitmq')

const URL = 'http://api-test.bhut.com.br:3000/api/cars';

async function listCars(req, res) {
    try {
        const response = await axios.get(URL)
        const data = response.data
        res.json(data)
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
}

async function createCar(req, res) {
    try {
        // Extrai os dados do corpo da requisição
        const {title, brand, price, age} = req.body
        const car = {
            title,
            brand,
            price,
            age,
        }

        // Requisição POST para o endpoint externo 
        const response = await axios.post(URL, car)
        const createdCar = response.data

        // Salvando log de criação do carro no banco de dados
        const logData = {
            car_id: createdCar._id,
            data_hora: new Date(),
        }

        const log = new logCar(logData)
        await log.save()

        // Conexão com o RabbitMQ e envia a mensagem para a fila 'car_created_queue'
        const channel = await connectToRabbitMQ()
        channel.sendToQueue('car_created_queue', Buffer.from(JSON.stringify(createdCar)))

        // Retorna o carro criado como resposta da requisição
        res.json(createdCar)
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
}

module.exports = {
    listCars,
    createCar,
}