
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Archive, Eye, Trash2 } from 'lucide-react';
import { getSavedLetters, deleteSavedLetter } from '../services/letterStorage';
import { SavedLetter } from '../types/letter';
import { toast } from 'sonner';

interface SavedLettersDialogProps {
  onSelectLetter: (letter: SavedLetter) => void;
}

export const SavedLettersDialog = ({ onSelectLetter }: SavedLettersDialogProps) => {
  const [savedLetters, setSavedLetters] = useState<SavedLetter[]>(getSavedLetters());
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string) => {
    deleteSavedLetter(id);
    setSavedLetters(getSavedLetters());
    toast.success('تم حذف الخطاب بنجاح');
  };

  const handleView = (letter: SavedLetter) => {
    onSelectLetter(letter);
    setIsOpen(false);
  };

  const refreshLetters = () => {
    setSavedLetters(getSavedLetters());
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-tajawal text-blue-700 border-blue-300 hover:bg-blue-50"
          onClick={refreshLetters}
        >
          <Archive className="w-4 h-4 ml-2" />
          الخطابات المحفوظة ({savedLetters.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-tajawal text-xl text-center">
            الخطابات المحفوظة
          </DialogTitle>
        </DialogHeader>
        
        {savedLetters.length === 0 ? (
          <div className="text-center py-8 text-gray-500 font-tajawal">
            لا توجد خطابات محفوظة
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-tajawal">المرسل إليه</TableHead>
                <TableHead className="text-right font-tajawal">الوظيفة</TableHead>
                <TableHead className="text-right font-tajawal">المناسبة</TableHead>
                <TableHead className="text-right font-tajawal">تاريخ الحفظ</TableHead>
                <TableHead className="text-right font-tajawal">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedLetters.map((letter) => (
                <TableRow key={letter.id}>
                  <TableCell className="font-tajawal font-medium">
                    {letter.letterData.recipientName}
                  </TableCell>
                  <TableCell className="font-tajawal">
                    {letter.letterData.recipientTitle}
                  </TableCell>
                  <TableCell className="font-tajawal">
                    {letter.letterData.occasion}
                  </TableCell>
                  <TableCell className="font-tajawal text-sm text-gray-600">
                    {letter.createdAt.toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(letter)}
                        className="font-tajawal text-green-600 border-green-300 hover:bg-green-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(letter.id)}
                        className="font-tajawal text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};
