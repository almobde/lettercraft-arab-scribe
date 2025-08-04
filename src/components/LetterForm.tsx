
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LetterData } from '../types/letter';
import { FileText, Sparkles, User, Building, Calendar, Palette, Globe, Type } from 'lucide-react';

interface LetterFormProps {
  letterData: LetterData;
  setLetterData: (data: LetterData) => void;
}

export const LetterForm = ({ letterData, setLetterData }: LetterFormProps) => {
  const updateField = (field: keyof LetterData, value: any) => {
    setLetterData({ ...letterData, [field]: value });
  };

  return (
    <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-br from-white to-secondary/30">
      <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-2xl font-tajawal">
          <FileText className="w-8 h-8" />
          معلومات الخطاب
          <Sparkles className="w-6 h-6 animate-pulse" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        {/* Recipient Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-primary font-semibold text-lg font-tajawal">
              <User className="w-5 h-5" />
              اسم المرسل إليه
            </label>
            <input
              type="text"
              value={letterData.recipientName}
              onChange={(e) => updateField('recipientName', e.target.value)}
              className="w-full p-4 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-lg font-tajawal bg-white/70"
              placeholder="مثال: محمد أحمد السعودي"
            />
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-primary font-semibold text-lg font-tajawal">
              <Building className="w-5 h-5" />
              المنصب أو الصفة
            </label>
            <input
              type="text"
              value={letterData.recipientTitle}
              onChange={(e) => updateField('recipientTitle', e.target.value)}
              className="w-full p-4 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-lg font-tajawal bg-white/70"
              placeholder="مثال: مدير عام الشركة"
            />
          </div>
        </div>

        {/* Occasion */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-primary font-semibold text-lg font-tajawal">
            <Calendar className="w-5 h-5" />
            المناسبة أو الموضوع (50 حرف على الأقل)
          </label>
          <textarea
            value={letterData.occasion}
            onChange={(e) => updateField('occasion', e.target.value)}
            className={`w-full p-4 border-2 rounded-lg focus:outline-none text-lg font-tajawal bg-white/70 min-h-[120px] ${
              letterData.occasion.length < 50 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-border focus:border-primary'
            }`}
            placeholder="مثال: دعوة لحضور المؤتمر السنوي للشركة... (يجب أن يكون النص 50 حرف على الأقل)"
            minLength={50}
          />
          <div className={`text-sm font-tajawal ${
            letterData.occasion.length < 50 ? 'text-red-600' : 'text-primary'
          }`}>
            عدد الأحرف: {letterData.occasion.length}/50
          </div>
        </div>

        {/* Sender Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-primary font-semibold text-lg font-tajawal">
              <User className="w-5 h-5" />
              اسم المرسل
            </label>
            <input
              type="text"
              value={letterData.senderName}
              onChange={(e) => updateField('senderName', e.target.value)}
              className="w-full p-4 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-lg font-tajawal bg-white/70"
              placeholder="مثال: علي محمد الأحمد"
            />
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-primary font-semibold text-lg font-tajawal">
              <Building className="w-5 h-5" />
              المؤسسة أو الجهة
            </label>
            <input
              type="text"
              value={letterData.senderOrganization}
              onChange={(e) => updateField('senderOrganization', e.target.value)}
              className="w-full p-4 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-lg font-tajawal bg-white/70"
              placeholder="مثال: شركة التقنية المتقدمة"
            />
          </div>
        </div>

        {/* Tone Selection */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-primary font-semibold text-lg font-tajawal">
            <Palette className="w-5 h-5" />
            طبيعة ونبرة الخطاب
          </label>
          <div className="text-sm text-primary/70 font-tajawal mb-2">
            رسمية حازمة: للمخاطبات الرسمية والطلبات الإدارية • ودية هادئة: للتهاني والشكر والمناسبات
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(['رسمية', 'ودية'] as const).map((tone) => (
              <Button
                key={tone}
                type="button"
                variant={letterData.tone === tone ? "default" : "outline"}
                className={`p-4 text-base font-tajawal h-auto ${
                  letterData.tone === tone
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground border-primary'
                    : 'border-border text-primary hover:bg-secondary'
                }`}
                onClick={() => updateField('tone', tone)}
              >
                {tone}
              </Button>
            ))}
          </div>
        </div>

        {/* Letter Length */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-primary font-semibold text-lg font-tajawal">
            <FileText className="w-5 h-5" />
            طول الخطاب
          </label>
          <div className="grid grid-cols-2 gap-4">
            {(['قصير', 'طويل'] as const).map((length) => (
              <Button
                key={length}
                type="button"
                variant={letterData.length === length ? "default" : "outline"}
                className={`p-4 text-base font-tajawal h-auto ${
                  letterData.length === length
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground border-primary'
                    : 'border-border text-primary hover:bg-secondary'
                }`}
                onClick={() => updateField('length', length)}
              >
                {length}
              </Button>
            ))}
          </div>
          <div className="text-sm font-tajawal text-primary/70">
            {letterData.length === 'قصير' && 'من 300 إلى 350 حرف'}
            {letterData.length === 'طويل' && '500 حرف فأكثر'}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4 bg-secondary/50 p-6 rounded-xl border-2 border-border">
          <h3 className="text-primary font-bold text-xl font-tajawal mb-4">
            خيارات إضافية متقدمة
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={letterData.needsTranslation}
                onChange={(e) => updateField('needsTranslation', e.target.checked)}
                className="w-5 h-5 text-primary border-2 border-border rounded focus:ring-primary"
              />
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-tajawal text-primary">
                  إنشاء ترجمة إنجليزية للخطاب
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={letterData.needsDiacritics}
                onChange={(e) => updateField('needsDiacritics', e.target.checked)}
                className="w-5 h-5 text-primary border-2 border-border rounded focus:ring-primary"
              />
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-orange-600" />
                <span className="text-lg font-tajawal text-primary">
                  إضافة التشكيل (الحركات) للنص العربي
                </span>
              </div>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
