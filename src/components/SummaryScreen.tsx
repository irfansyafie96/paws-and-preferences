import { useState, useEffect, useRef } from 'react';
import type { Cat } from '../types';

interface FloatingCat {
  cat: Cat;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface SummaryScreenProps {
  likedCats: Cat[];
  onPlayAgain: () => void;
}

export function SummaryScreen({ likedCats, onPlayAgain }: SummaryScreenProps) {
  const [floatingCats, setFloatingCats] = useState<FloatingCat[]>([]);
  const circleRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const imageSize = 56;

  const circleRadius = 128;
  const boundaryRadius = circleRadius - imageSize / 2;

  useEffect(() => {
    if (likedCats.length === 0) return;

    const initialCats: FloatingCat[] = likedCats.map(cat => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * boundaryRadius;
      return {
        cat,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      };
    });

    setFloatingCats(initialCats);

    const animate = () => {
      setFloatingCats(prev => prev.map(cat => {
        let { x, y, vx, vy } = cat;

        x += vx;
        y += vy;

        const distance = Math.sqrt(x * x + y * y);
        if (distance > boundaryRadius) {
          const angle = Math.atan2(y, x);
          x = Math.cos(angle) * boundaryRadius;
          y = Math.sin(angle) * boundaryRadius;
          
          const dotProduct = vx * Math.cos(angle) + vy * Math.sin(angle);
          vx = vx - 2 * dotProduct * Math.cos(angle);
          vy = vy - 2 * dotProduct * Math.sin(angle);
        }

        return { ...cat, x, y, vx, vy };
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [likedCats.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        You liked {likedCats.length} cats! 🎉
      </h1>

      {likedCats.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-text-primary text-lg mb-8 text-center">
            No cats liked? Try again to find your match!
          </p>
        </div>
      ) : (
        <div 
          ref={circleRef}
          className="relative mb-8 rounded-full"
          style={{ 
            width: circleRadius * 2, 
            height: circleRadius * 2,
            border: '4px solid var(--circle-border)',
          }}
        >
          {floatingCats.map(({ cat, x, y }) => (
            <div
              key={cat.id}
              className="absolute rounded-full overflow-hidden shadow-md"
              style={{
                width: imageSize,
                height: imageSize,
                left: circleRadius - imageSize / 2 + x,
                top: circleRadius - imageSize / 2 + y,
              }}
            >
              <img
                src={`https://cataas.com/cat/${cat.id}`}
                alt="Liked cat"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

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
