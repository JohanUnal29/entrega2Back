import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./files/Productos.json";
  }
    consultarProductos = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            console.log(result);
            return result;
        } else {
            return [];
        }
    };

    deletProduct = async(id) => {
        const products = await this.consultarProductos();

        try{
            const productIndex = this.products.findIndex((product) => product.id === id);
            products.splice(productIndex, 1);
            console.log("producto eliminado");
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return products;

        }catch(err){
            console.log(`error: ${err}`);
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
        return producto;
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