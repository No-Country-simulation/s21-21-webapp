import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

// Hook para obtener todos los asientos de una sala
export const useSeats = (hallId) => {
  return useQuery({
    queryKey: ["seats", hallId],
    queryFn: async () => {
      if (!hallId) return [];
      
      const response = await fetchData(`/seats/hall/${hallId}`, "GET");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!hallId,
    onError: (error) => {
      console.error("Error fetching seats:", error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 30, // 30 minutos
  });
};

// Hook para obtener asientos disponibles para una proyección específica
export const useAvailableSeats = (screeningId) => {
  return useQuery({
    queryKey: ["availableSeats", screeningId],
    queryFn: async () => {
      if (!screeningId) return [];
      
      const response = await fetchData(`/seats/available/${screeningId}`, "GET");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!screeningId,
    onError: (error) => {
      console.error("Error fetching available seats:", error);
    },
    staleTime: 1000 * 60, // 1 minuto (los asientos disponibles pueden cambiar rápidamente)
  });
};