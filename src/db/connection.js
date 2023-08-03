const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log('BD connected successful');
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;
