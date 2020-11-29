const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

const SERVER_PORT = config.get('serverPort') || 8080

app.use(express.json({ extended: true }))
app.use(express.static('./public'))

app.use('/api/notes', require('./routes/notes.routes'))

async function serverStart() {
    try {

        await mongoose.connect(
            config.get('mongoUri'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )

        app.listen(SERVER_PORT, () => {
            console.log(`Server started at port: ${SERVER_PORT}...`)
        })
    } catch (e) {
        console.log(`App crashed. Error message: ${e.message}`)
        process.exit(1)
    }
}

serverStart()