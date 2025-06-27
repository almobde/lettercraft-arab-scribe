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
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-4">
          <Label htmlFor="recipientName" className="text-right block text-green-800 font-semibold text-xl flex items-center gap-2">
            📛 اسم المرسل إليه
          </Label>
          <Input
            id="recipientName"
            value={letterData.recipientName}
            onChange={(e) => handleInputChange('recipientName', e.target.value)}
            placeholder="مثال: محمد بن ناصر العتيبي"
            className="text-right font-tajawal text-xl bg-white h-20 px-8 text-gray-800 placeholder:text-gray-500 border-2"
            dir="rtl"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="recipientTitle" className="text-right block text-green-800 font-semibold text-xl flex items-center gap-2">
            🏷️ منصبه أو وظيفته
          </Label>
          <Input
            id="recipientTitle"
            value={letterData.recipientTitle}
            onChange={(e) => handleInputChange('recipientTitle', e.target.value)}
            placeholder="مثال: مدير إدارة التعليم - مشرف تربوي - رئيس قسم"
            className="text-right font-tajawal text-xl bg-white h-20 px-8 text-gray-800 placeholder:text-gray-500 border-2"
            dir="rtl"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="occasion" className="text-right block text-green-800 font-semibold text-xl flex items-center gap-2">
            🎯 المناسبة أو الغرض من الخطاب
          </Label>
          <Input
            id="occasion"
            value={letterData.occasion}
            onChange={(e) => handleInputChange('occasion', e.target.value)}
            placeholder="مثال: شكر على جهوده المتميزة في تطوير العملية التعليمية"
            className="text-right font-tajawal text-xl bg-white h-20 px-8 text-gray-800 placeholder:text-gray-500 border-2"
            dir="rtl"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="senderOrganization" className="text-right block text-green-800 font-semibold text-xl flex items-center gap-2">
            🏢 اسم الجهة المرسِلة
          </Label>
          <Input
            id="senderOrganization"
            value={letterData.senderOrganization}
            onChange={(e) => handleInputChange('senderOrganization', e.target.value)}
            placeholder="مثال: إدارة التعليم بمحافظة الخرج - وزارة التعليم"
            className="text-right font-tajawal text-xl bg-white h-20 px-8 text-gray-800 placeholder:text-gray-500 border-2"
            dir="rtl"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="senderName" className="text-right block text-green-800 font-semibold text-xl flex items-center gap-2">
            🧑‍💼 اسم المرسِل
          </Label>
          <Input
            id="senderName"
            value={letterData.senderName}
            onChange={(e) => handleInputChange('senderName', e.target.value)}
            placeholder="مثال: خالد العتيبي - مدير الإدارة"
            className="text-right font-tajawal text-xl bg-white h-24 px-8 text-green-800 font-semibold placeholder:text-gray-500 border-2"
            dir="rtl"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-right block text-green-800 font-bold text-lg flex items-center gap-2">
            🎨 نغمة الخطاب المطلوبة
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {(['رسمية', 'تحفيزية', 'أدبية', 'ودية'] as const).map((tone) => (
              <Button
                key={tone}
                variant={letterData.tone === tone ? 'default' : 'outline'}
                onClick={() => handleInputChange('tone', tone)}
                className={`text-base font-tajawal py-3 h-12 ${
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

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white/90 rounded-lg border border-teal-200">
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

          <div className="flex items-center gap-4 p-4 bg-white/90 rounded-lg border border-teal-200">
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

          <div className="flex items-center gap-4 p-4 bg-white/90 rounded-lg border border-teal-200">
            <input
              type="checkbox"
              id="needsDiacritics"
              checked={letterData.needsDiacritics}
              onChange={(e) => handleInputChange('needsDiacritics', e.target.checked)}
              className="w-5 h-5 text-green-600 border-green-300 rounded focus:ring-green-500"
            />
            <Label htmlFor="needsDiacritics" className="text-right text-teal-800 font-semibold text-lg">
              🎭 هل ترغب بتشكيل النص (الحركات)؟
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
