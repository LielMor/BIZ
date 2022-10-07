// Requires
const express = require('express');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Router variable
const router = express.Router();

// Joi Schema
const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email().min(6),
    password: joi.string().required().min(5),
    biz: joi.boolean().required()
})

// Register POST
router.post("/", async (req, res)=> {
    try {
        const { error } = registerSchema.validate(req.body)
        if (error) return res.status(400).send(error.message)
        // Check if user exist
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already exists");
        else {
            // Create new user to the database
            user = new User(req.body)

            // bcrypt password
           const salt = await bcrypt.genSalt(10)
           user.password = await bcrypt.hash(user.password, salt)

           // create new token for the user
           const genToken = jwt.sign({_id: user._id, biz: user.biz},process.env.secretKey)
        

            await user.save()
            res.status(201).send({genToken});
        }

    } catch (error) {
        res.status(400).send("ERROR IN REGISTER");
    }
})

module.exports = router;

