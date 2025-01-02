import { Loader2 } from 'lucide-react';

export const StoreLoading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};