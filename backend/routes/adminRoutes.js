const adminRouter = require('express').Router();
const admin = require('../model/adminModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

adminRouter.post('/register', async(req,res)=>{
    try{
        // console.log('hello admin')
        const {Name, Email, Password, Contact} = req.body;
        // console.log(req.body)
        let existingadmin = await admin.findOne({ Email });
        if (existingadmin) return res.status(400).json({ status: "failed", field: "Email", message: "Email already exists!!" })
        else{
            bcrypt.hash(Password, 10).then(encryptedData=>{
                console.log(encryptedData)
                const newadmin = new admin({
                    Name,
                    Email,
                    Password: encryptedData,
                    Contact
                })
                newadmin.save().then(record => {
                    console.log(record)
                    res.status(201).send({
                        status : 'success',
                        admin : record
                    })
                }).catch(err=>{
                    console.log(err);
                    res.status(400).send({
                        status: 'failed',
                        message : 'failed to create admin account' 
                    })
                })
            }).catch(err=>{
                console.log(err);
                res.status(500).send({
                    status: 'failed',
                    error : 'server error'
                })
            })
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({ 
            status:'failed',
            message: 'Server error' });
    }
})

 
adminRouter.post('/login',(req,res)=>{
        const {Email, Password} = req.body;
        admin.findOne({Email: Email}).then(registeredUser=>{
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
                                    adminId: registeredUser._id
                                });
                            }
                        )
                    }
                    // if authStatus is false
                    res.status(400).send({
                        status: "failed",
                        message: "Enter valid admin details"
                    });
    
                })
            }else{
                res.status(401).send({ status:"failed",message:"Enter valid admin details"})
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).send({
                status: "failed",
                error: "server error"})
        }
        );
    }
)
   

module.exports = adminRouter;