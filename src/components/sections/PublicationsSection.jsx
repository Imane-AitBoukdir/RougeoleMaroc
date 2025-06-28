import React, { useState, useRef, useEffect } from 'react';

const publications = [
  {
    folder: 'publication1',
    pages: 4,
  },
  {
    folder: 'publication2',
    pages: 4,
  },
  {
    folder: 'publication3',
    pages: 4,
  },
  {
    folder: 'publication4',
    pages: 4,
  },
  {
    folder: 'publication5',
    pages: 4,
  },
  {
    folder: 'publication6',
    pages: 4,
  },
  {
    folder: 'publication7',
    pages: 4,
  },
  {
    folder: 'publication8',
    pages: 4,
  },
  {
    folder: 'publication9',
    pages: 4,
  },
  {
    folder: 'publication10',
    pages: 4,
  },
];

// Utilisation de import.meta.glob pour charger toutes les images
const images = import.meta.glob('../../assets/publications/*/image*.jpg', { eager: true });

function getImageUrl(folder, image) {
  // Cherche la clé qui correspond au dossier et à l'image
  const key = Object.keys(images).find(
    (k) => k.includes(`/${folder}/`) && k.endsWith(`/${image}.jpg`)
  );
  return key ? images[key].default : '';
}

const ITEM_WIDTH = 220;
const VISIBLE_COUNT = 5; // nombre d'éléments visibles (ajustable)

const PublicationsSection = () => {
  // On duplique les publications pour la boucle infinie
  const loopedPublications = [
    ...publications.slice(-VISIBLE_COUNT),
    ...publications,
    ...publications.slice(0, VISIBLE_COUNT),
  ];
  const [current, setCurrent] = useState(VISIBLE_COUNT); // on commence sur le vrai premier
  const [hovered, setHovered] = useState(null);
  const [modal, setModal] = useState({ open: false, pubIdx: 0, page: 1 });
  const [arrowHovered, setArrowHovered] = useState(false);
  const [transition, setTransition] = useState(true);
  const intervalRef = useRef();
  const trackRef = useRef();

  // Auto défilement
  useEffect(() => {
    if (hovered === null && !modal.open && !arrowHovered) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 2500);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [hovered, modal.open, arrowHovered]);

  // Gestion du recentrage instantané (sans transition)
  useEffect(() => {
    if (!transition) {
      // On force le repaint pour que la transition soit bien désactivée
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);

  // Quand on atteint la fin ou le début, on recentre sans animation
  const handleNext = () => {
    setCurrent((prev) => {
      if (prev + 1 === loopedPublications.length - VISIBLE_COUNT) {
        setTimeout(() => {
          setTransition(false);
          setCurrent(VISIBLE_COUNT);
        }, 700); // doit correspondre à la durée de la transition
        return prev + 1;
      }
      return prev + 1;
    });
  };
  const handlePrev = () => {
    setCurrent((prev) => {
      if (prev - 1 < 0 + VISIBLE_COUNT) {
        setTimeout(() => {
          setTransition(false);
          setCurrent(loopedPublications.length - VISIBLE_COUNT * 2 - 1);
        }, 700);
        return prev - 1;
      }
      return prev - 1;
    });
  };

  // Modal navigation
  const handleModalPrev = () => {
    setModal((m) => ({
      ...m,
      page: m.page === 1 ? publications[m.pubIdx].pages : m.page - 1,
    }));
  };
  const handleModalNext = () => {
    setModal((m) => ({
      ...m,
      page: m.page === publications[m.pubIdx].pages ? 1 : m.page + 1,
    }));
  };

  // Calcul de l'index réel de la publication
  const getRealIndex = (idx) => (idx - VISIBLE_COUNT + publications.length) % publications.length;

  return (
    <section id="publications" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-8">Publications</h2>
        <div className="relative flex items-center">
          <button
            onClick={handlePrev}
            onMouseEnter={() => setArrowHovered(true)}
            onMouseLeave={() => setArrowHovered(false)}
            className="z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 absolute left-0 top-1/2 -translate-y-1/2"
          >
            &#8592;
          </button>
          <div className="overflow-hidden w-full">
            <div
              ref={trackRef}
              className="flex"
              style={{
                transition: transition ? 'transform 0.7s' : 'none',
                transform: `translateX(-${current * ITEM_WIDTH}px)`
              }}
            >
              {loopedPublications.map((pub, idx) => (
                <div
                  key={pub.folder + '-' + idx}
                  className={`relative mx-2 transition-transform duration-300 ${hovered === getRealIndex(idx) ? 'scale-110 z-20' : 'scale-100'} cursor-pointer`}
                  onMouseEnter={() => setHovered(getRealIndex(idx))}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setModal({ open: true, pubIdx: getRealIndex(idx), page: 1 })}
                  style={{ minWidth: 200, minHeight: 280 }}
                >
                  <img
                    src={getImageUrl(pub.folder, 'image1')}
                    alt={`Publication ${getRealIndex(idx) + 1}`}
                    className="rounded-lg shadow-lg w-full h-72 object-cover"
                  />
                  {hovered === getRealIndex(idx) && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg">
                      <span className="text-white text-lg font-semibold mb-2">Voir la publication</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            onMouseEnter={() => setArrowHovered(true)}
            onMouseLeave={() => setArrowHovered(false)}
            className="z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 absolute right-0 top-1/2 -translate-y-1/2"
          >
            &#8594;
          </button>
        </div>

        {/* Modal */}
        {modal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-2xl w-full flex flex-col items-center">
              <button onClick={() => setModal({ ...modal, open: false })} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
              <img
                src={getImageUrl(publications[modal.pubIdx].folder, `image${modal.page}`)}
                alt={`Page ${modal.page}`}
                className="rounded-lg shadow-lg w-full max-h-[70vh] object-contain mb-4"
              />
              <div className="flex justify-between w-full">
                <button onClick={handleModalPrev} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">&#8592;</button>
                <span className="text-gray-700 font-medium">Page {modal.page} / {publications[modal.pubIdx].pages}</span>
                <button onClick={handleModalNext} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">&#8594;</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationsSection; 