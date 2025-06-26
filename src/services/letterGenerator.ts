
import { generateWithGemini } from './geminiService';
import { LetterData, GeneratedLetter } from '../types/letter';

const getHijriDate = () => {
  const today = new Date();
  // تحويل تقريبي للتاريخ الهجري
  const hijriYear = Math.floor((today.getFullYear() - 622) * 1.030684) + 1;
  const hijriMonths = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];
  const hijriMonth = hijriMonths[today.getMonth()];
  const hijriDay = today.getDate();
  
  return `${hijriDay} ${hijriMonth} ${hijriYear}هـ`;
};

const getGregorianDate = () => {
  const today = new Date();
  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  
  return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}م`;
};

const getLetterLengthInstructions = (length: string) => {
  switch (length) {
    case 'قصير':
      return 'اكتب خطاباً قصيراً ومختصراً لا يتجاوز 400 حرف';
    case 'متوسط':
      return 'اكتب خطاباً متوسط الطول بين 400 إلى 450 حرف';
    case 'طويل':
      return 'اكتب خطاباً طويلاً ومفصلاً يتجاوز 600 حرف';
    default:
      return 'اكتب خطاباً متوسط الطول';
  }
};

const getOccasionSpecificPrompt = (occasion: string, tone: string) => {
  const lowerOccasion = occasion.toLowerCase();
  
  // مناسبات التهنئة
  if (lowerOccasion.includes('زفاف') || lowerOccasion.includes('زواج') || lowerOccasion.includes('عرس')) {
    return `خطاب تهنئة بالزفاف يحتوي على تهنئة حارة وأدعية بالسعادة والهناء وبركة الحياة الزوجية الجديدة.`;
  }
  
  if (lowerOccasion.includes('مولود') || lowerOccasion.includes('ولادة') || lowerOccasion.includes('طفل')) {
    return `خطاب تهنئة بالمولود الجديد يحتوي على تهنئة صادقة وأدعية بأن يكون قرة عين لوالديه وأن يبارك الله فيه.`;
  }
  
  if (lowerOccasion.includes('ترقية') || lowerOccasion.includes('ترفيع') || lowerOccasion.includes('منصب')) {
    return `خطاب تهنئة بالترقية يحتوي على تهنئة بالمنصب الجديد والثقة في القدرات والأدعية بالتوفيق والنجاح.`;
  }
  
  if (lowerOccasion.includes('تخرج') || lowerOccasion.includes('شهادة')) {
    return `خطاب تهنئة بالتخرج يحتوي على تهنئة بالإنجاز الأكاديمي والأدعية بالتوفيق في المستقبل المهني.`;
  }
  
  // مناسبات الشكر
  if (lowerOccasion.includes('شكر') || lowerOccasion.includes('تقدير') || lowerOccasion.includes('امتنان')) {
    return `خطاب شكر وتقدير يعبر عن الامتنان العميق والعرفان بالجميل والتقدير للمساعدة أو الخدمة المقدمة.`;
  }
  
  // مناسبات الدعوة
  if (lowerOccasion.includes('دعوة') || lowerOccasion.includes('حفل') || lowerOccasion.includes('مناسبة')) {
    return `خطاب دعوة ${tone} يحتوي على دعوة كريمة للحضور مع تفاصيل المناسبة والتعبير عن الرغبة في المشاركة.`;
  }
  
  // الخطابات الرسمية العامة
  return `خطاب ${tone} يتناول ${occasion} بأسلوب مناسب ولائق.`;
};

const generateLocalLetter = (letterData: LetterData): GeneratedLetter => {
  const hijriDate = getHijriDate();
  const gregorianDate = getGregorianDate();
  
  const occasionPrompt = getOccasionSpecificPrompt(letterData.occasion, letterData.tone);
  
  // تحديد المحتوى بناءً على نوع المناسبة
  let mainContent = '';
  const lowerOccasion = letterData.occasion.toLowerCase();
  
  if (lowerOccasion.includes('زفاف') || lowerOccasion.includes('زواج')) {
    if (letterData.letterLength === 'قصير') {
      mainContent = `يسعدنا أن نتقدم إليكم بأحر التهاني وأطيب التبريكات بمناسبة الزفاف الميمون، سائلين المولى عز وجل أن يبارك لكم وأن يجمع بينكم في خير وعلى خير، وأن يرزقكم السعادة والهناء في حياتكم الزوجية الجديدة.`;
    } else if (letterData.letterLength === 'متوسط') {
      mainContent = `يطيب لنا أن نتقدم إليكم بأصدق التهاني وأجمل التبريكات بمناسبة الزفاف الكريم، هذه المناسبة السعيدة التي تجمع قلبين في رباط مقدس. نسأل الله العظيم أن يبارك لكم وأن يبارك عليكم وأن يجمع بينكم في خير، وأن يرزقكم الذرية الصالحة والسعادة الدائمة في ظل هذا الرباط المبارك.`;
    } else {
      mainContent = `في هذا اليوم المبارك، يسعدنا ويشرفنا أن نتقدم إليكم بأحر التهاني وأصدق التبريكات بمناسبة زفافكم الميمون. إن هذه المناسبة السعيدة التي تجمع بين قلبين في رباط مقدس لتستحق منا كل التهنئة والفرح. نسأل الله العلي القدير أن يبارك لكم وأن يبارك عليكم وأن يجمع بينكم في خير وعلى خير، وأن يرزقكم حياة زوجية سعيدة مليئة بالمحبة والوئام والسكينة، وأن يكرمكم بالذرية الصالحة التي تكون قرة أعينكم ونور دربكم في هذه الحياة.`;
    }
  } else if (lowerOccasion.includes('مولود') || lowerOccasion.includes('ولادة')) {
    if (letterData.letterLength === 'قصير') {
      mainContent = `نتقدم إليكم بأحر التهاني بمناسبة قدوم المولود الجديد، هذه النعمة العظيمة التي أكرمكم الله بها. نسأل الله أن يبارك لكم فيه وأن يجعله قرة عين لكم وأن ينبته نباتاً حسناً.`;
    } else if (letterData.letterLength === 'متوسط') {
      mainContent = `يسرنا أن نتقدم إليكم بأجمل التهاني وأطيب التبريكات بمناسبة قدوم المولود الجديد، هذه الهبة الربانية العظيمة التي أنعم الله بها عليكم. نسأل الله العظيم رب العرش الكريم أن يبارك لكم في هذا المولود المبارك وأن يجعله قرة عين لكم وأن ينبته نباتاً حسناً في طاعة الله ورضاه.`;
    } else {
      mainContent = `في هذه المناسبة السعيدة، نتقدم إليكم بأحر التهاني وأصدق التبريكات بمناسبة قدوم المولود الجديد الذي أضاف إلى بيتكم السرور والبهجة. إن هذه النعمة العظيمة التي أكرمكم الله بها لتستحق منا كل التهنئة والدعاء. نسأل الله العلي القدير أن يبارك لكم في هذا المولود المبارك وأن يجعله قرة عين لكم وسنداً في الدنيا والآخرة، وأن ينبته نباتاً حسناً في طاعة الله ورضاه، وأن يرزقه الصحة والعافية والهداية والتوفيق في جميع أمور حياته.`;
    }
  } else if (lowerOccasion.includes('ترقية') || lowerOccasion.includes('منصب')) {
    if (letterData.letterLength === 'قصير') {
      mainContent = `نتقدم إليكم بأحر التهاني بمناسبة ترقيتكم للمنصب الجديد. إن هذا الإنجاز يعكس كفاءتكم وجدارتكم، ونحن واثقون من قدرتكم على النجاح والتميز في مهامكم الجديدة.`;
    } else if (letterData.letterLength === 'متوسط') {
      mainContent = `يسعدنا أن نتقدم إليكم بأجمل التهاني وأصدق التبريكات بمناسبة ترقيتكم للمنصب الجديد. إن هذا الإنجاز المستحق يعكس كفاءتكم العالية وجدارتكم المتميزة، ونحن على ثقة تامة من قدرتكم على حمل الأمانة والنجاح في المسؤوليات الجديدة. نسأل الله أن يوفقكم ويسدد خطاكم في خدمة الوطن والمواطنين.`;
    } else {
      mainContent = `في هذه المناسبة السعيدة، نتقدم إليكم بأحر التهاني وأصدق التبريكات بمناسبة ترقيتكم للمنصب الجديد، هذا الإنجاز المستحق الذي يعكس كفاءتكم العالية وخبرتكم المتميزة وجدارتكم في تحمل المسؤوليات الكبيرة. إن هذه الترقية لم تأت من فراغ، بل هي ثمرة لسنوات من العمل الجاد والعطاء المتميز والإخلاص في الأداء. نحن على ثقة تامة من قدرتكم على حمل الأمانة وتحقيق النجاح في مهامكم الجديدة. نسأل الله العظيم أن يوفقكم ويسدد خطاكم ويبارك في جهودكم في خدمة الوطن الغالي والمواطنين الكرام.`;
    }
  } else {
    // خطاب عام
    if (letterData.letterLength === 'قصير') {
      mainContent = `نتوجه إليكم بهذا الخطاب بمناسبة ${letterData.occasion}، معربين عن تقديرنا واحترامنا. نسأل الله أن يوفقكم في جميع أعمالكم ومساعيكم الطيبة.`;
    } else if (letterData.letterLength === 'متوسط') {
      mainContent = `يطيب لنا في هذه المناسبة أن نتوجه إليكم بهذا الخطاب بمناسبة ${letterData.occasion}، معربين عن تقديرنا العميق واحترامنا الكبير لشخصكم الكريم. نسأل الله العظيم أن يوفقكم في جميع أعمالكم ومساعيكم النبيلة وأن يسدد خطاكم في خدمة المجتمع.`;
    } else {
      mainContent = `في هذه المناسبة الكريمة، يسعدنا ويشرفنا أن نتوجه إليكم بهذا الخطاب بمناسبة ${letterData.occasion}، معربين عن تقديرنا العميق واحترامنا الجم لشخصكم الكريم ولما تبذلونه من جهود مباركة في خدمة المجتمع. إن مثل هذه المناسبات لتذكرنا بأهمية التواصل والتقدير المتبادل بين أفراد المجتمع الواحد. نسأل الله العلي القدير أن يوفقكم في جميع أعمالكم ومساعيكم النبيلة وأن يسدد خطاكم ويبارك في جهودكم المثمرة في خدمة الوطن والمواطنين.`;
    }
  }

  const arabicLetter = `بسم الله الرحمن الرحيم

${hijriDate}
${gregorianDate}

إلى ${letterData.recipientName} الكريم / الكريمة
${letterData.recipientTitle}

السلام عليكم ورحمة الله وبركاته

${mainContent}

والله الموفق والمستعان

${letterData.senderName}
${letterData.senderOrganization}`;

  const result: GeneratedLetter = {
    arabicVersion: arabicLetter
  };

  // إضافة الترجمة الإنجليزية إذا كانت مطلوبة
  if (letterData.needsTranslation) {
    result.englishVersion = `In the Name of Allah, the Most Gracious, the Most Merciful

${gregorianDate}

To the Honorable ${letterData.recipientName}
${letterData.recipientTitle}

Peace be upon you and Allah's mercy and blessings

${mainContent.replace(/الله/g, 'Allah').replace(/السلام عليكم/g, 'Peace be upon you')}

May Allah grant success and guidance

${letterData.senderName}
${letterData.senderOrganization}`;
  }

  // إضافة النسخة الإبداعية إذا كانت مطلوبة
  if (letterData.needsCreativeVersion) {
    const creativeContent = mainContent.replace(/نتقدم/g, 'نتشرف').replace(/يسعدنا/g, 'يشرفنا').replace(/نسأل الله/g, 'نبتهل إلى الله');
    
    result.creativeVersion = `بسم الله الرحمن الرحيم

${hijriDate}
${gregorianDate}

إلى نجم المجتمع وقدوته ${letterData.recipientName}
${letterData.recipientTitle} المحترم

تحياتنا العطرة وأطيب تمنياتنا

${creativeContent}

دمتم في رعاية الله وحفظه

${letterData.senderName}
${letterData.senderOrganization}`;
  }

  return result;
};

export const generateLetter = async (letterData: LetterData, forceRegenerate: boolean = false): Promise<GeneratedLetter> => {
  try {
    const lengthInstructions = getLetterLengthInstructions(letterData.letterLength);
    const occasionPrompt = getOccasionSpecificPrompt(letterData.occasion, letterData.tone);
    
    const prompt = `
    ${lengthInstructions}. ${occasionPrompt}
    
    معلومات الخطاب:
    - المرسل إليه: ${letterData.recipientName}
    - المنصب: ${letterData.recipientTitle}
    - المناسبة: ${letterData.occasion}
    - المرسل: ${letterData.senderName}
    - المنظمة: ${letterData.senderOrganization}
    - الأسلوب: ${letterData.tone}
    - طول الخطاب: ${letterData.letterLength}
    
    اكتب خطاباً احترافياً باللغة العربية يتضمن:
    1. البسملة في الوسط
    2. التاريخ الهجري والميلادي
    3. اسم المرسل إليه ومنصبه
    4. السلام
    5. محتوى مناسب للمناسبة بالطول المطلوب
    6. الختام
    7. اسم المرسل والمنظمة
    
    تأكد من أن المحتوى مناسب لنوع المناسبة ولا يحتوي على عبارات غير مناسبة.
    `;

    const result = await generateWithGemini(prompt, letterData.needsTranslation, letterData.needsCreativeVersion);
    return result;
  } catch (error) {
    console.error('Gemini API failed, using local generation:', error);
    return generateLocalLetter(letterData);
  }
};
