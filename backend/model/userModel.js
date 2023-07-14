const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        Name: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: [true, 'you have to enter email for registering'],
            unique: true
        },
        Password: {
            type: String,
            required: [true, 'you have to enter password for registering']
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

const User = mongoose.model('User', userSchema);

module.exports = User;
