const sqlProducts = {
    table: "productos",
    config: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'test'
        }
    }
}
const sqlMensajes = {
    table: "mensajes",
    config: {
        client: 'sqlite3',
        connection: {
            filename: "./DB/ecommerce.sqlite"
        },
        useNullAsDefault: true
    }
}

module.exports = { sqlProducts, sqlMensajes }