const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    }
})

User.methods.genHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(7), null)
}

User.methods.valid = function(password, cb) {
    return bcrypt.compare(password, this.password, cb);
}

module.exports = mongoose.model('User', User)