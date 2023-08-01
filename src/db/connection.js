const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect(
            // K999lgVil4MlJcZy
            'mongodb+srv://mandudiego:K999lgVil4MlJcZy@dblogs.mcixwfl.mongodb.net/?retryWrites=true&w=majority'
        )
        console.log('BD connected successful')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main