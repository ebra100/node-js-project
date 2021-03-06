const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
var authenticate = require('../authenticate');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.get((req,res,next) => {
 Leaders.find({})
 .then(leaders=>{
 	res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leaders);
 })
 .catch(err=>next(err));
  
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
 Leaders.create(req.body)
.then(leaders=>{
 	res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leaders);	
})
 .catch(err=>next(err));

})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
 Leaders.remove()
 .then(resp=>{
 	res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
 })
  .catch(err=>next(err));

});

leaderRouter.route('/:leaderId')
.get((res,req,next)=>{
 Leaders.findById(req.params.leaderId)
 .then(leader=>{
 	res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);	
 })
   .catch(err=>next(err));

})

.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
 Leaders.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true})
 .then(leader=>{
		res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);	
	})
	   .catch(err=>next(err));

})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
 Leaders.findByIdAndRemove(req.params.leaderId)
 .then(leader=>{
		res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);	
	})
	   .catch(err=>next(err));

})

module.exports = leaderRouter;