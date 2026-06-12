export type Accent = 'cyan' | 'violet' | 'emerald';

export interface Startup {
  id: string;
  sector: string;
  tagline: string;
  problem: string;
  solution: string;
  techStack: string[];
  primaryMetric: { label: string; value: string };
  secondaryMetric: { label: string; value: string };
  accent: Accent;
  size: 'lg' | 'md';
}

export const STARTUPS: Startup[] = [
  {
    id: 'medtech',
    sector: 'MedTech AI',
    tagline: 'AI Diagnostics for Underserved Communities',
    problem: 'Rural healthcare in Central Asia faces a critical shortage of qualified specialists, leaving millions without proper diagnosis.',
    solution: 'Edge-deployed AI diagnostic assistant enabling remote screening for 40+ conditions on affordable, low-resource hardware.',
    techStack: ['Computer Vision', 'LLM', 'Edge AI', 'PyTorch'],
    primaryMetric: { label: 'Patients Served', value: '50K+' },
    secondaryMetric: { label: 'Partner Hospitals', value: '8' },
    accent: 'cyan',
    size: 'lg',
  },
  {
    id: 'fintech',
    sector: 'FinTech AI',
    tagline: 'Alternative Credit for the Unbanked',
    problem: '70% of SMEs lack access to fair credit scoring and affordable capital from traditional financial institutions.',
    solution: 'ML-powered alternative credit engine using behavioral analytics for instant, bias-free lending decisions.',
    techStack: ['ML Pipelines', 'Blockchain', 'NLP', 'FastAPI'],
    primaryMetric: { label: 'Disbursed', value: '$12M+' },
    secondaryMetric: { label: 'Borrowers', value: '15K+' },
    accent: 'violet',
    size: 'md',
  },
  {
    id: 'agritech',
    sector: 'AgriTech AI',
    tagline: 'Precision Farming via Satellite Intelligence',
    problem: 'Water scarcity and inefficient irrigation reduce crop yields by up to 35% across Central Asian arid regions.',
    solution: 'IoT sensor network + satellite imagery analysis enabling precision irrigation and crop health monitoring at scale.',
    techStack: ['IoT Sensors', 'Satellite Data', 'Predictive ML', 'Django'],
    primaryMetric: { label: 'Hectares Active', value: '10K+' },
    secondaryMetric: { label: 'Farms', value: '3,200' },
    accent: 'emerald',
    size: 'md',
  },
];

export interface StatItem {
  label: string;
  numericValue: number;
  displaySuffix: string;
  description: string;
  accent: Accent;
}

export const LIVE_STATS: StatItem[] = [
  { label: 'Startup Projects', numericValue: 50, displaySuffix: '+', description: 'Active ventures in incubation', accent: 'cyan' },
  { label: 'Active Users', numericValue: 10, displaySuffix: 'K+', description: 'Across all platform services', accent: 'violet' },
  { label: 'Jobs Created', numericValue: 1200, displaySuffix: '+', description: 'Direct employment generated', accent: 'emerald' },
  { label: 'International Partners', numericValue: 30, displaySuffix: '+', description: 'From 18 countries worldwide', accent: 'cyan' },
  { label: 'AI Solutions', numericValue: 25, displaySuffix: '+', description: 'Deployed in production today', accent: 'violet' },
];

export interface PartnerItem {
  name: string;
  category: 'tech' | 'malaysia' | 'startup' | 'gov';
}

export const PARTNERS: PartnerItem[] = [
  { name: 'Skolkovo', category: 'tech' },
  { name: 'MDEC Malaysia', category: 'malaysia' },
  { name: 'GSMA', category: 'tech' },
  { name: 'UzIT Park', category: 'gov' },
  { name: 'Astana Hub', category: 'tech' },
  { name: 'Cradle Fund', category: 'malaysia' },
  { name: 'KOICA', category: 'gov' },
  { name: 'NUS Enterprise', category: 'malaysia' },
  { name: 'Digital ASEAN', category: 'malaysia' },
  { name: 'Alibaba Cloud', category: 'tech' },
  { name: 'AWS Startups', category: 'tech' },
  { name: 'Google for Startups', category: 'tech' },
  { name: 'UNDP Uzbekistan', category: 'gov' },
  { name: 'ADB Ventures', category: 'gov' },
  { name: 'Techstars', category: 'startup' },
  { name: 'Y Combinator', category: 'startup' },
  { name: 'Microsoft Startups', category: 'tech' },
  { name: 'IFC', category: 'gov' },
];

export interface PerkItem {
  symbol: string;
  title: string;
  description: string;
  highlight: string;
}

export const PERKS: PerkItem[] = [
  { symbol: '↓', title: 'Cost Advantage', description: 'Operating costs 60–70% lower vs. regional hubs. Tax holidays and zero customs on hardware imports.', highlight: '60–70% Lower Costs' },
  { symbol: '◈', title: 'Talent Pool', description: '300K+ STEM graduates annually with strong math foundations and growing English proficiency.', highlight: '300K+ STEM/Year' },
  { symbol: '◇', title: 'IT Park Incentives', description: 'Zero corporate income tax for 10 years, 0% payroll tax, and streamlined visa sponsorship for all foreign staff.', highlight: '0% Tax × 10 Years' },
  { symbol: '⊕', title: 'Government Support', description: 'Presidential-level mandate, fast-track licensing, and active co-investment in strategic technology projects.', highlight: 'Presidential Mandate' },
];

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  accent: Accent;
}

export const NEWS: NewsItem[] = [
  {
    id: 'google-startups',
    category: 'Hamkorlik',
    title: 'Google for Startups Uychi IT Hubga keldi',
    excerpt: "Google for Startups dasturi Uychi tumani rezidentlari uchun maxsus mentorlik va texnik yordam dasturini boshladi. Dastur doirasida 20 ta startapga $10,000 gacha kredit ajratiladi.",
    date: '2025-06-03',
    accent: 'cyan',
  },
  {
    id: 'new-graduates',
    category: "Ta'lim",
    title: "Uychi IT Park ta'lim markazidan 150 nafar bitiruvchi",
    excerpt: "IT Park Uychi qoshidagi dasturlash kurslari birinchi to'liq yilida 150 nafar dasturchi va dizaynerni tayyorladi. Bitiruvchilarning 80% mahalliy IT kompaniyalarda ishga joylashgan.",
    date: '2025-05-20',
    accent: 'violet',
  },
  {
    id: 'agrosmart-grant',
    category: 'Yutuq',
    title: "AgroSmart Uychi CentralAsia TechFest'da $50,000 yutdi",
    excerpt: "Uychi tumanining agrotexnologiya startapi AgroSmart Toshkentda bo'lib o'tgan CentralAsia TechFest tanlovida birinchi o'rinni egalladi va $50,000 miqdorida xalqaro grant oldi.",
    date: '2025-04-28',
    accent: 'emerald',
  },
  {
    id: 'new-residents',
    category: 'O\'sish',
    title: "Rezidentlar soni 50 taga yetdi — yangi rekord",
    excerpt: "2025-yil aprel oyida Uychi IT Hubga 12 ta yangi kompaniya qo'shildi. Hozirda jami 50 ta rezident kompaniya faoliyat ko'rsatmoqda va 400+ IT mutaxassis ish bilan ta'minlangan.",
    date: '2025-04-10',
    accent: 'cyan',
  },
  {
    id: 'mdec-partnership',
    category: 'Hamkorlik',
    title: "Malayziya MDEC bilan strategik bitim imzolandi",
    excerpt: "Uychi IT Hub Malayziyaning yetakchi texnologiya agentligi MDEC bilan texnologiya transferi va startaplarni qo'llab-quvvatlash bo'yicha 3 yillik hamkorlik shartnomasini imzoladi.",
    date: '2025-03-20',
    accent: 'violet',
  },
  {
    id: 'fiber-network',
    category: 'Infratuzilma',
    title: "10 Gbps optik tolali internet butun hub bo'ylab yoyildi",
    excerpt: "Uychi IT Hub hududida to'liq 10 Gbps optik tolali internet infratuzilmasi qurildi. Barcha ofislar va coworking zonalari yuqori tezlikli aloqa bilan ta'minlandi.",
    date: '2025-03-05',
    accent: 'emerald',
  },
];

export interface ServiceCompany {
  id: string;
  name: string;
  tagline: string;
  services: string[];
  stack: string[];
  projects: number;
  employees: string;
  accent: Accent;
}

export const IT_COMPANIES: ServiceCompany[] = [
  {
    id: 'algosoft',
    name: 'AlgoSoft',
    tagline: 'Web va mobil dasturlar ishlab chiqish',
    services: ['Web ilovalar', 'Mobil dasturlar (iOS/Android)', 'API integratsiya', 'Texnik qo\'llab-quvvatlash'],
    stack: ['React', 'Next.js', 'Flutter', 'Node.js', 'PostgreSQL'],
    projects: 80,
    employees: '25+',
    accent: 'cyan',
  },
  {
    id: 'databridge',
    name: 'DataBridge UZ',
    tagline: 'Korporativ dasturiy ta\'minot va ERP tizimlari',
    services: ['1C ERP joriy etish', 'CRM tizimlari', 'Ma\'lumotlar migratsiyasi', 'Biznes jarayonlarini avtomatlashtirish'],
    stack: ['1C:Enterprise', 'Python', 'Django', 'PostgreSQL', 'Redis'],
    projects: 45,
    employees: '18+',
    accent: 'violet',
  },
  {
    id: 'pixelstudio',
    name: 'PixelStudio',
    tagline: 'UI/UX dizayn va brending',
    services: ['UI/UX dizayn', 'Brend identifikatsiyasi', 'Prototiplash', 'Foydalanuvchi tadqiqoti'],
    stack: ['Figma', 'Adobe XD', 'Framer', 'After Effects'],
    projects: 120,
    employees: '12+',
    accent: 'emerald',
  },
  {
    id: 'cloudnet',
    name: 'CloudNet Uychi',
    tagline: 'IT infratuzilma va kiberxavfsizlik',
    services: ['Server infratuzilma', 'Tarmoq sozlash', 'Kiberxavfsizlik audit', 'Bulut xizmatlari'],
    stack: ['Linux', 'AWS', 'Docker', 'Kubernetes', 'Nginx'],
    projects: 35,
    employees: '15+',
    accent: 'cyan',
  },
  {
    id: 'digitalmind',
    name: 'DigitalMind',
    tagline: 'Raqamli marketing va SEO',
    services: ['SEO optimizatsiya', 'SMM boshqaruvi', 'Kontekstli reklama', 'Kontent marketing'],
    stack: ['Google Ads', 'Meta Ads', 'SEMrush', 'GA4', 'Ahrefs'],
    projects: 200,
    employees: '20+',
    accent: 'violet',
  },
  {
    id: 'gamelab',
    name: 'GameLab UZ',
    tagline: 'O\'yin ishlab chiqish va interaktiv media',
    services: ['Mobil o\'yinlar', 'Web o\'yinlar', 'VR/AR ilovalar', 'Gamifikatsiya'],
    stack: ['Unity', 'Unreal Engine', 'Godot', 'WebGL', 'Blender'],
    projects: 30,
    employees: '22+',
    accent: 'emerald',
  },
];

export const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Startups', href: '/#startups' },
  { label: 'Investment', href: '/#invest' },
  { label: 'Careers', href: '/careers' },
  { label: 'News', href: '/news' },
];

export const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'UZ', label: "O'zbek" },
  { code: 'RU', label: 'Русский' },
];

export const FLOAT_KEYWORDS = [
  { text: 'Machine Learning', x: '8%', y: '22%', delay: 1.6 },
  { text: 'Computer Vision', x: '76%', y: '14%', delay: 1.9 },
  { text: 'Edge AI', x: '87%', y: '66%', delay: 2.1 },
  { text: 'Blockchain', x: '4%', y: '76%', delay: 2.3 },
  { text: 'MLOps', x: '48%', y: '88%', delay: 2.5 },
  { text: 'Cloud Native', x: '62%', y: '8%', delay: 1.7 },
];

// ─── Events ────────────────────────────────────────────────────────────────

export const EVENT_TYPES = ['Hackathon', 'Meetup', 'Bootcamp', 'Conference', 'Training', 'Workshop'] as const;
export type EventType = typeof EVENT_TYPES[number];

export interface EventItem {
  id: string;
  title: string;
  titleEn: string;
  type: EventType;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  speaker?: string;
  prize?: string;
  seats: number;
  registered: number;
  accent: Accent;
  tags: string[];
}

export const EVENTS: EventItem[] = [
  {
    id: 'hackathon-2025',
    title: 'Uychi IT Hackathon 2025',
    titleEn: 'Uychi IT Hackathon 2025',
    type: 'Hackathon',
    date: '2025-07-12',
    endDate: '2025-07-13',
    location: 'Uychi IT Hub, Asosiy bino',
    description: '48 soatlik hackathon musobaqasida AI, agrotex va fintech yo\'nalishlari bo\'yicha innovatsion yechimlar yarating. G\'oliblar jami 1 000 000 UZS mukofot fondidan ulush oladi.',
    prize: '1 000 000 UZS',
    seats: 200,
    registered: 134,
    accent: 'cyan',
    tags: ['AI', 'AgriTech', 'FinTech', 'Musobaqa'],
  },
  {
    id: 'google-io-watch-2025',
    title: 'Google I/O Watch Party — Uychi',
    titleEn: 'Google I/O Watch Party — Uychi',
    type: 'Meetup',
    date: '2025-05-20',
    location: 'Uychi IT Hub, Konferens-zal',
    description: 'Google I/O 2025 asosiy taqdimotini birga tomosha qilamiz. Yangi texnologiyalar, Gemini AI yangiliklari va developer vositalari muhokamasi. Pizza va networking.',
    speaker: 'Google Developer Groups Uzbekistan',
    seats: 80,
    registered: 80,
    accent: 'emerald',
    tags: ['Google', 'AI', 'Networking', 'Bepul'],
  },
  {
    id: 'python-bootcamp-2025',
    title: 'Python AI Bootcamp — Iyul oqimi',
    titleEn: 'Python AI Bootcamp — July Cohort',
    type: 'Bootcamp',
    date: '2025-07-07',
    endDate: '2025-08-30',
    location: 'Uychi IT Hub, Lab-1 va Lab-2',
    description: '8 haftalik intensiv Python va sun\'iy intellekt bootcamp. NumPy, Pandas, Scikit-learn, TensorFlow asoslaridan tortib real loyihalar yaratishgacha. Har kuni amaliy mashg\'ulotlar.',
    speaker: 'Uychi IT Hub o\'qituvchilar jamoasi',
    seats: 30,
    registered: 22,
    accent: 'violet',
    tags: ['Python', 'AI', 'ML', 'Intensiv'],
  },
  {
    id: 'ai-conference-2025',
    title: 'CentralAsia AI Conference 2025',
    titleEn: 'CentralAsia AI Conference 2025',
    type: 'Conference',
    date: '2025-09-15',
    endDate: '2025-09-16',
    location: 'Namangan, Davlat universiteti',
    description: 'Markaziy Osiyo miqyosidagi birinchi katta AI konferentsiyasi. 30+ ma\'ruzachi, 500+ ishtirokchi, sanoat va akademiya vakillari. Startap pitching, demo stendlar va investorlar bilan uchrashuvlar.',
    speaker: 'Xalqaro AI tadqiqotchilari va sanoat ekspertlari',
    seats: 500,
    registered: 287,
    accent: 'cyan',
    tags: ['AI', 'Konferentsiya', 'Networking', 'Startap'],
  },
  {
    id: 'startup-demo-day-q3',
    title: 'Uychi Hub Demo Day — Q3 2025',
    titleEn: 'Uychi Hub Demo Day — Q3 2025',
    type: 'Meetup',
    date: '2025-08-22',
    location: 'Uychi IT Hub, Asosiy auditoriya',
    description: 'Hubning joriy rezident startaplari o\'z mahsulotlari va natijalari bilan chiqish qiladi. Mahalliy va xalqaro investorlar, press va potensial hamkorlar taklif etilgan.',
    seats: 150,
    registered: 98,
    accent: 'emerald',
    tags: ['Startap', 'Demo Day', 'Investitsiya', 'Pitching'],
  },
  {
    id: 'cybersecurity-workshop-2025',
    title: 'Kiberxavfsizlik Amaliy Ustaxonasi',
    titleEn: 'Practical Cybersecurity Workshop',
    type: 'Workshop',
    date: '2025-06-28',
    location: 'Uychi IT Hub, Lab-3',
    description: 'Etik xakerlik, penetratsion test va tarmoq xavfsizligi bo\'yicha bir kunlik amaliy ustaxona. CTF topshiriqlari, real stsenariylar va sertifikat.',
    speaker: 'CloudNet Uychi — Kiberxavfsizlik bo\'limi',
    seats: 40,
    registered: 31,
    accent: 'violet',
    tags: ['Kiberxavfsizlik', 'CTF', 'Ethical Hacking', 'Sertifikat'],
  },
  {
    id: 'flutter-training-2025',
    title: 'Flutter Mobil Dasturlash Treningi',
    titleEn: 'Flutter Mobile Development Training',
    type: 'Training',
    date: '2025-07-19',
    endDate: '2025-07-20',
    location: 'Uychi IT Hub, Kichik konferens-zal',
    description: "Ikki kunlik Flutter treningi — UI komponentlar, state management (Riverpod/Bloc), API integratsiyasi va Play Store/App Store'ga chiqarish. Sertifikat beriladi.",
    speaker: 'AlgoSoft — Flutter jamoasi',
    seats: 25,
    registered: 19,
    accent: 'cyan',
    tags: ['Flutter', 'Dart', 'Mobil', 'Android', 'iOS'],
  },
  {
    id: 'ux-design-workshop-2025',
    title: 'Figma UX/UI Dizayn Ustaxonasi',
    titleEn: 'Figma UX/UI Design Workshop',
    type: 'Workshop',
    date: '2025-06-14',
    location: 'Uychi IT Hub, Kreativ zona',
    description: 'Figma-da professional interfeys dizayni: komponentlar, auto-layout, prototiplash va foydalanuvchi tadqiqoti usullari. Amaliy loyiha yaratiladi va portfolio uchun ishlatiladi.',
    speaker: 'PixelStudio — Senior UX Designer',
    seats: 20,
    registered: 20,
    accent: 'emerald',
    tags: ['Figma', 'UI/UX', 'Dizayn', 'Prototip'],
  },
];

// ─── Education Courses ──────────────────────────────────────────────────────

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseLang = 'uz' | 'ru' | 'en';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'design' | 'security' | 'data' | 'devops';
  level: CourseLevel;
  duration: string;
  lessons: number;
  price: number;
  isFree: boolean;
  lang: CourseLang;
  enrolled: number;
  rating: number;
  accent: Accent;
  tags: string[];
}

export const COURSES: Course[] = [
  {
    id: 'react-frontend-uz',
    title: 'React bilan Frontend Dasturlash',
    instructor: 'Jasur Mirzayev',
    category: 'frontend',
    level: 'beginner',
    duration: '3 oy',
    lessons: 72,
    price: 0,
    isFree: true,
    lang: 'uz',
    enrolled: 1200,
    rating: 4.8,
    accent: 'cyan',
    tags: ['React', 'JavaScript', 'HTML', 'CSS', 'Bepul'],
  },
  {
    id: 'python-ai-uz',
    title: 'Python va Sun\'iy Intellekt',
    instructor: 'Dilnoza Yusupova',
    category: 'ai',
    level: 'intermediate',
    duration: '4 oy',
    lessons: 96,
    price: 1200000,
    isFree: false,
    lang: 'uz',
    enrolled: 840,
    rating: 4.9,
    accent: 'violet',
    tags: ['Python', 'AI', 'ML', 'TensorFlow', 'Scikit-learn'],
  },
  {
    id: 'flutter-mobile-uz',
    title: 'Flutter bilan Mobil Dasturlash',
    instructor: 'Sherzod Tursunov',
    category: 'mobile',
    level: 'beginner',
    duration: '3 oy',
    lessons: 68,
    price: 900000,
    isFree: false,
    lang: 'uz',
    enrolled: 620,
    rating: 4.7,
    accent: 'emerald',
    tags: ['Flutter', 'Dart', 'iOS', 'Android', 'Firebase'],
  },
  {
    id: 'nodejs-backend-uz',
    title: 'Node.js Backend Dasturlash',
    instructor: 'Otabek Rahimov',
    category: 'backend',
    level: 'intermediate',
    duration: '3 oy',
    lessons: 80,
    price: 1100000,
    isFree: false,
    lang: 'uz',
    enrolled: 510,
    rating: 4.6,
    accent: 'cyan',
    tags: ['Node.js', 'Express', 'REST API', 'JWT', 'MongoDB'],
  },
  {
    id: 'uiux-figma-uz',
    title: 'UI/UX Dizayn — Figma Pro',
    instructor: 'Malika Sharipova',
    category: 'design',
    level: 'beginner',
    duration: '2 oy',
    lessons: 48,
    price: 750000,
    isFree: false,
    lang: 'uz',
    enrolled: 730,
    rating: 4.8,
    accent: 'violet',
    tags: ['Figma', 'UX', 'Prototip', 'Dizayn tizimlari'],
  },
  {
    id: 'data-science-uz',
    title: 'Ma\'lumotlar Fani va Tahlil',
    instructor: 'Bobur Xasanov',
    category: 'data',
    level: 'intermediate',
    duration: '4 oy',
    lessons: 88,
    price: 1300000,
    isFree: false,
    lang: 'uz',
    enrolled: 390,
    rating: 4.7,
    accent: 'emerald',
    tags: ['Python', 'Pandas', 'Tableau', 'SQL', 'Statistika'],
  },
  {
    id: 'cybersecurity-uz',
    title: 'Kiberxavfsizlik Asoslari',
    instructor: 'Sanjar Nazarov',
    category: 'security',
    level: 'beginner',
    duration: '2 oy',
    lessons: 52,
    price: 850000,
    isFree: false,
    lang: 'uz',
    enrolled: 290,
    rating: 4.6,
    accent: 'cyan',
    tags: ['Xavfsizlik', 'Linux', 'Tarmoq', 'Kriptografiya'],
  },
  {
    id: 'nextjs-advanced-en',
    title: 'Next.js — Advanced Full-Stack',
    instructor: 'Alisher Qodirov',
    category: 'frontend',
    level: 'advanced',
    duration: '3 oy',
    lessons: 76,
    price: 1500000,
    isFree: false,
    lang: 'en',
    enrolled: 180,
    rating: 4.9,
    accent: 'violet',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'tRPC', 'Vercel'],
  },
  {
    id: 'postgresql-backend-uz',
    title: 'PostgreSQL va Ma\'lumotlar Bazasi',
    instructor: 'Nodir Ergashev',
    category: 'backend',
    level: 'intermediate',
    duration: '2 oy',
    lessons: 44,
    price: 700000,
    isFree: false,
    lang: 'uz',
    enrolled: 420,
    rating: 4.5,
    accent: 'emerald',
    tags: ['PostgreSQL', 'SQL', 'Indexing', 'Optimizatsiya'],
  },
  {
    id: 'devops-docker-uz',
    title: 'DevOps: Docker va CI/CD',
    instructor: 'Firdavs Umarov',
    category: 'devops',
    level: 'intermediate',
    duration: '2 oy',
    lessons: 56,
    price: 1000000,
    isFree: false,
    lang: 'uz',
    enrolled: 310,
    rating: 4.7,
    accent: 'cyan',
    tags: ['Docker', 'CI/CD', 'GitHub Actions', 'Linux', 'Nginx'],
  },
];

// ─── Job Listings ───────────────────────────────────────────────────────────

export type JobType = 'full-time' | 'part-time' | 'internship' | 'remote' | 'freelance';

export interface Job {
  id: string;
  title: string;
  company: string;
  type: JobType;
  salary: string;
  experience: string;
  skills: string[];
  deadline: string;
  accent: Accent;
}

export const JOBS: Job[] = [
  {
    id: 'react-dev-algosoft',
    title: 'React Developer',
    company: 'AlgoSoft',
    type: 'full-time',
    salary: '4-7M UZS',
    experience: '1-3 yil',
    skills: ['React', 'TypeScript', 'REST API', 'Git', 'Tailwind CSS'],
    deadline: '2025-07-15',
    accent: 'cyan',
  },
  {
    id: 'flutter-dev-algosoft',
    title: 'Flutter Developer',
    company: 'AlgoSoft',
    type: 'full-time',
    salary: '3-6M UZS',
    experience: '1-2 yil',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST API', 'BLoC'],
    deadline: '2025-07-20',
    accent: 'emerald',
  },
  {
    id: '1c-programmer-databridge',
    title: '1C Dasturchi',
    company: 'DataBridge UZ',
    type: 'full-time',
    salary: '3-5M UZS',
    experience: '2+ yil',
    skills: ['1C:Enterprise', '1C:ERP', 'BSP', 'SQL', 'Konfiguratsiya'],
    deadline: '2025-07-10',
    accent: 'violet',
  },
  {
    id: 'uiux-designer-pixelstudio',
    title: 'UI/UX Dizayner',
    company: 'PixelStudio',
    type: 'full-time',
    salary: '3-5M UZS',
    experience: '1-3 yil',
    skills: ['Figma', 'Adobe XD', 'Prototiplash', 'Foydalanuvchi tadqiqoti'],
    deadline: '2025-06-30',
    accent: 'emerald',
  },
  {
    id: 'python-dev-remote',
    title: 'Python Developer',
    company: 'DataBridge UZ',
    type: 'remote',
    salary: '5-9M UZS',
    experience: '2-4 yil',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Docker'],
    deadline: '2025-07-25',
    accent: 'cyan',
  },
  {
    id: 'smm-manager-digitalmind',
    title: 'SMM Manager',
    company: 'DigitalMind',
    type: 'full-time',
    salary: '2-4M UZS',
    experience: '1+ yil',
    skills: ['Instagram', 'Telegram', 'Kontent yaratish', 'Copywriting', 'Reklama'],
    deadline: '2025-06-25',
    accent: 'violet',
  },
  {
    id: 'backend-nodejs-algosoft',
    title: 'Backend Node.js Developer',
    company: 'AlgoSoft',
    type: 'full-time',
    salary: '4-7M UZS',
    experience: '2-3 yil',
    skills: ['Node.js', 'Express', 'NestJS', 'MongoDB', 'Redis', 'JWT'],
    deadline: '2025-08-01',
    accent: 'emerald',
  },
  {
    id: 'cybersecurity-intern-cloudnet',
    title: 'Kiberxavfsizlik Stajyori',
    company: 'CloudNet Uychi',
    type: 'internship',
    salary: '1-2M UZS',
    experience: 'Tajribasiz / Talaba',
    skills: ['Linux', 'Tarmoq asoslari', 'Python', 'Kriptografiya'],
    deadline: '2025-07-05',
    accent: 'cyan',
  },
];

// ─── Extended Partners ──────────────────────────────────────────────────────

export type PartnerCategory = 'government' | 'university' | 'international' | 'tech' | 'investor';

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: PartnerCategory;
  country: string;
  description: string;
  website: string;
}

export const PARTNERS_LIST: Partner[] = [
  {
    id: 'it-park-uz',
    name: 'IT Park Uzbekistan',
    logo: '',
    category: 'government',
    country: 'Uzbekistan',
    description: 'O\'zbekistonda IT sohasini rivojlantiruvchi davlat muassasasi, soliq imtiyozlari va inkubatsiya xizmatlari bilan.',
    website: 'https://itpark.uz',
  },
  {
    id: 'namdu',
    name: 'Namangan Davlat Universiteti',
    logo: '',
    category: 'university',
    country: 'Uzbekistan',
    description: 'Namangan viloyatining yetakchi oliy ta\'lim muassasasi, IT va muhandislik yo\'nalishlari bo\'yicha mutaxassislar tayyorlaydi.',
    website: 'https://namspi.uz',
  },
  {
    id: 'mdec',
    name: 'MDEC Malaysia',
    logo: '',
    category: 'international',
    country: 'Malaysia',
    description: 'Malayziyaning raqamli iqtisodiyotni rivojlantirish agentligi — texnologiya transferi va startap ekotizimini qo\'llab-quvvatlaydi.',
    website: 'https://mdec.my',
  },
  {
    id: 'google-startups',
    name: 'Google for Startups',
    logo: '',
    category: 'tech',
    country: 'USA',
    description: 'Google\'ning startaplarga yo\'naltirilgan dasturi — bulut kreditlari, mentorlik va texnik yordam taqdim etadi.',
    website: 'https://startup.google.com',
  },
  {
    id: 'aws-startups',
    name: 'AWS Startups',
    logo: '',
    category: 'tech',
    country: 'USA',
    description: 'Amazon Web Services\'ning startap dasturi — bulut infratuzilma va AWS kreditlari bilan texnologik o\'sishni tezlashtiradi.',
    website: 'https://aws.amazon.com/startups',
  },
  {
    id: 'skolkovo',
    name: 'Skolkovo',
    logo: '',
    category: 'international',
    country: 'Russia',
    description: 'Rossiyaning yetakchi innovatsion markazi — texnologiya startaplari uchun hamkorlik va akseleratsiya dasturlari.',
    website: 'https://sk.ru',
  },
  {
    id: 'undp-uz',
    name: 'UNDP Uzbekistan',
    logo: '',
    category: 'international',
    country: 'Uzbekistan',
    description: 'BMT Taraqqiyot Dasturining O\'zbekistondagi vakolatxonasi — barqaror rivojlanish va raqamli transformatsiya loyihalari.',
    website: 'https://www.undp.org/uzbekistan',
  },
  {
    id: 'tatu',
    name: 'Toshkent Axborot Texnologiyalari Universiteti',
    logo: '',
    category: 'university',
    country: 'Uzbekistan',
    description: 'O\'zbekistondagi IT ta\'limining flagmani, dasturlash va kiberxavfsizlik bo\'yicha zamonaviy dasturlar taklif etadi.',
    website: 'https://tuit.uz',
  },
  {
    id: 'adb-ventures',
    name: 'ADB Ventures',
    logo: '',
    category: 'investor',
    country: 'Philippines',
    description: 'Osiyo Taraqqiyot Banki innovatsion qo\'li — Osiyo-Tinch okeani mintaqasida texnologiya startaplariga sarmoya kiritadi.',
    website: 'https://ventures.adb.org',
  },
  {
    id: 'techstars',
    name: 'Techstars',
    logo: '',
    category: 'investor',
    country: 'USA',
    description: 'Dunyoning yetakchi startap akseleratori — mentorlik, investitsiya va global startap tarmog\'iga kirish imkoniyati.',
    website: 'https://techstars.com',
  },
  {
    id: 'koica',
    name: 'KOICA',
    logo: '',
    category: 'international',
    country: 'South Korea',
    description: 'Koreya Xalqaro Hamkorlik Agentligi — ta\'lim va texnologiya sohasidagi rivojlanish loyihalarini moliyalashtiradi.',
    website: 'https://www.koica.go.kr',
  },
  {
    id: 'microsoft-startups',
    name: 'Microsoft for Startups',
    logo: '',
    category: 'tech',
    country: 'USA',
    description: 'Microsoft\'ning startap dasturi — Azure kreditlari, GitHub, LinkedIn va boshqa Microsoft mahsulotlari startaplarga bepul taqdim etiladi.',
    website: 'https://www.microsoft.com/en-us/startups',
  },
  {
    id: 'namangan-hokimlik',
    name: 'Namangan Viloyat Hokimligi',
    logo: '',
    category: 'government',
    country: 'Uzbekistan',
    description: 'Namangan viloyat ma\'muriyati — Uychi IT Hubni viloyatni raqamlashtirishning muhim tarkibiy qismi sifatida qo\'llab-quvvatlaydi.',
    website: 'https://namangan.uz',
  },
  {
    id: 'alibaba-cloud',
    name: 'Alibaba Cloud',
    logo: '',
    category: 'tech',
    country: 'China',
    description: 'Alibaba Group\'ning bulut hisoblash bo\'limi — Markaziy Osiyo startaplariga kengaytirilgan bulut va AI xizmatlarini taqdim etadi.',
    website: 'https://www.alibabacloud.com',
  },
  {
    id: 'ifc',
    name: 'IFC',
    logo: '',
    category: 'investor',
    country: 'USA',
    description: 'Xalqaro Moliya Korporatsiyasi (Jahon banki guruhi) — rivojlanayotgan bozorlardagi xususiy sektorda sarmoya va texnik yordam.',
    website: 'https://www.ifc.org',
  },
  {
    id: 'gsma',
    name: 'GSMA',
    logo: '',
    category: 'international',
    country: 'UK',
    description: 'Global mobil aloqa sanoatini ifodalovchi assotsiatsiya — mobil innovatsiyalar va raqamli inklyuziya bo\'yicha dasturlar.',
    website: 'https://www.gsma.com',
  },
];
