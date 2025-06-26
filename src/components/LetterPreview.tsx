
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LetterData } from '../types/letter';
import { generateLetter } from '../services/letterGenerator';
import { Copy, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface LetterPreviewProps {
  letterData: LetterData;
}

export const LetterPreview = ({ letterData }: LetterPreviewProps) => {
  const generatedLetter = generateLetter(letterData);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('تم نسخ الخطاب إلى الحافظة!');
  };

  const downloadLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter.arabicVersion], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'letter.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('تم تحميل الخطاب!');
  };

  if (!letterData.recipientName && !letterData.occasion) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <FileText className="w-16 h-16 mb-4 text-gray-300" />
        <p className="text-center">
          املأ المعلومات على اليسار لرؤية معاينة الخطاب
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(generatedLetter.arabicVersion)}
        >
          <Copy className="w-4 h-4 ml-2" />
          نسخ
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadLetter}
        >
          <Download className="w-4 h-4 ml-2" />
          تحميل
        </Button>
      </div>

      {/* Arabic Version */}
      <Card className="p-6 bg-gray-50">
        <div className="whitespace-pre-line text-right leading-relaxed text-gray-800" dir="rtl">
          {generatedLetter.arabicVersion}
        </div>
      </Card>

      {/* English Translation */}
      {letterData.needsTranslation && generatedLetter.englishVersion && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3 text-right">
            الترجمة الإنجليزية:
          </h3>
          <div className="whitespace-pre-line text-left leading-relaxed text-blue-700" dir="ltr">
            {generatedLetter.englishVersion}
          </div>
        </Card>
      )}

      {/* Creative Version */}
      {letterData.needsCreativeVersion && generatedLetter.creativeVersion && (
        <Card className="p-6 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-800 mb-3 text-right">
            الصيغة الإبداعية:
          </h3>
          <div className="whitespace-pre-line text-right leading-relaxed text-green-700" dir="rtl">
            {generatedLetter.creativeVersion}
          </div>
        </Card>
      )}
    </div>
  );
};
