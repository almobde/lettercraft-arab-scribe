
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit3, Save, Download } from 'lucide-react';
import { toast } from 'sonner';

interface LetterEditorProps {
  letterContent: string;
  onSave: (content: string) => void;
  title?: string;
}

export const LetterEditor = ({ letterContent, onSave, title = "تحرير الخطاب" }: LetterEditorProps) => {
  const [editedContent, setEditedContent] = useState(letterContent);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onSave(editedContent);
    setIsOpen(false);
    toast.success('تم حفظ التعديلات بنجاح');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([editedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'letter_edited.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('تم تحميل الخطاب المحرر!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="font-tajawal text-orange-700 border-orange-300 hover:bg-orange-50"
        >
          <Edit3 className="w-4 h-4 ml-2" />
          تحرير الخطاب
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-tajawal text-xl text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[400px] font-tajawal text-lg leading-relaxed"
            dir="rtl"
            placeholder="قم بتحرير الخطاب هنا..."
          />
          
          <div className="flex gap-3 justify-end">
            <Button
              onClick={handleDownload}
              variant="outline"
              className="font-tajawal text-emerald-700 border-emerald-300 hover:bg-emerald-50"
            >
              <Download className="w-4 h-4 ml-2" />
              تحميل المحرر
            </Button>
            <Button
              onClick={handleSave}
              className="font-tajawal bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4 ml-2" />
              حفظ التعديلات
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
