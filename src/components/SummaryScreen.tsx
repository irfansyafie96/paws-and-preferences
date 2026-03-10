import { motion } from 'framer-motion';
import type { Cat } from '../types';

interface SummaryScreenProps {
  likedCats: Cat[];
  onPlayAgain: () => void;
}

export function SummaryScreen({ likedCats, onPlayAgain }: SummaryScreenProps) {
  const radius = 120;
  const imageSize = 64;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        You liked {likedCats.length} cats! 🎉
      </h1>

      {/* Empty State */}
      {likedCats.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-text-primary text-lg mb-8 text-center">
            No cats liked? Try again to find your match!
          </p>
        </div>
      ) : (
        /* Rotating Circle Gallery */
        <div className="relative w-64 h-64 md:w-96 md:h-96 mb-8">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          >
            {likedCats.map((cat, index) => {
              const angle = (360 / likedCats.length) * index;
              const radian = (angle * Math.PI) / 180;
              const x = radius * Math.cos(radian);
              const y = radius * Math.sin(radian);

              return (
                <motion.div
                  key={cat.id}
                  className="absolute rounded-full overflow-hidden shadow-md"
                  style={{
                    width: imageSize,
                    height: imageSize,
                    transform: `translate(${x - imageSize / 2}px, ${y - imageSize / 2}px)`,
                  }}
                  animate={{ rotate: -angle }}
                  transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                >
                  <img
                    src={`https://cataas.com/cat/${cat.id}`}
                    alt="Liked cat"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* Play Again Button */}
      <button
        onClick={onPlayAgain}
        className="px-8 py-3 bg-like text-text-primary rounded-lg 
                   hover:scale-102 transition-transform font-semibold"
      >
        Play Again
      </button>
    </div>
  );
}
