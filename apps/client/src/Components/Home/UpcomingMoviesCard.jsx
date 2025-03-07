/* eslint-disable react/prop-types */
import { CalendarRange } from "lucide-react";

const UpcomingMoviesCard = ({ cover, title, releaseDate }) => {
  return (
    <div className="bg-florar-white rounded-lg shadow-card p-3 sm:p-4 w-[300px] h-[500px] flex flex-col m-1">
      <div className="flex flex-col flex-grow items-center justify-center h-full">
        <div className="relative w-full mb-3">
          <img
            src={cover}
            alt={title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>
        <h2 className="font-bold text-sm sm:text-base uppercase">{title}</h2>

        <div className="flex items-center gap-1 mt-auto">
          <CalendarRange className="h-4 w-4 text-[#8E0B13]" />
          <span className="text-sm">{releaseDate}</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMoviesCard;
