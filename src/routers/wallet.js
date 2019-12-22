const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth, async (req, res) => {
	res.send('creating wallet endpoint')
})

router.get('/:id/compartments', auth, async (req, res) => {
	res.send('fetching compartments of a wallet endpoint')
})

router.put('/:id', auth, async (req, res) => {
	res.send('changing a wallet endpoint')
})

router.delete('/:id', auth, async (req, res) => {
	res.send('deleting a wallet endpoint')
})

module.exports = router