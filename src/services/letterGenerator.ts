import { LetterData, GeneratedLetter } from '../types/letter';
import { callGeminiAPI } from './geminiService';
import { generateFallbackLetter } from './fallbackLetterGenerator';

export const generateLetter = async (letterData: LetterData, forceRegenerate: boolean = false): Promise<GeneratedLetter> => {
  console.log('Generating letter with data:', letterData);
  
  // Use fallback generator first, then try to enhance with Gemini if available
  const fallbackLetter = generateFallbackLetter(letterData);
  
  try {
    // Try to enhance with Gemini API
    const geminiResult = await generateLetterWithGemini(letterData, forceRegenerate);
    console.log('Enhanced letter generated successfully with Gemini');
    return geminiResult;
  } catch (error) {
    console.warn('Gemini API failed, using fallback letter:', error);
    return fallbackLetter;
  }
};

const generateLetterWithGemini = async (letterData: LetterData, forceRegenerate: boolean = false): Promise<GeneratedLetter> => {
  const { recipientName, recipientTitle, occasion, senderOrganization, senderName, tone, needsTranslation, needsCreativeVersion, needsDiacritics } = letterData;

  const prompt = `أكتب خطاب رسمي باللغة العربية بأسلوب ${tone} لا يقل عن 600 حرف:

المرسل إليه: ${recipientName}
المنصب: ${recipientTitle}
المناسبة: ${occasion}
من: ${senderName}
المؤسسة: ${senderOrganization}

متطلبات مهمة:
- ابدأ بالبسملة في وسط الصفحة
- ضع التاريخ الهجري والميلادي في بداية الخطاب (بدون كلمة "التاريخ")
- اكتب اسم المرسل إليه ومنصبه بخط كبير وواضح
- المحتوى يجب أن يكون ${tone === 'رسمية' ? 'رسمياً ومهذباً' : tone === 'تحفيزية' ? 'محفزاً وإيجابياً' : tone === 'أدبية' ? 'أدبياً وبليغاً' : 'ودياً ومناسباً'}
- لا يقل الخطاب عن 600 حرف أبداً
- اختتم بالتوقيع والمؤسسة

${occasion.includes('مولود') || occasion.includes('ولادة') || occasion.includes('طفل') ? 
  'هذا خطاب تهنئة بقدوم مولود جديد. يجب أن يحتوي على: تهنئة خاصة بالمولود، دعاء للوالدين والطفل، الحمد لله على سلامة الوالدة، ذكر أن الأولاد نعمة من الله، دعاء بالحفظ والصلاح للأطفال.' : ''}

${occasion.includes('زواج') || occasion.includes('عرس') || occasion.includes('قران') ? 
  'هذا خطاب تهنئة بالزواج. يجب أن يحتوي على: تبريكات بالزواج المبارك، دعاء بالمودة والرحمة، أن يبارك الله لهم ويبارك عليهم ويجمع بينهم في خير، دعاء بالذرية الصالحة.' : ''}

${occasion.includes('تخرج') || occasion.includes('نجاح') || occasion.includes('شهادة') ? 
  'هذا خطاب تهنئة بالتخرج والنجاح. يجب أن يحتوي على: تهنئة بالنجاح والتخرج، تقدير للجهد المبذول، دعاء بالتوفيق في المستقبل، تمنيات بالنجاح في الحياة العملية.' : ''}

اكتب الخطاب باللغة العربية فقط ولا تضع أي تفسيرات أو ملاحظات خارجية.`;

  try {
    const arabicVersion = await callGeminiAPI(prompt);
    
    const result: GeneratedLetter = {
      arabicVersion: arabicVersion
    };

    // Generate English translation if requested
    if (needsTranslation) {
      const translationPrompt = `Translate the following formal Arabic letter to English, maintaining the same tone and structure:

${arabicVersion}

Requirements:
- Keep the same formal structure
- Maintain respect and courtesy
- Translate cultural references appropriately
- Keep it professional and well-formatted`;

      try {
        result.englishVersion = await callGeminiAPI(translationPrompt);
      } catch (error) {
        console.error('Translation failed:', error);
        result.englishVersion = generateBasicEnglishTranslation(letterData);
      }
    }

    // Generate creative version if requested
    if (needsCreativeVersion) {
      const creativePrompt = `أعد كتابة الخطاب التالي بأسلوب إبداعي أكثر وألفاظ أجمل مع الحفاظ على المعنى الأساسي والطول (لا يقل عن 600 حرف):

${arabicVersion}

متطلبات:
- استخدم كلمات أكثر جمالاً وتعبيراً
- أضف صوراً بلاغية مناسبة
- حافظ على الاحترام والأدب
- احتفظ بنفس المعنى والهيكل
- لا يقل عن 600 حرف`;

      try {
        result.creativeVersion = await callGeminiAPI(creativePrompt);
      } catch (error) {
        console.error('Creative version failed:', error);
        result.creativeVersion = generateBasicCreativeVersion(letterData);
      }
    }

    return result;
  } catch (error) {
    console.error('Error generating letter with Gemini:', error);
    throw error;
  }
};

const generateBasicEnglishTranslation = (letterData: LetterData): string => {
  return `In the Name of Allah, the Most Gracious, the Most Merciful

Dear ${letterData.recipientName},
${letterData.recipientTitle}

Greetings and best wishes,

I am honored to write to you on the occasion of ${letterData.occasion}. Please accept my sincere congratulations and best wishes for this blessed occasion.

May Allah grant you continued success and happiness in all your endeavors.

With highest respect and appreciation,

${letterData.senderName}
${letterData.senderOrganization}`;
};

const generateBasicCreativeVersion = (letterData: LetterData): string => {
  const now = new Date();
  const hijriDate = now.toLocaleDateString('ar-SA-u-ca-islamic');
  const gregorianDate = now.toLocaleDateString('ar-SA');

  return `بسم الله الرحمن الرحيم

${hijriDate}
${gregorianDate}

إلى سعادة ${letterData.recipientName} المحترم
${letterData.recipientTitle}

أزكى التحايا وأعطر السلام،

في هذه المناسبة الكريمة، أتشرف بأن أرفع إليكم أجمل باقات التهاني وأعذب كلمات التبريك بمناسبة ${letterData.occasion}. 

إن هذه المناسبة المباركة تحمل في طياتها معاني الفرح والسرور، وتستحق منا كل التقدير والاحتفاء.

أسأل الله العلي القدير أن يديم عليكم نعمة الصحة والعافية، وأن يوفقكم في جميع مساعيكم النبيلة.

مع فائق الاحترام وأجمل التمنيات

${letterData.senderName}
${letterData.senderOrganization}`;
};
