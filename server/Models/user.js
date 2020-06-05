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
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        },
        {
            timestamps: true
        }],
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

// i am now going to use bcrypt to compare the passwords next for login
userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) return cb(err)
        cb(null, isMatch) 
    })
}

// creating a json web token website knows when the user is logged in
userSchema.methods.generateToken = function(cb){
    let user = this;
    let token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save(function(err, user){
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    let user = this;
    // we will get the user id from this, if we get the id, it is valid
    jwt.verify(token, process.env.SECRET, function(err, decode){
        user.findOne({"_id": decode, "token":token}, function(err, user){
            if (err) return cb(err)
            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema);
module.exports = { User }