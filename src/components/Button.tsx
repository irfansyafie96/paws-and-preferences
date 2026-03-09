interface ButtonProps {
  onClick: () => void;
  variant: 'like' | 'dislike';
  icon: string;
  ariaLabel: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  onClick, 
  variant, 
  icon, 
  ariaLabel,
  size = 'md'
}: ButtonProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-20 h-20 text-4xl',
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${sizeClasses[size]} rounded-full
        flex items-center justify-center
        hover:scale-102 active:scale-95
        transition-transform cursor-pointer
        ${variant === 'like' ? 'bg-like' : 'bg-dislike'}
      `}
      aria-label={ariaLabel}
      style={{ color: 'var(--text-primary)' }}
    >
      {icon}
    </button>
  );
}
