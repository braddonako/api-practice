const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10; 

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    username: {
        type: String,
        required: true,
        unique: 1
    },
    token: {
        type: String
    }
})

// going to hash the password first when the data is sent
userSchema.pre('save', function(next){
    let user = this;

    //now lets encrypt the password
    if (user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err)
                user.password = hash;
                next()
            })
        })
    } else {
        next();
    }
})

// i am now going to use bcrypt to 


const User = mongoose.model('User', userSchema);
module.exports = { User }