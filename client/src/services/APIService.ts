
const BASE_API_URL = /*import.meta.env.VITE_API_URL ||*/ "http://localhost:4000/api";

export const postApi = async (endpoint: string, data: any) => {
  const res = await fetch(BASE_API_URL + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erreur API");
  }

  return res.json();
};

export const getApi = async (endpoint: string) => {
  const res = await fetch(BASE_API_URL + endpoint, { method: "GET" });
  return res.json();
};
