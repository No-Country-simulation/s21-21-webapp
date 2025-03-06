import Footer from "../../Components/Footer";
import Hero from "../../Components/Home/Hero";
import Movies from "../../Components/Home/Movies";
import UpcomingMovies from "../../Components/Home/UpcomingMovies";
import Navbar from "../../Components/Navbar";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();
  return (
    <>
     {location.pathname === "/" && (
        <link rel="preload" href="/trampa_del_raton.webp" as="image" />
      )}
      <Navbar />
      <Hero />
      <Movies />
      <UpcomingMovies />
      <Footer />
    </>
  );
};
