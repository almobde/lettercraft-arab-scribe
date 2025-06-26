import { LetterData, GeneratedLetter } from '../types/letter';

const interpretOccasion = (occasion: string): string => {
  // Convert third person to second person and enhance the context
  let interpreted = occasion;
  
  // Handle common patterns
  interpreted = interpreted.replace(/جهوده/g, 'جهودكم');
  interpreted = interpreted.replace(/عمله/g, 'عملكم');
  interpreted = interpreted.replace(/أداءه/g, 'أداءكم');
  interpreted = interpreted.replace(/إنجازه/g, 'إنجازكم');
  interpreted = interpreted.replace(/تفانيه/g, 'تفانيكم');
  interpreted = interpreted.replace(/اجتهاده/g, 'اجتهادكم');
  
  // Add contextual enhancements
  if (interpreted.includes('شكر') && !interpreted.includes('الشكر')) {
    interpreted = interpreted.replace('شكر', 'الشكر الجزيل والثناء العاطر');
  }
  
  if (interpreted.includes('جهود') && !interpreted.includes('المتميزة')) {
    interpreted = interpreted.replace('جهود', 'الجهود المتميزة والمساعي الحثيثة');
  }
  
  return interpreted;
};

const addDiacritics = (text: string): string => {
  // Add comprehensive diacritics to common words and phrases
  let diacritizedText = text;
  
  // Common formal phrases
  diacritizedText = diacritizedText.replace(/السلام عليكم/g, 'السَّلامُ عَلَيْكُمْ');
  diacritizedText = diacritizedText.replace(/ورحمة الله وبركاته/g, 'وَرَحْمَةُ اللهِ وَبَرَكاتُهُ');
  diacritizedText = diacritizedText.replace(/بسم الله الرحمن الرحيم/g, 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ');
  diacritizedText = diacritizedText.replace(/سعادة/g, 'سَعادَةُ');
  diacritizedText = diacritizedText.replace(/التاريخ/g, 'التَّارِيخُ');
  
  // Common verbs and expressions
  diacritizedText = diacritizedText.replace(/نتوجه/g, 'نَتَوَجَّهُ');
  diacritizedText = diacritizedText.replace(/نتشرف/g, 'نَتَشَرَّفُ');
  diacritizedText = diacritizedText.replace(/يطيب/g, 'يَطِيبُ');
  diacritizedText = diacritizedText.replace(/نقدر/g, 'نُقَدِّرُ');
  diacritizedText = diacritizedText.replace(/الشكر/g, 'الشُّكْرُ');
  diacritizedText = diacritizedText.replace(/الجزيل/g, 'الجَزِيلُ');
  diacritizedText = diacritizedText.replace(/الامتنان/g, 'الامْتِنانُ');
  diacritizedText = diacritizedText.replace(/العرفان/g, 'العِرْفانُ');
  diacritizedText = diacritizedText.replace(/التقدير/g, 'التَّقْدِيرُ');
  diacritizedText = diacritizedText.replace(/الاحترام/g, 'الاحْتِرامُ');
  diacritizedText = diacritizedText.replace(/المتميزة/g, 'المُتَمَيِّزَةُ');
  diacritizedText = diacritizedText.replace(/الجهود/g, 'الجُهُودُ');
  diacritizedText = diacritizedText.replace(/الأعمال/g, 'الأَعْمالُ');
  diacritizedText = diacritizedText.replace(/الإنجازات/g, 'الإِنْجازاتُ');
  
  return diacritizedText;
};

const generateArabicLetter = (data: LetterData): string => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  const currentDate = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Start with recipient title (using "سعادة" instead of "حضرة")
  const recipientTitle = data.recipientTitle ? 
    `سعادة ${data.recipientTitle}` : 
    'سعادة المحترم';
  
  const recipientName = data.recipientName || '';
  
  // Greeting
  const greeting = 'السلام عليكم ورحمة الله وبركاته';
  
  // Interpret and enhance the occasion
  const enhancedOccasion = interpretOccasion(data.occasion);
  
  // Body content based on tone with rich details
  let body = '';
  if (enhancedOccasion) {
    switch (data.tone) {
      case 'تحفيزية':
        body = `يطيب لنا في هذا اليوم المبارك أن نتوجه إليكم بأسمى آيات الشكر والعرفان، وأصدق عبارات التقدير والامتنان، على ${enhancedOccasion}. 

إن ما قدمتموه من جهود متميزة وعمل دؤوب، وما بذلتموه من وقت ثمين وفكر نير، يستحق منا كل التقدير والإعجاب. فقد كان لعملكم المتقن وتفانيكم الصادق أثر بالغ في تحقيق النجاح والتميز.

نحن نقدر عالياً ما تتحلون به من خلق رفيع وسلوك قويم، وما تظهرونه من حرص بالغ على أداء الواجب بأفضل صورة ممكنة. إن إنجازاتكم المتميزة تعكس شخصيتكم النبيلة وقدراتكم الاستثنائية.

نسأل الله العلي القدير أن يبارك في جهودكم، وأن يوفقكم لما فيه الخير والصلاح، وأن يجعل عملكم في ميزان حسناتكم.`;
        break;
      
      case 'أدبية':
        body = `نرفع إليكم في هذا اليوم الطيب أجمل التحيات وأعطر السلام، ونقدم لكم أصدق عبارات الثناء والإكبار على ${enhancedOccasion}.

لقد كان عملكم المتميز بمثابة النجم الساطع في سماء التميز، والدرة الثمينة في تاج الإنجاز. فقد أضفتم بجهودكم المباركة لمسة جمال وإبداع، وبصمة واضحة لا تُمحى من ذاكرة الزمن.

إن ما شهدناه من تفانٍ صادق ومثابرة حقيقية، وما لمسناه من حرص بالغ على الإتقان والجودة، يجعلنا نقف إجلالاً وتقديراً لشخصكم الكريم. لقد رسمتم بأعمالكم النبيلة لوحة فنية رائعة من الجد والاجتهاد.

نحن نفتخر بوجودكم بيننا، ونعتز بما تقدمونه من عطاء متميز وإسهامات قيمة تثري مسيرة العمل وتزيدها إشراقاً ونوراً.`;
        break;
      
      case 'ودية':
        body = `نتوجه إليكم بقلوب مفعمة بالمحبة والتقدير، وبمشاعر صادقة من الامتنان والعرفان، لنشكركم من أعماق قلوبنا على ${enhancedOccasion}.

لقد تركت جهودكم الطيبة وأعمالكم النبيلة أثراً جميلاً في نفوسنا جميعاً. فقد كنتم بحق خير معين وأفضل مساعد، وقد أدركنا من خلال تعاملكم الراقي وسلوككم المهذب معنى التعاون الحقيقي والعمل بروح الفريق الواحد.

إن ذكرياتنا الجميلة معكم ستبقى محفورة في قلوبنا، وإن الأوقات الطيبة التي قضيناها في العمل المشترك ستظل من أجمل اللحظات في مسيرتنا. لقد كنتم بحق نموذجاً يُحتذى به في الأخلاق الحميدة والتعامل الراقي.

نشكركم مرة أخرى على كل ما قدمتموه، ونتمنى لكم دوام التوفيق والنجاح في جميع مساعيكم المستقبلية.`;
        break;
      
      default:
        body = `نتشرف بأن نتقدم إليكم بجزيل الشكر وعظيم الامتنان على ${enhancedOccasion}. 

إن الجهود المتميزة التي بذلتموها، والعمل الدؤوب الذي قمتم به، يستحق منا كل التقدير والثناء. لقد أظهرتم من خلال عملكم المتقن مدى حرصكم على التميز والإتقان، وقد كان لذلك أثر إيجابي واضح على سير العمل وتحقيق الأهداف المنشودة.

نقدر عالياً ما تتحلون به من مسؤولية والتزام، وما تبذلونه من جهد صادق في سبيل أداء المهام الموكلة إليكم بأفضل صورة ممكنة. إن إنجازاتكم تعكس قدراتكم المهنية العالية وخبرتكم الواسعة في مجال عملكم.

نسأل الله أن يوفقكم في جميع مساعيكم، وأن يبارك في جهودكم المتواصلة، وأن يجعل عملكم سبباً في تحقيق المزيد من النجاحات والإنجازات.`;
    }
  }

  // Closing and signature
  const closing = 'وتقبلوا منا فائق الاحترام والتقدير';
  const senderName = data.senderName || 'المرسل';
  const organization = data.senderOrganization || '';
  
  // Date on the right
  const dateSection = `التاريخ: ${currentDate}`;

  let finalLetter = `بسم الله الرحمن الرحيم

${dateSection}

${recipientTitle}
${recipientName}

${greeting}

${body}

${closing}،


${senderName}
${organization}`;

  // Apply diacritics if requested
  if (data.needsDiacritics) {
    finalLetter = addDiacritics(finalLetter);
  }

  return finalLetter;
};

const generateEnglishTranslation = (data: LetterData): string => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Translate titles and names appropriately
  const translatedTitle = data.recipientTitle ? 
    translateTitle(data.recipientTitle) : 'The Honorable';
  const translatedName = data.recipientName ? 
    translateArabicName(data.recipientName) : '';
  
  let body = '';
  if (data.occasion) {
    const enhancedOccasion = interpretOccasion(data.occasion);
    const translatedOccasion = translateOccasion(enhancedOccasion);
    
    switch (data.tone) {
      case 'تحفيزية':
        body = `We are pleased to extend our highest appreciation and sincere gratitude for ${translatedOccasion}. Your outstanding efforts and dedicated work deserve all recognition and admiration. Your commitment to excellence and quality has made a significant positive impact on our organization's success.

We deeply value your exceptional skills and professional approach. Your achievements reflect your noble character and remarkable abilities. We pray that Allah blesses your efforts and grants you continued success in all your future endeavors.`;
        break;
      case 'أدبية':
        body = `We extend our finest greetings and most sincere appreciation for ${translatedOccasion}. Your distinguished work has been like a shining star in the sky of excellence, adding beauty and creativity to our organization.

Your dedication and perseverance, along with your commitment to quality and perfection, make us stand in admiration of your noble character. You have painted a beautiful artistic canvas with your noble deeds and tireless efforts.

We are proud to have you among us and cherish the valuable contributions you make to enrich our work journey.`;
        break;
      case 'ودية':
        body = `We approach you with hearts filled with love and appreciation, and sincere feelings of gratitude, to thank you from the depths of our hearts for ${translatedOccasion}.

Your kind efforts and noble deeds have left a beautiful impact on all of us. You have been truly the best helper and supporter, and through your refined dealings and courteous behavior, we have realized the meaning of true cooperation.

Our beautiful memories with you will remain engraved in our hearts, and the good times we spent working together will remain among the most beautiful moments in our journey.`;
        break;
      default:
        body = `We are honored to extend our sincere thanks and great appreciation for ${translatedOccasion}. Your distinguished efforts and diligent work deserve all our appreciation and praise.

You have demonstrated through your excellent work your commitment to excellence and perfection, which has had a clear positive impact on work progress and achieving the desired goals. We highly appreciate your sense of responsibility and commitment.

We pray that Allah grants you success in all your endeavors and blesses your continuous efforts.`;
    }
  }

  const closing = 'With highest respect and appreciation';
  const translatedSenderName = data.senderName ? translateArabicName(data.senderName) : 'The Sender';
  const translatedOrganization = data.senderOrganization ? translateOrganization(data.senderOrganization) : '';

  return `Date: ${currentDate}

${translatedTitle}
${translatedName}

Peace be upon you and Allah's mercy and blessings.

${body}

${closing},


${translatedSenderName}
${translatedOrganization}`;
};

// Helper functions for translation
const translateTitle = (title: string): string => {
  const titleMap: Record<string, string> = {
    'مدير إدارة التعليم': 'Director of Education Administration',
    'مشرف تربوي': 'Educational Supervisor',
    'رئيس قسم': 'Department Head',
    'مدير': 'Director',
    'معلم': 'Teacher',
    'أستاذ': 'Professor'
  };
  
  for (const [arabic, english] of Object.entries(titleMap)) {
    if (title.includes(arabic)) {
      return `The Honorable ${english}`;
    }
  }
  
  return `The Honorable ${title}`;
};

const translateArabicName = (name: string): string => {
  // Simple transliteration for common Arabic names
  return name
    .replace(/محمد/g, 'Mohammed')
    .replace(/أحمد/g, 'Ahmed')
    .replace(/علي/g, 'Ali')
    .replace(/حسن/g, 'Hassan')
    .replace(/خالد/g, 'Khalid')
    .replace(/عبد الله/g, 'Abdullah')
    .replace(/عبدالله/g, 'Abdullah')
    .replace(/بن/g, 'bin')
    .replace(/العتيبي/g, 'Al-Otaibi')
    .replace(/الخرج/g, 'Al-Kharj');
};

const translateOrganization = (org: string): string => {
  return org
    .replace(/إدارة التعليم/g, 'Education Administration')
    .replace(/وزارة التعليم/g, 'Ministry of Education')
    .replace(/محافظة/g, 'Province of');
};

const translateOccasion = (occasion: string): string => {
  return occasion
    .replace(/الشكر الجزيل والثناء العاطر/g, 'sincere gratitude and heartfelt appreciation')
    .replace(/الجهود المتميزة والمساعي الحثيثة/g, 'outstanding efforts and dedicated endeavors')
    .replace(/جهودكم/g, 'your efforts')
    .replace(/عملكم/g, 'your work');
};

const generateCreativeVersion = (data: LetterData): string => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  const currentDate = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const greeting = data.recipientName ? `إلى صاحب القلب الكبير والعقل النير / ${data.recipientName}` : 'إلى رمز العطاء والإبداع';
  const title = data.recipientTitle ? `${data.recipientTitle}` : '';
  
  let body = '';
  if (data.occasion) {
    switch (data.tone) {
      case 'تحفيزية':
        body = `في رحاب هذا اليوم المشرق، نقف بكل فخر واعتزاز لنحتفي بإنجازكم المتميز في ${data.occasion}. 

لقد أضأتم طريق النجاح بأعمالكم الرائعة، وزرعتم بذور الأمل في قلوب الجميع. إن إبداعكم المتجدد وعطاءكم المتواصل يستحق أن يُكتب بماء الذهب في سجل التاريخ.

أنتم نجوم تضيء سماء العمل، ومنارات تهدي السالكين نحو التميز والإبداع. بفضل جهودكم المخلصة، تحولت الأحلام إلى حقائق، والتحديات إلى إنجازات تفتخر بها الأجيال.`;
        break;
      case 'أدبية':
        body = `في ${data.occasion}، رسمتم لوحة فنية بديعة من الإتقان والجمال، ونحتم تمثالاً رائعاً من الإبداع والتميز.

كالنهر العذب الذي يروي الأرض العطشى، كان عطاؤكم يسقي بستان العمل بماء الإخلاص والتفاني. وكالشمس التي تشرق كل صباح، كان حضوركم ينير دروب النجاح ويبدد ظلمات التحديات.

أنتم شعراء النجاح بأعمالكم، وكتّاب التميز بإنجازاتكم، وفنانو الإبداع بإسهاماتكم القيمة.`;
        break;
      case 'ودية':
        body = `يا صاحب القلب الطيب والروح النقية، كم هو رائع ما قدمتموه في ${data.occasion}!

قلوبنا تفيض بالامتنان والعرفان لكم، وأرواحنا تهتف بالشكر والثناء لجهودكم النبيلة. لقد كنتم بحق أخاً كريماً وصديقاً وفياً، يسعى دائماً لتحقيق الخير والنماء.

في أوقات الشدة كنتم العون والسند، وفي لحظات الفرح كنتم الرفيق والأنيس. ذكرياتنا معكم كبستان أزهار، كلما مررنا به شممنا عبير الوفاء وأريج المحبة.`;
        break;
      default:
        body = `إن ${data.occasion} شاهد صدق على تميزكم وإبداعكم، ودليل واضح على قدراتكم الاستثنائية ومهاراتكم الفذة.

نحتفي اليوم بإنجازكم العظيم، ونقدر عالياً ما بذلتموه من جهد مضاعف وعمل دؤوب. لقد برهنتم من خلال أعمالكم أن العزيمة الصادقة والإرادة القوية قادرتان على تحويل المستحيل إلى ممكن.

عطاؤكم المتواصل وإخلاصكم الصادق سيبقيان محفورين في ذاكرة التاريخ، ومنارتين تضيئان طريق الأجيال القادمة نحو التميز والإبداع.`;
    }
  }

  const closing = 'بكل الحب والتقدير والاحترام';
  const signature = data.senderName || 'محبكم الصادق';
  const organization = data.senderOrganization || '';

  return `بسم الله الرحمن الرحيم

${currentDate}

${greeting}
${title}

السلام عليكم ورحمة الله وبركاته

${body}

${closing}،


${signature}
${organization}`;
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
