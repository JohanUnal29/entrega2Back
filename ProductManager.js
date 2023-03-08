import fs from "fs";
import { title } from "process";

export default class ProductManager {
  constructor() {
    this.path = "./files/Productos.json";
  }
    consultarProductos = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            return result;
        } else {
            return [];
        }
    };

    deletProduct = async (id) => {
        const products = await this.consultarProductos();

        const productIndex = this.products.findIndex((product) => product.id === id);
        const productExists = products.find(element => element.id === id);

        if (productExists) {
            products.splice(productIndex, 1);
            console.log("producto eliminado");
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return products;

        } else {
            return console.log("No se pudo eliminar el producto")
        }

    };

    getProductElementById = async (id) =>{
        const products = await this.consultarProductos();
 
        try{
            const product = products.find(element => element.id === id);
            return product ? product : null;
        }catch(err){
            console.log(`error: ${err}`);
        }

    };

    crearProducto = async (producto) => {

        const productos = await this.consultarProductos();
        const productExists = productos.find(element => element.code === producto.code);
        if (producto.title.length === 0 || producto.description.length === 0 || producto.price.length === 0 || producto.thumbnail.length === 0 || producto.code.length === 0 || producto.stock.length === 0) {
            return console.log("Hay un campo vacío");
        } else {

            if (productExists) {
                return console.log("El producto ya existe acá esta:", productExists);;
            } else {
                if (productos.length === 0) {
                    producto.id = 1;
                } else {
                    producto.id = productos[productos.length - 1].id + 1;
                }
                productos.push(producto);
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(productos, null, "\t")
                );
            }
        }
    };



    updateProduct = async (id, changes) => {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            this.products = result; 

            const productIndex = this.products.findIndex((product) => product.id === id);
            if (productIndex === -1) {
                console.error("Producto no encontrado");
                return;
            }

            const updatedProduct = { ...this.products[productIndex], ...changes };
            this.products[productIndex] = updatedProduct;

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));

            console.log(`Producto actualizado: ${updatedProduct.title}`);
        } catch (error) {
            console.error(`Error al leer o actualizar el archivo ${this.path}: ${error.message}`);
            throw error;
        }
    };
}
