var mongoose = require("mongoose");
var contentsSchema = require("../Schema/content");


module.exports = mongoose.model("PubContent",contentsSchema);