import { useState, useEffect, useRef } from 'react'
import { CardStack } from './components/CardStack'
import { ActionButtons } from './components/ActionButtons'
import { SummaryScreen } from './components/SummaryScreen'
import { LoadingScreen } from './components/LoadingScreen'
import type { Cat } from './types'

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [swipeTrigger, setSwipeTrigger] = useState<'left' | 'right' | null>(null);
  const isSwiping = useRef(false);

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

  // Reset swipe trigger after animation completes
  useEffect(() => {
    if (swipeTrigger) {
      const timer = setTimeout(() => {
        setSwipeTrigger(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [swipeTrigger]);

  const advanceToNextCat = () => {
    if (currentIndex < cats.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleLike = (setTrigger = true) => {
    if (isSwiping.current) return;
    isSwiping.current = true;
    if (setTrigger) {
      setSwipeTrigger('right');
    }
    setLikedCats(prev => [...prev, cats[currentIndex]]);
    setTimeout(() => {
      advanceToNextCat();
      setSwipeTrigger(null);
      isSwiping.current = false;
    }, 300);
  };

  const handleDislike = (setTrigger = true) => {
    if (isSwiping.current) return;
    isSwiping.current = true;
    if (setTrigger) {
      setSwipeTrigger('left');
    }
    setTimeout(() => {
      advanceToNextCat();
      setSwipeTrigger(null);
      isSwiping.current = false;
    }, 300);
  };

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setLikedCats([]);
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
        triggerSwipe={swipeTrigger}
      />
      <ActionButtons onLike={handleLike} onDislike={handleDislike} />
    </div>
  );
}

export default App
