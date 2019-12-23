const express = require('express')
const auth = require('../middlewares/auth')
const Money = require('../models/money')
const router = express.Router()

router.post('/', auth, async (req, res) => {
	try {
		const newMoney = new Money({
			...req.body,
			owner: req.user._id
		})
		await newMoney.save()
		res.status(201).send(newMoney)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.get('/:id', auth, async (req, res) => {
	try {
		const _id = req.params.id
		const money = await Money.findOne({
			_id,
			owner: req.user._id
		})

		if (!money) {
			throw new Error()
		}
		res.send(money)
	} catch (e) {
		res.status(404).send()
	}
})

router.put('/:id', auth, async (req, res) => {
	const inputFields = Object.keys(req.body)
	const allowFields = ['name', 'cost', 'spended', 'note']
	const isValidFields = inputFields.every(field => allowFields.includes(field))

	if (!isValidFields) {
		return res.status(404).send({
			error: 'Posted fields contain invalid field'
		})
	}

	try {
		const _id = req.params.id
		const money = await Money.findOne({
			_id,
			owner: req.user._id
		})

		if (!money) {
			return res.status(404).send()
		}

		for (const field of inputFields) {
			money[field] = req.body[field]
		}
		await money.save()
		res.send(money)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.delete('/:id', auth, async (req, res) => {
	try {
		const _id = req.params.id
		const money = await Money.findOne({
			_id,
			owner: req.user._id
		})
		if (!money) {
			return res.status(404).send()
		}
		await money.remove()
		res.send()
	} catch (e) {
		res.status(500).send()
	}
})

module.exports = router