import type { Cat } from '../types';

interface SummaryScreenProps {
  likedCats: Cat[];
  onPlayAgain: () => void;
}

export function SummaryScreen({ likedCats, onPlayAgain }: SummaryScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-text-primary mb-2">
        You liked {likedCats.length} cats! 🎉
      </h1>

      {/* Empty State */}
      {likedCats.length === 0 && (
        <p className="text-text-primary mb-8">Better luck next time!</p>
      )}

      {/* Grid of Liked Cats */}
      {likedCats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {likedCats.map(cat => (
            <div key={cat.id} className="w-32 h-32 rounded-xl overflow-hidden">
              <img
                src={`https://cataas.com/cat/${cat.id}`}
                alt="Liked cat"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
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
