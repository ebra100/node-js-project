var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Currency = mongoose.Types.Currency;

var Schema = mongoose.Schema;

var promotionSchema=new Schema({
	name:{
		type:String,
		required:true
	},
	image:{
		type:String,
		required:true
	},
	label:{
		type:String,
		default:''
	},
	price:{
		type:Currency,
		required:true,
		min:0
	},
	featured:{
		type:String,
		default:false
	},
	description:{
		type:String,
		required:true
	}

});

Promotions.plugin(passportLocalMongoose);

module.exports = mongoose.model('Promotions', Promotions);
