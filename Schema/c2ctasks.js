var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = new mongoose.Schema({
    //postid
    //userid
    numposition:Number,
    salary:Number,
    tasktype:Boolean, //0:borrow, 1:lend,
    positionname:String,
    positiondescrib:{
        type:String,
        default:""
    },
    timelength: Number,
    //location:String, can be query
    numday: Number,
    applydue: Number


});