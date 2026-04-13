// ============================================================
// SUGI SUSHI LUXURY — Menu Data
// Premium curated collection — each dish tells a story
// ============================================================

export interface MenuItem {
  id: string
  categoryId: string
  name: { en: string; ar: string }
  tagline: { en: string; ar: string }
  description: { en: string; ar: string }
  price: number
  currency: 'SAR'
  images: string[] // URLs to placeholder images
  chefNote?: { en: string; ar: string }
  tags?: string[]
  isSignature?: boolean
  allergens?: string[]
}

export interface MenuCategory {
  id: string
  name: { en: string; ar: string }
  subtitle: { en: string; ar: string }
  icon: string
  order: number
}

export const categories: MenuCategory[] = [
  {
    id: 'signature',
    name: { en: 'Signature Rolls', ar: 'لفائف الشيف المميزة' },
    subtitle: { en: 'Where artistry meets craft', ar: 'حيث تلتقي الحرفية بالإبداع' },
    icon: '✦',
    order: 1,
  },
  {
    id: 'nigiri',
    name: { en: 'Nigiri', ar: 'نيجيري' },
    subtitle: { en: 'Pure fish, perfect rice', ar: 'سمك نقي، أرز مثالي' },
    icon: '◈',
    order: 2,
  },
  {
    id: 'sashimi',
    name: { en: 'Sashimi', ar: 'ساشيمي' },
    subtitle: { en: 'The essence of the sea', ar: 'جوهر البحر' },
    icon: '◎',
    order: 3,
  },
  {
    id: 'chef-specials',
    name: { en: 'Chef Specials', ar: 'أطباق الشيف الخاصة' },
    subtitle: { en: 'Tonight, the chef decides', ar: 'الليلة، الشيف يقرر' },
    icon: '◆',
    order: 4,
  },
  {
    id: 'desserts',
    name: { en: 'Desserts', ar: 'الحلويات' },
    subtitle: { en: 'A sweet conclusion', ar: 'خاتمة حلوة' },
    icon: '❋',
    order: 5,
  },
]

export const menuItems: MenuItem[] = [
  // ── SIGNATURE ROLLS ──
  {
    id: 'dragon-roll',
    categoryId: 'signature',
    name: { en: 'The Golden Dragon', ar: 'التنين الذهبي' },
    tagline: { en: 'A roll fit for legend', ar: 'لفافة تليق بالأساطير' },
    description: {
      en: 'Eel and avocado draped over seasoned sushi rice, finished with a brush of our house-made unagi glaze and 24k gold leaf. A theatrical centerpiece that commands attention.',
      ar: 'أنقليس وأفوكادو مغطاة بأرز السوشي المتبل، مع لمسة من صلصة الأوناغي المحلية وأوراق الذهب عيار 24. تحفة فنية تجذب الأنظار.',
    },
    price: 89,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
    ],
    chefNote: {
      en: 'The gold leaf is edible and sourced from Kanazawa, Japan — the same supplier used by three-star Michelin houses in Tokyo.',
      ar: 'أوراق الذهب صالحة للأكل وم sourced من كانازاوا، اليابان — نفس المورد المستخدم في دور ميشلان ثلاث نجوم بطوكيو.',
    },
    tags: ['signature', 'chef-recommended'],
    isSignature: true,
    allergens: ['soy', 'sesame'],
  },
  {
    id: 'sakura-blossom',
    categoryId: 'signature',
    name: { en: 'Sakura Blossom', ar: 'زهرة الساكورا' },
    tagline: { en: 'Spring, captured in a roll', ar: 'الربيع، مُجسّد في لفافة' },
    description: {
      en: 'Delicate tuna tartare with yuzu cream, wrapped in a soy paper dyed with beetroot for a blush pink hue. Garnished with micro shiso and edible cherry blossoms.',
      ar: 'تارتار تونة دقيق مع كريمة اليوزو، ملفوفة بورق صويا مصبوغ بالبنجر للون وردي ناعم. مُزين بأوراق الشيسو وأزهار الكرز الصالحة للأكل.',
    },
    price: 75,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=800&q=80',
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80',
    ],
    chefNote: {
      en: 'The cherry blossoms are preserved in salt, flown in from Yoshino during peak season.',
      ar: 'أزهار الكرز محفوظة بالملح، تُنقل جواً من يوشينو خلال موسم الذروة.',
    },
    tags: ['seasonal', 'chef-recommended'],
    isSignature: true,
    allergens: ['soy', 'fish'],
  },
  {
    id: 'truffle-omakase',
    categoryId: 'signature',
    name: { en: 'Truffle Omakase Roll', ar: 'لفافة التروفل أوماكاسي' },
    tagline: { en: 'Earth meets ocean', ar: 'حيث تلتقي الأرض بالمحيط' },
    description: {
      en: 'Seared wagyu beef paired with black truffle and toro, resting on a bed of truffle-infused rice. Finished with truffle oil and a whisper of sea salt from Okinawa.',
      ar: 'لحم واغيو مشوي مع التروفل الأسود والتورو، على سرير من أرز بنكهة التروفل. مُنتهي بزيت التروفل ورشة ملح من أوكيناوا.',
    },
    price: 120,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=800&q=80',
      'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=80',
      'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=800&q=80',
    ],
    chefNote: {
      en: 'We use Alba white truffle in season (October–December) and Périgord black truffle the rest of the year.',
      ar: 'نستخدم تروفل ألبا الأبيض في الموسم (أكتوبر-ديسمبر) وتروفل بيريغور الأسود بقية العام.',
    },
    tags: ['premium', 'limited'],
    isSignature: true,
    allergens: ['beef', 'truffle'],
  },
  {
    id: 'rainbow-supreme',
    categoryId: 'signature',
    name: { en: 'Rainbow Supreme', ar: 'قوس قزح الملكي' },
    tagline: { en: 'Seven fish, one masterpiece', ar: 'سبع أسماك، تحفة واحدة' },
    description: {
      en: 'A California roll crown with seven varieties of the finest sashimi — salmon, tuna, hamachi, tai, ebi, unagi, and hotate. Each slice hand-placed for a mosaic of colour and flavour.',
      ar: 'لفافة كاليفورنيا متوجة بسبعة أنواع من أرقى الساشيمي — سلمون، تونة، هاماشي، تاي، إبي، أوناغي، وهوتاتي. كل شريحة موضوعة يدوياً.',
    },
    price: 95,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1562802378-063ec186a863?w=800&q=80',
      'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=800&q=80',
    ],
    tags: ['popular', 'chef-recommended'],
    isSignature: true,
    allergens: ['shellfish', 'fish', 'soy'],
  },

  // ── NIGIRI ──
  {
    id: 'otoro-nigiri',
    categoryId: 'nigiri',
    name: { en: 'Ōtoro Nigiri', ar: 'أوتورو نيجيري' },
    tagline: { en: 'The king of tuna', ar: 'ملك التونة' },
    description: {
      en: 'The most prized cut of bluefin tuna — the fatty belly. It melts on the tongue like butter, leaving a clean, sweet finish. Each piece is brushed with nikiri aged for six months.',
      ar: 'أقطع قطع التونة زرقاء الزعنفة — البطن الدهني. يذوب على اللسان كالزبدة، مع نهاية نظيفة وحلوة. كل قطعة مدهونة بنيكيري مُعتق ستة أشهر.',
    },
    price: 68,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800&q=80',
      'https://images.unsplash.com/photo-1534256958597-7fe6b87dca58?w=800&q=80',
    ],
    tags: ['premium'],
    allergens: ['fish', 'soy'],
  },
  {
    id: 'salmon-nigiri',
    categoryId: 'nigiri',
    name: { en: 'Salmon Nigiri', ar: 'سلمون نيجيري' },
    tagline: { en: 'Norwegian purity', ar: 'نقاء نرويجي' },
    description: {
      en: 'Wild Norwegian salmon, flown in daily. Silky, rich, with a natural sweetness that needs nothing but a touch of fresh wasabi.',
      ar: 'سلمون نرويجي بري، يُنقل يومياً. حريري، غني، بحلاوة طبيعية لا تحتاج سوى لمسة من واسابي طازج.',
    },
    price: 42,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80',
    ],
    allergens: ['fish', 'soy'],
  },
  {
    id: 'uni-nigiri',
    categoryId: 'nigiri',
    name: { en: 'Uni Nigiri', ar: 'أوني نيجيري' },
    tagline: { en: 'The ocean\'s gold', ar: 'ذهب المحيط' },
    description: {
      en: 'Hokkaido sea urchin — briny, sweet, impossibly creamy. Sourced from the cold waters of Rishiri and placed on warm rice moments before serving.',
      ar: 'قنفذ بحر هوكايدو — مالح، حلو، كريمي بشكل لا يُصدق. من المياه الباردة لريشيري وُضع على أرز دافئ قبل التقديم بلحظات.',
    },
    price: 78,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=800&q=80',
    ],
    tags: ['premium', 'limited'],
    allergens: ['shellfish', 'soy'],
  },
  {
    id: 'ebi-nigiri',
    categoryId: 'nigiri',
    name: { en: 'Botan Ebi Nigiri', ar: 'بوتان إيبي نيجيري' },
    tagline: { en: 'Sweet shrimp from the deep', ar: 'روبيان حلو من الأعماق' },
    description: {
      en: 'Botan shrimp — the sweetest of all edible shrimp — served raw in the traditional Hokkaido style. Its texture is like silk, its flavour like the sea on a calm morning.',
      ar: 'روبيان بوتان — أحلى جميع الروبيان الصالح للأكل — يُقدم نيئاً على طريقة هوكايدو التقليدية. قوامه كالحرير، ونكهته كالبحر في صباح هادئ.',
    },
    price: 52,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1562802378-063ec186a863?w=800&q=80',
    ],
    allergens: ['shellfish'],
  },

  // ── SASHIMI ──
  {
    id: 'sashimi-moriawase',
    categoryId: 'sashimi',
    name: { en: 'Sashimi Moriawase', ar: 'ساشيمي مورياواسي' },
    tagline: { en: 'An orchestra of fish', ar: 'أوركسترا من السمك' },
    description: {
      en: 'Five cuts of the chef\'s finest sashimi, arranged on a bed of crushed ice with shiso, daikon, and sudachi. A study in texture and temperature.',
      ar: 'خمس قطع من أرقى ساشيمي الشيف، مُرتبة على سرير من الثلج المجروش مع شيسو، دايكون، وسوداشي. دراسة في القوام ودرجة الحرارة.',
    },
    price: 110,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1534482421-64566f976cfc?w=800&q=80',
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
      'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=800&q=80',
    ],
    chefNote: {
      en: 'The selection changes daily based on the morning\'s market. Trust the chef.',
      ar: 'التشكيلة تتغير يومياً بناءً على سوق الصباح. ثق بالشيف.',
    },
    tags: ['chef-recommended', 'for-two'],
    allergens: ['fish'],
  },
  {
    id: 'wagyu-tataki',
    categoryId: 'sashimi',
    name: { en: 'Wagyu Tataki', ar: 'واغيو تاتاكي' },
    tagline: { en: 'Beef, reimagined raw', ar: 'لحم، مُعاد تصوره نيئاً' },
    description: {
      en: 'A5 Miyazaki wagyu, lightly seared on the outside, ice-cold within. Sliced paper-thin and served with ponzu, garlic chips, and a whisper of yuzu kosho.',
      ar: 'واغيو ميازاكي A5، مشوي خفيفاً من الخارج، بارد كالجليد من الداخل. مُقطع برفق رقيقة مع بونزو، رقائق ثوم، ولمسة يوزو كوشو.',
    },
    price: 135,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=800&q=80',
      'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=80',
    ],
    tags: ['premium', 'chef-recommended'],
    allergens: ['beef', 'soy', 'citrus'],
  },
  {
    id: 'hamachi-sashimi',
    categoryId: 'sashimi',
    name: { en: 'Hamachi Sashimi', ar: 'هاماشي ساشيمي' },
    tagline: { en: 'Yellowtail perfection', ar: 'كمال الذيل الأصفر' },
    description: {
      en: 'Japanese yellowtail, sliced at the precise angle to maximise surface area and flavour release. Served with a ginger-scallion relish and a drop of sudachi.',
      ar: 'الذيل الأصفر الياباني، مُقطع بالزاوية الدقيقة لتعظيم المساحة السطحية وإطلاق النكهة. يُقدم مع صلصة الزنجبيل والبصل الأخضر وقطرة سوداشي.',
    },
    price: 62,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
    ],
    allergens: ['fish', 'soy'],
  },

  // ── CHEF SPECIALS ──
  {
    id: 'omakase-platter',
    categoryId: 'chef-specials',
    name: { en: 'Omakase Experience', ar: 'تجربة أوماكاسي' },
    tagline: { en: 'Surrender to the chef', ar: 'استسلم للشيف' },
    description: {
      en: 'Twelve courses, hand-selected by Chef Takeshi each evening. No menu. No choices. Just trust. Each piece is an expression of what the ocean offered that morning.',
      ar: 'اثنى عشر طبقاً، يختارها الشيف تاكيشي يدوياً كل مساء. لا قائمة. لا خيارات. فقط ثقة. كل قطعة هي تعبير عما قدمه البحر ذلك الصباح.',
    },
    price: 280,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=800&q=80',
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80',
    ],
    chefNote: {
      en: 'This is the full Sugi experience. Allow two hours. Pairing with sake is available.',
      ar: 'هذه هي تجربة سوجي الكاملة. اسمح بساعتين. تتوفر إقران الساكي.',
    },
    tags: ['signature', 'for-one', 'chef-recommended'],
    isSignature: true,
    allergens: ['fish', 'shellfish', 'soy', 'egg'],
  },
  {
    id: 'lobster-thermidor-roll',
    categoryId: 'chef-specials',
    name: { en: 'Lobster Thermidor Roll', ar: 'لفافة الستر ثيرميدور' },
    tagline: { en: 'French technique, Japanese soul', ar: 'تقنية فرنسية، روح يابانية' },
    description: {
      en: 'Whole Maine lobster, prepared thermidor-style, wrapped in sushi rice with truffle cream and micro greens. A crossover between worlds.',
      ar: 'لوبستر مين كامل، مُحضّر بأسلوب ثيرميدور، ملفوف بأرز السوشي مع كريمة التروفل والخضروات الصغيرة. تقاطع بين عالمين.',
    },
    price: 145,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=800&q=80',
      'https://images.unsplash.com/photo-1562802378-063ec186a863?w=800&q=80',
    ],
    tags: ['limited', 'chef-recommended'],
    allergens: ['shellfish', 'dairy', 'soy'],
  },
  {
    id: 'caviar-nigiri',
    categoryId: 'chef-specials',
    name: { en: 'Caviar Nigiri', ar: 'كافيار نيجيري' },
    tagline: { en: 'Where luxury stacks', ar: 'حيث تتراكم الفخامة' },
    description: {
      en: 'A nigiri topped with Ossetra caviar and a quenelle of crème fraîche. The salt of the sea meets the richness of the farm.',
      ar: 'نيجيري مغطى بكافيار أوسترا وكوينيل كريمة فرش. ملح البحر يلتقي بغنى المزرعة.',
    },
    price: 155,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800&q=80',
    ],
    tags: ['premium', 'limited'],
    isSignature: true,
    allergens: ['fish', 'dairy', 'soy'],
  },

  // ── DESSERTS ──
  {
    id: 'matcha-tiramisu',
    categoryId: 'desserts',
    name: { en: 'Matcha Tiramisu', ar: 'تيراميسو ماتشا' },
    tagline: { en: 'Tokyo meets Venice', ar: 'طوكيو تلتقي بالبندقية' },
    description: {
      en: 'Layers of matcha-soaked ladyfingers, mascarpone cream, and a dusting of Uji ceremonial-grade matcha. An East-meets-West meditation in a glass.',
      ar: 'طبقات من أصابع البسكويت المنقوعة بالماتشا، كريمة масكربون، ورشة ماتشا احتفالية من أوجي. تأمل شرقي-غربي في كأس.',
    },
    price: 45,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    ],
    allergens: ['dairy', 'egg', 'gluten', 'matcha'],
  },
  {
    id: 'yuzu-panna-cotta',
    categoryId: 'desserts',
    name: { en: 'Yuzu Panna Cotta', ar: 'بانّا كوتا يوزو' },
    tagline: { en: 'Citrus silk', ar: 'حرير الحمضيات' },
    description: {
      en: 'Silky panna cotta infused with Japanese yuzu, topped with a yuzu gel and edible flowers. Light, bright, and the perfect finale.',
      ar: 'بانّا كوتا حريرية منقوعة باليوزو الياباني، مغطاة بهلام اليوزو وأزهار صالحة للأكل. خفيفة، مشرقة، والخاتمة المثالية.',
    },
    price: 38,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    ],
    allergens: ['dairy', 'citrus'],
  },
  {
    id: 'black-sesame-creme',
    categoryId: 'desserts',
    name: { en: 'Black Sesame Crème Brûlée', ar: 'كريم بروليه السمسم الأسود' },
    tagline: { en: 'Crack the surface', ar: 'اكسر السطح' },
    description: {
      en: 'A torched caramel crust gives way to a black sesame custard that is nutty, deep, and impossibly smooth. The contrast is the point.',
      ar: 'قشرة كراميل محترقة تفسح المجال لكاسترد السمسم الأسود — جوزي، عميق، وناعم بشكل لا يُصدق. التناقض هو الفكرة.',
    },
    price: 42,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80',
    ],
    allergens: ['dairy', 'egg', 'sesame'],
  },
]

// Helper to get items by category
export const getItemsByCategory = (categoryId: string): MenuItem[] =>
  menuItems.filter(item => item.categoryId === categoryId)

export const getItemById = (id: string): MenuItem | undefined =>
  menuItems.find(item => item.id === id)
