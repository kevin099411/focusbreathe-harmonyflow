interface StoreErrorProps {
  error: string;
  onRetry: () => void;
}

export const StoreError = ({ error, onRetry }: StoreErrorProps) => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-primary/20 to-secondary/20">
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          重試
        </button>
      </div>
    </div>
  );
};