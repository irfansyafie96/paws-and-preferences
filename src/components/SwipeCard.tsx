import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Cat } from '../types';
import { useSwipeCard } from '../hooks/useSwipeCard';

interface SwipeCardProps {
  cat: Cat;
  onLike: (setTrigger?: boolean) => void;
  onDislike: (setTrigger?: boolean) => void;
  isTopCard: boolean;
  triggerSwipe?: 'left' | 'right' | null;
}

export function SwipeCard({ cat, onLike, onDislike, isTopCard, triggerSwipe }: SwipeCardProps) {
  const { 
    dragX, 
    setDragX, 
    rotation, 
    isExiting, 
    exitDirection,
    handleSwipe
  } = useSwipeCard({
    onSwipe: () => {},
  });

  useEffect(() => {
    if (triggerSwipe) {
      handleSwipe(triggerSwipe, false);
    }
  }, [triggerSwipe, handleSwipe]);

  const onDragSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      onLike(false);
    } else {
      onDislike(false);
    }
  };

  const onDragEnd = (offsetX: number) => {
    if (offsetX > 100) {
      handleSwipe('right');
      onDragSwipe('right');
    } else if (offsetX < -100) {
      handleSwipe('left');
      onDragSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute w-full h-full bg-card-bg rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
      drag={isTopCard && !triggerSwipe ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDrag={(_, { offset }) => setDragX(offset.x)}
      onDragEnd={(_, { offset }) => onDragEnd(offset.x)}
      animate={
        isExiting
          ? {
              x: exitDirection === 'right' ? 500 : -500,
              rotate: exitDirection === 'right' ? 50 : -50,
              scale: 0.9,
              opacity: 0,
            }
          : {
              x: 0,
              rotate: rotation,
              scale: 1,
              opacity: 1,
            }
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <img
        src={`https://cataas.com/cat/${cat.id}`}
        alt="Cat"
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {dragX > 50 && (
        <div className="absolute top-4 right-4 border-4 border-like text-like px-4 py-2 rounded-lg font-bold text-2xl rotate-12 bg-white/80">
          LIKE
        </div>
      )}

      {dragX < -50 && (
        <div className="absolute top-4 left-4 border-4 border-dislike text-dislike px-4 py-2 rounded-lg font-bold text-2xl -rotate-12 bg-white/80">
          NOPE
        </div>
      )}
    </motion.div>
  );
}
