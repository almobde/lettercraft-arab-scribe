
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LetterData } from '../types/letter';

interface LetterFormProps {
  letterData: LetterData;
  onChange: (data: LetterData) => void;
}

export const LetterForm = ({ letterData, onChange }: LetterFormProps) => {
  const handleInputChange = (field: keyof LetterData, value: string | boolean) => {
    onChange({
      ...letterData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-green-50/50 p-6 rounded-xl border border-green-200">
          <Label htmlFor="recipientName" className="text-right block mb-3 text-green-800 font-semibold text-lg">
            📛 اسم المرسل إليه
          </Label>
          <Input
            id="recipientName"
            value={letterData.recipientName}
            onChange={(e) => handleInputChange('recipientName', e.target.value)}
            placeholder="مثال: الأستاذ محمد بن ناصر"
            className="text-right font-tajawal text-lg border-green-300 focus:border-green-500 bg-white/80"
            dir="rtl"
          />
        </div>

        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-200">
          <Label htmlFor="recipientTitle" className="text-right block mb-3 text-emerald-800 font-semibold text-lg">
            🏷️ صفته أو وظيفته
          </Label>
          <Input
            id="recipientTitle"
            value={letterData.recipientTitle}
            onChange={(e) => handleInputChange('recipientTitle', e.target.value)}
            placeholder="مثال: مشرف تربوي - رئيس قسم - مدير إدارة"
            className="text-right font-tajawal text-lg border-emerald-300 focus:border-emerald-500 bg-white/80"
            dir="rtl"
          />
        </div>

        <div className="bg-teal-50/50 p-6 rounded-xl border border-teal-200">
          <Label htmlFor="occasion" className="text-right block mb-3 text-teal-800 font-semibold text-lg">
            🎯 المناسبة أو الغرض من الخطاب
          </Label>
          <Input
            id="occasion"
            value={letterData.occasion}
            onChange={(e) => handleInputChange('occasion', e.target.value)}
            placeholder="مثال: شكر على جهوده المتميزة في متابعة المعلمين وتطوير العملية التعليمية"
            className="text-right font-tajawal text-lg border-teal-300 focus:border-teal-500 bg-white/80"
            dir="rtl"
          />
        </div>

        <div className="bg-green-50/50 p-6 rounded-xl border border-green-200">
          <Label htmlFor="senderOrganization" className="text-right block mb-3 text-green-800 font-semibold text-lg">
            🏢 اسم الجهة المرسِلة
          </Label>
          <Input
            id="senderOrganization"
            value={letterData.senderOrganization}
            onChange={(e) => handleInputChange('senderOrganization', e.target.value)}
            placeholder="مثال: إدارة التعليم بمحافظة الخرج - وزارة التعليم"
            className="text-right font-tajawal text-lg border-green-300 focus:border-green-500 bg-white/80"
            dir="rtl"
          />
        </div>

        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-200">
          <Label htmlFor="senderName" className="text-right block mb-3 text-emerald-800 font-semibold text-lg">
            🧑‍💼 اسم المرسِل
          </Label>
          <Input
            id="senderName"
            value={letterData.senderName}
            onChange={(e) => handleInputChange('senderName', e.target.value)}
            placeholder="مثال: مدير الإدارة - خالد العتيبي"
            className="text-right font-tajawal text-lg border-emerald-300 focus:border-emerald-500 bg-white/80"
            dir="rtl"
          />
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <Label className="text-right block mb-4 text-green-800 font-bold text-lg">
            🎨 نغمة الخطاب المطلوبة
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {(['رسمية', 'تحفيزية', 'أدبية', 'ودية'] as const).map((tone) => (
              <Button
                key={tone}
                variant={letterData.tone === tone ? 'default' : 'outline'}
                onClick={() => handleInputChange('tone', tone)}
                className={`text-base font-tajawal py-3 ${
                  letterData.tone === tone 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                    : 'border-green-300 text-green-700 hover:bg-green-50'
                }`}
              >
                {tone}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-xl border border-teal-200 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white/60 rounded-lg border border-teal-200">
            <input
              type="checkbox"
              id="needsTranslation"
              checked={letterData.needsTranslation}
              onChange={(e) => handleInputChange('needsTranslation', e.target.checked)}
              className="w-5 h-5 text-green-600 border-green-300 rounded focus:ring-green-500"
            />
            <Label htmlFor="needsTranslation" className="text-right text-teal-800 font-semibold text-lg">
              🌍 هل ترغب بترجمة الخطاب للإنجليزية؟
            </Label>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/60 rounded-lg border border-teal-200">
            <input
              type="checkbox"
              id="needsCreativeVersion"
              checked={letterData.needsCreativeVersion}
              onChange={(e) => handleInputChange('needsCreativeVersion', e.target.checked)}
              className="w-5 h-5 text-green-600 border-green-300 rounded focus:ring-green-500"
            />
            <Label htmlFor="needsCreativeVersion" className="text-right text-teal-800 font-semibold text-lg">
              ✍️ هل ترغب بصيغة إبداعية مختلفة للخطاب؟
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
