const mongoose = require("mongoose")
const Schema = mongoose.Schema 

const siraSchema = new Schema({
	ad:String,
	sira:Number
})

module.exports = mongoose.model("Sira",siraSchema)