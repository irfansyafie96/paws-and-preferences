import { AnimatePresence } from 'framer-motion';
import type { Cat } from '../types';
import { SwipeCard } from './SwipeCard';

interface CardStackProps {
  cats: Cat[];
  currentIndex: number;
  onLike: (setTrigger?: boolean) => void;
  onDislike: (setTrigger?: boolean) => void;
  triggerSwipe?: 'left' | 'right' | null;
}

export function CardStack({ cats, currentIndex, onLike, onDislike, triggerSwipe }: CardStackProps) {
  const currentCat = cats[currentIndex];
  const nextCat = cats[currentIndex + 1];

  return (
    <div className="relative w-80 h-96">
      <AnimatePresence>
        {currentCat && (
          <SwipeCard
            key={currentCat.id}
            cat={currentCat}
            onLike={onLike}
            onDislike={onDislike}
            isTopCard={true}
            triggerSwipe={triggerSwipe}
          />
        )}
      </AnimatePresence>

      {/* Card behind - static, slightly scaled down */}
      {nextCat && (
        <div className="absolute w-full h-full bg-card-bg rounded-xl overflow-hidden scale-95 opacity-50 -z-10">
          <img
            src={`https://cataas.com/cat/${nextCat.id}`}
            alt="Cat"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
