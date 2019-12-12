const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth, async (req, res) => {
	res.send('creating ledger endpoint')
})

router.get('/', auth, async (req, res) => {
	res.send('fetching ledgers endpoint')
})

router.get('/:id', auth, async (req, res) => {
	res.send('fetching a ledger endpoint')
})

router.get('/:id/notes', auth, async (req, res) => {
	res.send('fetching a ledger and all notes endpoint')
})

router.put('/:id', auth, async (req, res) => {
	res.send('changing a ledger endpoint')
})

router.delete('/:id', auth, async (req, res) => {
	res.send('deleting a ledger endpoint')
})

module.exports = router