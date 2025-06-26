
import { useState } from 'react';
import { LetterForm } from '../components/LetterForm';
import { LetterPreview } from '../components/LetterPreview';
import { LetterData } from '../types/letter';

const Index = () => {
  const [letterData, setLetterData] = useState<LetterData>({
    recipientName: '',
    recipientTitle: '',
    occasion: '',
    senderOrganization: '',
    senderName: '',
    tone: 'رسمية',
    needsTranslation: false,
    needsCreativeVersion: false,
    needsDiacritics: false
  });

  const handleFormChange = (data: LetterData) => {
    setLetterData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50 font-tajawal" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              مُولِّد الخطابات الرسمية
            </h1>
            <p className="text-green-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              إنشاء خطابات رسمية احترافية وراقية بأسلوب مميز وتفاصيل شاملة
            </p>
            <div className="mt-6 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-green-100 text-sm font-medium">✨ تصميم عصري وأنيق ✨</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 p-8 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <span className="text-white text-xl">✍️</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 p-8 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <span className="text-white text-xl">📄</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800 bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  معاينة الخطاب
                </h2>
              </div>
              <LetterPreview letterData={letterData} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-emerald-800 border-t border-green-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-green-100 text-lg font-medium mb-2">
              مُولِّد الخطابات الرسمية - تطبيق احترافي لكتابة الخطابات
            </p>
            <p className="text-green-200 text-sm">
              تصميم عصري وأنيق لخدمتكم المتميزة
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
