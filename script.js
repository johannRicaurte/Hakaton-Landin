//Programa en JS para agregar productos a un carrito y en el localstorage, sumar el total y mostrar en el html
const carrito = document.getElementById("carrito");
const total = document.getElementById("total");
const productos = document.getElementById("productos");
let carritoArray = JSON.parse(localStorage.getItem("carrito")) || [];
let totalCompra = 0;
const productosDisponibles = [
  { id: 1, nombre: "Producto 1", precio: 100 },
  { id: 2, nombre: "Producto 2", precio: 200 },
  { id: 3, nombre: "Producto 3", precio: 300 },
  { id: 4, nombre: "Producto 4", precio: 400 },
];

function addCarrito(id) {
    let producto = productosDisponibles.find(p => p.id === id);
    if (producto) {
        carritoArray.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carritoArray));
        alert("Producto agregado al carrito")
        totalCompra += producto.precio;
        total.innerText = "Total: $" + totalCompra;
        calcularTotal();
        
    }
}

//Funcion para eliminar producto de la lista
function deleteProduct(id) {
  // Elimina solo el primer producto que coincida con el id
  const index = carritoArray.findIndex(producto => producto.id === id);
  if (index !== -1) {
    carritoArray.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carritoArray));
    // Actualiza el modal y el total
    mostrarModalCarrito();
  }
}

//funcion para calcular el total de El carrito 
function calcularTotal()
{
    let totalFactura = 0;
    carritoArray.forEach( producto => {
        totalFactura += producto.precio;
    }
    )
    return totalFactura;
}

//Mostrar productos del carrito 
function showCarrito()
{
    console.log(carritoArray);
}



//Funcion para mostrar el modal del carrito
function mostrarModalCarrito() {
  document.getElementById('modal_detalle_carrito').style.display = 'block';
  const productsSection = document.getElementById('products');
   const totalFactura = document.getElementById('totalFactura');
   let cards = "";

  carritoArray.forEach(producto => {
    cards += `
      <article class="producto-card" data-id="${producto.id}">
        <img src="producto${producto.id}.jpg" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toLocaleString()}</p>
         <button onclick="deleteProduct(${producto.id})">Eliminar</button>
      </article>
    `;
  });
   
  productsSection.innerHTML = cards;

  const total = calcularTotal();
  totalFactura.textContent = `Total: $${total.toLocaleString()}`;

}

function cerrarModal() {
  document.getElementById('modal_detalle_carrito').style.display = 'none';
}
//funcioncion para mostrar  los productos de la lista en el html

function mostrarProductosTienda() {
  const tienda = document.getElementById("productos");
  let cards = "";

  productosDisponibles.forEach(producto => {
    cards += `
      <article class="producto-card" data-id="${producto.id}">
        <img src="producto${producto.id}.jpg" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toLocaleString()}</p>
        <button class="btn-agregar" onclick="addCarrito(${producto.id})">Agregar al carrito</button>
      </article>
    `;
  });

  tienda.innerHTML = cards;
}

//Funcion para vaciar productos del carrito y del localStorage
function vaciarCarrito()
{
    carritoArray = [];
    localStorage.removeItem("carrito");
    totalCompra = 0;
    total.innerText = "Total: $0";
    alert("Carrito vaciado");
}
