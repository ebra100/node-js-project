var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var duplicateError = require('mongoose-duplicate-error');

var Schema = mongoose.Schema;

var Favourite = new Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'User',
	},
	dishes:[{

		  type: mongoose.Schema.Types.ObjectId,
		  ref:'Dish'
	}]
});

Favourite.plugin(passportLocalMongoose);

module.exports = mongoose.model('Favourite', Favourite);