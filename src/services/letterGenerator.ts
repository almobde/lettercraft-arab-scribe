
import { LetterData, GeneratedLetter } from '../types/letter';
import { generateArabicLetter, translateToEnglish } from './openaiService';

export const generateLetter = async (
  data: LetterData, 
  forceRegenerate: boolean = false
): Promise<GeneratedLetter> => {
  // الحصول على API key من localStorage
  const apiKey = localStorage.getItem('openai_api_key');
  
  if (!apiKey) {
    throw new Error('يرجى إدخال مفتاح OpenAI API أولاً');
  }

  try {
    console.log('Generating letter with data:', data);
    
    // توليد النسخة العربية
    const arabicVersion = await generateArabicLetter({
      recipientName: data.recipientName,
      recipientTitle: data.recipientTitle,
      occasion: data.occasion,
      senderOrganization: data.senderOrganization,
      senderName: data.senderName,
      tone: data.tone,
      letterLength: data.letterLength,
      needsDiacritics: data.needsDiacritics
    }, apiKey);

    const result: GeneratedLetter = {
      arabicVersion: arabicVersion
    };

    // ترجمة للإنجليزية إذا طُلبت
    if (data.needsTranslation) {
      console.log('Translating to English...');
      result.englishVersion = await translateToEnglish(arabicVersion, apiKey);
    }

    // توليد النسخة الإبداعية إذا طُلبت
    if (data.needsCreativeVersion) {
      console.log('Generating creative version...');
      result.creativeVersion = await generateArabicLetter({
        recipientName: data.recipientName,
        recipientTitle: data.recipientTitle,
        occasion: data.occasion,
        senderOrganization: data.senderOrganization,
        senderName: data.senderName,
        tone: data.tone,
        letterLength: data.letterLength,
        needsDiacritics: data.needsDiacritics
      }, apiKey, true); // isCreative = true
    }

    console.log('Letter generation completed:', result);
    return result;
    
  } catch (error) {
    console.error('Error generating letter:', error);
    throw error;
  }
};
