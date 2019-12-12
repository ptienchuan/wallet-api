require('./config/database')
const express = require('express')
const app = express()

const userRouter = require('./routers/user')

// assign middlewares
app.use(express.json())

// assign routers
app.use('/users/', userRouter)

app.get('/*', (req, res) => {
	res.send('API is running!')
})

module.exports = app