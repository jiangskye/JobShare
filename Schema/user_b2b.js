var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = new mongoose.Schema({
    userid:{type: Schema.Types.ObjectId, ref: 'users' },
    b2btasks:{type: Schema.Types.ObjectId, ref: 'b2b_b2ctasks' }
});
