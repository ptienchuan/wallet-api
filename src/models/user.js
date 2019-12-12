const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		validate: function(value) {
			if (!validator.isEmail(value)) {
				throw new Error('The email is invalid')
			}
		}
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		trim: true,
		maxlength: 50,
	},
	avatar: {
		source: Buffer,
		mimeType: String,
	},
	tokens: [{
		token: String
	}]
}, {
	timestamps: true
})

schema.statics.findByCredentials = async function({ email, password }) {
	if (!email || !password) {
		throw new Error()
	}

	const user = await this.findOne({ email })
	if (!user) {
		throw new Error()
	}

	const validPassword = await bcrypt.compare(password, user.password)
	if (!validPassword) {
		throw new Error()
	}

	return user
}

schema.methods.toJSON = function() {
	const user = this
	const resObject = user.toObject()

	delete resObject.password
	delete resObject.avatar
	delete resObject.tokens

	return resObject
}

schema.methods.generateToken = async function() {
	// create a token
	const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1 days' })

	// save the token to database
	this.tokens = this.tokens.concat({token})
	await this.save()

	return token
}

schema.pre('save', async function(){
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, parseInt(process.env.HASHED_ROUND))
	}
})

module.exports = mongoose.model('User', schema)