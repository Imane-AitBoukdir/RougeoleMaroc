import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Heart, TrendingUp } from 'lucide-react';

const preventionSteps = [
  { step: 1, age: "12 mois", description: "Première dose du vaccin ROR" },
  { step: 2, age: "18 mois", description: "Deuxième dose du vaccin ROR" },
  { step: 3, age: "Adulte", description: "Rappel si nécessaire selon le statut vaccinal" }
];

const PreventionSection = () => {
  return (
    <section id="prevention" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Prévention et vaccination</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="card p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 text-green-600 mr-3" />
                Vaccin ROR
              </h3>
              <p className="text-gray-700 mb-6">
                Le vaccin ROR (Rougeole-Oreillons-Rubéole) est le moyen le plus efficace de prévenir la rougeole. 
                Il offre une protection de 97% après deux doses.
              </p>
              
              <div className="space-y-4">
                {preventionSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{step.age}</p>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Pourquoi se vacciner ?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Protection collective</h4>
                    <p className="text-gray-600 text-sm">Protège la communauté par l'immunité de groupe</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Protection individuelle</h4>
                    <p className="text-gray-600 text-sm">Évite les complications graves de la maladie</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Efficacité prouvée</h4>
                    <p className="text-gray-600 text-sm">97% d'efficacité après 2 doses</p>
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

export default PreventionSection;