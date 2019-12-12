const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth, async (req, res) => {
	res.send('creating note endpoint')
})

// router.get('/:id', auth, async (req, res) => {
// 	res.send('fetching a note endpoint')
// })

router.get('/:id/money', auth, async (req, res) => {
	res.send('fetching a note and all money endpoint')
})

router.put('/:id', auth, async (req, res) => {
	res.send('changing a note endpoint')
})

router.delete('/:id', auth, async (req, res) => {
	res.send('deleting a note endpoint')
})

module.exports = router