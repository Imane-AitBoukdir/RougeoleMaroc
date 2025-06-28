import React, { useState, useRef, useEffect } from 'react';

// Liste des vidéos (on peut automatiser avec import.meta.glob si besoin)
const videos = [
  { file: 'video (1).mp4' },
  { file: 'video (2).mp4' },
  { file: 'video (3).mp4' },
  { file: 'video (4).mp4' },
  { file: 'video (5).mp4' },
  { file: 'video (6).mp4' },
  { file: 'video (7).mp4' },
];

const videoImports = import.meta.glob('../../assets/videos/*.mp4', { eager: true });
function getVideoUrl(file) {
  const key = Object.keys(videoImports).find((k) => k.endsWith(`/${file}`));
  return key ? videoImports[key].default : '';
}

const ITEM_WIDTH = 220;
const VISIBLE_COUNT = 5;

function useVideoThumbnails(videoList, second = 2) {
  const [thumbnails, setThumbnails] = useState(Array(videoList.length).fill(null));

  useEffect(() => {
    videoList.forEach((vid, idx) => {
      if (thumbnails[idx]) return; // déjà généré
      const video = document.createElement('video');
      video.src = getVideoUrl(vid.file);
      video.crossOrigin = 'anonymous';
      video.preload = 'auto';
      video.currentTime = second;
      video.muted = true;
      video.addEventListener('seeked', function handler() {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setThumbnails((prev) => {
          const copy = [...prev];
          copy[idx] = canvas.toDataURL('image/jpeg');
          return copy;
        });
        video.removeEventListener('seeked', handler);
      });
    });
    // eslint-disable-next-line
  }, [videoList]);
  return thumbnails;
}

const ShortVideosSection = () => {
  // On duplique les vidéos pour la transition smooth
  const extendedVideos = [...videos, ...videos.slice(0, VISIBLE_COUNT)];
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [arrowHovered, setArrowHovered] = useState(false);
  const [modal, setModal] = useState({ open: false, idx: 0 });
  const [transition, setTransition] = useState(true);
  const intervalRef = useRef();
  const thumbnails = useVideoThumbnails(extendedVideos, 2);
  const trackRef = useRef();

  // Défilement automatique smooth
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

  // Quand on atteint la fin, on revient à la première vidéo sans transition
  useEffect(() => {
    if (current === videos.length) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(0);
      }, 700); // doit correspondre à la durée de la transition
    } else if (!transition) {
      // On force le repaint pour que la transition soit bien désactivée
      requestAnimationFrame(() => setTransition(true));
    }
  }, [current, transition]);

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (current === 0) {
      setTransition(false);
      setCurrent(videos.length - 1);
      setTimeout(() => setTransition(true), 10);
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  // Affichage des vidéos visibles (smooth, avec duplication)
  const getVisibleVideos = () => {
    return extendedVideos.slice(current, current + VISIBLE_COUNT);
  };
  const visibleVideos = getVisibleVideos();

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-8">Vidéos courtes</h2>
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
              {extendedVideos.map((vid, idx) => (
                <div
                  key={vid.file + '-' + idx}
                  className={`relative mx-2 transition-transform duration-300 ${hovered === idx ? 'scale-110 z-20' : 'scale-100'} cursor-pointer`}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setModal({ open: true, idx: idx % videos.length })}
                  style={{ minWidth: 200, minHeight: 280 }}
                >
                  {thumbnails[idx] ? (
                    <img
                      src={thumbnails[idx]}
                      alt={`Miniature vidéo ${idx + 1}`}
                      className="rounded-lg shadow-lg w-full h-72 object-cover"
                    />
                  ) : (
                    <div className="rounded-lg shadow-lg w-full h-72 bg-gray-200 flex items-center justify-center">Chargement...</div>
                  )}
                  {hovered === idx && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg">
                      <span className="text-white text-lg font-semibold mb-2">Voir la vidéo</span>
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
              <video
                src={getVideoUrl(videos[modal.idx].file)}
                controls
                autoPlay
                className="rounded-lg shadow-lg w-full max-h-[70vh] object-contain mb-4"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShortVideosSection; 