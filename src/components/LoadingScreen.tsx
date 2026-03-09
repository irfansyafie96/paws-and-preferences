export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Cat Icon with Pulse Animation */}
      <div className="text-6xl mb-6 animate-pulse">🐱</div>
      
      {/* Loading Text */}
      <p className="text-text-primary text-lg font-medium">
        Finding your perfect cats...
      </p>
    </div>
  );
}
