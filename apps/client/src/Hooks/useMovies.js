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

export const useScreenings = () => {
  return useQuery({
    queryKey: ["screenings"],
    queryFn: async () => {
      const response = await fetchData(`/screening`, "GET");
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
