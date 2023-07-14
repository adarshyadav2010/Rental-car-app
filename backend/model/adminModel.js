const mongoose = require('mongoose');

const adminSchema =new mongoose.Schema({
        Name: {
            type: String,
            required: true,
            
        },
        Email: {
            type: String,
            required: [true, 'you have to enter email for registering'],
            unique: true
        },
        Password: {
            type: String,
            required: [true, 'you have to enter password for registering']
        },
        Contact:{
            type:Number
        }
    
    },
    {
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
);



const Admin = mongoose.model('Admin', adminSchema);

module.exports =  Admin;