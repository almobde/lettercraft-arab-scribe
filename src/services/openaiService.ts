
interface OpenAIRequest {
  recipientName: string;
  recipientTitle: string;
  occasion: string;
  senderOrganization: string;
  senderName: string;
  tone: 'رسمية' | 'تحفيزية' | 'أدبية' | 'ودية';
  letterLength: 'قصير' | 'متوسط' | 'طويل';
  needsDiacritics: boolean;
}

async function sendToChatGPT(promptText: string) {
  // الحصول على مفتاح API من localStorage
  const apiKey = localStorage.getItem('openai_api_key');
  
  if (!apiKey) {
    throw new Error('يرجى إدخال مفتاح OpenAI API أولاً');
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-2025-04-14",
      messages: [{ role: "user", content: promptText }],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

const buildPrompt = (data: OpenAIRequest, isCreative: boolean = false) => {
  // تحديد نوع المناسبة
  const isCongratulatoryOccasion = data.occasion.includes('ترقية') || 
                                   data.occasion.includes('مولود') || 
                                   data.occasion.includes('زواج') || 
                                   data.occasion.includes('تخرج') || 
                                   data.occasion.includes('نجاح') ||
                                   data.occasion.includes('إنجاز') ||
                                   data.occasion.includes('تهنئة');

  const occasionType = isCongratulatoryOccasion ? 'تهنئة' : 'شكر';
  
  // تحديد الطول المطلوب بدقة
  let lengthInstruction = '';
  switch (data.letterLength) {
    case 'قصير':
      lengthInstruction = 'اكتب خطاباً قصيراً جداً بين 200-300 حرف فقط. يجب أن يكون مختصراً ومباشراً.';
      break;
    case 'متوسط':
      lengthInstruction = 'اكتب خطاباً متوسط الطول بين 300-450 حرف. توازن مناسب بين الإيجاز والتفصيل.';
      break;
    case 'طويل':
      lengthInstruction = 'اكتب خطاباً مفصلاً وطويلاً بأكثر من 550 حرف. يجب أن يكون غنياً بالتفاصيل والعبارات الراقية.';
      break;
  }

  const styleInstruction = isCreative ? 
    'اكتب بأسلوب إبداعي مميز وفريد مع استخدام عبارات شاعرية وصور بلاغية جميلة.' :
    `اكتب بنغمة ${data.tone}.`;

  const diacriticsInstruction = data.needsDiacritics ? 
    'يجب تشكيل النص بالكامل (إضافة الحركات).' : 
    'لا تضع تشكيل على النص.';

  return `أنت كاتب خطابات رسمية محترف. ${lengthInstruction}

اكتب خطاب ${occasionType} ${isCreative ? 'إبداعي' : 'رسمي'} مع المعلومات التالية:

- اسم المرسل إليه: ${data.recipientName}
- منصبه: ${data.recipientTitle}
- المناسبة: ${data.occasion}
- الجهة المرسلة: ${data.senderOrganization}
- اسم المرسل: ${data.senderName}

متطلبات مهمة جداً:
1. ${lengthInstruction}
2. ${styleInstruction}
3. ${diacriticsInstruction}
4. ابدأ بـ "بسم الله الرحمن الرحيم" في أول سطر ووسطها
5. اكتب التاريخ الهجري والميلادي في أعلى الخطاب
6. ${isCongratulatoryOccasion ? 'استخدم عبارات التهنئة مثل "نهنئكم" و"بارك الله لكم"' : 'استخدم عبارات الشكر مثل "نشكركم" و"نقدر جهودكم"'}
7. لا تستخدم "المحترم" أو "المحترمة" نهائياً
8. اكتب اسم المرسل إليه بدون ألقاب مسبقة
9. ضع اسم المرسل والجهة في نهاية الخطاب بشكل مركز
10. اجعل التحية والسلام في وسط الصفحة

الالتزام بالطول المطلوب أمر بالغ الأهمية.`;
};

export const generateArabicLetter = async (data: OpenAIRequest, isCreative: boolean = false): Promise<string> => {
  const prompt = buildPrompt(data, isCreative);
  return await sendToChatGPT(prompt);
};

export const translateToEnglish = async (arabicText: string): Promise<string> => {
  const prompt = `ترجم هذا الخطاب الرسمي العربي إلى اللغة الإنجليزية بأسلوب رسمي ومهني، مع الحفاظ على المعنى والبنية:

${arabicText}

يجب أن تكون الترجمة:
- رسمية ومهنية
- دقيقة في المعنى
- مناسبة للمراسلات الرسمية
- مع الحفاظ على تنسيق الخطاب`;

  return await sendToChatGPT(prompt);
};
