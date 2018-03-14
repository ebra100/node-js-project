var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;


var leaderSchema=new Schema({
	name:{
		type:String,
		required:true 
	},
	image:{
		type:String,
		required:true,
	},
	designation:{
		type:String,
		required:true
	},
	abbr:{
		type:String,
		required:true
	},
	featured :{
		type:String,
		default:false,
	},
	description:{
		type:String,
		required:true
	}
});
Leaders.plugin(passportLocalMongoose);

module.exports = mongoose.model('Leaders', Leaders);
