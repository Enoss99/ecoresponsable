import { clearToken } from "./TokenService";

const BASE_API_URL =
  /*import.meta.env.VITE_API_URL ||*/ "http://localhost:4000/api";

export const postApi = async (endpoint: string, data: any) => {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // si on a un token, on l'ajoute dans les headers
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(BASE_API_URL + endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // si on reçoit une 401, c'est qu'on est pas connecté
    // ou que le token est invalide/expiré
    // on efface le token et on redirige vers la page de connexion
    if (res.status === 401) {
      clearToken();
      window.location.href = "/login";
      throw new Error("Non connecté");
    }
    // on laisse le message d'erreur pour un futur toast
    const error = await res.json();
    throw new Error(error.error || "Erreur API");
  }

  return res.json();
};

export const getApi = async (endpoint: string) => {
  const res = await fetch(BASE_API_URL + endpoint, { method: "GET" });
  return res.json();
};
