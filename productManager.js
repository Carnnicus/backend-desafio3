import fs from 'fs'

class ProductManager{
    constructor(){
        this.productos = []
        this.path = 'files/productos.json'
    }

    appendProduct = async () => {
        const toJSON = JSON.stringify(this.productos, null, 3)
        await fs.promises.writeFile(this.path, toJSON)
    }


    addProduct = (title, description, price, thumbnail, code, stock) => {
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if (this.productos.length === 0){
            producto.id = 1
        }else{
            const ultimo = this.productos[this.productos.length -1]
            producto.id = ultimo.id + 1
        }
        
        
        let codigoRepe = this.productos.find(produ => produ.code === producto.code)
        if (codigoRepe){
            console.log('----------------------')
            console.log('El codigo ya se encuentra ingresado')
            console.log('----------------------')
            return
        }else{
             if (Object.values(producto).every(value => value)) {
                this.productos.push(producto)   
                this.appendProduct()         
            } else{
            return console.log('Faltan Campos')
            }
        }
    }

    getProducts = async () => {
        try{
            const readFile = await fs.promises.readFile(this.path, 'utf-8')
            return (JSON.parse(readFile))
        }
        catch(err){
            return(err)
        }
    }

    getProductsById = async (id) => {
        try{
            const readFile = await fs.promises.readFile(this.path, 'utf-8')
            const toObj = JSON.parse(readFile)
            return(toObj[id-1])
        }
        catch(err){
            return console.log(err)
        }
    } 

    updateProduct = async (id, obj) => {
        try{
            const readFile = await fs.promises.readFile(this.path, 'utf-8')
            const toObj = JSON.parse(readFile)
            const returnObj = Object.assign(toObj[id-1], obj)
            console.log(returnObj, 'ACTUALIZADO')
            this.productos = toObj
            this.appendProduct()
        }
        catch(err){
            console.log(err)
        }
    }


    deleteProducts = async (id) => {
        try{
            const readFile = await fs.promises.readFile(this.path, 'utf-8')
            const toObj = JSON.parse(readFile)

            console.log(toObj.splice(id-1, 1), 'BORRADO')
            this.productos = toObj
            this.appendProduct()
        }
        catch(err){
            console.log(err)
        }
    }
        
}
    


// const productos1 = new ProductManager()
// // productos1.addProduct('Guilliman', 'Miniatura Roboute Guilliman', 150000, 'no hay imagen', 'MPUMRG', 50)
// // productos1.addProduct('Primaris', 'Miniatura Ultramarine Primaris', 20000, 'no hay imagen', 'MMPDUM', 30)
// // productos1.addProduct("Lion El'Jonson", 'Miniatura El Leon', 120000, 'no hay  imagen', 'MPAOLJ', 20)
// // productos1.getProducts()
// // productos1.getProductsById(1) 
// productos1.updateProduct(3, {
//      "description": "Miniatura Lion El'Jonson",
//      "stock": 5 
//  })
// //productos1.deleteProducts(2)

export default ProductManager 




