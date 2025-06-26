
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="recipientName" className="text-right block mb-2">
            📛 اسم المرسل إليه
          </Label>
          <Input
            id="recipientName"
            value={letterData.recipientName}
            onChange={(e) => handleInputChange('recipientName', e.target.value)}
            placeholder="مثال: الأستاذ محمد بن ناصر"
            className="text-right"
            dir="rtl"
          />
        </div>

        <div>
          <Label htmlFor="recipientTitle" className="text-right block mb-2">
            🏷️ صفته أو وظيفته
          </Label>
          <Input
            id="recipientTitle"
            value={letterData.recipientTitle}
            onChange={(e) => handleInputChange('recipientTitle', e.target.value)}
            placeholder="مثال: مشرف تربوي"
            className="text-right"
            dir="rtl"
          />
        </div>

        <div>
          <Label htmlFor="occasion" className="text-right block mb-2">
            🎯 المناسبة أو الغرض من الخطاب
          </Label>
          <Input
            id="occasion"
            value={letterData.occasion}
            onChange={(e) => handleInputChange('occasion', e.target.value)}
            placeholder="مثال: شكر على جهوده في متابعة المعلمين"
            className="text-right"
            dir="rtl"
          />
        </div>

        <div>
          <Label htmlFor="senderOrganization" className="text-right block mb-2">
            🏢 اسم الجهة المرسِلة
          </Label>
          <Input
            id="senderOrganization"
            value={letterData.senderOrganization}
            onChange={(e) => handleInputChange('senderOrganization', e.target.value)}
            placeholder="مثال: إدارة التعليم بمحافظة الخرج"
            className="text-right"
            dir="rtl"
          />
        </div>

        <div>
          <Label htmlFor="senderName" className="text-right block mb-2">
            🧑‍💼 اسم المرسِل
          </Label>
          <Input
            id="senderName"
            value={letterData.senderName}
            onChange={(e) => handleInputChange('senderName', e.target.value)}
            placeholder="مثال: مدير الإدارة - خالد العتيبي"
            className="text-right"
            dir="rtl"
          />
        </div>

        <div>
          <Label className="text-right block mb-2">
            🎨 نغمة الخطاب المطلوبة
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {(['رسمية', 'تحفيزية', 'أدبية', 'ودية'] as const).map((tone) => (
              <Button
                key={tone}
                variant={letterData.tone === tone ? 'default' : 'outline'}
                onClick={() => handleInputChange('tone', tone)}
                className="text-sm"
              >
                {tone}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="needsTranslation"
              checked={letterData.needsTranslation}
              onChange={(e) => handleInputChange('needsTranslation', e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="needsTranslation" className="text-right">
              🌍 هل ترغب بترجمة الخطاب؟
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="needsCreativeVersion"
              checked={letterData.needsCreativeVersion}
              onChange={(e) => handleInputChange('needsCreativeVersion', e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="needsCreativeVersion" className="text-right">
              ✍️ هل ترغب بصيغة إبداعية مختلفة للخطاب؟
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
