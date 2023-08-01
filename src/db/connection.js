const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect(
            // MwGr1feyZQLHSuZr
            'mongodb+srv://mandudiego:MwGr1feyZQLHSuZr@logcars.cqapqgq.mongodb.net/?retryWrites=true&w=majority'
        )
        console.log('BD connected successful')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main