import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Qu'est-ce que la rougeole ?</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                La rougeole est une maladie virale hautement contagieuse causée par le virus Morbillivirus. 
                Elle se caractérise par une éruption cutanée distinctive et peut entraîner de graves complications, 
                particulièrement chez les jeunes enfants et les adultes immunodéprimés.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-red-800 mb-2">Important à retenir</h3>
                <p className="text-red-700">
                  La rougeole est l'une des principales causes de décès chez les jeunes enfants dans le monde, 
                  mais elle est entièrement évitable par la vaccination.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                className="rounded-xl shadow-lg max-w-md w-80 mx-auto animate-float" 
                alt="Illustration du virus de la rougeole"
                src="https://images.unsplash.com/photo-1579781403289-674275bc71c5" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;