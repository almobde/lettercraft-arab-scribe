
export interface LetterData {
  recipientName: string;
  recipientTitle: string;
  occasion: string;
  senderOrganization: string;
  senderName: string;
  tone: 'رسمية' | 'تحفيزية' | 'أدبية' | 'ودية';
  needsTranslation: boolean;
  needsCreativeVersion: boolean;
  needsDiacritics: boolean;
}

export interface GeneratedContent {
  arabicLetter: string;
  englishTranslation?: string;
  creativeLetter?: string;
  diacriticLetter?: string;
}

export interface GeneratedLetter {
  arabicVersion: string;
  englishVersion?: string;
  creativeVersion?: string;
}
