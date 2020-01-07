const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const config = require('config')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(bodyParser.json())

// MongoDB config
const db = config.get('mongoURI')

// Mongo Connection
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch(err => console.log(err))

// Routing
app.use('/api/items', require('.routes/api/factories'))
app.use('/api/users', require('./routes/api/nodes'))

// Production connection
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))