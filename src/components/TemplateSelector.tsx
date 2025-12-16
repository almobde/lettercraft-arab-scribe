import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LetterData, LetterTemplate } from '../types/letter';
import { letterTemplates } from '../data/letterTemplates';
import { Sparkles } from 'lucide-react';

interface TemplateSelectorProps {
  onTemplateSelect: (template: LetterTemplate) => void;
}

export const TemplateSelector = ({ onTemplateSelect }: TemplateSelectorProps) => {
  return (
    <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-br from-white to-secondary/30 mb-6">
      <CardHeader className="bg-gradient-to-l from-[hsl(220,100%,15%)] to-[hsl(195,100%,40%)] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl font-tajawal">
          <Sparkles className="w-6 h-6" />
          القوالب الجاهزة
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {letterTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateSelect(template)}
              className="group flex flex-col items-center justify-center p-3 rounded-lg border-2 border-border/50 bg-white/70 hover:bg-secondary/50 hover:border-primary/50 transition-all duration-200 hover:scale-105 hover:shadow-md"
              title={template.title}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {template.icon}
              </div>
              <span className="text-xs font-tajawal text-primary/80 text-center leading-tight group-hover:text-primary">
                {template.title}
              </span>
            </button>
          ))}
        </div>
        
        <p className="text-sm text-primary/60 font-tajawal mt-4 text-center">
          اضغط على أي قالب لملء البيانات تلقائياً، ثم يمكنك تعديل المعلومات حسب الحاجة
        </p>
      </CardContent>
    </Card>
  );
};