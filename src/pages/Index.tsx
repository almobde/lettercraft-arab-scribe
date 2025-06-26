
import { useState } from 'react';
import { LetterForm } from '../components/LetterForm';
import { LetterPreview } from '../components/LetterPreview';
import { LetterData, SavedLetter } from '../types/letter';

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

  const [selectedLetter, setSelectedLetter] = useState<SavedLetter | null>(null);

  const handleFormChange = (data: LetterData) => {
    setLetterData(data);
    setSelectedLetter(null); // Clear selected letter when form changes
  };

  const handleLetterSelect = (letter: SavedLetter | null) => {
    setSelectedLetter(letter);
    if (letter) {
      setLetterData(letter.letterData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50 font-tajawal relative overflow-hidden" dir="rtl">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-20 z-0">
        <svg className="absolute w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4"/>
              <stop offset="50%" stopColor="#059669" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#047857" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#047857" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#065f46" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#047857" stopOpacity="0.2"/>
              <stop offset="50%" stopColor="#065f46" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          
          <path fill="url(#wave1)">
            <animate attributeName="d" 
              dur="15s" 
              repeatCount="indefinite"
              values="M0,320 C320,280 420,360 800,320 C1000,300 1200,340 1200,320 L1200,800 L0,800 Z;
                      M0,350 C300,310 500,390 900,350 C1100,330 1200,370 1200,350 L1200,800 L0,800 Z;
                      M0,300 C250,260 350,340 700,300 C900,280 1200,320 1200,300 L1200,800 L0,800 Z;
                      M0,320 C320,280 420,360 800,320 C1000,300 1200,340 1200,320 L1200,800 L0,800 Z"/>
          </path>
          
          <path fill="url(#wave2)">
            <animate attributeName="d" 
              dur="20s" 
              repeatCount="indefinite"
              values="M0,400 C400,360 600,440 1000,400 C1100,380 1200,420 1200,400 L1200,800 L0,800 Z;
                      M0,430 C350,390 550,470 950,430 C1050,410 1200,450 1200,430 L1200,800 L0,800 Z;
                      M0,380 C300,340 500,420 800,380 C1000,360 1200,400 1200,380 L1200,800 L0,800 Z;
                      M0,400 C400,360 600,440 1000,400 C1100,380 1200,420 1200,400 L1200,800 L0,800 Z"/>
          </path>
          
          <path fill="url(#wave3)">
            <animate attributeName="d" 
              dur="25s" 
              repeatCount="indefinite"
              values="M0,500 C500,460 700,540 1100,500 C1150,480 1200,520 1200,500 L1200,800 L0,800 Z;
                      M0,530 C450,490 650,570 1050,530 C1100,510 1200,550 1200,530 L1200,800 L0,800 Z;
                      M0,480 C400,440 600,520 900,480 C1050,460 1200,500 1200,480 L1200,800 L0,800 Z;
                      M0,500 C500,460 700,540 1100,500 C1150,480 1200,520 1200,500 L1200,800 L0,800 Z"/>
          </path>
        </svg>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-xl relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
              ديوان المراسلات
            </h1>
            <p className="text-green-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              إنشاء خطابات رسمية احترافية وراقية بأسلوب مميز وإبداعي
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="space-y-8">
          {/* Form Section - Full Width */}
          <div className="w-full">
            <div className="bg-green-900/95 backdrop-blur-sm shadow-2xl border border-green-200 hover:shadow-3xl transition-all duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  معلومات الخطاب
                </h2>
                <div className="bg-white rounded-xl p-8">
                  <LetterForm 
                    letterData={letterData}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section - Full Width */}
          <div className="w-full">
            <div className="bg-green-900/95 backdrop-blur-sm shadow-2xl border border-green-200 hover:shadow-3xl transition-all duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                    <span className="text-white text-xl">📄</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white text-center">
                    معاينة الخطاب
                  </h2>
                </div>
                <LetterPreview 
                  letterData={letterData} 
                  selectedLetter={selectedLetter}
                  onLetterSelect={handleLetterSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-emerald-800 border-t border-green-200 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <p className="text-green-100 text-lg font-medium">
              ديوان المراسلات - تطبيق احترافي لكتابة الخطابات الرسمية
            </p>
            <div className="border-t border-green-700 pt-4">
              <p className="text-green-200 text-sm">
                فكرة وتصميم: عبد العزيز الخنين
              </p>
              <a 
                href="https://linktr.ee/alkhonin837" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-300 hover:text-white transition-colors duration-200 text-sm underline"
              >
                linktr.ee/alkhonin837
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
