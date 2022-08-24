class contenedorFb {
    constructor(admin) {
        this.db = admin;
        this.prodColl = (this.db).collection("Productos")
    }
    crearDb() {
        console.log("Creating table");
        const colores = this.prodColl
        colores.doc().set({ titulo: "Producto 12" })
        return (this.db)
    }
    async getAll() {
        let resp = await (this.prodColl).get()
        let docs = resp.docs
        const array = []
        await docs.forEach((prod) => {
            console.log(prod.data().titulo)
            array.push(prod.data())
        })
        return array
    }

    async getOne(id) {
        let coll = await (this.prodColl)
        let doc = coll.doc(`${id}`)
        let prod = await doc.get()
        console.log(prod.data().titulo)
        return prod.data().titulo
    }

    async postNew(newObject) {
        let coll = await this.prodColl
        await coll.doc().set({ titulo: `${newObject.titulo}` })
        return newObject.titulo
    }
    async upload(newDoc, id) {
        let coll = await this.prodColl
        let oldDoc = coll.doc(`${id}`)
        let oldTittle = await oldDoc.get()
        await oldDoc.update({ titulo: `${newDoc.titulo}` })
        return await (`Old tittle: ${oldTittle.data().titulo} --- New tittle: ${newDoc.titulo}`)
    }

    async delete(id) {
        let coll = await this.prodColl
        let oldDoc = coll.doc(`${id}`)
        let oldTittle = await oldDoc.get()
        await oldDoc.delete()
        return (`Product deleted: ${oldTittle.data().titulo}`)
    }
}

module.exports = contenedorFb