import { upcomingMoviesData } from "../../Constants";
import UpcomingMoviesCard from "./UpcomingMoviesCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";

const UpcomingMovies = () => {
  return (
    <section id="proximosEstrenos" className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Próximos Estrenos</h1>

      <div className="max-w-7xl mx-auto container">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            768: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 40,
            },
          }}
          className="upcoming-movies-swiper"
        >
          {upcomingMoviesData.map((movie) => (
            <SwiperSlide key={movie.id}>
              <UpcomingMoviesCard
                cover={movie.cover}
                title={movie.title}
                releaseDate={movie.releaseDate}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UpcomingMovies;
