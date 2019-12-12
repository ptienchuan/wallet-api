const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth, async (req, res) => {
	res.send('creating money endpoint')
})

// router.get('/:id', auth, async (req, res) => {
// 	res.send('fetching a money endpoint')
// })

router.put('/:id', auth, async (req, res) => {
	res.send('changing a money endpoint')
})

router.delete('/:id', auth, async (req, res) => {
	res.send('deleting a money endpoint')
})

module.exports = router