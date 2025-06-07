document.getElementById("recuperarForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let emailRecuperar = document.getElementById("email").value;
    try {
        const response = await axios.get("http://localhost:3000/usuarios");
        const emailExiste = response.data.some(user => user.email === emailRecuperar);
        if (emailExiste) {
            document.getElementById("cambiarPasswordForm").style.display = "block";
            document.getElementById("recuperarForm").style.display = "none";
        } else {
            alert("El correo ingresado no esta registrado");
        }
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al recuperar el usuario");
    }
});

document.getElementById("cambiarPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let emailRecuperar = document.getElementById("email").value;
    if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }
    try {
        const response = await axios.get("http://localhost:3000/usuarios");
        const usuario = response.data.find(user => user.email === emailRecuperar);
        if (usuario) {
            await axios.patch(`http://localhost:3000/usuarios/${usuario.id}`, {
                contraseña: newPassword
            }); 
            window.location.href = "../Carteles/cartelactualizado.html";

        }
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al actualizar la contraseña");
    }
});



