
export interface LetterData {
  recipientName: string;
  recipientTitle: string;
  occasion: string;
  senderOrganization: string;
  senderName: string;
  tone: 'رسمية' | 'تحفيزية' | 'أدبية' | 'ودية';
  needsTranslation: boolean;
  needsCreativeVersion: boolean;
}

export interface GeneratedLetter {
  arabicVersion: string;
  englishVersion?: string;
  creativeVersion?: string;
}
