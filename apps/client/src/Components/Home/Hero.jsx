import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { HeroSlider } from "../../Constants";

const Hero = () => {
  const firstImage = HeroSlider[0];
  return (
    <section className="container mx-auto pt-4 md:pt-17.5 pb-5 md:pb-16">
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
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {HeroSlider.map((movie) => (
            <SwiperSlide key={movie.id}>
              <img
                src={movie.cover}
                alt={movie.movie}
                width={410}
                height={129}
                className="object-cover rounded-xl w-full h-auto"
                loading={movie.id === firstImage.id ? undefined : "lazy"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
