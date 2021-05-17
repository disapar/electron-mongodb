// codigo frontend de la aplicacion

const main = require("electron").remote.require("./main");

document.oncontextmenu = () => {
  return false;
};
let products = [];
let editProductId = "";
let editdatos = false;

const form = document.getElementById("form");
const title = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const productslist = document.getElementById("products");
const btnsend = document.getElementById('btnsend');

function estadoBtn(){
    if (editdatos) {
        btnsend.value =" Editar Información";
    } else {
        btnsend.value = "Enviar Datos"
        
    }
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevoProducto = {
    title: title.value,
    price: price.value,
    description: description.value,
  };
  if (!editdatos) {
    const result = await main.createProduct(nuevoProducto);
    console.log(result);
    products = await main.getProducts();
    renderProducts(products);
  } else {
    await main.updateProduct(editProductId, nuevoProducto);
    loadProducts();
    editdatos = false;
    estadoBtn()
  }

  form.reset();
  title.focus();
});

function renderProducts(products) {
  productslist.innerHTML = "";
  console.log(products)

  products.forEach((product) => {
    productslist.innerHTML += `
        <div class="cardProduct">
        <h2>${product.title}</h2>
        <h4>$ ${product.price}</h4>
        <p>${product.description}</p>
        <button class="btne red" onclick="deleteProduct('${product._id}')">Borrar</button>
        <button class="btne red" onclick="editProduct('${product._id}')">Editar</button>
        </div>    
        `;
  });
}

const deleteProduct = async (event) => {
  const result = confirm(" Desea eliminarlo");

  if (result) {
    main.deleteProduct(event);
    loadProducts();
  }
};

const editProduct = async (event) => {


  var product = await main.getProductById(event);
  console.log(product)
  title.value = product.title;
  price.value = product.price;
  description.value = product.description;

  editdatos = true;
  editProductId = product.id;
  estadoBtn();
};

const loadProducts = async () => {
  products = await main.getProducts();
  renderProducts(products);
};

async function ini() {
  loadProducts();
}

ini();
