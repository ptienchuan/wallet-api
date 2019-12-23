const express = require('express')
const auth = require('../middlewares/auth')
const Wallet = require('../models/wallet')
const router = express.Router()

router.post('/', auth, async (req, res) => {
	try {
		const newWallet = new Wallet({
			...req.body,
			owner: req.user._id
		})
		await newWallet.save()
		res.status(201).send(newWallet)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.get('/', auth, async (req, res) => {
	try {
		const wallets = await Wallet.find({
			owner: req.user._id
		})

		if (!wallets || wallets.length <= 0) {
			return res.status(404).send()
		}
		res.send(wallets)
	} catch (e) {
		res.status(500).send()
	}
})

router.put('/:id', auth, async (req, res) => {
	const inputFields = Object.keys(req.body)
	const allowFields = ['name']
	const isValidFields = inputFields.every(field => allowFields.includes(field))

	if (!isValidFields) {
		return res.status(400).send({
			error: "Posted data contain invalid field"
		})
	}

	try {
		const _id = req.params.id
		const wallet = await Wallet.findOne({
			_id,
			owner: req.user._id
		})

		if (!wallet) {
			return res.status(404).send()
		}

		for (const field of inputFields) {
			wallet[field] = req.body[field]
		}
		await wallet.save()
		res.send(wallet)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.delete('/:id', auth, async (req, res) => {
	try {
		const _id = req.params.id
		const wallet = await Wallet.findOne({
			_id,
			owner: req.user._id
		})

		if (!wallet) {
			return res.status(404).send()
		}
		await wallet.remove()
		res.send()
	} catch (e) {
		res.status(500).send()
	}
})

module.exports = router