import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full z-50 bg-space_cadet-500/95 backdrop-blur-md shadow-lg border-b border-space_cadet-400/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-byzantium-900 via-dogwood_rose-500 to-byzantium-900 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="logo" />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-white">
              Legendary <span className="text-gold-400">Cave</span>
            </h1>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-timberwolf-200 hover:text-gold-400 transition-colors duration-300 font-medium relative group"
            >
              Accueil
              <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link
              to="/galerie"
              className="text-timberwolf-200 hover:text-gold-400 transition-colors duration-300 font-medium relative group"
            >
              Galerie
              <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link
              to="/about"
              className="text-timberwolf-200 hover:text-gold-400 transition-colors duration-300 font-medium relative group"
            >
              À propos
              <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link
              to="/contact"
              className="text-timberwolf-200 hover:text-gold-400 transition-colors duration-300 font-medium relative group"
            >
              Contact
              <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </nav>

          {/* Menu Mobile */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-space_cadet-600 border-t border-space_cadet-400">
            <div className="px-4 py-3 space-y-2">
              {["Accueil", "Galerie", "À propos", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(
                      item.toLowerCase().replace("à propos", "about")
                    )
                  }
                  className="block w-full text-left text-timberwolf-200 hover:text-gold-400 py-2 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
