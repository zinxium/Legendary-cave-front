import logo from '../assets/logo.png';
function Footer() {
  return (
      <footer className="bg-gradient-to-r from-space_cadet-500 via-space_cadet-600 to-space_cadet-500 text-white py-2">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            {/* Footer Logo */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={logo} alt="logo" />
              </div>
              <h4 className="text-3xl font-bold">
                Legendary <span className="text-gold-400">Cave</span>
              </h4>
            </div>

            {/* Footer Text */}
            <p className="text-gold-400 text-lg mb-8 max-w-2xl mx-auto">
              Gardons ces souvenirs vivants pour toujours, car ils sont le témoignage de notre parcours exceptionnel ensemble.
            </p>

            {/* Divider */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-byzantium-500 to-dogwood_rose-500 mx-auto mb-8"></div>

            {/* Copyright */}
            <div className="border-t border-space_cadet-400/30 pt-8">
              <p className="text-timberwolf-400 text-sm">
                © 2025 Legendary Cave. Tous droits réservés. •
                <span className="text-gold-400 font-semibold"> Promotion 2027</span> •
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
}
export default Footer;