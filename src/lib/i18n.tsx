"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "UZ" | "RU" | "EN";

const translations = {
  UZ: {
    nav: {
      startups: "Startaplar",
      education: "Ta'lim",
      news: "Yangiliklar",
      partners: "Hamkorlar",
      jobs: "Ish",
      events: "Tadbirlar",
      login: "Kirish",
      contact: "Bog'lanish",
    },
    hero: {
      badge: "Uychi tumani · Namangan viloyati · 2026",
      title: "Uychi Tumanida IT va Sun'iy Intellekt Markazini Quramiz",
      desc: "Namangan-Uchqo'rg'on magistral yo'lidagi 237,600 aholili tuman. 47 maktab, 900+ kichik korxona, 5 sanoat zonasi va ipak-to'qimachilik an'analari — Uychini IT markaziga aylantirmoqdamiz.",
      apply: "Startap Ariza Topshiring",
      reach: "Bog'lanish",
    },
    stats: {
      badge: "/ Jonli Statistika",
      title: "Uychi Tumani Raqamlarda",
      desc: "Uychi tumanining asosiy ko'rsatkichlari — IT hub rivojlanishi ortidagi real raqamlar.",
    },
    infra: {
      badge: "/ Infratuzilma",
      title: "Uychi Tumani Imkoniyatlari",
      desc: "5 sanoat zonasi, 900+ kichik korxona, 47 maktab va 13 shifoxona — texnologik rivojlanish uchun mustahkam zamin.",
      items: [
        { title: "5 Sanoat Zonasi", desc: "Yorkatay, Ovchibuloq, Kumtepa, Yuksalish va Yangiyer — ipak, paxta tolasi va temir-beton ishlab chiqarish." },
        { title: "47 Maktab", desc: "42,400 o'quvchi, 34 jamoat kutubxonasi (545,500 kitob) va 1 kasb-hunar kolleji." },
        { title: "13 Shifoxona", desc: "801 o'rin, 335 vrach va 36 poliklinika — har 10,000 aholiga 14,1 vrach." },
        { title: "Transport", desc: "256 km yo'l, Toshkent-Andijon temir yo'li va Namangan-Uchqo'rg'on magistrali." },
      ],
    },
    startups: {
      badge: "/ Startaplar",
      title: "Uychida Tug'ilgan Startaplar",
      desc: "Paxtachilik, ipakchilik va qishloq xo'jaligi an'analariga asoslangan texnologik startaplar.",
      problem: "Muammo",
      solution: "Yechim",
      items: [
        {
          name: "AgroSmart Uychi", sector: "AgriTech AI",
          problem: "8,100 ga paxta va 5,500 ga g'allada hosildorlikni real vaqtda kuzatish yo'qligi.",
          solution: "IoT sensorlar tarmog'i va AI bashorat qilish — sug'orishni 40% tejash.",
          users: "1,200+ fermer · 14,900 ga yer",
        },
        {
          name: "SilkTech UZ", sector: "To'qimachilik AI",
          problem: "Uychi ipak fabrikalarida sifat nazorati qo'lda va sekin.",
          solution: "Kompyuter ko'rish asosida ipak sifati, rang va nuqsonlarni avtomatik aniqlash.",
          users: "3 fabrika · 800 kg/kun",
        },
        {
          name: "PaxtaSoft", sector: "AgriTech",
          problem: "Paxta tozalash zavodlarida chiqindi va energiya sarfi yuqori.",
          solution: "AI optimizatsiyasi bilan chiqindini 25% ga kamaytiruvchi boshqaruv tizimi.",
          users: "5 zavod · 12,000 tonna/yil",
        },
      ],
    },
    how: {
      badge: "/ Jarayon",
      title: "Uychi IT Hubga Qanday Qo'shilish Mumkin?",
      desc: "4 qadamda Istiqlol ko'chasi 15-dagi IT Hubga a'zo bo'ling.",
      steps: [
        { step: "01", title: "Ariza", desc: "Sayt orqali 5 daqiqada ariza to'ldiring." },
        { step: "02", title: "Ko'rib Chiqish", desc: "Jamoamiz 3 ish kuni ichida murojaatingizni tahlil qiladi." },
        { step: "03", title: "Suhbat", desc: "Uychi yoki Namaganda video yoki yuzma-yuz suhbat." },
        { step: "04", title: "Hubda!", desc: "Kovorking, mentorlik va IT Park imtiyozlaridan foydalaning." },
      ],
      applyBtn: "Ariza Topshirish",
      investorBtn: "Investor Arizasi",
      educationBtn: "Ta'lim Dasturlari",
    },
    video: {
      badge: "/ Promo Video",
      title: "Uychi IT Hub Haqida",
      desc: "Uychi tumanida yaratilayotgan IT va AI markazi haqida qisqa video.",
    },
    announcements: {
      badge: "/ E'lonlar",
      title: "Tadbirlar va Forumlar",
      desc: "Uychi IT Hub tomonidan o'tkaziladigan tadbirlar, forumlar va musobaqalar.",
      date: "Sana",
    },
    careers: {
      badge: "/ Ish O'rinlari",
      title: "Karyera Imkoniyatlari",
      desc: "IT Hub va undagi kompaniyalarda bo'sh ish o'rinlari.",
      type: "Turi",
      salary: "Maosh",
    },
    news: {
      badge: "/ Yangiliklar",
      title: "Uychi IT Ekotizimidan So'nggi Yangiliklar",
      more: "Batafsil",
    },
    contact: {
      badge: "/ Bog'lanish",
      title: "Uychi Tumanida Birgalikda Quramiz",
      desc: "Istiqlol ko'chasi 15, Uychi — tashrif buyuring yoki formani to'ldiring, jamoamiz 24 soat ichida javob beradi.",
      fields: {
        name: "Ism Familya",
        namePh: "To'liq ismingiz",
        company: "Kompaniya",
        companyPh: "Kompaniya nomi",
        country: "Mamlakat",
        countryPh: "Mamlakatingiz",
        email: "Email",
        emailPh: "siz@kompaniya.com",
        phone: "Telefon",
        phonePh: "+998 XX XXX XX XX",
        message: "Xabar",
        messagePh: "So'rovingizni yozing...",
      },
      send: "Xabar Yuborish",
      sending: "Yuborilmoqda...",
      successTitle: "Xabar Yuborildi!",
      successDesc: "Jamoamiz 24 soat ichida siz bilan bog'lanadi.",
    },
    footer: {
      tagline: "Namangan-Uchqo'rg'on yo'lidagi Uychi tumanida startaplar, IT kompaniyalar va yoshlar uchun texnologiya va sun'iy intellekt markazi.",
      rights: "Barcha huquqlar himoyalangan.",
      location: "Uychi tumani, Namangan · IT Park rezidenti · 1935-yilda tashkil etilgan",
      hours: "Du–Ju: 09:00–18:00",
    },
  },

  RU: {
    nav: {
      startups: "Стартапы",
      education: "Обучение",
      news: "Новости",
      partners: "Партнёры",
      jobs: "Работа",
      events: "События",
      login: "Войти",
      contact: "Связаться",
    },
    hero: {
      badge: "Уйчинский район · Наманганская область · 2026",
      title: "Создаём IT и ИИ Центр в Уйчинском Районе",
      desc: "Район с населением 237 600 человек на трассе Наманган—Учкурган. 47 школ, 900+ малых предприятий, 5 промышленных зон и традиции шёлковой и хлопковой промышленности — превращаем Уйчи в IT-центр.",
      apply: "Подать заявку стартапа",
      reach: "Связаться",
    },
    stats: {
      badge: "/ Статистика",
      title: "Уйчинский Район в Цифрах",
      desc: "Реальные показатели Уйчинского района — фундамент для развития IT-центра.",
    },
    infra: {
      badge: "/ Инфраструктура",
      title: "Возможности Уйчинского Района",
      desc: "5 промышленных зон, 900+ малых предприятий, 47 школ и 13 больниц — прочная основа для технологического развития.",
      items: [
        { title: "5 Промзон", desc: "Ёркатай, Овчибулок, Кумтепа, Юксалиш и Янгиер — шёлк, хлопковое волокно и железобетон." },
        { title: "47 Школ", desc: "42 400 учащихся, 34 публичных библиотеки (545 500 книг) и 1 профессиональный колледж." },
        { title: "13 Больниц", desc: "801 койка, 335 врачей и 36 поликлиник — 14,1 врача на 10 000 населения." },
        { title: "Транспорт", desc: "256 км дорог, ж/д Ташкент—Андижан и трасса Наманган—Учкурган." },
      ],
    },
    startups: {
      badge: "/ Стартапы",
      title: "Стартапы, Рождённые в Уйчи",
      desc: "Технологические стартапы, основанные на традициях хлопководства, шелководства и сельского хозяйства.",
      problem: "Проблема",
      solution: "Решение",
      items: [
        {
          name: "AgroSmart Уйчи", sector: "AgriTech AI",
          problem: "Отсутствие мониторинга в реальном времени на 8 100 га хлопка и 5 500 га зерна.",
          solution: "Сеть IoT-датчиков и ИИ прогнозирование — экономия полива на 40%.",
          users: "1 200+ фермеров · 14 900 га",
        },
        {
          name: "SilkTech UZ", sector: "Текстиль ИИ",
          problem: "Контроль качества на шёлковых фабриках Уйчи вручную и медленно.",
          solution: "Автоматическое обнаружение дефектов, цвета и качества шёлка с помощью компьютерного зрения.",
          users: "3 фабрики · 800 кг/день",
        },
        {
          name: "PaxtaSoft", sector: "AgriTech",
          problem: "Высокие отходы и энергозатраты на хлопкоочистительных заводах.",
          solution: "Система управления с ИИ-оптимизацией, снижающая отходы на 25%.",
          users: "5 заводов · 12 000 тонн/год",
        },
      ],
    },
    how: {
      badge: "/ Процесс",
      title: "Как Присоединиться к Uychi IT Hub?",
      desc: "Станьте участником IT Hub на улице Истиклол, 15 за 4 шага.",
      steps: [
        { step: "01", title: "Заявка", desc: "Заполните онлайн-заявку. 5 минут." },
        { step: "02", title: "Рассмотрение", desc: "Ответим в течение 3 рабочих дней." },
        { step: "03", title: "Интервью", desc: "Видео или очная встреча в Уйчи или Намангане." },
        { step: "04", title: "В Хабе!", desc: "Коворкинг, менторство и льготы IT Park." },
      ],
      applyBtn: "Подать заявку",
      investorBtn: "Заявка инвестора",
      educationBtn: "Учебные программы",
    },
    video: {
      badge: "/ Промо Видео",
      title: "О Uychi IT Hub",
      desc: "Короткое видео об IT и AI центре, создаваемом в Уйчинском районе.",
    },
    announcements: {
      badge: "/ Объявления",
      title: "Мероприятия и Форумы",
      desc: "Мероприятия, форумы и конкурсы, проводимые Uychi IT Hub.",
      date: "Дата",
    },
    careers: {
      badge: "/ Вакансии",
      title: "Карьерные Возможности",
      desc: "Открытые вакансии в IT Hub и компаниях-резидентах.",
      type: "Тип",
      salary: "Зарплата",
    },
    news: {
      badge: "/ Новости",
      title: "Последние новости из IT-экосистемы Уйчи",
      more: "Подробнее",
    },
    contact: {
      badge: "/ Контакты",
      title: "Строим Вместе в Уйчинском Районе",
      desc: "Улица Истиклол, 15, Уйчи — приходите или заполните форму, наша команда ответит в течение 24 часов.",
      fields: {
        name: "Имя Фамилия",
        namePh: "Ваше полное имя",
        company: "Компания",
        companyPh: "Название компании",
        country: "Страна",
        countryPh: "Ваша страна",
        email: "Email",
        emailPh: "вы@компания.com",
        phone: "Телефон",
        phonePh: "+998 XX XXX XX XX",
        message: "Сообщение",
        messagePh: "Напишите ваш запрос...",
      },
      send: "Отправить сообщение",
      sending: "Отправляется...",
      successTitle: "Сообщение отправлено!",
      successDesc: "Наша команда свяжется с вами в течение 24 часов.",
    },
    footer: {
      tagline: "Центр технологий и искусственного интеллекта для стартапов, IT-компаний и молодёжи в Уйчинском районе на трассе Наманган—Учкурган.",
      rights: "Все права защищены.",
      location: "Уйчинский район, Наманган · Резидент IT Park · Основан в 1935 году",
      hours: "Пн–Пт: 09:00–18:00",
    },
  },

  EN: {
    nav: {
      startups: "Startups",
      education: "Education",
      news: "News",
      partners: "Partners",
      jobs: "Jobs",
      events: "Events",
      login: "Sign In",
      contact: "Contact",
    },
    hero: {
      badge: "Uychi District · Namangan Region · 2026",
      title: "Building an IT & AI Hub in Uychi District",
      desc: "A district of 237,600 people on the Namangan—Uchqo'rg'on highway. 47 schools, 900+ small enterprises, 5 industrial zones with silk and cotton traditions — we're turning Uychi into a tech hub.",
      apply: "Apply as a Startup",
      reach: "Get in Touch",
    },
    stats: {
      badge: "/ Live Stats",
      title: "Uychi District by the Numbers",
      desc: "Key indicators of Uychi district — the real numbers behind our IT hub development.",
    },
    infra: {
      badge: "/ Infrastructure",
      title: "Uychi District Capabilities",
      desc: "5 industrial zones, 900+ small enterprises, 47 schools and 13 hospitals — a solid foundation for technological growth.",
      items: [
        { title: "5 Industrial Zones", desc: "Yorkatay, Ovchibuloq, Kumtepa, Yuksalish and Yangiyer — silk, cotton fiber and reinforced concrete production." },
        { title: "47 Schools", desc: "42,400 students, 34 public libraries (545,500 books) and 1 vocational college." },
        { title: "13 Hospitals", desc: "801 beds, 335 doctors and 36 clinics — 14.1 doctors per 10,000 people." },
        { title: "Transport", desc: "256 km of roads, Tashkent—Andijan railway and Namangan—Uchqo'rg'on highway." },
      ],
    },
    startups: {
      badge: "/ Startups",
      title: "Startups Born in Uychi",
      desc: "Tech startups rooted in the district's cotton, silk and agricultural traditions.",
      problem: "Problem",
      solution: "Solution",
      items: [
        {
          name: "AgroSmart Uychi", sector: "AgriTech AI",
          problem: "No real-time monitoring on 8,100 ha of cotton and 5,500 ha of grain.",
          solution: "IoT sensor network and AI prediction — 40% water saving on irrigation.",
          users: "1,200+ farmers · 14,900 ha",
        },
        {
          name: "SilkTech UZ", sector: "Textile AI",
          problem: "Quality control at Uychi silk factories is manual and slow.",
          solution: "Computer vision for automatic silk quality, colour and defect detection.",
          users: "3 factories · 800 kg/day",
        },
        {
          name: "PaxtaSoft", sector: "AgriTech",
          problem: "High waste and energy consumption at cotton processing plants.",
          solution: "AI-optimised management system reducing waste by 25%.",
          users: "5 plants · 12,000 tons/year",
        },
      ],
    },
    how: {
      badge: "/ Process",
      title: "How to Join Uychi IT Hub?",
      desc: "Become a resident of our hub at 15 Istiqlol Street in 4 steps.",
      steps: [
        { step: "01", title: "Apply", desc: "Fill out the online form. 5 minutes." },
        { step: "02", title: "Review", desc: "We reply within 3 business days." },
        { step: "03", title: "Interview", desc: "Video or in-person meeting in Uychi or Namangan." },
        { step: "04", title: "In the Hub!", desc: "Co-working, mentorship and IT Park benefits." },
      ],
      applyBtn: "Submit Application",
      investorBtn: "Investor Application",
      educationBtn: "Education Programmes",
    },
    video: {
      badge: "/ Promo Video",
      title: "About Uychi IT Hub",
      desc: "A short video about the IT & AI hub being built in Uychi district.",
    },
    announcements: {
      badge: "/ Announcements",
      title: "Events & Forums",
      desc: "Events, forums and competitions organised by Uychi IT Hub.",
      date: "Date",
    },
    careers: {
      badge: "/ Careers",
      title: "Career Opportunities",
      desc: "Open positions at the IT Hub and resident companies.",
      type: "Type",
      salary: "Salary",
    },
    news: {
      badge: "/ News",
      title: "Latest from the Uychi Tech Ecosystem",
      more: "Read more",
    },
    contact: {
      badge: "/ Contact",
      title: "Let's Build Together in Uychi District",
      desc: "15 Istiqlol Street, Uychi — visit us or fill in the form, our team will respond within 24 hours.",
      fields: {
        name: "Full Name",
        namePh: "Your full name",
        company: "Company",
        companyPh: "Company name",
        country: "Country",
        countryPh: "Your country",
        email: "Email",
        emailPh: "you@company.com",
        phone: "Phone",
        phonePh: "+998 XX XXX XX XX",
        message: "Message",
        messagePh: "Write your request...",
      },
      send: "Send Message",
      sending: "Sending...",
      successTitle: "Message Sent!",
      successDesc: "Our team will get back to you within 24 hours.",
    },
    footer: {
      tagline: "Technology and AI hub for startups, IT companies and youth in Uychi district, on the Namangan—Uchqo'rg'on highway, Uzbekistan.",
      rights: "All rights reserved.",
      location: "Uychi district, Namangan · IT Park resident · Established 1935",
      hours: "Mon–Fri: 09:00–18:00",
    },
  },
};

export type Translations = typeof translations.UZ;

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: "UZ",
  setLang: () => {},
  t: translations.UZ,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "UZ";
    return (localStorage.getItem("uychi-lang") as Lang) || "UZ";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("uychi-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
