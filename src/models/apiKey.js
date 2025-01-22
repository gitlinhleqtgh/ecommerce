const e = require('express');
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var apiKeySchema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    status:{
        type:Boolean,
        default:true,
        unique:true,
    },
    permissions:{
        type:[String],
        required:true,
        enum:['000','111','222'],
    },
},{
  timestamps:true,
  collection:'apikeys'
});

//Export the model
module.exports = mongoose.model('ApiKey', apiKeySchema);
