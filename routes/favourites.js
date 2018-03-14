const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const favourites = express.Router();
const Favourite = require('../models/favourite');
const cors = require('./cors');

favourites.use(bodyParser.json());

favourites.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
  Favourite.findOne({user:req.user})
  .populate('dishes')
  .populate('user')

  .then(favourites=>{
  	res.json(favourites);

  })
  .catch(err=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
	  favouritesObject={};
    Favourite.findOne({user:req.user})
    .then(favourite=>{
     if (favourite==null ){
      favouritesObject.dishes=req.body;
      favouritesObject.user=req.user._id;
      Favourite.create(favouritesObject)
     .then(favourite=>{
   	  res.json(favourite);
     })
      .catch(err=>next(err));  
     } 
      else{
      	for(var i=0;i<req.body.length;i++){
        if(favourite.dishes.indexOf(req.body[i]._id)==-1){
      	favourite.dishes.push(req.body[i]._id);
        }
        } 
      	favourite.save()
      	.then(favourite=>{
          res.json((favourite));
        })
        .catch(err=>next(err))
        }
     })
       .catch(err=>next(err));  

})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favourite.findOneAndRemove({user:req.user._id})
    .then((resp)=>{
      statusCode=200;
      res.setHeader('Content-Type' , 'application/json');
      res.json(resp);

    })
    .catch(err=>next(err))
});

favourites.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{

Favourite.findOne({user:req.user._id})
.then(favourite=>{
  if(favourite&&favourite.dishes.indexOf(req.params.dishId)>-1){
        statusCode=200;
        res.setHeader('Content-Type' , 'application/json');
        return res.json({"exists": true, "favorites": favourite});
  }
  else{
         res.setHeader('Content-Type', 'application/json');
         return res.json({"exists": false, "favorites": favourite});
  
  }
})

})

.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    favouritesObject={};
    Favourite.findOne({user:req.user})
    .then(favourite=>{
     if (favourite==null ){
      favouritesObject.dishes=req.params._id;
      favouritesObject.user=req.user._id;
      Favourite.create(favouritesObject)
     .then(favourite=>{
      res.json(favourite);
     })
      .catch(err=>next(err));  
     } 
      else{
        if(favourite.dishes.indexOf(req.params.dishId==-1)){
        favourite.dishes.push(req.params.dishId);
        } 
        favourite.save()
        .then(favourite=>{
          res.json((favourite));
        })
        .catch(err=>next(err))
        }
     })
       .catch(err=>next(err));  

})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
  Favourite.findOne({user:req.user._id}) 
  .then(favourite=>{
    index = favourite.dishes.indexOf(req.params.dishId)
    if(index>-1){
       favourite.dishes.splice(index,1);
       favourite.save()
       .then(favourite=>{
        statusCode=200;
        res.setHeader('Content-Type' , 'application/json');
        res.json(favourite);
      })
    }
  })
    .catch(err=>next(err))
})

module.exports = favourites;
