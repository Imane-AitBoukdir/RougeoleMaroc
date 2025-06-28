import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-red-50 to-green-50 hero-pattern py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="text-gradient">Rougeole au Maroc</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
          >
            Informations essentielles sur la prévention, les symptômes et le traitement de la rougeole
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/guides/Circulaire_diffusion_manuel_rougeole.pdf"
              download
              className="btn-primary flex items-center justify-center"
              style={{ textDecoration: 'none' }}
            >
              <Shield className="w-5 h-5 mr-2" />
              Guide de prévention
            </a>
            <button className="btn-secondary">
              <Phone className="w-5 h-5 mr-2" />
              Urgence médicale
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;