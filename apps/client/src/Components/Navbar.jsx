import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Links } from "../Constants";
import Button from "./Button";
import { Menu, X } from "lucide-react";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const getFirstName = (fullName) => {
    if (!fullName) return "Usuario";
    const names = fullName.split(" ");
    return names[0];
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full h-14 py-2 shadow-md">
      <nav className="container mx-auto flex flex-row items-center justify-between px-2.5 lg:px-20 xl:px-36">
        <Link to="/">
          <img
            src="/Logos.webp"
            alt="Logo Cine Astas"
            width={196}
            height={40}
          />
        </Link>

        <div
          className={`md:flex md:items-center gap-x-4.5 z-50 ${
            isOpen
              ? "flex flex-col absolute top-14 left-0 right-0 bg-white p-4 shadow-md"
              : "hidden"
          }`}
        >
          <ul className="md:flex md:items-center gap-x-4.5 w-full">
            {Links.map((link) => (
              <li key={link.id} className="text-center py-1 md:p-0">
                <a
                  href={link.path}
                  className={`text-text font-medium hover:font-semibold`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}

            <li className="md:hidden mt-4 w-full">
              {!isAuthenticated ? (
                <Link
                  to="/Login"
                  id="log in"
                  name="log in"
                  className="w-full block"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full">Ingresar</Button>
                </Link>
              ) : (
                <Button
                  id="logout"
                  name="logout"
                  className="w-full block"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              )}
            </li>
          </ul>
        </div>

        <button
          className="md:hidden z-2 size-10 flex justify-center items-center"
          name="menu"
          aria-label="menu-btn"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {isOpen ? (
            <X color="#8E0B13" size={32} />
          ) : (
            <Menu color="#8E0B13" size={32} />
          )}
        </button>

        {!isAuthenticated ? (
          <Link to="/Login" className="hidden md:block">
            <Button>Ingresar</Button>
          </Link>
        ) : (
          <div className="hidden md:inline-flex items-center gap-x-4.5">
            <p>Hola, {getFirstName(user?.name)}</p>
            <Button id="logout" name="logout" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
