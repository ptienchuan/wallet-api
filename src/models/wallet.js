const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
		trim: true
	},
	owner: {
		type: ObjectId,
		ref: 'User',
		required: true
	}
})

schema.virtual('compartments', {
	ref: 'Compartment',
	localField: '_id',
	foreignField: 'wallet'
})

schema.methods.toJSON = function () {
	const walletObject = this.toObject()
	delete walletObject.owner
	return walletObject
}

schema.methods.cleanDataAfterRemoved = async function () {
	await this.populate('compartments').execPopulate()
	if (this.compartments.length > 0) {
		for (const compartment of this.compartments) {
			compartment.remove()
		}
	}
}

schema.post('remove', async wallet => {
	wallet.cleanDataAfterRemoved()
})

module.exports = mongoose.model('Wallet', schema)