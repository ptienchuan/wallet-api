const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
		trim: true
	},
	budget: {
		type: Number,
		min: 0,
		default: 0
	},
	wallet: {
		type: ObjectId,
		ref: 'Wallet',
		required: true
	},
	owner: {
		type: ObjectId,
		ref: 'User',
		required: true
	}
})

schema.virtual('money', {
	ref: 'Money',
	localField: '_id',
	foreignField: 'compartment'
})

schema.methods.cleanDataAfterRemoved = async function () {
	await this.populate('money').execPopulate()
	if (this.money.length > 0) {
		for (const money of this.money) {
			money.remove()
		}
	}
}

schema.methods.toJSON = function () {
	compartmentObject = this.toObject()
	if (this.money) {
		compartmentObject.money = this.money
	}
	delete compartmentObject.owner
	return compartmentObject
}

schema.post('remove', async compartment => {
	compartment.cleanDataAfterRemoved()
})

module.exports = mongoose.model('Compartment', schema)