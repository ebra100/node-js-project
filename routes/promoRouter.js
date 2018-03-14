const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');
var authenticate = require('../authenticate');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')

.get((req,res,next) => {
 Promotions .find({})
 .then(promotions=>{
 	res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotions);
 })
 .catch(err=>next(err));
  
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
 Promotions .create(req.body)
.then(promotions=>{
 	res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotions);	
})
 .catch(err=>next(err));

})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
 Promotions .remove()
 .then(resp=>{
 	res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
 })
  .catch(err=>next(err));

});

leaderRouter.route('/:leaderId')
.get((res,req,next)=>{
 Promotions .findById(req.params.leaderId)
 .then(promotion=>{
 	res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);	
 })
   .catch(err=>next(err));

})

.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
 Promotions .findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true})
 .then(promotion=>{
		res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);	
	})
	   .catch(err=>next(err));

})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
 Promotions .findByIdAndRemove(req.params.leaderId)
 .then(promotion=>{
		res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);	
	})
	   .catch(err=>next(err));

})

module.exports = promotionRouter;