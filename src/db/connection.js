const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect(
            'mongodb+srv://mandudiego:IMbQ1y3MYI86TU5Y@cluster0.d0dftbs.mongodb.net/?retryWrites=true&w=majority'
        )
        console.log('BD connected successful')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main