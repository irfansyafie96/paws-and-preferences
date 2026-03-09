import { useState, useCallback } from 'react';

interface UseSwipeCardOptions {
  onSwipe: (direction: 'left' | 'right') => void;
  swipeThreshold?: number;
}

export function useSwipeCard({ onSwipe, swipeThreshold = 100 }: UseSwipeCardOptions) {
  const [dragX, setDragX] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const rotation = isExiting
    ? exitDirection === 'right' ? 50 : -50
    : dragX / 10;

  const handleSwipe = useCallback((direction: 'left' | 'right', shouldCallback = true) => {
    if (isExiting) return;
    setExitDirection(direction);
    setIsExiting(true);
    
    setTimeout(() => {
      if (shouldCallback) {
        onSwipe(direction);
      }
      setIsExiting(false);
      setExitDirection(null);
      setDragX(0);
    }, 300);
  }, [onSwipe, isExiting]);

  const handleDragEnd = useCallback((offsetX: number) => {
    if (offsetX > swipeThreshold) {
      handleSwipe('right');
    } else if (offsetX < -swipeThreshold) {
      handleSwipe('left');
    }
  }, [swipeThreshold, handleSwipe]);

  return {
    dragX,
    setDragX,
    rotation,
    isExiting,
    exitDirection,
    handleSwipe,
    handleDragEnd,
  };
}
