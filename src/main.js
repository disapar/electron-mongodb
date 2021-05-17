const { BrowserWindow, Notification } = require("electron");
const Product = require('./model/products');



let window;

async function createProduct(event) {
  console.log(event);
  const data = new Product(event);

  await data.save();
  console.log(data);
 
 
  // :::::::::::::::::::: NoBORRAR::::::::::::::://
    new Notification({
      title: "Product",
      body: "the product was loaded successfully",
    }).show();
  // :::::::::::::::::::: NoBORRAR::::::::::::::://

   
}

async function updateProduct(id, product){
  
  await Product.updateOne({"_id": id}, product);
}
async function getProductById(event) {
 
  const product = await Product.findById(event);
  // console.log(product)
  return product;
}
// Load all products 
async function getProducts() {
  
  const allProducts = await Product.find();
  console.log(allProducts)
  return allProducts;

}

async function deleteProduct(id) {
    await Product.remove({'_id':id})

  // :::::::::::::::::::: NoBORRAR::::::::::::::://

  new Notification({
    title: "Productos",
    body: "The product is delete",
  }).show();
}
  // :::::::::::::::::::: NoBORRAR::::::::::::::://

function createWindow() {
  window = new BrowserWindow({
    width: 1200,
    height: 650,
    // tamaño minimo de la ventana
    minWidth: 600,
    minHeight: 400,
    // tamaño maximo de la ventana
    maxWidth: 1200,
    maxHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  window.loadFile("src/vista/index.html");
  // oculta el menu superior de la ventana.
  window.setMenuBarVisibility(false);
  // maximiza la ventana al iniciar la aplicacion
  // window.maximize()
}

module.exports = {
  createWindow,
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct
};
