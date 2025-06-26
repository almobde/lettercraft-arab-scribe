
import { useState } from 'react';
import { LetterForm } from '../components/LetterForm';
import { LetterPreview } from '../components/LetterPreview';
import { LetterData } from '../types/letter';
import { FileText, PenTool } from 'lucide-react';

const Index = () => {
  const [letterData, setLetterData] = useState<LetterData>({
    recipientName: '',
    recipientTitle: '',
    occasion: '',
    senderOrganization: '',
    senderName: '',
    tone: 'رسمية',
    needsTranslation: false,
    needsCreativeVersion: false
  });

  const handleFormChange = (data: LetterData) => {
    setLetterData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                مُولِّد الخطابات الرسمية
              </h1>
              <p className="text-gray-600 text-sm">
                إنشاء خطابات رسمية احترافية بطريقة سهلة ومختصرة
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <PenTool className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  معلومات الخطاب
                </h2>
              </div>
              <LetterForm 
                letterData={letterData}
                onChange={handleFormChange}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                معاينة الخطاب
              </h2>
              <LetterPreview letterData={letterData} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            مُولِّد الخطابات الرسمية - تطبيق احترافي لكتابة الخطابات
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
