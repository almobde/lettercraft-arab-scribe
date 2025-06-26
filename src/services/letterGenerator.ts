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
    'إلى السيمفونية الرائعة التي تعزف أنغام النجاح'
  ];

  // Enhanced creative openings with deeper poetic language
  const creativeOpenings = {
    رسمية: [
      'في رحاب هذا اليوم المشرق، وتحت سماء مزدانة بنجوم التقدير، نقف بكل فخر واعتزاز أمام إنجازكم المتميز الذي يضيء دروب المستقبل بنوره الوهاج. إن ما حققتموه من نجاحات باهرة يشهد على عظمة الروح الإنسانية وقدرتها اللامحدودة على الإبداع والعطاء النبيل.',
      'تحت ظلال هذا اليوم الميمون، وفي حضرة عطائكم المبارك، نتشرف بأن نرفع إليكم أسمى آيات التقدير وأعذب عبارات الثناء. لقد كان عملكم المتقن بمثابة القطرات الندية التي تحيي الأرض الظمأى، وكالنسيم العليل الذي يبعث الأمل في النفوس المتعطشة للتميز.',
      'في غمرة هذا اليوم البهيج، وبين أنوار الفرح المتلألئة، يسعدنا أن نتوجه إليكم بأجمل عبارات الثناء وأصدق كلمات التقدير. إن إنجازاتكم الرفيعة تحكي قصة كفاح مشرق، وتروي حكاية عطاء لا ينضب، وتسطر ملحمة نجاح تتوارثها الأجيال.'
    ],
    تحفيزية: [
      'كالنجم الساطع في سماء الإبداع اللامحدودة، أضأتم دروب النجاح بعطائكم المتدفق وإبداعكم المتجدد. لقد تحولت رؤاكم إلى حقائق مشرقة، وأحلامكم إلى واقع يفوق كل التوقعات. إن مسيرتكم الحافلة بالإنجازات تحكي قصة إرادة لا تلين، وعزيمة تحول المستحيل إلى ممكن بإذن الله.',
      'كالشمس المشرقة التي تبدد ظلمات الليل الدامس، كان إشراقكم ينير طريق التميز للجميع حولكم. لقد صنعتم من التحديات سلالم للصعود، ومن الصعوبات جسوراً للعبور نحو القمم الشامخة. إن عطاءكم المتواصل يزرع بذور الأمل في قلوب الأجيال القادمة.',
      'كالنهر العذب الذي يروي الأرض الظمأى، كان عطاؤكم يسقي بستان الإنجاز بماء الحياة والتجدد. لقد نحتم من صخور الصعوبات تماثيل للنجاح، ورسمتم بألوان الأمل لوحات تخلد في ذاكرة التاريخ. إن قدرتكم على تحويل الأحلام إلى حقائق تجعلكم قدوة يحتذى بها.'
    ],
    أدبية: [
      'في لوحة فنية بديعة من الإتقان والجمال، رسمتم تحفة رائعة من الإبداع بألوان الحب والتفاني. كل خطوة خطوتموها كانت بمثابة بيت شعر يُتلى، وكل عمل قمتم به كان قصيدة غناء تتراقص على أوتار القلوب المحبة. لقد تحولت حياتكم إلى ديوان شعري مفتوح يقرأ فيه الناس معاني الجمال والإبداع.',
      'كقصيدة غناء تتراقص على أوتار القلوب العاشقة للجمال، كانت أعمالكم تعزف سيمفونية النجاح بألحان تطرب الأرواح وتسعد النفوس. في كل حرف كتبتموه بصمة أصالة، وفي كل كلمة نطقتموها عبق تاريخ، وفي كل عمل أنجزتموه رائحة خلود تفوح عبر الزمان.',
      'في حديقة غناء مزهرة بألوان العطاء المتنوعة، نبتت وردة إنجازكم تفوح بأريج التميز والإبداع. كل ورقة من أوراقها تحكي قصة كفاح، وكل عطر يفوح منها يروي حكاية نجاح، وكل لون يزينها يسطر ملحمة عطاء تتناقلها الأجيال كنز لا يفنى.'
    ],
    ودية: [
      'يا صاحب القلب الطيب والروح النقية كالبلور الصافي، كم هو رائع ما غرستموه من بذور الخير في حقول الحياة! لقد كنتم كالمطر الذي ينزل على الأرض العطشى فيحييها، وكالنسيم العليل الذي يداعب الوجوه المتعبة فيبعث فيها الأمل والحياة. إن معرفتكم كانت هدية من السماء تضيء دروبنا المظلمة.',
      'أيها الأخ الكريم والصديق الوفي الذي لا تغيره الأيام، لقد تركتم في قلوبنا أثراً جميلاً لا يُمحى مهما تقادمت السنون وتوالت الفصول. كنتم كالشمعة التي تضيء للآخرين وتحترق من أجلهم، وكالنجم الذي يهتدي به التائهون في ظلمات الليل الحالك. إن ذكراكم الطيبة محفورة في أعماق أرواحنا.',
      'يا من زرعتم في حديقة قلوبنا الطيبة أجمل الورود العطرة وأنبل المشاعر الصافية، ويا من كتبتم بأقلام الحب في صفحات أرواحنا البيضاء أعذب الكلمات وأجمل المعاني، لقد تركتم في نفوسنا المحبة أثراً جميلاً كالعطر الفواح يدوم مدى الحياة ولا يمحوه زمان ولا ينسيه مكان. إن وجودكم في حياتنا كان نعمة من الله ومنة عظيمة نحمد الله عليها في كل وقت وحين.'
    ]
  };

  // Enhanced middle content with much more detailed and poetic language
  const expandedMiddleContent = {
    رسمية: [
      'لقد برهنتم من خلال جهودكم الدؤوبة وعملكم المتقن الذي يشع بأنوار الإتقان أن العزيمة الصادقة والإرادة القوية قادرتان على تجاوز كل التحديات وتحقيق أسمى الغايات النبيلة. إن إنجازاتكم المبهرة التي تتألق كالنجوم في سماء التميز تشهد على مدى تفانيكم الذي لا حدود له وحرصكم البالغ على الوصول إلى أعلى معايير الجودة والإتقان. لقد صنعتم من العمل عبادة، ومن الإتقان منهج حياة، ومن التميز سبيل عيش يحتذى به في كل زمان ومكان.',
      'من خلال مسيرتكم الحافلة بالعطاء المتدفق والإنجاز المستمر الذي لا يتوقف، أثبتتم بما لا يدع مجالاً للشك أن النجاح الحقيقي يكمن في الجمع المتناغم بين الرؤية الواضحة كالشمس في رابعة النهار والعمل الدؤوب الذي لا يكل ولا يمل. لقد كانت جهودكم المباركة التي تفوح بعطر الإخلاص منارة تضيء طريق الآخرين نحو التميز والإبداع، وبوصلة تهديهم إلى شواطئ النجاح الآمنة.',
      'إن ما حققتموه من نجاحات باهرة تخلب الألباب وإنجازات متميزة تبهر العقول يعكس بوضوح تام شخصيتكم الاستثنائية التي جمعت بين الحكمة والشجاعة وقدراتكم الفذة التي تتجلى في كل عمل تقومون به. لقد تمكنتم بفضل حكمتكم البالغة وخبرتكم الواسعة التي اكتسبتموها عبر سنوات طويلة من الكفاح من تحويل التحديات الصعبة إلى فرص ذهبية للنمو والتطور والازدهار.'
    ],
    تحفيزية: [
      'بفضل جهودكم المخلصة التي تنبع من أعماق القلب وعزيمتكم الصلبة التي لا تلين أمام العواصف، تحولت الأحلام البعيدة إلى حقائق مشرقة تضيء دروب المستقبل، والتحديات المستعصية إلى إنجازات رائعة تفتخر بها الأجيال المتعاقبة. لقد أصبحتم مثالاً يُحتذى به في المثابرة الحقيقية والإصرار الذي لا يعرف المستحيل على تحقيق الأهداف مهما كانت صعوبتها أو علو مرتبتها في سلم الطموحات.',
      'إن إبداعكم المتجدد الذي ينبض بالحياة وعطاءكم المتواصل الذي يتدفق كالنهر الجاري قد غرس في قلوب الجميع من حولكم بذور الأمل الخضراء والتفاؤل المشرق بالمستقبل الزاهر. لقد أثبتتم بأعمالكم الجليلة وأفعالكم النبيلة أن الإنسان قادر على صنع المعجزات الحقيقية عندما يؤمن إيماناً راسخاً بقدراته الكامنة ويعمل بصدق لا يشوبه رياء وإخلاص لا تعتريه شائبة.',
      'عبر رحلتكم الملهمة في عالم التميز والإبداع الواسع الذي لا حدود له، رسمتم خارطة طريق واضحة المعالم للنجاح، وأضأتم شعلة الأمل الوهاجة في نفوس كل من يسعى بجد واجتهاد لتحقيق أحلامه العظيمة وطموحاته السامية. إن مسيرتكم تحكي للأجيال قصة كفاح مشرق وتروي حكاية عطاء لا ينضب أبداً.'
    ],
    أدبية: [
      'في سجل التاريخ المكتوب بماء الذهب الخالص على صفحات من نور، ستُخلد أعمالكم النبيلة التي تفوح بعطر الأصالة كشاهد حي على عظمة الروح الإنسانية الطاهرة وقدرتها اللامتناهية على الإبداع الأصيل والعطاء النبيل الذي يتدفق من منابع الخير الصافية. لقد نحتم بأناملكم الماهرة التي تبدع كلما لامست شيئاً تمثالاً رائعاً من الإنجاز والتفوق يقف شامخاً في قلوب المحبين.',
      'كالقصائد الخالدة التي تتناقلها الأجيال المتعاقبة كنز لا يفنى، ستبقى ذكرى إنجازاتكم العظيمة محفورة بأحرف من ذهب في ذاكرة الزمن الأبدية، تحكي للأجيال القادمة قصة عطاء لا ينضب مداده أبداً وإبداع لا يتوقف نبضه مهما تقادمت السنون. إن أعمالكم تشبه الأنهار الجارية التي تروي الأرض العطشى وتبعث فيها الحياة والخضرة والجمال.',
      'في مرايا الزمن الصافية التي تعكس الحقائق دون تشويه، تنعكس صورة جهودكم النبيلة الطاهرة كلوحة فنية رائعة الجمال رسمها فنان ماهر بألوان الحب والتفاني، تحكي قصة إنسان عظيم آمن بالعطاء الصادق فأعطى بسخاء، وبالإبداع الأصيل فأبدع بلا حدود، وبالخير المطلق فزرع في كل مكان حوله بذور البركة والنماء.'
    ],
    ودية: [
      'قلوبنا الطيبة تفيض بالامتنان العميق والعرفان الصادق لكم، وأرواحنا المحبة تهتف بأصوات الفرح والسرور بالشكر الجزيل والثناء العطر لما قدمتموه بكل حب ومودة من جهود طيبة مباركة ومساعي نبيلة كريمة. لقد كنتم بحق وصدق أخاً كريماً نقي السريرة وصديقاً وفياً لا تغيره الأيام، تسعون دائماً بقلوب مخلصة لتحقيق الخير والنماء لكل من حولكم دون انتظار مقابل أو جزاء.',
      'في أوقات الشدة والضيق كنتم العون الصادق والسند القوي الذي لا يتزعزع، وفي لحظات الفرح والسرور كنتم الرفيق الطيب والأنيس الوفي الذي يشاركنا أجمل اللحظات. ذكرياتنا الحلوة معكم كبستان أزهار متنوع الألوان والعطور، كلما مررنا به شممنا عبير الوفاء العذب وأريج المحبة الصادقة التي لا تعرف الرياء أو النفاق.',
      'يا من زرعتم في حديقة قلوبنا الطيبة أجمل الورود العطرة وأنبل المشاعر الصافية، ويا من كتبتم بأقلام الحب في صفحات أرواحنا البيضاء أعذب الكلمات وأجمل المعاني، لقد تركتم في نفوسنا المحبة أثراً جميلاً كالعطر الفواح يدوم مدى الحياة ولا يمحوه زمان ولا ينسيه مكان. إن وجودكم في حياتنا كان نعمة من الله ومنة عظيمة نحمد الله عليها في كل وقت وحين.'
    ]
  };

  // Enhanced closing phrases with deeper meaning
  const enhancedClosings = [
    'عطاؤكم المتدفق كالنهر الجاري وإخلاصكم الصادق الذي لا يشوبه رياء سيبقيان محفورين بأحرف من نور في ذاكرة التاريخ الخالدة، ومنارتين مضيئتين تضيئان طريق الأجيال القادمة نحو التميز المنشود والإبداع المأمول. إن بصماتكم الواضحة في مسيرة الحياة ستظل شاهداً حياً نابضاً على أن الخير باق والمعروف لا يضيع أبداً.',
    'إن بصماتكم الواضحة الجلية في مسيرة العطاء المباركة والإنجاز المستمر ستظل إلى أبد الآبدين شاهداً حياً نابضاً على عظمة الأرواح النبيلة الطاهرة وقدرتها الخارقة على صنع التغيير الإيجابي الذي يبني الحضارات ويشيد المجتمعات. لقد علمتمونا أن الحياة أجمل عندما نملأها بالحب والعطاء والإخلاص في العمل.',
    'نسأل الله العلي العظيم القدير المنان، رب العرش الكريم ومالك الملك، أن يبارك في مساعيكم النبيلة الطيبة ويضاعف أجركم عنده، وأن يجعل عملكم المبارك في ميزان حسناتكم يوم لا ينفع مال ولا بنون، وأن يوفقكم إلى ما فيه خير الإسلام والمسلمين وصلاح البلاد والعباد. اللهم آمين يا رب العالمين.',
    'نرفع أكف الضراعة إلى الله سبحانه وتعالى أن يحفظكم من كل سوء وأن يديم عليكم نعمة الصحة والعافية، وأن يبارك في أعماركم وأعمالكم وأن يجعلكم دائماً منارة هداية للآخرين. إن العالم اليوم في أمس الحاجة إلى أمثالكم من أصحاب القلوب الطيبة والأرواح النقية الذين يضيئون الدرب للسائرين.',
    'في ختام هذه الكلمات التي تنبع من أعماق القلوب المحبة، نجدد لكم عهد الوفاء والإخلاص، ونؤكد لكم أن ذكراكم الطيبة ستبقى خالدة في قلوبنا وأن دعواتنا الصادقة ستظل ترافقكم في كل خطوة تخطونها. بارك الله فيكم وجزاكم عن كل خير قدمتموه خير الجزاء في الدنيا والآخرة.'
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

لقد استطعتم بجدارة واقتدار أن تحولوا ${data.occasion} إلى واقع مشرق ينير دروب المستقبل. إن عملكم المتقن وتفانيكم الصادق سيبقيان مثالاً يحتذى به للأجيال القادمة التي ستتعلم منكم معنى الإخلاص في العمل والتميز في الأداء.

${closingPhrase}`;
  }

  const closing = 'بكل الحب والتقدير والاحترام والامتنان العميق';
  const signature = data.senderName || 'محبكم الصادق المخلص';
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

  // Ensure the letter is at least 600 characters by adding more content if needed
  if (finalLetter.length < 600) {
    const additionalPoetry = `

إن الكلمات تعجز عن وصف مدى تقديرنا وامتناننا لجهودكم المباركة وعطائكم المتميز. لقد كان لكم الأثر البالغ في إثراء مسيرة العمل وإضافة لمسات إبداعية تستحق كل الثناء والتقدير.`;
    
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
