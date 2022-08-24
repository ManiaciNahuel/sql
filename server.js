const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const fs = require('fs')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require('dotenv').config()


//const { sqlProducts } = require('./options/mariaDB.js');

const productos = require('./daos/index.js')
//const productos = new ContenedorDB(sqlProducts.config, sqlProducts.table)

app.get('/productos', async(req, respuesta) => {
    respuesta.send(await productos.getAll())
})

app.get('/productos/:id', async(req, respuesta) => {
    respuesta.send(await productos.getOne(req.params.id))
})

app.post('/productos', async(req, res) => {
    const newObject = req.body
    res.json(await productos.postNew(newObject))
})

app.put('/productos/:id', async(req, res) => {
    const newObject = req.body
    const id = req.params.id
    res.json(await productos.upload(newObject, id))
})

app.delete('/productos/:id', async(req, res) => {
    const id = req.params.id
    res.json(await productos.delete(id))
})


const PORT = process.env.PORT || 8080;

const serv = server.listen(PORT, () => {
    console.log("Servidor HTTP escuchando en el puerto " + serv.address().port);
})

serv.on("error numero milq1ui", error => console.log(error))