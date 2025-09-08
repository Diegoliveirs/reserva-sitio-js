function mostrarTela(idTela) {
    const telas = ["tela-login", "tela-menu", "tela-cadastro-reserva", "tela-cadastro-usuarios", "tela-listar-reservas", "tela-calendario"];
    const rodape = document.getElementById("rodape");

    telas.forEach(tela => {
        const el = document.getElementById(tela);
        if (el) el.style.display = 'none';
    });
    const telaAtiva = document.getElementById(idTela);
    if (telaAtiva) telaAtiva.style.display = 'block';

    if (idTela === "tela-login" && rodape) {
        rodape.style.display = 'none';
    } else if (rodape) {
        rodape.style.display = 'flex';
    }
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

function mostrarTelaCalendario() {
    mostrarTela("tela-calendario");
}


function renderizarCalendario(mes, ano) {
    const nomesMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const diasContainer = document.getElementById('calendario-dias');
    const mesAtualElement = document.getElementById('mes-atual');

    diasContainer.innerHTML = '';
    mesAtualElement.innerHTML = `${nomesMes[mes]}, ${ano}`;

    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDiaSemana; i++) {
        const diaLivre = document.createElement('span');
        diaLivre.classList.add('dia-livre');
        diasContainer.appendChild(diaLivre);
    }

    for(let dia = 1; dia <= diasNoMes; dia++) {
        const diaElemento = document.createElement('span');
        diaElemento.classList.add('dia');
        diaElemento.innerText = dia;
        diasContainer.appendChild(diaElemento);
          
       const hoje = new Date();
       if(dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
           diaElemento.classList.add('hoje');
       }

       diaElemento.addEventListener('click', () => {
        const mesFormatado = String(mes + 1).padStart(2, '0');
        const diaFormatado = String(dia).padStart(2, '0');
        const dataSelecionada = `${ano}-${mesFormatado}-${diaFormatado}`;
        checarReserva(dataSelecionada);
       });
    }

}

let dataAtual = new Date();
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();
