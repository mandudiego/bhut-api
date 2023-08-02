const logCar = require('../models/logCar');

// getLogs: Consulta todos os logs de registros
async function getLogs(req, res) {
    try {
        const logs = await logCar.find()
        res.json(logs)
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
} 

module.exports = {getLogs}