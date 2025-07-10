const STORAGE_TOKEN_KEY = "token";

export const saveToken = (token: string) => {
  localStorage.setItem(STORAGE_TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  if (isTokenValid() === false) {
    clearToken();
    return null;
  }
  return localStorage.getItem(STORAGE_TOKEN_KEY);
};

export const clearToken = () => {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
};

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY);
  if (!token) return false;
  try {
    const payload = atob(token.split(".")[1]);
    const { exp } = JSON.parse(payload);
    return Date.now() < exp * 1000; // Convert exp to milliseconds
  } catch (error) {
    console.error("Invalid token format", error);
    return false;
  }
};

export const getTokenData = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = atob(token.split(".")[1]);
    return JSON.parse(payload);
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
};
