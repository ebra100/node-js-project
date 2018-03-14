var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var duplicateError = require('mongoose-duplicate-error');

var Schema = mongoose.Schema;

var Feedback = new Schema({
	firstname:{
		type: String,
		required:true
	},
	lastname:{

		type: String,
		required:true
	},
	telnum:{
		type:Number,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	agree:{
		type:Boolean,
		default:false
	},
	contacttype:{
		type:String,
		default:''
	},
	message:{
		type:String,
		required:true	
	}

});

Feedback.plugin(passportLocalMongoose);

module.exports = mongoose.model('Feedback', Feedback);