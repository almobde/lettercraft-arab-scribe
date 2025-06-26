
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { LetterData } from '../types/letter';
import { User, Briefcase, Target, Building, UserCheck, Volume2, Sparkles, Globe } from 'lucide-react';

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
      {/* Recipient Name */}
      <div className="space-y-2">
        <Label htmlFor="recipientName" className="flex items-center gap-2 text-right">
          <User className="w-4 h-4 text-blue-600" />
          اسم المرسل إليه
        </Label>
        <Input
          id="recipientName"
          placeholder="مثال: الأستاذ محمد بن ناصر"
          value={letterData.recipientName}
          onChange={(e) => handleInputChange('recipientName', e.target.value)}
          className="text-right"
          dir="rtl"
        />
      </div>

      {/* Recipient Title */}
      <div className="space-y-2">
        <Label htmlFor="recipientTitle" className="flex items-center gap-2 text-right">
          <Briefcase className="w-4 h-4 text-green-600" />
          صفته أو وظيفته
        </Label>
        <Input
          id="recipientTitle"
          placeholder="مثال: مشرف تربوي"
          value={letterData.recipientTitle}
          onChange={(e) => handleInputChange('recipientTitle', e.target.value)}
          className="text-right"
          dir="rtl"
        />
      </div>

      {/* Occasion */}
      <div className="space-y-2">
        <Label htmlFor="occasion" className="flex items-center gap-2 text-right">
          <Target className="w-4 h-4 text-purple-600" />
          المناسبة أو الغرض من الخطاب
        </Label>
        <Input
          id="occasion"
          placeholder="مثال: شكر على جهوده في متابعة المعلمين"
          value={letterData.occasion}
          onChange={(e) => handleInputChange('occasion', e.target.value)}
          className="text-right"
          dir="rtl"
        />
      </div>

      {/* Sender Organization */}
      <div className="space-y-2">
        <Label htmlFor="senderOrganization" className="flex items-center gap-2 text-right">
          <Building className="w-4 h-4 text-indigo-600" />
          اسم الجهة المرسِلة
        </Label>
        <Input
          id="senderOrganization"
          placeholder="مثال: إدارة التعليم بمحافظة الخرج"
          value={letterData.senderOrganization}
          onChange={(e) => handleInputChange('senderOrganization', e.target.value)}
          className="text-right"
          dir="rtl"
        />
      </div>

      {/* Sender Name */}
      <div className="space-y-2">
        <Label htmlFor="senderName" className="flex items-center gap-2 text-right">
          <UserCheck className="w-4 h-4 text-teal-600" />
          اسم المرسِل
        </Label>
        <Input
          id="senderName"
          placeholder="مثال: مدير الإدارة - خالد العتيبي"
          value={letterData.senderName}
          onChange={(e) => handleInputChange('senderName', e.target.value)}
          className="text-right"
          dir="rtl"
        />
      </div>

      {/* Tone */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-right">
          <Volume2 className="w-4 h-4 text-orange-600" />
          نغمة الخطاب المطلوبة
        </Label>
        <Select 
          value={letterData.tone} 
          onValueChange={(value) => handleInputChange('tone', value)}
          dir="rtl"
        >
          <SelectTrigger className="text-right">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="رسمية">رسمية</SelectItem>
            <SelectItem value="تحفيزية">تحفيزية</SelectItem>
            <SelectItem value="أدبية">أدبية</SelectItem>
            <SelectItem value="ودية">ودية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Options */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="translation" className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              هل ترغب بترجمة الخطاب؟
            </Label>
            <Switch
              id="translation"
              checked={letterData.needsTranslation}
              onCheckedChange={(checked) => handleInputChange('needsTranslation', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="creative" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              هل ترغب بصيغة إبداعية مختلفة؟
            </Label>
            <Switch
              id="creative"
              checked={letterData.needsCreativeVersion}
              onCheckedChange={(checked) => handleInputChange('needsCreativeVersion', checked)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
