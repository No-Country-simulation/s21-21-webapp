import { useMovies } from "../../Hooks/useMovies";
import MovieCard from "./MovieCard";

const Movies = () => {
  const movies = useMovies();
  if (movies.isLoading) return <p>Loading...</p>;
  if (movies.isError) return <p>Error: {movies.error.message}</p>;

  return (
    <section id="Cartelera" className="container mx-auto px-2">
      <h1 className="text-center">Películas en Cartelera</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-3 sm:gap-6 py-3 md:py-5 lg:px-20 lg:py-14">
        {movies.data &&
          movies.data.map((movie) => (
            <MovieCard
              key={movie.id}
              cover={movie.imageUrl}
              title={movie.title}
              releaseDate={movie.releaseDate || "Sin fecha"}
              duration={movie.duration}
              genre={movie.genre}
              rating={movie.rating || "B"}
              format={movie.formats || "2D"}
              time={movie.schedules}
            />
          ))}
      </div>
    </section>
  );
};

export default Movies;
