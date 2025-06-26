import { LetterData, GeneratedLetter } from '../types/letter';
import { generateWithGemini, createLetterPrompt, createEnglishPrompt } from './geminiService';

const interpretOccasion = (occasion: string): string => {
  let interpreted = occasion;
  
  // Handle common patterns and convert to second person
  interpreted = interpreted.replace(/جهوده/g, 'جهودكم المباركة');
  interpreted = interpreted.replace(/عمله/g, 'عملكم المتميز');
  interpreted = interpreted.replace(/أداءه/g, 'أداءكم الرائع');
  interpreted = interpreted.replace(/إنجازه/g, 'إنجازاتكم الباهرة');
  interpreted = interpreted.replace(/تفانيه/g, 'تفانيكم النبيل');
  interpreted = interpreted.replace(/اجتهاده/g, 'اجتهادكم المشكور');
  interpreted = interpreted.replace(/مساهمته/g, 'مساهماتكم القيمة');
  interpreted = interpreted.replace(/دوره/g, 'دوركم الفعال');
  interpreted = interpreted.replace(/مشاركته/g, 'مشاركتكم الفاعلة');
  
  // Enhance with context-appropriate phrases
  if (interpreted.includes('شكر') && !interpreted.includes('الشكر')) {
    interpreted = interpreted.replace('شكر', 'الثناء العطر والشكر الجزيل');
  }
  
  if (interpreted.includes('تهنئة')) {
    interpreted = interpreted.replace('تهنئة', 'أطيب التهاني وأجمل التبريكات');
  }
  
  if (interpreted.includes('تقدير')) {
    interpreted = interpreted.replace('تقدير', 'التقدير العميق والاعتراف الصادق');
  }
  
  return interpreted;
};

const addDiacritics = (text: string): string => {
  let diacritizedText = text;
  
  // Add comprehensive diacritics to common words and phrases
  diacritizedText = diacritizedText.replace(/السلام عليكم/g, 'السَّلامُ عَلَيْكُمْ');
  diacritizedText = diacritizedText.replace(/ورحمة الله وبركاته/g, 'وَرَحْمَةُ اللهِ وَبَرَكاتُهُ');
  diacritizedText = diacritizedText.replace(/بسم الله الرحمن الرحيم/g, 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ');
  diacritizedText = diacritizedText.replace(/سعادة/g, 'سَعادَةُ');
  diacritizedText = diacritizedText.replace(/التاريخ/g, 'التَّارِيخُ');
  
  // Common verbs and expressions - Enhanced coverage
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
  
  // Additional common words
  diacritizedText = diacritizedText.replace(/نسأل/g, 'نَسْأَلُ');
  diacritizedText = diacritizedText.replace(/الله/g, 'اللهُ');
  diacritizedText = diacritizedText.replace(/العلي/g, 'العَلِيُّ');
  diacritizedText = diacritizedText.replace(/القدير/g, 'القَدِيرُ');
  diacritizedText = diacritizedText.replace(/يبارك/g, 'يُبارِكَ');
  diacritizedText = diacritizedText.replace(/يوفقكم/g, 'يُوَفِّقَكُمْ');
  diacritizedText = diacritizedText.replace(/المبارك/g, 'المُبارَكُ');
  diacritizedText = diacritizedText.replace(/المباركة/g, 'المُبارَكَةُ');
  diacritizedText = diacritizedText.replace(/تقبلوا/g, 'تَقَبَّلُوا');
  diacritizedText = diacritizedText.replace(/فائق/g, 'فائِقَ');
  diacritizedText = diacritizedText.replace(/ما قدمتموه/g, 'ما قَدَّمْتُمُوهُ');
  diacritizedText = diacritizedText.replace(/بذلتموه/g, 'بَذَلْتُمُوهُ');
  diacritizedText = diacritizedText.replace(/أظهرتم/g, 'أَظْهَرْتُمْ');
  diacritizedText = diacritizedText.replace(/كنتم/g, 'كُنْتُمْ');
  diacritizedText = diacritizedText.replace(/ستبقى/g, 'سَتَبْقَى');
  diacritizedText = diacritizedText.replace(/محفورة/g, 'مَحْفُورَةً');
  diacritizedText = diacritizedText.replace(/قلوبنا/g, 'قُلُوبِنا');
  diacritizedText = diacritizedText.replace(/الطيبة/g, 'الطَّيِّبَةُ');
  diacritizedText = diacritizedText.replace(/النبيلة/g, 'النَّبِيلَةُ');
  diacritizedText = diacritizedText.replace(/الصادقة/g, 'الصَّادِقَةُ');
  diacritizedText = diacritizedText.replace(/المتواصل/g, 'المُتَواصِلُ');
  diacritizedText = diacritizedText.replace(/المتواصلة/g, 'المُتَواصِلَةُ');
  diacritizedText = diacritizedText.replace(/الدؤوب/g, 'الدَّؤُوبُ');
  diacritizedText = diacritizedText.replace(/المتقن/g, 'المُتْقَنُ');
  diacritizedText = diacritizedText.replace(/الإتقان/g, 'الإِتْقانُ');
  diacritizedText = diacritizedText.replace(/والجودة/g, 'وَالجَوْدَةُ');
  
  return diacritizedText;
};

const generateArabicLetter = async (data: LetterData, forceRegenerate: boolean = false): Promise<string> => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  try {
    const enhancedOccasion = interpretOccasion(data.occasion);
    const prompt = createLetterPrompt(
      data.recipientName,
      data.recipientTitle || 'المحترم',
      enhancedOccasion,
      data.tone,
      data.senderName || 'المرسل',
      data.senderOrganization || '',
      forceRegenerate
    );

    let generatedLetter = await generateWithGemini(prompt);

    if (data.needsDiacritics) {
      generatedLetter = addDiacritics(generatedLetter);
    }

    return generatedLetter;
  } catch (error) {
    console.error('Error generating letter with Gemini:', error);
    return generateFallbackLetter(data);
  }
};

const generateEnglishTranslation = async (data: LetterData): Promise<string> => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  try {
    const enhancedOccasion = interpretOccasion(data.occasion);
    const prompt = createEnglishPrompt(
      data.recipientName,
      data.recipientTitle || 'The Honorable',
      enhancedOccasion,
      data.tone,
      data.senderName || 'The Sender',
      data.senderOrganization || ''
    );

    const translation = await generateWithGemini(prompt);
    return translation;
  } catch (error) {
    console.error('Error generating English translation:', error);
    return generateFallbackEnglishTranslation(data);
  }
};

const generateFallbackLetter = (data: LetterData): string => {
  const currentDate = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const recipientTitle = data.recipientTitle ? 
    `سعادة ${data.recipientTitle}` : 
    'سعادة المحترم';
  
  const recipientName = data.recipientName || '';
  const greeting = 'السلام عليكم ورحمة الله وبركاته';
  const enhancedOccasion = interpretOccasion(data.occasion);
  
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

  const closing = 'وتقبلوا منا فائق الاحترام والتقدير';
  const senderName = data.senderName || 'المرسل';
  const organization = data.senderOrganization || '';
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

  if (data.needsDiacritics) {
    finalLetter = addDiacritics(finalLetter);
  }

  return finalLetter;
};

const generateFallbackEnglishTranslation = (data: LetterData): string => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
      return `His Excellency the ${english}`;
    }
  }
  
  return `His Excellency the ${title}`;
};

const translateArabicName = (name: string): string => {
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
    .replace(/الثناء العطر والشكر الجزيل/g, 'heartfelt appreciation and sincere gratitude')
    .replace(/الجهود المباركة/g, 'blessed efforts')
    .replace(/العمل المتميز/g, 'distinguished work')
    .replace(/الأداء الرائع/g, 'excellent performance')
    .replace(/الإنجازات الباهرة/g, 'brilliant achievements')
    .replace(/التفاني النبيل/g, 'noble dedication')
    .replace(/الاجتهاد المشكور/g, 'commendable diligence')
    .replace(/المساهمات القيمة/g, 'valuable contributions')
    .replace(/الدور الفعال/g, 'effective role')
    .replace(/المشاركة الفاعلة/g, 'active participation')
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

  // Expanded creative greetings with much more variety
  const creativeGreetings = [
    'إلى منارة العطاء ورمز الإبداع والتميز',
    'إلى صاحب القلم الذهبي والفكر النوراني',
    'إلى شمعة تضيء دروب النجاح بعطائها المتدفق',
    'إلى النجم الساطع في سماء المعرفة والحكمة',
    'إلى البستاني الماهر الذي يزرع بذور الأمل',
    'إلى المعلم الفاضل والقدوة الحسنة في العطاء',
    'إلى رائد التميز وصانع المعجزات بإرادته الصلبة',
    'إلى القلب النابض بالحب والعقل المتوقد بالحكمة',
    'إلى الطائر المحلق في سماء الإبداع اللامحدود',
    'إلى الجوهرة النادرة التي تضيء عتمة الطريق',
    'إلى النهر العذب الذي يروي أرض الطموحات',
    'إلى الكنز الثمين والدرة المضيئة في تاج الشرف',
    'إلى صانع الأحلام ونحات التحف من رخام الإبداع',
    'إلى الفارس النبيل الذي يحمل راية العلم عالياً',
    'إلى القمر المنير الذي يبدد ظلمات الجهل',
    'إلى الوردة العطرة في حديقة الأخلاق الفاضلة',
    'إلى المهندس البارع الذي يبني جسور المستقبل',
    'إلى الطبيب الحاذق الذي يداوي جراح الأرواح',
    'إلى الكاتب الماهر الذي ينسج من الكلمات لوحات',
    'إلى السيمفونية الرائعة التي تعزف أنغام النجاح',
    'إلى النسر المحلق في أجواء العلياء والمجد',
    'إلى الشجرة الوارفة التي تظلل العطشان بظلالها',
    'إلى المصباح المضيء في ليالي الظلماء الحالكة',
    'إلى الينبوع الصافي الذي يروي العقول الظمأى',
    'إلى الجبل الأشم الراسخ في عالم التميز والإبداع'
  ];

  // Enhanced creative openings with deeper poetic language
  const creativeOpenings = {
    رسمية: [
      'في رحاب هذا اليوم المشرق المبارك، وتحت سماء مزدانة بنجوم التقدير اللامعة والإجلال الصادق، نقف بكل فخر واعتزاز وإجلال عميق أمام إنجازكم المتميز الباهر الذي يضيء دروب المستقبل الزاهر بنوره الوهاج المشع. إن ما حققتموه من نجاحات باهرة ومذهلة يشهد بوضوح على عظمة الروح الإنسانية النبيلة وقدرتها اللامحدودة على الإبداع المتجدد والعطاء النبيل الذي لا ينضب أبداً.',
      'تحت ظلال هذا اليوم الميمون المبارك، وفي حضرة عطائكم المقدس المبارك الذي يفوح بأريج الإخلاص والتفاني، نتشرف ونتباهى بأن نرفع إليكم أسمى آيات التقدير العميق وأعذب عبارات الثناء العطر التي تنبع من أعماق القلوب المحبة الصادقة. لقد كان عملكم المتقن الرائع بمثابة القطرات الندية المباركة التي تحيي الأرض الظمأى وتبعث فيها الحياة والنماء، وكالنسيم العليل العذب الذي يبعث الأمل المشرق في النفوس المتعطشة للتميز والإبداع.',
      'في غمرة هذا اليوم البهيج السعيد، وبين أنوار الفرح المتلألئة الساطعة التي تملأ الأفق بالبهجة والسرور، يسعدنا أيما سعادة أن نتوجه إليكم بأجمل عبارات الثناء العطر وأصدق كلمات التقدير الخالصة التي تنبع من أعماق قلوبنا المفعمة بالحب والإعجاب. إن إنجازاتكم الرفيعة السامية تحكي قصة كفاح مشرق ونبيل، وتروي حكاية عطاء متدفق لا ينضب مداده أبداً، وتسطر ملحمة نجاح خالدة تتوارثها الأجيال المتعاقبة كنز ثمين لا يفنى.'
    ],
    تحفيزية: [
      'كالنجم الساطع المتألق في سماء الإبداع اللامحدودة الفسيحة، أضأتم دروب النجاح والتميز بعطائكم المتدفق الدائم وإبداعكم المتجدد المستمر الذي لا يتوقف أبداً. لقد تحولت رؤاكم النيرة الثاقبة إلى حقائق مشرقة تضيء الطريق، وأحلامكم السامية النبيلة إلى واقع مذهل يفوق كل التوقعات والآمال المرتقبة. إن مسيرتكم الحافلة بالإنجازات الباهرة تحكي للأجيال قصة إرادة صلبة لا تلين أمام التحديات، وعزيمة قوية تحول المستحيل إلى ممكن بإذن الله العلي القدير.',
      'كالشمس المشرقة الوهاجة التي تبدد ظلمات الليل الدامس وتنير الكون بأسره، كان إشراقكم المبارك ينير طريق التميز والإبداع للجميع من حولكم ويهديهم إلى شواطئ النجاح الآمنة. لقد صنعتم من التحديات الصعبة سلالم متينة للصعود نحو القمم الشامخة، ومن الصعوبات المستعصية جسوراً قوية للعبور نحو آفاق النجاح الرحبة. إن عطاءكم المتواصل الدائم يزرع بذور الأمل الخضراء في قلوب الأجيال القادمة ويبشرهم بمستقبل مشرق زاهر.',
      'كالنهر العذب الجاري الذي يروي الأرض الظمأى ويبعث فيها الخضرة والنماء، كان عطاؤكم النبيل المقدس يسقي بستان الإنجاز والتميز بماء الحياة المتدفق والتجدد المستمر. لقد نحتم بأناملكم الماهرة من صخور الصعوبات الصلبة تماثيل رائعة للنجاح والفلاح، ورسمتم بألوان الأمل المشرق لوحات فنية بديعة تخلد في ذاكرة التاريخ إلى أبد الآبدين. إن قدرتكم الاستثنائية على تحويل الأحلام البعيدة إلى حقائق مشرقة تجعلكم قدوة حسنة يحتذى بها في كل زمان ومكان.'
    ],
    أدبية: [
      'في لوحة فنية بديعة رائعة الجمال من الإتقان المذهل والجمال الأخاذ، رسمتم تحفة فنية نادرة من الإبداع الأصيل بألوان الحب الصادق والتفاني النبيل الذي لا حدود له. كل خطوة مباركة خطوتموها في دروب الحياة كانت بمثابة بيت شعر عذب يُتلى على مسامع العاشقين للجمال، وكل عمل جليل قمتم به كان قصيدة غناء رائعة تتراقص على أوتار القلوب المحبة الصافية وتطربها بأعذب الألحان. لقد تحولت حياتكم النبيلة الطاهرة إلى ديوان شعري مفتوح يقرأ فيه الناس في كل أنحاء العالم معاني الجمال الحقيقي والإبداع الأصيل الذي لا يُضاهى.',
      'كقصيدة غناء ساحرة تتراقص على أوتار القلوب العاشقة للجمال والمحبة للفن الأصيل، كانت أعمالكم النبيلة تعزف سيمفونية النجاح المذهلة بألحان عذبة تطرب الأرواح الطيبة وتسعد النفوس المحبة للخير والجمال. في كل حرف ذهبي كتبتموه بأقلامكم المباركة بصمة أصالة خالدة، وفي كل كلمة نورانية نطقتموها عبق تاريخ عريق أصيل، وفي كل عمل مبارك أنجزتموه رائحة خلود عطرة تفوح عبر الزمان والمكان وتملأ الدنيا بعطرها الفواح.',
      'في حديقة غناء مزهرة بألوان العطاء المتنوعة الزاهية والإبداع المتجدد الدائم، نبتت وردة إنجازكم العطرة الفواحة تفوح بأريج التميز الأصيل والإبداع المبدع الذي يأسر القلوب والعقول. كل ورقة نضرة من أوراقها الخضراء تحكي قصة كفاح مشرق ونضال نبيل، وكل عطر زكي يفوح منها يروي حكاية نجاح باهر وتفوق مذهل، وكل لون بهيج يزينها يسطر ملحمة عطاء خالدة تتناقلها الأجيال المتعاقبة كنز ثمين لا يفنى ولا يبلى مهما تقادمت السنون.'
    ],
    ودية: [
      'يا صاحب القلب الطيب الكبير والروح النقية الصافية كالبلور الشفاف، كم هو رائع ومبارك ما غرستموه من بذور الخير الطيبة في حقول الحياة الخضراء الواسعة! لقد كنتم بحق وصدق كالمطر المبارك الذي ينزل من السماء على الأرض العطشى فيحييها ويبعث فيها الخضرة والنماء، وكالنسيم العليل العذب الذي يداعب الوجوه المتعبة الظمأى فيبعث فيها الأمل المشرق والحياة المتجددة. إن معرفتكم الطيبة كانت هدية ثمينة من السماء تضيء دروبنا المظلمة وتنير لنا طريق الخير والفلاح.',
      'أيها الأخ الكريم النبيل والصديق الوفي المخلص الذي لا تغيره الأيام ولا تبدله السنون الطوال، لقد تركتم في قلوبنا المحبة أثراً جميلاً عميقاً لا يُمحى مهما تقادمت السنون الطويلة وتوالت الفصول المتعاقبة. كنتم بحق وصدق كالشمعة المباركة التي تضيء للآخرين طريق الخير وتحترق من أجلهم بكل صدق وإخلاص، وكالنجم الهادي الساطع الذي يهتدي به التائهون في ظلمات الليل الحالك ويرشدهم إلى بر الأمان. إن ذكراكم الطيبة العطرة محفورة بأحرف من نور في أعماق أرواحنا المحبة.',
      'يا من زرعتم في حديقة قلوبنا الطيبة النقية أجمل الورود العطرة الفواحة وأنبل المشاعر الصافية الطاهرة، ويا من كتبتم بأقلام الحب الصادق النقي في صفحات أرواحنا البيضاء النظيفة أعذب الكلمات الجميلة وأجمل المعاني السامية النبيلة، لقد تركتم في نفوسنا المحبة الصادقة أثراً جميلاً خالداً كالعطر الفواح الزكي يدوم مدى الحياة ولا يمحوه زمان عابر ولا ينسيه مكان بعيد. إن وجودكم المبارك الطيب في حياتنا كان نعمة عظيمة من الله ومنة كريمة جليلة نحمد الله عليها في كل وقت وحين ونشكره على هذه النعمة الجليلة العظيمة.'
    ]
  };

  // Enhanced middle content with much more detailed and poetic language
  const expandedMiddleContent = {
    رسمية: [
      'لقد برهنتم من خلال جهودكم الدؤوبة المباركة وعملكم المتقن الرائع الذي يشع بأنوار الإتقان الساطعة والجودة العالية أن العزيمة الصادقة القوية والإرادة الصلبة الراسخة قادرتان بإذن الله على تجاوز كل التحديات الصعبة وتحقيق أسمى الغايات النبيلة والأهداف السامية المرجوة. إن إنجازاتكم المبهرة المذهلة التي تتألق كالنجوم اللامعة في سماء التميز الفسيحة تشهد بوضوح تام على مدى تفانيكم الصادق الذي لا حدود له وحرصكم البالغ العميق على الوصول إلى أعلى معايير الجودة والإتقان المطلوبة. لقد صنعتم من العمل عبادة مقدسة، ومن الإتقان منهج حياة راسخ، ومن التميز سبيل عيش نبيل يحتذى به في كل زمان ومكان.',
      'من خلال مسيرتكم الحافلة بالعطاء المتدفق الدائم والإنجاز المستمر المتواصل الذي لا يتوقف أبداً عن الإبداع والتجديد، أثبتتم بما لا يدع مجالاً للشك أو الريب أن النجاح الحقيقي الباقي يكمن في الجمع المتناغم الرائع بين الرؤية الواضحة الثاقبة كالشمس في رابعة النهار الساطع والعمل الدؤوب المخلص الذي لا يكل ولا يمل مهما طالت المسافة. لقد كانت جهودكم المباركة الطيبة التي تفوح بعطر الإخلاص الصادق والتفاني النبيل منارة مضيئة تضيء طريق الآخرين نحو التميز والإبداع المنشود، وبوصلة هادية تهديهم إلى شواطئ النجاح الآمنة المرجوة.',
      'إن ما حققتموه من نجاحات باهرة مذهلة تخلب الألباب وتأسر القلوب وإنجازات متميزة رائعة تبهر العقول وتدهش الأفهام يعكس بوضوح تام ووضوح جلي شخصيتكم الاستثنائية الفريدة التي جمعت بحكمة بالغة بين الحكمة العميقة والشجاعة الأدبية وقدراتكم الفذة النادرة التي تتجلى بوضوح في كل عمل مبارك تقومون به بإتقان وإحسان. لقد تمكنتم بفضل حكمتكم البالغة العميقة وخبرتكم الواسعة الثرية التي اكتسبتموها عبر سنوات طويلة مديدة من الكفاح الشريف والعمل المثمر من تحويل التحديات الصعبة المستعصية إلى فرص ذهبية ثمينة للنمو والتطور والازدهار المنشود.'
    ],
    تحفيزية: [
      'بفضل جهودكم المخلصة الصادقة التي تنبع من أعماق القلب الطيب النقي وعزيمتكم الصلبة الراسخة التي لا تلين أمام العواصف الهوجاء والرياح العاتية، تحولت الأحلام البعيدة الجميلة إلى حقائق مشرقة باهرة تضيء دروب المستقبل الزاهر بنورها الساطع، والتحديات المستعصية الصعبة إلى إنجازات رائعة مذهلة تفتخر بها الأجيال المتعاقبة وتتباهى بها في كل محفل ومجمع. لقد أصبحتم بجدارة واستحقاق مثالاً حياً يُحتذى به في المثابرة الحقيقية الصادقة والإصرار الذي لا يعرف المستحيل أبداً على تحقيق الأهداف السامية مهما كانت صعوبتها الشديدة أو علو مرتبتها في سلم الطموحات العالية.',
      'إن إبداعكم المتجدد الدائم الذي ينبض بالحياة والحيوية وعطاءكم المتواصل المبارك الذي يتدفق كالنهر الجاري العذب قد غرس في قلوب الجميع من حولكم بذور الأمل الخضراء الجميلة والتفاؤل المشرق الزاهر بالمستقبل الواعد البهيج. لقد أثبتتم بأعمالكم الجليلة المباركة وأفعالكم النبيلة الطاهرة أن الإنسان قادر بإذن الله على صنع المعجزات الحقيقية الباهرة عندما يؤمن إيماناً راسخاً قوياً بقدراته الكامنة العظيمة ويعمل بصدق لا يشوبه رياء وإخلاص لا تعتريه شائبة من الشوائب.',
      'عبر رحلتكم الملهمة المذهلة في عالم التميز والإبداع الواسع الفسيح الذي لا حدود له ولا قيود تحده، رسمتم بأناملكم المباركة خارطة طريق واضحة المعالم جلية المسالك للنجاح الحقيقي الباقي، وأضأتم شعلة الأمل الوهاجة الساطعة في نفوس كل من يسعى بجد واجتهاد صادق لتحقيق أحلامه العظيمة الجميلة وطموحاته السامية النبيلة المشروعة. إن مسيرتكم الحافلة بالإنجازات تحكي للأجيال قصة كفاح مشرق نبيل وتروي حكاية عطاء متدفق لا ينضب أبداً مهما طال الزمان.'
    ],
    أدبية: [
      'في سجل التاريخ المجيد المكتوب بماء الذهب الخالص الثمين على صفحات بيضاء من نور ساطع وضياء باهر، ستُخلد أعمالكم النبيلة الطاهرة التي تفوح بعطر الأصالة العريقة والنبل الأصيل كشاهد حي نابض على عظمة الروح الإنسانية الطاهرة النقية وقدرتها اللامتناهية الواسعة على الإبداع الأصيل المتجدد والعطاء النبيل الدائم الذي يتدفق من منابع الخير الصافية النقية. لقد نحتم بأناملكم الماهرة البارعة التي تبدع كلما لامست شيئاً وتضفي عليه جمالاً وروعة تمثالاً رائعاً خالداً من الإنجاز والتفوق المذهل يقف شامخاً عالياً في قلوب المحبين الصادقين.',
      'كالقصائد الخالدة العذبة التي تتناقلها الأجيال المتعاقبة عبر التاريخ كنز ثمين لا يفنى ولا يبلى مهما تقادمت العصور، ستبقى ذكرى إنجازاتكم العظيمة الباهرة محفورة بأحرف من ذهب خالص في ذاكرة الزمن الأبدية الخالدة، تحكي للأجيال القادمة المتتالية قصة عطاء نبيل لا ينضب مداده أبداً وإبداع أصيل لا يتوقف نبضه مهما تقادمت السنون الطوال والأعوام المديدة. إن أعمالكم المباركة تشبه الأنهار العذبة الجارية التي تروي الأرض العطشى الظمأى وتبعث فيها الحياة والخضرة والجمال الأخاذ.',
      'في مرايا الزمن الصافية الشفافة التي تعكس الحقائق دون تشويه أو تحريف، تنعكس صورة جهودكم النبيلة الطاهرة الزكية كلوحة فنية رائعة الجمال أخاذة الحسن رسمها فنان ماهر بارع بألوان الحب الصادق والتفاني النبيل الخالص، تحكي قصة إنسان عظيم كريم آمن بالعطاء الصادق النقي فأعطى بسخاء وكرم لا حدود له، وبالإبداع الأصيل المتجدد فأبدع بلا حدود أو قيود، وبالخير المطلق الصافي فزرع في كل مكان حوله بذور البركة والنماء والخير الوفير.'
    ],
    ودية: [
      'قلوبنا الطيبة النقية تفيض بالامتنان العميق الصادق والعرفان الخالص الجميل لكم، وأرواحنا المحبة الصافية تهتف بأصوات الفرح والسرور العارم بالشكر الجزيل العميق والثناء العطر الجميل لما قدمتموه بكل حب ومودة صادقة من جهود طيبة مباركة ومساعي نبيلة كريمة تستحق كل التقدير والإعجاب. لقد كنتم بحق وصدق وبلا مبالغة أخاً كريماً نقي السريرة طاهر القلب وصديقاً وفياً مخلصاً لا تغيره الأيام ولا تبدله السنون، تسعون دائماً وأبداً بقلوب مخلصة صادقة لتحقيق الخير والنماء والفلاح لكل من حولكم دون انتظار مقابل أو جزاء أو شكر.',
      'في أوقات الشدة والضيق العصيبة كنتم بحق وصدق العون الصادق المخلص والسند القوي الراسخ الذي لا يتزعزع مهما اشتدت الرياح، وفي لحظات الفرح والسرور الجميلة كنتم الرفيق الطيب الكريم والأنيس الوفي المخلص الذي يشاركنا أجمل اللحظات وأسعد الأوقات في الحياة. ذكرياتنا الحلوة الجميلة معكم كبستان أزهار متنوع الألوان والعطور الفواحة، كلما مررنا به بخيالنا أو تذكرناه شممنا عبير الوفاء العذب الزكي وأريج المحبة الصادقة الطاهرة التي لا تعرف الرياء أو النفاق أو الخداع.',
      'يا من زرعتم في حديقة قلوبنا الطيبة النقية أجمل الورود العطرة الفواحة وأنبل المشاعر الصافية الطاهرة، ويا من كتبتم بأقلام الحب الصادق النقي في صفحات أرواحنا البيضاء النظيفة أعذب الكلمات الجميلة وأجمل المعاني السامية النبيلة التي تبقى محفورة في الذاكرة، لقد تركتم في نفوسنا المحبة الصادقة أثراً جميلاً خالداً كالعطر الفواح الزكي يدوم مدى الحياة ولا يمحوه زمان عابر ولا ينسيه مكان بعيد مهما طالت المسافات. إن وجودكم المبارك الطيب في حياتنا كان نعمة عظيمة من الله ومنة كريمة جليلة نحمد الله عليها في كل وقت وحين ونشكره على هذه النعمة الجليلة العظيمة.'
    ]
  };

  // Enhanced closing phrases with deeper meaning  
  const enhancedClosings = [
    'عطاؤكم المتدفق الدائم كالنهر الجاري العذب وإخلاصكم الصادق النقي الذي لا يشوبه رياء أو نفاق سيبقيان محفورين بأحرف من نور ساطع في ذاكرة التاريخ الخالدة الأبدية، ومنارتين مضيئتين ساطعتين تضيئان طريق الأجيال القادمة المتتالية نحو التميز المنشود والإبداع المأمول المرجو. إن بصماتكم الواضحة الجلية في مسيرة الحياة الطويلة ستظل شاهداً حياً نابضاً على أن الخير باق لا يزول والمعروف محفوظ لا يضيع أبداً مهما طال الزمان.',
    'إن بصماتكم الواضحة الجلية البارزة في مسيرة العطاء المباركة النبيلة والإنجاز المستمر المتواصل ستظل إلى أبد الآبدين شاهداً حياً نابضاً قوياً على عظمة الأرواح النبيلة الطاهرة الزكية وقدرتها الخارقة المذهلة على صنع التغيير الإيجابي البناء الذي يبني الحضارات العريقة ويشيد المجتمعات المتقدمة الراقية. لقد علمتمونا بأفعالكم الطيبة أن الحياة أجمل وأحلى عندما نملأها بالحب الصادق والعطاء النبيل والإخلاص الدائم في العمل والسعي.',
    'نسأل الله العلي العظيم القدير المنان، رب العرش الكريم ومالك الملك والملكوت، أن يبارك في مساعيكم النبيلة الطيبة المباركة ويضاعف أجركم عنده سبحانه وتعالى، وأن يجعل عملكم المبارك الطيب في ميزان حسناتكم الثقيلة يوم لا ينفع مال ولا بنون ولا ينجو إلا من أتى الله بقلب سليم، وأن يوفقكم إلى ما فيه خير الإسلام والمسلمين وصلاح البلاد والعباد في كل مكان. اللهم آمين يا أرحم الراحمين ويا رب العالمين.'
  ];

  // Random selection with time-based seed for variety
  const getRandomItem = (arr: string[], seed?: number) => {
    const randomIndex = seed ? 
      Math.floor((Date.now() + seed) / 1000) % arr.length : 
      Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };
  
  const greeting = getRandomItem(creativeGreetings, Math.floor(Date.now() / 1000));
  const fullGreeting = data.recipientName ? `${greeting} / ${data.recipientName}` : greeting;
  const title = data.recipientTitle ? `${data.recipientTitle}` : '';
  
  let body = '';
  if (data.occasion) {
    const toneKey = data.tone as keyof typeof creativeOpenings;
    const openingPhrase = getRandomItem(creativeOpenings[toneKey] || creativeOpenings.رسمية, 1);
    const middleContent = getRandomItem(expandedMiddleContent[toneKey] || expandedMiddleContent.رسمية, 2);
    const closingPhrase = getRandomItem(enhancedClosings, 3);
    
    body = `${openingPhrase}

${middleContent}

لقد استطعتم بجدارة واقتدار كبير أن تحولوا ${data.occasion} إلى واقع مشرق باهر ينير دروب المستقبل الزاهر بنوره الساطع. إن عملكم المتقن الرائع وتفانيكم الصادق النبيل سيبقيان مثالاً يحتذى به للأجيال القادمة التي ستتعلم منكم معنى الإخلاص الحقيقي في العمل والتميز الأصيل في الأداء.

${closingPhrase}`;
  }

  const closing = 'بكل الحب والتقدير والاحترام والامتنان العميق الصادق';  
  const signature = data.senderName || 'محبكم الصادق المخلص الوفي';
  const organization = data.senderOrganization || '';

  const finalLetter = `بسم الله الرحمن الرحيم

التاريخ: ${currentDate}

${fullGreeting}
${title}

السلام عليكم ورحمة الله وبركاته

${body}

${closing}،


${signature}
${organization}`;

  // Ensure the letter is at least 550 characters by adding more content if needed
  if (finalLetter.length < 550) {
    const additionalPoetry = `

إن الكلمات تعجز عن وصف مدى تقديرنا العميق وامتناننا الصادق الخالص لجهودكم المباركة الطيبة وعطائكم المتميز الرائع الذي لا مثيل له. لقد كان لكم الأثر البالغ العميق في إثراء مسيرة العمل المباركة وإضافة لمسات إبداعية متميزة تستحق كل الثناء والتقدير والإعجاب من كل من شهدها ورآها.`;
    
    return finalLetter + additionalPoetry;
  }

  return finalLetter;
};

export const generateLetter = async (data: LetterData, forceRegenerate: boolean = false): Promise<GeneratedLetter> => {
  const arabicVersion = await generateArabicLetter(data, forceRegenerate);
  const englishVersion = data.needsTranslation ? await generateEnglishTranslation(data) : undefined;
  const creativeVersion = data.needsCreativeVersion ? generateCreativeVersion(data) : undefined;

  return {
    arabicVersion,
    englishVersion,
    creativeVersion
  };
};
