const SUPABASE_URL = "https://kolgjtdjtyrpkpivavkb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbGdqdGRqdHlycGtwaXZhdmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MzgwOTEsImV4cCI6MjA3MjMxNDA5MX0.RsCHCtSqpAd3556fdd07kXbIzcWZEM2U7py_QXNoqoc";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function mostrarTela(idTela) {
    const telas = ["tela-login", "tela-menu", "tela-cadastro-reserva", "tela-cadastro-usuarios"];
    telas.forEach(tela => {
        const el = document.getElementById(tela);
        if (el) el.style.display = 'none';
    });
    const telaAtiva = document.getElementById(idTela);
    if (telaAtiva) telaAtiva.style.display = 'block';
}

function voltarAoMenu() {
    mostrarTela("tela-menu");
}

function voltarAoLogin() {
    mostrarTela("tela-login");
}

function mostrarTelaCadastroUsuario() {
    mostrarTela("tela-cadastro-usuarios");
}

function login(event) {
    if (event) {
        event.preventDefault();
    }
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "teste" && password === "teste") {
        mostrarTela("tela-menu");
    } else {
        alert("Usuário ou Senha inválidos.");
    }
}

async function cadastrarUsuario(event) {
    if (event) {
        event.preventDefault();
    }
    
    const nomeusuario = document.getElementById("nomeusuario").value;
    const usuario = document.getElementById("usuario-cadastro").value;
    const senha = document.getElementById("senha-cadastro").value;

    if (!nomeusuario || !usuario || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(senha);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const senhaHash = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        console.log("Senha hash:", senhaHash);

        const { data: novoUsuario, error } = await supabase
            .from('usuarios')
            .insert([{nome: nomeusuario, usuario: usuario, senha: senhaHash }]);

            if (error) {
                alert("Erro ao cadastrar usuário: " + error.message);
            } else {
                alert(`Usuário ${usuario} cadastrado com sucesso!`);
                document.getElementById("form-usuario").reset();
                //voltarAoMenu();
            }
    } catch (err) {
        alert("Erro ao cadastrar usuário!");
        console.error(err);

    mostrarTela("tela-login");
    }
}


async function cadastrarReserva(event) {
    if (event) {
        event.preventDefault();
    }

    const nomecliente = document.getElementById("nomecliente").value;
    const telefone = document.getElementById("telefone").value;
    const dataEntrada = document.getElementById("data-entrada").value;
    const dataSaida = document.getElementById("data-saida").value;
    const diaria = parseFloat(document.getElementById("diaria").value);
    const observacao = document.getElementById("observacao").value;

    if (!nomecliente || !telefone || !dataEntrada || !dataSaida || isNaN(diaria)) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        const { data: novaReserva, error } = await supabase
            .from('reservas')
            .insert([
                {
                nome_cliente: nomecliente,
                telefone: telefone,
                data_entrada: dataEntrada,
                data_saida: dataSaida,
                diaria: diaria,
                observacao: observacao
            }
        ]);
    
        if (error) {
            alert("Erro ao cadastrar reserva: " + error.message);
            console.error(error);
        } else {
            alert(`Reserva para ${nomecliente} do dia ${dataEntrada} ate ${dataSaida} cadastrada com sucesso!`);
            document.getElementById("form-reserva").reset();
            //voltarAoMenu();
        }
    } catch (err) {
        alert("Erro ao cadastrar reserva!");
        console.error(err);
    }
    
}


document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", login);
    }

    const formCadastroUsuario = document.getElementById("form-usuario");
    if (formCadastroUsuario) {
        formCadastroUsuario.addEventListener("submit", cadastrarUsuario);
    }

    const formCadastroReserva = document.getElementById("form-reserva");
    if (formCadastroReserva) {
        formCadastroReserva.addEventListener("submit", cadastrarReserva);
    }

    mostrarTela("tela-login");
});

function mostrarTelaCadastroReserva() {
    mostrarTela("tela-cadastro-reserva");
}

function mostrarTelaCadastroUsuario() {
    mostrarTela("tela-cadastro-usuarios");
}
