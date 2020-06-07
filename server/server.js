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
}).then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//===============================
//           MODELS
// ==============================
const { User } = require('./Models/user');
const { Job } = require('./Models/job')
//===============================
//              MIDDLEWARES
// ==============================
const { auth } = require('./Middleware/auth')

// user controller for now


//===============================
//         Job Routes
// ==============================

app.get('/api/jobs', auth, async (req, res) => {
    const user = await User
        .findById(req.params._id)
        .populate('jobs');
    res.send(user)

})

// add a new job to your board
app.post('/api/jobs/addJob', auth, (req, res) => {
    const job = new Job(req.body)
    console.log('is it even making it here')
    job.save()
    .then((result) => {
        User.findOne({ user: job.username}, (err, user)=>{
            if(user){
                user.jobs.push(job);
                user.save();
                res.json({message: 'Job has been added!!'})
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        })
    // if (err) return res.json({
    //     success: false,
    //     err
    // })
    // res.status(200).json({
    //     success: true,
    //     info: doc
    // })
    // console.log(job)
    })

})

//===============================
//         User Routes
// ==============================

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        userName: req.user.userName,
        jobs: req.user.jobs,
        id: req.user._id
    })
})

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
    console.log('Nodemon is awesome')
})