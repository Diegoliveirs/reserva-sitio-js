let reservaEmEdicao = null;

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
        alert("Ocorreu um erro ao cadastrar reserva!");
        console.error(err);
    }
    
}


async function mostrarTelaListarReservas() {
    try {
        const { data: reservas, error } = await supabase
            .from('reservas')
            .select('*'); 

            if (error) {
                alert("Erro ao buscar reservas: " + error.message);
                console.error(error);
                return;
            }

            const tabelaBody = document.querySelector("#tabela-reservas tbody");
            console.log("Tabela Body:", tabelaBody);
            tabelaBody.innerHTML = '';
            reservas.forEach(reserva => {
                const row = tabelaBody.insertRow();

                const [anoEntrada, mesEntrada, diaEntrada] = reserva.data_entrada.split('-');
                const dataEntradaFormatada = `${diaEntrada}/${mesEntrada}/${anoEntrada}`;
                
                const [anoSaida, mesSaida, diaSaida] = reserva.data_saida.split('-');
                const dataSaidaFormatada = `${diaSaida}/${mesSaida}/${anoSaida}`;
                
                const cell0 = row.insertCell(0);
                cell0.innerText = reserva.nome_cliente;
                cell0.setAttribute('data-label', 'Nome do Cliente');

                const cell1 = row.insertCell(1);
                cell1.innerText = reserva.telefone;
                cell1.setAttribute('data-label', 'Telefone');

                const cell2 = row.insertCell(2);
                cell2.innerText = dataEntradaFormatada;
                cell2.setAttribute('data-label', 'Data de Entrada');

                const cell3 = row.insertCell(3);
                cell3.innerText = dataSaidaFormatada;
                cell3.setAttribute('data-label', 'Data de Saída');

                const cell4 = row.insertCell(4);
                cell4.innerText = reserva.diaria.toFixed(2);
                cell4.setAttribute('data-label', 'Diária (R$)');

                const cell5 = row.insertCell(5);
                cell5.innerText = reserva.observacao || '';
                cell5.setAttribute('data-label', 'Observação');

                const cellAcoes = row.insertCell(6);
                cellAcoes.innerHTML = `<button onclick="editarReserva('${reserva.id}')" class="btn-acao btn-editar">Editar</button>
                                       <button onclick="deletarReserva('${reserva.id}')" class="btn-acao btn-deletar">Deletar</button>`;
            });

            mostrarTela("tela-listar-reservas");
        } catch (err) {
            alert("Ocorreu um erro ao carregar reservas!");
            console.error(err);
        }
}

async function deletarReserva(id) {
    if (confirm("Tem certeza que deseja deletar esta reserva?")) {
        try {
            const { error } = await supabase
                .from('reservas')
                .delete()
                .eq('id', id);

            if (error) {
                alert("Erro ao deletar reserva: " + error.message);
                console.error(error);
            } else {
                alert("Reserva deletada com sucesso!");
                mostrarTelaListarReservas();
            }

        } catch (err) {
                alert("Ocorreu um erro ao deletar a reserva!");
                console.error(err);
        }
    }
}

function mostrarTelaCadastroReserva(isEditing = false) {
    mostrarTela("tela-cadastro-reserva");
    const backButton = document.getElementById("bt-voltar-cadastro-reserva");
    if (isEditing) {
        backButton.innerHTML = "Cancelar Edição";
        backButton.onclick = () => mostrarTelaListarReservas();
    } else {
        backButton.innerHTML = "Voltar ao Menu Principal";
        backButton.onclick = () => voltarAoMenu();
    }

} 

async function editarReserva(id) {
    
    const { data: reserva, error } = await supabase
        .from('reservas')
        .select('*')
        .eq('id', id)
        .single();  
    
    if (error) {
        alert("Erro ao buscar reserva: " + error.message);
        console.error(error);
        return;
    }
    
    document.getElementById("nomecliente").value = reserva.nome_cliente;
    document.getElementById("telefone").value = reserva.telefone;
    document.getElementById("data-entrada").value = reserva.data_entrada;
    document.getElementById("data-saida").value = reserva.data_saida;
    document.getElementById("diaria").value = reserva.diaria;
    document.getElementById("observacao").value = reserva.observacao;
    
    reservaEmEdicao = reserva.id;

    document.querySelector("#form-reserva button[type='submit']").innerText = "Salvar Alterações";

    mostrarTelaCadastroReserva(true);
}

async function atualizarReserva(event) {
    if (event) {
        event.preventDefault();
    }

    const nomecliente = document.getElementById("nomecliente").value;
    const telefone = document.getElementById("telefone").value;
    const dataEntrada = document.getElementById("data-entrada").value;
    const dataSaida = document.getElementById("data-saida").value;
    const diaria = parseFloat(document.getElementById("diaria").value);
    const observacao = document.getElementById("observacao").value;

    try {
        const { error } = await supabase
            .from('reservas')
            .update({
                nome_cliente: nomecliente,
                telefone: telefone,
                data_entrada: dataEntrada,
                data_saida: dataSaida,
                diaria: diaria,
                observacao: observacao
            })
            .eq('id', reservaEmEdicao);

            if (error) {
                alert("Erro ao atualizar reserva: " + error.message);
                console.error(error);
            } else {
                alert(`Reserva para ${nomecliente} atualizada com sucesso!`);
                document.getElementById("form-reserva").reset();
                reservaEmEdicao = null;
                document.querySelector("#form-reserva button[type='submit']").innerText = "Cadastrar Reserva";
                mostrarTelaListarReservas();
            }
    } catch (err) {
        alert("Ocorreu um erro ao atualizar a reserva!");
        console.error(err);
    }
}

async function checarReserva(data) {
    try {
        const { data: reservas, error } = await supabase
            .from('reservas')
            .select('*')
            .or(`data_entrada.eq.${data},data_saida.eq.${data}`);

            if(error) {
                alert("Erro ao checar reservas: " + error.message);
                console.error(error);
                return;
            }

            if(reservas && reservas.length > 0) {
                const reserva = reservas[0];
                editarReserva(reserva.id);
            }else {
                mostrarTelaCadastroReserva();
                document.getElementById(form-reserva).reset();
                document.getElementById("#form-reserva button[type='submit']").innerText = "Cadastrar Reserva";
                reservaEmEdicao = null;
                document.getElementById("data-entrada").value = data;

            }

    } catch (err) {
        alert("Ocorreu um erro ao checar reservas!");
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
        formCadastroReserva.addEventListener("submit", (event) => {
            if (reservaEmEdicao) {
                atualizarReserva(event);
            } else {
                cadastrarReserva(event);
            }
        });

    mostrarTela("tela-login");
    }

    const mesAnteriorBtn = document.getElementById('mes-anterior');
    const proximoMesBtn = document.getElementById('proximo-mes');

    if(mesAnteriorBtn && proximoMesBtn) {
        mesAnteriorBtn.addEventListener('click', () => {
            mesAtual--;
            if (mesAtual < 0) {
                mesAtual = 11;
                anoAtual--;
            }
            renderizarCalendario(mesAtual, anoAtual);
        });

        proximoMesBtn.addEventListener('click', () => {
            mesAtual++;
            if (mesAtual > 11) {
                mesAtual = 0;
                anoAtual++;
            }
            renderizarCalendario(mesAtual, anoAtual);
        });

        renderizarCalendario(mesAtual, anoAtual);
    }
});