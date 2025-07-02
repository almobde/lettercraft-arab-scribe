
import { useState } from 'react';
import { LetterData } from '../types/letter';
import { LetterPreview } from '../components/LetterPreview';
import { LetterForm } from '../components/LetterForm';
import { Toaster } from 'sonner';

function Index() {
  const [letterData, setLetterData] = useState<LetterData>({
    recipientName: '',
    recipientTitle: '',
    occasion: '',
    senderOrganization: '',
    senderName: '',
    tone: 'رسمية',
    length: 'متوسط',
    needsTranslation: false,
    needsDiacritics: false,
  });

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 font-tajawal">
            🏛️ ديوان المراسلات الرسمية
          </h1>
          <p className="text-primary/70 text-lg font-tajawal">
            منصة إنشاء الخطابات الرسمية بالذكاء الاصطناعي
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <LetterForm letterData={letterData} setLetterData={setLetterData} />
          </div>
          
          <div className="space-y-6">
            <LetterPreview letterData={letterData} />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Index;
