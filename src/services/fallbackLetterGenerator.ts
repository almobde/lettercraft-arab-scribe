
import { LetterData, GeneratedLetter } from '../types/letter';

export const generateFallbackLetter = (letterData: LetterData): GeneratedLetter => {
  const { recipientName, recipientTitle, occasion, senderName, senderOrganization, tone } = letterData;
  
  // Get current dates
  const now = new Date();
  const hijriDate = now.toLocaleDateString('ar-SA-u-ca-islamic');
  const gregorianDate = now.toLocaleDateString('ar-SA');
  
  let arabicContent = '';
  
  // Generate content based on occasion
  if (occasion.includes('مولود') || occasion.includes('ولادة') || occasion.includes('طفل')) {
    arabicContent = `بسم الله الرحمن الرحيم

${hijriDate}
${gregorianDate}

إلى سعادة ${recipientName}
${recipientTitle}

تحية طيبة وبعد،

يسعدني أن أتقدم إليكم بأصدق التهاني والتبريكات بمناسبة قدوم المولود الجديد، أسأل الله العلي القدير أن يبارك لكم في المولود الجديد وأن يجعله من الذرية الصالحة.

نحمد الله تعالى على سلامة الوالدة الكريمة وعلى هذه النعمة العظيمة، فالأولاد زينة الحياة الدنيا وقرة عين الوالدين. أسأل الله أن يحفظ لكم هذا المولود المبارك وأن ينبته نباتاً حسناً وأن يجعله من البررة الأتقياء الصالحين.

كما أسأل المولى عز وجل أن يرزقكم السعادة والهناء مع أطفالكم وأن يعينكم على تربيتهم التربية الإسلامية الصحيحة، وأن يجعلهم مصدر فخر واعتزاز لكم في الدنيا والآخرة.

تقبلوا منا أجمل التهاني وأصدق الدعوات بالسعادة والتوفيق.

وتفضلوا بقبول فائق الاحترام والتقدير

${senderName}
${senderOrganization}`;
  } else if (occasion.includes('زواج') || occasion.includes('عرس') || occasion.includes('قران')) {
    arabicContent = `بسم الله الرحمن الرحيم

${hijriDate}
${gregorianDate}

إلى سعادة ${recipientName}
${recipientTitle}

تحية طيبة وبعد،

يشرفني أن أتقدم إليكم بأصدق التهاني وأجمل التبريكات بمناسبة الزواج المبارك، أسأل الله العلي القدير أن يبارك لكم وأن يبارك عليكم ويجمع بينكم في خير.

الزواج سنة من سنن الحياة الكريمة وآية من آيات الله في خلقه، وهو بداية جديدة مليئة بالأمل والسعادة. أسأل الله تعالى أن يرزقكم السكينة والمودة والرحمة، وأن يجعل هذا الزواج مصدر خير وبركة لكم ولأهليكم الكرام.

كما أدعو الله سبحانه وتعالى أن يرزقكم الذرية الصالحة التي تكون قرة عين لكم، وأن يديم عليكم نعمة الحب والوفاق والتفاهم، وأن يجعل بيتكم عامراً بالإيمان والطاعة والسعادة.

تقبلوا منا أجمل التهاني وأصدق الدعوات بالسعادة الدائمة والتوفيق في الحياة الزوجية.

وتفضلوا بقبول فائق الاحترام والتقدير

${senderName}
${senderOrganization}`;
  } else if (occasion.includes('تخرج') || occasion.includes('نجاح') || occasion.includes('شهادة')) {
    arabicContent = `بسم الله الرحمن الرحيم

${hijriDate}
${gregorianDate}

إلى سعادة ${recipientName}
${recipientTitle}

تحية طيبة وبعد،

يسعدني أن أتقدم إليكم بأحر التهاني وأصدق التبريكات بمناسبة التخرج والنجاح المستحق، الذي يعكس جهدكم المتواصل وإصراركم على التميز والإبداع.

إن هذا الإنجاز الرائع هو ثمرة طبيعية للعمل الدؤوب والمثابرة الحقيقية، وهو بداية موفقة لمستقبل مشرق بإذن الله تعالى. نحن على ثقة تامة بأن هذا النجاح سيكون أول خطوة في مسيرة طويلة من النجاحات والإنجازات التي ستعود بالنفع عليكم وعلى مجتمعكم الكريم.

أسأل الله العلي القدير أن يوفقكم في المرحلة القادمة من حياتكم العملية والعلمية، وأن يسدد خطاكم ويبارك في مساعيكم، وأن يجعلكم من أصحاب العلم النافع والعمل الصالح الذي يخدم الوطن والمجتمع.

تقبلوا منا أجمل التهاني وأصدق الدعوات بالتوفيق والنجاح المستمر.

وتفضلوا بقبول فائق الاحترام والتقدير

${senderName}
${senderOrganization}`;
  } else {
    // General formal letter
    arabicContent = `بسم الله الرحمن الرحيم

${hijriDate}
${gregorianDate}

إلى سعادة ${recipientName}
${recipientTitle}

تحية طيبة وبعد،

يشرفني أن أتواصل معكم بهذا الخطاب بمناسبة ${occasion}، وأتقدم إليكم بأصدق التهاني والتبريكات بهذه المناسبة الكريمة.

نسأل الله تعالى أن يديم عليكم نعمه وأن يوفقكم في جميع أموركم، وأن يجعل هذه المناسبة بداية خير ونجاح وتوفيق بإذن الله. كما نتمنى لكم دوام الصحة والعافية والسعادة في حياتكم الكريمة.

إننا نعتز بالعلاقة الطيبة التي تربطنا بكم، ونتطلع إلى المزيد من التعاون والتواصل الإيجابي في المستقبل بإذن الله تعالى. أسأل الله أن يحفظكم ويرعاكم ويسدد خطاكم في كل خير.

تقبلوا منا أجمل التهاني وأصدق الدعوات بالتوفيق والسداد.

وتفضلوا بقبول فائق الاحترام والتقدير

${senderName}
${senderOrganization}`;
  }

  const result: GeneratedLetter = {
    arabicVersion: arabicContent
  };

  // Add English translation if needed
  if (letterData.needsTranslation) {
    result.englishVersion = generateEnglishTranslation(arabicContent, occasion);
  }

  // Add creative version if needed
  if (letterData.needsCreativeVersion) {
    result.creativeVersion = generateCreativeVersion(letterData);
  }

  return result;
};

const generateEnglishTranslation = (arabicContent: string, occasion: string): string => {
  if (occasion.includes('مولود') || occasion.includes('ولادة')) {
    return `In the Name of Allah, the Most Gracious, the Most Merciful

Dear Sir/Madam,

Greetings and best wishes,

I am delighted to extend my heartfelt congratulations on the arrival of your new baby. May Allah Almighty bless you with this new blessing and make the child among the righteous offspring.

We thank Allah for the safety of the honorable mother and for this great blessing, as children are the ornament of worldly life and the comfort of parents' eyes. I pray to Allah to protect this blessed child for you and to make them grow up well and be among the pious and righteous.

I also ask Allah Almighty to grant you happiness and joy with your children and to help you raise them with proper Islamic upbringing, making them a source of pride and honor for you in this world and the hereafter.

Please accept our warmest congratulations and sincere prayers for happiness and success.

With highest respect and appreciation`;
  }
  
  return `In the Name of Allah, the Most Gracious, the Most Merciful

Dear Sir/Madam,

Greetings and best wishes,

I am honored to extend my sincere congratulations and best wishes on this blessed occasion. May Allah continue to bestow His blessings upon you and grant you success in all your endeavors.

Please accept our warmest congratulations and sincere prayers for continued success and happiness.

With highest respect and appreciation`;
};

const generateCreativeVersion = (letterData: LetterData): string => {
  const { recipientName, recipientTitle, occasion, senderName, senderOrganization } = letterData;
  
  const now = new Date();
  const hijriDate = now.toLocaleDateString('ar-SA-u-ca-islamic');
  const gregorianDate = now.toLocaleDateString('ar-SA');

  if (occasion.includes('مولود') || occasion.includes('ولادة')) {
    return `بسم الله الرحمن الرحيم

${hijriDate}
${gregorianDate}

إلى سعادة ${recipientName} المحترم
${recipientTitle}

أزكى التحايا وأعطر السلام،

في هذا اليوم المبارك الذي أشرقت فيه شمس جديدة في سماء حياتكم، وتفتحت وردة جميلة في حديقة أسرتكم الكريمة، أتقدم إليكم بباقة من أجمل التهاني وأعذب التبريكات.

لقد منّ الله عليكم بنعمة عظيمة وهبة جليلة، فالأطفال هم بسمة الحياة وضحكة الأمل وأنشودة المستقبل. هذا المولود الجديد جاء ليضيء بيتكم بنور البراءة والطهر، وليملأ قلوبكم بفرحة لا توصف وسعادة لا تنتهي.

أسأل الباري جل وعلا أن يجعل هذا الطفل المبارك قرة عين لكم وسروراً لقلوبكم، وأن ينبته في طاعة الله وخدمة دينه ووطنه، وأن يكون له ذخراً في الدنيا والآخرة.

كما أدعو الله أن يحفظ الوالدة الكريمة ويديم عليها الصحة والعافية، وأن يرزقكم جميعاً السعادة والهناء في ظل هذه النعمة الغالية.

مع أطيب التمنيات وأجمل الدعوات

${senderName}
${senderOrganization}`;
  }

  return `بسم الله الرحمن الرحيم

${hijriDate}
${gregorianDate}

إلى سعادة ${recipientName} المحترم
${recipientTitle}

أزكى التحايا وأعطر السلام،

في هذه المناسبة الكريمة التي تحمل في طياتها معاني الفرح والسرور، أتشرف بأن أرفع إليكم أجمل باقات التهاني وأعذب كلمات التبريك، مزينة بأطيب الأماني وأصدق الدعوات.

إن هذه المناسبة المباركة تستحق منا كل التقدير والاحتفاء، وهي شاهد على ما تتمتعون به من مكانة رفيعة وقدر عالٍ في قلوبنا جميعاً.

أسأل الله العلي القدير أن يديم عليكم نعمة الصحة والعافية، وأن يوفقكم في جميع مساعيكم النبيلة، وأن يجعل أيامكم كلها خيراً وبركة وسعادة.

مع فائق الاحترام وأجمل التمنيات

${senderName}
${senderOrganization}`;
};
