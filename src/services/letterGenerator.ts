
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

const generateLocalLetter = (letterData: LetterData): GeneratedLetter => {
  const hijriDate = getHijriDate();
  const gregorianDate = getGregorianDate();
  
  // تحديد المحتوى بناءً على نوع المناسبة وطول الخطاب
  let mainContent = '';
  const lowerOccasion = letterData.occasion.toLowerCase();
  
  if (lowerOccasion.includes('زفاف') || lowerOccasion.includes('زواج')) {
    if (letterData.letterLength === 'قصير') {
      mainContent = `يسعدنا أن نتقدم إليكم بأحر التهاني وأطيب التبريكات بمناسبة الزفاف الميمون، سائلين المولى عز وجل أن يبارك لكم وأن يجمع بينكم في خير وعلى خير، وأن يرزقكم السعادة والهناء في حياتكم الزوجية الجديدة.`;
    } else if (letterData.letterLength === 'متوسط') {
      mainContent = `يطيب لنا أن نتقدم إليكم بأصدق التهاني وأجمل التبريكات بمناسبة الزفاف الكريم، هذه المناسبة السعيدة التي تجمع قلبين في رباط مقدس. نسأل الله العظيم أن يبارك لكم وأن يبارك عليكم وأن يجمع بينكم في خير، وأن يرزقكم الذرية الصالحة والسعادة الدائمة في ظل هذا الرباط المبارك.`;
    } else {
      mainContent = `في هذا اليوم المبارك، يسعدنا ويشرفنا أن نتقدم إليكم بأحر التهاني وأصدق التبريكات بمناسبة زفافكم الميمون. إن هذه المناسبة السعيدة التي تجمع بين قلبين في رباط مقدس لتستحق منا كل التهنئة والفرح. نسأل الله العلي القدير أن يبارك لكم وأن يبارك عليكم وأن يجمع بينكم في خير وعلى خير، وأن يرزقكم حياة زوجية سعيدة مليئة بالمحبة والوئام والسكينة، وأن يكرمكم بالذرية الصالحة التي تكون قرة أعينكم ونور دربكم في هذه الحياة. كما نسأله سبحانه أن يديم عليكم نعمة الحب والتفاهم وأن يجعل بيتكم عامراً بالإيمان والطاعة والبركة.`;
    }
  } else if (lowerOccasion.includes('مولود') || lowerOccasion.includes('ولادة')) {
    if (letterData.letterLength === 'قصير') {
      mainContent = `نتقدم إليكم بأحر التهاني بمناسبة قدوم المولود الجديد، هذه النعمة العظيمة التي أكرمكم الله بها. نسأل الله أن يبارك لكم فيه وأن يجعله قرة عين لكم وأن ينبته نباتاً حسناً.`;
    } else if (letterData.letterLength === 'متوسط') {
      mainContent = `يسرنا أن نتقدم إليكم بأجمل التهاني وأطيب التبريكات بمناسبة قدوم المولود الجديد، هذه الهبة الربانية العظيمة التي أنعم الله بها عليكم. نسأل الله العظيم رب العرش الكريم أن يبارك لكم في هذا المولود المبارك وأن يجعله قرة عين لكم وأن ينبته نباتاً حسناً في طاعة الله ورضاه.`;
    } else {
      mainContent = `في هذه المناسبة السعيدة، نتقدم إليكم بأحر التهاني وأصدق التبريكات بمناسبة قدوم المولود الجديد الذي أضاف إلى بيتكم السرور والبهجة. إن هذه النعمة العظيمة التي أكرمكم الله بها لتستحق منا كل التهنئة والدعاء. نسأل الله العلي القدير أن يبارك لكم في هذا المولود المبارك وأن يجعله قرة عين لكم وسنداً في الدنيا والآخرة، وأن ينبته نباتاً حسناً في طاعة الله ورضاه، وأن يرزقه الصحة والعافية والهداية والتوفيق في جميع أمور حياته. كما نسأله سبحانه أن يجعله من الصالحين المصلحين وأن يبلغه أشده وهو في أحسن حال وأكمل عقل ودين.`;
    }
  } else if (lowerOccasion.includes('ترقية') || lowerOccasion.includes('منصب')) {
    if (letterData.letterLength === 'قصير') {
      mainContent = `نتقدم إليكم بأحر التهاني بمناسبة ترقيتكم للمنصب الجديد. إن هذا الإنجاز يعكس كفاءتكم وجدارتكم، ونحن واثقون من قدرتكم على النجاح والتميز في مهامكم الجديدة.`;
    } else if (letterData.letterLength === 'متوسط') {
      mainContent = `يسعدنا أن نتقدم إليكم بأجمل التهاني وأصدق التبريكات بمناسبة ترقيتكم للمنصب الجديد. إن هذا الإنجاز المستحق يعكس كفاءتكم العالية وجدارتكم المتميزة، ونحن على ثقة تامة من قدرتكم على حمل الأمانة والنجاح في المسؤوليات الجديدة. نسأل الله أن يوفقكم ويسدد خطاكم في خدمة الوطن والمواطنين.`;
    } else {
      mainContent = `في هذه المناسبة السعيدة، نتقدم إليكم بأحر التهاني وأصدق التبريكات بمناسبة ترقيتكم للمنصب الجديد، هذا الإنجاز المستحق الذي يعكس كفاءتكم العالية وخبرتكم المتميزة وجدارتكم في تحمل المسؤوليات الكبيرة. إن هذه الترقية لم تأت من فراغ، بل هي ثمرة لسنوات من العمل الجاد والعطاء المتميز والإخلاص في الأداء. نحن على ثقة تامة من قدرتكم على حمل الأمانة وتحقيق النجاح في مهامكم الجديدة. نسأل الله العظيم أن يوفقكم ويسدد خطاكم ويبارك في جهودكم في خدمة الوطن الغالي والمواطنين الكرام، وأن يجعل عملكم في ميزان حسناتكم.`;
    }
  } else if (lowerOccasion.includes('تخرج') || lowerOccasion.includes('شهادة')) {
    if (letterData.letterLength === 'قصير') {
      mainContent = `نتقدم إليكم بأحر التهاني بمناسبة تخرجكم الموفق. إن هذا الإنجاز الأكاديمي المتميز يعكس جدكم واجتهادكم، ونسأل الله أن يوفقكم في مسيرتكم المهنية القادمة.`;
    } else if (letterData.letterLength === 'متوسط') {
      mainContent = `يسعدنا أن نتقدم إليكم بأجمل التهاني وأطيب التبريكات بمناسبة تخرجكم الموفق ونيلكم الشهادة الجامعية. إن هذا الإنجاز الأكاديمي المتميز ثمرة لسنوات من الجد والاجتهاد والمثابرة. نسأل الله أن يوفقكم في مسيرتكم المهنية ويفتح لكم أبواب النجاح والتميز.`;
    } else {
      mainContent = `في هذه المناسبة السعيدة، نتقدم إليكم بأحر التهاني وأصدق التبريكات بمناسبة تخرجكم الموفق ونيلكم الشهادة الجامعية بتفوق واستحقاق. إن هذا الإنجاز الأكاديمي العظيم ليس مجرد شهادة تحصلون عليها، بل هو ثمرة لسنوات من الجد والاجتهاد والعزيمة والإصرار على تحقيق الأهداف. نحن على ثقة تامة من أن هذا التفوق الأكاديمي هو بداية مشرقة لمستقبل مهني متميز ومسيرة حافلة بالإنجازات. نسأل الله العظيم أن يوفقكم في مسيرتكم المهنية القادمة ويفتح لكم أبواب النجاح والتميز، وأن يجعلكم من النافعين لأنفسكم ومجتمعكم ووطنكم.`;
    }
  } else {
    // خطاب عام
    if (letterData.letterLength === 'قصير') {
      mainContent = `نتوجه إليكم بهذا الخطاب بمناسبة ${letterData.occasion}، معربين عن تقديرنا واحترامنا. نسأل الله أن يوفقكم في جميع أعمالكم ومساعيكم الطيبة.`;
    } else if (letterData.letterLength === 'متوسط') {
      mainContent = `يطيب لنا في هذه المناسبة أن نتوجه إليكم بهذا الخطاب بمناسبة ${letterData.occasion}، معربين عن تقديرنا العميق واحترامنا الكبير لشخصكم الكريم. نسأل الله العظيم أن يوفقكم في جميع أعمالكم ومساعيكم النبيلة وأن يسدد خطاكم في خدمة المجتمع.`;
    } else {
      mainContent = `في هذه المناسبة الكريمة، يسعدنا ويشرفنا أن نتوجه إليكم بهذا الخطاب بمناسبة ${letterData.occasion}، معربين عن تقديرنا العميق واحترامنا الجم لشخصكم الكريم ولما تبذلونه من جهود مباركة في خدمة المجتمع. إن مثل هذه المناسبات لتذكرنا بأهمية التواصل والتقدير المتبادل بين أفراد المجتمع الواحد. نسأل الله العلي القدير أن يوفقكم في جميع أعمالكم ومساعيكم النبيلة وأن يسدد خطاكم ويبارك في جهودكم المثمرة في خدمة الوطن والمواطنين، وأن يجعل أعمالكم في ميزان حسناتكم.`;
    }
  }

  // التأكد من طول المحتوى
  const targetLength = letterData.letterLength === 'قصير' ? 350 : 
                     letterData.letterLength === 'متوسط' ? 425 : 650;
  
  // تعديل المحتوى ليتناسب مع الطول المطلوب
  if (mainContent.length > targetLength && letterData.letterLength !== 'طويل') {
    const sentences = mainContent.split('.');
    let adjustedContent = '';
    for (const sentence of sentences) {
      if ((adjustedContent + sentence + '.').length <= targetLength) {
        adjustedContent += sentence + '.';
      } else {
        break;
      }
    }
    mainContent = adjustedContent.trim();
  } else if (mainContent.length < targetLength - 50 && letterData.letterLength === 'طويل') {
    // إضافة محتوى إضافي للخطابات الطويلة
    if (lowerOccasion.includes('زفاف')) {
      mainContent += ' وأن يجعل هذا الزواج المبارك نموذجاً يُحتذى به في المحبة والتفاهم والاحترام المتبادل.';
    } else if (lowerOccasion.includes('مولود')) {
      mainContent += ' وأن يرزقكم بر الأولاد وأن يكون هذا المولود عوناً لكم في الدنيا والآخرة.';
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

export const generateLetter = async (letterData: LetterData): Promise<GeneratedLetter> => {
  // استخدام التوليد المحلي مباشرة
  return generateLocalLetter(letterData);
};
