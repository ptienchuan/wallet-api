const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth, async (req, res) => {
	res.send('creating action endpoint')
})

// router.get('/:id', auth, async (req, res) => {
// 	res.send('fetching a action endpoint')
// })

router.put('/:id', auth, async (req, res) => {
	res.send('changing a action endpoint')
})

router.delete('/:id', auth, async (req, res) => {
	res.send('deleting a action endpoint')
})

module.exports = router