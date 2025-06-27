
export interface LetterData {
  recipientName: string;
  recipientTitle: string;
  occasion: string;
  senderOrganization: string;
  senderName: string;
  tone: 'رسمية' | 'تحفيزية' | 'أدبية' | 'ودية';
  letterLength: 'قصير' | 'متوسط' | 'طويل';
  needsTranslation: boolean;
  needsCreativeVersion: boolean;
  needsDiacritics: boolean;
}

export interface GeneratedLetter {
  arabicVersion: string;
  englishVersion?: string;
  creativeVersion?: string;
}
