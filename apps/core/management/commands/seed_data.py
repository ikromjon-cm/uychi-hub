from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils.text import slugify
import datetime


class Command(BaseCommand):
    help = "Seed the database with initial data (runs only if DB is empty)"

    def handle(self, *args, **options):
        from apps.core.models import Infrastructure, Perk, Stat, HomepageStartup
        from apps.startups.models import StartupApplication
        from apps.investors.models import Investor
        from apps.partners.models import Partner
        from apps.news.models import Article
        from apps.careers.models import JobPosting
        from apps.seo.models import SEOPage
        from apps.logs.models import SystemLog
        from apps.education.models import Course
        from apps.events.models import Event

        if Partner.objects.exists():
            self.stdout.write("DB already has data — skipping seed.")
            return

        # Admin
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@uychi.uz", "admin123")
            self.stdout.write("Created admin user")

        # Infrastructure
        for i, item in enumerate([
            {"title": "Coworking Markazi", "desc": "80+ ish o'rinli zamonaviy coworking maydon. Yuqori tezlikli internet, yopiq kabinalar va hamkorlik zonalari.", "accent": "accent"},
            {"title": "AI va Dasturlash Laboratoriyasi", "desc": "GPU klasterli AI tadqiqot laboratoriyasi. Machine learning, kompyuter ko'rish va NLP loyihalari uchun jihozlangan.", "accent": "violet"},
            {"title": "Startup Inkubatoru", "desc": "Dastlabki bosqich startaplarga mentorlik, moliyaviy ko'mak va bozorga chiqish dasturlari.", "accent": "emerald"},
            {"title": "IT Ta'lim Markazi", "desc": "Frontend, Backend, Mobile va DevOps yo'nalishlarida intensiv kurslar va sertifikat dasturlari.", "accent": "accent"},
            {"title": "Konferens va Tadbirlar Zali", "desc": "200 o'rinli zamonaviy zal. Xalqaro konferensiyalar, hackathonlar va demo day tadbirlari uchun.", "accent": "violet"},
        ]):
            Infrastructure.objects.create(title=item["title"], description=item["desc"], accent=item["accent"], order=i + 1)

        # Perks
        for i, p in enumerate([
            {"symbol": "↓", "title": "Soliq imtiyozlari", "desc": "IT Park a'zolari uchun 10 yil davomida 0% korporativ soliq va 0% ijtimoiy to'lovlar. Import bojsiz uskunalar."},
            {"symbol": "◈", "title": "Malakali kadrlar", "desc": "Namangan viloyatida yiliga 5,000+ texnik mutaxassis yetishtiriladi. Kuchli matematika va muhandislik an'analari."},
            {"symbol": "◇", "title": "Davlat ko'magi", "desc": "Viloyat hokimligi va Uychi tuman hokimligining to'liq ko'magi. Tezlashtirilgan litsenziyalash va ruxsatnomalar."},
            {"symbol": "⊕", "title": "Strategik joylashuv", "desc": "Namangan – O'zbekistonning to'qimachilik va texnologiya markazi. Toshkent bilan qulay temir yo'l va avtomobil aloqasi."},
        ]):
            Perk.objects.create(symbol=p["symbol"], title=p["title"], description=p["desc"], order=i + 1)

        # Stats
        for i, s in enumerate([
            {"label": "IT Startaplari", "value": "24", "suffix": "+"},
            {"label": "Faol foydalanuvchilar", "value": "3", "suffix": "K+"},
            {"label": "Yaratilgan ish o'rinlari", "value": "350", "suffix": "+"},
            {"label": "Hamkor tashkilotlar", "value": "18", "suffix": "+"},
            {"label": "AI yechimlari", "value": "12", "suffix": "+"},
        ]):
            Stat.objects.create(label=s["label"], value=s["value"], suffix=s["suffix"], order=i + 1)

        # Homepage Startups
        for i, s in enumerate([
            {"sector": "AgriTech AI", "tagline": "Aqlli qishloq xo'jaligi — aniq sug'orish", "problem": "Uychi tumanida suv tanqisligi va an'anaviy sug'orish usullari hosildorlikni 30–40% kamaytiradi.", "solution": "IoT sensorlar va sun'iy yo'ldosh tasvirlari asosida real vaqt sug'orish monitoringi va AI prognozi.", "tech": "IoT, Satellite Imagery, Predictive ML, Django", "accent": "emerald", "pml": "Fermerlar", "pmv": "1,200+", "sml": "Gektarlar", "smv": "8,500"},
            {"sector": "EdTech AI", "tagline": "Maktab ta'limini raqamlashtirish", "problem": "Qishloq maktablarida sifatli o'qituvchi va zamonaviy o'quv resurslarining yetishmasligi.", "solution": "Oflayn rejimda ishlaydigan o'zbek tilidagi interaktiv ta'lim platformasi va AI o'qituvchi yordamchisi.", "tech": "React Native, AI Tutor, Offline Sync, Node.js", "accent": "accent", "pml": "O'quvchilar", "pmv": "28,000+", "sml": "Maktablar", "smv": "140+"},
            {"sector": "GovTech", "tagline": "Fuqaro murojaatlarini avtomatlashtirish", "problem": "Tuman hokimligiga keladigan murojaatlar qog'oz shaklida — sekin, shaffof emas va kuzatib bo'lmaydi.", "solution": "AI asosidagi murojaatlar platformasi: Telegram bot, web va mobil orqali ariza topshirish va real vaqt monitoring.", "tech": "Next.js, Node.js, PostgreSQL, Telegram Bot API", "accent": "violet", "pml": "Murojaatlar", "pmv": "12,000+", "sml": "O'rtacha javob", "smv": "4.2 soat"},
        ]):
            HomepageStartup.objects.create(
                sector=s["sector"], tagline=s["tagline"], problem=s["problem"],
                solution=s["solution"], tech_stack=s["tech"], accent=s["accent"],
                primary_metric_label=s["pml"], primary_metric_value=s["pmv"],
                secondary_metric_label=s["sml"], secondary_metric_value=s["smv"],
                order=i + 1,
            )

        # Startup Applications
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

        # Investors
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

        # Partners
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

        # Articles
        articles = [
            {"title": "Uychi AI & IT Hub rasmiy ochildi", "category": "E'lon", "status": "published", "views": 5840, "author": "Tahririyat", "excerpt": "Namangan viloyatining Uychi tumanida zamonaviy AI va IT Markaz rasmiy tadbirda ochildi. Viloyat hokimi va IT Park O'zbekiston rahbariyati ishtirokida bo'lib o'tgan marosimdda 80+ ish o'rinli coworking, AI laboratoriyasi va startup inkubatori tantanali ochildi.", "content": "Namangan viloyatining Uychi tumanida zamonaviy AI va IT Markaz rasmiy tadbirda ochildi."},
            {"title": "Microsoft Startups dasturiga Uychi IT Hub qabul qilindi", "category": "Hamkorlik", "status": "published", "views": 3214, "author": "Tahririyat", "excerpt": "Microsoft Startups Founders Hub dasturiga qabul qilinishimiz bilan hub rezidentlari $150,000 gacha Azure kredit, GitHub Enterprise va Microsoft 365 imkoniyatlaridan bepul foydalana oladi.", "content": "Microsoft Startups Founders Hub dasturiga qabul qilinishimiz bilan hub rezidentlari $150,000 gacha Azure kredit va boshqa imkoniyatlardan bepul foydalana oladi."},
            {"title": "AgroSmart Uychi startapi $120,000 investitsiya jalb qildi", "category": "Startap", "status": "published", "views": 2891, "author": "Tahririyat", "excerpt": "Uychi IT Hub rezidenti AgroSmart Uychi startapi Navoiy Investitsiya Fondidan $120,000 seed investitsiya jalb qildi.", "content": "Uychi IT Hub rezidenti AgroSmart Uychi startapi Navoiy Investitsiya Fondidan $120,000 seed investitsiya jalb qildi."},
            {"title": "IT Park O'zbekiston Uychi tuman uchun 10 yillik imtiyozlar e'lon qildi", "category": "Siyosat", "status": "published", "views": 4102, "author": "Tahririyat", "excerpt": "IT Park O'zbekiston Uychi tumanidagi texnologiya kompaniyalari uchun 10 yil davomida 0% korporativ soliq imtiyozlarini rasmiy tasdiqladi.", "content": "IT Park O'zbekiston Uychi tumanidagi texnologiya kompaniyalari uchun 10 yil davomida 0% korporativ soliq, 0% ijtimoiy to'lovlar va bojsiz uskunalar importi imtiyozlarini rasmiy tasdiqladi."},
            {"title": "Uychi Youth Code: 200 o'quvchi dasturlash kurslarini boshladi", "category": "Ta'lim", "status": "published", "views": 2156, "author": "Tahririyat", "excerpt": "Uychi IT Hub tashabbusi bilan 10–18 yoshli 200 nafar o'quvchi bepul dasturlash kurslarini boshladi.", "content": "Uychi IT Hub tashabbusi bilan 10–18 yoshli 200 nafar o'quvchi bepul dasturlash kurslarini boshladi."},
            {"title": "Uychi tuman hokimligi raqamli xizmatlar platformasini ishga tushirdi", "category": "GovTech", "status": "published", "views": 3487, "author": "Tahririyat", "excerpt": "Uychi tuman hokimligi IT Hub rezidenti GovTrack UZ ishlab chiqqan raqamli xizmatlar platformasini rasmiy ishga tushirdi.", "content": "Uychi tuman hokimligi IT Hub rezidenti GovTrack UZ ishlab chiqqan raqamli xizmatlar platformasini rasmiy ishga tushirdi."},
            {"title": "Namangan viloyatida birinchi AI hackathon o'tkazildi", "category": "Tadbir", "status": "published", "views": 1894, "author": "Tahririyat", "excerpt": "Uychi IT Hubda 48 soatlik AI Hackathon bo'lib o'tdi. 120 ishtirokchi, 24 jamoa va 6 ta finalist loyiha.", "content": "Uychi IT Hubda 48 soatlik AI Hackathon bo'lib o'tdi. 120 ishtirokchi, 24 jamoa va 6 ta finalist loyiha."},
            {"title": "EduCore UZ platformasi 28,000 o'quvchiga yetib bordi", "category": "Startap", "status": "published", "views": 2103, "author": "Tahririyat", "excerpt": "Uychi IT Hub rezidenti EduCore UZ oflayn ta'lim platformasi Namangan viloyatidagi 140 maktabda 28,000+ o'quvchiga xizmat ko'rsatmoqda.", "content": "Uychi IT Hub rezidenti EduCore UZ oflayn ta'lim platformasi Namangan viloyatidagi 140 maktabda 28,000+ o'quvchiga xizmat ko'rsatmoqda."},
            {"title": "Koreya KOICA delegatsiyasi Uychi IT Hubni ziyorat qildi", "category": "Hamkorlik", "status": "published", "views": 1456, "author": "Tahririyat", "excerpt": "Koreya Xalqaro Hamkorlik Agentligi (KOICA) vakillari Uychi IT Hubni ziyorat qilib, grant hamkorlik imkoniyatlarini muhokama qildi.", "content": "Koreya Xalqaro Hamkorlik Agentligi (KOICA) vakillari Uychi IT Hubni ziyorat qildi."},
            {"title": "Uychi IT Hubda yangi AI kurs dasturi boshlanadi", "category": "Ta'lim", "status": "draft", "views": 0, "author": "Tahririyat", "excerpt": "2026-yil iyul oyidan boshlab Uychi IT Hubda Machine Learning, Computer Vision va NLP yo'nalishlarida 4 oylik intensiv kurs dasturi boshlanadi.", "content": "2026-yil iyul oyidan boshlab Uychi IT Hubda intensiv kurs dasturi boshlanadi."},
        ]
        for a in articles:
            sl = slugify(a["title"])
            counter = 1
            while Article.objects.filter(slug=sl).exists():
                sl = f"{slugify(a['title'])}-{counter}"
                counter += 1
            Article.objects.create(
                title=a["title"], slug=sl, category=a["category"],
                status=a["status"], views=a["views"], author_name=a["author"],
                content=a["content"], excerpt=a["excerpt"],
            )

        # Jobs
        for j in [
            {"title": "Senior Frontend Dasturchi", "dept": "Muhandislik", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 18, "salary": "5,000,000–9,000,000 so'm", "desc": "React, Next.js va TypeScript asosida zamonaviy web ilovalar yaratish.", "req": "React 3+ yil, TypeScript, REST API, Git"},
            {"title": "Python Backend Dasturchi", "dept": "Muhandislik", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 24, "salary": "6,000,000–10,000,000 so'm", "desc": "Django, FastAPI yordamida microservislar va REST API'lar yaratish.", "req": "Python 3+ yil, Django/FastAPI, PostgreSQL, Docker"},
            {"title": "AI/ML Muhandis", "dept": "AI Tadqiqot", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 11, "salary": "8,000,000–15,000,000 so'm", "desc": "Machine learning modellari ishlab chiqish, o'qitish va production'ga chiqarish.", "req": "Python, TensorFlow/PyTorch, MLOps, Cloud (AWS/GCP)"},
            {"title": "UX/UI Dizayner", "dept": "Dizayn", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 31, "salary": "4,000,000–7,000,000 so'm", "desc": "Foydalanuvchi tajribasini loyihalash, prototiplash va dizayn tizimlarini yaratish.", "req": "Figma 2+ yil, Design Systems, User Research"},
            {"title": "DevOps Muhandis", "dept": "Muhandislik", "type": "Full-time", "location": "Masofadan", "status": "active", "applicants": 9, "salary": "7,000,000–12,000,000 so'm", "desc": "CI/CD pipeline'larni yaratish, Docker/Kubernetes klasterlarini boshqarish.", "req": "Docker, Kubernetes, GitHub Actions, Linux, AWS"},
            {"title": "Mobile Dasturchi (React Native)", "dept": "Muhandislik", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 15, "salary": "5,000,000–8,000,000 so'm", "desc": "iOS va Android uchun cross-platform mobil ilovalar yaratish.", "req": "React Native 2+ yil, TypeScript, Expo, SQLite"},
            {"title": "AI Tadqiqot Stajyori", "dept": "AI Tadqiqot", "type": "Internship", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 47, "salary": "1,500,000–2,500,000 so'm", "desc": "AI tadqiqot loyihalarida ishtirok etish, ma'lumotlar tahlili va model sinovlash.", "req": "Python, Matematika/Statistika bilimi, ML asoslari"},
            {"title": "Loyiha Menejeri", "dept": "Operatsiyalar", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 22, "salary": "5,000,000–8,000,000 so'm", "desc": "IT loyihalarini rejalashtirish va boshqarish, jamoalar o'rtasida muvofiqlashtirish.", "req": "Loyiha boshqaruvi 3+ yil, Agile/Scrum, O'zbek va Rus tillar"},
            {"title": "IT O'qituvchisi (Frontend)", "dept": "Ta'lim", "type": "Part-time", "location": "Uychi, Namangan viloyati", "status": "active", "applicants": 13, "salary": "2,500,000–4,000,000 so'm", "desc": "HTML, CSS, JavaScript va React yo'nalishida dars berish.", "req": "Frontend 2+ yil, Pedagogik tajriba, O'zbek tili"},
            {"title": "Kiberxavfsizlik Mutaxassisi", "dept": "Muhandislik", "type": "Full-time", "location": "Uychi, Namangan viloyati", "status": "paused", "applicants": 7, "salary": "7,000,000–12,000,000 so'm", "desc": "Tizim va tarmoq xavfsizligini ta'minlash, penetratsion testlar o'tkazish.", "req": "CompTIA Security+/CEH, Linux, Network protocols"},
        ]:
            JobPosting.objects.create(
                title=j["title"], department=j["dept"], employment_type=j["type"],
                location=j["location"], status=j["status"], applicants_count=j["applicants"],
                salary_range=j["salary"], description=j["desc"], requirements=j["req"],
            )

        # SEO
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

        # System Logs
        for action, user, role, ip, level, module, ts in [
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
        ]:
            dt = datetime.datetime.strptime(ts, "%Y-%m-%d %H:%M:%S")
            SystemLog.objects.create(action=action, user=user, role=role, ip_address=ip, level=level, module=module, timestamp=dt)

        # Courses
        import decimal
        for c in [
            {"slug": "react-frontend-uz", "title": "React bilan Frontend Dasturlash", "instructor": "Jasur Mirzayev", "category": "frontend", "level": "beginner", "duration": "3 oy", "lessons": 72, "price": 0, "is_free": True, "lang": "uz", "enrolled_count": 1200, "rating": "4.8", "accent": "cyan", "tags": ["React", "JavaScript", "HTML", "CSS", "Bepul"], "description": "React asoslaridan boshlab professional frontend dasturlashni o'rganing. Loyiha asosida amaliy kurs.", "status": "active"},
            {"slug": "python-ai-uz", "title": "Python va Sun'iy Intellekt", "instructor": "Dilnoza Yusupova", "category": "ai", "level": "intermediate", "duration": "4 oy", "lessons": 96, "price": 1200000, "is_free": False, "lang": "uz", "enrolled_count": 840, "rating": "4.9", "accent": "violet", "tags": ["Python", "AI", "ML", "TensorFlow"], "description": "Machine learning va deep learning asoslari. NumPy, Pandas, Scikit-learn, TensorFlow bilan amaliy loyihalar.", "status": "active"},
            {"slug": "flutter-mobile-uz", "title": "Flutter bilan Mobil Dasturlash", "instructor": "Sherzod Tursunov", "category": "mobile", "level": "beginner", "duration": "3 oy", "lessons": 68, "price": 900000, "is_free": False, "lang": "uz", "enrolled_count": 620, "rating": "4.7", "accent": "emerald", "tags": ["Flutter", "Dart", "iOS", "Android", "Firebase"], "description": "iOS va Android uchun bitta kod bazasida professional mobil ilovalar yaratish.", "status": "active"},
            {"slug": "nodejs-backend-uz", "title": "Node.js Backend Dasturlash", "instructor": "Otabek Rahimov", "category": "backend", "level": "intermediate", "duration": "3 oy", "lessons": 80, "price": 1100000, "is_free": False, "lang": "uz", "enrolled_count": 510, "rating": "4.6", "accent": "cyan", "tags": ["Node.js", "Express", "REST API", "JWT"], "description": "Node.js va Express bilan microservislar va REST API yaratish. JWT autentifikatsiya va PostgreSQL.", "status": "active"},
            {"slug": "uiux-figma-uz", "title": "UI/UX Dizayn — Figma Pro", "instructor": "Malika Sharipova", "category": "design", "level": "beginner", "duration": "2 oy", "lessons": 48, "price": 750000, "is_free": False, "lang": "uz", "enrolled_count": 730, "rating": "4.8", "accent": "violet", "tags": ["Figma", "UX", "Prototip"], "description": "Figma'da professional interfeys dizayni: komponentlar, auto-layout, prototiplash va foydalanuvchi tadqiqoti.", "status": "active"},
            {"slug": "data-science-uz", "title": "Ma'lumotlar Fani va Tahlil", "instructor": "Bobur Xasanov", "category": "data", "level": "intermediate", "duration": "4 oy", "lessons": 88, "price": 1300000, "is_free": False, "lang": "uz", "enrolled_count": 390, "rating": "4.7", "accent": "emerald", "tags": ["Python", "Pandas", "Tableau", "SQL"], "description": "Ma'lumotlar tahlili, vizualizatsiya va statistik modellashtirish. Python, Pandas, Tableau, SQL.", "status": "active"},
            {"slug": "cybersecurity-uz", "title": "Kiberxavfsizlik Asoslari", "instructor": "Sanjar Nazarov", "category": "security", "level": "beginner", "duration": "2 oy", "lessons": 52, "price": 850000, "is_free": False, "lang": "uz", "enrolled_count": 290, "rating": "4.6", "accent": "cyan", "tags": ["Xavfsizlik", "Linux", "Tarmoq", "Kriptografiya"], "description": "Tarmoq xavfsizligi, kriptografiya va etik xakerlik asoslari. CompTIA Security+ tayyorlovi.", "status": "active"},
            {"slug": "nextjs-advanced-en", "title": "Next.js — Advanced Full-Stack", "instructor": "Alisher Qodirov", "category": "frontend", "level": "advanced", "duration": "3 oy", "lessons": 76, "price": 1500000, "is_free": False, "lang": "en", "enrolled_count": 180, "rating": "4.9", "accent": "violet", "tags": ["Next.js", "TypeScript", "Prisma", "Vercel"], "description": "Advanced Next.js App Router, TypeScript, Prisma ORM, Server Actions va Vercel deployment.", "status": "active"},
            {"slug": "devops-docker-uz", "title": "DevOps: Docker va CI/CD", "instructor": "Firdavs Umarov", "category": "devops", "level": "intermediate", "duration": "3 oy", "lessons": 60, "price": 1000000, "is_free": False, "lang": "uz", "enrolled_count": 310, "rating": "4.7", "accent": "cyan", "tags": ["Docker", "CI/CD", "GitHub Actions", "Linux"], "description": "Docker, Kubernetes, GitHub Actions bilan CI/CD pipeline va cloud deployment.", "status": "active"},
            {"slug": "postgresql-backend-uz", "title": "PostgreSQL va Ma'lumotlar Bazasi", "instructor": "Nodir Ergashev", "category": "backend", "level": "intermediate", "duration": "2 oy", "lessons": 44, "price": 700000, "is_free": False, "lang": "uz", "enrolled_count": 420, "rating": "4.5", "accent": "emerald", "tags": ["PostgreSQL", "SQL", "Indexing"], "description": "PostgreSQL da murakkab so'rovlar, indexlar, tranzaksiyalar va optimizatsiya.", "status": "active"},
        ]:
            Course.objects.create(
                slug=c["slug"], title=c["title"], instructor=c["instructor"],
                category=c["category"], level=c["level"], duration=c["duration"],
                lessons=c["lessons"], price=c["price"], is_free=c["is_free"],
                lang=c["lang"], enrolled_count=c["enrolled_count"],
                rating=decimal.Decimal(c["rating"]),
                accent=c["accent"], tags=c["tags"],
                description=c["description"], status=c["status"],
            )

        # Events
        import datetime as dt_module
        for e in [
            {"slug": "hackathon-2026", "title": "Uychi IT Hackathon 2026", "event_type": "Hackathon", "date": "2026-07-12", "end_date": "2026-07-13", "location": "Uychi IT Hub, Asosiy bino", "description": "48 soatlik hackathon musobaqasida AI, agrotex va fintech yo'nalishlari bo'yicha innovatsion yechimlar yarating. G'oliblar jami 5,000,000 UZS mukofot fondidan ulush oladi.", "prize": "5,000,000 UZS", "seats": 200, "registered_count": 134, "accent": "cyan", "tags": ["AI", "AgriTech", "FinTech", "Musobaqa"], "status": "upcoming"},
            {"slug": "python-bootcamp-2026", "title": "Python AI Bootcamp — Iyul oqimi", "event_type": "Bootcamp", "date": "2026-07-07", "end_date": "2026-08-30", "location": "Uychi IT Hub, Lab-1 va Lab-2", "description": "8 haftalik intensiv Python va sun'iy intellekt bootcamp. NumPy, Pandas, Scikit-learn, TensorFlow asoslaridan tortib real loyihalar yaratishgacha.", "speaker": "Uychi IT Hub o'qituvchilar jamoasi", "seats": 30, "registered_count": 22, "accent": "violet", "tags": ["Python", "AI", "ML", "Intensiv"], "status": "upcoming"},
            {"slug": "ai-conference-2026", "title": "CentralAsia AI Conference 2026", "event_type": "Conference", "date": "2026-09-15", "end_date": "2026-09-16", "location": "Namangan, Davlat universiteti", "description": "Markaziy Osiyo miqyosidagi AI konferentsiyasi. 30+ ma'ruzachi, 500+ ishtirokchi, startap pitching va investorlar bilan uchrashuvlar.", "speaker": "Xalqaro AI tadqiqotchilari", "seats": 500, "registered_count": 287, "accent": "cyan", "tags": ["AI", "Konferentsiya", "Networking", "Startap"], "status": "upcoming"},
            {"slug": "startup-demo-day-2026", "title": "Uychi Hub Demo Day — Q3 2026", "event_type": "Meetup", "date": "2026-08-22", "location": "Uychi IT Hub, Asosiy auditoriya", "description": "Hubning joriy rezident startaplari o'z mahsulotlari va natijalari bilan chiqish qiladi. Mahalliy va xalqaro investorlar taklif etilgan.", "seats": 150, "registered_count": 98, "accent": "emerald", "tags": ["Startap", "Demo Day", "Investitsiya", "Pitching"], "status": "upcoming"},
            {"slug": "cybersecurity-workshop-2026", "title": "Kiberxavfsizlik Amaliy Ustaxonasi", "event_type": "Workshop", "date": "2026-06-28", "location": "Uychi IT Hub, Lab-3", "description": "Etik xakerlik, penetratsion test va tarmoq xavfsizligi bo'yicha bir kunlik amaliy ustaxona. CTF topshiriqlari va sertifikat.", "speaker": "CloudNet Uychi — Kiberxavfsizlik bo'limi", "seats": 40, "registered_count": 31, "accent": "violet", "tags": ["Kiberxavfsizlik", "CTF", "Ethical Hacking"], "status": "upcoming"},
            {"slug": "flutter-training-2026", "title": "Flutter Mobil Dasturlash Treningi", "event_type": "Training", "date": "2026-07-19", "end_date": "2026-07-20", "location": "Uychi IT Hub, Kichik konferens-zal", "description": "Ikki kunlik Flutter treningi — UI komponentlar, state management, API integratsiyasi va store'ga chiqarish.", "speaker": "AlgoSoft — Flutter jamoasi", "seats": 25, "registered_count": 19, "accent": "cyan", "tags": ["Flutter", "Dart", "Mobil", "iOS"], "status": "upcoming"},
            {"slug": "google-io-watch-2026", "title": "Google I/O Watch Party — Uychi", "event_type": "Meetup", "date": "2026-05-20", "location": "Uychi IT Hub, Konferens-zal", "description": "Google I/O 2026 asosiy taqdimotini birga tomosha qilamiz. Yangi texnologiyalar va developer vositalari muhokamasi.", "speaker": "Google Developer Groups Uzbekistan", "seats": 80, "registered_count": 80, "accent": "emerald", "tags": ["Google", "AI", "Networking", "Bepul"], "status": "past"},
            {"slug": "ux-design-workshop-2026", "title": "Figma UX/UI Dizayn Ustaxonasi", "event_type": "Workshop", "date": "2026-04-14", "location": "Uychi IT Hub, Kreativ zona", "description": "Figma'da professional interfeys dizayni: komponentlar, auto-layout, prototiplash va foydalanuvchi tadqiqoti usullari.", "speaker": "PixelStudio — Senior UX Designer", "seats": 20, "registered_count": 20, "accent": "emerald", "tags": ["Figma", "UI/UX", "Dizayn", "Prototip"], "status": "past"},
        ]:
            Event.objects.create(
                slug=e["slug"], title=e["title"], event_type=e["event_type"],
                date=e["date"],
                end_date=e.get("end_date") or None,
                location=e["location"], description=e["description"],
                speaker=e.get("speaker", ""), prize=e.get("prize", ""),
                seats=e["seats"], registered_count=e["registered_count"],
                accent=e["accent"], tags=e["tags"], status=e["status"],
            )

        self.stdout.write(self.style.SUCCESS(
            f"\n✓ Seed yakunlandi!\n"
            f"  Partners: {Partner.objects.count()}\n"
            f"  Articles: {Article.objects.count()}\n"
            f"  Jobs: {JobPosting.objects.count()}\n"
            f"  Startups: {StartupApplication.objects.count()}\n"
            f"  Investors: {Investor.objects.count()}\n"
            f"  Courses: {Course.objects.count()}\n"
            f"  Events: {Event.objects.count()}\n"
            f"  Admin: admin / admin123"
        ))
