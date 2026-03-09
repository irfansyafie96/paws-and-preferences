import { useState, useEffect } from 'react'
import { CardStack } from './components/CardStack'
import { ActionButtons } from './components/ActionButtons'
import { SummaryScreen } from './components/SummaryScreen'
import { LoadingScreen } from './components/LoadingScreen'
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
      
      // Preload all cat images
      await Promise.all(
        data.map((cat: Cat) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = `https://cataas.com/cat/${cat.id}`;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Continue even if fails
          });
        })
      );
      
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
    return <LoadingScreen />;
  }

  if (isFinished) {
    return (
      <SummaryScreen 
        likedCats={likedCats} 
        onPlayAgain={handlePlayAgain} 
      />
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
