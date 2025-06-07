const BASE_URL = "http://localhost:3000/supermercado";

const carrito = [];

let supermercadoGlobal = null;

const getProductos = async () => {
    try {
        let response = await axios.get(BASE_URL);
        let productos = response.data;
        console.log(productos);
        supermercadoGlobal = productos;
        document.getElementById("contenedormenu").innerHTML = '';
        productos.map((producto, index) => {
            document.getElementById("contenedormenu").innerHTML += `
                <div class="card-producto" id="card-producto">
                    <div class="imagen">
                        <img src="${producto.imagen}" alt="Producto" id="imagen">
                    </div>
                    <div class="descripcion" id="descripcion">
                        <p class="nombre" id="nombre">${producto.nombre} - ${producto.marca}</p>
                        <p class="descripcion" id="descripcion">${producto.descripcion}</p>
                        <div class="cardFoot" id="cardFoot">
                            <h3 class="precio" id="precio">$${producto.precio}</h3>
                            <button id="agregar" onclick="agregarAlCarrito(${index})">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
        });
    } catch (error) {
        console.error(error);
    }
};

const agregarAlCarrito = (index) => {
    document.getElementById("pagar").style.display = "block";
    if (!supermercadoGlobal) {
        console.error("Supermercado no cargado");
        return;
    }
    const producto = supermercadoGlobal[index];
    console.log("Producto agregado al carrito:", producto);
    const carritoItems = document.getElementById("carrito-items");
    carrito.push(producto);
    carritoItems.innerHTML += `
        <div class="carrito-item">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-img">
            <div class="carrito-info">
                <p class="carrito-nombre">${producto.nombre}</p>
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
    carrito.splice(carrito.findIndex(p => p.nombre === productoNombre), 1);
    if (carrito.length === 0) {
        document.getElementById("pagar").style.display = "none";
    }else {
        document.getElementById("pagar").style.display = "block";
    }
};
getProductos();

document.getElementById("pagar").addEventListener("click", () => {
    const producto2 = 500;
    let total = producto2;
    let facturaHtml = "";
    
    carrito.map((producto) => {
        facturaHtml += `
            <div class="factura-item">
                <p>${producto.nombre} - $${producto.precio}</p>
            </div>`;
        total += parseFloat(producto.precio);
    });

    facturaHtml += `
        <div class="factura-total">
            <p>Costo de envio: $${producto2}</p>
            <p>Total con envio: $${total.toFixed(2)}</p> 
        </div>`;

    document.getElementById("modal-container").innerHTML = `
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Factura - PedidosYa Market</h5>
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
    window.location.href = "../Carteles/cartelcompra.html";
};
