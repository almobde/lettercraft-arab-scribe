
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50 font-tajawal relative overflow-hidden" dir="rtl">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z" fill="url(#wave1)">
            <animate attributeName="d" dur="20s" repeatCount="indefinite" 
              values="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z;
                      M0,400 C400,100 800,700 1200,400 L1200,800 L0,800 Z;
                      M0,400 C200,300 700,500 1200,400 L1200,800 L0,800 Z;
                      M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z"/>
          </path>
          <path d="M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z" fill="url(#wave2)">
            <animate attributeName="d" dur="15s" repeatCount="indefinite" 
              values="M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z;
                      M0,500 C300,200 900,800 1200,500 L1200,800 L0,800 Z;
                      M0,500 C500,400 700,600 1200,500 L1200,800 L0,800 Z;
                      M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z"/>
          </path>
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#047857" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-xl relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              مُولِّد الخطابات الرسمية
            </h1>
            <p className="text-green-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              إنشاء خطابات رسمية احترافية وراقية بأسلوب مميز
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-green-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 p-8 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <span className="text-white text-xl">✍️</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  معلومات الخطاب
                </h2>
              </div>
              <div className="bg-white rounded-xl p-6">
                <LetterForm 
                  letterData={letterData}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-green-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 p-8 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <span className="text-white text-xl">📄</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  معاينة الخطاب
                </h2>
              </div>
              <LetterPreview letterData={letterData} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-emerald-800 border-t border-green-200 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-green-100 text-lg font-medium">
              مُولِّد الخطابات الرسمية - تطبيق احترافي لكتابة الخطابات
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
