const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth, async (req, res) => {
	res.send('creating compartment endpoint')
})

router.get('/', auth, async (req, res) => {
	res.send('fetching compartments endpoint')
})

router.get('/:id', auth, async (req, res) => {
	res.send('fetching a compartment endpoint')
})

router.get('/:id/money', auth, async (req, res) => {
	res.send('fetching a compartment and all money endpoint')
})

router.put('/:id', auth, async (req, res) => {
	res.send('changing a compartment endpoint')
})

router.delete('/:id', auth, async (req, res) => {
	res.send('deleting a compartment endpoint')
})

module.exports = router