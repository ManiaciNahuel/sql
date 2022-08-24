const mongoose = require('mongoose');
const { usuarioModel } = require('../models/usuario.js');


class ContenedorMg {
    constructor(nombreCollection, scheme) {
        /* this.collection = mongoose.model(nombreCollection, scheme)*/
    }
    async connect() {
        try {
            const url = 'mongodb+srv://Nahuel_Maniaci:nahue123@cluster0.qvotb9b.mongodb.net/ecommerce?retryWrites=true&w=majority'
            let rta = await mongoose.connect(url)
            console.log("Base de datos conectada");

        } catch (error) {
            console.log(error);
        }
    }
    async getAll() {
        try {
            await this.connect()
            let productos = await usuarioModel.find({})
            return productos
        } catch (error) {
            throw new Error(`Error al listar: ${error}`)
        }
    }
    async getOne(id) {
        try {
            await this.connect()
            let producto = await usuarioModel.find({ _id: `${id}` })
            return producto
        } catch (error) {
            throw new Error(`Error al listar: ${error}`)
        }
    }
    async postNew(newObject) {
        try {
            await this.connect()
            const newProduct = {
                titulo: `${newObject.titulo}`,
                precio: `${newObject.precio}`,
                imagen: `${newObject.imagen}`
            }
            const saveNewProduct = new usuarioModel(newProduct)
            await saveNewProduct.save()
            return (`Added product : ${newObject.titulo}`)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async upload(producto, id) {
        try {
            await this.connect()
                //No tiene validacion por si no se actualizan todos los campos del producto (titulo, precio, imagen)
            await usuarioModel.updateOne({ _id: `${id}` }, {
                $set: {
                    precio: `${producto.precio}`,
                    titulo: `${producto.titulo}`,
                    imagen: `${producto.imagen}`
                }
            })
            return (`Uploaded product: ${producto.titulo}`)
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async delete(id) {
        try {
            await this.connect()
            await usuarioModel.deleteOne({ _id: `${id}` })
            return (`Deleted product id: ${id}`)
        } catch (error) {
            throw new Error(`Error al delete: ${error}`)
        }
    }
}



module.exports = ContenedorMg