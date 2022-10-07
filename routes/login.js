// requires
const express = require('express');
const router = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// joi schema
const joiSchema = joi.object({
    email: joi.string().required().email().min(6),
    password: joi.string().required().min(5)
})



router.post("/", async (req, res)=> {
    try {
    // joi validation
    const { error } = joiSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send("user not exist");
    else {
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) return res.status(400).send('Email or Password do not match')
    else {
        const genToken = jwt.sign({_id: user._id, biz: user.biz}, process.env.secretKey);
        return res.status(200).send({genToken});
    } 
    }    
    
    } catch (error) {
    res.status(400).send('Error in login')
    }
})


module.exports = router;
