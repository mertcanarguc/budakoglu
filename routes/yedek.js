const express = require('express');
const router = express.Router();
const Siparis = require("../models/siparis")
const Sira = require("../models/sira")
const async = require("async")

var apikey = "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"

/* GET home page. */
router.get('/', async function(req, res, next) {
	let sira = await Sira.findOne({"ad":"a"})
	res.render("index",{
		title:"title",
		sira:sira
	})
	/*
	new Sira({
		ad:"a",
		sira:0
	}).save((err,data)=>{
		if (!err) {
			console.log("tamam")
		}
	})
	*/
})


router.post("/deneme",async function (req,res,next) {
	const nodemailer = require("nodemailer")
	let sira = await Sira.findById({"_id":"5db4077a401e2b04d87dbf17"})

	const transporter = nodemailer.createTransport({
	  pool: true,
	  host: "smtp.budakoglu.com.tr",
	  port: 465,
	  secure: false, // use TLS
	  auth: {
	    user: "info@budakoglu.com.tr",
	    pass: "Budak.2018"
	  }
	});

	const mailOptions = {
	  from: 'info@budakoglu.com.tr',
	  to: 'arguc.mertcan@gmail.com',
	  subject: "BUDAKOĞLU - SİPARİŞ TALEBİ ",
	  text: 'SİPARİŞ TALEBİ',
	  html: req.body.icerik
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
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
	  				}
	  			})
	  		}
	  	})
	  }
	});
})

router.get("/onayla/:id",function (req,res,next) {
	const nodemailer = require("nodemailer")

	const transporter = nodemailer.createTransport({
	  pool: true,
	  host: "smtp.budakoglu.com.tr",
	  port: 465,
	  secure: false, // use TLS
	  auth: {
	    user: "info@budakoglu.com.tr",
	    pass: "Budak.2018"
	  }
	});

	const mailOptions = {
	  from: 'info@budakoglu.com.tr',
	  to: 'arguc.mertcan@gmail.com',
	  subject: "SİPARİŞ ONAYI",
	  text: req.params.id+"NOLU SİPARİŞ ONAYLANDI.",
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	  	new Siparis(req.body).save((err,data)=>{
	  		if (err) {
	  			console.log(err)
	  		}else{
	    		res.redirect("/")
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
