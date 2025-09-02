function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "teste" && password === "teste") {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("menu-screen").style.display = "flex";
    }else {
        alert("Usuário ou Senha inválidos.")
    }
}


document.getElementById("login-screen").style.display = "flex;"