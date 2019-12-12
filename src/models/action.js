const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
		trim: true
	},
	value: {
		type: Number,
		min: 0,
		default: 0,
	},
	isPlus: {
		type: Boolean,
		default: true
	},
	money: {
		type: ObjectId,
		required: true
	},
	owner: {
		type: ObjectId,
		required: true
	}
})

module.exports = mongoose.model('Action', schema)