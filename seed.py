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
from apps.careers.models import JobPosting
from apps.seo.models import SEOPage
from apps.logs.models import SystemLog
from django.contrib.auth.models import User
from django.utils.text import slugify
import datetime

# ── Admin foydalanuvchi ─────────────────────────────────────────────────────
if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser("admin", "admin@uychi.uz", "admin123")

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
SEOPage.objects.all().delete()
SystemLog.objects.all().delete()

# ── Infratuzilma ────────────────────────────────────────────────────────────
for i, item in enumerate([
    {
        "title": "Coworking Markazi",
        "desc": "80+ ish o'rinli zamonaviy coworking maydon. Yuqori tezlikli internet, yopiq kabinalar va hamkorlik zonalari.",
        "accent": "accent",
    },
    {
        "title": "AI va Dasturlash Laboratoriyasi",
        "desc": "GPU klasterli AI tadqiqot laboratoriyasi. Machine learning, kompyuter ko'rish va NLP loyihalari uchun jihozlangan.",
        "accent": "violet",
    },
    {
        "title": "Startup Inkubatoru",
        "desc": "Dastlabki bosqich startaplarga mentorlik, moliyaviy ko'mak va bozorga chiqish dasturlari.",
        "accent": "emerald",
    },
    {
        "title": "IT Ta'lim Markazi",
        "desc": "Frontend, Backend, Mobile va DevOps yo'nalishlarida intensiv kurslar va sertifikat dasturlari.",
        "accent": "accent",
    },
    {
        "title": "Konferens va Tadbirlar Zali",
        "desc": "200 o'rinli zamonaviy zal. Xalqaro konferensiyalar, hackathonlar va demo day tadbirlari uchun.",
        "accent": "violet",
    },
]):
    Infrastructure.objects.create(title=item["title"], description=item["desc"], accent=item["accent"], order=i + 1)

# ── Afzalliklar (Perks) ─────────────────────────────────────────────────────
for i, p in enumerate([
    {"symbol": "↓", "title": "Soliq imtiyozlari", "desc": "IT Park a'zolari uchun 10 yil davomida 0% korporativ soliq va 0% ijtimoiy to'lovlar. Import bojsiz uskunalar."},
    {"symbol": "◈", "title": "Malakali kadrlar", "desc": "Namangan viloyatida yiliga 5,000+ texnik mutaxassis yetishtiriladi. Kuchli matematika va muhandislik an'analari."},
    {"symbol": "◇", "title": "Davlat ko'magi", "desc": "Viloyat hokimligi va Uychi tuman hokimligining to'liq ko'magi. Tezlashtirilgan litsenziyalash va ruxsatnomalar."},
    {"symbol": "⊕", "title": "Strategik joylashuv", "desc": "Namangan – O'zbekistonning to'qimachilik va texnologiya markazi. Toshkent bilan qulay temir yo'l va avtomobil aloqasi."},
]):
    Perk.objects.create(symbol=p["symbol"], title=p["title"], description=p["desc"], order=i + 1)

# ── Statistika ──────────────────────────────────────────────────────────────
for i, s in enumerate([
    {"label": "IT Startaplari", "value": "24", "suffix": "+"},
    {"label": "Faol foydalanuvchilar", "value": "3", "suffix": "K+"},
    {"label": "Yaratilgan ish o'rinlari", "value": "350", "suffix": "+"},
    {"label": "Hamkor tashkilotlar", "value": "18", "suffix": "+"},
    {"label": "AI yechimlari", "value": "12", "suffix": "+"},
]):
    Stat.objects.create(label=s["label"], value=s["value"], suffix=s["suffix"], order=i + 1)

# ── Bosh sahifa startaplari ─────────────────────────────────────────────────
for i, s in enumerate([
    {
        "sector": "AgriTech AI",
        "tagline": "Aqlli qishloq xo'jaligi — aniq sug'orish",
        "problem": "Uychi tumanida suv tanqisligi va an'anaviy sug'orish usullari hosildorlikni 30–40% kamaytiradi.",
        "solution": "IoT sensorlar va sun'iy yo'ldosh tasvirlari asosida real vaqt sug'orish monitoringi va AI prognozi.",
        "tech": "IoT, Satellite Imagery, Predictive ML, Django",
        "accent": "emerald",
        "pml": "Fermerlar", "pmv": "1,200+",
        "sml": "Gektarlar", "smv": "8,500",
    },
    {
        "sector": "EdTech AI",
        "tagline": "Maktab ta'limini raqamlashtirish",
        "problem": "Qishloq maktablarida sifatli o'qituvchi va zamonaviy o'quv resurslarining yetishmasligi.",
        "solution": "Oflayn rejimda ishlaydigan o'zbek tilidagi interaktiv ta'lim platformasi va AI o'qituvchi yordamchisi.",
        "tech": "React Native, AI Tutor, Offline Sync, Node.js",
        "accent": "accent",
        "pml": "O'quvchilar", "pmv": "28,000+",
        "sml": "Maktablar", "smv": "140+",
    },
    {
        "sector": "GovTech",
        "tagline": "Fuqaro murojaatlarini avtomatlashtirish",
        "problem": "Tuman hokimligiga keladigan murojaatlar qog'oz shaklida — sekin, shaffof emas va kuzatib bo'lmaydi.",
        "solution": "AI asosidagi murojaatlar platformasi: Telegram bot, web va mobil orqali ariza topshirish va real vaqt monitoring.",
        "tech": "Next.js, Node.js, PostgreSQL, Telegram Bot API",
        "accent": "violet",
        "pml": "Murojaatlar", "pmv": "12,000+",
        "sml": "O'rtacha javob", "smv": "4.2 soat",
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
    {"name": "AgroSmart Uychi", "sector": "AgriTech AI", "stage": "Seed", "status": "approved", "founder": "Akbar Tursunov", "email": "akbar@agrosmart.uz", "team": 8, "funding": "$120,000", "desc": "IoT sensorlar va sun'iy yo'ldosh tasvirlari asosida paxta va bug'doy dalalarida aniq sug'orish tizimi.", "tech": "IoT, Satellite Data, Predictive ML, Django", "country": "O'zbekiston"},
    {"name": "EduCore UZ", "sector": "EdTech AI", "stage": "Pre-Seed", "status": "approved", "founder": "Nilufar Hasanova", "email": "nilufar@educore.uz", "team": 12, "funding": "$45,000", "desc": "Oflayn rejimda ishlaydigan o'zbek tilidagi ta'lim platformasi. 140+ maktab bilan ishlaydi.", "tech": "React Native, AI Tutor, Offline Sync, Node.js", "country": "O'zbekiston"},
    {"name": "GovTrack UZ", "sector": "GovTech", "stage": "MVP", "status": "approved", "founder": "Jamshid Qodirov", "email": "jamshid@govtrack.uz", "team": 10, "funding": "$60,000", "desc": "Mahalliy hokimliklar uchun fuqarolar murojaatlarini avtomatlashtiradigan platforma.", "tech": "Next.js, Node.js, PostgreSQL, Telegram Bot", "country": "O'zbekiston"},
    {"name": "MediNet Uychi", "sector": "MedTech AI", "stage": "Pre-Seed", "status": "approved", "founder": "Aziza Yuldasheva", "email": "aziza@medinet.uz", "team": 6, "funding": "$30,000", "desc": "Qishloq shifokorlariga telemedikal konsultatsiya va AI diagnostika yordami.", "tech": "Telemedicine, AI Diagnostics, React Native, Firebase", "country": "O'zbekiston"},
    {"name": "NamLogist", "sector": "Logistics AI", "stage": "MVP", "status": "review", "founder": "Shuhrat Razzaqov", "email": "shuhrat@namlogist.uz", "team": 5, "funding": "—", "desc": "Namangan–Toshkent yo'nalishidagi yuk tashishni AI orqali optimallashtiradigan B2B platforma.", "tech": "Route Optimization, ML, Real-time GPS, FastAPI", "country": "O'zbekiston"},
    {"name": "TextileAI", "sector": "Industry AI", "stage": "Idea", "status": "pending", "founder": "Behruz Mirzayev", "email": "behruz@textileai.uz", "team": 3, "funding": "—", "desc": "Namangan to'qimachilik zavodlari uchun kompyuter ko'rish asosidagi sifat nazorati.", "tech": "Computer Vision, PyTorch, Edge AI, Raspberry Pi", "country": "O'zbekiston"},
    {"name": "SolarNav", "sector": "CleanTech AI", "stage": "Pre-Seed", "status": "pending", "founder": "Oybek Nazarov", "email": "oybek@solarnav.uz", "team": 4, "funding": "$25,000", "desc": "Namangan viloyatidagi quyosh energiyasi panellarini AI orqali boshqarish va optimallashtirish tizimi.", "tech": "IoT, Solar Analytics, Python, FastAPI", "country": "O'zbekiston"},
    {"name": "WaterSense UZ", "sector": "AgriTech AI", "stage": "Idea", "status": "pending", "founder": "Mavluda Xolmatova", "email": "mavluda@watersense.uz", "team": 2, "funding": "—", "desc": "Tuproq namligi sensorlari va ob-havo ma'lumotlari asosida sug'orish jadvalini avtomatlashtirishchi.", "tech": "IoT Sensors, Weather API, ML, Arduino", "country": "O'zbekiston"},
]:
    StartupApplication.objects.create(
        startup_name=s["name"], sector=s["sector"], stage=s["stage"],
        status=s["status"], founder_name=s["founder"], email=s["email"],
        team_size=s["team"], funding_needed=s["funding"],
        description=s["desc"], tech_stack=s["tech"], country=s["country"],
    )

# ── Investorlar ─────────────────────────────────────────────────────────────
for inv in [
    {"company": "Navoiy Investitsiya Fondi", "country": "O'zbekiston", "type": "Regional Fund", "ticket": "$50K–$500K", "sectors": "AgriTech, GovTech, EdTech", "status": "active", "contact": "Sarvar Nazarov", "email": "sarvar@navoiy-invest.uz"},
    {"company": "Uzbek Ventures", "country": "O'zbekiston", "type": "VC Fund", "ticket": "$100K–$1M", "sectors": "AI, SaaS, Fintech", "status": "active", "contact": "Dilnoza Umarova", "email": "d.umarova@uzbekventures.uz"},
    {"company": "ADB Ventures", "country": "Filippin", "type": "Development VC", "ticket": "$500K–$3M", "sectors": "AgriTech, CleanTech, EdTech", "status": "active", "contact": "Wei Zhang", "email": "wzhang@adb.org"},
    {"company": "KOICA Innovation", "country": "Janubiy Koreya", "type": "Development Fund", "ticket": "Grant", "sectors": "AgriTech, Education, Health", "status": "negotiation", "contact": "Park Jiyeon", "email": "jiyeon.park@koica.go.kr"},
    {"company": "UNDP O'zbekiston", "country": "O'zbekiston", "type": "Development Organization", "ticket": "Grant", "sectors": "GovTech, SDG, Climate", "status": "active", "contact": "Nigora Alijonova", "email": "n.alijonova@undp.org"},
    {"company": "Techstars Central Asia", "country": "AQSh", "type": "Accelerator", "ticket": "$100K–$200K", "sectors": "AI, DeepTech, SaaS", "status": "due_diligence", "contact": "Sarah Johnson", "email": "sarah@techstars.com"},
    {"company": "IFC World Bank", "country": "AQSh", "type": "Development Finance", "ticket": "$1M–$10M", "sectors": "Finance, Infrastructure", "status": "active", "contact": "David Peterson", "email": "dp@ifc.org"},
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
]:
    Partner.objects.create(name=p["name"], country=p["country"], category=p["category"], tier=p["tier"])

# ── Yangiliklar ─────────────────────────────────────────────────────────────
articles = [
    {"title": "Uychi AI & IT Hub rasmiy ochildi", "category": "E'lon", "status": "published", "views": 5840, "author": "Tahririyat", "excerpt": "Namangan viloyatining Uychi tumanida zamonaviy AI va IT Markaz rasmiy tadbirda ochildi. Viloyat hokimi va IT Park O'zbekiston rahbariyati ishtirokida bo'lib o'tgan marosimdda 80+ ish o'rinli coworking, AI laboratoriyasi va startup inkubatori tantanali ochildi.", "content": "Namangan viloyatining Uychi tumanida zamonaviy AI va IT Markaz rasmiy tadbirda ochildi. Viloyat hokimi va IT Park O'zbekiston rahbariyati ishtirokida bo'lib o'tgan marosimdda 80+ ish o'rinli coworking, AI laboratoriyasi va startup inkubatori tantanali ochildi. Bu markaz tuman iqtisodiyotini raqamlashtirish va yoshlar bandligini oshirishga katta hissa qo'shishi kutilmoqda."},
    {"title": "Microsoft Startups dasturiga Uychi IT Hub qabul qilindi", "category": "Hamkorlik", "status": "published", "views": 3214, "author": "Tahririyat", "excerpt": "Microsoft Startups Founders Hub dasturiga qabul qilinishimiz bilan hub rezidentlari $150,000 gacha Azure kredit, GitHub Enterprise va Microsoft 365 imkoniyatlaridan bepul foydalana oladi.", "content": "Microsoft Startups Founders Hub dasturiga qabul qilinishimiz bilan hub rezidentlari $150,000 gacha Azure kredit, GitHub Enterprise va Microsoft 365 imkoniyatlaridan bepul foydalana oladi."},
    {"title": "AgroSmart Uychi startapi $120,000 investitsiya jalb qildi", "category": "Startap", "status": "published", "views": 2891, "author": "Tahririyat", "excerpt": "Uychi IT Hub rezidenti AgroSmart Uychi startapi Navoiy Investitsiya Fondidan $120,000 seed investitsiya jalb qildi. Startap IoT sensorlar va sun'iy yo'ldosh tasvirlari asosida paxta va bug'doy dalalarida aniq sug'orish tizimini ishlab chiqadi.", "content": "Uychi IT Hub rezidenti AgroSmart Uychi startapi Navoiy Investitsiya Fondidan $120,000 seed investitsiya jalb qildi."},
    {"title": "IT Park O'zbekiston Uychi tuman uchun 10 yillik imtiyozlar e'lon qildi", "category": "Siyosat", "status": "published", "views": 4102, "author": "Tahririyat", "excerpt": "IT Park O'zbekiston Uychi tumanidagi texnologiya kompaniyalari uchun 10 yil davomida 0% korporativ soliq, 0% ijtimoiy to'lovlar va bojsiz uskunalar importi imtiyozlarini rasmiy tasdiqladi.", "content": "IT Park O'zbekiston Uychi tumanidagi texnologiya kompaniyalari uchun 10 yil davomida 0% korporativ soliq, 0% ijtimoiy to'lovlar va bojsiz uskunalar importi imtiyozlarini rasmiy tasdiqladi."},
    {"title": "Uychi Youth Code: 200 o'quvchi dasturlash kurslarini boshladi", "category": "Ta'lim", "status": "published", "views": 2156, "author": "Tahririyat", "excerpt": "Uychi IT Hub tashabbusi bilan 10–18 yoshli 200 nafar o'quvchi bepul dasturlash kurslarini boshladi. Python, Web-dizayn va robototexnika yo'nalishlarida 6 oylik kurs IT Park va UNICEF qo'llab-quvvatlovi ostida amalga oshirilmoqda.", "content": "Uychi IT Hub tashabbusi bilan 10–18 yoshli 200 nafar o'quvchi bepul dasturlash kurslarini boshladi."},
    {"title": "Uychi tuman hokimligi raqamli xizmatlar platformasini ishga tushirdi", "category": "GovTech", "status": "published", "views": 3487, "author": "Tahririyat", "excerpt": "Uychi tuman hokimligi IT Hub rezidenti GovTrack UZ ishlab chiqqan raqamli xizmatlar platformasini rasmiy ishga tushirdi. Endi fuqarolar 15 ta tuman xizmatiga onlayn murojaat qila oladi.", "content": "Uychi tuman hokimligi IT Hub rezidenti GovTrack UZ ishlab chiqqan raqamli xizmatlar platformasini rasmiy ishga tushirdi."},
    {"title": "Namangan viloyatida birinchi AI hackathon o'tkazildi", "category": "Tadbir", "status": "published", "views": 1894, "author": "Tahririyat", "excerpt": "Uychi IT Hubda 48 soatlik AI Hackathon bo'lib o'tdi. 120 ishtirokchi, 24 jamoa va 6 ta finalist loyiha. G'olib jamoaga $5,000 mukofot va 6 oylik inkubatsiya dasturiga qabul qilindi.", "content": "Uychi IT Hubda 48 soatlik AI Hackathon bo'lib o'tdi. 120 ishtirokchi, 24 jamoa va 6 ta finalist loyiha."},
    {"title": "EduCore UZ platformasi 28,000 o'quvchiga yetib bordi", "category": "Startap", "status": "published", "views": 2103, "author": "Tahririyat", "excerpt": "Uychi IT Hub rezidenti EduCore UZ oflayn ta'lim platformasi Namangan viloyatidagi 140 maktabda 28,000+ o'quvchiga xizmat ko'rsatmoqda.", "content": "Uychi IT Hub rezidenti EduCore UZ oflayn ta'lim platformasi Namangan viloyatidagi 140 maktabda 28,000+ o'quvchiga xizmat ko'rsatmoqda."},
    {"title": "Koreya KOICA delegatsiyasi Uychi IT Hubni ziyorat qildi", "category": "Hamkorlik", "status": "published", "views": 1456, "author": "Tahririyat", "excerpt": "Koreya Xalqaro Hamkorlik Agentligi (KOICA) vakillari Uychi IT Hubni ziyorat qilib, AgriTech va ta'lim sohasidagi startaplar bilan grant hamkorlik imkoniyatlarini muhokama qildi.", "content": "Koreya Xalqaro Hamkorlik Agentligi (KOICA) vakillari Uychi IT Hubni ziyorat qildi."},
    {"title": "Uychi IT Hubda yangi AI kurs dasturi boshlanadi", "category": "Ta'lim", "status": "draft", "views": 0, "author": "Tahririyat", "excerpt": "2026-yil iyul oyidan boshlab Uychi IT Hubda Machine Learning, Computer Vision va NLP yo'nalishlarida 4 oylik intensiv kurs dasturi boshlanadi.", "content": "2026-yil iyul oyidan boshlab Uychi IT Hubda Machine Learning, Computer Vision va NLP yo'nalishlarida 4 oylik intensiv kurs dasturi boshlanadi."},
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
    {"title": "Senior Frontend Dasturchi", "dept": "Muhandislik", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 18, "salary": "5,000,000–9,000,000 so'm", "desc": "React, Next.js va TypeScript asosida zamonaviy web ilovalar yaratish. AI asosidagi produktlarni ishlab chiqishda ishtirok.", "req": "React 3+ yil, TypeScript, REST API, Git"},
    {"title": "Python Backend Dasturchi", "dept": "Muhandislik", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 24, "salary": "6,000,000–10,000,000 so'm", "desc": "Django, FastAPI yordamida microservislar va REST API'lar yaratish. Ma'lumotlar bazalari bilan ishlash.", "req": "Python 3+ yil, Django/FastAPI, PostgreSQL, Docker"},
    {"title": "AI/ML Muhandis", "dept": "AI Tadqiqot", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 11, "salary": "8,000,000–15,000,000 so'm", "desc": "Machine learning modellari ishlab chiqish, o'qitish va production'ga chiqarish. AgriTech va GovTech loyihalarida ishtirok.", "req": "Python, TensorFlow/PyTorch, MLOps, Cloud (AWS/GCP)"},
    {"title": "UX/UI Dizayner", "dept": "Dizayn", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 31, "salary": "4,000,000–7,000,000 so'm", "desc": "Foydalanuvchi tajribasini loyihalash, prototiplash va dizayn tizimlarini yaratish.", "req": "Figma 2+ yil, Design Systems, User Research"},
    {"title": "DevOps Muhandis", "dept": "Muhandislik", "type": "Full-time", "location": "Masofadan", "status": "active", "applicants": 9, "salary": "7,000,000–12,000,000 so'm", "desc": "CI/CD pipeline'larni yaratish, Docker/Kubernetes klasterlarini boshqarish, monitoring.", "req": "Docker, Kubernetes, GitHub Actions, Linux, AWS"},
    {"title": "Mobile Dasturchi (React Native)", "dept": "Muhandislik", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 15, "salary": "5,000,000–8,000,000 so'm", "desc": "iOS va Android uchun cross-platform mobil ilovalar yaratish. Offline-first arxitektura bilan ishlash.", "req": "React Native 2+ yil, TypeScript, Expo, SQLite"},
    {"title": "AI Tadqiqot Stajyori", "dept": "AI Tadqiqot", "type": "Internship", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 47, "salary": "1,500,000–2,500,000 so'm", "desc": "AI tadqiqot loyihalarida ishtirok etish, ma'lumotlar tahlili va model sinovlash.", "req": "Python, Matematika/Statistika bilimi, ML asoslari"},
    {"title": "Loyiha Menejeri", "dept": "Operatsiyalar", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 22, "salary": "5,000,000–8,000,000 so'm", "desc": "IT loyihalarini rejalashtirish va boshqarish, jamoalar o'rtasida muvofiqlashtirish.", "req": "Loyiha boshqaruvi 3+ yil, Agile/Scrum, O'zbek va Rus tillar"},
    {"title": "IT O'qituvchisi (Frontend)", "dept": "Ta'lim", "type": "Part-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 13, "salary": "2,500,000–4,000,000 so'm", "desc": "HTML, CSS, JavaScript va React yo'nalishida dars berish. Kurs materiallarini tayyorlash.", "req": "Frontend 2+ yil, Pedagogik tajriba, O'zbek tili"},
    {"title": "Kiberxavfsizlik Mutaxassisi", "dept": "Muhandislik", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "paused", "applicants": 7, "salary": "7,000,000–12,000,000 so'm", "desc": "Tizim va tarmoq xavfsizligini ta'minlash, penetratsion testlar o'tkazish, xavfsizlik auditlari.", "req": "CompTIA Security+/CEH, Linux, Network protocols"},
]:
    JobPosting.objects.create(
        title=j["title"], department=j["dept"], employment_type=j["type"],
        location=j["location"], status=j["status"], applicants_count=j["applicants"],
        salary_range=j["salary"], description=j["desc"], requirements=j["req"],
    )

# ── SEO ─────────────────────────────────────────────────────────────────────
for s in [
    {"path": "/", "title": "Uychi AI & IT Hub — Namangan Viloyatining Texnologiya Markazi", "desc": "Uychi tumanidagi zamonaviy AI va IT Markaz. Startup inkubatoru, coworking, ta'lim va investitsiya imkoniyatlari.", "kw": "Uychi IT Hub, Namangan texnologiya, AI markaz, startup inkubatoru", "score": 88, "issues": 2},
    {"path": "/news", "title": "Yangiliklar — Uychi AI & IT Hub", "desc": "Uychi IT Hubning so'nggi yangiliklari, hamkorliklar va yutuqlari.", "kw": "Uychi IT yangiliklar, Namangan IT, texnologiya", "score": 84, "issues": 3},
    {"path": "/startups", "title": "Startaplar — Uychi AI & IT Hub", "desc": "Uychi IT Hub rezident startaplari. AgriTech, EdTech, GovTech va MedTech yo'nalishlari.", "kw": "Uychi startaplar, Namangan IT, AgriTech, EdTech", "score": 82, "issues": 3},
    {"path": "/jobs", "title": "Ish O'rinlari — Uychi AI & IT Hub", "desc": "Uychi IT Hubdagi IT ish o'rinlari va stajyorlik imkoniyatlari.", "kw": "IT ish Namangan, dasturchi ish o'rni, AI muhandis", "score": 85, "issues": 3},
    {"path": "/partners", "title": "Hamkorlar — Uychi AI & IT Hub", "desc": "Uychi IT Hubning davlat, xalqaro va korporativ hamkorlari.", "kw": "Uychi hamkorlar, IT Park, Microsoft, AWS", "score": 78, "issues": 5},
    {"path": "/apply/startup", "title": "Startup Ariza — Uychi AI & IT Hub", "desc": "Uychi IT Hub startup inkubatoriga ariza topshiring.", "kw": "startup ariza, inkubator, Uychi IT", "score": 86, "issues": 2},
]:
    SEOPage.objects.create(
        path=s["path"], title=s["title"], description=s["desc"],
        keywords=s["kw"], score=s["score"], issues=s["issues"],
    )

# ── Tizim jurnallari ────────────────────────────────────────────────────────
logs = [
    ("Tizimga kirish", "admin@uychi.uz", "Super Admin", "185.212.45.10", "info", "Auth", "2026-06-12 09:32:18"),
    ("AgroSmart Uychi arizasi tasdiqlandi", "admin@uychi.uz", "Super Admin", "185.212.45.10", "success", "Startuplar", "2026-06-12 09:15:42"),
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
]
for action, user, role, ip, level, module, ts in logs:
    dt = datetime.datetime.strptime(ts, "%Y-%m-%d %H:%M:%S")
    SystemLog.objects.create(action=action, user=user, role=role, ip_address=ip, level=level, module=module, timestamp=dt)

print("\n✓ Seed yakunlandi! Uychi AI & IT Hub uchun real ma'lumotlar saqlandi.")
print(f"  Infratuzilma: {Infrastructure.objects.count()} ta")
print(f"  Afzalliklar: {Perk.objects.count()} ta")
print(f"  Statistika: {Stat.objects.count()} ta")
print(f"  Bosh sahifa startaplari: {HomepageStartup.objects.count()} ta")
print(f"  Startup arizalari: {StartupApplication.objects.count()} ta")
print(f"  Investorlar: {Investor.objects.count()} ta")
print(f"  Hamkorlar: {Partner.objects.count()} ta")
print(f"  Yangiliklar: {Article.objects.count()} ta")
print(f"  Ish o'rinlari: {JobPosting.objects.count()} ta")
print(f"  SEO sahifalari: {SEOPage.objects.count()} ta")
print(f"  Tizim jurnallari: {SystemLog.objects.count()} ta")
print(f"  Admin: admin / admin123")
