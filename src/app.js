require('./config/database')
const express = require('express')
const app = express()

const userRouter = require('./routers/user')
const walletRouter = require('./routers/wallet')
const compartmentRouter = require('./routers/compartment')
const moneyRouter = require('./routers/money')

// assign middlewares
app.use(express.json())

// assign routers
app.use('/users', userRouter)
app.use('/wallets', walletRouter)
app.use('/compartments', compartmentRouter)
app.use('/money', moneyRouter)

app.get('/', (req, res) => {
	res.send('API is running!')
})

app.all('/*', (req, res) => {
	res.status(404).send()
})

module.exports = app