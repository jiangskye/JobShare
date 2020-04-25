var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    //postid: Number,
    title:String,
    salary: Number,
    b2btype:Boolean, //0: borrow, 1:lend
    positionname:String,
    positiondescrib:{
        type:String,
        default: ""
    },
    timelenth:Number,
    workdays:Number,
    applydue:Date,
   // nameofc : can be query

});