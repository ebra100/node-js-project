const express = require('express');
const bodyParser = require('body-parser');

const feedbackRouter = express.Router();
const Feedback = require('../models/feedback');
const cors = require('./cors');

feedbackRouter.use(bodyParser.json());

feedbackRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

.post(cors.corsWithOptions,(req,res,next)=>{
	Feedback.create(req.body)
	.then(feedback=>{
		res.json(feedback);
	})
	.catch(err=>next(err));
})

module.exports = feedbackRouter;
