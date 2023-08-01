const express = require('express')
const routes = express.Router()
const axios = require('axios')

// Serviço: listCars - Retorna os dados do endpoint 'http://api-test.bhut.com.br:3000/api/cars'
routes.get('/api/listCars', async (req, res) => {
    try {
        const response = await axios.get('http://api-test.bhut.com.br:3000/api/cars')
        const data = response.data
        res.json(data)
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
})

module.exports = routes