let posicion = 0;
const cards = 6;
const items = document.querySelectorAll('.carrusel .item');
const itemsTotales = items.length;
const carrusel = document.getElementById('carrusel');

const actualizarCarrusel = () => {
    const desplazamiento = - (posicion * (items[0].offsetWidth + 10));
    carrusel.style.transform = `translateX(${desplazamiento}px)`;
};

document.getElementById('next').addEventListener('click', () => {
    if (posicion < itemsTotales - cards) {
        posicion++;
    } else {
        posicion = 0;
    }
    actualizarCarrusel();
});

document.getElementById('prev').addEventListener('click', () => {
    if (posicion > 0) {
        posicion--;
    } else {
        posicion = itemsTotales - cards;
    }
    actualizarCarrusel();
});

let buscarProducto = () => {
    let valor = document.getElementById("input").value.toLowerCase().split(" ").join("");
    if (valor == "") {
        console.log("No se encontraron resultados");
    } else {
        window.location.href = `restaurante.html?id=${valor}`;
    }
}

document.getElementById("btnBuscar").addEventListener("click", buscarProducto);
