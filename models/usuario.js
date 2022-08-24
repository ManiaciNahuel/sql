const mongoose = require('mongoose');

const usuariosCollection = 'Productos';

const UsuarioScheme = new mongoose.Schema({
    titulo: { type: String, require: true, max: 100 },
    imagen: { type: String, require: true, max: 200 },
    precio: { type: Number, require: true },
}, {
    versionKey: false
})

const usuarioModel = mongoose.model(usuariosCollection, UsuarioScheme)

module.exports = { usuarioModel };