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


//===============================
//         Job Routes
// ==============================

// get job by id
app.get('/api/jobs', auth, (req, res) => {

    let type = req.query.type;
    let items = req.query.id;
    console.log(items, 'this is the type')
    // let ids = [];

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
        
    }
    // console.log(req.query.id.split(','))
        Job
        // .find({'_id': {$in:[req.query.id.split(',')[0]]}}).
        .find({'_id':{$in:items}}).
        populate('jobs').
        exec((err, docs)=> {
            console.log(docs, '<-- this is the docs')
            console.log(err, '<-- this is the err')
        return res.status(200).send(docs)
    
    });
   
   

})

// add a new job to your board
app.post('/api/jobs/addJob', auth, (req, res) => {


    const job = new Job(req.body)
    // console.log('is it even making it here')
    // console.log(req.user.jobs, '<-- this is during the job')
    console.log(job, '<-- this is the job');
    job.save()
    const currentUser = req.user;
    User.findOneAndUpdate({currentUser})
    console.log(currentUser, 'this is the user')
    if(currentUser){
        // console.log(currentUser, 'user id in if')
        console.log(job, 'here is the current job, line 78');
        currentUser.jobs.push(job);
        currentUser.save();
        console.log(currentUser, 'here is the current user after the job saves')
        res.json({message: 'Job has been posted!!!!'})
    }

})

// delete job from your board
app.delete('/api/jobs/delete/:id', auth, (req,res) => {
    
        Job
        .findByIdAndDelete({'_id': req.params.id}).
        exec((err, docs)=> {
            console.log(docs, '<-- this is the docs')
            console.log(err, '<-- this is the err')
        return res.status(200).send(docs)


    
    });
})

//update route
app.put('/api/jobs/edit/:id', auth, (req,res) => {
    Job.findOneAndUpdate(req.params.id, req.body, { new: true }).
    exec((err, docs) => {
        return res.status(200).send(docs)
    })
})

app.get('/', (req, res)=>{
     res.send('Hey look here is my server')
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
        jobs: req.user.jobs,
        id: req.user._id
    })
})



//Register an account
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({
            success: false,
            err
        })
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
})

//login
app.get('/api/users/login', (req, res) => {
    // going to search for the email first
    User.findOne({
        'email': req.body.email
    }, (err, user) => {
        if (!user) return res.json({
            loginSuccess: false,
            message: 'your email is incorrect'
        })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                loginSuccess: false,
                message: 'your password is incorrect'
            })
        })

        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err)
            res.cookie('x_auth', user.token).status(200).json({
                loginSuccess: true
            })
        })
    })
})


//logout
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id }, 
        { token: ''},
        (err, doc) => {
            if (err) return res.json({
                success: false,
                err
            })
            return res.status(200).send({
                success: true
            })
        }
    )
})

const port = process.env.PORT || 3002;

app.listen(3002, ()=> {
    console.log(`Nodemon is awesome, ${port}`);
})
