
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

export interface GeneratedLetter {
  arabicVersion: string;
  englishVersion?: string;
  creativeVersion?: string;
}

export interface SavedLetter {
  id: string;
  letterData: LetterData;
  generatedLetter: GeneratedLetter;
  createdAt: Date;
  updatedAt: Date;
}
