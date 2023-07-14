const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT ;
const connectionString = process.env.DB_URL+process.env.DATABASE
// console.log(connectionString)

const bodyparser = require('body-parser');
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const adminRouter = require('./routes/adminRoutes');
const userRouter = require("./routes/usersRoutes");
const CarRouter =require("./routes/CarRouts")
const OrderRouter = require("./routes/OrderRouter")

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))



// app.use('/uploads', express.static('uploads'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/cars', CarRouter)
app.use('/orders', OrderRouter)



mongoose.connect(connectionString)
.then(()=>{
    console.log("Connected to DB");
})
.catch(()=>{
    console.log("Cannot be connected to DB");
});

app.listen(port, ()=>{
    console.log("Server connected and running on the port ", port);
});