
import { LetterData, GeneratedLetter } from '../types/letter';
import { generateWithOpenAI, createLetterPrompt, createEnglishPrompt } from './openaiService';

export const generateLetter = async (letterData: LetterData): Promise<GeneratedLetter> => {
  try {
    // Generate Arabic letter
    const arabicPrompt = createLetterPrompt(
      letterData.recipientName,
      letterData.recipientTitle,
      letterData.occasion,
      letterData.tone,
      letterData.senderName,
      letterData.senderOrganization
    );
    
    const arabicVersion = await generateWithOpenAI(arabicPrompt);
    
    const result: GeneratedLetter = {
      arabicVersion
    };

    // Generate English translation if requested
    if (letterData.needsTranslation) {
      const englishPrompt = createEnglishPrompt(
        letterData.recipientName,
        letterData.recipientTitle,
        letterData.occasion,
        letterData.tone,
        letterData.senderName,
        letterData.senderOrganization
      );
      
      result.englishVersion = await generateWithOpenAI(englishPrompt);
    }

    // Generate creative version if requested
    if (letterData.needsCreativeVersion) {
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
    if (letterData.needsDiacritics && result.arabicVersion) {
      const diacriticsPrompt = `أضف التشكيل الكامل (الحركات) للنص التالي:

${result.arabicVersion}

المطلوب: إضافة جميع الحركات (الفتحة، الضمة، الكسرة، السكون، الشدة، التنوين) للنص بشكل صحيح نحوياً.`;
      
      result.arabicVersion = await generateWithOpenAI(diacriticsPrompt);
    }

    return result;
  } catch (error) {
    console.error('Error generating letter:', error);
    throw new Error('فشل في توليد الخطاب. الرجاء المحاولة مرة أخرى.');
  }
};
