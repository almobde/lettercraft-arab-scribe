
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
    <Card className="shadow-xl border-2 border-green-200 bg-gradient-to-br from-white to-green-50/30">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
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
            <label className="flex items-center gap-2 text-green-700 font-semibold text-lg font-tajawal">
              <User className="w-5 h-5" />
              اسم المرسل إليه
            </label>
            <input
              type="text"
              value={letterData.recipientName}
              onChange={(e) => updateField('recipientName', e.target.value)}
              className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none text-lg font-tajawal bg-white/70"
              placeholder="مثال: محمد أحمد السعودي"
            />
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-green-700 font-semibold text-lg font-tajawal">
              <Building className="w-5 h-5" />
              المنصب أو الصفة
            </label>
            <input
              type="text"
              value={letterData.recipientTitle}
              onChange={(e) => updateField('recipientTitle', e.target.value)}
              className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none text-lg font-tajawal bg-white/70"
              placeholder="مثال: مدير عام الشركة"
            />
          </div>
        </div>

        {/* Occasion */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-green-700 font-semibold text-lg font-tajawal">
            <Calendar className="w-5 h-5" />
            المناسبة أو الموضوع (100 حرف على الأقل)
          </label>
          <textarea
            value={letterData.occasion}
            onChange={(e) => updateField('occasion', e.target.value)}
            className={`w-full p-4 border-2 rounded-lg focus:outline-none text-lg font-tajawal bg-white/70 min-h-[120px] ${
              letterData.occasion.length < 100 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-green-200 focus:border-green-500'
            }`}
            placeholder="مثال: دعوة لحضور المؤتمر السنوي للشركة... (يجب أن يكون النص 100 حرف على الأقل)"
            minLength={100}
          />
          <div className={`text-sm font-tajawal ${
            letterData.occasion.length < 100 ? 'text-red-600' : 'text-green-600'
          }`}>
            عدد الأحرف: {letterData.occasion.length}/100
          </div>
        </div>

        {/* Sender Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-green-700 font-semibold text-lg font-tajawal">
              <User className="w-5 h-5" />
              اسم المرسل
            </label>
            <input
              type="text"
              value={letterData.senderName}
              onChange={(e) => updateField('senderName', e.target.value)}
              className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none text-lg font-tajawal bg-white/70"
              placeholder="مثال: علي محمد الأحمد"
            />
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-green-700 font-semibold text-lg font-tajawal">
              <Building className="w-5 h-5" />
              المؤسسة أو الجهة
            </label>
            <input
              type="text"
              value={letterData.senderOrganization}
              onChange={(e) => updateField('senderOrganization', e.target.value)}
              className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none text-lg font-tajawal bg-white/70"
              placeholder="مثال: شركة التقنية المتقدمة"
            />
          </div>
        </div>

        {/* Tone Selection */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-green-700 font-semibold text-lg font-tajawal">
            <Palette className="w-5 h-5" />
            طبيعة ونبرة الخطاب
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['رسمية', 'تحفيزية', 'أدبية', 'ودية'] as const).map((tone) => (
              <Button
                key={tone}
                type="button"
                variant={letterData.tone === tone ? "default" : "outline"}
                className={`p-4 text-base font-tajawal h-auto ${
                  letterData.tone === tone
                    ? 'bg-green-600 hover:bg-green-700 text-white border-green-600'
                    : 'border-green-300 text-green-700 hover:bg-green-50'
                }`}
                onClick={() => updateField('tone', tone)}
              >
                {tone}
              </Button>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4 bg-green-50/50 p-6 rounded-xl border-2 border-green-100">
          <h3 className="text-green-800 font-bold text-xl font-tajawal mb-4">
            خيارات إضافية متقدمة
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={letterData.needsTranslation}
                onChange={(e) => updateField('needsTranslation', e.target.checked)}
                className="w-5 h-5 text-green-600 border-2 border-green-300 rounded focus:ring-green-500"
              />
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-tajawal text-green-700">
                  إنشاء ترجمة إنجليزية للخطاب
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={letterData.needsDiacritics}
                onChange={(e) => updateField('needsDiacritics', e.target.checked)}
                className="w-5 h-5 text-green-600 border-2 border-green-300 rounded focus:ring-green-500"
              />
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-orange-600" />
                <span className="text-lg font-tajawal text-green-700">
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
