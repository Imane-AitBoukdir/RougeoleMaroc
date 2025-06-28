import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const newsArticles = [
  {
    id: 1,
    title: "Campagne de vaccination contre la rougeole au Maroc",
    summary: "Le Ministère de la Santé lance une nouvelle campagne de sensibilisation pour augmenter la couverture vaccinale.",
    date: "15 Décembre 2024",
    category: "Prévention"
  },
  {
    id: 2,
    title: "Surveillance épidémiologique renforcée",
    summary: "Mise en place d'un système de surveillance renforcé dans toutes les régions du royaume.",
    date: "10 Décembre 2024",
    category: "Surveillance"
  },
  {
    id: 3,
    title: "Formation du personnel médical",
    summary: "Programme de formation continue pour les professionnels de santé sur la prise en charge de la rougeole.",
    date: "5 Décembre 2024",
    category: "Formation"
  }
];

const NewsSection = () => {
  const { toast } = useToast();

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Actualités et épidémies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 cursor-pointer"
                onClick={() => toast({
                  title: "🚧 Cette fonctionnalité n'est pas encore implémentée",
                  description: "Mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
                })}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                <img
                  className="w-full h-48 object-cover rounded-lg mb-4" 
                  alt={`Image pour ${article.title}`}
                  src="https://images.unsplash.com/photo-1680170684412-b7f3afd4da2f" />
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-4 flex items-center text-red-600 text-sm font-medium">
                  <span>Lire la suite</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;