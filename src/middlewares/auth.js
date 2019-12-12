const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.replace('Bearer ', '')
		const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY)

		// checking user exist and the user contain token
		const user = await User.findOne({ _id: payload._id, 'tokens.token': token })
		if (!user) {
			throw new Error()
		}

		req.user = user
		req.token = token

		next()
	} catch (e) {
		res.status(401).send()
	}
}

module.exports = auth