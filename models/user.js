var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const Email = require('mongoose-type-mail');

var Schema = mongoose.Schema;

var User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    facebookId: String,
    admin:   {
        type: Boolean,
        default: false
    },
    email:{
        type:Email,
        unique:true
    },
    tel:{
        type:String,
        unique:true
    },
    code:{
        type:Number,
        default:0
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);