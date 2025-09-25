import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Target, 
  Heart, 
  Star, 
  BookOpen, 
  Lightbulb,
  Award,
  Rocket,
  Clock,
  Camera,
  Code,
  Coffee
} from 'lucide-react';

const About = () => {
  const [activeSection, setActiveSection] = useState('story');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Statistiques de la promotion
  const stats = [
    { icon: Users, number: "65", label: "Étudiants", color: "byzantium" },
    { icon: Calendar, number: "3", label: "Années d'études", color: "dogwood_rose" },
    { icon: Trophy, number: "50+", label: "Projets réalisés", color: "gold" },
    { icon: Code, number: "8", label: "Domaines d'expertise", color: "space_cadet" }
  ];

  // Timeline de la formation
  const timeline = [
    {
      year: "2022",
      title: "Début de l'aventure",
      description: "Intégration de 65 étudiants passionnés par l'informatique",
      icon: Rocket,
      color: "byzantium"
    },
    {
      year: "2023", 
      title: "Consolidation des bases",
      description: "Apprentissage des fondamentaux et premiers projets collaboratifs",
      icon: BookOpen,
      color: "dogwood_rose"
    },
    {
      year: "2024",
      title: "Spécialisation et excellence",
      description: "Choix des domaines d'expertise et projets d'envergure",
      icon: Target,
      color: "gold"
    },
    {
      year: "Futur",
      title: "Impact sur le monde",
      description: "Prêts à révolutionner le monde de la technologie",
      icon: Star,
      color: "space_cadet"
    }
  ];

  // Valeurs de la promotion
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Nous repoussons constamment les limites de la technologie",
      color: "gold"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "L'union fait la force, ensemble nous sommes plus forts",
      color: "byzantium"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Notre amour pour la technologie nous guide chaque jour",
      color: "dogwood_rose"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Nous visons toujours la qualité dans tout ce que nous faisons",
      color: "space_cadet"
    }
  ];

  // Domaines d'expertise
  const domains = [
    { name: "Intelligence Artificielle", students: 12, icon: "🤖", color: "byzantium" },
    { name: "Développement Web", students: 15, icon: "🌐", color: "dogwood_rose" },
    { name: "Cybersécurité", students: 8, icon: "🔐", color: "gold" },
    { name: "Data Science", students: 10, icon: "📊", color: "space_cadet" },
    { name: "UX/UI Design", students: 7, icon: "🎨", color: "byzantium" },
    { name: "DevOps", students: 6, icon: "⚙️", color: "dogwood_rose" },
    { name: "Mobile Dev", students: 5, icon: "📱", color: "gold" },
    { name: "IoT", students: 2, icon: "🔗", color: "space_cadet" }
  ];

  const getColorClasses = (colorName) => {
    const colorMap = {
      byzantium: 'from-byzantium-400 to-byzantium-600 border-byzantium-300 text-byzantium-600',
      dogwood_rose: 'from-dogwood_rose-400 to-dogwood_rose-600 border-dogwood_rose-300 text-dogwood_rose-600',
      gold: 'from-gold-400 to-gold-600 border-gold-300 text-gold-600',
      space_cadet: 'from-space_cadet-400 to-space_cadet-600 border-space_cadet-300 text-space_cadet-600'
    };
    return colorMap[colorName] || colorMap.byzantium;
  };

  const sections = [
    { id: 'story', label: 'Notre Histoire', icon: BookOpen },
    { id: 'values', label: 'Nos Valeurs', icon: Heart },
    { id: 'domains', label: 'Domaines', icon: Code },
    { id: 'timeline', label: 'Parcours', icon: Clock }
  ];

  return (
    <div className="min-h-screen text-white ">
      {/* Header */}
      <div className=" text-white py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
                  À Propos
                </span>
              </h1>
            </div>
            
            <p className="text-2xl text-timberwolf-100 max-w-4xl mx-auto leading-relaxed">
              L'histoire exceptionnelle d'une promotion qui a marqué son époque
            </p>

            <div className="w-32 h-1 bg-gradient-to-r from-gold-400 to-gold-300 mx-auto rounded-full mt-8"></div>
          </div>
        </div>
      </div>

      {/* Navigation des sections */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-timberwolf-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-center space-x-1 py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 text-white shadow-lg'
                    : 'text-space_cadet-600 hover:bg-timberwolf-100'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${getColorClasses(stat.color).split(' text-')[0]} text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold text-space_cadet-600 mb-2">{stat.number}</div>
                <div className="text-space_cadet-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu des sections */}
      <div className="container mx-auto px-4 lg:px-6 py-16">
        {/* Notre Histoire */}
        {activeSection === 'story' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-space_cadet-600 mb-6">Notre Histoire</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src=""
                  alt="Notre promotion"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-space_cadet-600">La Genèse de Legendary Cave</h3>
                
                <p className="text-lg text-space_cadet-500 ">
                  En septembre 2022, 65 étudiants passionnés par l'informatique se sont retrouvés pour entamer un voyage extraordinaire. 
                  Chacun avec ses rêves, ses ambitions et sa vision unique de la technologie.
                </p>
                
                <p className="text-lg text-space_cadet-500 leading-relaxed">
                  Au fil des mois, nous avons grandi ensemble, appris ensemble, et créé des liens indéfectibles. 
                  Nos différences sont devenues notre force, nos défis nos opportunités d'excellence.
                </p>
                
                <p className="text-lg text-space_cadet-500 leading-relaxed">
                  Aujourd'hui, "Legendary Cave" - se presente non pas seulement comme un projet, 
                  mais comme le témoignage vivant de notre parcours exceptionnel.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Nos Valeurs */}
        {activeSection === 'values' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-space_cadet-600 mb-6">Nos Valeurs</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-timberwolf-200 hover:shadow-2xl transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${getColorClasses(value.color).split(' text-')[0]} text-white shadow-lg mb-6`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-space_cadet-600 mb-4">{value.title}</h3>
                  <p className="text-lg text-space_cadet-500 leading-relaxed">{value.description}</p>
                  
                  <div className={`w-12 h-0.5 bg-gradient-to-r ${getColorClasses(value.color).split(' text-')[0]} rounded-full mt-4`}></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Domaines d'expertise */}
        {activeSection === 'domains' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-space_cadet-600 mb-6">Nos Domaines d'Expertise</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 mx-auto rounded-full"></div>
              <p className="text-xl text-space_cadet-400 mt-6">
                Diversité et spécialisation au service de l'innovation
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {domains.map((domain, index) => (
                <div key={index} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-timberwolf-200 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                    <div className="text-4xl mb-4">{domain.icon}</div>
                    <h3 className="text-lg font-bold text-space_cadet-600 mb-2">{domain.name}</h3>
                    <div className={`w-8 h-0.5 bg-gradient-to-r ${getColorClasses(domain.color).split(' text-')[0]} mx-auto rounded-full mb-3`}></div>
                    <p className="text-2xl font-bold text-space_cadet-500">{domain.students}</p>
                    <p className="text-sm text-space_cadet-400">étudiants</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {activeSection === 'timeline' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-space_cadet-600 mb-6">Notre Parcours</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 mx-auto rounded-full"></div>
            </div>

            <div className="relative">
              {/* Ligne verticale */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-byzantium-400 via-dogwood_rose-400 to-gold-400 rounded-full"></div>

              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start space-x-8 pb-12">
                  {/* Icône */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${getColorClasses(item.color).split(' text-')[0]} text-white shadow-lg flex items-center justify-center z-10`}>
                    <item.icon className="w-8 h-8" />
                  </div>

                  {/* Contenu */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-timberwolf-200 flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`text-2xl font-bold bg-gradient-to-r ${getColorClasses(item.color).split(' border-')[0]} bg-clip-text text-transparent`}>
                        {item.year}
                      </span>
                      <div className={`w-12 h-0.5 bg-gradient-to-r ${getColorClasses(item.color).split(' text-')[0]} rounded-full`}></div>
                    </div>
                    <h3 className="text-xl font-bold text-space_cadet-600 mb-3">{item.title}</h3>
                    <p className="text-space_cadet-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default About;