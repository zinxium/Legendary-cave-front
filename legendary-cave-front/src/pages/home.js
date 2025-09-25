import React, { useState, useEffect } from "react";
import { getHello } from "../services/apiService";
import {
  ChevronDown,
  Users,
  Camera,
  Heart,
  Star,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hello, setHello] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Images de démonstration - remplacez par vos vraies photos
  const heroImages = [
    "https://pin.it/6evihIOHi",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=800&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=800&fit=crop&auto=format",
  ];

  const previewImages = [
    {
      url: "https://images.unsplash.com/photo-1522202176988-b0a3e8b1a1ed?w=400&h=300&fit=crop&auto=format",
      title: "Moments d'étude",
      description: "Sessions de travail intenses et collaboration",
    },
    {
      url: "https://images.unsplash.com/photo-1523240795612-9a054b94083b?w=400&h=300&fit=crop&auto=format",
      title: "Événements spéciaux",
      description: "Célébrations et accomplissements",
    },
    {
      url: "https://pin.it/6evihIOHi",
      title: "Vie étudiante",
      description: "Détente et amitié au quotidien",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    // Appel backend
    getHello()
      .then((data) => setHello(data))
      .catch((err) => setHello("Erreur: " + err.message));
      // console.log("Hello from backend:", data);


    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [heroImages.length]);

  const stats = [
    {
      icon: Users,
      number: "35+",
      label: "Étudiants",
      color: "text-byzantium-600",
    },
    {
      icon: Camera,
      number: "100+",
      label: "Photos",
      color: "text-dogwood_rose-600",
    },
    { icon: Heart, number: "∞", label: "Souvenirs", color: "text-gold-600" },
    {
      icon: Star,
      number: "2027",
      label: "Promotion",
      color: "text-space_cadet-600",
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-timberwolf-500 via-timberwolf-400 to-timberwolf-300">
      {/* Réponse backend */}
      <div className="p-4 text-center text-lg text-space_cadet-600 font-bold">
      </div>
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
       
        {/* Background Images Carousel */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                index === currentImageIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110"
              }`}
            >
              <img
                src={img}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-space_cadet-500/90 via-byzantium-500/70 to-dogwood_rose-500/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-space_cadet-600/60 via-transparent to-space_cadet-600/60"></div>
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 text-center px-4 lg:px-6 max-w-5xl transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-12"
          }`}
        > Réponse du backend : {hello}
          {/* Main Title */}
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight">
              <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent drop-shadow-2xl">
                Legendary
              </span>
              <br />
              <span className="text-timberwolf-50 drop-shadow-2xl">Cave</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 mx-auto rounded-full mb-6"></div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-timberwolf-100 mb-4 leading-relaxed font-light">
            Notre parcours étudiant immortalisé en images
          </p>
          <p className="text-lg md:text-xl text-gold-300 mb-12 font-medium">
            Souvenirs • Amitié • Challenges
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection("galerie")}
              className="group bg-gradient-to-r from-byzantium-500 via-dogwood_rose-500 to-byzantium-600 hover:from-byzantium-600 hover:via-dogwood_rose-600 hover:to-byzantium-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-2"
            >
              <span>Explorer la Galerie</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl group-hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <stat.icon
                    className={`w-7 h-7 ${stat.color.replace("600", "400")}`}
                  />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-timberwolf-300 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
      
      {/* Preview Section */}
      <section
        id="preview"
        className="py-20 lg:py-32 bg-gradient-to-b from-timberwolf-50 to-white relative"
      >
        <div className="container mx-auto px-4 lg:px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-space_cadet-500 mb-6 leading-tight">
              Un Aperçu de Notre{" "}
              <span className="bg-gradient-to-r from-byzantium-500 via-dogwood_rose-500 to-byzantium-600 bg-clip-text text-transparent">
                Aventure
              </span>
            </h3>
            <p className="text-xl md:text-2xl text-space_cadet-400 max-w-4xl mx-auto leading-relaxed">
              Chaque photo raconte une histoire, chaque moment capture l'essence
              de notre parcours ensemble.
            </p>
          </div>

          {/* Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {previewImages.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl transform transition-all duration-500 group-hover:scale-105 bg-white">
                  {/* Image */}
                  <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-timberwolf-200 to-timberwolf-300">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-72 object-cover transition-transform duration-700 "
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h4 className="text-space_cadet-600 font-bold text-xl mb-2">
                      {item.title}
                    </h4>
                    <p className="text-space_cadet-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => scrollToSection("galerie")}
              className="group bg-gradient-to-r from-space_cadet-500 via-space_cadet-600 to-space_cadet-700 hover:from-space_cadet-600 hover:via-space_cadet-700 hover:to-space_cadet-800 text-white px-10 py-5 rounded-full text-lg lg:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3 mx-auto"
            >
              <span>Voir Toute la Galerie</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
