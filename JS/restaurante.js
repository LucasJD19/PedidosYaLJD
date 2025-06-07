const BASE_URL = "http://localhost:3000/locales";

function getIDancla() {
    const ancla = window.location.search;
    const ID = ancla.split('=');
    return ID[1];
}

const carrito = [];

let restauranteGlobal = null;

const getMenu = async () => {
    try {
        const restaurantId = getIDancla(); 
        let response = await axios.get(BASE_URL); 
        let restaurantes = response.data;
        const restaurante = restaurantes.find(local => local.buscar === restaurantId);

        if (restaurante) {
            restauranteGlobal = restaurante;
            document.getElementById("banner").innerHTML = `<img src="${restaurante.banner}" alt="..." id="imgbanner">`;
            restaurante.menu.map((menu, index) => {
                document.getElementById("contenedormenu").innerHTML += `
                    <div class="card-producto" id="card-producto">
                        <div class="imagen">
                            <img src="${menu.imagen}" alt="Comida" id="imagen">
                        </div>
                        <div class="descripcion" id="descripcion">
                            <p class="nombre" id="nombre">${menu.producto}</p>
                            <p class="ingredientes" id="ingredientes">${menu.descripcion}</p>
                            <div class="cardFoot" id="cardFoot">
                                <h3 class="precio" id="precio">$${menu.precio}</h3>
                                <button id="agregar" onclick="agregarAlCarrito(${index})">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>`;
            });
        } else {
            console.error("Restaurante no encontrado");
        }
    } catch (error) {
        console.error(error);
    }
};

const agregarAlCarrito = (index) => {
    document.getElementById("pagar").style.display = "block";
   
    if (!restauranteGlobal) {
        console.error("Restaurante no cargado");
        return;
    }
    const producto = restauranteGlobal.menu[index];
    
    console.log("Producto agregado al carrito:", producto);
    
    const carritoItems = document.getElementById("carrito-items");
    carrito.push(producto);
    carritoItems.innerHTML += `
        <div class="carrito-item">
            <img src="${producto.imagen}" alt="${producto.producto}" class="carrito-img">
            <div class="carrito-info">
                <p class="carrito-nombre">${producto.producto}</p>
                <p class="carrito-descripcion">${producto.descripcion}</p>
            </div>
            <div class="carrito-precio">$${producto.precio}</div>
            <button class="carrito-eliminar" onclick="eliminarDelCarrito(this)">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>`;
};

const eliminarDelCarrito = (boton) => {
    const itemCarrito = boton.closest(".carrito-item");
    itemCarrito.remove();
    
    const productoNombre = itemCarrito.querySelector(".carrito-nombre").textContent;
    carrito.splice(carrito.findIndex(p => p.producto === productoNombre), 1);
    if (carrito.length === 0) {
        document.getElementById("pagar").style.display = "none";
    }else {
        document.getElementById("pagar").style.display = "block";
    }
};

getMenu();

document.getElementById("pagar").addEventListener("click", () => {
    const producto2 = restauranteGlobal.costoEnvio;
    const titulo = restauranteGlobal.nombre;
    let total = parseFloat(producto2);
    let facturaHtml = "";

    carrito.forEach(producto => {
        
        facturaHtml += `
            <div class="factura-item">
                <p>${producto.producto} - $${producto.precio}</p>
            </div>`;
        total += parseFloat(producto.precio);
    
});

facturaHtml += `
    <div class="factura-total">
        <p>Costo de envio: $${producto2}
        <p>Total con envio: $${total.toFixed(2)}</p> 
    </div>`;

    document.getElementById("modal-container").innerHTML = `
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Factura - ${titulo}</h5>
              </div>
              <div class="modal-body">
                ${facturaHtml}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" onClick="handleConfirmar()">Confirmar pago</button>
              </div>
            </div>
          </div>
        </div>`;

    $('#exampleModal').modal('show');
});

const handleConfirmar = () => {
    window.location.href = "../Carteles/cartelcompra.html"
}