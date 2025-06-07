document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let nombre = document.getElementById("user").value;
    let contraseña = document.getElementById("pass").value;
    let confirmarPass = document.getElementById("confirmarPass").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("mail").value;

    if (contraseña !== confirmarPass) {
        alert("Las contraseñas tienen que ser iguales");
        return;
    }
    try {
        const Response = await axios.get("http://localhost:3000/usuarios");
        const usuarioExiste = Response.data.some(user => user.usuario === nombre || user.email === email);

        if (usuarioExiste) {
            alert("El nombre de usuario o el correo electronico ya estan registrados");
        } else {
            await axios.post("http://localhost:3000/usuarios", {
                usuario: nombre,
                contraseña: contraseña,
                direccion: direccion,
                telefono: telefono,
                email: email,
            });
            window.location.href = "../Carteles/cartelregistrado.html";
        }
    } catch (error) {
        console.log(error);
        alert("Hubo un problema al registrar el usuario");
    }
});

