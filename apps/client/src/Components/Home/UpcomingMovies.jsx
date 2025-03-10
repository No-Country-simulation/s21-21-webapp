import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { upcomingMoviesData } from "../../Constants";
import UpcomingMoviesCard from "./UpcomingMoviesCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; 
const UpcomingMovies = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="proximosEstrenos" className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Próximos Estrenos</h1>

      <div className="max-w-7xl mx-auto container relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {upcomingMoviesData.map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 px-2 w-[92%] sm:w-[45%] lg:w-[32%] xl:w-[25%]"
              >
                <UpcomingMoviesCard
                  cover={movie.cover}
                  title={movie.title}
                  releaseDate={movie.releaseDate}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute cursor-pointer top-1/2 left-2 transform -translate-y-1/2 bg-btn-primary/60 p-2 rounded-full"
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          aria-label="Previous"
        >
          <ChevronLeft className="text-white/70 size-6" />
        </button>

        <button
          className="absolute cursor-pointer top-1/2 right-2 transform -translate-y-1/2 bg-btn-primary/60 p-2 rounded-full"
          onClick={() => emblaApi && emblaApi.scrollNext()}
          aria-label="Next"
        >
          <ChevronRight className="text-white/70 size-6" />
        </button>
      </div>
    </section>
  );
};

export default UpcomingMovies;
