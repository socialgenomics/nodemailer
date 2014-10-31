var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
local            : {
        email        : String,
        firstname     : String,
        lastname     : String

    }
 });

//generating a hash
userSchema.methods.generateHash = function(email) {
    return bcrypt.hashSync(email, bcrypt.genSaltSync(8), null);
};

// checking if email is valid
userSchema.methods.validPassword = function(email) {
    return bcrypt.compareSync(email, this.local.email);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);