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


app.get('/', (req, res)=>{
     res.send('Hey look here is my server')
})

app.listen(3000, ()=> {
    console.log('I am listening on port 3000')
})