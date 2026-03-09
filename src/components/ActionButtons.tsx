import { Button } from './Button';

interface ActionButtonsProps {
  onLike: () => void;
  onDislike: () => void;
}

export function ActionButtons({ onLike, onDislike }: ActionButtonsProps) {
  return (
    <div className="flex gap-16 mt-8">
      <Button
        onClick={onDislike}
        variant="dislike"
        icon="✕"
        ariaLabel="Dislike"
      />
      <Button
        onClick={onLike}
        variant="like"
        icon="❤"
        ariaLabel="Like"
      />
    </div>
  );
}
