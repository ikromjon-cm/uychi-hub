// All admin mock data - replaces backend API calls during frontend phase

export type UserRole = 'super_admin' | 'moderator' | 'startup_owner' | 'investor' | 'viewer';
export type Status = 'active' | 'inactive' | 'pending' | 'banned';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: Status;
  avatar: string;
  joined: string;
  lastLogin: string;
  startupName?: string;
}

export const ADMIN_USERS: AdminUser[] = [
  { id: 1, name: 'Nodira Yusupova', email: 'nodira@uychi.uz', role: 'super_admin', status: 'active', avatar: 'N', joined: '2023-01-15', lastLogin: '2026-06-11' },
  { id: 2, name: 'Sardor Mirzayev', email: 'sardor@uychi.uz', role: 'moderator', status: 'active', avatar: 'S', joined: '2023-03-20', lastLogin: '2026-06-10' },
  { id: 3, name: 'Alisher Toshmatov', email: 'alisher@agrosmartai.uz', role: 'startup_owner', status: 'active', avatar: 'A', joined: '2023-05-01', lastLogin: '2026-06-09', startupName: 'AgroSmart AI' },
  { id: 4, name: 'Dilorom Karimova', email: 'dilorom@educore.uz', role: 'startup_owner', status: 'active', avatar: 'D', joined: '2023-06-15', lastLogin: '2026-06-08', startupName: 'EduCore UZ' },
  { id: 5, name: 'Jasur Nazarov', email: 'jasur@namlogist.uz', role: 'startup_owner', status: 'pending', avatar: 'J', joined: '2024-01-10', lastLogin: '2026-06-07', startupName: 'NamLogist' },
  { id: 6, name: 'Robert Kim', email: 'r.kim@adb.org', role: 'investor', status: 'active', avatar: 'R', joined: '2024-02-20', lastLogin: '2026-06-06' },
  { id: 7, name: 'Sarah Johnson', email: 's.johnson@google.com', role: 'investor', status: 'active', avatar: 'S', joined: '2024-03-05', lastLogin: '2026-06-05' },
  { id: 8, name: 'Murod Xoliqov', email: 'murod@student.uz', role: 'viewer', status: 'active', avatar: 'M', joined: '2024-04-01', lastLogin: '2026-06-04' },
  { id: 9, name: 'Zulfiya Rahimova', email: 'zulfiya@uychi.uz', role: 'moderator', status: 'active', avatar: 'Z', joined: '2023-08-12', lastLogin: '2026-06-03' },
  { id: 10, name: 'Botir Askarov', email: 'botir@textileai.uz', role: 'startup_owner', status: 'inactive', avatar: 'B', joined: '2024-05-10', lastLogin: '2026-05-20', startupName: 'TextileAI' },
];

export type StartupStatus = 'approved' | 'pending' | 'review' | 'rejected';
export interface StartupApp {
  id: number;
  startup_name: string;
  founder_name: string;
  email: string;
  sector: string;
  stage: string;
  funding_needed: string;
  team_size: number;
  status: StartupStatus;
  created_at: string;
  description: string;
  website?: string;
}

export const STARTUP_APPS: StartupApp[] = [
  { id: 1, startup_name: 'AgroSmart Uychi', founder_name: 'Alisher Toshmatov', email: 'alisher@agrosmartai.uz', sector: 'AgriTech AI', stage: 'Seed', funding_needed: '$50,000', team_size: 6, status: 'approved', created_at: '2024-01-15', description: "AI yordamida qishloq xo'jaligini optimallashtirish platformasi." },
  { id: 2, startup_name: 'EduCore UZ', founder_name: 'Dilorom Karimova', email: 'dilorom@educore.uz', sector: 'EdTech AI', stage: 'MVP', funding_needed: '$30,000', team_size: 4, status: 'approved', created_at: '2024-02-01', description: "O'zbek o'quvchilari uchun adaptiv ta'lim platformasi." },
  { id: 3, startup_name: 'NamLogist', founder_name: 'Jasur Nazarov', email: 'jasur@namlogist.uz', sector: 'Logistics AI', stage: 'Pre-Seed', funding_needed: '$20,000', team_size: 3, status: 'review', created_at: '2024-03-10', description: 'Namangan viloyati logistika marshrutlarini AI bilan optimallashtirish.' },
  { id: 4, startup_name: 'MediNet Uychi', founder_name: 'Sarvar Tillayev', email: 'sarvar@medinet.uz', sector: 'MedTech AI', stage: 'Idea', funding_needed: '$15,000', team_size: 2, status: 'pending', created_at: '2024-04-05', description: 'Masofaviy tibbiy konsultatsiya va diagnostika platformasi.' },
  { id: 5, startup_name: 'TextileAI', founder_name: 'Botir Askarov', email: 'botir@textileai.uz', sector: 'Industry AI', stage: 'MVP', funding_needed: '$80,000', team_size: 8, status: 'approved', created_at: '2024-01-25', description: "To'qimachilik fabrikalarida sifat nazorati uchun kompyuter ko'rishi tizimi." },
  { id: 6, startup_name: 'GovTrack UZ', founder_name: 'Nilufar Ergasheva', email: 'nilufar@govtrack.uz', sector: 'GovTech', stage: 'Pre-Seed', funding_needed: '$25,000', team_size: 3, status: 'pending', created_at: '2024-05-12', description: 'Davlat xizmatlari va murojaatlarni kuzatish tizimi.' },
  { id: 7, startup_name: 'FinBot UZ', founder_name: 'Ulugbek Razzaqov', email: 'ulug@finbot.uz', sector: 'FinTech AI', stage: 'Idea', funding_needed: '$10,000', team_size: 2, status: 'rejected', created_at: '2024-06-01', description: 'Shaxsiy moliyaviy rejalashtirish chatboti.' },
  { id: 8, startup_name: 'SmartFarm Pro', founder_name: 'Husan Mirzayev', email: 'husan@smartfarm.uz', sector: 'AgriTech AI', stage: 'Seed', funding_needed: '$45,000', team_size: 5, status: 'review', created_at: '2024-06-10', description: 'IoT va AI asosida aqlli ferma boshqaruv tizimi.' },
];

export type ArticleStatus = 'published' | 'draft' | 'review' | 'archived';
export interface NewsArticle {
  id: number;
  title: string;
  category: string;
  author: string;
  status: ArticleStatus;
  published_at: string;
  views: number;
  excerpt: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  { id: 1, title: 'Google for Startups Uychi IT Hubga keldi', category: 'Hamkorlik', author: 'Sardor Mirzayev', status: 'published', published_at: '2025-06-03', views: 3240, excerpt: "Google for Startups dasturi O'zbekistondagi birinchi hamkorlikni Uychi IT Hub bilan boshladi." },
  { id: 2, title: "AgroSmart AI global musobaqada g'olib", category: 'Yutuq', author: 'Nodira Yusupova', status: 'published', published_at: '2025-05-28', views: 5100, excerpt: "Uychi startapi Dubai Tech Innovation Summit da birinchi o'ringa ega bo'ldi." },
  { id: 3, title: 'IT Park Uzbekistan bilan yangi shartnoma', category: 'Hamkorlik', author: 'Sardor Mirzayev', status: 'published', published_at: '2025-05-15', views: 2100, excerpt: "IT Park Uzbekistan va Uychi IT Hub o'rtasida strategik hamkorlik shartnomasi imzolandi." },
  { id: 4, title: "Yangi ta'lim markazi ochildi", category: "Ta'lim", author: 'Zulfiya Rahimova', status: 'published', published_at: '2025-05-10', views: 1800, excerpt: "Uychi IT Hub hududida 200 ta o'quvchi sigdira oladigan zamonaviy ta'lim markazi ochildi." },
  { id: 5, title: "Hackathon 2025 e'lon qilindi", category: 'Tadbir', author: 'Nodira Yusupova', status: 'draft', published_at: '2025-07-01', views: 0, excerpt: "3 kunlik hackathon uchun 50 ta jamoa o'rin olishi mumkin." },
  { id: 6, title: 'NamLogist Series A raund yakunladi', category: 'Moliya', author: 'Sardor Mirzayev', status: 'review', published_at: '2025-06-20', views: 0, excerpt: "NamLogist $500K jalb qildi va kengayish rejalarini e'lon qildi." },
  { id: 7, title: 'Uychi IT Hub 2025 yillik hisoboti', category: 'Hisobot', author: 'Nodira Yusupova', status: 'draft', published_at: '2025-12-31', views: 0, excerpt: '2025 yil natijalari va 2026 rejalari.' },
  { id: 8, title: 'UNDP bilan yangi loyiha', category: 'Hamkorlik', author: 'Zulfiya Rahimova', status: 'published', published_at: '2025-04-20', views: 1600, excerpt: "UNDP va Uychi IT Hub qishloq raqamlashtirish bo'yicha birgalikda ishlaydi." },
];

export type InvestorStatus = 'active' | 'pending' | 'inactive';
export interface Investor {
  id: number;
  name: string;
  organization: string;
  email: string;
  type: string;
  focus: string;
  ticket_size: string;
  status: InvestorStatus;
  joined: string;
  portfolio: number;
}

export const INVESTORS: Investor[] = [
  { id: 1, name: 'Robert Kim', organization: 'ADB Ventures', email: 'r.kim@adb.org', type: 'Institutional', focus: 'AgriTech, EdTech', ticket_size: '$100K–$500K', status: 'active', joined: '2024-01-10', portfolio: 3 },
  { id: 2, name: 'Sarah Johnson', organization: 'Google for Startups', email: 's.johnson@google.com', type: 'Corporate', focus: 'AI, SaaS', ticket_size: 'Grants up to $350K', status: 'active', joined: '2024-03-05', portfolio: 2 },
  { id: 3, name: 'Mansur Akhmedov', organization: 'Silk Road VC', email: 'm.akhmedov@silkroadvc.com', type: 'VC Fund', focus: 'Fintech, LogiTech', ticket_size: '$50K–$200K', status: 'active', joined: '2024-02-18', portfolio: 4 },
  { id: 4, name: 'Elena Petrova', organization: 'Skolkovo Ventures', email: 'e.petrova@sk.ru', type: 'Corporate VC', focus: 'Deep Tech, AI', ticket_size: '$200K–$1M', status: 'pending', joined: '2024-05-20', portfolio: 0 },
  { id: 5, name: 'Lee Min-jun', organization: 'KOTRA', email: 'lee@kotra.or.kr', type: 'Government', focus: 'Manufacturing AI, Industry', ticket_size: '$30K–$150K', status: 'active', joined: '2024-04-10', portfolio: 1 },
];

export type LogLevel = 'info' | 'success' | 'warning' | 'error';
export interface SystemLog {
  id: number;
  level: LogLevel;
  action: string;
  user: string;
  module: string;
  timestamp: string;
  ip?: string;
}

export const SYSTEM_LOGS: SystemLog[] = [
  { id: 1, level: 'success', action: 'Startup application approved: AgroSmart AI', user: 'nodira@uychi.uz', module: 'Startups', timestamp: '2026-06-11 14:32', ip: '192.168.1.1' },
  { id: 2, level: 'info', action: 'New user registered: husan@smartfarm.uz', user: 'system', module: 'Auth', timestamp: '2026-06-11 13:15', ip: '10.0.0.5' },
  { id: 3, level: 'success', action: 'News article published: Google for Startups', user: 'sardor@uychi.uz', module: 'News', timestamp: '2026-06-11 12:00', ip: '192.168.1.2' },
  { id: 4, level: 'warning', action: 'Failed login attempt: 3 times', user: 'unknown', module: 'Auth', timestamp: '2026-06-11 11:44', ip: '203.0.113.42' },
  { id: 5, level: 'info', action: 'Investor profile updated: Robert Kim', user: 'r.kim@adb.org', module: 'Investors', timestamp: '2026-06-11 10:30', ip: '192.168.1.3' },
  { id: 6, level: 'success', action: 'Job posting published: Backend Developer', user: 'alisher@agrosmartai.uz', module: 'Careers', timestamp: '2026-06-11 09:20', ip: '192.168.1.4' },
  { id: 7, level: 'error', action: 'Media upload failed: file too large (>10MB)', user: 'dilorom@educore.uz', module: 'Media', timestamp: '2026-06-10 18:45', ip: '192.168.1.5' },
  { id: 8, level: 'info', action: 'System backup completed successfully', user: 'system', module: 'Backup', timestamp: '2026-06-10 03:00', ip: 'localhost' },
  { id: 9, level: 'success', action: 'Partner added: UNDP Uzbekistan', user: 'nodira@uychi.uz', module: 'Partners', timestamp: '2026-06-09 15:20', ip: '192.168.1.1' },
  { id: 10, level: 'warning', action: 'Database query slow: >3s response', user: 'system', module: 'DB', timestamp: '2026-06-09 14:10', ip: 'localhost' },
  { id: 11, level: 'info', action: 'SEO sitemap regenerated', user: 'system', module: 'SEO', timestamp: '2026-06-09 00:00', ip: 'localhost' },
  { id: 12, level: 'success', action: 'Event registered: Hackathon 2024', user: 'jasur@namlogist.uz', module: 'Events', timestamp: '2026-06-08 16:30', ip: '192.168.1.6' },
];

export interface MediaFile {
  id: number;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  category: string;
  ext: string;
}

export const MEDIA_FILES: MediaFile[] = [
  { id: 1, name: 'hackathon-2024-opening.jpg', type: 'image', size: '2.4 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2024-11-15', category: 'Events', ext: 'jpg' },
  { id: 2, name: 'agroSmart-demo-day.jpg', type: 'image', size: '1.8 MB', url: '#', uploadedBy: 'sardor@uychi.uz', uploadedAt: '2024-10-22', category: 'Startups', ext: 'jpg' },
  { id: 3, name: 'uychi-hub-intro.mp4', type: 'video', size: '45.2 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2024-10-01', category: 'Promo', ext: 'mp4' },
  { id: 4, name: 'annual-report-2024.pdf', type: 'document', size: '3.1 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2025-01-10', category: 'Reports', ext: 'pdf' },
  { id: 5, name: 'drone-uychi-panorama.mp4', type: 'video', size: '120.5 MB', url: '#', uploadedBy: 'sardor@uychi.uz', uploadedAt: '2024-06-30', category: 'Drone', ext: 'mp4' },
  { id: 6, name: 'logo-full-color.png', type: 'image', size: '0.4 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2023-01-15', category: 'Brand', ext: 'png' },
  { id: 7, name: 'bootcamp-day3.jpg', type: 'image', size: '3.2 MB', url: '#', uploadedBy: 'zulfiya@uychi.uz', uploadedAt: '2024-05-20', category: 'Events', ext: 'jpg' },
  { id: 8, name: 'investor-deck-2025.pdf', type: 'document', size: '5.7 MB', url: '#', uploadedBy: 'nodira@uychi.uz', uploadedAt: '2025-03-01', category: 'Documents', ext: 'pdf' },
  { id: 9, name: 'educore-platform-demo.mp4', type: 'video', size: '28.3 MB', url: '#', uploadedBy: 'dilorom@educore.uz', uploadedAt: '2024-07-22', category: 'Startups', ext: 'mp4' },
  { id: 10, name: 'team-photo-2024.jpg', type: 'image', size: '4.1 MB', url: '#', uploadedBy: 'sardor@uychi.uz', uploadedAt: '2024-03-22', category: 'Team', ext: 'jpg' },
];

export const ANALYTICS_MONTHLY = [
  { month: 'Yan', visitors: 1200, pageviews: 4800, signups: 45 },
  { month: 'Fev', visitors: 1800, pageviews: 7200, signups: 62 },
  { month: 'Mar', visitors: 2400, pageviews: 9600, signups: 88 },
  { month: 'Apr', visitors: 3100, pageviews: 12400, signups: 105 },
  { month: 'May', visitors: 4200, pageviews: 16800, signups: 143 },
  { month: 'Iyn', visitors: 5800, pageviews: 23200, signups: 198 },
  { month: 'Iyl', visitors: 7200, pageviews: 28800, signups: 234 },
  { month: 'Avg', visitors: 8900, pageviews: 35600, signups: 287 },
  { month: 'Sen', visitors: 10200, pageviews: 40800, signups: 312 },
  { month: 'Okt', visitors: 12500, pageviews: 50000, signups: 398 },
  { month: 'Noy', visitors: 15000, pageviews: 60000, signups: 445 },
  { month: 'Dek', visitors: 18400, pageviews: 73600, signups: 512 },
];

export const TOP_PAGES = [
  { page: '/', title: 'Bosh sahifa', views: 28400, bounce: '34%' },
  { page: '/startups', title: 'Startaplar', views: 12800, bounce: '28%' },
  { page: '/news', title: 'Yangiliklar', views: 10200, bounce: '42%' },
  { page: '/ai-center', title: 'AI Markaz', views: 8600, bounce: '31%' },
  { page: '/events', title: 'Tadbirlar', views: 7400, bounce: '38%' },
  { page: '/education', title: "Ta'lim", views: 6800, bounce: '35%' },
  { page: '/jobs', title: 'Ish & Stajyorlik', views: 5600, bounce: '29%' },
  { page: '/investors', title: 'Investorlar', views: 4200, bounce: '25%' },
];
