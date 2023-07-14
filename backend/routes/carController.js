const carDetails = require("../model/carDetailsModel")
require("dotenv").config();
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const {GridFSBucket, MongoClient} = require("mongodb");
const { model } = require( "mongoose" );
const jwt = require("jsonwebtoken")
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET
const Admin = require("../model/adminModel");



// ********get Image **********************//
let client = new MongoClient(process.env.DB_URL);
// const getImages = async (req, res) => {
//     try {
//       await client.connect();
//       const datastore = client.db(process.env.DATABASE);
//       const bucket = new GridFSBucket(datastore, { bucketName: process.env.CAR_IMAGES });
//       const downloadStream = bucket.openDownloadStreamByName(req.params.image);
//       downloadStream.pipe(res);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };


const getImages = async(req,res)=>{
    try {
        await client.connect();
        const datastore = client.db(process.env.DATABASE);
        const Bucket = new GridFSBucket(datastore,{bucketName: process.env.CAR_IMAGES});
        const eventVar= Bucket.openDownloadStreamByName(req.params.image);
        eventVar.on("data",(data)=>{
            console.log(data)
            res.write(data)
          })
          eventVar.on("error" ,(err)=>{
            res.status(400).write(err)
          })
          eventVar.on("end",()=>{
            res.end()
          })
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// ***************get cars ****************************//

const getCars = async(req,res)=>{
    try {
        if(req.headers.authorization){
            const readData = await carDetails.find();
            console.log(readData)
            res.send(readData)
        }
     
    } catch (error) {
       res.status(400).json({message:error.message})
    }
   }

//  *************Post cars *****************//

const PostCars =  async(req, res)=>{
    try{
        // console.log(req.headers.authorization)
        if(req.headers.authorization){
            let userVar = jwt.verify(req.headers.authorization, ENCRYPTION_SECRET)//id  //
            console.log(userVar)
            let data = new carDetails({image:req.file.filename,AdminId:userVar._id,...req.body});
            let createData = await data.save();
            res.status(201).send(createData)
        }else{
            res.status(404).send({message:"Unothorized User"})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({
            message:err.message

        })
    }
}

//  ****************dATA bY Id ****************//

const putCarData = async(req,res)=>{
    try {
        if(req.headers.authorization){
        let userVar = jwt.verify(req.headers.authorization, ENCRYPTION_SECRET)
        let _id =req.params.id;
        let car= await carDetails.findOne({_id:_id});
         if(car){   
           if(userVar._id===car.AdminId){//tokan id === user id
                    if(req.file){
                        let updateData = await carDetails.findByIdAndUpdate(_id,{image:req.file.filename,...req.body},{new:true});
                        res.send(updateData)
                    }else{
                        let updateData = await carDetails.findByIdAndUpdate(_id,req.body,{new:true});
                        res.send(updateData)
                    }
              }else{
               res.status(401).send({message:"you can`t update the post"})
              }
         }else{
           res.status(401).send({message:"Invalid Data"}) 
         }}
        else{
           res.status(401).send({message:"unauthorized"}) 
        }

    } catch (error) {
        res.status(400).json({message:error.message})  
    }
}

const deleteCarData =  async(req,res)=>{
    try{
    if(req.headers.authorization){
       let userVar = jwt.verify(req.headers.authorization, ENCRYPTION_SECRET)
       let _id =req.params.id;
     let car= await carDetails.findOne({_id:_id});
     if(car){
       if(userVar._id===car.AdminId){//tokan id === user id
        
                    let deletedata = await carDetails.findByIdAndDelete(_id);
                    res.send(deletedata)
                
          }else{
           res.status(401).send({message:"you can`t delete the post"})
          }
     }else{
       res.status(401).send({message:"Invalid Data"}) 
     }}
    else{
       res.status(401).send({message:"unauthorized"}) 
    }
}
    
    catch (error) {
        res.status(400).json({message:error.message})  
    }
}



const GetDataByAdminId = async(req,res)=>{
    try{
        const  AdminId= req.params.id;
        console.log(AdminId)
        console.log(req.headers.authorization)
       if(req.headers.authorization){
            const readData = await carDetails.find({AdminId:AdminId});
            res.send(readData)
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}





module.exports = {
    getImages,
    getCars,
    PostCars,
    putCarData,
    deleteCarData,
    GetDataByAdminId
};