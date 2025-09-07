import { criarReserva, fetchReservas } from "./api.js";
import { renderReservas } from "./ui.js";

export async function carregarReservas() {
  const reservas = await fetchReservas();
  renderReservas(reservas);
}

export async function novaReserva(nome, data) {
  const reserva = { nome, data };
  await criarReserva(reserva);
  await carregarReservas();
}
