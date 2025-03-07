import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Film, Video } from "lucide-react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { useMovies } from "../../Hooks/useMovies"; // Importa el hook useMovies

const MovieDetails = () => {
  const { title: encodedTitle } = useParams();
  const title = decodeURIComponent(encodedTitle);
  const { data: moviesData, isLoading, isError, error } = useMovies();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (moviesData) {
      const foundMovie = moviesData.find((m) => m.title === title);
      setMovie(foundMovie);
    }
  }, [moviesData, title]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!movie) return <p>Película no encontrada</p>;

  const getYouTubeVideoId = (url) => {
    const videoUrl = new URL(url);
    const videoId = videoUrl.searchParams.get("v");
    if (videoId) {
      return videoId;
    }
    const embedPath = videoUrl.pathname.split("/");
    return embedPath[embedPath.length - 1];
  };

  const videoId = getYouTubeVideoId(movie.trailerUrl);

  return (
    <>
      <Navbar />
      <section className="container mx-auto py-10 px-2 max-w-4xl">
        <div className="flex flex-row gap-x-4 items-center mb-4">
          <Film size={40} strokeWidth={1.5} />
          <h1 className="text-3xl">{movie.title}</h1>
        </div>
        <div className="flex flex-col md:flex-row md:items-start gap-3">
          <div className="relative md:col-span-3 mx-auto md:mx-0">
            <div className="w-[230px] xs:w-[300px] max-h-auto overflow-hidden rounded-xl shadow-xl">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="object-center w-full h-auto rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 xs:gap-4 md:col-span-9 mt-3 xs:mt-0">
            <p>
              <strong>Género:</strong> {movie.genre}
            </p>
            <p>
              <strong>Clasificación:</strong>{" "}
              {movie.clasificacion || "Sin clasificacion"}
            </p>
            <p>
              <strong>Formato:</strong> {movie.format || "2D"}
            </p>
            <p>
              <strong>Fecha de estreno:</strong>{" "}
              {movie.releaseDate || "Sin fecha de estreno"}
            </p>
            <p className="max-w-2xl">{movie.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-x-4 items-center my-4">
            <Video size={40} strokeWidth={1.5} />
            <h1 className="text-3xl">Trailer</h1>
          </div>
          <div className="max-w-[640px]">
            {videoId && (
              <lite-youtube
                videoid={videoId}
                videotitle={movie.title}
              ></lite-youtube>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MovieDetails;
