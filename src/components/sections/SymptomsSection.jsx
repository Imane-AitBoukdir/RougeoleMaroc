import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Eye, Droplets, Wind } from 'lucide-react';

const symptoms = [
  { icon: Thermometer, title: "Fièvre élevée", description: "39-40°C pendant plusieurs jours" },
  { icon: Eye, title: "Conjonctivite", description: "Yeux rouges et larmoyants" },
  { icon: Droplets, title: "Écoulement nasal", description: "Nez qui coule, éternuements" },
  { icon: Wind, title: "Toux sèche", description: "Toux persistante et irritante" }
];

const SymptomsSection = () => {
  return (
    <section id="symptoms" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Symptômes de la rougeole</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {symptoms.map((symptom, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <symptom.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{symptom.title}</h3>
                <p className="text-gray-600 text-sm">{symptom.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 grid grid-cols-1 justify-items-center gap-8">
            <div className="card p-8 mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Évolution des symptômes</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <div>
                    <p className="font-medium">Jours 1-3 : Prodrome</p>
                    <p className="text-gray-600 text-sm">Fièvre, toux, écoulement nasal, conjonctivite</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <div>
                    <p className="font-medium">Jours 4-6 : Éruption</p>
                    <p className="text-gray-600 text-sm">Apparition de l'éruption cutanée caractéristique</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <div>
                    <p className="font-medium">Jours 7-10 : Guérison</p>
                    <p className="text-gray-600 text-sm">Disparition progressive des symptômes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SymptomsSection;