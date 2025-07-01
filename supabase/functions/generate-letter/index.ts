import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LetterRequest {
  recipientName: string;
  recipientTitle: string;
  occasion: string;
  tone: string;
  senderName: string;
  senderOrganization: string;
  needsTranslation?: boolean;
  needsCreativeVersion?: boolean;
  needsDiacritics?: boolean;
}

const generateWithOpenAI = async (prompt: string): Promise<string> => {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  
  console.log('OpenAI API Key available:', openaiApiKey ? 'Yes' : 'No');
  
  if (!openaiApiKey) {
    console.error('OpenAI API key not found in environment variables');
    throw new Error('مفتاح OpenAI غير متوفر في إعدادات الخادم');
  }

  console.log('Making request to OpenAI...');
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`,
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

  console.log('OpenAI response status:', response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('OpenAI API error:', errorData);
    
    if (response.status === 401) {
      throw new Error('مفتاح OpenAI غير صحيح أو منتهي الصلاحية');
    } else if (response.status === 429) {
      throw new Error('تم تجاوز حد الاستخدام. يرجى المحاولة لاحقاً');
    } else if (response.status === 403) {
      throw new Error('ليس لديك صلاحية للوصول لهذا النموذج');
    } else {
      throw new Error(`خطأ في الخدمة: ${response.status} - ${errorData.error?.message || 'خطأ غير معروف'}`);
    }
  }

  const data = await response.json();
  console.log('OpenAI response received successfully');
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error('Invalid OpenAI response structure:', data);
    throw new Error('استجابة غير صحيحة من الخدمة');
  }
  
  return data.choices[0].message.content;
};

const createLetterPrompt = (
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

const createEnglishPrompt = (
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const letterRequest: LetterRequest = await req.json();
    console.log('Generating letter for:', letterRequest);

    // Generate Arabic letter
    const arabicPrompt = createLetterPrompt(
      letterRequest.recipientName,
      letterRequest.recipientTitle,
      letterRequest.occasion,
      letterRequest.tone,
      letterRequest.senderName,
      letterRequest.senderOrganization
    );
    
    const arabicVersion = await generateWithOpenAI(arabicPrompt);
    
    const result: any = {
      arabicVersion
    };

    // Generate English translation if requested
    if (letterRequest.needsTranslation) {
      const englishPrompt = createEnglishPrompt(
        letterRequest.recipientName,
        letterRequest.recipientTitle,
        letterRequest.occasion,
        letterRequest.tone,
        letterRequest.senderName,
        letterRequest.senderOrganization
      );
      
      result.englishVersion = await generateWithOpenAI(englishPrompt);
    }

    // Generate creative version if requested
    if (letterRequest.needsCreativeVersion) {
      const creativePrompt = `${arabicPrompt}

اكتب نسخة إبداعية من نفس الخطاب بأسلوب أدبي راقي مع استخدام:
- عبارات بلاغية جميلة
- تشبيهات واستعارات مناسبة
- أسلوب شاعري مهذب
- مفردات راقية ومتنوعة

احتفظ بنفس المعنى والغرض لكن بأسلوب أكثر إبداعاً.`;
      
      result.creativeVersion = await generateWithOpenAI(creativePrompt);
    }

    // Add diacritics if requested
    if (letterRequest.needsDiacritics && result.arabicVersion) {
      const diacriticsPrompt = `أضف التشكيل الكامل (الحركات) للنص التالي:

${result.arabicVersion}

المطلوب: إضافة جميع الحركات (الفتحة، الضمة، الكسرة، السكون، الشدة، التنوين) للنص بشكل صحيح نحوياً.`;
      
      result.arabicVersion = await generateWithOpenAI(diacriticsPrompt);
    }

    console.log('Letter generated successfully');

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in generate-letter function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});