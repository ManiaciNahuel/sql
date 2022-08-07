const ContenedorDB = require('./contenedores/contenedorDB.js');
const { sqlProducts, sqlMensajes } = require('./options/mariaDB.js');


const prodMariaDb = new ContenedorDB(sqlProducts.config, sqlProducts.table);
const mensajesDb = new ContenedorDB(sqlMensajes.config, sqlMensajes.table);

//prodMariaDb.crearTabla();
mensajesDb.crearTabla2();
prodMariaDb.guardar({
    titulo: "Producto 1",
    price: 1250,
    imagen: "https://cdn3.iconfinder.com/data/icons/nature-37/120/aaqqdqqas-256.png"
});

(async() => {
    try {
        await prodMariaDb.actualizar({
            titulo: "Producto 54",
            price: 1250,
            imagen: "https://cdn3.iconfinder.com/data/icons/nature-37/120/aaqqdqqas-256.png"
        }, 1);
        console.log(prodMariaDb.listar(1));
    } catch (err) {
        console.log(err);
    }
})