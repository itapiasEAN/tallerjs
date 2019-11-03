// variables
const carrito = document.getElementById("carrito");
const productos = document.getElementById("lista-productos");
const listaProductos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
// Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar carrito"
  productos.addEventListener("click", comprarProducto);

  // cuando se elimina un producto del carrito
  carrito.addEventListener("click", eliminarProducto);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // al cargar el document, mostrar en localstorage
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

// funciones
// funcion que añade el producto al carrito
function comprarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const producto = e.target.parentElement.parentElement;

    leerDatosProducto(producto);
  }
}
// Lee los datos del producto
function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h4").textContent,
    precio: producto.querySelector(".precio span").textContent,
    id: producto.querySelector("h4").textContent
  };
  console.log(infoProducto);
  insertarCarrito(infoProducto);
}
function insertarCarrito(producto) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
        <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
    `;
  listaProductos.appendChild(row);
  guardarProductoLocalStarage(producto);
}
// Elimina el producto del carrito en el dom
function eliminarProducto(e) {
  e.preventDefault();

  let producto, productoId;
  if (e.target.classList.contains("borrar-producto")) {
    e.target.parentElement.parentElement.remove();
    producto = e.target.parentElement.parentElement;
    productoId = producto.querySelector("a").getAttribute("data-id");
  }

  eliminarProductoLocalStorage(productoId);
}

// Eliminar los productos
function vaciarCarrito() {
  while (listaProductos.firstChild) {
    // uso while
    listaProductos.removeChild(listaProductos.firstChild);
  }
  alert("se han eliminado todos los productos"); // uso alert

  // Vaciar local Storage
  vaciarLocalStorage();
  return false;
}
function guardarProductoLocalStarage(producto) {
  let productos;
  productos = obtenerProductosLocalStorage();

  // el producto seleccionado se agrega al arreglo
  productos.push(producto);

  localStorage.setItem("productos", JSON.stringify(productos));
}

// comprueba que haya elementos en ls
function obtenerProductosLocalStorage() {
  let productosLS;

  //comprobamos si hay algo en localStorage con if/else
  if (localStorage.getItem("productos") === null) {
    productosLS = [];
  } else {
    productosLS = JSON.parse(localStorage.getItem("productos"));
  }
  return productosLS;
}
// imprime los datos del local storage
function leerLocalStorage() {
  let productosLS;

  productosLS = obtenerProductosLocalStorage();

  productosLS.forEach(producto => {
    // uso de arrow fuction y foreach
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>
              <img src="${producto.imagen}" width="100">
          </td>
          <td>${producto.titulo}</td>
          <td>${producto.precio}</td>
          <td>
          <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
      `;
    listaProductos.appendChild(row);
  });
}

// Elimina el producto por el ID en local Storage

function eliminarProductoLocalStorage(producto) {
  let productosLS;
  // obtenemos el arreglo de productos
  productosLS = obtenerProductosLocalStorage();
  // Iteramos comparando el ID del producto borrado con los del Local Storage
  productosLS.forEach(function(productoLS, index) {
    if (productoLS.id === producto) {
      productosLS.splice(index, 1);
    }
  });

  // Añadimos el arreglo actual a storage
  localStorage.setItem("productos", JSON.stringify(productosLS));
}

// Eliminar todos los productos de local Storage

function vaciarLocalStorage() {
  localStorage.clear();
}
