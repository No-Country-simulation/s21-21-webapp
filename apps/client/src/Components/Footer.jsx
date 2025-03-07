import { Link } from "react-router-dom";
import { Links } from "../Constants";
import { instagram, twitter } from "../assets";

const Footer = () => {
  return (
    <footer className="w-full shadow-footer">
      <div className="py-10 flex flex-col items-center justify-center gap-y-4">
        <div className="flex flex-col md:flex-row w-full items-center justify-between space-x-10 px-2.5 lg:px-20 xl:px-36">
          <Link to="/">
            <img
              src="/Logos.webp"
              alt="Logo Cine Astas"
              width={196}
              height={40}
            />
          </Link>

          <ul className="md:flex md:items-center gap-x-4.5 mx-auto">
            {Links.map((link) => (
              <li key={link.id} className="text-center py-1 md:p-0">
                <a
                  href={link.path}
                  className={`text-text font-medium hover:font-semibold`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-row items-center gap-x-4">
            <img
              src={twitter}
              alt="Twiiter logo"
              width={36}
              height={36}
              className="size-9"
            />
            <img
              src={instagram}
              alt="Instagram logo"
              width={36}
              height={36}
              className="size-9"
            />
          </div>
        </div>
        <span className="text-sm">
          Casi todos los derechos reservados &copy; 2025
        </span>
      </div>
    </footer>
  );
};

export default Footer;
