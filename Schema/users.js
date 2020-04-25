var mongoose = require('mongoose');

const addrssschema = new mongoose.Schema({
    building:String,
    pincode:Number,
    city:String,
    state:String,
    country:String
});

const workschema = new mongoose.Schema({
    Time:String,
    company:Number,
    position:String
});


module.exports = new mongoose.Schema({
    email: String,
    password: String,
    userType: String,  // Indi,Company,Admin
    //userID: String,
    phoneNumber: Number,
    address:[addrssschema], // Indi and C
    //Indi:
    firstname:String,
    givenname:String,
    gender:Boolean,   //1:M 0:F
    birthofdate: Date,
    diploma:String,
    wrokexperience: [workschema],
    personalstate: String,

    // company
    nameofc: String,
    cintroduction: {
        type: String,
        default: ''
    }

});

