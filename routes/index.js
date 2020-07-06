const express = require('express');
const router = express.Router();
const Siparis = require("../models/siparis")
const Sira = require("../models/sira")
const Mail = require("../models/mail")
const async = require("async")

router.get('/', async function(req, res, next) {
	let sira = await Sira.findOne({"_id":"5f02e966f9658d1329c0fef4"})
	//let sira = await Sira.findOne({"_id":"5e74980b62bc1d2e81c66354"})
	let mail = await Mail.find({ })
	let siparis = await Siparis.find({})
	res.render("index",{
		title:"title",
		sira:sira,
		siparis:siparis,
		mail:mail
	})
})

router.get("/silbakalim",async function (req,res,next) {
	let sira = await Sira.findOne({"_id":"5f02e966f9658d1329c0fef4"})
	//let sira = await Sira.findOne({"_id":"5e74980b62bc1d2e81c66354"})
	Siparis.deleteMany({},(err,data)=>{
		if (!err) {
			sira.update({
				sira:0
			},(err,data)=>{
				if (!err) {
					res.redirect("/")
				}
			})
		}
	})
})

router.get("/siparis/:id",async function (req,res,next) {
	let siparis = await Siparis.findById({"_id":req.params.id})

	res.render("siparis",{
		siparis:siparis
	})
})

router.post("/deneme",async function (req,res,next) {
	const nodemailer = require("nodemailer")
	let sira = await Sira.findById({"_id":"5f02e966f9658d1329c0fef4"})
	//let sira = await Sira.findById({"_id":"5db4077a401e2b04d87dbf17"})

	const transporter = nodemailer.createTransport({
	  pool: true,
	  host: "smtp.budakoglu.com.tr",
	  port: 587,
	  secure: false, // use TLS
	  auth: {
	    user: "info@budakoglu.com.tr",
	    pass: "Budak.2018"
	  }
	});

	const mailOptions = {
	  from: 'info@budakoglu.com.tr',
	  to: req.body.mail,
	  subject: req.body.subject,
	  text: 'SİPARİŞ TALEBİ',
	  html: req.body.icerik
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    res.send(error)
	  } else {
	  	new Siparis(req.body).save((err,data)=>{
	  		if (err) {
	  			res.json(err)
	  		}else{
	  			sira.update({
	  				sira:sira.sira+1
	  			},(err,data)=>{
	  				if (!err) {
	  					console.log(data)
	  					res.redirect("/")
	  				}else{
	  					res.json(err)
	  				}
	  			})
	  		}
	  	})
	  }
	});
})

router.post("/mailekle",function (req,res,next) {
	new Mail({
		firma:req.body.firma,
		mail:req.body.mail
	}).save((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/")
		}
	})
})

router.get("/mailsil/:id",async function (req,res,next) {
	let mail = await Mail.findById({"_id":req.params.id})

	mail.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/")
		}
	})
})

router.get("/onayla/:id",function (req,res,next) {
	const nodemailer = require("nodemailer")

	const transporter = nodemailer.createTransport({
	  pool: true,
	  host: "smtp.budakoglu.com.tr",
	  port: 587,
	  secure: false, // use TLS
	  auth: {
	    user: "info@budakoglu.com.tr",
	    pass: "Budak.2018"
	  }
	});

	const mailOptions = {
	  from: 'info@budakoglu.com.tr',
	  to: 'info@budakoglu.com.tr',
	  subject: "SİPARİŞ ONAYI",
	  text: req.params.id+"NOLU SİPARİŞ ONAYLANDI.",
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	  	new Siparis(req.body).save((err,data)=>{
	  		if (err) {
	  			res.send(err)
	  		}else{
	    		res.redirect("https://www.budakoglu.com.tr")
	  		}
	  	})
	  }
	});
})

router.get("/siraolustur",async function (req,res,next) {
	new Sira({
		ad:"a",
		sira:0
	}).save((err,data)=>{
		if (!err) {
			res.redirect("/")
		}
	})
})

router.get("/sira",async function (req,res,next) {
	let sira = await Sira.find({ })
	res.json(sira)
})








module.exports = router;
