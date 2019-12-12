const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const User = require('../models/user')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/', async (req, res) => {
	const user = new User({
		...req.body,
		avatar: undefined,
		tokens: undefined,
	})
	try {
		await user.save()
		const token = await user.generateToken()
		res.status(201).send({
			user,
			token
		})
	} catch (e) {
		res.status(400).send(e)
	}
})

router.get('/me', auth, (req, res) => {
	res.send(req.user)
})

router.put('/me', auth, async (req, res) => {
	res.send("Changing my profile endpoint")
})

router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body)
		const token = await user.generateToken()
		res.send({
			user,
			token
		})
	} catch (e) {
		res.status(400).send({ error: "Email or password is invalid" })
	}
})

router.post('/logout', auth, async (req, res) => {
	try {
		const user = req.user

		const tokenIndex = user.tokens.findIndex(tokenObj => tokenObj.token === req.token)
		user.tokens.splice(tokenIndex, 1)

		await user.save()
		res.send()
	} catch (e) {
		res.status(500).send()
	}
})

router.post('/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send()
	} catch (e) {
		res.status(500).send()
	}
})

const upload = multer({
	limits: {
		fileSize: 2 * 1024 * 1024 // 2Mb
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
			cb(new Error('The file upload must be a image'))
		}
		cb(null, true)
	}
})

router.post('/me/avatar', auth, upload.single('file'), async (req, res) => {
	try {
		const buffer = await sharp(req.file.buffer).resize(200, 200).toBuffer()
		req.user.avatar = {
			source: buffer,
			mimeType: req.file.mimetype
		}

		await req.user.save()
		res.send()
	} catch (e) {
		res.status(500).send()
	}
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message })
})

router.get('/me/avatar', auth, async (req, res) => {
	try {
		if (!req.user.avatar.source) {
			throw new Error()
		}
		res.set('Content-Type', req.user.avatar.mimeType)
		res.send(req.user.avatar.source)
	}
	catch (e) {
		res.status(404).send()
	}
})

router.delete('/me', (req, res) => {
	res.send("Deleting my avatar endpoint")
})

module.exports = router