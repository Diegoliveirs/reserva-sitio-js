// ui.js
export async function renderReservas(lista) {
  const container = document.getElementById("lista-reservas");
  container.innerHTML = "";

  // carrega o HTML do componente
  const response = await fetch("components/reserva-card.html");
  const template = await response.text();

  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhuma reserva encontrada.</p>";
    return;
  }

  lista.forEach(r => {
    // substitui os placeholders
    const itemHTML = template
      .replace("{{nome}}", r.nome)
      .replace("{{data}}", r.data);

    // insere no DOM
    container.insertAdjacentHTML("beforeend", itemHTML);
  });
}
