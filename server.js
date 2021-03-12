const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app=express();
const dbconnect=require('./backend/dbconnect')
const item=require("./backend/lib/itemlib")
const bcrypt = require("bcrypt");
const User=require("./backend/models/user");
const jwt = require("jsonwebtoken");
//DB connection
dbconnect.connect((cb)=>{
    console.log(cb);
});


//access files
app.use(express.static(__dirname+'/frontend'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/frontend/html/home.html');
});
app.get('/login',function(req,res){
    res.sendFile(__dirname+'/frontend/html/login.html');
});
app.get('/dashboard',function(req,res){
    res.sendFile(__dirname+'/frontend/html/dashboard.html');
});
app.get('/startQuiz',function(req,res){
    res.sendFile(__dirname+'/frontend/html/startquiz.html');
});
app.post('/api/signup',function(req,res){
    item.getItemByQuery({ email: req.body.email }, User, (err, user) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user.length >= 1) {
                res.status(409).json({
                    message: "Email already exists",
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = {
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            mobileNumber: req.body.mobileNumber,
                        };
                        item.createitem(user, User, async(err, result) => {
                            if (err) {
                                res.status(500).json({
                                    error: err,
                                });
                            } else {
                                await result
                                    .save()
                                    .then((result1) => {
                                        res.status(201).json({
                                            message: "user created",
                                            userDetails: {
                                                userId: result._id,
                                                email: result.email,
                                                name: result.name,
                                                mobileNumber: result.mobileNumber,
                                            },
                                        });
                                    })
                                    .catch((err) => {
                                        res.status(400).json({
                                            message: "Error",
                                            error: err.toString(),
                                        });
                                    });
                            }
                        })
                    }

                })
            }
        }
    })


});
app.post("/api/login", async (req, res, next) => {
    item.getItemByQuery({ email: req.body.email }, User, (err, user) => {
        console.log(user);
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed: Email not found probably",
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({
                        message: "Auth failed",
                    });
                }
                if(result)
                {
                    console.log(result)
                    const token = jwt.sign({
                            userId: user[0]._id,
                            email: user[0].email,
                            name: user[0].name,
                            mobileNumber: user[0].mobileNumber,
                        },
                        "LMS", {
                            expiresIn: "1d",
                        }
                    );
                    return res.status(200).json({
                       
                        message: "Auth successful",
                        userDetails: {
                            userId: user[0]._id,
                            name: user[0].name,
                            email: user[0].email,
                            mobileNumber: user[0].mobileNumber,
                        },
                        token: token,
                    });
                }
                res.status(401).json({
                    message: "Please Enter Valid Credentials",
                });
            }
            );
        }
    });
});
app.get('/signup',function(req,res){
    res.sendFile(__dirname+'/frontend/html/signup.html');
});
var PORT= process.env.PORT || 3000;
//start the server
app.listen(PORT,function(){
    console.log("http://localhost:"+PORT);
});
