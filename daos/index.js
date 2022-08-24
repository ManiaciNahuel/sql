let productos
trySwitch()

async function trySwitch(){

    switch (process.env.PERS) {
        case "mongodb":
            const { default: ContenedorMg } =await import ('../contenedores/contenedorMongo.js');
            productos = new ContenedorMg()
            break;
            
        case "file":
            const { default: contenedorFs } = await import ('../contenedores/contenedorFs.js');
            productos = new contenedorFs()
            break;
    
        case "firebase":
            const { default: contenedorFb } =await import ('../contenedores/contenedorFb.js');
            productos = new contenedorFs()
            break;
        
        case "db":
            const { default: ContenedorDB } =await import ('../contenedores/contenedorDb.js');
            productos = new contenedorFs()
            break;
            
        default:
            /* const { default: ContenedorMg } = import ('../contenedores/contenedorMongo.js');
            productos = new ContenedorMg(); */
            break;
    }
}


module.export = productos