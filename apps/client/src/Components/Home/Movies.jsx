import { moviesData } from "../../Constants";
import MovieCard from "./MovieCard";

const Movies = () => {
  return (
    <section id="Cartelera" className="container mx-auto px-2">
      <h1 className="text-center">Películas en Cartelera</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-3 sm:gap-6 py-3 md:py-5 lg:px-20 lg:py-14">
        {moviesData.map((movie) => (
          <MovieCard
            key={movie.id}
            cover={movie.cover}
            title={movie.title}
            releaseDate={movie.releaseDate}
            duration={movie.duration}
            genre={movie.genre}
            rating={movie.rating}
            format={movie.formats}
            time={movie.schedules}
          />
        ))}
      </div>
    </section>
  );
};

export default Movies;
