const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mailSchema = new Schema({
	firma:String,
	mail:String,
	createdAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Mail",mailSchema)