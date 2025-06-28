import React from 'react';
import { Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-lg font-bold">Rougeole Maroc</span>
            </div>
            <p className="text-gray-400 text-sm">
              Plateforme d'information et de prévention contre la rougeole au Maroc.
            </p>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block">Liens utiles</span>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-white cursor-pointer">Ministère de la Santé</span></li>
              <li><span className="hover:text-white cursor-pointer">OMS Maroc</span></li>
              <li><span className="hover:text-white cursor-pointer">Centres de vaccination</span></li>
              <li><span className="hover:text-white cursor-pointer">Urgences médicales</span></li>
            </ul>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block">Contact</span>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>141 (Numéro vert)</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Rabat, Maroc</span>
              </li>
            </ul>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block">Urgence</span>
            <div className="bg-red-600 p-4 rounded-lg">
              <p className="text-sm mb-2">En cas d'urgence médicale :</p>
              <p className="text-lg font-bold">15 ou 141</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Rougeole Maroc. Tous droits réservés. | Information à des fins éducatives uniquement.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;