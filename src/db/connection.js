const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    try {
        const dbConnectionString = process.env.DB_CONNECTION_STRING;
        if (!dbConnectionString) {
            console.error('A string de conexão do banco de dados não foi configurada.');
            return;
        }

        await mongoose.connect(dbConnectionString);
        console.log('BD connected successful');
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;
