import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await fetchData("/movies", "GET");
      return response;
    },
    onError: (error) => {
      console.error("Error fetching movies:", error);
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
