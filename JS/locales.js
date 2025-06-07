const BASE_URL = "http://localhost:3000/locales"
const getProducto = async () => {
    
    try {
        let response = await axios.get(BASE_URL)
        // console.log(response);
        let locales = response.data
        console.log(locales);
        locales.map(local=>{document.getElementById("contenedorproductos").innerHTML += `
            <div class="longitud">
                <a href="./restaurante.html?id=${local.buscar}" id="anclaRestaurante">
                    <div class="card-local" id="card-local">
                        <div class="imagen-local">
                            <img src="${local.imagen}"
                                alt="Comida" id="imagen-local">
                        </div>
                        <div class="descripcion-local" id="descripcion-local">
                            <p class="nombre-local" id="nombre-local">${local.nombre}</p>
                            <p class="envio" id="tiempoEnvio">Tiempo de envio: ${local.envio}</p>
                            <p class="envio" id="precioEnvio">Costo de envio: $${local.costoEnvio}</p>
                        </div>
                    </div>
                </a>
            </div>
            `})
    } catch (error) {
        console.error(error);
    }
}
getProducto()



