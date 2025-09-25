import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid3X3, List, ChevronLeft, User, Code, Heart, Star } from 'lucide-react';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [filteredStudents, setFilteredStudents] = useState([]);
  
  // Données d'exemple des étudiants - remplacez par vos vraies données
  const students = [
    {
      id: 1,
      firstName: "Marie",
      lastName: "Dubois",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b407?w=300&h=300&fit=crop&auto=format",
      domain: "Intelligence Artificielle",
      description: "Passionnée par le machine learning et l'innovation technologique",
      color: "byzantium"
    },
    {
      id: 2,
      firstName: "Jean",
      lastName: "Martin",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
      domain: "Développement Web",
      description: "Créateur d'expériences numériques modernes et intuitives",
      color: "dogwood_rose"
    },
    {
      id: 3,
      firstName: "Sophie",
      lastName: "Bernard",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format",
      domain: "Cybersécurité",
      description: "Gardienne du monde numérique, experte en protection des données",
      color: "gold"
    },
    {
      id: 4,
      firstName: "Pierre",
      lastName: "Leroy",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
      domain: "Data Science",
      description: "Transforme les données en insights précieux pour l'entreprise",
      color: "space_cadet"
    },
    {
      id: 5,
      firstName: "Emma",
      lastName: "Garcia",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&auto=format",
      domain: "UX/UI Design",
      description: "Designer d'interfaces qui allient beauté et fonctionnalité",
      color: "byzantium"
    },
    {
      id: 6,
      firstName: "Lucas",
      lastName: "Moreau",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format",
      domain: "DevOps",
      description: "Architecte des infrastructures cloud et automatisation",
      color: "dogwood_rose"
    },
    // Ajoutez ici les 59 autres étudiants...
    // Pour la démo, je vais en ajouter quelques-uns de plus
    {
      id: 7,
      firstName: "Amélie",
      lastName: "Rousseau",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&auto=format",
      domain: "Intelligence Artificielle",
      description: "Exploratrice des algorithmes d'apprentissage automatique",
      color: "gold"
    },
    {
      id: 8,
      firstName: "Thomas",
      lastName: "Laurent",
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&auto=format",
      domain: "Développement Mobile",
      description: "Créateur d'applications mobiles innovantes et performantes",
      color: "space_cadet"
    }
  ];

  // Domaines disponibles pour le filtrage
  const domains = [
    'all',
    'Intelligence Artificielle',
    'Développement Web',
    'Cybersécurité',
    'Data Science',
    'UX/UI Design',
    'DevOps',
    'Développement Mobile'
  ];

  // Filtrage des étudiants
  useEffect(() => {
    let filtered = students.filter(student => {
      const matchesSearch = `${student.firstName} ${student.lastName}`.toLowerCase()
        .includes(searchTerm.toLowerCase()) || 
        student.domain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDomain = selectedDomain === 'all' || student.domain === selectedDomain;
      return matchesSearch && matchesDomain;
    });
    setFilteredStudents(filtered);
  }, [searchTerm, selectedDomain]);

  const getColorClasses = (colorName) => {
    const colorMap = {
      byzantium: 'from-byzantium-400 to-byzantium-600 border-byzantium-300',
      dogwood_rose: 'from-dogwood_rose-400 to-dogwood_rose-600 border-dogwood_rose-300',
      gold: 'from-gold-400 to-gold-600 border-gold-300',
      space_cadet: 'from-space_cadet-400 to-space_cadet-600 border-space_cadet-300',
      timberwolf: 'from-timberwolf-400 to-timberwolf-600 border-timberwolf-300'
    };
    return colorMap[colorName] || colorMap.byzantium;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-timberwolf-100 via-timberwolf-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-space_cadet-600 via-space_cadet-500 to-space_cadet-600 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
                Galerie
              </span>
              {' '}des Étudiants
            </h1>
            
            <p className="text-xl text-timberwolf-200 max-w-3xl mx-auto leading-relaxed">
              Découvrez les talents de notre promotion 2027 - 65 futurs experts en informatique
            </p>
            
            <div className="w-24 h-1 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 mx-auto rounded-full mt-6"></div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-timberwolf-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space_cadet-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un étudiant ou domaine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-timberwolf-300 rounded-full bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-byzantium-400 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filtres */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space_cadet-400 w-5 h-5" />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-timberwolf-300 rounded-full bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-byzantium-400 focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="all">Tous les domaines</option>
                  {domains.slice(1).map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>

              {/* Mode d'affichage */}
              <div className="flex items-center bg-timberwolf-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-byzantium-600' 
                      : 'text-space_cadet-400 hover:text-byzantium-600'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-byzantium-600' 
                      : 'text-space_cadet-400 hover:text-byzantium-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Compteur de résultats */}
          <div className="mt-4 text-center">
            <span className="text-space_cadet-600 font-medium">
              {filteredStudents.length} étudiant{filteredStudents.length > 1 ? 's' : ''} 
              {searchTerm && ` trouvé${filteredStudents.length > 1 ? 's' : ''} pour "${searchTerm}"`}
            </span>
          </div>
        </div>
      </div>

      {/* Galerie */}
      <div className="container mx-auto px-4 lg:px-6 py-12">
        {viewMode === 'grid' ? (
          // Vue grille - Style Polaroid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Cadre Polaroid */}
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 border border-timberwolf-200 transform hover:rotate-1 group-hover:rotate-0">
                  {/* Photo */}
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={student.photo}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Overlay avec domaine */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getColorClasses(student.color)} shadow-lg`}>
                      <Code className="w-3 h-3 inline mr-1" />
                      {student.domain.length > 15 ? student.domain.substring(0, 15) + '...' : student.domain}
                    </div>

                    {/* Badge index */}
                    <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-space_cadet-600 font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Informations */}
                  <div className="space-y-3">
                    {/* Nom */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-space_cadet-600 mb-1">
                        {student.firstName} {student.lastName}
                      </h3>
                      <div className={`w-12 h-0.5 bg-gradient-to-r ${getColorClasses(student.color)} mx-auto rounded-full`}></div>
                    </div>

                    {/* Domaine */}
                    <div className="text-center">
                      <p className={`text-sm font-semibold bg-gradient-to-r ${getColorClasses(student.color)} bg-clip-text text-transparent`}>
                        {student.domain}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="text-center">
                      <p className="text-space_cadet-400 text-sm leading-relaxed italic">
                        "{student.description}"
                      </p>
                    </div>

                    {/* Icônes décoratifs */}
                    <div className="flex justify-center space-x-2 pt-2">
                      <Star className={`w-4 h-4 text-${student.color}-400`} />
                      <Heart className="w-4 h-4 text-dogwood_rose-400" />
                      <Star className={`w-4 h-4 text-${student.color}-400`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Vue liste
          <div className="space-y-4">
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-timberwolf-200"
              >
                <div className="flex items-center space-x-6">
                  {/* Photo miniature */}
                  <div className="relative">
                    <img
                      src={student.photo}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="w-20 h-20 rounded-xl object-cover shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-space_cadet-600 font-bold text-xs shadow-lg border-2 border-timberwolf-100">
                      {index + 1}
                    </div>
                  </div>

                  {/* Informations */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-space_cadet-600 mb-1">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className={`text-lg font-semibold bg-gradient-to-r ${getColorClasses(student.color)} bg-clip-text text-transparent mb-2`}>
                          {student.domain}
                        </p>
                        <p className="text-space_cadet-400 italic">
                          "{student.description}"
                        </p>
                      </div>
                      
                      <div className="mt-4 lg:mt-0">
                        <div className={`px-4 py-2 rounded-full text-white bg-gradient-to-r ${getColorClasses(student.color)} shadow-lg`}>
                          <User className="w-4 h-4 inline mr-2" />
                          Étudiant
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Message si aucun résultat */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-20">
            <User className="w-16 h-16 text-timberwolf-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-space_cadet-500 mb-4">Aucun étudiant trouvé</h3>
            <p className="text-space_cadet-400 mb-8">
              Essayez de modifier vos critères de recherche ou de filtrage
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDomain('all');
              }}
              className="bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Footer de la galerie */}
      {/* <div className="bg-gradient-to-r from-space_cadet-600 to-space_cadet-500 text-white ">
        <div className="container lg:px-6 text-center">
          
          <div className="mt-6 flex justify-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400">{students.length}</div>
              <div className="text-timberwolf-300 text-sm">Étudiants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400">{domains.length - 1}</div>
              <div className="text-timberwolf-300 text-sm">Domaines</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400">∞</div>
              <div className="text-timberwolf-300 text-sm">Possibilités</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Gallery;