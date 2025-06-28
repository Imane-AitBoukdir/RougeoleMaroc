import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Stethoscope, AlertTriangle, Droplets, Thermometer, Activity, Eye } from 'lucide-react';

const DiagnosisSection = () => {
  return (
    <section id="diagnosis" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Diagnostic et traitement</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="card p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-orange-600 mr-2" />
                Quand consulter ?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Fièvre élevée persistante</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Éruption cutanée caractéristique</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Difficultés respiratoires</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Contact avec un cas confirmé</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Stethoscope className="w-5 h-5 text-blue-600 mr-2" />
                Traitements
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500 mt-1" />
                  <span>Hydratation abondante</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Thermometer className="w-4 h-4 text-red-500 mt-1" />
                  <span>Antipyrétiques (paracétamol)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Activity className="w-4 h-4 text-green-500 mt-1" />
                  <span>Repos au lit</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Eye className="w-4 h-4 text-purple-500 mt-1" />
                  <span>Soins oculaires</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-8 border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                Complications
              </h3>
              <div className="bg-red-50 p-4 rounded-lg">
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• Pneumonie</li>
                  <li>• Encéphalite</li>
                  <li>• Otite moyenne</li>
                  <li>• Diarrhée sévère</li>
                  <li>• Cécité (rare)</li>
                </ul>
                <p className="mt-4 text-red-800 font-medium text-sm">
                  Risque plus élevé chez les nourrissons, femmes enceintes et immunodéprimés
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosisSection;