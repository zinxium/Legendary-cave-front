import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  Calendar,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Globe,
  Heart,
  Star,
  Camera,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Types de contact
  const contactTypes = [
    { value: 'general', label: 'Question générale', icon: MessageSquare },
    { value: 'collaboration', label: 'Proposition de collaboration', icon: Users },
    { value: 'press', label: 'Demande presse/média', icon: Camera },
    { value: 'alumni', label: 'Contact ancien étudiant', icon: Star },
    { value: 'other', label: 'Autre', icon: Mail }
  ];

  // Informations de contact
  const contactInfo = [
    {
      icon: Mail,
      title: "Email principal",
      info: "contact@legendary-cave.com",
      description: "Pour toutes vos questions",
      color: "byzantium"
    },
    
  ];



  // FAQ
  const faq = [
    {
      question: "Puis-je obtenir une copie des photos de la promotion ?",
      answer: "Oui ! Contactez-nous via le formulaire en spécifiant votre demande. Nous vous enverrons les liens de téléchargement."
    },
    {
      question: "Comment puis-je contribuer au projet Legendary Cave ?",
      answer: "Nous sommes toujours ouverts aux contributions ! Envoyez-nous vos idées via le formulaire de collaboration."
    },
    {
      question: "Organisez-vous des événements de retrouvailles ?",
      answer: "Absolument ! Suivez-nous sur nos réseaux sociaux pour être informé des prochains événements."
    },
    {
      question: "Puis-je utiliser vos photos pour un article/projet ?",
      answer: "Pour toute utilisation des photos, merci de nous contacter via la catégorie 'Demande presse/média'."
    }
  ];

  const getColorClasses = (colorName) => {
    const colorMap = {
      byzantium: 'from-byzantium-400 to-byzantium-600 text-byzantium-600 border-byzantium-300',
      dogwood_rose: 'from-dogwood_rose-400 to-dogwood_rose-600 text-dogwood_rose-600 border-dogwood_rose-300',
      gold: 'from-gold-400 to-gold-600 text-gold-600 border-gold-300',
      space_cadet: 'from-space_cadet-400 to-space_cadet-600 text-space_cadet-600 border-space_cadet-300'
    };
    return colorMap[colorName] || colorMap.byzantium;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulation d'envoi (remplacez par votre logique d'envoi réelle)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation délai
      
      // Ici vous ajouteriez votre logique d'envoi (API, EmailJS, etc.)
      console.log('Form data:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-timberwolf-50 via-white to-timberwolf-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-space_cadet-600 via-byzantium-600 to-dogwood_rose-600 text-white py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           
            <div className="flex items-center justify-center space-x-4 mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
                  Contact
                </span>
              </h1>
            </div>
            
            <p className="text-2xl text-timberwolf-100 max-w-4xl mx-auto leading-relaxed">
              Restons connectés ! Nous serions ravis d'avoir de vos nouvelles
            </p>

            <div className="w-32 h-1 bg-gradient-to-r from-gold-400 to-gold-300 mx-auto rounded-full mt-8"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-timberwolf-200 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-space_cadet-600 mb-4">Envoyez-nous un message</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 mx-auto rounded-full"></div>
              </div>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-green-800 font-semibold">Message envoyé avec succès !</p>
                    <p className="text-green-600 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="text-red-800 font-semibold">Erreur lors de l'envoi</p>
                    <p className="text-red-600 text-sm">Veuillez réessayer ou nous contacter directement.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type de contact */}
                <div>
                  <label className="block text-sm font-semibold text-space_cadet-600 mb-3">Type de demande</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contactTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.type === type.value
                            ? 'border-byzantium-400 bg-byzantium-50 text-byzantium-700'
                            : 'border-timberwolf-200 bg-white hover:border-byzantium-200 text-space_cadet-600'
                        }`}
                      >
                        <type.icon className="w-5 h-5" />
                        <span className="font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nom et Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-space_cadet-600 mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space_cadet-400 w-5 h-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-timberwolf-300 rounded-xl bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-byzantium-400 focus:border-transparent transition-all duration-300"
                        placeholder="Votre nom et prénom"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-space_cadet-600 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space_cadet-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-timberwolf-300 rounded-xl bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-byzantium-400 focus:border-transparent transition-all duration-300"
                        placeholder="votre.email@exemple.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-space_cadet-600 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-timberwolf-300 rounded-xl bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-byzantium-400 focus:border-transparent transition-all duration-300"
                    placeholder="Résumé de votre demande"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-space_cadet-600 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-space_cadet-400 w-5 h-5" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-timberwolf-300 rounded-xl bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-byzantium-400 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Détaillez votre demande..."
                    />
                  </div>
                </div>

                {/* Bouton d'envoi */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-byzantium-500 via-dogwood_rose-500 to-byzantium-600 hover:from-byzantium-600 hover:via-dogwood_rose-600 hover:to-byzantium-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar avec informations */}
          <div className="space-y-8">
            {/* Informations de contact */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-timberwolf-200 p-8">
              <h3 className="text-2xl font-bold text-space_cadet-600 mb-6">Nos coordonnées</h3>
              
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses(contact.color).split(' text-')[0]} text-white flex items-center justify-center shadow-lg`}>
                      <contact.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-space_cadet-600 mb-1">{contact.title}</h4>
                      <p className="text-space_cadet-500 font-medium mb-1">{contact.info}</p>
                      <p className="text-space_cadet-400 text-sm">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

         

          </div>
        </div>

      </div>

      {/* Section finale */}
      <div className="bg-gradient-to-r from-space_cadet-600 via-byzantium-600 to-dogwood_rose-600 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Une question ? Une idée ?
            <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent"> N'hésitez pas !</span>
          </h3>
          
          <p className="text-xl text-timberwolf-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Nous sommes toujours ravis d'échanger avec d'anciens camarades, 
            des professionnels du secteur, ou simplement des curieux passionnés par nos projets.
          </p>

          <div className="flex justify-center items-center space-x-6">
            <Users className="w-8 h-8 text-gold-400" />
            <span className="text-2xl font-semibold text-gold-300">Legendary Cave - Restons connectés</span>
            <Camera className="w-8 h-8 text-gold-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;