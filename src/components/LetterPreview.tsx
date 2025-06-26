
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LetterData, GeneratedLetter, SavedLetter } from '../types/letter';
import { generateLetter } from '../services/letterGenerator';
import { saveLetterToStorage, updateSavedLetter } from '../services/letterStorage';
import { Copy, Download, FileText, Sparkles, Loader2, RefreshCw, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { LetterEditor } from './LetterEditor';
import { SavedLettersDialog } from './SavedLettersDialog';

interface LetterPreviewProps {
  letterData: LetterData;
  selectedLetter?: SavedLetter | null;
  onLetterSelect?: (letter: SavedLetter | null) => void;
}

export const LetterPreview = ({ letterData, selectedLetter, onLetterSelect }: LetterPreviewProps) => {
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedLetter>({
    arabicVersion: '',
    englishVersion: undefined,
    creativeVersion: undefined
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentSavedId, setCurrentSavedId] = useState<string | null>(null);

  // Get current dates
  const getCurrentDates = () => {
    const now = new Date();
    const hijriDate = now.toLocaleDateString('ar-SA-u-ca-islamic');
    const gregorianDate = now.toLocaleDateString('ar-SA');
    return { hijriDate, gregorianDate };
  };

  useEffect(() => {
    if (selectedLetter) {
      setGeneratedLetter(selectedLetter.generatedLetter);
      setCurrentSavedId(selectedLetter.id);
      return;
    }

    const generateLetterAsync = async () => {
      if (!letterData.recipientName && !letterData.occasion) {
        setGeneratedLetter({
          arabicVersion: '',
          englishVersion: undefined,
          creativeVersion: undefined
        });
        setCurrentSavedId(null);
        return;
      }

      setIsLoading(true);
      try {
        const result = await generateLetter(letterData);
        setGeneratedLetter(result);
        setCurrentSavedId(null);
      } catch (error) {
        console.error('Error generating letter:', error);
        toast.error('حدث خطأ في توليد الخطاب. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsLoading(false);
      }
    };

    generateLetterAsync();
  }, [letterData, selectedLetter]);

  const regenerateLetter = async () => {
    if (!letterData.recipientName && !letterData.occasion) {
      toast.error('يرجى إدخال البيانات المطلوبة أولاً');
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateLetter(letterData, true);
      setGeneratedLetter(result);
      setCurrentSavedId(null);
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

  const saveLetter = () => {
    if (!generatedLetter.arabicVersion) {
      toast.error('لا يوجد خطاب للحفظ');
      return;
    }

    const savedId = saveLetterToStorage(letterData, generatedLetter);
    setCurrentSavedId(savedId);
    toast.success('تم حفظ الخطاب بنجاح!');
  };

  const handleLetterEdit = (editedContent: string) => {
    setGeneratedLetter(prev => ({
      ...prev,
      arabicVersion: editedContent
    }));
    
    if (currentSavedId) {
      updateSavedLetter(currentSavedId, editedContent);
    }
  };

  const handleSelectSavedLetter = (letter: SavedLetter) => {
    onLetterSelect?.(letter);
  };

  const formatLetterContent = (content: string) => {
    const { hijriDate, gregorianDate } = getCurrentDates();
    
    return content.split('\n').map((line, index) => {
      // Center Basmala at the top with larger font
      if (line.includes('بسم الله الرحمن الرحيم')) {
        return (
          <div key={index} className="text-center font-bold text-3xl text-green-800 mb-8">
            {line}
          </div>
        );
      }
      
      // Format dates with actual current dates
      if (line.includes('التاريخ الهجري') || line.includes('هـ')) {
        return (
          <div key={index} className="text-right font-medium text-green-600 mb-2 text-lg">
            {hijriDate}
          </div>
        );
      }
      if (line.includes('التاريخ الميلادي') || line.includes('م')) {
        return (
          <div key={index} className="text-right font-medium text-green-600 mb-6 text-lg">
            {gregorianDate}
          </div>
        );
      }
      
      // Center and enlarge recipient name and greeting
      if (line.includes('سعادة') || line.includes('إلى ') || (line.includes('/') && letterData.recipientName)) {
        return (
          <div key={index} className="text-center font-bold text-3xl text-green-800 mb-4">
            {line}
          </div>
        );
      }
      
      // Center and enlarge job titles
      if (letterData.recipientTitle && line.includes(letterData.recipientTitle)) {
        return (
          <div key={index} className="text-center font-bold text-2xl text-green-700 mb-6">
            {line}
          </div>
        );
      }
      
      // Center and enlarge sender name and organization
      if (letterData.senderName && line.includes(letterData.senderName)) {
        return (
          <div key={index} className="text-center font-bold text-2xl text-green-800 mt-8 mb-2">
            {line}
          </div>
        );
      }
      if (letterData.senderOrganization && line.includes(letterData.senderOrganization)) {
        return (
          <div key={index} className="text-center font-bold text-xl text-green-700 mb-4">
            {line}
          </div>
        );
      }
      
      return (
        <div key={index} className={line.trim() === '' ? 'h-4' : 'text-lg leading-relaxed'}>
          {line}
        </div>
      );
    });
  };

  if (!letterData.recipientName && !letterData.occasion && !selectedLetter) {
    return (
      <div className="space-y-6">
        <div className="flex gap-3 justify-end">
          <SavedLettersDialog onSelectLetter={handleSelectSavedLetter} />
        </div>
        
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
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-3 justify-end">
          <SavedLettersDialog onSelectLetter={handleSelectSavedLetter} />
        </div>
        
        <div className="flex flex-col items-center justify-center h-96 text-green-600 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
          <Loader2 className="w-12 h-12 animate-spin text-green-500 mb-4" />
          <p className="text-center text-xl font-tajawal font-medium text-green-700">
            جاري إنشاء الخطاب باستخدام الذكاء الاصطناعي...
          </p>
          <p className="text-center text-sm font-tajawal text-green-600 mt-2">
            يرجى الانتظار، نحن نكتب لك خطاباً راقياً ومتميزاً
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-3 justify-end flex-wrap">
        <SavedLettersDialog onSelectLetter={handleSelectSavedLetter} />
        <Button
          variant="outline"
          size="sm"
          onClick={saveLetter}
          className="font-tajawal text-blue-700 border-blue-300 hover:bg-blue-50"
        >
          <Save className="w-4 h-4 ml-2" />
          حفظ الخطاب
        </Button>
        <LetterEditor
          letterContent={generatedLetter.arabicVersion}
          onSave={handleLetterEdit}
        />
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
        <div className="whitespace-pre-line text-right leading-loose text-gray-800 font-tajawal" dir="rtl">
          <div className="prose-letter">
            {formatLetterContent(generatedLetter.arabicVersion)}
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
            {generatedLetter.englishVersion}
          </div>
        </Card>
      )}

      {/* Creative Version */}
      {letterData.needsCreativeVersion && generatedLetter.creativeVersion && (
        <Card className="p-8 bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-purple-800 text-xl font-tajawal">
                الصيغة الإبداعية المميزة:
              </h3>
              <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(generatedLetter.creativeVersion!)}
              className="font-tajawal text-purple-700 border-purple-300 hover:bg-purple-50"
            >
              <Copy className="w-4 h-4 ml-2" />
              نسخ الإبداعي
            </Button>
          </div>
          <div className="whitespace-pre-line text-right leading-loose text-purple-700 font-tajawal text-lg" dir="rtl">
            <div className="prose-letter">
              {formatLetterContent(generatedLetter.creativeVersion)}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
