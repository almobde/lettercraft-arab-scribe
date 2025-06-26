
import { LetterData, GeneratedLetter } from '../types/letter';

const generateArabicLetter = (data: LetterData): string => {
  if (!data.recipientName && !data.occasion) {
    return '';
  }

  const currentDate = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Header with centered recipient name and title
  const recipientHeader = data.recipientName ? 
    `إلى حضرة الأستاذ الفاضل / ${data.recipientName}` : 
    'إلى من يهمه الأمر';
  
  const recipientTitle = data.recipientTitle ? 
    `${data.recipientTitle}` : '';
  
  // Greeting
  const greeting = 'السلام عليكم ورحمة الله وبركاته';
  
  // Body content based on tone with rich details
  let body = '';
  if (data.occasion) {
    switch (data.tone) {
      case 'تحفيزية':
        body = `يطيب لنا في هذا اليوم المبارك أن نتوجه إليكم بأسمى آيات الشكر والعرفان، وأصدق عبارات التقدير والامتنان، على ${data.occasion}. 

إن ما قدمتموه من جهود متميزة وعمل دؤوب، وما بذلتموه من وقت ثمين وفكر نير، يستحق منا كل التقدير والإعجاب. فقد كان لعملكم المتقن وتفانيكم الصادق أثر بالغ في تحقيق النجاح والتميز.

نحن نقدر عالياً ما تتحلون به من خلق رفيع وسلوك قويم، وما تظهرونه من حرص بالغ على أداء الواجب بأفضل صورة ممكنة. إن إنجازاتكم المتميزة تعكس شخصيتكم النبيلة وقدراتكم الاستثنائية.

نسأل الله العلي القدير أن يبارك في جهودكم، وأن يوفقكم لما فيه الخير والصلاح، وأن يجعل عملكم في ميزان حسناتكم.`;
        break;
      
      case 'أدبية':
        body = `نرفع إليكم في هذا اليوم الطيب أجمل التحيات وأعطر السلام، ونقدم لكم أصدق عبارات الثناء والإكبار على ${data.occasion}.

لقد كان عملكم المتميز بمثابة النجم الساطع في سماء التميز، والدرة الثمينة في تاج الإنجاز. فقد أضفتم بجهودكم المباركة لمسة جمال وإبداع، وبصمة واضحة لا تُمحى من ذاكرة الزمن.

إن ما شهدناه من تفانٍ صادق ومثابرة حقيقية، وما لمسناه من حرص بالغ على الإتقان والجودة، يجعلنا نقف إجلالاً وتقديراً لشخصكم الكريم. لقد رسمتم بأعمالكم النبيلة لوحة فنية رائعة من الجد والاجتهاد.

نحن نفتخر بوجودكم بيننا، ونعتز بما تقدمونه من عطاء متميز وإسهامات قيمة تثري مسيرة العمل وتزيدها إشراقاً ونوراً.`;
        break;
      
      case 'ودية':
        body = `نتوجه إليكم بقلوب مفعمة بالمحبة والتقدير، وبمشاعر صادقة من الامتنان والعرفان، لنشكركم من أعماق قلوبنا على ${data.occasion}.

لقد تركت جهودكم الطيبة وأعمالكم النبيلة أثراً جميلاً في نفوسنا جميعاً. فقد كنتم بحق خير معين وأفضل مساعد، وقد أدركنا من خلال تعاملكم الراقي وسلوككم المهذب معنى التعاون الحقيقي والعمل بروح الفريق الواحد.

إن ذكرياتنا الجميلة معكم ستبقى محفورة في قلوبنا، وإن الأوقات الطيبة التي قضيناها في العمل المشترك ستظل من أجمل اللحظات في مسيرتنا. لقد كنتم بحق نموذجاً يُحتذى به في الأخلاق الحميدة والتعامل الراقي.

نشكركم مرة أخرى على كل ما قدمتموه، ونتمنى لكم دوام التوفيق والنجاح في جميع مساعيكم المستقبلية.`;
        break;
      
      default:
        body = `نتشرف بأن نتقدم إليكم بجزيل الشكر وعظيم الامتنان على ${data.occasion}. 

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

  return `بسم الله الرحمن الرحيم

${dateSection}

${recipientHeader}
${recipientTitle}

${greeting}

${body}

${closing}،


${senderName}
${organization}`;
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

  const greeting = data.recipientName ? `To Mr. ${data.recipientName}` : 'To Whom It May Concern';
  const title = data.recipientTitle ? `${data.recipientTitle}` : '';
  
  let body = '';
  if (data.occasion) {
    switch (data.tone) {
      case 'تحفيزية':
        body = `We are pleased to extend our highest appreciation and sincere gratitude for ${data.occasion}. Your outstanding efforts and dedicated work deserve all recognition and admiration. Your commitment to excellence and quality has made a significant positive impact on our organization's success.

We deeply value your exceptional skills and professional approach. Your achievements reflect your noble character and remarkable abilities. We pray that Allah blesses your efforts and grants you continued success in all your future endeavors.`;
        break;
      case 'أدبية':
        body = `We extend our finest greetings and most sincere appreciation for ${data.occasion}. Your distinguished work has been like a shining star in the sky of excellence, adding beauty and creativity to our organization.

Your dedication and perseverance, along with your commitment to quality and perfection, make us stand in admiration of your noble character. You have painted a beautiful artistic canvas with your noble deeds and tireless efforts.

We are proud to have you among us and cherish the valuable contributions you make to enrich our work journey.`;
        break;
      case 'ودية':
        body = `We approach you with hearts filled with love and appreciation, and sincere feelings of gratitude, to thank you from the depths of our hearts for ${data.occasion}.

Your kind efforts and noble deeds have left a beautiful impact on all of us. You have been truly the best helper and supporter, and through your refined dealings and courteous behavior, we have realized the meaning of true cooperation.

Our beautiful memories with you will remain engraved in our hearts, and the good times we spent working together will remain among the most beautiful moments in our journey.`;
        break;
      default:
        body = `We are honored to extend our sincere thanks and great appreciation for ${data.occasion}. Your distinguished efforts and diligent work deserve all our appreciation and praise.

You have demonstrated through your excellent work your commitment to excellence and perfection, which has had a clear positive impact on work progress and achieving the desired goals. We highly appreciate your sense of responsibility and commitment.

We pray that Allah grants you success in all your endeavors and blesses your continuous efforts.`;
    }
  }

  const closing = 'With highest respect and appreciation';
  const signature = data.senderName || 'The Sender';
  const organization = data.senderOrganization || '';

  return `Date: ${currentDate}

${greeting}
${title}

Peace be upon you and Allah's mercy and blessings.

${body}

${closing},

${signature}
${organization}`;
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
