import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Film, Tickets, Video } from "lucide-react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { useMovies, useScreenings } from "../../Hooks/useMovies";

const MovieDetails = () => {
  const { title: encodedTitle } = useParams();
  const navigate = useNavigate();
  const title = decodeURIComponent(encodedTitle);
  const { data: moviesData, isLoading, isError, error } = useMovies();
  const [movie, setMovie] = useState(null);
  const {
    data: screeningsData,
    isLoading: screeningsLoading,
    isError: screeningsError,
  } = useScreenings();

  const [fechasUnicas, setFechasUnicas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [screenings, setScreenings] = useState([]);

  useEffect(() => {
    if (moviesData) {
      const foundMovie = moviesData.find((m) => m.title === title);
      setMovie(foundMovie);
    }
  }, [moviesData, title]);

  useEffect(() => {
    if (movie && movie.id && screeningsData) {
      const funcionesPelicula = screeningsData.filter(
        (funcion) => funcion.movieId === movie.id
      );

      const fechasPorDia = {};
      const hoy = new Date();
      // Establecer la hora a 00:00:00 para comparar solo fechas
      hoy.setHours(0, 0, 0, 0);

      funcionesPelicula.forEach((funcion) => {
        const fecha = new Date(funcion.schedule);
        const fechaSinHora = new Date(fecha);
        fechaSinHora.setHours(0, 0, 0, 0);

        // Solo procesar fechas actuales o futuras
        if (fechaSinHora >= hoy) {
          const fechaKey = fecha.toISOString().split("T")[0]; // YYYY-MM-DD

          if (!fechasPorDia[fechaKey]) {
            // día de la semana
            const dayOfWeek = fecha.toLocaleDateString("es-ES", {
              weekday: "long",
            });
            const dayOfWeekCapitalized =
              dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

            // número del día
            const dayNumber = fecha.getDate();

            // mes
            const month = fecha.toLocaleDateString("es-ES", {
              month: "long",
            });
            const monthCapitalized =
              month.charAt(0).toUpperCase() + month.slice(1);

            fechasPorDia[fechaKey] = {
              key: fechaKey,
              dayOfWeek: dayOfWeekCapitalized,
              dayNumber,
              month: monthCapitalized,
              horarios: [],
              fecha: fecha, // Guardar la fecha completa para ordenar
            };
          }

          // Agregar el horario a esta fecha
          const time = fecha.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          fechasPorDia[fechaKey].horarios.push({
            id: funcion.id,
            time,
            fechaCompleta: fecha, // Guardar la fecha completa para ordenar horarios
          });
        }
      });

      // Ordenar horarios por hora para cada fecha
      Object.values(fechasPorDia).forEach((fecha) => {
        fecha.horarios.sort((a, b) => a.fechaCompleta - b.fechaCompleta);
      });

      // Convertir el objeto a un array y ordenar por fecha
      const fechasArray = Object.values(fechasPorDia).sort(
        (a, b) => a.fecha - b.fecha
      );

      setFechasUnicas(fechasArray);

      // Buscar la fecha actual o la más cercana en el futuro
      const fechaHoy = new Date().toISOString().split("T")[0];
      const fechaActualIndex = fechasArray.findIndex((f) => f.key === fechaHoy);

      if (fechasArray.length > 0) {
        // Si encontramos la fecha actual, seleccionarla
        if (fechaActualIndex >= 0) {
          setFechaSeleccionada(fechasArray[fechaActualIndex].key);
          setScreenings(fechasArray[fechaActualIndex].horarios);
        } else {
          // Si no hay fecha actual, seleccionar la primera fecha disponible (que será la más cercana en el futuro)
          setFechaSeleccionada(fechasArray[0].key);
          setScreenings(fechasArray[0].horarios);
        }
      } else {
        // No hay fechas disponibles
        setFechaSeleccionada(null);
        setScreenings([]);
      }
    }
  }, [movie, screeningsData]);

  // const handleFechaClick = (fechaKey) => {
  //   setFechaSeleccionada(fechaKey);
  //   const fechaSeleccionadaObj = fechasUnicas.find(
  //     (fecha) => fecha.key === fechaKey
  //   );
  //   if (fechaSeleccionadaObj) {
  //     setScreenings(fechaSeleccionadaObj.horarios);
  //   }
  // };
  const handleHorarioClick = (screeningId) => {
    navigate(`/sitSelector/${screeningId}`);
  };

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

  const movieRatingsMap = {
    G: "A", // Apta para todo público
    PG: "A", // Apta para todo público (con supervisión)
    "PG-13": "B", // Mayores de 13 años
    R: "C", // Mayores de 17 años
    "NC-17": "D", // Solo adultos
  };

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
              {movieRatingsMap[movie.classification] || "Sin clasificación"}
            </p>
            <p>
              <strong>Formato:</strong> {movie.format.join(", ") || "2D"}
            </p>
            <p>
              <strong>Fecha de estreno:</strong>{" "}
              {new Date(movie.releaseDate).toLocaleDateString("es-ES") ||
                "Sin fecha de estreno"}
            </p>
            <p className="max-w-2xl">{movie.description}</p>
          </div>
        </div>

        {screeningsLoading ? (
          <p className="p-4 bg-gray-200 rounded-md text-center text-gray-700">
            Cargando horarios...
          </p>
        ) : screeningsError ? (
          <p className="p-4 bg-red-200 rounded-md text-center text-red-700">
            Error al cargar horarios
          </p>
        ) : (
          <div className="mt-8">
            <div className="flex flex-row gap-x-4 items-center mb-4">
              <Tickets size={40} strokeWidth={1.5} />
              <h1 className="text-3xl">Horarios Disponibles</h1>
            </div>
            {fechasUnicas.length === 0 ? (
              <p className="p-4 bg-gray-200 rounded-md text-center text-gray-700">
                No hay funciones disponibles para esta película
              </p>
            ) : (
            <>
              <div className="flex overflow-x-auto gap-4 pb-4 mb-4">
                {fechasUnicas.map((fecha) => (
                  <button
                    key={fecha.key}
                    onClick={() => handleHorarioClick(fecha.key)}
                    className={`flex-shrink-0 border-2 ${
                      fechaSeleccionada === fecha.key
                        ? "border-black"
                        : "border-gray-300"
                    } rounded-lg p-3 w-28 text-center cursor-pointer`}
                  >
                    <div className="font-medium">{fecha.dayOfWeek}</div>
                    <div className="text-3xl font-bold">{fecha.dayNumber}</div>
                    <div className="font-medium">{fecha.month}</div>
                  </button>
                ))}
              </div>

             <div className="bg-gray-200 p-4 rounded-md">
                {screenings.length === 0 ? (
                  <p className="text-center text-gray-700">
                    No hay horarios disponibles para esta fecha
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {screenings.map((horario) => (
                      <div
                        key={horario.id}
                        onClick={() => handleHorarioClick(horario.id)}
                        className="inline-block border border-gray-400 rounded px-4 py-2 bg-white cursor-pointer"
                      >
                        {horario.time}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              </>
            )}
          </div>
        )}

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
