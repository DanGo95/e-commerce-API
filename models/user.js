const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    username: { type: String, required: [true, 'El nombre de usuario es obligatorio'], unique: true },
    email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
    password: { type: String, required: [true, 'El password es obligatorio'] }
});


UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);