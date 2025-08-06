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
        console.log(carritoArray);
    }
}