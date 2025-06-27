
const OPENAI_API_KEY = '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';

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const getTargetCharacterCount = (length: 'قصير' | 'متوسط' | 'طويل'): { min: number; max: number } => {
  switch (length) {
    case 'قصير':
      return { min: 200, max: 300 };
    case 'متوسط':
      return { min: 350, max: 450 };
    case 'طويل':
      return { min: 550, max: 700 };
  }
};

const createLetterPrompt = (
  recipientName: string,
  recipientTitle: string,
  occasion: string,
  tone: string,
  senderName: string,
  senderOrganization: string,
  letterLength: 'قصير' | 'متوسط' | 'طويل'
): string => {
  const { min, max } = getTargetCharacterCount(letterLength);
  
  // Determine if it's congratulations or thanks
  const isGraduationOrCongrats = occasion.includes('تخرج') || occasion.includes('نجاح') || 
    occasion.includes('ترقية') || occasion.includes('إنجاز') || occasion.includes('تفوق') ||
    occasion.includes('مولود') || occasion.includes('زواج') || occasion.includes('عرس');
  
  const mainVerb = isGraduationOrCongrats ? 'نهنئكم' : 'نشكركم';
  const mainPhrase = isGraduationOrCongrats ? 'أطيب التهاني' : 'جزيل الشكر';
  
  return `اكتب خطاب رسمي باللغة العربية ${letterLength === 'قصير' ? 'قصير ومركز' : letterLength === 'متوسط' ? 'متوسط الطول' : 'مفصل'} بطول ${min}-${max} حرف تقريباً.

المعلومات:
- المرسل إليه: ${recipientName}
- المنصب: ${recipientTitle}
- المناسبة: ${occasion}
- النبرة: ${tone}
- المرسل: ${senderName}
- الجهة: ${senderOrganization}

متطلبات مهمة:
1. ابدأ بـ "بسم الله الرحمن الرحيم" ثم التاريخ الهجري والميلادي
2. لا تستخدم "سعادة" أو "المحترم" أو "المحترمة" - استخدم الاسم مباشرة
3. استخدم "${mainVerb}" و"${mainPhrase}" كأساس للخطاب
4. اجعل النبرة ${tone}
5. اختتم بالسلام والتوقيع
6. التزم بالطول المطلوب: ${min}-${max} حرف

اكتب الخطاب مباشرة بدون مقدمات.`;
};

const createEnglishPrompt = (
  recipientName: string,
  recipientTitle: string,
  occasion: string,
  tone: string,
  senderName: string,
  senderOrganization: string,
  letterLength: 'قصير' | 'متوسط' | 'طويل'
): string => {
  const { min, max } = getTargetCharacterCount(letterLength);
  
  return `Write a formal English letter of ${min}-${max} characters approximately.

Information:
- Recipient: ${recipientName}
- Title: ${recipientTitle}
- Occasion: ${occasion}
- Tone: ${tone}
- Sender: ${senderName}
- Organization: ${senderOrganization}

Requirements:
1. Start with date
2. Use "Dear" + name directly (no "The Honorable")
3. Match the ${tone} tone
4. End with formal closing and signature
5. Keep length between ${min}-${max} characters

Write the letter directly without introductions.`;
};

export const generateWithOpenAI = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'أنت خبير في كتابة الخطابات الرسمية باللغة العربية والإنجليزية. اكتب بأسلوب راقي ومهني.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export { createLetterPrompt, createEnglishPrompt };
