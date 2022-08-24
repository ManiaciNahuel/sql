const ContenedorDB = require('./contenedores/contenedorDB.js');
const { sqlProducts, sqlMensajes } = require('./options/mariaDB.js');


const prodMariaDb = new ContenedorDB(sqlProducts.config, sqlProducts.table);
const mensajesDb = new ContenedorDB(sqlMensajes.config, sqlMensajes.table);

(async() => {
    try {
        await prodMariaDb.crearTabla() || mensajesDb.crearTabla2();
    } catch (err) {
        console.log(err);
    }
})
/* prodMariaDb.postNew({
    titulo: "Producto 111", 
    price: 1250,
    imagen: "https://cdn3.iconfinder.com/data/icons/nature-37/120/aaqqdqqas-256.png"
}); */

(async() => {
    try {
        await prodMariaDb.postNew({
            titulo: "Producto 54",
            imagen: "https://cdn3.iconfinder.com/data/icons/nature-37/120/aaqqdqqas-256.png",
            price: 1250
        }, 1);
        console.log(prodMariaDb.getOne(1));
    } catch (err) {
        console.log(err);
    }
})