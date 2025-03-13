import { useEffect, useState } from "react";
import { useMovies, useScreenings } from "../../Hooks/useMovies";
import MovieCard from "./MovieCard";

const Movies = () => {
  const movies = useMovies();
  const screenings = useScreenings(); // No se pasa ningún screeningId
  const [moviesWithTimes, setMoviesWithTimes] = useState([]);

  useEffect(() => {
    if (movies.data && screenings.data) {
      // Procesar las películas y sus horarios
      const processedMovies = movies.data.map((movie) => {
        // Filtrar las funciones para esta película
        const movieScreenings = screenings.data.filter(
          (screening) => screening.movieId === movie.id
        );

        // Obtener la fecha actual para filtrar solo horarios futuros
        const now = new Date();

        // Filtrar solo horarios futuros y formatearlos
        const formattedTimes = movieScreenings
          .filter((screening) => {
            const screeningDate = new Date(screening.schedule);
            return screeningDate > now;
          })
          .map((screening) => {
            const screeningDate = new Date(screening.schedule);
            return screeningDate.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          })
          // Ordenar los horarios
          .sort();

        // Devolver la película con sus horarios formateados
        return {
          ...movie,
          formattedTimes,
        };
      });

      setMoviesWithTimes(processedMovies);
    }
  }, [movies.data, screenings.data]);

  if (movies.isLoading || screenings.isLoading) return <p>Loading...</p>;
  if (movies.isError) return <p>Error: {movies.error.message}</p>;
  if (screenings.isError) return <p>Error al cargar los horarios</p>;

  if (!Array.isArray(movies.data)) {
    return <p>No se encontraron películas.</p>;
  }

  const movieRatingsMap = {
    G: "A", // Apta para todo público
    PG: "A", // Apta para todo público (con supervisión)
    "PG-13": "B", // Mayores de 13 años
    R: "C", // Mayores de 17 años
    "NC-17": "D", // Solo adultos
  };

  return (
    <section id="Cartelera" className="container mx-auto px-2">
      <h1 className="text-center">Películas en Cartelera</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-3 sm:gap-6 py-3 md:py-5 lg:px-20 lg:py-14">
        {moviesWithTimes.map((movie) => (
          <MovieCard
            key={movie.id}
            cover={movie.imageUrl}
            title={movie.title}
            releaseDate={
              new Date(movie.releaseDate).toLocaleDateString("es-ES") ||
              "Sin fecha"
            }
            duration={movie.duration}
            genre={movie.genre}
            rating={movieRatingsMap[movie.classification]}
            format={movie.format || "2D"}
            // time={movie.formattedTimes}
          />
        ))}
      </div>
    </section>
  );
};

export default Movies;