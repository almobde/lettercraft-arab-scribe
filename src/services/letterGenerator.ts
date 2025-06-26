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

const getHijriDate = (): string => {
  const gregorianDate = new Date();
  const hijriMonths = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];
  
  // Simple approximation for Hijri date (this is a basic conversion)
  const hijriYear = Math.floor((gregorianDate.getFullYear() - 622) * 1.030684) + 1;
  const hijriMonth = gregorianDate.getMonth(); // Use same month index for simplicity
  const hijriDay = gregorianDate.getDate();
  
  return `${hijriDay} ${hijriMonths[hijriMonth]} ${hijriYear}هـ`;
};

const addDiacritics = (text: string): string => {
  let diacritizedText = text;
  
  // Comprehensive diacritics for common Arabic words and phrases
  diacritizedText = diacritizedText.replace(/بسم الله الرحمن الرحيم/g, 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ');
  diacritizedText = diacritizedText.replace(/السلام عليكم/g, 'السَّلامُ عَلَيْكُمْ');
  diacritizedText = diacritizedText.replace(/ورحمة الله وبركاته/g, 'وَرَحْمَةُ اللهِ وَبَرَكاتُهُ');
  diacritizedText = diacritizedText.replace(/سعادة/g, 'سَعادَةُ');
  diacritizedText = diacritizedText.replace(/التاريخ/g, 'التَّارِيخُ');
  diacritizedText = diacritizedText.replace(/الهجري/g, 'الهِجْرِيُّ');
  diacritizedText = diacritizedText.replace(/الميلادي/g, 'المِيلادِيُّ');
  
  // Common verbs and expressions - Extended coverage
  diacritizedText = diacritizedText.replace(/نتوجه/g, 'نَتَوَجَّهُ');
  diacritizedText = diacritizedText.replace(/نتشرف/g, 'نَتَشَرَّفُ');
  diacritizedText = diacritizedText.replace(/يطيب/g, 'يَطِيبُ');
  diacritizedText = diacritizedText.replace(/نقدر/g, 'نُقَدِّرُ');
  diacritizedText = diacritizedText.replace(/نشكر/g, 'نَشْكُرُ');
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
  diacritizedText = diacritizedText.replace(/المباركة/g, 'المُبارَكَةُ');
  diacritizedText = diacritizedText.replace(/المبارك/g, 'المُبارَكُ');
  
  // Additional comprehensive words
  diacritizedText = diacritizedText.replace(/نسأل/g, 'نَسْأَلُ');
  diacritizedText = diacritizedText.replace(/الله/g, 'اللهُ');
  diacritizedText = diacritizedText.replace(/العلي/g, 'العَلِيُّ');
  diacritizedText = diacritizedText.replace(/القدير/g, 'القَدِيرُ');
  diacritizedText = diacritizedText.replace(/يبارك/g, 'يُبارِكَ');
  diacritizedText = diacritizedText.replace(/يوفقكم/g, 'يُوَفِّقَكُمْ');
  diacritizedText = diacritizedText.replace(/تقبلوا/g, 'تَقَبَّلُوا');
  diacritizedText = diacritizedText.replace(/فائق/g, 'فائِقَ');
  diacritizedText = diacritizedText.replace(/قدمتموه/g, 'قَدَّمْتُمُوهُ');
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
  diacritizedText = diacritizedText.replace(/الجودة/g, 'الجَوْدَةُ');
  diacritizedText = diacritizedText.replace(/استطعتم/g, 'اسْتَطَعْتُمْ');
  diacritizedText = diacritizedText.replace(/تحققوه/g, 'تُحَقِّقُوهُ');
  diacritizedText = diacritizedText.replace(/جعلتكم/g, 'جَعَلَتْكُمْ');
  diacritizedText = diacritizedText.replace(/منارة/g, 'مَنارَةً');
  diacritizedText = diacritizedText.replace(/يهتدي/g, 'يَهْتَدِي');
  diacritizedText = diacritizedText.replace(/الآخرون/g, 'الآخَرُونَ');
  diacritizedText = diacritizedText.replace(/ظلمات/g, 'ظُلُماتِ');
  diacritizedText = diacritizedText.replace(/الحيرة/g, 'الحَيْرَةِ');
  diacritizedText = diacritizedText.replace(/التردد/g, 'التَّرَدُّدِ');
  diacritizedText = diacritizedText.replace(/بوصلة/g, 'بُوصْلَةً');
  diacritizedText = diacritizedText.replace(/توجه/g, 'تُوَجِّهُ');
  diacritizedText = diacritizedText.replace(/السائرين/g, 'السَّائِرِينَ');
  diacritizedText = diacritizedText.replace(/شواطئ/g, 'شَواطِئِ');
  diacritizedText = diacritizedText.replace(/الأمان/g, 'الأَمانِ');
  diacritizedText = diacritizedText.replace(/النجاح/g, 'النَّجاحِ');
  diacritizedText = diacritizedText.replace(/الفلاح/g, 'الفَلاحِ');
  diacritizedText = diacritizedText.replace(/بصماتكم/g, 'بَصَماتُكُمُ');
  diacritizedText = diacritizedText.replace(/الواضحة/g, 'الواضِحَةُ');
  diacritizedText = diacritizedText.replace(/الجلية/g, 'الجَلِيَّةُ');
  diacritizedText = diacritizedText.replace(/مسيرة/g, 'مَسِيرَةِ');
  diacritizedText = diacritizedText.replace(/الحياة/g, 'الحَياةِ');
  diacritizedText = diacritizedText.replace(/شاهداً/g, 'شاهِداً');
  diacritizedText = diacritizedText.replace(/حياً/g, 'حَيّاً');
  diacritizedText = diacritizedText.replace(/نابضاً/g, 'نابِضاً');
  diacritizedText = diacritizedText.replace(/الخير/g, 'الخَيْرُ');
  diacritizedText = diacritizedText.replace(/يزول/g, 'يَزُولُ');
  diacritizedText = diacritizedText.replace(/المعروف/g, 'المَعْرُوفُ');
  diacritizedText = diacritizedText.replace(/محفوظ/g, 'مَحْفُوظٌ');
  diacritizedText = diacritizedText.replace(/يضيع/g, 'يَضِيعُ');
  diacritizedText = diacritizedText.replace(/مهما/g, 'مَهْما');
  diacritizedText = diacritizedText.replace(/طال/g, 'طالَ');
  diacritizedText = diacritizedText.replace(/الزمان/g, 'الزَّمانُ');
  
  // More comprehensive word coverage
  diacritizedText = diacritizedText.replace(/عطاؤكم/g, 'عَطاؤُكُمُ');
  diacritizedText = diacritizedText.replace(/المتدفق/g, 'المُتَدَفِّقُ');
  diacritizedText = diacritizedText.replace(/الدائم/g, 'الدَّائِمُ');
  diacritizedText = diacritizedText.replace(/النهر/g, 'النَّهْرُ');
  diacritizedText = diacritizedText.replace(/الجاري/g, 'الجارِي');
  diacritizedText = diacritizedText.replace(/العذب/g, 'العَذْبُ');
  diacritizedText = diacritizedText.replace(/إخلاصكم/g, 'إِخْلاصُكُمُ');
  diacritizedText = diacritizedText.replace(/النقي/g, 'النَّقِيُّ');
  diacritizedText = diacritizedText.replace(/يشوبه/g, 'يَشُوبُهُ');
  diacritizedText = diacritizedText.replace(/رياء/g, 'رِياءٌ');
  diacritizedText = diacritizedText.replace(/نفاق/g, 'نِفاقٌ');
  diacritizedText = diacritizedText.replace(/سيبقيان/g, 'سَيَبْقَيانِ');
  diacritizedText = diacritizedText.replace(/محفورين/g, 'مَحْفُورَيْنِ');
  diacritizedText = diacritizedText.replace(/بأحرف/g, 'بِأَحْرُفٍ');
  diacritizedText = diacritizedText.replace(/نور/g, 'نُورٍ');
  diacritizedText = diacritizedText.replace(/ساطع/g, 'ساطِعٍ');
  diacritizedText = diacritizedText.replace(/ذاكرة/g, 'ذاكِرَةِ');
  diacritizedText = diacritizedText.replace(/التاريخ/g, 'التَّارِيخِ');
  diacritizedText = diacritizedText.replace(/الخالدة/g, 'الخالِدَةِ');
  diacritizedText = diacritizedText.replace(/الأبدية/g, 'الأَبَدِيَّةِ');
  diacritizedText = diacritizedText.replace(/منارتين/g, 'مَنارَتَيْنِ');
  diacritizedText = diacritizedText.replace(/مضيئتين/g, 'مُضِيئَتَيْنِ');
  diacritizedText = diacritizedText.replace(/ساطعتين/g, 'ساطِعَتَيْنِ');
  diacritizedText = diacritizedText.replace(/تضيئان/g, 'تُضِيئانِ');
  diacritizedText = diacritizedText.replace(/طريق/g, 'طَرِيقَ');
  diacritizedText = diacritizedText.replace(/الأجيال/g, 'الأَجْيالِ');
  diacritizedText = diacritizedText.replace(/القادمة/g, 'القادِمَةِ');
  diacritizedText = diacritizedText.replace(/المتتالية/g, 'المُتَتالِيَةِ');
  diacritizedText = diacritizedText.replace(/التميز/g, 'التَّمَيُّزِ');
  diacritizedText = diacritizedText.replace(/المنشود/g, 'المَنْشُودِ');
  diacritizedText = diacritizedText.replace(/الإبداع/g, 'الإِبْداعِ');
  diacritizedText = diacritizedText.replace(/المأمول/g, 'المَأْمُولِ');
  diacritizedText = diacritizedText.replace(/المرجو/g, 'المَرْجُوِّ');
  
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
  const hijriDate = getHijriDate();
  const gregorianDate = new Date().toLocaleDateString('ar-SA', {
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

  let finalLetter = `بسم الله الرحمن الرحيم

التاريخ الهجري: ${hijriDate}
التاريخ الميلادي: ${gregorianDate}

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

// Define the expandedMiddleContent object with comprehensive content
const expandedMiddleContent = {
  رسمية: [
    'إن التزامكم الراسخ بأعلى معايير الجودة والتميز في الأداء، وحرصكم الدائم على تطوير آليات العمل وتحسين النتائج، يجعلنا نقف بكل فخر واعتزاز أمام هذا النموذج المشرق من الإخلاص والتفاني في أداء الواجب. لقد استطعتم بحكمتكم وخبرتكم الواسعة أن تضعوا بصمة واضحة في مسيرة العمل المؤسسي وتساهموا في تحقيق الأهداف الاستراتيجية المنشودة.',
    'من خلال نظرتكم الثاقبة ورؤيتكم الاستشرافية المستقبلية، استطعتم أن تقدموا حلولاً إبداعية ومبتكرة للتحديات التي واجهتنا، وأن تبنوا مبادرات رائدة ساهمت في تطوير بيئة العمل وتعزيز روح الفريق الواحد. إن قدرتكم على التكيف مع المتغيرات والاستجابة السريعة للمستجدات تعكس مهنيتكم العالية وخبرتكم المتراكمة عبر السنين.',
    'لقد كان أسلوبكم المتميز في التعامل وطريقتكم الحكيمة في إدارة المواقف المختلفة مصدر إلهام للجميع من حولكم. إن صبركم وحلمكم وحسن تعاملكم مع الآخرين يعكس أصالة الأخلاق العربية الأصيلة وقيم الإسلام السمحة التي تربينا عليها جميعاً. هذه الصفات النبيلة جعلتكم قدوة حسنة يحتذى بها في جميع جوانب الحياة.'
  ],
  تحفيزية: [
    'إن طموحكم العالي وسعيكم الدؤوب نحو التميز والكمال في كل عمل تقومون به، يذكرنا بقوله تعالى "وأن ليس للإنسان إلا ما سعى". لقد أثبتم بالفعل والقول أن الإرادة القوية والعزيمة الصادقة قادرتان على تحقيق المعجزات وتخطي جميع العقبات مهما كانت صعوبتها. إن مسيرتكم الحافلة بالإنجازات تحكي قصة كفاح مشرق ونضال نبيل من أجل الوصول إلى أعلى مراتب التفوق والتميز.',
    'كالجبل الشامخ الذي لا تزعزعه الرياح العاتية، ظللتم راسخين في مواقفكم النبيلة ومتمسكين بمبادئكم السامية رغم كل التحديات والصعوبات التي واجهتموها في رحلتكم الطويلة نحو النجاح. إن قوة شخصيتكم وثبات موقفكم ووضوح رؤيتكم جعلتكم منارة يهتدي بها الآخرون في ظلمات الحيرة والتردد، وبوصلة توجه السائرين نحو شواطئ الأمان والنجاح.',
    'من خلال إيمانكم العميق بأهمية العمل الجماعي وروح الفريق الواحد، استطعتم أن تخلقوا بيئة عمل محفزة ومشجعة تدفع الجميع للعطاء والإبداع. إن قدرتكم على بث روح الحماس والنشاط في نفوس زملائكم، وحرصكم على تنمية مواهبهم وتطوير قدراتهم، يدل على عمق فهمكم لطبيعة القيادة الحقيقية التي تبني ولا تهدم، وتجمع ولا تفرق.'
  ],
  أدبية: [
    'في حديقة الإبداع الغناء حيث تتفتح أزهار المواهب وتعبق أريج القدرات المتميزة، كنتم الوردة الأجمل والزهرة الأعطر التي تملأ الأجواء بعطرها الفواح ولونها البهيج. لقد نسجتم من خيوط الحب والإخلاص والتفاني قطعة فنية رائعة تحكي للأجيال قصة العطاء الصادق والكفاح المشرق. إن كل عمل جليل قمتم به كان بمثابة نوتة موسيقية عذبة في سيمفونية النجاح الرائعة التي عزفتموها بأنامل الإبداع الماهرة.',
    'كالشاعر الموهوب الذي ينظم من الكلمات قصائد خالدة، رسمتم بأعمالكم المتقنة لوحات فنية بديعة تخلد في ذاكرة التاريخ إلى أبد الآبدين. كل خطوة مباركة خطوتموها في دروب الحياة كانت بيت شعر يُتلى، وكل مشروع مبارك أنجزتموه كان قصيدة غراء تتراقص على أوتار القلوب المحبة. لقد تحولت مسيرتكم الحافلة بالعطاء إلى ديوان شعري مفتوح يقرأ فيه الناس معاني الجمال الحقيقي والإبداع الأصيل.',
    'في عالم يعج بالضوضاء والصخب، كنتم النغمة الهادئة العذبة التي تطرب الأذان وتسكن القلوب المضطربة. إن أسلوبكم الراقي في التعامل وطريقتكم المهذبة في الحديث يذكراننا بأجمل ما في التراث العربي الأصيل من أدب جم وخلق كريم. لقد جمعتم في شخصيتكم النبيلة بين عمق المفكر وحكمة الفيلسوف وأناقة الأديب ورقة الشاعر، فكنتم بحق تحفة فنية نادرة في زمن قل فيه الجمال.'
  ],
  ودية: [
    'في مدرسة الحياة الكبيرة حيث نتعلم كل يوم درساً جديداً في معاني الصداقة والوفاء والإخلاص، كنتم المعلم الأول والأستاذ الأكبر الذي علمنا بالقدوة الحسنة قبل الكلمة الطيبة معنى المحبة الصادقة والصداقة الحقيقية. لقد رأينا فيكم النموذج الأمثل للأخ الكريم والصديق الوفي الذي لا تغيره الأيام ولا تبدله الأحوال مهما تقلبت ظروف الحياة وتبدلت أحوالها.',
    'كالنسيم العليل الذي يهب في أيام الصيف الحارة فيبرد القلوب المتعبة ويروح عن النفوس المكدودة، كان حضوركم المبارك بيننا مصدر راحة وطمأنينة وسكينة لكل من حولكم. إن ابتسامتكم الصادقة وكلمتكم الطيبة ومعاملتكم الحسنة كانت بلسماً شافياً للجراح وضماداً مريحاً للألام. لقد استطعتم بفضل الله ثم بطيب معشركم وحسن خلقكم أن تكونوا موضع محبة وتقدير الجميع بلا استثناء.',
    'إن الذكريات الجميلة التي جمعتنا بكم في رحاب العمل المشترك ستظل محفورة في القلب بحروف من نور، ومحفوظة في الذاكرة كأغلى الكنوز وأثمن الجواهر. كل لحظة قضيناها معكم كانت درساً في الأخلاق الفاضلة، وكل موقف شاركتمونا فيه كان مثالاً يحتذى في المروءة والنبل. إن وجودكم في حياتنا كان نعمة من الله نحمده عليها ونشكره على فضله وكرمه.'
  ]
};

const generateCreativeVersion = (data: LetterData): string => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  const hijriDate = getHijriDate();
  const gregorianDate = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
      'قلوبنا الطيبة النقية تفيض بالامتنان العميق الصادق والعرفان الخالص الجميل لكم، وأرواحنا المحبة الصافية تهتف بأصوات الفرح والسرور العارم بالشكر الجزيل العميق والثناء العطر الجميل لما قدمتموه بكل حب ومودة صادقة من جهود طيبة مباركة ومساعي نبيلة كريمة تستحق كل التقدير والإعجاب. لقد كنتم بحق وصدق وبلا مبالغة أخاً كريماً نقي السريرة طاهر القلب وصديقاً وفياً مخلصاً لا تغيره الأيام ولا تبدله السنون، تسعون دائماً وأبداً بقلوب مخلصة صادقة لتحقيق الخير والنماء والفلاح لكل من حولكم دون انتظار مقابل أو جزاء أو شكر.',
      'في أوقات الشدة والضيق العصيبة كنتم بحق وصدق العون الصادق المخلص والسند القوي الراسخ الذي لا يتزعزع مهما اشتدت الرياح، وفي لحظات الفرح والسرور الجميلة كنتم الرفيق الطيب الكريم والأنيس الوفي المخلص الذي يشاركنا أجمل اللحظات وأسعد الأوقات في الحياة. ذكرياتنا الحلوة الجميلة معكم كبستان أزهار متنوع الألوان والعطور الفواحة، كلما مررنا به بخيالنا أو تذكرناه شممنا عبير الوفاء العذب الزكي وأريج المحبة الصادقة الطاهرة التي لا تعرف الرياء أو النفاق أو الخداع.',
      'يا من زرعتم في حديقة قلوبنا الطيبة النقية أجمل الورود العطرة الفواحة وأنبل المشاعر الصافية الطاهرة، ويا من كتبتم بأقلام الحب الصادق النقي في صفحات أرواحنا البيضاء النظيفة أعذب الكلمات الجميلة وأجمل المعاني السامية النبيلة، لقد تركتم في نفوسنا المحبة الصادقة أثراً جميلاً خالداً كالعطر الفواح الزكي يدوم مدى الحياة ولا يمحوه زمان عابر ولا ينسيه مكان بعيد مهما طالت المسافات. إن وجودكم المبارك الطيب في حياتنا كان نعمة عظيمة من الله ومنة كريمة جليلة نحمد الله عليها في كل وقت وحين ونشكره على هذه النعمة الجليلة العظيمة.'
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
    const toneKey = data.tone as keyof typeof expandedMiddleContent;
    const middleContent = getRandomItem(expandedMiddleContent[toneKey] || expandedMiddleContent.رسمية, 2);
    const closingPhrase = getRandomItem(enhancedClosings, 3);
    
    body = `لقد استطعتم بجدارة واقتدار كبير أن تحولوا ${data.occasion} إلى واقع مشرق باهر ينير دروب المستقبل الزاهر بنوره الساطع. إن عملكم المتقن الرائع وتفانيكم الصادق النبيل سيبقيان مثالاً يحتذى به للأجيال القادمة التي ستتعلم منكم معنى الإخلاص الحقيقي في العمل والتميز الأصيل في الأداء.

${middleContent}

${closingPhrase}`;
  }

  const closing = 'بكل الحب والتقدير والاحترام والامتنان العميق الصادق';  
  const signature = data.senderName || 'محبكم الصادق المخلص الوفي';
  const organization = data.senderOrganization || '';

  let finalLetter = `بسم الله الرحمن الرحيم

التاريخ الهجري: ${hijriDate}
التاريخ الميلادي: ${gregorianDate}

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
    
    finalLetter += additionalPoetry;
  }

  if (data.needsDiacritics) {
    finalLetter = addDiacritics(finalLetter);
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
