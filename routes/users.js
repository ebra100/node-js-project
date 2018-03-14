var express = require('express');
var router = express.Router();
const dishRouter = express.Router();
const Users = require('../models/user');
const cors = require('./cors');
const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json());


/* GET users listing. */
router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )


router.route('/')

.get(authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next){
  Users.find({})
  .then(users=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    })
    .catch(err=>next(err));
});

router.post('/signup',cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.tel = req.body.tel;

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});


router.post('/login', cors.corsWithOptions, (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err)
    return next(err);

    else if (!user) {
      return next(err);

      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
     if (err) {
        return next(err);

        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }
      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Login Successful!', token: token});
    }); 
  }) (req, res, next);
});


router.get('/facebook/token',cors.corsWithOptions,passport.authenticate('facebook-token'), (req, res) => {
  if (req) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, user:req.user});
  }
});

router.get('/checkJWTToken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});

router.post('/forgettPassword',cors.corsWithOptions,(req,res,next)=>{
  User.findOne({email:req.body.email})
  .then((user,err)=>{
    if(err){
     return next(err);
    }
if(user){
 var code =  Math.floor((Math.random()*8999)+1000) 
 user.code=code;
 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ebrhimmoussa17@gmail.com',
    pass: '0246810asdf'
  }
});
   var mailOptions={
    from: 'ebrhimmoussa17@gmail.com',
    to:req.body.email,
    subject:"Reset your password",
    text:'use this code to reset your password :' +code
   } 
   transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.send({err:error});
  } else {
    res.send({success : true});
  }
  })
 }
 else if(!user){
 res.send({success:false});
}
 user.save()
 .then((user,err)=>{
  console.log("153",user);
 })
 .catch(err=>next(err));
})
});

router.post('/verifycode',cors.corsWithOptions,(req,res,next)=>{
  console.log("160",req.body.code);
  User.findOne({code:req.body.code})
  .then((user,err)=>{
    if(user){
      console.log(user);
      res.json({success:true});
    }
    else if(!user){
      console.log(user);
      res.json({success:false});
    }
  })
   .catch(err=>next(err));
})
module.exports = router;
