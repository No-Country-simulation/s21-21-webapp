import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { HeroSlider } from "../../Constants";

const Hero = () => {
  return (
    <section className="container mx-auto py-17.5">
      <div className="container mx-auto max-w-7xl px-2">
        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {HeroSlider.map((movie) => (
            <SwiperSlide key={movie.id}>
              <img
                src={movie.cover}
                alt={movie.name}
                className="object-cover rounded-xl w-full h-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
