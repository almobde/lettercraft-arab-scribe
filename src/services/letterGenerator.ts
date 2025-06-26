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

  // Array of creative variations for different tones
  const creativeVariations = {
    رسمية: [
      'في رحاب هذا اليوم المشرق، نقف بكل فخر واعتزاز لنحتفي بإنجازكم المتميز',
      'تحت ظلال هذا اليوم الميمون، نتشرف بأن نرفع إليكم أسمى آيات التقدير',
      'في غمرة هذا اليوم البهيج، يسعدنا أن نتوجه إليكم بأجمل عبارات الثناء'
    ],
    تحفيزية: [
      'كالنجم الساطع في سماء الإبداع، أضأتم دروب النجاح بعطائكم المتميز',
      'كالشمس المشرقة التي تبدد ظلمات الليل، كان إشراقكم ينير طريق التميز',
      'كالنهر العذب الذي يروي الأرض الظمأى، كان عطاؤكم يسقي بستان الإنجاز'
    ],
    أدبية: [
      'في لوحة فنية بديعة من الإتقان والجمال، رسمتم تحفة رائعة من الإبداع',
      'كقصيدة غناء تتراقص على أوتار القلوب، كانت أعمالكم تعزف سيمفونية النجاح',
      'في حديقة غناء مزهرة بالعطاء، نبتت وردة إنجازكم تفوح بأريج التميز'
    ],
    ودية: [
      'يا صاحب القلب الطيب والروح النقية، كم هو رائع ما غرستموه من بذور الخير',
      'أيها الأخ الكريم والصديق الوفي، لقد تركتم في قلوبنا أثراً جميلاً لا يُمحى',
      'يا من كنتم نعم الرفيق في دروب العمل، وخير المعين في ساعات الجد'
    ]
  };

  const middleVariations = {
    رسمية: [
      'لقد برهنتم من خلال جهودكم الدؤوبة وعملكم المتقن أن العزيمة الصادقة والإرادة القوية قادرتان على تجاوز كل التحديات وتحقيق أسمى الغايات. إن إنجازاتكم المبهرة تشهد على مدى تفانيكم وحرصكم البالغ على الوصول إلى أعلى معايير الجودة والإتقان.',
      'من خلال مسيرتكم الحافلة بالعطاء والإنجاز، أثبتتم أن النجاح الحقيقي يكمن في الجمع بين الرؤية الواضحة والعمل الدؤوب. لقد كانت جهودكم المباركة منارة تضيء طريق الآخرين نحو التميز والإبداع.',
      'إن ما حققتموه من نجاحات باهرة وإنجازات متميزة يعكس شخصيتكم الاستثنائية وقدراتكم الفذة. لقد تمكنتم بفضل حكمتكم وخبرتكم من تحويل التحديات إلى فرص ذهبية للنمو والتطور.'
    ],
    تحفيزية: [
      'بفضل جهودكم المخلصة وعزيمتكم التي لا تلين، تحولت الأحلام إلى حقائق مشرقة، والتحديات إلى إنجازات تفتخر بها الأجيال. لقد أصبحتم مثالاً يُحتذى به في المثابرة والإصرار على تحقيق الأهداف مهما كانت صعوبتها.',
      'إن إبداعكم المتجدد وعطاءكم المتواصل قد غرس في قلوب الجميع بذور الأمل والتفاؤل. لقد أثبتتم أن الإنسان قادر على صنع المعجزات عندما يؤمن بقدراته ويعمل بصدق وإخلاص.',
      'عبر رحلتكم الملهمة في عالم التميز والإبداع، رسمتم خارطة طريق واضحة للنجاح، وأضأتم شعلة الأمل في نفوس كل من يسعى لتحقيق أحلامه وطموحاته.'
    ],
    أدبية: [
      'في سجل التاريخ المكتوب بماء الذهب، ستُخلد أعمالكم النبيلة كشاهد على عظمة الروح الإنسانية وقدرتها على الإبداع والعطاء. لقد نحتم بأناملكم الماهرة تمثالاً رائعاً من الإنجاز والتفوق.',
      'كالقصائد الخالدة التي تتناقلها الأجيال، ستبقى ذكرى إنجازاتكم محفورة في ذاكرة الزمن، تحكي قصة عطاء لا ينضب وإبداع لا يتوقف.',
      'في مرايا الزمن الصافية، تنعكس صورة جهودكم النبيلة كلوحة فنية رائعة تحكي قصة إنسان آمن بالعطاء فأعطى، وبالإبداع فأبدع.'
    ],
    ودية: [
      'قلوبنا تفيض بالامتنان والعرفان لكم، وأرواحنا تهتف بالشكر والثناء لما قدمتموه من جهود طيبة ومساعي نبيلة. لقد كنتم بحق أخاً كريماً وصديقاً وفياً، تسعون دائماً لتحقيق الخير والنماء.',
      'في أوقات الشدة كنتم العون والسند، وفي لحظات الفرح كنتم الرفيق والأنيس. ذكرياتنا معكم كبستان أزهار، كلما مررنا به شممنا عبير الوفاء وأريج المحبة الصادقة.',
      'يا من زرعتم في حديقة قلوبنا أجمل الورود، ويا من كتبتم في صفحات أرواحنا أعذب الكلمات، لقد تركتم في نفوسنا أثراً جميلاً يدوم مدى الحياة.'
    ]
  };

  const closingVariations = [
    'عطاؤكم المتواصل وإخلاصكم الصادق سيبقيان محفورين في ذاكرة التاريخ، ومنارتين تضيئان طريق الأجيال القادمة نحو التميز والإبداع.',
    'إن بصماتكم الواضحة في مسيرة العطاء والإنجاز ستظل شاهداً حياً على عظمة الأرواح النبيلة وقدرتها على صنع التغيير الإيجابي.',
    'نسأل الله العلي القدير أن يبارك في مساعيكم النبيلة، وأن يجعل عملكم في ميزان حسناتكم، وأن يوفقكم لما فيه خير البلاد والعباد.'
  ];

  // Random selection for variety
  const randomize = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  const greeting = data.recipientName ? `إلى صاحب القلب الكبير والعقل النير / ${data.recipientName}` : 'إلى رمز العطاء والإبداع';
  const title = data.recipientTitle ? `${data.recipientTitle}` : '';
  
  let body = '';
  if (data.occasion) {
    const toneKey = data.tone as keyof typeof creativeVariations;
    const openingPhrase = randomize(creativeVariations[toneKey] || creativeVariations.رسمية);
    const middleContent = randomize(middleVariations[toneKey] || middleVariations.رسمية);
    const closingPhrase = randomize(closingVariations);
    
    body = `${openingPhrase} في ${data.occasion}.

${middleContent}

${closingPhrase}`;
  }

  const closing = 'بكل الحب والتقدير والاحترام';
  const signature = data.senderName || 'محبكم الصادق';
  const organization = data.senderOrganization || '';

  const finalLetter = `بسم الله الرحمن الرحيم

التاريخ: ${currentDate}

${greeting}
${title}

السلام عليكم ورحمة الله وبركاته

${body}

${closing}،


${signature}
${organization}`;

  // Ensure the letter is at least 600 characters
  if (finalLetter.length < 600) {
    const additionalContent = `\n\nإن الكلمات تعجز عن وصف مدى تقديرنا وامتناننا لجهودكم المباركة وعطائكم المتميز. لقد كان لكم الأثر البالغ في إثراء مسيرة العمل وإضافة لمسات إبداعية تستحق كل الثناء والتقدير.`;
    return finalLetter + additionalContent;
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
