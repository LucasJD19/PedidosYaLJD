document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let usuario = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    try {
        console.log(usuario);
        console.log(password);
        let response = await axios.get("http://localhost:3000/usuarios");
        console.log(response.data);
        if (usuario === "admin" && password === "admin123") {
            alert("Bienvenido, administrador!");
            window.location.href = "./indexAdmin.html";
        } else {
            let usuarioEncontrado = response.data.some(u => u.usuario === usuario && u.contraseña === password);
            console.log(usuarioEncontrado);
            if (usuarioEncontrado) {
                alert("¡Bienvenido!");
                window.location.href = "./index.html";
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        }
        limpiarinput();
    } catch (error) {
        console.log(error);
        alert("Ocurrio un error al verificar el usuario");
    }
});

const limpiarinput = () => {
    document.getElementById("user").value = "";
    document.getElementById("pass").value = "";
};
const verContraseña = document.getElementById("verContraseña");
const contraseñainput = document.getElementById("pass");

verContraseña.addEventListener("click", () => {
  const type = contraseñainput.type === "password" ? "text" : "password";
  contraseñainput.type = type;
  verContraseña.textContent = type === "password" ? "👁" : "🙈";
});



