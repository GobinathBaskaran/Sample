const mongoose = require('mongoose');
const schema = mongoose.Schema;


let UserSchema = new schema({
    name: String,
    userName: String,
    password: String
})

module.exports = mongoose.model('User', UserSchema);