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
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Ha ocurrido un error");
      }
  
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await res.json();
      } else {
        return await res.text(); 
      }
  
    } catch (error) {
      console.error(error);
      throw error;
    }
  };