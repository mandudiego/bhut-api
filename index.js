const express = require('express')
const routes = require('./src/routes')
const axios = require('axios')
// Conexão com Banco de Dados
const conn = require('./src/db/connection.js')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(routes)
app.use(axios)
conn()

app.listen(PORT, () => {
    console.log('Express started at http://localhost:3000')
})
