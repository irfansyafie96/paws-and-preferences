import { useState, useEffect } from 'react'
import { CardStack } from './components/CardStack'
import { ActionButtons } from './components/ActionButtons'
import type { Cat } from './types'

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  const [dislikedCats, setDislikedCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const fetchCats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://cataas.com/api/cats?limit=20');
      const data = await response.json();
      setCats(data);
    } catch (error) {
      console.error('Failed to fetch cats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const advanceToNextCat = () => {
    if (currentIndex < cats.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleLike = () => {
    setLikedCats(prev => [...prev, cats[currentIndex]]);
    advanceToNextCat();
  };

  const handleDislike = () => {
    setDislikedCats(prev => [...prev, cats[currentIndex]]);
    advanceToNextCat();
  };

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setLikedCats([]);
    setDislikedCats([]);
    setIsFinished(false);
    fetchCats();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-primary text-xl">Loading cats...</div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-primary text-xl">
          <p>You liked {likedCats.length} cats!</p>
          <button
            onClick={handlePlayAgain}
            className="mt-4 px-6 py-2 bg-like text-white rounded-lg hover:scale-102 transition-transform"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-text-primary mb-4">
        Cat {currentIndex + 1} of {cats.length}
      </div>
      <CardStack
        cats={cats}
        currentIndex={currentIndex}
        onLike={handleLike}
        onDislike={handleDislike}
      />
      <ActionButtons onLike={handleLike} onDislike={handleDislike} />
    </div>
  );
}

export default App
