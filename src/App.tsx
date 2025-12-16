
import { useState } from 'react';
import { LetterData, LetterTemplate } from './types/letter';
import { LetterPreview } from './components/LetterPreview';
import { LetterForm } from './components/LetterForm';
import { TemplateSelector } from './components/TemplateSelector';
import { Toaster } from 'sonner';
import logoTitle from '@/assets/logo-title.png';
import authorName from '@/assets/author-name.png';

function App() {
  const [letterData, setLetterData] = useState<LetterData>({
    recipientName: '',
    recipientTitle: '',
    occasion: '',
    senderOrganization: '',
    senderName: '',
    tone: 'رسمية',
    length: 'طويل',
    needsTranslation: false,
    needsDiacritics: false,
  });

  const handleTemplateSelect = (template: LetterTemplate) => {
    setLetterData(prev => ({
      ...prev,
      occasion: template.occasion,
      tone: template.tone,
      length: template.length
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <img
            src={logoTitle}
            alt="ديوان المراسلات الرسمية"
            className="h-20 md:h-24 mx-auto mb-4"
          />
          <p className="text-primary/70 text-lg font-tajawal">
            منصة إنشاء الخطابات الرسمية بالذكاء الاصطناعي
          </p>
        </div>
        
        <TemplateSelector onTemplateSelect={handleTemplateSelect} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-6 lg:max-w-xl">
            <LetterForm letterData={letterData} setLetterData={setLetterData} />
          </div>
          
          <div className="space-y-6 lg:max-w-xl">
            <LetterPreview letterData={letterData} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-border/50 pt-8 pb-6">
          <div className="text-center text-primary/60 font-tajawal">
            <p className="text-sm mb-4">فكرة وتصميم</p>
            <img
              src={authorName}
              alt="عبد العزيز بن محمد آل خنين"
              className="h-12 md:h-14 mx-auto mb-4"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm">
              <a 
                href="mailto:almobde.com@gmail.com" 
                className="hover:text-primary transition-colors"
              >
                almobde.com@gmail.com
              </a>
              <a 
                href="tel:+966555255837" 
                className="hover:text-primary transition-colors"
                dir="ltr"
              >
                +966 555 255 837
              </a>
            </div>
          </div>
        </footer>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
