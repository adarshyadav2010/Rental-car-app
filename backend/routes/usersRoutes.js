const userRouter =require('express').Router()
const user = require('../model/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

userRouter.post('/register', async(req,res)=>{
    try{
        const {Name, Email, Password, Contact} = req.body;
        // console.log(req.body)
        let existinguser = await user.findOne({ Email });
        if (existinguser) return res.status(400).json({ status: "failed", field: "Email", message: "Email already exists!!" })
        else{
            bcrypt.hash(Password, 10).then(encryptedData=>{
                console.log(encryptedData)
                const newuser = new user({
                    Name,
                    Email,
                    Password: encryptedData,
                    Contact
                })
                newuser.save().then(record => {
                    console.log(record)
                    res.status(201).send({
                        status : 'success',
                        admin : record
                    })
                }).catch(err=>{
                    console.log(err);
                    res.status(400).send({
                        status: 'failed',
                        message : 'failed to create user account' 
                    })
                })
            }).catch(err=>{
                console.log(err);
                res.status(500).send({
                    status: 'failed',
                    message: "failed to fetch",
                    error : 'server error'
                })
            })
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({ 
            status:'failed',
            message: 'Server error',
            error:err
        });
    }
})

userRouter.post('/login',(req,res)=>{
    const {Email, Password} = req.body;
    user.findOne({Email: Email}).then(registeredUser=>{
        if(registeredUser){
            return bcrypt.compare(Password, registeredUser.Password).then(authStatus => {
                if(authStatus) {
                    // console.log(authStatus);
                    return jwt.sign(
                        {
                            Email: registeredUser.Email, 
                            id: registeredUser._id
                        }, 
                        process.env.ENCRYPTION_SECRET,
                        {
                        expiresIn: "1h"
                        }, (err, token) => {
                            if(err) {
                                return res.status(500).send({
                                    status: "failed",
                                    message: "Token creation failed"
                                });
                            }
                            return res.status(200).send({
                                status: "Login successful",
                                token: token,
                                Name: registeredUser.Name,
                                UserId: registeredUser._id
                            });
                        }
                    )
                }
                // if authStatus is false
                res.status(400).send({
                    status: "failed",
                    message: "Enter valid user details"
                });

            })
        }else{
            res.status(401).send({ status:"failed",message:"Enter valid user details"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).send({
            status: "failed",
            error: "server error"})
    }
    );
})


module.exports = userRouter;