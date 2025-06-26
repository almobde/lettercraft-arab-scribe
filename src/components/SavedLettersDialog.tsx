
import React from 'react';
import { Button } from '@/components/ui/button';
import { Archive } from 'lucide-react';

export const SavedLettersDialog = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-tajawal"
    >
      <Archive className="w-4 h-4 ml-2" />
      الخطابات المحفوظة
    </Button>
  );
};
