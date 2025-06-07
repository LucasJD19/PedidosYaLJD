const getProductos = async () => {
  try {
    let response = await axios.get("http://localhost:3000/locales");
    let respuesta = response.data
    console.log(respuesta);
    document.getElementById("tablaproductos").innerHTML = "";
    respuesta.map(restaurante => {
        let restauranteHTML = `
            <div class="restaurante">
                <h3 style="width:70%;margin: auto; border: 2px solid black; border-bottom: none">${restaurante.nombre}</h3>
                <table class="table" style="border: 2px solid black">
                    <thead>
                        <tr>
                            <th scope="col" style="text-align:center">Producto</th>
                            <th scope="col" style="text-align:center">Imagen</th>
                            <th scope="col" style="text-align:center">Descripción</th>
                            <th scope="col" style="text-align:center">Precio</th>
                            <th scope="col" style="text-align:center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${restaurante.menu.map(producto => {
                            return `
                                <tr>
                                    <td style="text-align:center">${producto.producto}</td>
                                    <td style="text-align:center"><img src="${producto.imagen}" alt="${producto.producto}" width="80"></td>
                                    <td style="text-align:center">${producto.descripcion}</td>
                                    <td style="text-align:center">$ ${producto.precio}</td>
                                    <td>
                                        <button class="btn btn-danger" onClick="handleDelete(${restaurante.idlocal}, ${producto.id})"><i class="fa-solid fa-trash"></i></button>
                                        <button class="btn btn-warning" onClick="handleEdit('${restaurante.idlocal}', '${producto.producto}', '${producto.descripcion}', '${producto.precio}', '${producto.id}')"><i class="fa-solid fa-pen"></i></button>
                                        <button class="btn btn-success" onClick="handleVer('${producto.imagen}','${producto.producto}', '${producto.descripcion}', '${producto.precio}', '${producto.id}')"><i class="fa-solid fa-eye"></i></button>
                                    </td>
                                </tr>
                            `;
                        }).join("")}
                    </tbody>
                </table><br><br>
            </div>
        `;
        document.getElementById("tablaproductos").innerHTML += restauranteHTML;
    });

  } catch (error) {
    console.log(error);
  }
};
getProductos();

const handleDelete = async (idlocal, id) => {
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
          const idlocalStr = String(idlocal);
          const idStr = String(id); 
          // let response = await axios.get(`http://localhost:3000/locales?idlocal=${idlocalStr}/menu?id=${idStr}`)
          // console.log(response);
          await axios.delete(`http://localhost:3000/locales?idlocal=${idlocalStr}/menu?id=${idStr}`);
          alert("Producto eliminado con éxito");
          getProductos();
      } catch (error) {
          console.error(error);
          alert("No se pudo eliminar el producto");
      }
  }
};


const handleEdit = (idlocal, producto, descripcion, precio, id) => {

  document.getElementById("form").style.display = "block";
  document.getElementById("agregar").style.display = "none";
  document.getElementById("agregar2").style.display = "none";
  document.getElementById("actualizar").style.display = "block";
  document.getElementById("tablaproductos").style.display = "none";

  document.getElementById("producto").value = producto;
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("precio").value = precio;

  document.getElementById("actualizar").onclick = async () => {
    try {
      const productoActualizado = document.getElementById("producto").value
      const descripcionActualizada = document.getElementById("descripcion").value
      const precioActualizado = document.getElementById("precio").value;

      let response = await axios.get(`http://localhost:3000/locales?idlocal=${idlocal}`);
      let restaurante = response.data[0];
      console.log(restaurante.menu);
      const productoAEditar = restaurante.menu.find(item => Number(item.id) === Number(id));
      if (productoAEditar) {
        productoAEditar.producto = productoActualizado;
        productoAEditar.descripcion = descripcionActualizada;
        productoAEditar.precio = precioActualizado;
        await axios.put(`http://localhost:3000/locales/${restaurante.id}`, restaurante);
        alert("Producto actualizado con exito");
        document.getElementById("form").style.display = "none";
        document.getElementById("tablaproductos").style.display = "block"
        getProductos();
      } else {
        alert("Producto no encontrado");
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el producto");
    }
  };
}
const handleVer = (imagen, producto, descripcion, precio, id) => {
  document.getElementById("verProducto").style.display = "block"
  document.getElementById("tablaproductos").style.display = "none"
  document.getElementById("agregar").style.display = "none"
  
  document.getElementById("verProducto").innerHTML = `
    <div class="card" style="width: 18rem;margin-left:40%;">
      <img src="${imagen}" class="card-img-top mt-2" alt="...">
      <div class="card-body">
          <h5 class="card-title">${producto}</h5>
          <p class="card-text"><span style="color:red;font-weight: bold;">Descripcion:</span> <span style = "font-weight: bold;">${descripcion}</span></p>
          <p class="card-text"><span></span> <span style="color:green;font-weight: bold;">$ ${precio}  </span></p>
      </div>
    </div>
    <br>
    <button id="volver" onClick="handleVolver()" class="btn btn-danger" style="margin-left:46%;">Volver</button>
  `
  document.getElementById("volver").style.display = "block"
}
const handleVolver = () => {
  document.getElementById("tablaproductos").style.display = "block"
  document.getElementById("verProducto").style.display = "none"
  document.getElementById("agregar").style.display = "block"
  document.getElementById("form").style.display = "none"
  document.getElementById("volver").style.display = "none"
  
  document.getElementById("agregar2").style.display = "none"
}
const handleClick = () => {
  document.getElementById("agregar2").style.display = "block"
  document.getElementById("agregar").style.display = "none"
  document.getElementById("form").style.display = "block"
  document.getElementById("tablaproductos").style.display = "none";
  document.getElementById("volver").style.display = "block"
}
document.getElementById("agregar").addEventListener("click",handleClick)

const handleAgregar = async () => {
  try {
    
    let nombre = document.getElementById("nombre").value.toLowerCase().replace(/\s+/g, '');
    let producto = document.getElementById("producto").value
    let descripcion = document.getElementById("descripcion").value
    let precio = document.getElementById("precio").value
    let imagen = document.getElementById("imagen").value;
    let response = await axios.get(`http://localhost:3000/locales?buscar=${nombre}`);
    if (response.data.length > 0) {
      let local = response.data[0];
      let nuevoProducto = {
        id: local.menu.length > 0 ? local.menu[local.menu.length - 1].id + 1 : 0,
        producto: producto,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen
      };
      local.menu.push(nuevoProducto);
      await axios.put(`http://localhost:3000/locales/${local.id}`, local);
      alert("Producto agregado exitosamente");
      getProductos();
    } else {
      alert("Restaurante no encontrado");
    }
  } catch (error) {
    console.error(error);
    alert("No se pudo agregar el producto");
  }
};
document.getElementById("volver").addEventListener("click", handleVolver);
document.getElementById("agregar2").addEventListener("click", handleAgregar);
