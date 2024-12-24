import { Loader2 } from 'lucide-react';

export function ProcessingIndicator() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Loader2 className="h-8 w-8 animate-spin text-[#e89eb8]" />
      <p>正在上傳...</p>
    </div>
  );
}