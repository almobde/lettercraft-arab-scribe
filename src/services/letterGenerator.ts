
import { LetterData, GeneratedLetter } from '../types/letter';
import { supabase } from '@/integrations/supabase/client';

export const generateLetter = async (letterData: LetterData): Promise<GeneratedLetter> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-letter', {
      body: {
        recipientName: letterData.recipientName,
        recipientTitle: letterData.recipientTitle,
        occasion: letterData.occasion,
        tone: letterData.tone,
        senderName: letterData.senderName,
        senderOrganization: letterData.senderOrganization,
        needsTranslation: letterData.needsTranslation,
        needsCreativeVersion: letterData.needsCreativeVersion,
        needsDiacritics: letterData.needsDiacritics,
      },
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || 'فشل في توليد الخطاب من الخادم');
    }

    if (!data) {
      throw new Error('لم يتم استلام استجابة من الخادم');
    }

    return data as GeneratedLetter;
  } catch (error) {
    console.error('Error generating letter:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('فشل في توليد الخطاب. الرجاء المحاولة مرة أخرى.');
    }
  }
};
