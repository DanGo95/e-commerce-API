const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: { type: String, required: [true, 'El nombre de usuario es obligatorio'], unique: true },
    email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
    password: { type: String, required: [true, 'El password es obligatorio'] }
});


UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = model('User', UserSchema);