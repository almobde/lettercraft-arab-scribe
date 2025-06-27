import { LetterData, GeneratedLetter } from '../types/letter';
import { generateWithGemini, createLetterPrompt, createEnglishPrompt } from './geminiService';

// تحليل نوع المناسبة وتحديد السياق المناسب
const analyzeOccasionContext = (occasion: string): {
  type: 'work' | 'personal' | 'religious' | 'social';
  subtype: string;
  requiresSpecialHandling: boolean;
} => {
  const lowerOccasion = occasion.toLowerCase();
  
  // مناسبات شخصية خاصة
  if (lowerOccasion.includes('مولود') || lowerOccasion.includes('طفل') || lowerOccasion.includes('ولد') || 
      lowerOccasion.includes('بنت') || lowerOccasion.includes('ابن') || lowerOccasion.includes('ابنة')) {
    return { type: 'personal', subtype: 'newborn', requiresSpecialHandling: true };
  }
  
  if (lowerOccasion.includes('زواج') || lowerOccasion.includes('عرس') || lowerOccasion.includes('نكاح')) {
    return { type: 'personal', subtype: 'marriage', requiresSpecialHandling: true };
  }
  
  if (lowerOccasion.includes('تخرج') || lowerOccasion.includes('شهادة') || lowerOccasion.includes('دراسة')) {
    return { type: 'personal', subtype: 'graduation', requiresSpecialHandling: true };
  }
  
  // مناسبات دينية
  if (lowerOccasion.includes('حج') || lowerOccasion.includes('عمرة') || lowerOccasion.includes('رمضان') || 
      lowerOccasion.includes('عيد') || lowerOccasion.includes('مبارك')) {
    return { type: 'religious', subtype: 'worship', requiresSpecialHandling: true };
  }
  
  // مناسبات العمل
  if (lowerOccasion.includes('ترقية') || lowerOccasion.includes('عمل') || lowerOccasion.includes('وظيفة') ||
      lowerOccasion.includes('مشروع') || lowerOccasion.includes('إنجاز') || lowerOccasion.includes('تفوق')) {
    return { type: 'work', subtype: 'achievement', requiresSpecialHandling: false };
  }
  
  // افتراضي: مناسبة اجتماعية
  return { type: 'social', subtype: 'general', requiresSpecialHandling: false };
};

// إنشاء محتوى خاص للمواليد
const generateNewbornContent = (recipientName: string, tone: string): string => {
  const newbornGreetings = [
    'بارك الله لكم في المولود الجديد، وأسعدكم بطول بقائه، وجعله من الذرية الصالحة المباركة',
    'ألف مبروك على المولود المبارك، أدامه الله لكم ذخراً وسنداً، وقرة عين في الدنيا والآخرة',
    'بارك الله لكم فيما وهب، وشكرتم الواهب، وبلغ أشده، ورُزقتم بره وطاعته، وأنبته الله نباتاً حسناً',
    'مبروك المولود الجديد، جعله الله من الذرية الصالحة المباركة، وحفظه من كل سوء ومكروه، وأسعدكم برؤيته'
  ];
  
  const newbornPrayers = [
    'نسأل الله العظيم رب العرش الكريم أن يحفظه لكم من كل سوء ومكروه، وأن ينبته نباتاً حسناً طيباً مباركاً، ويجعله من عباده الصالحين المصلحين البررة الأتقياء الذين يخافون الله ويتقونه حق تقاته. اللهم اجعله براً بوالديه، صالحاً في دينه ودنياه، نافعاً لأمته ووطنه، وارزقه من فضلك وكرمك وجودك ما يسعده في الدارين',
    'بارك الله لكم في الموهوب لكم، وشكرتم الواهب سبحانه وتعالى، ورزقكم الله بره وطاعته وخدمته لكم، وأعانكم على تربيته وتنشئته النشأة الصالحة الطيبة المباركة التي ترضي الله عز وجل. نسأل الله أن يجعله قرة عين لكم في الدنيا والآخرة، وأن يسعدكم برؤية نجاحه وتفوقه وصلاحه',
    'نحمد الله العظيم على سلامة الوالدة الكريمة الفاضلة من كل سوء ومكروه، ونسأله سبحانه وتعالى أن يتم عليها نعمة الصحة والعافية، وأن يجعل هذا المولود المبارك قرة عين لكم جميعاً في الدنيا والآخرة. اللهم احفظه بحفظك، واكلأه برعايتك، واجعله من أوليائك الصالحين وعبادك المتقين',
    'اللهم أنبته نباتاً حسناً طيباً مباركاً، واجعله براً بوالديه الكريمين، صالحاً في دينه ودنياه وآخرته، نافعاً لأمته الإسلامية ووطنه الغالي، محباً للخير والمعروف، مبغضاً للشر والمنكر. اللهم علمه ما ينفعه، وانفعه بما علمته، وزده علماً وحكمة وفهماً وتقوى وصلاحاً'
  ];
  
  const newbornWisdom = [
    'إن الأولاد نعمة عظيمة جليلة من نعم الله الكثيرة التي لا تحصى والتي تستحق منا كل الشكر والحمد والثناء والاعتراف بفضل الله ومنته وكرمه، وهم أمانة غالية ثمينة في أعناقنا نسأل الله العظيم أن يعيننا على حسن تربيتهم وتنشئتهم التنشئة الصالحة الطيبة المباركة التي ترضي الله عز وجل. إنهم فلذات أكبادنا وقرة أعيننا وسبب سعادتنا في هذه الحياة الدنيا',
    'كما قال رسول الله صلى الله عليه وسلم في الحديث الشريف: "إذا مات الإنسان انقطع عمله إلا من ثلاثة: إلا من صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له". وهذا يدل على عظم شأن الأولاد الصالحين وأهميتهم في حياة الإنسان وبعد مماته، فهم استمرار لعمله الصالح ودعائه المستجاب بإذن الله تعالى',
    'الأطفال الأبرياء الأنقياء هم زينة الحياة الدنيا الفانية وأملنا الكبير في المستقبل المشرق الباهر، نسأل الله العظيم رب العرش الكريم أن يجعلهم من البررة الأتقياء الصالحين المصلحين الذين يسعدون آباءهم وأمهاتهم في الحياة الدنيا والآخرة الباقية. إنهم بإذن الله خير خلف لخير سلف',
    'إن فرحتنا الغامرة وسعادتنا الكبيرة بقدوم المولود الجديد المبارك تذكرنا دائماً وأبداً بفضل الله العظيم ونعمه الكثيرة التي لا تحصى ولا تعد، ونعمة الذرية الطيبة الصالحة المباركة التي هي من أجل وأعظم الهبات الربانية والمنح الإلهية التي يمن الله بها على عباده المؤمنين الصالحين'
  ];
  
  // اختيار محتوى متنوع
  const greeting = newbornGreetings[Math.floor(Math.random() * newbornGreetings.length)];
  const prayer = newbornPrayers[Math.floor(Math.random() * newbornPrayers.length)];
  const wisdom = newbornWisdom[Math.floor(Math.random() * newbornWisdom.length)];
  
  const additionalBlessings = `نشارككم فرحتكم الغالية العظيمة بهذه المناسبة المباركة السعيدة، ونتمنى لكم جميعاً السعادة والهناء والفرح والسرور في الدنيا والآخرة. كل عام وأنتم بألف خير وسعادة وهناء، وكل عام وطفلكم الحبيب الغالي في نمو مستمر وصحة دائمة وعافية تامة. 

اللهم اجعل هذا المولود المبارك سبب خير وبركة وسعادة لأهله وأقاربه وجميع من حوله، واجعله من الأولاد الصالحين البررة الذين يطيعون ربهم ووالديهم ويخدمون دينهم وأمتهم ووطنهم. نسأل الله أن يحفظه بعينه التي لا تنام، وأن يجعله قرة عين لوالديه الكريمين في الدنيا والآخرة.`;
  
  return `${greeting}

${prayer}

${wisdom}

${additionalBlessings}`;
};

// إنشاء محتوى خاص للزواج
const generateMarriageContent = (recipientName: string): string => {
  return `ألف مبروك وكل التهاني القلبية الصادقة على هذه المناسبة السعيدة المباركة الميمونة التي نسأل الله أن يجعلها فاتحة خير وبركة وسعادة! 

بارك الله لكما وبارك عليكما وجمع بينكما في خير وعافية ومحبة ومودة ورحمة، كما دعا الحبيب المصطفى صلى الله عليه وسلم للمتزوجين الجدد في سنته الشريفة المباركة.

نسأل الله العظيم رب العرش الكريم أن يجعل زواجكما المبارك سعيداً هانئاً مليئاً بالمودة والرحمة والسكينة والطمأنينة، وأن يرزقكما الذرية الصالحة الطيبة المباركة التي تكون قرة عين لكما في الدنيا والآخرة، ويديم عليكما نعمة الحب الصادق والوفاق التام والتفاهم الجميل.

نشارككما فرحتكما الغالية العظيمة بكل صدق ومحبة، ونتمنى لكما حياة زوجية مليئة بالسعادة والهناء والبركة والخير الكثير. عقبال مائة سنة من السعادة والهناء والمحبة والوفاق، وتكونان دائماً وأبداً مثالاً يحتذى به في الحب الصادق والوفاء الجميل.`;
};

// إنشاء محتوى خاص للتخرج
const generateGraduationContent = (recipientName: string): string => {
  return `ألف ألف مبروك على هذا الإنجاز الرائع العظيم والنجاح المستحق المشرف الذي يملأ قلوبنا فخراً واعتزازاً بكم وبما حققتموه من تفوق باهر!

لقد كان جهدكم المتواصل الدؤوب وصبركم الجميل الرائع واجتهادكم المثمر المبارك وتفانيكم الصادق النبيل سبباً بفضل الله في تحقيق هذا النجاح الباهر المشرف والتفوق المذهل الرائع. إن ما حققتموه اليوم هو ثمرة طيبة مباركة لسنوات طويلة من الدراسة الجادة والمثابرة المستمرة والعمل الجاد المخلص والصبر الجميل على المشاق والتحديات.

نسأل الله العظيم أن يبارك لكم في شهادتكم الجديدة المباركة، وأن يجعلها بداية مشرقة زاهرة لمستقبل مليء بالنجاحات المتتالية والإنجازات الباهرة والتوفيق المستمر، وأن يوفقكم دائماً وأبداً في خدمة دينكم الحنيف ووطنكم الغالي وأمتكم الإسلامية العريقة.

نفتخر ونعتز بإنجازكم الرائع هذا أيما فخر واعتزاز، ونتمنى لكم بصدق وإخلاص التوفيق والنجاح المستمر في المرحلة القادمة من حياتكم العملية والعلمية والمهنية. هنيئاً لكم هذا النجاح المستحق، وعقبال المزيد من الإنجازات والنجاحات بإذن الله.`;
};

const interpretOccasion = (occasion: string): string => {
  // تحليل سياق المناسبة
  const context = analyzeOccasionContext(occasion);
  
  // إذا كانت مناسبة خاصة، إرجاع النص كما هو للمعالجة الخاصة
  if (context.requiresSpecialHandling) {
    return occasion;
  }
  
  // المعالجة العادية للمناسبات الأخرى
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
  
  // Newborn-specific diacritics
  diacritizedText = diacritizedText.replace(/المولود/g, 'المَوْلُودُ');
  diacritizedText = diacritizedText.replace(/بارك الله/g, 'بارَكَ اللهُ');
  diacritizedText = diacritizedText.replace(/مبروك/g, 'مَبْرُوكٌ');
  diacritizedText = diacritizedText.replace(/الذرية/g, 'الذُّرِّيَّةُ');
  diacritizedText = diacritizedText.replace(/الصالحة/g, 'الصَّالِحَةُ');
  diacritizedText = diacritizedText.replace(/نباتاً/g, 'نَباتاً');
  diacritizedText = diacritizedText.replace(/حسناً/g, 'حَسَناً');
  diacritizedText = diacritizedText.replace(/الأولاد/g, 'الأَوْلادُ');
  diacritizedText = diacritizedText.replace(/نعمة/g, 'نِعْمَةٌ');
  diacritizedText = diacritizedText.replace(/عظيمة/g, 'عَظِيمَةٌ');
  diacritizedText = diacritizedText.replace(/أمانة/g, 'أَمانَةٌ');
  diacritizedText = diacritizedText.replace(/غالية/g, 'غالِيَةٌ');
  diacritizedText = diacritizedText.replace(/تربيتهم/g, 'تَرْبِيَتِهِمْ');
  diacritizedText = diacritizedText.replace(/تنشئتهم/g, 'تَنْشِئَتِهِمْ');
  diacritizedText = diacritizedText.replace(/يحفظه/g, 'يَحْفَظَهُ');
  diacritizedText = diacritizedText.replace(/مكروه/g, 'مَكْرُوهٍ');
  diacritizedText = diacritizedText.replace(/ينبته/g, 'يُنْبِتَهُ');
  diacritizedText = diacritizedText.replace(/الصالحين/g, 'الصَّالِحِينَ');
  diacritizedText = diacritizedText.replace(/المصلحين/g, 'المُصْلِحِينَ');
  diacritizedText = diacritizedText.replace(/براً/g, 'بَرّاً');
  diacritizedText = diacritizedText.replace(/بوالديه/g, 'بِوالِدَيْهِ');
  diacritizedText = diacritizedText.replace(/طاعته/g, 'طاعَتَهُ');
  diacritizedText = diacritizedText.replace(/تربيته/g, 'تَرْبِيَتِهِ');
  diacritizedText = diacritizedText.replace(/النشأة/g, 'النَّشْأَةَ');
  diacritizedText = diacritizedText.replace(/سلامة/g, 'سَلامَةَ');
  diacritizedText = diacritizedText.replace(/الوالدة/g, 'الوالِدَةِ');
  diacritizedText = diacritizedText.replace(/الكريمة/g, 'الكَرِيمَةِ');
  diacritizedText = diacritizedText.replace(/قرة عين/g, 'قُرَّةَ عَيْنٍ');
  diacritizedText = diacritizedText.replace(/زينة/g, 'زِينَةُ');
  diacritizedText = diacritizedText.replace(/الدنيا/g, 'الدُّنْيا');
  diacritizedText = diacritizedText.replace(/أملنا/g, 'أَمَلُنا');
  diacritizedText = diacritizedText.replace(/المستقبل/g, 'المُسْتَقْبَلِ');
  diacritizedText = diacritizedText.replace(/المشرق/g, 'المُشْرِقِ');
  diacritizedText = diacritizedText.replace(/البررة/g, 'البَرَرَةِ');
  diacritizedText = diacritizedText.replace(/الأتقياء/g, 'الأَتْقِياءِ');
  diacritizedText = diacritizedText.replace(/يسعدون/g, 'يُسْعِدُونَ');
  diacritizedText = diacritizedText.replace(/آباءهم/g, 'آباءَهُمْ');
  diacritizedText = diacritizedText.replace(/والآخرة/g, 'والآخِرَةِ');
  diacritizedText = diacritizedText.replace(/فرحتنا/g, 'فَرْحَتُنا');
  diacritizedText = diacritizedText.replace(/تذكرنا/g, 'تُذَكِّرُنا');
  diacritizedText = diacritizedText.replace(/بفضل/g, 'بِفَضْلِ');
  diacritizedText = diacritizedText.replace(/ونعمه/g, 'وَنِعَمِهِ');
  diacritizedText = diacritizedText.replace(/تحصى/g, 'تُحْصَى');
  diacritizedText = diacritizedText.replace(/الطيبة/g, 'الطَّيِّبَةِ');
  diacritizedText = diacritizedText.replace(/الهبات/g, 'الهِباتِ');
  diacritizedText = diacritizedText.replace(/الربانية/g, 'الرَّبّانِيَّةِ');
  
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
  diacritizedText = diacritizedText.replace(/نسأل/g, 'نَسْأَلُ');
  diacritizedText = diacritizedText.replace(/الله/g, 'اللهُ');
  diacritizedText = diacritizedText.replace(/العلي/g, 'العَلِيُّ');
  diacritizedText = diacritizedText.replace(/القدير/g, 'القَدِيرُ');
  diacritizedText = diacritizedText.replace(/يبارك/g, 'يُبارِكَ');
  diacritizedText = diacritizedText.replace(/يوفقكم/g, 'يُوَفِّقَكُمْ');
  diacritizedText = diacritizedText.replace(/تقبلوا/g, 'تَقَبَّلُوا');
  diacritizedText = diacritizedText.replace(/فائق/g, 'فائِقَ');
  
  return diacritizedText;
};

const generateArabicLetter = async (data: LetterData, forceRegenerate: boolean = false): Promise<string> => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  // تحليل سياق المناسبة
  const context = analyzeOccasionContext(data.occasion);
  
  // معالجة خاصة للمناسبات الشخصية
  if (context.requiresSpecialHandling) {
    let specialContent = '';
    
    switch (context.subtype) {
      case 'newborn':
        specialContent = generateNewbornContent(data.recipientName, data.tone);
        break;
      case 'marriage':
        specialContent = generateMarriageContent(data.recipientName);
        break;
      case 'graduation':
        specialContent = generateGraduationContent(data.recipientName);
        break;
      default:
        specialContent = '';
    }
    
    if (specialContent) {
      const hijriDate = getHijriDate();
      const gregorianDate = new Date().toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const recipientTitle = data.recipientTitle ? 
        `${data.recipientTitle}` : 
        '';
      
      const recipientName = data.recipientName || '';
      const greeting = 'السلام عليكم ورحمة الله وبركاته';
      const closing = 'بكل المحبة والتقدير والاحترام والدعاء الصادق من أعماق القلب المحب';
      const senderName = data.senderName || 'محبكم الصادق في الله';
      const organization = data.senderOrganization || '';

      let finalLetter = `بسم الله الرحمن الرحيم

التاريخ الهجري: ${hijriDate}
التاريخ الميلادي: ${gregorianDate}

${recipientTitle}
${recipientName}

${greeting}

${specialContent}

${closing}،


${senderName}
${organization}`;

      // ضمان الحد الأدنى 600 حرف
      if (finalLetter.length < 600) {
        const additionalContent = `

نسأل الله العظيم رب العرش الكريم أن يديم عليكم نعمه الظاهرة والباطنة، وأن يزيدكم من فضله وكرمه وجوده، وأن يجعل أيامكم كلها خيراً وبركة وسعادة وهناء. إننا نشعر بالسعادة البالغة والفرح العظيم لمشاركتكم هذه اللحظات المباركة الجميلة، ونسأل الله أن يجعلها ذكرى طيبة خالدة في قلوبكم وقلوبنا جميعاً.`;
        
        finalLetter += additionalContent;
      }

      if (data.needsDiacritics) {
        finalLetter = addDiacritics(finalLetter);
      }

      return finalLetter;
    }
  }

  // المعالجة العادية للمناسبات الأخرى
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

    // ضمان الحد الأدنى 600 حرف للرسائل العادية
    if (generatedLetter.length < 600) {
      const additionalContent = `

نود أن نؤكد لكم مرة أخرى على تقديرنا العميق الصادق وامتناننا الكبير لجهودكم المباركة الطيبة وعطائكم المتميز الرائع. إن ما قدمتموه من أعمال جليلة ومساع نبيلة يستحق منا كل الثناء والتقدير والإعجاب. نسأل الله العظيم أن يجزيكم خير الجزاء وأوفاه، وأن يبارك في جهودكم ومساعيكم، وأن يوفقكم لما فيه الخير والصلاح والفلاح في الدنيا والآخرة.`;
      
      generatedLetter += additionalContent;
    }

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
        body = `يطيب لنا في هذا اليوم المبارك السعيد أن نتوجه إليكم بأسمى آيات الشكر الجزيل والعرفان العميق، وأصدق عبارات التقدير الخالص والامتنان الصادق، على ${enhancedOccasion}. 

إن ما قدمتموه من جهود متميزة رائعة وعمل دؤوب مستمر، وما بذلتموه من وقت ثمين غال وفكر نير مضيء، يستحق منا كل التقدير والإعجاب والثناء العطر. فقد كان لعملكم المتقن الرائع وتفانيكم الصادق النبيل أثر بالغ عميق في تحقيق النجاح الباهر والتميز المنشود والإنجاز المطلوب.

نحن نقدر عالياً وبصدق وإخلاص ما تتحلون به من خلق رفيع كريم وسلوك قويم نبيل، وما تظهرونه من حرص بالغ شديد على أداء الواجب بأفضل صورة ممكنة وأجمل طريقة متاحة. إن إنجازاتكم المتميزة الباهرة تعكس بوضوح شخصيتكم النبيلة الطاهرة وقدراتكم الاستثنائية الرائعة.

نسأل الله العلي العظيم القدير المنان أن يبارك في جهودكم المباركة، وأن يوفقكم دائماً وأبداً لما فيه الخير والصلاح والفلاح، وأن يجعل عملكم النبيل في ميزان حسناتكم الثقيلة يوم الدين.`;
        break;
      
      case 'أدبية':
        body = `نرفع إليكم في هذا اليوم الطيب المبارك أجمل التحيات العطرة وأعطر السلام الزكي، ونقدم لكم أصدق عبارات الثناء الجميل والإكبار العميق على ${enhancedOccasion}.

لقد كان عملكم المتميز الرائع بمثابة النجم الساطع اللامع في سماء التميز الفسيحة، والدرة الثمينة الغالية في تاج الإنجاز المرصع. فقد أضفتم بجهودكم المباركة الطيبة لمسة جمال أخاذة وإبداع مذهل، وبصمة واضحة جلية لا تُمحى من ذاكرة الزمان الخالد.

إن ما شهدناه من تفانٍ صادق حقيقي ومثابرة عجيبة رائعة، وما لمسناه من حرص بالغ شديد على الإتقان التام والجودة العالية، يجعلنا نقف بكل إجلال وتقدير واحترام لشخصكم الكريم النبيل. لقد رسمتم بأعمالكم النبيلة الجليلة لوحة فنية رائعة من الجد المثمر والاجتهاد المبارك.

نحن نفتخر ونعتز بوجودكم الكريم بيننا، ونعتز بما تقدمونه من عطاء متميز متدفق وإسهامات قيمة غالية تثري مسيرة العمل المباركة وتزيدها إشراقاً ونوراً وجمالاً وبهاءً.`;
        break;
      
      case 'ودية':
        body = `نتوجه إليكم بقلوب مفعمة بالمحبة الصادقة والتقدير العميق، وبمشاعر صادقة نقية من الامتنان الخالص والعرفان الجميل، لنشكركم من أعماق قلوبنا المحبة على ${enhancedOccasion}.

لقد تركت جهودكم الطيبة المباركة وأعمالكم النبيلة الجليلة أثراً جميلاً عميقاً في نفوسنا جميعاً بلا استثناء. فقد كنتم بحق وصدق خير معين صادق وأفضل مساعد مخلص، وقد أدركنا من خلال تعاملكم الراقي الكريم وسلوككم المهذب النبيل معنى التعاون الحقيقي الصادق والعمل بروح الفريق الواحد المتماسك.

إن ذكرياتنا الجميلة الحلوة معكم ستبقى محفورة بأحرف من نور في قلوبنا المحبة، وإن الأوقات الطيبة المباركة التي قضيناها في العمل المشترك المثمر ستظل من أجمل اللحظات الغالية في مسيرتنا الطويلة. لقد كنتم بحق وصدق نموذجاً يُحتذى به في الأخلاق الحميدة الفاضلة والتعامل الراقي الكريم.

نشكركم مرة أخرى وألف مرة على كل ما قدمتموه من خير وعطاء، ونتمنى لكم بصدق وإخلاص دوام التوفيق والنجاح والفلاح في جميع مساعيكم المستقبلية الطيبة المباركة.`;
        break;
      
      default:
        body = `نتشرف ونتباهى بأن نتقدم إليكم بجزيل الشكر العميق وعظيم الامتنان الصادق على ${enhancedOccasion}. 

إن الجهود المتميزة الرائعة التي بذلتموها بكل إخلاص وتفان، والعمل الدؤوب المستمر الذي قمتم به بكل جدية واهتمام، يستحق منا كل التقدير والثناء والإعجاب الصادق. لقد أظهرتم من خلال عملكم المتقن الجميل مدى حرصكم البالغ على التميز والإتقان التام، وقد كان لذلك أثر إيجابي واضح جلي على سير العمل وتحقيق الأهداف المنشودة والغايات المرجوة.

نقدر عالياً وبكل صدق وإخلاص ما تتحلون به من مسؤولية عالية والتزام صادق، وما تبذلونه من جهد مخلص متواصل في سبيل أداء المهام الموكلة إليكم بأفضل صورة ممكنة وأجمل شكل متاح. إن إنجازاتكم الباهرة المتميزة تعكس قدراتكم المهنية العالية الرفيعة وخبرتكم الواسعة العريقة في مجال عملكم المتخصص.

نسأل الله العظيم أن يوفقكم في جميع مساعيكم الطيبة، وأن يبارك في جهودكم المتواصلة النبيلة، وأن يجعل عملكم المبارك سبباً في تحقيق المزيد من النجاحات الباهرة والإنجازات المشرفة الرائعة.`;
    }
  }

  const closing = 'وتقبلوا منا فائق الاحترام والتقدير والمحبة الصادقة الخالصة';
  const senderName = data.senderName || 'المرسل الكريم';
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

  // ضمان الحد الأدنى 600 حرف
  if (finalLetter.length < 600) {
    const additionalContent = `

نود أن نضيف بأننا نشعر بالامتنان العميق والسعادة البالغة لوجودكم الكريم في حياتنا، ونحمد الله على نعمة التعرف عليكم والعمل معكم. إن صفاتكم النبيلة وأخلاقكم الحميدة جعلتكم محل تقدير واحترام الجميع بلا استثناء.`;
    
    finalLetter += additionalContent;
  }

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

  // ضمان الحد الأدنى 600 حرف للنسخة الإبداعية
  if (finalLetter.length < 600) {
    const additionalPoetry = `

إن الكلمات الجميلة تعجز عن وصف مدى تقديرنا العميق الصادق وامتناننا الخالص الجميل لجهودكم المباركة الطيبة وعطائكم المتميز الرائع الذي لا مثيل له ولا نظير. لقد كان لكم الأثر البالغ العميق في إثراء مسيرة العمل المباركة وإضافة لمسات إبداعية متميزة فريدة تستحق كل الثناء والتقدير والإعجاب من كل من شهدها ورآها وتأثر بها.

نسأل الله العظيم رب العرش الكريم أن يجعل هذه المناسبة السعيدة المباركة بداية خير وبركة ونجاح وتوفيق في حياتكم الكريمة، وأن يديم عليكم نعمه الظاهرة والباطنة، ويزيدكم من فضله وكرمه وجوده اللامحدود.`;
    
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
