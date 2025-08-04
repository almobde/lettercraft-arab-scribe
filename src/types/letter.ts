
export interface LetterData {
  recipientName: string;
  recipientTitle: string;
  occasion: string;
  senderOrganization: string;
  senderName: string;
  tone: 'رسمية' | 'ودية';
  length: 'قصير' | 'طويل';
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

export interface LetterTemplate {
  id: string;
  title: string;
  icon: string;
  occasion: string;
  tone: 'رسمية' | 'ودية';
  length: 'قصير' | 'طويل';
}
