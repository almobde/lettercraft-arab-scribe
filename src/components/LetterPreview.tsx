import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LetterData, GeneratedLetter } from '../types/letter';
import { generateLetter } from '../services/letterGenerator';
import { Copy, FileText, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

interface LetterPreviewProps {
  letterData: LetterData;
}

export const LetterPreview = ({ letterData }: LetterPreviewProps) => {
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedLetter>({
    arabicVersion: '',
    englishVersion: undefined
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateLetterAsync = async () => {
      if (!letterData.recipientName && !letterData.occasion) {
        setGeneratedLetter({
          arabicVersion: '',
          englishVersion: undefined
        });
        return;
      }

      // التحقق من أن البيانات مكتملة بما فيه الكفاية قبل إرسال الطلب
      if (!letterData.recipientName.trim() || 
          !letterData.occasion.trim() || 
          letterData.occasion.length < 50 ||
          !letterData.senderName.trim() ||
          !letterData.senderOrganization.trim()) {
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

    // تأخير لتجنب الطلبات المتعددة أثناء الكتابة
    const timer = setTimeout(generateLetterAsync, 1500);
    
    return () => clearTimeout(timer);
  }, [letterData]);

  const regenerateLetter = async () => {
    if (!letterData.recipientName && !letterData.occasion) {
      toast.error('يرجى إدخال البيانات المطلوبة أولاً');
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateLetter(letterData);
      setGeneratedLetter(result);
      toast.success('تم إعادة كتابة الخطاب بأسلوب جديد!');
    } catch (error) {
      console.error('Error regenerating letter:', error);
      toast.error('حدث خطأ في إعادة كتابة الخطاب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('تم نسخ الخطاب إلى الحافظة!');
  };


  if (!letterData.recipientName && !letterData.occasion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 h-96 text-primary bg-gradient-to-br from-secondary/30 to-accent/20 rounded-xl border-2 border-dashed border-secondary">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-20 h-20 text-primary/40" />
          <Sparkles className="w-8 h-8 text-primary/60 animate-pulse" />
        </div>
        <p className="text-center text-xl font-tajawal font-medium text-primary">
          املأ المعلومات لرؤية الخطاب بشكل احترافي
        </p>
        <p className="text-center text-sm font-tajawal text-primary/70 mt-2">
          ستحصل على خطاب راقي ومتميز باستخدام الذكاء الاصطناعي
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 h-96 text-primary bg-gradient-to-br from-secondary/30 to-accent/20 rounded-xl border-2 border-secondary">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-center text-xl font-tajawal font-medium text-primary">
          جاري إنشاء الخطاب باستخدام الذكاء الاصطناعي...
        </p>
        <p className="text-center text-sm font-tajawal text-primary/70 mt-2">
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
          onClick={regenerateLetter}
          className="font-tajawal text-purple-700 border-purple-300 hover:bg-purple-50"
        >
          <RefreshCw className="w-4 h-4 ml-2" />
          إعادة كتابة الخطاب
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(generatedLetter.arabicVersion)}
          className="font-tajawal text-green-700 border-green-300 hover:bg-green-50"
        >
          <Copy className="w-4 h-4 ml-2" />
          نسخ الخطاب
        </Button>
      </div>

      {/* Arabic Version */}
      <Card className="p-8 bg-gradient-to-br from-secondary/30 to-accent/10 border-2 border-secondary shadow-xl">
        <div className="whitespace-pre-line leading-loose text-gray-800 font-tajawal text-lg" style={{textAlign: 'center', direction: 'rtl'}}>
          <div className="prose-letter" style={{textAlign: 'center'}}>
            {generatedLetter.arabicVersion.split('\n').map((line, index) => {
              // Center the Basmala at the top with larger font
              if (line.includes('بسم الله الرحمن الرحيم')) {
                return (
                  <div key={index} className="font-bold text-2xl text-green-800 mb-8" style={{textAlign: 'center'}}>
                    {line}
                  </div>
                );
              }
              // Center recipient name and greeting lines with larger font
              if (line.includes('سعادة') || line.includes('إلى ') || (line.includes('/') && letterData.recipientName)) {
                return (
                  <div key={index} className="font-bold text-2xl text-green-800 mb-3" style={{textAlign: 'center'}}>
                    {line}
                  </div>
                );
              }
              // Center and enlarge job title
              if (index > 0 && line.trim() && !line.includes('السلام') && !line.includes('بسم الله') && line.length < 50 && !line.includes('نتوجه') && !line.includes('يطيب') && !line.includes('في رحاب') && !line.includes('تحت ظلال')) {
                return (
                  <div key={index} className="font-semibold text-xl text-green-700 mb-4" style={{textAlign: 'center'}}>
                    {line}
                  </div>
                );
              }
              // Center and enlarge sender name and organization
              if (line.includes(letterData.senderName) && letterData.senderName) {
                return (
                  <div key={index} className="font-bold text-xl text-green-800 mt-6" style={{textAlign: 'center'}}>
                    {line}
                  </div>
                );
              }
              if (line.includes(letterData.senderOrganization) && letterData.senderOrganization) {
                return (
                  <div key={index} className="font-semibold text-lg text-green-700 mb-4" style={{textAlign: 'center'}}>
                    {line}
                  </div>
                );
              }
              // Center all other text content
              return (
                <div key={index} className={line.trim() === '' ? 'h-4' : ''} style={{textAlign: 'center'}}>
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-blue-800 text-xl font-tajawal">
                الترجمة الإنجليزية:
              </h3>
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(generatedLetter.englishVersion!)}
              className="font-tajawal text-blue-700 border-blue-300 hover:bg-blue-50"
            >
              <Copy className="w-4 h-4 ml-2" />
              نسخ الترجمة
            </Button>
          </div>
          <div className="whitespace-pre-line text-left leading-relaxed text-blue-700 font-medium text-base" dir="ltr">
            {generatedLetter.englishVersion.split('\n').map((line, index) => {
              // Center the recipient title and name
              if (line.includes('The Honorable') || line.includes('His Excellency')) {
                return (
                  <div key={index} className="text-center font-bold text-xl text-blue-800 mb-2">
                    {line}
                  </div>
                );
              }
              // Center job title and sender info
              if (index > 0 && line.trim() && !line.includes('Peace') && !line.includes('Date') && line.length < 50 && !line.includes('We are') && !line.includes('extend')) {
                return (
                  <div key={index} className="text-center font-semibold text-lg text-blue-700 mb-4">
                    {line}
                  </div>
                );
              }
              // Center sender name and organization
              if (letterData.senderName && line.includes(letterData.senderName.replace(/محمد/g, 'Mohammed').replace(/أحمد/g, 'Ahmed').replace(/علي/g, 'Ali'))) {
                return (
                  <div key={index} className="text-center font-bold text-lg text-blue-800 mt-6">
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
        </Card>
      )}

    </div>
  );
};
