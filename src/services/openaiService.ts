
const OPENAI_API_KEY = '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'; // ضع مفتاح OpenAI الخاص بك هنا
export const generateWithOpenAI = async (prompt: string): Promise<string> => {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
    throw new Error('لم يتم تكوين مفتاح OpenAI. يرجى التواصل مع المطور.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
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
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        throw new Error('مفتاح OpenAI غير صحيح أو منتهي الصلاحية. يرجى التحقق من المفتاح.');
      } else if (response.status === 429) {
        throw new Error('تم تجاوز حد الاستخدام. يرجى المحاولة لاحقاً.');
      } else if (response.status === 403) {
        throw new Error('ليس لديك صلاحية للوصول لهذا النموذج. يرجى التحقق من اشتراكك.');
      } else {
        throw new Error(`خطأ في الخدمة: ${response.status} - ${errorData.error?.message || 'خطأ غير معروف'}`);
      }
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('استجابة غير صحيحة من الخدمة. يرجى المحاولة مرة أخرى.');
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('فشل في الاتصال بخدمة OpenAI. يرجى التحقق من الاتصال بالإنترنت.');
    }
  }
};

export const createLetterPrompt = (
  recipientName: string,
  recipientTitle: string,
  occasion: string,
  tone: string,
  senderName: string,
  senderOrganization: string
): string => {
  return `اكتب خطاباً رسمياً باللغة العربية بالمواصفات التالية:

المرسل إليه: ${recipientName}
المنصب: ${recipientTitle}
المناسبة: ${occasion}
طبيعة الخطاب: ${tone}
اسم المرسل: ${senderName}
المؤسسة: ${senderOrganization}

المطلوب:
1. ابدأ بالبسملة في المنتصف
2. اكتب التاريخ الهجري والميلادي
3. اكتب اسم المرسل إليه ومنصبه في المنتصف
4. اكتب خطاباً مفصلاً (أكثر من 600 حرف) بأسلوب راقي ومهذب
5. استخدم عبارات الترحيب والتقدير المناسبة
6. اختتم بالتوقيع في المنتصف

يجب أن يكون الخطاب مفصلاً وباللغة العربية الفصحى.`;
};

export const createEnglishPrompt = (
  recipientName: string,
  recipientTitle: string,
  occasion: string,
  tone: string,
  senderName: string,
  senderOrganization: string
): string => {
  return `Write a formal letter in English with the following specifications:

Recipient: ${recipientName}
Title: ${recipientTitle}
Occasion: ${occasion}
Tone: ${tone}
Sender: ${senderName}
Organization: ${senderOrganization}

Requirements:
1. Start with appropriate formal greeting
2. Include the date
3. Write recipient's name and title
4. Write a detailed letter (more than 600 characters) in professional and respectful style
5. Use appropriate courtesy phrases and expressions of respect
6. End with proper formal closing and signature

The letter should be detailed and in proper formal English.`;
};
