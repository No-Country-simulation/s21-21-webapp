import Footer from "../../Components/Footer";
import Hero from "../../Components/Home/Hero";
import Movies from "../../Components/Home/Movies";
import UpcomingMovies from "../../Components/Home/UpcomingMovies";
import Navbar from "../../Components/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Movies />
      <UpcomingMovies />
      <Footer />
    </>
  );
};
