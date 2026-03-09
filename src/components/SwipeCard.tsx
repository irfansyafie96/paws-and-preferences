import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Cat } from '../types';

interface SwipeCardProps {
  cat: Cat;
  onLike: () => void;
  onDislike: () => void;
  isTopCard: boolean;
}

export function SwipeCard({ cat, onLike, onDislike, isTopCard }: SwipeCardProps) {
  const [dragX, setDragX] = useState(0);

  const SWIPE_THRESHOLD = 100;

  return (
    <motion.div
      className="absolute w-full h-full bg-card-bg rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
      drag={isTopCard ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDrag={(e, { offset }) => setDragX(offset.x)}
      onDragEnd={(e, { offset }) => {
        if (offset.x > SWIPE_THRESHOLD) {
          onLike();
        } else if (offset.x < -SWIPE_THRESHOLD) {
          onDislike();
        }
      }}
      style={{
        rotate: dragX / 10,
      }}
      exit={{
        x: dragX > 0 ? 500 : -500,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      {/* Cat Image */}
      <img
        src={`https://cataas.com/cat/${cat.id}`}
        alt="Cat"
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* LIKE Stamp */}
      {dragX > 50 && (
        <div className="absolute top-4 right-4 border-4 border-like text-like px-4 py-2 rounded-lg font-bold text-2xl rotate-12 bg-white/80">
          LIKE
        </div>
      )}

      {/* NOPE Stamp */}
      {dragX < -50 && (
        <div className="absolute top-4 left-4 border-4 border-dislike text-dislike px-4 py-2 rounded-lg font-bold text-2xl -rotate-12 bg-white/80">
          NOPE
        </div>
      )}
    </motion.div>
  );
}
