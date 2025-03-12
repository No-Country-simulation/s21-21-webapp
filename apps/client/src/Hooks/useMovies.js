import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await fetchData("/movies", "GET");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    onError: (error) => {
      console.error("Error fetching movies:", error);
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useScreenings = (screeningId = null) => {
  return useQuery({
    queryKey: ["screenings", screeningId],
    queryFn: async () => {
      const url = screeningId ? `/screening/${screeningId}` : "/screening";
      const response = await fetchData(url, "GET");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    onError: (error) => {
      console.error("Error fetching screenings:", error);
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};