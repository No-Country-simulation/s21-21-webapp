/* eslint-disable react/prop-types */
import { CalendarRange, Clock, Film } from "lucide-react";
import Button from "../Button";
import { Link } from "react-router-dom";

const MovieCard = ({
  cover,
  title,
  releaseDate,
  duration,
  genre,
  rating,
  format,
  schedules,
}) => {
  return (
    <Link to={`/movie/${encodeURIComponent(title)}`}>
      <div className="w-full md:w-[340px] max-w-85 px-3 py-3 sm:px-5 sm:py-4.5 bg-florar-white rounded-lg movie-card shadow-card flex flex-col">
        <img
          src={cover}
          alt={title}
          width={300}
          height={400}
          className="object-cover rounded-lg w-full h-[260px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
        />
        <div className="flex flex-col gap-y-1.5 sm:gap-y-2 py-2 flex-grow">
          <h2 className="uppercase font-bold text-sm sm:text-base">{title}</h2>
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm">
            <div className="flex flex-row items-center gap-x-1">
              <CalendarRange
                color="#8E0B13"
                className="icon h-4 w-4 sm:h-5 sm:w-5"
              />
              <span>{releaseDate}</span>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <Clock color="#8E0B13" className="icon h-4 w-4 sm:h-5 sm:w-5" />
              <span>{duration} min</span>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <Film color="#8E0B13" className="icon h-4 w-4 sm:h-5 sm:w-5" />
              <span>{genre}</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-1 text-xs sm:text-sm">
            <span className="font-semibold">Clasificación:</span>
            <span className="badge text-xs">{rating}</span>
          </div>
          <div className="flex flex-row items-center gap-x-1 text-xs sm:text-sm flex-wrap">
            <span className="font-semibold">Formato:</span>
            {Array.isArray(format) ? (
              format.map((f, index) => (
                <span key={index} className="badge text-xs">
                  {f}
                </span>
              ))
            ) : (
              <span className="badge text-xs">{format}</span>
            )}
          </div>
          {/* <div className="flex flex-row items-center gap-1 flex-wrap text-xs sm:text-sm">
            <span className="font-semibold">Horarios:</span>
            <span className="badge text-xs">{schedules || "Sin horarios"}</span>
          </div> */}
        </div>
        <Button className="mt-auto text-sm sm:text-base py-1.5 sm:py-2 w-full">
          Ver detalles
        </Button>
      </div>
    </Link>
  );
};

export default MovieCard;
