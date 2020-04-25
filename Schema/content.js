var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,
    description:{
        type:String,
        default: ''
    },
    content:{
        type: String,
        default: ''
    }
});