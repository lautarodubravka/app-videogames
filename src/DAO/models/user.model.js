/*const {Schema, model} = require('mongoose')

const collection = 'usuarios'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'usuario'
    }
});

const UserModel = model('collection', UserSchema);

module.exports = {UserModel}

*/
