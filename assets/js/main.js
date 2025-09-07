async function carregarNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const response = await fetch("components/navbar.html");
  navbar.innerHTML = await response.text();
}

async function init() {
  await carregarNavbar();
  await carregarReservas();

  const btn = document.getElementById("btn-reservar");
  btn.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;

    if (!nome || !data) {
      alert("Preencha todos os campos!");
      return;
    }

    await novaReserva(nome, data);

    document.getElementById("nome").value = "";
    document.getElementById("data").value = "";
  });
}

document.addEventListener("DOMContentLoaded", init);
