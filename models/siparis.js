const mongoose = require("mongoose")
const Schema = mongoose.Schema

const siparisSchema = new Schema({
	gonderen:String,
	mail:String,
	onay:Number,
	snumber:Number,
	icerik:String
})

module.exports = mongoose.model("Siparis",siparisSchema)