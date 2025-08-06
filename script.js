//Programa en JS para agregar productos a un carrito y en el localstorage, sumar el total y mostrar en el html
const carrito = document.getElementById("carrito");
const total = document.getElementById("total");
const productos = document.getElementById("productos");
let carritoArray = JSON.parse(localStorage.getItem("carrito")) || [];
let totalCompra = 0;
const productosDisponibles = [
  {
    id: 1,
    nombre: "Vestido de baño mujer",
    precio: 150000,
    imagen: "img-paula/vdb-mujer.jpg",
    tallas: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2,
    nombre: "Gafas para piscina",
    precio: 120000,
    imagen: "img-paula/gafas-piscina.webp"
  },
  {
    id: 3,
    nombre: "Camiseta manga larga",
    precio: 200000,
    imagen: "img-paula/productoZ.jpg",
    tallas: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 4,
    nombre: "Pantaloneta para piscina",
    precio: 140000,
    imagen: "img-paula/ProductoW.webp",
    tallas: ["XS", "S", "M", "L", "XL"]
  }
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
  if (confirm("Seguro que deseas eliminar este producto?")) {
    carritoArray = carritoArray.filter(p => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carritoArray));
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
         <img src="${producto.imagen}" alt="${producto.nombre}">
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
     <div class="productodestacado">
        <div class="imagen-productoX">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <p class="categoria">${producto.nombre}</p>
        ${producto.tallas ? `<p class="tallas">${producto.tallas.join(" &nbsp; ")}</p>` : ""}
        <p class="precio">$${producto.precio.toLocaleString()}</p>
        <button class="btn-agregar" onclick="addCarrito(${producto.id})">Agregar al carrito</button>
      </div>
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