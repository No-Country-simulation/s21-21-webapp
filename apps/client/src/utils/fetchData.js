export const fetchData = async (path, method, body, token) => {
  try {
    const URL = import.meta.env.VITE_BASE_URL;
    const headers = {};

    token && (headers["Authorization"] = `Bearer ${token}`);

    const options = { method, headers };

    if (body instanceof FormData) {
      options.body = body;
    } else if (body && method !== "GET") {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${URL}${path}`, options);

    if (!res) {
      throw new Error("No se recibió respuesta del servidor.");
    }

    return res;
  } catch (error) {
    console.error("Error en fetchData:", error);
    throw error;
  }
};
