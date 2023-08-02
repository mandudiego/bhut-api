const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    try {
        await mongoose.connect("mongodb+srv://mandudiego:QKE0ypWiyoGfsRho@dblogs.mcixwfl.mongodb.net/logs?retryWrites=true&w=majority")
        console.log('BD connected successful');
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;
