import os, sys, django
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "backend"))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.core.models import Infrastructure, Perk, Stat, HomepageStartup
from apps.startups.models import StartupApplication
from apps.investors.models import Investor
from apps.partners.models import Partner
from apps.news.models import Article
from apps.careers.models import JobPosting, JobApplication
from apps.seo.models import SEOPage
from apps.logs.models import SystemLog
from apps.contact.models import ContactSubmission
from apps.meetings.models import MeetingRequest
from apps.newsletter.models import Subscriber
from apps.education.models import Course, CourseApplication
from apps.events.models import Event, EventRegistration
from apps.coworking.models import CoworkingSpace, Booking
from apps.students.models import StudentProfile, Achievement
from apps.media.models import MediaItem
from django.contrib.auth.models import User
from django.utils.text import slugify
import datetime


# ── Admin foydalanuvchi ─────────────────────────────────────────────────────
if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser("admin", "admin@uychi.uz", "admin123")
if not User.objects.filter(username="editor").exists():
    u = User.objects.create_user("editor", "editor@uychi.uz", "editor123")
    u.is_staff = True
    u.first_name = "Muharrir"
    u.save()

# ── Mavjud ma'lumotlarni tozalash ───────────────────────────────────────────
Infrastructure.objects.all().delete()
Perk.objects.all().delete()
Stat.objects.all().delete()
HomepageStartup.objects.all().delete()
StartupApplication.objects.all().delete()
Investor.objects.all().delete()
Partner.objects.all().delete()
Article.objects.all().delete()
JobPosting.objects.all().delete()
JobApplication.objects.all().delete()
SEOPage.objects.all().delete()
SystemLog.objects.all().delete()
ContactSubmission.objects.all().delete()
MeetingRequest.objects.all().delete()
Subscriber.objects.all().delete()
Course.objects.all().delete()
CourseApplication.objects.all().delete()
Event.objects.all().delete()
EventRegistration.objects.all().delete()
CoworkingSpace.objects.all().delete()
Booking.objects.all().delete()
StudentProfile.objects.all().delete()
Achievement.objects.all().delete()
MediaItem.objects.all().delete()

# ── Infratuzilma ────────────────────────────────────────────────────────────
for i, item in enumerate([
    {"title": "Coworking Markazi", "desc": "80+ ish o'rinli zamonaviy coworking maydon. Yuqori tezlikli internet, yopiq kabinalar va hamkorlik zonalari.", "accent": "accent", "icon": "building2"},
    {"title": "AI va Dasturlash Laboratoriyasi", "desc": "GPU klasterli AI tadqiqot laboratoriyasi. Machine learning, kompyuter ko'rish va NLP loyihalari uchun jihozlangan.", "accent": "violet", "icon": "cpu"},
    {"title": "Startup Inkubatoru", "desc": "Dastlabki bosqich startaplarga mentorlik, moliyaviy ko'mak va bozorga chiqish dasturlari.", "accent": "emerald", "icon": "rocket"},
    {"title": "IT Ta'lim Markazi", "desc": "Frontend, Backend, Mobile va DevOps yo'nalishlarida intensiv kurslar va sertifikat dasturlari.", "accent": "accent", "icon": "graduationCap"},
    {"title": "Konferens va Tadbirlar Zali", "desc": "200 o'rinli zamonaviy zal. Xalqaro konferensiyalar, hackathonlar va demo day tadbirlari uchun.", "accent": "violet", "icon": "presentation"},
    {"title": "Robototexnika Laboratoriyasi", "desc": "3D printerlar, Arduino va Raspberry Pi jihozlari bilan yosh muhandislar uchun ochiq laboratoriya.", "accent": "emerald", "icon": "bot"},
    {"title": "Media va Podkast Studiyasi", "desc": "Professional yozuv va montaj jihozlari bilan IT kontent yaratish studiyasi.", "accent": "accent", "icon": "mic"},
]):
    Infrastructure.objects.create(title=item["title"], description=item["desc"], accent=item["accent"], icon_name=item["icon"], order=i + 1)

# ── Afzalliklar (Perks) ─────────────────────────────────────────────────────
for i, p in enumerate([
    {"symbol": "↓", "title": "Soliq imtiyozlari", "desc": "IT Park a'zolari uchun 10 yil davomida 0% korporativ soliq va 0% ijtimoiy to'lovlar. Import bojsiz uskunalar."},
    {"symbol": "◈", "title": "Malakali kadrlar", "desc": "Namangan viloyatida yiliga 5,000+ texnik mutaxassis yetishtiriladi. Kuchli matematika va muhandislik an'analari."},
    {"symbol": "◇", "title": "Davlat ko'magi", "desc": "Viloyat hokimligi va Uychi tuman hokimligining to'liq ko'magi. Tezlashtirilgan litsenziyalash va ruxsatnomalar."},
    {"symbol": "⊕", "title": "Strategik joylashuv", "desc": "Namangan – O'zbekistonning to'qimachilik va texnologiya markazi. Toshkent bilan qulay temir yo'l va avtomobil aloqasi."},
    {"symbol": "⚡", "title": "Grant va stipendiyalar", "desc": "Yiliga 50+ grant o'rinlari, IT yo'nalishidagi talabalar uchun oylik stipendiyalar va loyiha moliyalashtirish."},
    {"symbol": "∞", "title": "Tarmoq imkoniyatlari", "desc": "Microsoft, AWS, Google, Huawei kabi global hamkorlar bilan to'g'ridan-to'g'ri aloqa va resurslarga kirish."},
]):
    Perk.objects.create(symbol=p["symbol"], title=p["title"], description=p["desc"], order=i + 1)

# ── Statistika ──────────────────────────────────────────────────────────────
for i, s in enumerate([
    {"label": "IT Startaplari", "value": "24", "suffix": "+"},
    {"label": "Faol foydalanuvchilar", "value": "3", "suffix": "K+"},
    {"label": "Yaratilgan ish o'rinlari", "value": "350", "suffix": "+"},
    {"label": "Hamkor tashkilotlar", "value": "18", "suffix": "+"},
    {"label": "AI yechimlari", "value": "12", "suffix": "+"},
    {"label": "O'quv markazlari", "value": "7", "suffix": ""},
]):
    Stat.objects.create(label=s["label"], value=s["value"], suffix=s["suffix"], order=i + 1)

# ── Bosh sahifa startaplari ─────────────────────────────────────────────────
for i, s in enumerate([
    {
        "sector": "AgriTech AI", "tagline": "Aqlli qishloq xo'jaligi — aniq sug'orish",
        "problem": "Uychi tumanida suv tanqisligi va an'anaviy sug'orish usullari hosildorlikni 30–40% kamaytiradi.",
        "solution": "IoT sensorlar va sun'iy yo'ldosh tasvirlari asosida real vaqt sug'orish monitoringi va AI prognozi.",
        "tech": "IoT, Satellite Imagery, Predictive ML, Django",
        "accent": "emerald", "pml": "Fermerlar", "pmv": "1,200+", "sml": "Gektarlar", "smv": "8,500",
    },
    {
        "sector": "EdTech AI", "tagline": "Maktab ta'limini raqamlashtirish",
        "problem": "Qishloq maktablarida sifatli o'qituvchi va zamonaviy o'quv resurslarining yetishmasligi.",
        "solution": "Oflayn rejimda ishlaydigan o'zbek tilidagi interaktiv ta'lim platformasi va AI o'qituvchi yordamchisi.",
        "tech": "React Native, AI Tutor, Offline Sync, Node.js",
        "accent": "accent", "pml": "O'quvchilar", "pmv": "28,000+", "sml": "Maktablar", "smv": "140+",
    },
    {
        "sector": "GovTech", "tagline": "Fuqaro murojaatlarini avtomatlashtirish",
        "problem": "Tuman hokimligiga keladigan murojaatlar qog'oz shaklida — sekin, shaffof emas va kuzatib bo'lmaydi.",
        "solution": "AI asosidagi murojaatlar platformasi: Telegram bot, web va mobil orqali ariza topshirish va real vaqt monitoring.",
        "tech": "Next.js, Node.js, PostgreSQL, Telegram Bot API",
        "accent": "violet", "pml": "Murojaatlar", "pmv": "12,000+", "sml": "O'rtacha javob", "smv": "4.2 soat",
    },
    {
        "sector": "MedTech AI", "tagline": "Qishloq tibbiyotini raqamlashtirish",
        "problem": "Qishloq shifokorlariga malakali mutaxassislar yetishmaydi, bemorlar shaharga borishga majbur.",
        "solution": "Telemedikal platforma va AI diagnostika yordamchisi orqali masofaviy konsultatsiya va tashxis.",
        "tech": "Telemedicine, AI Diagnostics, React Native, Firebase",
        "accent": "emerald", "pml": "Bemorlar", "pmv": "5,000+", "sml": "Shifokorlar", "smv": "45",
    },
    {
        "sector": "CleanTech AI", "tagline": "Quyosh energiyasini AI bilan boshqarish",
        "problem": "Namangan viloyatida quyosh energiyasidan foydalanish past samaradorlikka ega.",
        "solution": "AI asosidagi quyosh paneli monitoringi va prognozlash tizimi orqali energiya samaradorligini 40% oshirish.",
        "tech": "IoT, Solar Analytics, Python, FastAPI",
        "accent": "accent", "pml": "Panellar", "pmv": "2,500+", "sml": "kVt/soat", "smv": "1.2M",
    },
]):
    HomepageStartup.objects.create(
        sector=s["sector"], tagline=s["tagline"], problem=s["problem"],
        solution=s["solution"], tech_stack=s["tech"], accent=s["accent"],
        primary_metric_label=s["pml"], primary_metric_value=s["pmv"],
        secondary_metric_label=s["sml"], secondary_metric_value=s["smv"],
        order=i + 1,
    )

# ── Startup arizalari ───────────────────────────────────────────────────────
for s in [
    {"name": "AgroSmart Uychi", "sector": "AgriTech", "stage": "Seed", "status": "approved", "founder": "Akbar Tursunov", "email": "akbar@agrosmart.uz", "phone": "+998901234567", "team": 8, "funding": "$120,000", "desc": "IoT sensorlar va sun'iy yo'ldosh tasvirlari asosida paxta va bug'doy dalalarida aniq sug'orish tizimi.", "tech": "IoT, Satellite Data, Predictive ML, Django", "country": "O'zbekiston"},
    {"name": "EduCore UZ", "sector": "EdTech", "stage": "Pre-Seed", "status": "approved", "founder": "Nilufar Hasanova", "email": "nilufar@educore.uz", "phone": "+998937654321", "team": 12, "funding": "$45,000", "desc": "Oflayn rejimda ishlaydigan o'zbek tilidagi ta'lim platformasi. 140+ maktab bilan ishlaydi.", "tech": "React Native, AI Tutor, Offline Sync, Node.js", "country": "O'zbekiston"},
    {"name": "GovTrack UZ", "sector": "GovTech", "stage": "MVP", "status": "approved", "founder": "Jamshid Qodirov", "email": "jamshid@govtrack.uz", "phone": "+998905551122", "team": 10, "funding": "$60,000", "desc": "Mahalliy hokimliklar uchun fuqarolar murojaatlarini avtomatlashtiradigan platforma.", "tech": "Next.js, Node.js, PostgreSQL, Telegram Bot", "country": "O'zbekiston"},
    {"name": "MediNet Uychi", "sector": "MedTech", "stage": "Pre-Seed", "status": "approved", "founder": "Aziza Yuldasheva", "email": "aziza@medinet.uz", "phone": "+998993331144", "team": 6, "funding": "$30,000", "desc": "Qishloq shifokorlariga telemedikal konsultatsiya va AI diagnostika yordami.", "tech": "Telemedicine, AI Diagnostics, React Native, Firebase", "country": "O'zbekiston"},
    {"name": "NamLogist", "sector": "Logistics", "stage": "MVP", "status": "review", "founder": "Shuhrat Razzaqov", "email": "shuhrat@namlogist.uz", "phone": "+998902221133", "team": 5, "funding": "—", "desc": "Namangan–Toshkent yo'nalishidagi yuk tashishni AI orqali optimallashtiradigan B2B platforma.", "tech": "Route Optimization, ML, Real-time GPS, FastAPI", "country": "O'zbekiston"},
    {"name": "TextileAI", "sector": "Manufacturing", "stage": "Idea", "status": "pending", "founder": "Behruz Mirzayev", "email": "behruz@textileai.uz", "phone": "+998944445566", "team": 3, "funding": "—", "desc": "Namangan to'qimachilik zavodlari uchun kompyuter ko'rish asosidagi sifat nazorati.", "tech": "Computer Vision, PyTorch, Edge AI, Raspberry Pi", "country": "O'zbekiston"},
    {"name": "SolarNav", "sector": "CleanTech", "stage": "Pre-Seed", "status": "pending", "founder": "Oybek Nazarov", "email": "oybek@solarnav.uz", "phone": "+998907778899", "team": 4, "funding": "$25,000", "desc": "Namangan viloyatidagi quyosh energiyasi panellarini AI orqali boshqarish va optimallashtirish tizimi.", "tech": "IoT, Solar Analytics, Python, FastAPI", "country": "O'zbekiston"},
    {"name": "WaterSense UZ", "sector": "AgriTech", "stage": "Idea", "status": "pending", "founder": "Mavluda Xolmatova", "email": "mavluda@watersense.uz", "phone": "+998912223344", "team": 2, "funding": "—", "desc": "Tuproq namligi sensorlari va ob-havo ma'lumotlari asosida sug'orish jadvalini avtomatlashtirishchi.", "tech": "IoT Sensors, Weather API, ML, Arduino", "country": "O'zbekiston"},
    {"name": "CodingBard", "sector": "EdTech", "stage": "Seed", "status": "active", "founder": "Sardorbek Ahmadaliyev", "email": "sardor@codingbard.uz", "phone": "+998998887766", "team": 15, "funding": "$200,000", "desc": "AI yordamchi bilan o'zbek tilida dasturlash o'rganish platformasi. 10,000+ foydalanuvchi.", "tech": "Next.js, OpenAI API, PostgreSQL, Django", "country": "O'zbekiston"},
    {"name": "SmartPack", "sector": "Manufacturing", "stage": "MVP", "status": "active", "founder": "Dilmurod To'xtayev", "email": "dilmurod@smartpack.uz", "phone": "+998935550077", "team": 7, "funding": "$50,000", "desc": "Qadoqlash sanoati uchun AI asosidagi sifat nazorati va chiqindilarni kamaytirish tizimi.", "tech": "Computer Vision, TensorFlow, IoT, Python", "country": "O'zbekiston"},
    {"name": "AgriDrone UZ", "sector": "AgriTech", "stage": "Seed", "status": "active", "founder": "Rustam Qayumov", "email": "rustam@agridrone.uz", "phone": "+998906661122", "team": 9, "funding": "$85,000", "desc": "Dronlar va AI analitika yordamida qishloq xo'jaligi ekinlarini monitoring qilish va zararkunandalarni aniqlash.", "tech": "Drones, Computer Vision, AI Analytics, Python", "country": "O'zbekiston"},
    {"name": "FinTech Uychi", "sector": "FinTech", "stage": "Idea", "status": "pending", "founder": "Gulnoza Karimova", "email": "gulnoza@fintech.uz", "phone": "+998904440033", "team": 3, "funding": "—", "desc": "Qishloq aholisi uchun mikromoliya va pul o'tkazmalari platformasi.", "tech": "React Native, Node.js, Blockchain, PostgreSQL", "country": "O'zbekiston"},
]:
    StartupApplication.objects.create(
        startup_name=s["name"], sector=s["sector"], stage=s["stage"],
        status=s["status"], founder_name=s["founder"], email=s["email"],
        phone=s.get("phone", ""), team_size=s["team"], funding_needed=s["funding"],
        description=s["desc"], tech_stack=s["tech"], country=s["country"],
    )

# ── Investorlar ─────────────────────────────────────────────────────────────
for inv in [
    {"company": "Navoiy Investitsiya Fondi", "country": "O'zbekiston", "type": "Development VC", "ticket": "$50K–$500K", "sectors": "AgriTech, GovTech, EdTech", "status": "active", "contact": "Sarvar Nazarov", "email": "sarvar@navoiy-invest.uz"},
    {"company": "Uzbek Ventures", "country": "O'zbekiston", "type": "VC Fund", "ticket": "$100K–$1M", "sectors": "AI, SaaS, Fintech", "status": "active", "contact": "Dilnoza Umarova", "email": "d.umarova@uzbekventures.uz"},
    {"company": "ADB Ventures", "country": "Filippin", "type": "Development VC", "ticket": "$500K–$3M", "sectors": "AgriTech, CleanTech, EdTech", "status": "active", "contact": "Wei Zhang", "email": "wzhang@adb.org"},
    {"company": "KOICA Innovation", "country": "Janubiy Koreya", "type": "Development VC", "ticket": "Grant", "sectors": "AgriTech, Education, Health", "status": "negotiation", "contact": "Park Jiyeon", "email": "jiyeon.park@koica.go.kr"},
    {"company": "UNDP O'zbekiston", "country": "O'zbekiston", "type": "Development VC", "ticket": "Grant", "sectors": "GovTech, SDG, Climate", "status": "active", "contact": "Nigora Alijonova", "email": "n.alijonova@undp.org"},
    {"company": "Techstars Central Asia", "country": "AQSh", "type": "Accelerator", "ticket": "$100K–$200K", "sectors": "AI, DeepTech, SaaS", "status": "due_diligence", "contact": "Sarah Johnson", "email": "sarah@techstars.com"},
    {"company": "IFC World Bank", "country": "AQSh", "type": "Development VC", "ticket": "$1M–$10M", "sectors": "Finance, Infrastructure", "status": "active", "contact": "David Peterson", "email": "dp@ifc.org"},
    {"company": "Aloqa Ventures", "country": "O'zbekiston", "type": "Corporate VC", "ticket": "$100K–$300K", "sectors": "Telecom, AI, IoT", "status": "active", "contact": "Bobur Ismoilov", "email": "bobur@aloqaventures.uz"},
]:
    Investor.objects.create(
        company=inv["company"], country=inv["country"], investor_type=inv["type"],
        ticket_size=inv["ticket"], sectors=inv["sectors"], status=inv["status"],
        contact_name=inv["contact"], email=inv["email"],
    )

# ── Hamkorlar ───────────────────────────────────────────────────────────────
for p in [
    {"name": "IT Park O'zbekiston", "country": "O'zbekiston", "category": "Government", "tier": "strategic"},
    {"name": "Namangan viloyat hokimligi", "country": "O'zbekiston", "category": "Government", "tier": "strategic"},
    {"name": "Uychi tuman hokimligi", "country": "O'zbekiston", "category": "Government", "tier": "strategic"},
    {"name": "Namangan Davlat Universiteti", "country": "O'zbekiston", "category": "University", "tier": "regional"},
    {"name": "Toshkent Axborot Texnologiyalari Universiteti", "country": "O'zbekiston", "category": "University", "tier": "regional"},
    {"name": "O'zbekiston Milliy Universiteti", "country": "O'zbekiston", "category": "University", "tier": "regional"},
    {"name": "Microsoft Startups", "country": "AQSh", "category": "Corporate", "tier": "global"},
    {"name": "AWS Startups", "country": "AQSh", "category": "Corporate", "tier": "global"},
    {"name": "Google for Startups", "country": "AQSh", "category": "Corporate", "tier": "global"},
    {"name": "Techstars", "country": "AQSh", "category": "Accelerator", "tier": "global"},
    {"name": "ADB Ventures", "country": "Filippin", "category": "International", "tier": "global"},
    {"name": "UNDP O'zbekiston", "country": "O'zbekiston", "category": "International", "tier": "strategic"},
    {"name": "KOICA", "country": "Janubiy Koreya", "category": "International", "tier": "regional"},
    {"name": "Astana Hub", "country": "Qozog'iston", "category": "Tech Park", "tier": "regional"},
    {"name": "Skolkovo", "country": "Rossiya", "category": "Tech Park", "tier": "regional"},
    {"name": "Huawei Technologies", "country": "Xitoy", "category": "Corporate", "tier": "global"},
    {"name": "IFC World Bank", "country": "AQSh", "category": "International", "tier": "global"},
    {"name": "Uzbek Ventures", "country": "O'zbekiston", "category": "Accelerator", "tier": "regional"},
    {"name": "UNICEF O'zbekiston", "country": "O'zbekiston", "category": "International", "tier": "regional"},
    {"name": "Reskill USAID", "country": "AQSh", "category": "International", "tier": "regional"},
]:
    Partner.objects.create(name=p["name"], country=p["country"], category=p["category"], tier=p["tier"], status="active")

# ── Yangiliklar ─────────────────────────────────────────────────────────────
articles = [
    {
        "title": "Uychi tumanida sun'iy intellekt yo'nalishida muhim qadam",
        "category": "Ta'lim", "status": "published", "views": 4500,
        "author": "Sardorbek Ahmadaliyev",
        "excerpt": "Tuman hokimligida sun'iy intellekt yo'nalishida o'quv seminari tashkil etildi. Ishtirokchilarga sun'iy intellektning asosiy tushunchalari, uning amaliyotdagi qo'llanilishi haqida ma'lumot berildi.",
        "content": "Tuman hokimligida sun'iy intellekt yo'nalishida o'quv seminari tashkil etildi. Ushbu seminar zamonaviy texnologiyalarga qiziquvchi yoshlar, o'qituvchilar va mutaxassislar uchun muhim bilim va ko'nikmalarni oshirishga qaratildi.\n\nSeminar davomida ishtirokchilarga sun'iy intellektning asosiy tushunchalari, uning amaliyotdagi qo'llanilishi hamda turli sohalardagi ahamiyati haqida batafsil ma'lumotlar berildi. Shuningdek, mutaxassislar tomonidan amaliy mashg'ulotlar o'tkazilib, ishtirokchilar real misollar orqali yangi bilimlarga ega bo'ldilar.\n\nTadbirda yoshlarni IT sohasiga keng jalb qilish, ularning innovasion fikrlashini rivojlantirish va kelajakda raqobatbardosh kadrlar tayyorlash masalalariga alohida e'tibor qaratildi.\n\nMashg'ulotlar davomida tuman hokimining raqamli texnologiyalar va sun'iy intellekt texnologiyalarini rivojlantirish bo'yicha maslahatchisi Sardorbek Ahmadaliyev tomonidan ishtirokchilarga sun'iy intellekt texnologiyalaridan samarali foydalanish, zamonaviy ta'lim usullarini amaliyotga joriy etish, xodimlar bilan ishlashda innovasion yondashuvlarni qo'llash bo'yicha muhim tavsiyalar va tushunchalar berildi.\n\nMazkur tashabbus hududda raqamli savodxonlikni oshirish, zamonaviy texnologiyalarni keng joriy etish, davlat va tashkilotlar faoliyatida yangi yondashuvlarni shakllantirishda muhim ahamiyat kasb etmoqda.",
    },
    {
        "title": "Uychi AI & IT Hub rasmiy ochildi",
        "category": "E'lon", "status": "published", "views": 5840,
        "author": "Tahririyat",
        "excerpt": "Namangan viloyatining Uychi tumanida zamonaviy AI va IT Markaz rasmiy tadbirda ochildi. Viloyat hokimi va IT Park O'zbekiston rahbariyati ishtirokida bo'lib o'tgan marosimda 80+ ish o'rinli coworking, AI laboratoriyasi va startup inkubatori ochildi.",
        "content": "Namangan viloyatining Uychi tumanida zamonaviy AI va IT Markaz rasmiy tadbirda ochildi. Viloyat hokimi va IT Park O'zbekiston rahbariyati ishtirokida bo'lib o'tgan marosimda 80+ ish o'rinli coworking, AI laboratoriyasi va startup inkubatori tantanali ochildi. Bu markaz tuman iqtisodiyotini raqamlashtirish va yoshlar bandligini oshirishga katta hissa qo'shishi kutilmoqda.\n\nMarkazda 7 ta yo'nalish bo'yicha bepul ta'lim kurslari, startaplar uchun inkubatsiya dasturi va xalqaro hamkorlar bilan qo'shma loyihalar amalga oshiriladi.",
    },
    {
        "title": "Microsoft Startups dasturiga Uychi IT Hub qabul qilindi",
        "category": "Hamkorlik", "status": "published", "views": 3214,
        "author": "Tahririyat",
        "excerpt": "Microsoft Startups Founders Hub dasturiga qabul qilinishimiz bilan hub rezidentlari $150,000 gacha Azure kredit, GitHub Enterprise va Microsoft 365 imkoniyatlaridan bepul foydalana oladi.",
        "content": "Microsoft Startups Founders Hub dasturiga qabul qilinishimiz bilan hub rezidentlari $150,000 gacha Azure kredit, GitHub Enterprise va Microsoft 365 imkoniyatlaridan bepul foydalana oladi. Bu imkoniyat ayniqsa AI startaplari uchun katta yordam bo'lib, ularning rivojlanishini tezlashtiradi.",
    },
    {
        "title": "AgroSmart Uychi startapi $120,000 investitsiya jalb qildi",
        "category": "Startap", "status": "published", "views": 2891,
        "author": "Tahririyat",
        "excerpt": "Uychi IT Hub rezidenti AgroSmart Uychi startapi Navoiy Investitsiya Fondidan $120,000 seed investitsiya jalb qildi. IoT sensorlar va sun'iy yo'ldosh tasvirlari asosida paxta va bug'doy dalalarida aniq sug'orish tizimi.",
        "content": "Uychi IT Hub rezidenti AgroSmart Uychi startapi Navoiy Investitsiya Fondidan $120,000 seed investitsiya jalb qildi. Startap IoT sensorlar va sun'iy yo'ldosh tasvirlari asosida paxta va bug'doy dalalarida aniq sug'orish tizimini ishlab chiqadi. Ushbu texnologiya suv sarfini 40% kamaytirib, hosildorlikni 25% oshirish imkonini beradi.",
    },
    {
        "title": "IT Park O'zbekiston Uychi tuman uchun 10 yillik imtiyozlar e'lon qildi",
        "category": "Siyosat", "status": "published", "views": 4102,
        "author": "Tahririyat",
        "excerpt": "IT Park O'zbekiston Uychi tumanidagi texnologiya kompaniyalari uchun 10 yil davomida 0% korporativ soliq, 0% ijtimoiy to'lovlar va bojsiz uskunalar importi imtiyozlarini tasdiqladi.",
        "content": "IT Park O'zbekiston Uychi tumanidagi texnologiya kompaniyalari uchun 10 yil davomida 0% korporativ soliq, 0% ijtimoiy to'lovlar va bojsiz uskunalar importi imtiyozlarini rasmiy tasdiqladi. Bu imtiyozlar IT kompaniyalari va startaplar uchun katta iqtisodiy foyda yaratadi.",
    },
    {
        "title": "Uychi Youth Code: 200 o'quvchi dasturlash kurslarini boshladi",
        "category": "Ta'lim", "status": "published", "views": 2156,
        "author": "Tahririyat",
        "excerpt": "Uychi IT Hub tashabbusi bilan 10–18 yoshli 200 nafar o'quvchi bepul dasturlash kurslarini boshladi. Python, Web-dizayn va robototexnika yo'nalishlarida 6 oylik kurs.",
        "content": "Uychi IT Hub tashabbusi bilan 10–18 yoshli 200 nafar o'quvchi bepul dasturlash kurslarini boshladi. Python, Web-dizayn va robototexnika yo'nalishlarida 6 oylik kurs IT Park va UNICEF qo'llab-quvvatlovi ostida amalga oshirilmoqda. Darslar haftada 3 marta, kechki vaqtlarda o'tkaziladi.",
    },
    {
        "title": "Uychi tuman hokimligi raqamli xizmatlar platformasini ishga tushirdi",
        "category": "GovTech", "status": "published", "views": 3487,
        "author": "Tahririyat",
        "excerpt": "Uychi tuman hokimligi IT Hub rezidenti GovTrack UZ ishlab chiqqan raqamli xizmatlar platformasini rasmiy ishga tushirdi. 15 ta tuman xizmati onlayn.",
        "content": "Uychi tuman hokimligi IT Hub rezidenti GovTrack UZ ishlab chiqqan raqamli xizmatlar platformasini rasmiy ishga tushirdi. Endi fuqarolar 15 ta tuman xizmatiga onlayn murojaat qila oladi, murojaatlar 4 soat ichida ko'rib chiqiladi.",
    },
    {
        "title": "Namangan viloyatida birinchi AI hackathon o'tkazildi",
        "category": "Tadbir", "status": "published", "views": 1894,
        "author": "Tahririyat",
        "excerpt": "Uychi IT Hubda 48 soatlik AI Hackathon bo'lib o'tdi. 120 ishtirokchi, 24 jamoa va 6 ta finalist loyiha. G'olib jamoaga $5,000 mukofot.",
        "content": "Uychi IT Hubda 48 soatlik AI Hackathon bo'lib o'tdi. 120 ishtirokchi, 24 jamoa va 6 ta finalist loyiha. G'olib jamoaga $5,000 mukofot va 6 oylik inkubatsiya dasturiga qabul qilindi. Hackathon davomida AgriTech, EdTech va GovTech yo'nalishlarida AI yechimlari ishlab chiqildi.",
    },
    {
        "title": "EduCore UZ platformasi 28,000 o'quvchiga yetib bordi",
        "category": "Startap", "status": "published", "views": 2103,
        "author": "Tahririyat",
        "excerpt": "Uychi IT Hub rezidenti EduCore UZ oflayn ta'lim platformasi Namangan viloyatidagi 140 maktabda 28,000+ o'quvchiga xizmat ko'rsatmoqda.",
        "content": "Uychi IT Hub rezidenti EduCore UZ oflayn ta'lim platformasi Namangan viloyatidagi 140 maktabda 28,000+ o'quvchiga xizmat ko'rsatmoqda. Platforma internet bo'lmagan joylarda ham ishlaydi va AI yordamchi orqali o'quvchilarga individual ta'lim yo'nalishini taklif qiladi.",
    },
    {
        "title": "Koreya KOICA delegatsiyasi Uychi IT Hubni ziyorat qildi",
        "category": "Hamkorlik", "status": "published", "views": 1456,
        "author": "Tahririyat",
        "excerpt": "Koreya Xalqaro Hamkorlik Agentligi (KOICA) vakillari Uychi IT Hubni ziyorat qilib, AgriTech va ta'lim sohasidagi startaplar bilan grant hamkorlik imkoniyatlarini muhokama qildi.",
        "content": "Koreya Xalqaro Hamkorlik Agentligi (KOICA) vakillari Uychi IT Hubni ziyorat qildi. Tashrif davomida AgriTech va ta'lim sohasidagi startaplar bilan grant hamkorlik imkoniyatlari muhokama qilindi. KOICA tomonidan 2026-yil uchun $500,000 grant dasturi e'lon qilindi.",
    },
    {
        "title": "Uychi IT Hubda yangi AI kurs dasturi boshlanadi",
        "category": "Ta'lim", "status": "draft", "views": 0,
        "author": "Tahririyat",
        "excerpt": "2026-yil iyul oyidan boshlab Uychi IT Hubda Machine Learning, Computer Vision va NLP yo'nalishlarida 4 oylik intensiv kurs dasturi boshlanadi.",
        "content": "2026-yil iyul oyidan boshlab Uychi IT Hubda Machine Learning, Computer Vision va NLP yo'nalishlarida 4 oylik intensiv kurs dasturi boshlanadi. Kurs yakunida loyiha himoyasi va sertifikat beriladi.",
    },
    {
        "title": "CodingBard platformasi 10,000+ foydalanuvchiga yetdi",
        "category": "Startap", "status": "published", "views": 1760,
        "author": "Tahririyat",
        "excerpt": "Uychi IT Hub rezidenti CodingBard — AI yordamchi bilan o'zbek tilida dasturlash o'rganish platformasi 10,000 dan ortiq foydalanuvchiga yetdi.",
        "content": "Uychi IT Hub rezidenti CodingBard — AI yordamchi bilan o'zbek tilida dasturlash o'rganish platformasi 10,000 dan ortiq foydalanuvchiga yetdi. Platforma asoschisi Sardorbek Ahmadaliyevning ta'kidlashicha, platforma orqali o'quvchilar 40% tezroq dasturlashni o'rganmoqda.",
    },
    {
        "title": "Huawei bilan hamkorlikda 5G laboratoriyasi ochildi",
        "category": "Hamkorlik", "status": "published", "views": 1230,
        "author": "Tahririyat",
        "excerpt": "Uychi IT Hubda Huawei Technologies bilan hamkorlikda 5G va IoT laboratoriyasi ochildi. Talabalar va startaplar uchun ochiq test muhiti.",
        "content": "Uychi IT Hubda Huawei Technologies bilan hamkorlikda 5G va IoT laboratoriyasi ochildi. Laboratoriya talabalar va startaplar uchun ochiq bo'lib, 5G tarmoq infratuzilmasida sinovlar o'tkazish imkonini beradi.",
    },
]
for a in articles:
    slug = slugify(a["title"])
    counter = 1
    while Article.objects.filter(slug=slug).exists():
        slug = f"{slugify(a['title'])}-{counter}"
        counter += 1
    Article.objects.create(
        title=a["title"], slug=slug, category=a["category"],
        status=a["status"], views=a["views"], author_name=a["author"],
        content=a["content"], excerpt=a["excerpt"],
    )

# ── Ish o'rinlari ───────────────────────────────────────────────────────────
for j in [
    {"title": "Senior Frontend Dasturchi", "dept": "Muhandislik", "type": "Full-time", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 18, "salary": "5,000,000–9,000,000 so'm", "desc": "React, Next.js va TypeScript asosida zamonaviy web ilovalar yaratish. AI asosidagi produktlarni ishlab chiqishda ishtirok.", "req": "React 3+ yil, TypeScript, REST API, Git"},
    {"title": "Python Backend Dasturchi", "dept": "Muhandislik", "type": "Full-time", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 24, "salary": "6,000,000–10,000,000 so'm", "desc": "Django, FastAPI yordamida microservislar va REST API'lar yaratish. Ma'lumotlar bazalari bilan ishlash.", "req": "Python 3+ yil, Django/FastAPI, PostgreSQL, Docker"},
    {"title": "AI/ML Muhandis", "dept": "AI Tadqiqot", "type": "Full-time", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 11, "salary": "8,000,000–15,000,000 so'm", "desc": "Machine learning modellari ishlab chiqish, o'qitish va production'ga chiqarish. AgriTech va GovTech loyihalarida ishtirok.", "req": "Python, TensorFlow/PyTorch, MLOps, Cloud (AWS/GCP)"},
    {"title": "UX/UI Dizayner", "dept": "Dizayn", "type": "Full-time", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 31, "salary": "4,000,000–7,000,000 so'm", "desc": "Foydalanuvchi tajribasini loyihalash, prototiplash va dizayn tizimlarini yaratish.", "req": "Figma 2+ yil, Design Systems, User Research"},
    {"title": "DevOps Muhandis", "dept": "Muhandislik", "type": "Full-time", "loc": "Masofadan", "status": "active", "apps": 9, "salary": "7,000,000–12,000,000 so'm", "desc": "CI/CD pipeline'larni yaratish, Docker/Kubernetes klasterlarini boshqarish, monitoring.", "req": "Docker, Kubernetes, GitHub Actions, Linux, AWS"},
    {"title": "Mobile Dasturchi (React Native)", "dept": "Muhandislik", "type": "Full-time", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 15, "salary": "5,000,000–8,000,000 so'm", "desc": "iOS va Android uchun cross-platform mobil ilovalar yaratish. Offline-first arxitektura bilan ishlash.", "req": "React Native 2+ yil, TypeScript, Expo, SQLite"},
    {"title": "AI Tadqiqot Stajyori", "dept": "AI Tadqiqot", "type": "Internship", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 47, "salary": "1,500,000–2,500,000 so'm", "desc": "AI tadqiqot loyihalarida ishtirok etish, ma'lumotlar tahlili va model sinovlash.", "req": "Python, Matematika/Statistika bilimi, ML asoslari"},
    {"title": "Loyiha Menejeri", "dept": "Operatsiyalar", "type": "Full-time", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 22, "salary": "5,000,000–8,000,000 so'm", "desc": "IT loyihalarini rejalashtirish va boshqarish, jamoalar o'rtasida muvofiqlashtirish.", "req": "Loyiha boshqaruvi 3+ yil, Agile/Scrum, O'zbek va Rus tillar"},
    {"title": "IT O'qituvchisi (Frontend)", "dept": "Ta'lim", "type": "Part-time", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 13, "salary": "2,500,000–4,000,000 so'm", "desc": "HTML, CSS, JavaScript va React yo'nalishida dars berish. Kurs materiallarini tayyorlash.", "req": "Frontend 2+ yil, Pedagogik tajriba, O'zbek tili"},
    {"title": "Kiberxavfsizlik Mutaxassisi", "dept": "Muhandislik", "type": "Full-time", "loc": "Uychi, Namangan viloyati", "status": "paused", "apps": 7, "salary": "7,000,000–12,000,000 so'm", "desc": "Tizim va tarmoq xavfsizligini ta'minlash, penetratsion testlar o'tkazish, xavfsizlik auditlari.", "req": "CompTIA Security+/CEH, Linux, Network protocols"},
    {"title": "Full Stack Dasturchi (Node.js + React)", "dept": "Muhandislik", "type": "Full-time", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 5, "salary": "6,000,000–10,000,000 so'm", "desc": "Node.js va React asosida to'liq stack loyihalarni yaratish. Ma'lumotlar bazasi dizayni va API integratsiyasi.", "req": "Node.js 2+ yil, React, PostgreSQL, Redis, Docker"},
    {"title": "Data Analyst", "dept": "AI Tadqiqot", "type": "Full-time", "loc": "Uychi, Namangan viloyati", "status": "active", "apps": 8, "salary": "4,000,000–7,000,000 so'm", "desc": "Ma'lumotlar tahlili, vizualizatsiyasi va hisobotlarni tayyorlash. AgriTech va GovTech loyihalari uchun data pipeline yaratish.", "req": "Python, SQL, Power BI/Tableau, Statistika"},
]:
    JobPosting.objects.create(
        title=j["title"], department=j["dept"], employment_type=j["type"],
        location=j["loc"], status=j["status"], applicants_count=j["apps"],
        salary_range=j["salary"], description=j["desc"], requirements=j["req"],
        posted_at=datetime.datetime.now() - datetime.timedelta(days=len(j)),
    )

# ── Ta'lim kurslari ─────────────────────────────────────────────────────────
courses = [
    {"title": "Python Dasturlash Asoslari", "inst": "Javohir Sobirov", "cat": "Dasturlash", "level": "beginner", "duration": "2 oy", "lessons": 24, "price": 0, "free": True, "lang": "uz", "students": 340, "rating": 4.8, "accent": "cyan", "tags": ["python", "boshlangich"], "desc": "Python tilini noldan o'rganing. O'zgaruvchilar, sikllar, funksiyalar, obyektlar va fayllar bilan ishlash."},
    {"title": "Frontend Development: HTML, CSS, JS", "inst": "Dilshod Rahimov", "cat": "Veb Dasturlash", "level": "beginner", "duration": "3 oy", "lessons": 36, "price": 0, "free": True, "lang": "uz", "students": 280, "rating": 4.7, "accent": "violet", "tags": ["html", "css", "javascript", "frontend"], "desc": "Zamonaviy veb-sahifalar yaratish. HTML5, CSS3, JavaScript va responsive dizayn."},
    {"title": "React va Next.js", "inst": "Akbar Tursunov", "cat": "Veb Dasturlash", "level": "intermediate", "duration": "3 oy", "lessons": 30, "price": 500000, "free": False, "lang": "uz", "students": 190, "rating": 4.9, "accent": "accent", "tags": ["react", "nextjs", "typescript", "frontend"], "desc": "React 19 va Next.js 15 asosida zamonaviy web ilovalar yaratish. TypeScript, Server Components, API routes."},
    {"title": "Django REST Framework", "inst": "Jamshid Qodirov", "cat": "Backend", "level": "intermediate", "duration": "2 oy", "lessons": 24, "price": 400000, "free": False, "lang": "uz", "students": 150, "rating": 4.8, "accent": "emerald", "tags": ["django", "python", "rest", "backend"], "desc": "Django va DRF yordamida REST API yaratish. Autentifikatsiya, ma'lumotlar bazasi, deploy."},
    {"title": "Machine Learning Intro", "inst": "Sardorbek Ahmadaliyev", "cat": "AI", "level": "intermediate", "duration": "3 oy", "lessons": 28, "price": 600000, "free": False, "lang": "uz", "students": 120, "rating": 4.9, "accent": "violet", "tags": ["ml", "python", "ai", "scikit-learn"], "desc": "Machine learning asoslari: regression, klassifikatsiya, clustering. Scikit-learn va pandas bilan amaliy loyihalar."},
    {"title": "Computer Vision Bootcamp", "inst": "Sardorbek Ahmadaliyev", "cat": "AI", "level": "advanced", "duration": "2 oy", "lessons": 20, "price": 800000, "free": False, "lang": "uz", "students": 60, "rating": 4.7, "accent": "accent", "tags": ["cv", "deep-learning", "pytorch", "ai"], "desc": "Kompyuter ko'rish: CNN, obyekt aniqlash, segmentatsiya. PyTorch va OpenCV bilan real loyihalar."},
    {"title": "Mobile Development with React Native", "inst": "Bobur Islomov", "cat": "Mobil", "level": "intermediate", "duration": "3 oy", "lessons": 30, "price": 500000, "free": False, "lang": "uz", "students": 85, "rating": 4.6, "accent": "emerald", "tags": ["react-native", "mobile", "typescript", "expo"], "desc": "iOS va Android uchun mobil ilovalar yaratish. React Native, Expo, Offline-first arxitektura."},
    {"title": "DevOps va Cloud Computing", "inst": "Behruz Mirzayev", "cat": "DevOps", "level": "advanced", "duration": "2 oy", "lessons": 20, "price": 700000, "free": False, "lang": "uz", "students": 45, "rating": 4.5, "accent": "cyan", "tags": ["docker", "kubernetes", "aws", "devops"], "desc": "Docker, Kubernetes, CI/CD, AWS cloud. Production tizimlarni deploy va monitoring qilish."},
    {"title": "Robototexnika va IoT", "inst": "Rustam Qayumov", "cat": "IoT", "level": "intermediate", "duration": "2 oy", "lessons": 20, "price": 0, "free": True, "lang": "uz", "students": 110, "rating": 4.8, "accent": "violet", "tags": ["arduino", "iot", "robotics", "raspberry-pi"], "desc": "Arduino va Raspberry Pi bilan amaliy robototexnika. Sensorlar, motorlar, IoT tizimlari."},
    {"title": "Data Science va Analitika", "inst": "Mavluda Xolmatova", "cat": "AI", "level": "intermediate", "duration": "2 oy", "lessons": 22, "price": 400000, "free": False, "lang": "uz", "students": 95, "rating": 4.7, "accent": "accent", "tags": ["data-science", "python", "pandas", "visualization"], "desc": "Ma'lumotlar tahlili, vizualizatsiya va statistika. Pandas, Matplotlib, Seaborn bilan amaliy loyihalar."},
]
for c in courses:
    slug = slugify(c["title"])
    Course.objects.create(
        slug=slug, title=c["title"], instructor=c["inst"], category=c["cat"],
        level=c["level"], duration=c["duration"], lessons=c["lessons"],
        price=c["price"], is_free=c["free"], lang=c["lang"],
        enrolled_count=c["students"], rating=c["rating"], accent=c["accent"],
        tags=c["tags"], description=c["desc"], status="active",
    )

# ── Tadbirlar ───────────────────────────────────────────────────────────────
events = [
    {"title": "AI Hackathon 2026", "type": "Hackathon", "date": "2026-07-15", "end": "2026-07-17", "loc": "Uychi IT Hub", "desc": "48 soatlik AI hackathon. AgriTech, EdTech va GovTech yo'nalishlarida AI yechimlar yaratish.", "speaker": "Sardorbek Ahmadaliyev", "prize": "$5,000", "seats": 120, "reg": 89, "accent": "accent", "tags": ["ai", "hackathon", "startup"], "status": "upcoming"},
    {"title": "Startup Demo Day", "type": "Meetup", "date": "2026-06-28", "loc": "Uychi IT Hub", "desc": "Rezident startaplar o'z loyihalarini investorlar va hamkorlarga taqdim etadi.", "speaker": "Akbar Tursunov", "prize": "", "seats": 80, "reg": 54, "accent": "violet", "tags": ["startup", "investor", "networking"], "status": "upcoming"},
    {"title": "Python Workshop: Web Scraping", "type": "Training", "date": "2026-06-20", "loc": "AI Laboratoriya", "desc": "BeautifulSoup, Scrapy va Selenium bilan veb-skrpying amaliy mashg'uloti.", "speaker": "Javohir Sobirov", "prize": "", "seats": 30, "reg": 25, "accent": "emerald", "tags": ["python", "workshop", "scraping"], "status": "upcoming"},
    {"title": "Sun'iy Intellekt Seminari", "type": "Training", "date": "2026-06-10", "loc": "Uychi tuman hokimligi", "desc": "Tuman hokimligida sun'iy intellekt yo'nalishida o'quv seminari. AI asoslari, amaliy qo'llanilish.", "speaker": "Sardorbek Ahmadaliyev", "prize": "", "seats": 50, "reg": 50, "accent": "violet", "tags": ["ai", "seminar", "education"], "status": "ongoing"},
    {"title": "AgriTech Innovatsiyalar Forumi", "type": "Conference", "date": "2026-08-10", "end": "2026-08-11", "loc": "Namangan shahri", "desc": "Qishloq xo'jaligidagi IT va AI innovatsiyalar. Xalqaro ekspertlar ishtirokida konferensiya.", "speaker": "Wei Zhang (ADB)", "prize": "", "seats": 200, "reg": 67, "accent": "emerald", "tags": ["agritech", "conference", "innovation"], "status": "upcoming"},
    {"title": "React Bootcamp: Production Apps", "type": "Bootcamp", "date": "2026-07-05", "loc": "IT Ta'lim Markazi", "desc": "4 kunlik intensiv React bootcamp. Real loyiha yaratish va deploy qilish.", "speaker": "Dilshod Rahimov", "prize": "", "seats": 25, "reg": 20, "accent": "cyan", "tags": ["react", "bootcamp", "frontend"], "status": "upcoming"},
    {"title": "Women in Tech: Networking Evening", "type": "Meetup", "date": "2026-06-15", "loc": "Coworking Markazi", "desc": "IT sohasidagi ayollar uchun networking kechasi. Tajriba almashish va mentorlik.", "speaker": "Nilufar Hasanova", "prize": "", "seats": 40, "reg": 35, "accent": "accent", "tags": ["women-in-tech", "networking", "mentorship"], "status": "upcoming"},
]
for e in events:
    slug = slugify(e["title"])
    end_date = datetime.datetime.strptime(e["end"], "%Y-%m-%d").date() if e.get("end") else None
    Event.objects.create(
        slug=slug, title=e["title"], event_type=e["type"],
        date=datetime.datetime.strptime(e["date"], "%Y-%m-%d").date(),
        end_date=end_date, location=e["loc"], description=e["desc"],
        speaker=e["speaker"], prize=e["prize"], seats=e["seats"],
        registered_count=e["reg"], accent=e["accent"], tags=e["tags"],
        status=e["status"],
    )

# ── Coworking joylari ───────────────────────────────────────────────────────
spaces = [
    {"name": "Open Desk", "type": "desk", "cap": 40, "hour": 15000, "day": 80000, "desc": "Ochiq maydondagi individual ish stoli. Yuqori tezlikli internet, choy va qahva bepul.", "acc": "accent", "amen": ["wi-fi", "coffee", "locker", "power"]},
    {"name": "Meeting Room A", "type": "meeting_room", "cap": 6, "hour": 50000, "day": 250000, "desc": "6 kishilik uchrashuv xonasi. 65\" ekran, Whiteboard, video konferensiya.", "acc": "violet", "amen": ["tv", "whiteboard", "zoom", "aircon"]},
    {"name": "Meeting Room B", "type": "meeting_room", "cap": 12, "hour": 80000, "day": 400000, "desc": "12 kishilik katta uchrashuv xonasi. Premium audio/video jihozlar.", "acc": "emerald", "amen": ["tv", "speaker", "whiteboard", "catering"]},
    {"name": "Private Office", "type": "private_office", "cap": 4, "hour": 0, "day": 300000, "desc": "4 kishilik shaxsiy ofis. Eshik yopiladigan, shaxsiy saqlash joyi.", "acc": "accent", "amen": ["door-lock", "locker", "wi-fi", "aircon"]},
    {"name": "AI Lab", "type": "lab", "cap": 10, "hour": 30000, "day": 150000, "desc": "GPU klasterli AI laboratoriya. RTX 4090, Linux terminal, TensorFlow/PyTorch.", "acc": "violet", "amen": ["gpu", "linux", "big-screen", "coffee"]},
    {"name": "Conference Hall", "type": "conference_hall", "cap": 200, "hour": 300000, "day": 1500000, "desc": "200 o'rinli konferens zali. LED ekran, professional audio, sahna.", "acc": "emerald", "amen": ["stage", "led-screen", "sound-system", "recording"]},
]
for sp in spaces:
    slug = slugify(sp["name"])
    CoworkingSpace.objects.create(
        slug=slug, name=sp["name"], space_type=sp["type"], capacity=sp["cap"],
        price_per_hour=sp["hour"], price_per_day=sp["day"],
        description=sp["desc"], accent=sp["acc"], amenities=sp["amen"],
        is_active=True,
    )

# ── Student profillari ──────────────────────────────────────────────────────
students_data = [
    {"name": "Javohir Sobirov", "email": "javohir.sobirov@student.uz", "role": "graduate", "bio": "Python va AI bo'yicha full-stack dasturchi. EduCore UZ platformasida tajriba o'tagan.", "course": "Python Full Stack", "spec": "Backend", "score": 98, "rank": 1, "projects": 12, "certs": 5, "github": "https://github.com/javohir", "skills": ["Python", "Django", "React", "PostgreSQL", "Docker"], "accent": "accent", "featured": True, "achievements": [
        {"title": "AI Hackathon 2026 G'olibi", "desc": "$5,000 mukofot va 6 oylik inkubatsiya", "cat": "hackathon", "icon": "🏆"},
        {"title": "Microsoft Learn Ambassador", "desc": "Azure va AI bo'yicha sertifikatlangan", "cat": "certification", "icon": "📜"},
        {"title": "10+ Open Source Loyiha", "desc": "GitHub'da 10+ ochiq kodli loyiha", "cat": "development", "icon": "💻"},
    ]},
    {"name": "Nilufar Hasanova", "email": "nilufar.h@student.uz", "role": "graduate", "bio": "EdTech sohasida tajribali full-stack dasturchi. EduCore UZ asoschisi.", "course": "Frontend + Backend", "spec": "Full Stack", "score": 96, "rank": 2, "projects": 8, "certs": 6, "github": "https://github.com/nilufar", "skills": ["React", "Node.js", "TypeScript", "MongoDB", "React Native"], "accent": "violet", "featured": True, "achievements": [
        {"title": "EduCore UZ Asoschisi", "desc": "140 maktabda 28,000+ o'quvchi", "cat": "startup", "icon": "🚀"},
        {"title": "IT Park Rezidenti", "desc": "IT Park tomonidan qo'llab-quvvatlanadi", "cat": "recognition", "icon": "⭐"},
        {"title": "UNICEF Ta'lim Dasturi", "desc": "Oflayn ta'lim platformasi uchun grant", "cat": "grant", "icon": "🎯"},
    ]},
    {"name": "Shuhrat Razzaqov", "email": "shuhrat.r@student.uz", "role": "student", "bio": "Logistika sohasida AI muhandisi. NamLogist startapi asoschisi.", "course": "AI/ML", "spec": "Machine Learning", "score": 88, "rank": 3, "projects": 6, "certs": 3, "github": "https://github.com/shuhrat", "skills": ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Docker"], "accent": "emerald", "featured": True, "achievements": [
        {"title": "Yoshlar Tech Challenge Finalisti", "desc": "Logistika AI loyihasi bilan final", "cat": "competition", "icon": "🎖️"},
        {"title": "Agile/Scrum Sertifikati", "desc": "Certified Scrum Master", "cat": "certification", "icon": "📜"},
    ]},
    {"name": "Aziza Yuldasheva", "email": "aziza.y@student.uz", "role": "graduate", "bio": "MedTech sohasida dasturchi. MediNet Uychi startapi asoschisi.", "course": "Mobile Development", "spec": "React Native", "score": 85, "rank": 4, "projects": 5, "certs": 4, "github": "https://github.com/aziza", "skills": ["React Native", "Firebase", "Node.js", "TypeScript", "UI/UX"], "accent": "accent", "featured": False, "achievements": [
        {"title": "MediNet UZ Ishga Tushdi", "desc": "5,000+ bemor xizmatida", "cat": "startup", "icon": "🚀"},
        {"title": "Google UX Design Sertifikati", "desc": "Coursera orqali olingan", "cat": "certification", "icon": "📜"},
    ]},
    {"name": "Dilmurod To'xtayev", "email": "dilmurod.t@student.uz", "role": "student", "bio": "IoT va Computer Vision bo'yicha muhandis. SmartPack startapi asoschisi.", "course": "DevOps", "spec": "IoT", "score": 82, "rank": 5, "projects": 7, "certs": 2, "github": "https://github.com/dilmurod", "skills": ["Python", "C++", "TensorFlow", "Arduino", "Docker"], "accent": "violet", "featured": False, "achievements": [
        {"title": "IoT Innovatsiya Mukofoti", "desc": "SmartPack loyihasi bilan", "cat": "award", "icon": "🏅"},
    ]},
    {"name": "Gulnoza Karimova", "email": "gulnoza.k@student.uz", "role": "student", "bio": "FinTech sohasida dasturchi. O'zbekistonda moliyaviy texnologiyalarni rivojlantirishga qiziqadi.", "course": "Data Science", "spec": "FinTech", "score": 78, "rank": 6, "projects": 4, "certs": 2, "github": "https://github.com/gulnoza", "skills": ["Python", "SQL", "Pandas", "Blockchain", "React"], "accent": "emerald", "featured": False, "achievements": [
        {"title": "Data Science Bootcamp", "desc": "4 oylik intensiv kurs", "cat": "education", "icon": "🎓"},
    ]},
]
for sd in students_data:
    student = StudentProfile.objects.create(
        full_name=sd["name"], email=sd["email"], role=sd["role"],
        bio=sd["bio"], course=sd["course"], specialization=sd["spec"],
        score=sd["score"], rank=sd["rank"], projects_count=sd["projects"],
        certificates_count=sd["certs"], github_url=sd["github"],
        skills=sd["skills"], accent=sd["accent"], is_featured=sd["featured"],
        is_active=True,
    )
    for ach in sd["achievements"]:
        Achievement.objects.create(
            student=student, title=ach["title"], description=ach["desc"],
            category=ach["cat"], icon=ach["icon"],
            date=datetime.date.today() - datetime.timedelta(days=len(sd["achievements"]) * 30),
        )

# ── SEO ─────────────────────────────────────────────────────────────────────
for s in [
    {"path": "/", "title": "Uychi AI & IT Hub — Namangan Viloyatining Texnologiya Markazi", "desc": "Uychi tumanidagi zamonaviy AI va IT Markaz. Startup inkubatoru, coworking, ta'lim va investitsiya imkoniyatlari.", "kw": "Uychi IT Hub, Namangan texnologiya, AI markaz, startup inkubatoru, coworking Namangan", "score": 92, "issues": 1},
    {"path": "/news", "title": "Yangiliklar — Uychi AI & IT Hub", "desc": "Uychi IT Hubning so'nggi yangiliklari, hamkorliklar va yutuqlari. AI, ta'lim, startap ekotizim yangiliklari.", "kw": "Uychi IT yangiliklar, Namangan IT, texnologiya yangiliklari, AI O'zbekiston", "score": 84, "issues": 3},
    {"path": "/startups", "title": "Startaplar — Uychi AI & IT Hub", "desc": "Uychi IT Hub rezident startaplari. AgriTech, EdTech, GovTech va MedTech yo'nalishlaridagi innovasion loyihalar.", "kw": "Uychi startaplar, Namangan IT, AgriTech, EdTech, GovTech startaplar", "score": 82, "issues": 3},
    {"path": "/jobs", "title": "Ish O'rinlari — Uychi AI & IT Hub", "desc": "Uychi IT Hubdagi IT ish o'rinlari va stajyorlik imkoniyatlari. Dasturchi, AI muhandis, dizayner va boshqa vakansiyalar.", "kw": "IT ish Namangan, dasturchi ish o'rni, AI muhandis, Namangan vakansiya", "score": 85, "issues": 3},
    {"path": "/partners", "title": "Hamkorlar — Uychi AI & IT Hub", "desc": "Uychi IT Hubning davlat, xalqaro va korporativ hamkorlari. IT Park, Microsoft, AWS, Google, Huawei.", "kw": "Uychi hamkorlar, IT Park, Microsoft, AWS, KOICA, ADB, Huawei", "score": 78, "issues": 5},
    {"path": "/apply/startup", "title": "Startup Ariza — Uychi AI & IT Hub", "desc": "Uychi IT Hub startup inkubatoriga ariza topshiring. Inkubatsiya, mentorlik va investitsiya imkoniyatlari.", "kw": "startup ariza, inkubator, Uychi IT, Namangan startup", "score": 86, "issues": 2},
    {"path": "/education", "title": "Kurslar — Uychi AI & IT Hub", "desc": "IT va AI yo'nalishidagi o'quv kurslari. Python, React, Django, ML, Computer Vision va boshqa zamonaviy texnologiyalar.", "kw": "IT kurslar Namangan, Python kursi, AI kursi, dasturlash o'rganish, Uychi ta'lim", "score": 80, "issues": 4},
    {"path": "/events", "title": "Tadbirlar — Uychi AI & IT Hub", "desc": "Uychi IT Hubda bo'lib o'tadigan tadbirlar: hackathonlar, seminarlar, bootcamplar va konferensiyalar.", "kw": "Uychi tadbirlar, IT tadbirlar, hackathon Namangan, seminarlar", "score": 76, "issues": 5},
    {"path": "/coworking", "title": "Coworking — Uychi AI & IT Hub", "desc": "Zamonaviy coworking maydon. Open desk, meeting room, AI lab va konferens zali. Soatlik va kunlik bron.", "kw": "coworking Namangan, ish joyi, meeting room, IT coworking Uychi", "score": 73, "issues": 6},
]:
    SEOPage.objects.create(
        path=s["path"], title=s["title"], description=s["desc"],
        keywords=s["kw"], score=s["score"], issues=s["issues"],
    )

# ── Kontakt so'rovlari ──────────────────────────────────────────────────────
for c in [
    {"name": "Sardorbek Ahmadaliyev", "company": "Uychi tuman hokimligi", "country": "O'zbekiston", "email": "s.ahmadaliyev@uychi.uz", "phone": "+998998887766", "msg": "Hub bilan hamkorlik qilish bo'yicha taklifim bor. Sun'iy intellekt yo'nalishida qo'shma loyihalar amalga oshirish mumkin.", "read": True},
    {"name": "Park Jiyeon", "company": "KOICA", "country": "Janubiy Koreya", "email": "jiyeon.park@koica.go.kr", "phone": "+821012345678", "msg": "We are interested in partnering with Uychi IT Hub for digital transformation projects in Namangan region.", "read": True},
    {"name": "Alex Johnson", "company": "Techstars", "country": "AQSh", "email": "alex@techstars.com", "phone": "+12025551234", "msg": "Would like to discuss accelerator program partnership opportunities.", "read": False},
    {"name": "Olimjon Xakimov", "company": "Namangan Davlat Universiteti", "country": "O'zbekiston", "email": "olimjon@namdu.uz", "phone": "+998903332211", "msg": "Talabalarimiz uchun amaliyot va tajriba almashish dasturlarini yo'lga qo'yishni taklif qilamiz.", "read": False},
]:
    ContactSubmission.objects.create(name=c["name"], company=c["company"], country=c["country"], email=c["email"], phone=c["phone"], message=c["msg"], is_read=c["read"])

# ── Uchrashuv so'rovlari ─────────────────────────────────────────────────────
dt = datetime.date.today() + datetime.timedelta(days=7)
for m in [
    {"name": "Wei Zhang", "email": "wzhang@adb.org", "company": "ADB Ventures", "phone": "+6321234567", "date": dt.isoformat(), "time": "10:00", "platform": "zoom", "topic": "AgriTech investment discussion", "msg": "Interested in learning more about AgroSmart Uychi and potential follow-on investment.", "read": True},
    {"name": "Nigora Alijonova", "email": "n.alijonova@undp.org", "company": "UNDP O'zbekiston", "phone": "+998909991122", "date": (dt + datetime.timedelta(days=1)).isoformat(), "time": "14:30", "platform": "meet", "topic": "SDG va raqamlashtirish bo'yicha hamkorlik", "msg": "UNDPning raqamlashtirish dasturlari doirasida hamkorlik imkoniyatlarini muhokama qilish.", "read": False},
]:
    MeetingRequest.objects.create(name=m["name"], email=m["email"], company=m["company"], phone=m["phone"], date=m["date"], time=m["time"], platform=m["platform"], topic=m["topic"], message=m["msg"], is_read=m["read"])

# ── Obunachilar ──────────────────────────────────────────────────────────────
for sub in [
    {"email": "akbar@agrosmart.uz", "name": "Akbar Tursunov"},
    {"email": "nilufar@educore.uz", "name": "Nilufar Hasanova"},
    {"email": "jamshid@govtrack.uz", "name": "Jamshid Qodirov"},
    {"email": "info@uychi.uz", "name": "Uychi Hub"},
    {"email": "n.alijonova@undp.org", "name": "Nigora Alijonova"},
]:
    Subscriber.objects.create(email=sub["email"], name=sub["name"], is_active=True)

# ── Media ────────────────────────────────────────────────────────────────────
for media in [
    {"name": "Hub Coworking", "type": "image", "alt": "Uychi IT Hub coworking maydoni"},
    {"name": "AI Hackathon 1", "type": "image", "alt": "AI Hackathon 2026 ishtirokchilari"},
    {"name": "Opening Ceremony", "type": "image", "alt": "Uychi IT Hub rasmiy ochilishi"},
    {"name": "Startup Pitch", "type": "video", "alt": "Startuplar taqdimoti"},
    {"name": "Hub Brochure", "type": "document", "alt": "Uychi IT Hub broshyurasi"},
]:
    MediaItem.objects.create(name=media["name"], media_type=media["type"], alt_text=media["alt"])

# ── Tizim jurnallari ────────────────────────────────────────────────────────
logs = [
    ("Tizimga kirish", "admin@uychi.uz", "Super Admin", "185.212.45.10", "info", "Auth", "2026-06-14 09:32:18"),
    ("Sun'iy Intellekt seminari e'loni nashr etildi", "editor@uychi.uz", "Muharrir", "185.212.45.22", "success", "Yangiliklar", "2026-06-13 18:15:42"),
    ("AgroSmart Uychi arizasi tasdiqlandi", "admin@uychi.uz", "Super Admin", "185.212.45.10", "success", "Startaplar", "2026-06-12 09:15:42"),
    ("Yangi yangilik maqolasi nashr qilindi", "editor@uychi.uz", "Muharrir", "185.212.45.22", "info", "Yangiliklar", "2026-06-12 08:44:05"),
    ("Noma'lum tizimga kirish urinishi", "—", "—", "91.234.56.78", "warning", "Auth", "2026-06-11 22:30:00"),
    ("Ma'lumotlar bazasi zahira nusxasi yaratildi", "system", "Tizim", "127.0.0.1", "success", "Zahira", "2026-06-11 03:00:00"),
    ("Yangi hamkor qo'shildi: KOICA", "admin@uychi.uz", "Super Admin", "185.212.45.10", "info", "Hamkorlar", "2026-06-11 11:22:33"),
    ("SSL sertifikat yangilandi", "system", "Tizim", "127.0.0.1", "success", "Tizim", "2026-06-10 22:15:00"),
    ("Yangi foydalanuvchi yaratildi", "admin@uychi.uz", "Super Admin", "185.212.45.10", "info", "Foydalanuvchilar", "2026-06-10 14:05:44"),
    ("API so'rov chegarasi oshirildi", "api-client-5", "API", "203.0.113.42", "warning", "API", "2026-06-10 10:30:00"),
    ("Ish e'loni nashr qilindi: AI Muhandis", "hr@uychi.uz", "HR Menejeri", "185.212.45.30", "info", "Martabalar", "2026-06-10 09:15:30"),
    ("Investor holati o'zgartirildi", "admin@uychi.uz", "Super Admin", "185.212.45.10", "info", "Investorlar", "2026-06-09 17:42:18"),
    ("Zahira tekshiruvi muvaffaqiyatsiz", "system", "Tizim", "127.0.0.1", "error", "Zahira", "2026-06-09 03:00:00"),
    ("CodingBard 10K foydalanuvchiga yetdi", "admin@uychi.uz", "Super Admin", "185.212.45.10", "success", "Startaplar", "2026-06-08 14:22:10"),
    ("AI Hackathon 2026 e'loni chiqdi", "editor@uychi.uz", "Muharrir", "185.212.45.22", "info", "Tadbirlar", "2026-06-08 11:00:00"),
]
for action, user, role, ip, level, module, ts in logs:
    dt = datetime.datetime.strptime(ts, "%Y-%m-%d %H:%M:%S")
    SystemLog.objects.create(action=action, user=user, role=role, ip_address=ip, level=level, module=module, timestamp=dt)

# ── Yakuniy hisobot ─────────────────────────────────────────────────────────
print("\n✓ Seed yakunlandi! Uychi AI & IT Hub uchun to'liq real ma'lumotlar saqlandi.")
print(f"  Infratuzilma: {Infrastructure.objects.count()} ta")
print(f"  Afzalliklar: {Perk.objects.count()} ta")
print(f"  Statistika: {Stat.objects.count()} ta")
print(f"  Bosh sahifa startaplari: {HomepageStartup.objects.count()} ta")
print(f"  Startup arizalari: {StartupApplication.objects.count()} ta")
print(f"  Investorlar: {Investor.objects.count()} ta")
print(f"  Hamkorlar: {Partner.objects.count()} ta")
print(f"  Yangiliklar: {Article.objects.count()} ta")
print(f"  Ish o'rinlari: {JobPosting.objects.count()} ta")
print(f"  Kurslar: {Course.objects.count()} ta")
print(f"  Tadbirlar: {Event.objects.count()} ta")
print(f"  Coworking joylari: {CoworkingSpace.objects.count()} ta")
print(f"  Studentlar: {StudentProfile.objects.count()} ta")
print(f"  Yutuqlar: {Achievement.objects.count()} ta")
print(f"  SEO sahifalari: {SEOPage.objects.count()} ta")
print(f"  Kontakt so'rovlari: {ContactSubmission.objects.count()} ta")
print(f"  Uchrashuv so'rovlari: {MeetingRequest.objects.count()} ta")
print(f"  Obunachilar: {Subscriber.objects.count()} ta")
print(f"  Media fayllar: {MediaItem.objects.count()} ta")
print(f"  Tizim jurnallari: {SystemLog.objects.count()} ta")
print(f"  Admin: admin / admin123")
