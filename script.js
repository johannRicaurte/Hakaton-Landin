// 1. Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 2. Función para agregar producto al carrito
function agregarAlCarrito(event) {
  const boton = event.target;
  const producto = {
    id: boton.dataset.id,
    nombre: boton.dataset.nombre,
    precio: parseInt(boton.dataset.precio),
  };

  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log("Producto agregado:", producto);

  // 3. Animación simple
  boton.innerText = "✔ Agregado";
  boton.style.backgroundColor = "#28a745";

  setTimeout(() => {
    boton.innerText = "Agregar al carrito";
    boton.style.backgroundColor = "#007bff";
  }, 1500);
}

// 4. Asignar evento a todos los botones
document.querySelectorAll(".btn-agregar").forEach(boton => {
  boton.addEventListener("click", agregarAlCarrito);
});
