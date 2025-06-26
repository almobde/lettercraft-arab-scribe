
import { LetterData, GeneratedLetter } from '../types/letter';

export const generateLetter = (data: LetterData): GeneratedLetter => {
  if (!data.recipientName || !data.occasion) {
    return { arabicVersion: '' };
  }

  // Generate Arabic version
  const arabicLetter = generateArabicLetter(data);
  
  // Generate English version if requested
  let englishVersion = undefined;
  if (data.needsTranslation) {
    englishVersion = generateEnglishLetter(data);
  }

  // Generate creative version if requested
  let creativeVersion = undefined;
  if (data.needsCreativeVersion) {
    creativeVersion = generateCreativeLetter(data);
  }

  return {
    arabicVersion: arabicLetter,
    englishVersion,
    creativeVersion
  };
};

const generateArabicLetter = (data: LetterData): string => {
  const greeting = `إلى ${data.recipientTitle ? `${data.recipientTitle} الفاضل` : 'المحترم'} / ${data.recipientName}`;
  
  let content = '';
  const toneStyles = {
    'رسمية': {
      opening: 'نتشرف بأن نرفع لكم',
      thanks: 'خالص الشكر والتقدير',
      closing: 'تقبلوا منا فائق الاحترام والتقدير'
    },
    'تحفيزية': {
      opening: 'نرفع لكم بالغ',
      thanks: 'الشكر والإعجاب',
      closing: 'لكم منا خالص الدعوات بمزيد من النجاح والتميّز'
    },
    'أدبية': {
      opening: 'يسعدنا أن نقدم لكم',
      thanks: 'أسمى عبارات الشكر والثناء',
      closing: 'دمتم بخير وعافية'
    },
    'ودية': {
      opening: 'نتوجه إليكم بـ',
      thanks: 'صادق الشكر والامتنان',
      closing: 'مع أطيب التمنيات'
    }
  };

  const style = toneStyles[data.tone];
  
  content = `${style.opening} ${style.thanks} على ${data.occasion}.
جهودكم المتميزة تستحق كل التقدير والاحترام.
${style.closing}.`;

  const signature = `
مع خالص التقدير،
${data.senderName}
${data.senderOrganization}`;

  return `${greeting}

${content}

${signature}`;
};

const generateEnglishLetter = (data: LetterData): string => {
  const greeting = `Dear ${data.recipientTitle ? `${data.recipientTitle}` : 'Mr./Ms.'} ${data.recipientName},`;
  
  const content = `We would like to express our sincere appreciation for ${data.occasion}.
Your exceptional efforts deserve recognition and gratitude.
Thank you for your continued dedication and professionalism.`;

  const signature = `
Respectfully,
${data.senderName}
${data.senderOrganization}`;

  return `${greeting}

${content}

${signature}`;
};

const generateCreativeLetter = (data: LetterData): string => {
  const greeting = `إلى النجم الساطع / ${data.recipientName}`;
  
  let content = '';
  const creativeStyles = {
    'رسمية': `بصمتكم الإبداعية في ${data.occasion} تضيء طريق التميز.
أنتم مثال يُحتذى به في الإتقان والإبداع.
شكرًا لكم على كونكم مصدر إلهام.`,
    'تحفيزية': `إنجازكم الرائع في ${data.occasion} يُظهر عمق رؤيتكم وقوة عزيمتكم.
أنتم محرك التقدم والإبداع.
تستحقون التقدير والإعجاب.`,
    'أدبية': `كالنجوم في سماء التميز، تضيئون طريق ${data.occasion}.
بلسم الشكر يعجز عن وصف امتناننا.
أنتم قصيدة من الإبداع والتفاني.`,
    'ودية': `قلوبنا تنبض بالامتنان لجهودكم في ${data.occasion}.
أنتم أكثر من زملاء، أنتم عائلة تستحق كل الحب.
شكرًا لكونكم جزءًا من رحلة النجاح.`
  };

  content = creativeStyles[data.tone];

  const signature = `
بكل الحب والتقدير،
${data.senderName}
${data.senderOrganization}`;

  return `${greeting}

${content}

${signature}`;
};
