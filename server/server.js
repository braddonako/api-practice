const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express()


const mongoose = require('mongoose')
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//===============================
//           MODELS
// ==============================
const { User } = require('./Models/user');

//===============================
//         User Routes
// ==============================


//Register an account
app.post('/api/users/register', (req,res)=>{
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
})

//login
app.get('/api/users/login', (req,res)=> {
    // going to search for the email first
    User.findOne({'email': req.body.email}, (err,user)=> {
        if(!user) return res.json({loginSuccess: false, message: 'your email is incorrect'})

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({loginSuccess: false, message: 'your password is incorrect'})
        })

        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err)
            res.cookie('x_auth', user.token).status(200).json({loginSuccess: true})
        })
    })
})

//logout
app.get('/api/users/logout', auth, (req,res)=>{
    User.findOneAndUpdate(
    {_id: req.user._id}, 
    {token: ''},
    (err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).send({
            success: true
        })
    }
    )
})


app.get('/', (req, res)=>{
     res.send('Hey look here is my server')
})

app.listen(3000, ()=> {
    console.log('I am listening on port 3000')
})