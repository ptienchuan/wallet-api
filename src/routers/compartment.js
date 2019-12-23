const express = require('express')
const auth = require('../middlewares/auth')
const Compartment = require('../models/compartment')
const router = express.Router()

router.post('/', auth, async (req, res) => {
	try {
		const newCompartment = new Compartment({
			...req.body,
			owner: req.user._id
		})

		await newCompartment.save()
		res.status(201).send(newCompartment)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.get('/', auth, async (req, res) => {
	let filter = {
		owner: req.user._id
	}
	let fetchMoney = false

	if (req.query.wallet) {
		filter.wallet = req.query.wallet.toLowerCase()
	}
	if (req.query.fetchMoney) {
		fetchMoney = req.query.fetchMoney.toLowerCase() === 'true'
	}

	try {
		const compartments = await Compartment.find(filter)

		if (!compartments || compartments.length === 0) {
			throw new Error()
		}

		if (fetchMoney) {
			for (const compartment of compartments) {
				await compartment.populate('money').execPopulate()
			}
		}

		res.send(compartments)
	} catch (e) {
		res.status(404).send()
	}
})

router.get('/:id', auth, async (req, res) => {
	try {
		const _id = req.params.id
		const compartment = await Compartment.findOne({
			_id,
			owner: req.user._id
		})

		if (!compartment) {
			throw new Error()
		}
		res.send(compartment)
	} catch (e) {
		res.status(404).send()
	}
})

router.put('/:id', auth, async (req, res) => {
	const inputFields = Object.keys(req.body)
	const allowFields = ['name', 'budget']
	const isValidFields = inputFields.every(field => allowFields.includes(field))

	if (!isValidFields) {
		return res.status(400).send({
			error: "Posted fields contain invalid field"
		})
	}

	try {
		const _id = req.params.id
		const compartment = await Compartment.findOne({
			_id,
			owner: req.user._id
		})

		if (!compartment) {
			return res.status(404).send()
		}

		for (const field of inputFields) {
			compartment[field] = req.body[field]
		}
		await compartment.save()
		res.send(compartment)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.delete('/:id', auth, async (req, res) => {
	try {
		const _id = req.params.id
		const compartment = await Compartment.findOne({
			_id,
			owner: req.user._id
		})

		if (!compartment) {
			return res.status(404).send()
		}
		await compartment.remove()
		res.send()
	} catch (e) {
		res.status(500).send(e)
	}
})

module.exports = router