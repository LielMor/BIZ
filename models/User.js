// Requires
const mongoose = require('mongoose');

// mongoose schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    email: {
        type: String,
        minlength: 6,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    biz: {
        type: Boolean,
        required: true,
    }

});

// mongoose 
const User = mongoose.model('users', userSchema);

// export the model
module.exports = User;