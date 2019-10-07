const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    email: String,
});

module.exports = moongose.model('User', UserSchema);