
import { LetterData, GeneratedLetter } from '../types/letter';

const generateArabicLetter = (data: LetterData): string => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  const greeting = data.recipientName ? `إلى ${data.recipientName}` : 'إلى من يهمه الأمر';
  const title = data.recipientTitle ? ` - ${data.recipientTitle}` : '';
  
  let body = '';
  if (data.occasion) {
    switch (data.tone) {
      case 'تحفيزية':
        body = `نتوجه إليكم بأسمى آيات الشكر والامتنان على ${data.occasion}. إن جهودكم المتميزة تستحق كل التقدير والإعجاب.`;
        break;
      case 'أدبية':
        body = `نرفع إليكم عبارات الثناء والتقدير على ${data.occasion}. فقد كان لعملكم أثر طيب وبصمة واضحة.`;
        break;
      case 'ودية':
        body = `نشكركم من القلب على ${data.occasion}. نقدر جهودكم الرائعة وتعاونكم المثمر معنا.`;
        break;
      default:
        body = `نتشرف بتقديم الشكر والتقدير لكم على ${data.occasion}. نقدر جهودكم المبذولة في هذا الصدد.`;
    }
  }

  const closing = 'مع خالص التقدير والاحترام';
  const signature = data.senderName || 'المرسل';
  const organization = data.senderOrganization ? `\n${data.senderOrganization}` : '';

  return `${greeting}${title}

${body}

${closing}،
${signature}${organization}`;
};

const generateEnglishTranslation = (data: LetterData): string => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  const greeting = data.recipientName ? `To ${data.recipientName}` : 'To Whom It May Concern';
  const title = data.recipientTitle ? ` - ${data.recipientTitle}` : '';
  
  let body = '';
  if (data.occasion) {
    switch (data.tone) {
      case 'تحفيزية':
        body = `We extend our highest appreciation and gratitude for ${data.occasion}. Your outstanding efforts deserve all recognition and admiration.`;
        break;
      case 'أدبية':
        body = `We offer our praise and appreciation for ${data.occasion}. Your work has had a positive impact and left a clear mark.`;
        break;
      case 'ودية':
        body = `We thank you from the heart for ${data.occasion}. We appreciate your wonderful efforts and fruitful cooperation with us.`;
        break;
      default:
        body = `We are honored to express our thanks and appreciation for ${data.occasion}. We value your efforts in this regard.`;
    }
  }

  const closing = 'With sincere appreciation and respect';
  const signature = data.senderName || 'The Sender';
  const organization = data.senderOrganization ? `\n${data.senderOrganization}` : '';

  return `${greeting}${title}

${body}

${closing},
${signature}${organization}`;
};

const generateCreativeVersion = (data: LetterData): string => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  const greeting = data.recipientName ? `إلى الأستاذ المبدع / ${data.recipientName}` : 'إلى صاحب الإبداع والتميز';
  const title = data.recipientTitle ? ` - ${data.recipientTitle}` : '';
  
  let body = '';
  if (data.occasion) {
    switch (data.tone) {
      case 'تحفيزية':
        body = `لقد أضأتم طريق النجاح من خلال ${data.occasion}. إبداعكم ملهم وجهودكم تستحق أن تُكتب بماء الذهب.`;
        break;
      case 'أدبية':
        body = `في ${data.occasion}، رسمتم لوحة فنية رائعة من الإتقان والجمال. أنتم نجوم تضيء سماء العمل.`;
        break;
      case 'ودية':
        body = `كم هو رائع ما قدمتموه في ${data.occasion}! قلوبنا تفيض بالامتنان لكم ولجهودكم النبيلة.`;
        break;
      default:
        body = `إن ${data.occasion} شاهد على تميزكم وإبداعكم. نحتفي بإنجازكم ونقدر عطاءكم المتواصل.`;
    }
  }

  const closing = 'بكل الحب والتقدير';
  const signature = data.senderName || 'محبكم';
  const organization = data.senderOrganization ? `\n${data.senderOrganization}` : '';

  return `${greeting}${title}

${body}

${closing}،
${signature}${organization}`;
};

export const generateLetter = (data: LetterData): GeneratedLetter => {
  const arabicVersion = generateArabicLetter(data);
  const englishVersion = data.needsTranslation ? generateEnglishTranslation(data) : undefined;
  const creativeVersion = data.needsCreativeVersion ? generateCreativeVersion(data) : undefined;

  return {
    arabicVersion,
    englishVersion,
    creativeVersion
  };
};
