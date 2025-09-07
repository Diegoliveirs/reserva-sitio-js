// Conexão com Supabase
const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "SUA-CHAVE-AQUI";

export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function fetchReservas() {
  let { data, error } = await supabase.from("reservas").select("*");
  if (error) console.error("Erro ao buscar reservas:", error);
  return data || [];
}

export async function criarReserva(reserva) {
  const { data, error } = await supabase.from("reservas").insert([reserva]);
  if (error) console.error("Erro ao criar reserva:", error);
  return data;
}
