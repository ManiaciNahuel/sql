const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const ContenedorDB = require('./contenedores/ContenedorDB.js')
const { sqlProducts, sqlMensajes } = require('./options/mariaDB.js');

const productos = new ContenedorDB(sqlProducts.config, sqlProducts.table)
const mensajes = new ContenedorDB(sqlMensajes.config, sqlMensajes.table)


/* io.on('connection', async socket => {
    console.log('Un cliente se ha conectado');
    res.json(productos.listarAll())
    socket.emit('productos', productos.guardar({
        titulo: "Producto 111",
        price: 1250,
        imagen: "https://cdn3.iconfinder.com/data/icons/nature-37/120/aaqqdqqas-256.png"
    }));
    socket.emit('mensajes', mensajes.listarAll());

    socket.on('update', producto => {
        productos.guardar(producto);
        io.sockets.emit('productos', productos.listarAll()) || console.log("Que");;
    });

    
    socket.on('update', data => {
        mensajes.guardar(data);
        io.sockets.emit('mensajes', mensajes);
    }); 
}); 
*/

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('productos', productos);

    socket.on('new-product', function(data) {
        productos.push(data);
        io.sockets.emit('productos', productos);
    });
});

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});
// Ejs
app.set("view engine", "ejs");
app.set("views", "./public/views/ejs");

app.get('/', (request, respuesta) => {
    let producs = productos.listarAll().then((producs) => {
        console.log(`Productos cargados`) ||
            producs.map(prod => respuesta.render("main", { prod }))
    });

})

app.get('/productos', (request, respuesta) => {
    respuesta.render("form", { productos })
})

app.post('/productos', (req, res) => {
    const newObject = req.body
    productos.push(newObject)
    console.log(newObject);
    res.redirect("/")
})


const PORT = process.env.PORT || 8088;

const serv = server.listen(PORT, () => {
    console.log("Servidor HTTP escuchando en el puerto " + serv.address().port);
})

serv.on("error numero milq1ui", error => console.log(error))