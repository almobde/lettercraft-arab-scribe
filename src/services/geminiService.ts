
const GEMINI_API_KEY = 'AIzaSyDjuebC4GFsPzdwGxhy52vrNInnNLf-tOk';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

export const generateWithGemini = async (prompt: string): Promise<string> => {
  const requestBody: GeminiRequest = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the generated text from Gemini's response
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('Invalid response format from Gemini API');
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

export const createLetterPrompt = (recipientName: string, recipientTitle: string, occasion: string, tone: string, senderName: string, senderOrganization: string): string => {
  return `اكتب خطاب رسمي باللغة العربية بالمواصفات التالية:

المرسل إليه: ${recipientName}
منصبه: ${recipientTitle}
المناسبة: ${occasion}
نوع الخطاب: ${tone}
اسم المرسل: ${senderName}
الجهة المرسلة: ${senderOrganization}

متطلبات الخطاب:
1. ابدأ بـ "بسم الله الرحمن الرحيم"
2. اكتب التاريخ في الأعلى
3. اكتب "سعادة ${recipientTitle}" ثم اسم المرسل إليه في السطر التالي
4. ابدأ بـ "السلام عليكم ورحمة الله وبركاته"
5. اكتب نص الخطاب بأسلوب ${tone} وبتفاصيل غنية (لا يقل عن 600 حرف)
6. اختتم بـ "وتقبلوا منا فائق الاحترام والتقدير"
7. اكتب اسم المرسل والجهة في النهاية

مهم جداً:
- استخدم ضمير المخاطب "أنتم/كم" وليس الغائب "هو/ها"
- اجعل النص راقياً ومفصلاً
- تأكد من صحة النحو والإملاء`;
};
