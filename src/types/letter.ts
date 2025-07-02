
export interface LetterData {
  recipientName: string;
  recipientTitle: string;
  occasion: string;
  senderOrganization: string;
  senderName: string;
  tone: 'رسمية' | 'تحفيزية' | 'ودية';
  length: 'قصير' | 'متوسط' | 'طويل';
  needsTranslation: boolean;
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
}
