const express = require('express')
const app = express()
const { Router } = express
const server = require('http').Server(app)
const io = require('socket.io')(server)
const routerProductos = new Router()
app.use('/api/productos', routerProductos)

const ContenedorDB = require('./contenedores/ContenedorDB.js')
const { sqlProducts, sqlMensajes } = require('./options/mariaDB.js');

const productos = new ContenedorDB(sqlProducts.config, sqlProducts.table)
const mensajes = new ContenedorDB(sqlMensajes.config, sqlMensajes.table)


io.on('connection', async socket => {
    console.log('Un cliente se ha conectado');

    socket.emit('productos', productos.guardar({
        titulo: "Producto 111",
        price: 1250,
        imagen: "https://cdn3.iconfinder.com/data/icons/nature-37/120/aaqqdqqas-256.png"
    }));
    socket.emit('mensajes', mensajes.listarAll());

    socket.on('update', producto => {
        productos.guardar(producto);
        io.sockets.emit('productos', productos.listarAll());
    });

    /* 
    socket.on('update', data => {
        mensajes.guardar(data);
        io.sockets.emit('mensajes', mensajes);
    }); */
});

routerProductos
//Mostrar todos
    .get('/', (req, res) => {
    res.json(productos.listarAll())
})

//Mostrar un producto
.get('/:id', (req, res) => {
    const id = req.params.id
    res.json(productosApi.getOne(id))
})

//Agregar un producto
.post('/', (req, res) => {
    const newObject = req.body
    console.log(newObject);
    res.json(productosApi.postNew(newObject))
})

//Actualizar producto 
.put('/:id', (req, res) => {
    const newObject = req.body
    const id = req.params.id
    res.json(productosApi.upload(newObject, id))
})

//Eliminar producto
.delete('/:id', (req, res) => {
    const id = req.params.id
    res.json(productosApi.delete(id))
})

// Ejs
/* app.set("view engine", "ejs");
app.set("views", "./public/views/ejs");

app.get('/', (request, respuesta) => {
    respuesta.render("index", { productos })
})

app.get('/productos', (request, respuesta) => {
    respuesta.render("form", { productos })
})

app.post('/productos', (req, res) => {
    const newObject = req.body
    productos.push(newObject)
    console.log(newObject);
    res.redirect("/")
}) */

const PORT = process.env.PORT || 8088;

const serv = server.listen(PORT, () => {
    console.log("Servidor HTTP escuchando en el puerto " + serv.address().port);
})

serv.on("error", error => console.log(error))