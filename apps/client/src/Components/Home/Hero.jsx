import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import { HeroSlider } from "../../Constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isClient, setIsClient] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateControls = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateControls);
    updateControls();
  }, [emblaApi, updateControls]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="container mx-auto pt-4 md:pt-17.5 pb-5 md:pb-16">
      <div className="container mx-auto max-w-7xl px-2 relative">
        {isClient && (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {HeroSlider.map((movie) => (
                  <div key={movie.id} className="flex-shrink-0 w-full">
                    <img
                      src={movie.cover}
                      alt={movie.movie}
                      width={410}
                      height={129}
                      className="object-cover rounded-xl w-full h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`absolute cursor-pointer left-5 top-1/2 transform -translate-y-1/2 bg-btn-primary/60 p-2 rounded-full ${
                canScrollPrev ? "opacity-100" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous"
            >
              <ChevronLeft className="text-white/70 size-6" />
            </button>
            <button
              className={`absolute cursor-pointer right-5 top-1/2 transform -translate-y-1/2 bg-btn-primary/60 p-2 rounded-full ${
                canScrollNext ? "opacity-100" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => emblaApi && emblaApi.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next"
            >
              <ChevronRight className="text-white/70 size-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {HeroSlider.map((_, index) => (
                <div
                  key={index}
                  className={`size-2 lg:size-4 rounded-full transition-colors cursor-pointer ${
                    selectedIndex === index ? "bg-btn-primary" : "bg-white/50"
                  }`}
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
