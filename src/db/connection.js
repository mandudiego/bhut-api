const mongoose = require('mongoose')
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION
async function main() {
    try {
        await mongoose.connect(
            MONGODB_CONNECTION
        )
        console.log('BD connected successful')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main