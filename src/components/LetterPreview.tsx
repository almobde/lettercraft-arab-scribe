
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LetterData, GeneratedLetter } from '../types/letter';
import { generateLetter } from '../services/letterGenerator';
import { Copy, Download, FileText, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

interface LetterPreviewProps {
  letterData: LetterData;
}

export const LetterPreview = ({ letterData }: LetterPreviewProps) => {
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedLetter>({
    arabicVersion: '',
    englishVersion: undefined,
    creativeVersion: undefined
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateLetterAsync = async () => {
      if (!letterData.recipientName && !letterData.occasion) {
        setGeneratedLetter({
          arabicVersion: '',
          englishVersion: undefined,
          creativeVersion: undefined
        });
        return;
      }

      setIsLoading(true);
      try {
        const result = await generateLetter(letterData);
        setGeneratedLetter(result);
      } catch (error) {
        console.error('Error generating letter:', error);
        toast.error('حدث خطأ في توليد الخطاب. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsLoading(false);
      }
    };

    generateLetterAsync();
  }, [letterData]);

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
      <div className="flex flex-col items-center justify-center h-96 text-green-600 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-dashed border-green-300">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-20 h-20 text-green-300" />
          <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
        </div>
        <p className="text-center text-xl font-tajawal font-medium text-green-700">
          املأ المعلومات على اليسار لرؤية معاينة الخطاب الراقي
        </p>
        <p className="text-center text-sm font-tajawal text-green-600 mt-2">
          ستحصل على خطاب مذهل ومفصل بأكثر من 600 حرف باستخدام الذكاء الاصطناعي
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-green-600 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
        <Loader2 className="w-12 h-12 animate-spin text-green-500 mb-4" />
        <p className="text-center text-xl font-tajawal font-medium text-green-700">
          جاري إنشاء الخطاب باستخدام الذكاء الاصطناعي...
        </p>
        <p className="text-center text-sm font-tajawal text-green-600 mt-2">
          يرجى الانتظار، نحن نكتب لك خطاباً راقياً ومتميزاً
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(generatedLetter.arabicVersion)}
          className="font-tajawal text-green-700 border-green-300 hover:bg-green-50"
        >
          <Copy className="w-4 h-4 ml-2" />
          نسخ الخطاب
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadLetter}
          className="font-tajawal text-emerald-700 border-emerald-300 hover:bg-emerald-50"
        >
          <Download className="w-4 h-4 ml-2" />
          تحميل الخطاب
        </Button>
      </div>

      {/* Arabic Version */}
      <Card className="p-8 bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200 shadow-xl">
        <div className="whitespace-pre-line text-right leading-loose text-gray-800 font-tajawal text-lg" dir="rtl">
          <div className="prose-letter text-center">
            {generatedLetter.arabicVersion.split('\n').map((line, index) => {
              // Center the recipient name and title
              if (line.includes('سعادة')) {
                return (
                  <div key={index} className="text-center font-bold text-xl text-green-800 mb-2">
                    {line}
                  </div>
                );
              }
              // Center job title
              if (index > 0 && line.trim() && !line.includes('السلام') && !line.includes('بسم الله') && !line.includes('التاريخ') && line.length < 50 && !line.includes('نتوجه') && !line.includes('يطيب')) {
                return (
                  <div key={index} className="text-center font-semibold text-lg text-green-700 mb-4">
                    {line}
                  </div>
                );
              }
              // Center sender name and organization
              if (line.includes(letterData.senderName) && letterData.senderName) {
                return (
                  <div key={index} className="text-center font-bold text-lg text-green-800 mt-6">
                    {line}
                  </div>
                );
              }
              if (line.includes(letterData.senderOrganization) && letterData.senderOrganization) {
                return (
                  <div key={index} className="text-center font-semibold text-base text-green-700 mb-4">
                    {line}
                  </div>
                );
              }
              // Date alignment to the right
              if (line.includes('التاريخ')) {
                return (
                  <div key={index} className="text-right font-medium text-green-600 mb-4">
                    {line}
                  </div>
                );
              }
              return (
                <div key={index} className={line.trim() === '' ? 'h-4' : ''}>
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* English Translation */}
      {letterData.needsTranslation && generatedLetter.englishVersion && (
        <Card className="p-8 bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-bold text-blue-800 text-xl font-tajawal">
              الترجمة الإنجليزية:
            </h3>
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
          <div className="whitespace-pre-line text-left leading-relaxed text-blue-700 font-medium text-base" dir="ltr">
            {generatedLetter.englishVersion}
          </div>
        </Card>
      )}

      {/* Creative Version */}
      {letterData.needsCreativeVersion && generatedLetter.creativeVersion && (
        <Card className="p-8 bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-bold text-purple-800 text-xl font-tajawal">
              الصيغة الإبداعية المميزة:
            </h3>
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
          </div>
          <div className="whitespace-pre-line text-right leading-loose text-purple-700 font-tajawal text-lg" dir="rtl">
            <div className="prose-letter">
              {generatedLetter.creativeVersion.split('\n').map((line, index) => {
                // Center the recipient name and title
                if (line.includes('إلى صاحب') || line.includes('إلى رمز')) {
                  return (
                    <div key={index} className="text-center font-bold text-xl text-purple-800 mb-2">
                      {line}
                    </div>
                  );
                }
                // Center job title
                if (index > 0 && line.trim() && !line.includes('السلام') && !line.includes('بسم الله') && !line.includes('في رحاب') && line.length < 50 && !line.includes('نقف')) {
                  return (
                    <div key={index} className="text-center font-semibold text-lg text-purple-700 mb-4">
                      {line}
                    </div>
                  );
                }
                // Center sender name and organization
                if (line.includes(letterData.senderName) && letterData.senderName) {
                  return (
                    <div key={index} className="text-center font-bold text-lg text-purple-800 mt-6">
                      {line}
                    </div>
                  );
                }
                if (line.includes(letterData.senderOrganization) && letterData.senderOrganization) {
                  return (
                    <div key={index} className="text-center font-semibold text-base text-purple-700 mb-4">
                      {line}
                    </div>
                  );
                }
                return (
                  <div key={index} className={line.trim() === '' ? 'h-4' : ''}>
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
