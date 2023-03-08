import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

const env = async () => {
  let primeraConsulta = await manager.consultarProductos();
  console.log(primeraConsulta);

  const producto = {
    title: "Aretes",
    description: "Aretes de corazón",
    price: 20000,
    thumbnail: "UwU",
    code: 239,
    stock: 2,
  };

  await manager.crearProducto(producto);

  const changes = {
    title: "cambie el titulo xd",
    price: 100000,
    stock: 1500,
  };

  await manager.updateProduct(1, changes);
  let terceraConsulta = await manager.consultarProductos();
  console.log(terceraConsulta);

  
  let cuartaConsulta = await manager.getProductElementById(1);
  console.log(cuartaConsulta);

  let quintaConsulta = await manager.deletProduct(5);
  console.log(quintaConsulta);


};

env();