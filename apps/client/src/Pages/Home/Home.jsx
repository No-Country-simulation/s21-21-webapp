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
        <link
          rel="preload"
          href="https://res.cloudinary.com/dxquk9fwx/image/upload/v1741289627/xipikv7wirqwyvt5j8il.webp"
          as="image"
        />
      )}
      <Navbar />
      <Hero />
      <Movies />
      <UpcomingMovies />
      <Footer />
    </>
  );
};
