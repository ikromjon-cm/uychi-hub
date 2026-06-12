import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">Maxfiylik Siyosati</h1>
              <p className="mt-3 text-muted">Uychi AI & IT Hub</p>
            </div>

            <div className="space-y-8 text-[15px] leading-relaxed text-muted">
              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">1. Umumiy Qoidalar</h2>
                <p>Ushbu Maxfiylik Siyosati Uychi AI & IT Hub (keyingi o'rinlarda &quot;Hub&quot;) tomonidan foydalanuvchilarning shaxsiy ma'lumotlarini qanday to'plashi, ishlatishi va himoya qilishini belgilaydi.</p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">2. Ma'lumotlar To'plami</h2>
                <p>Biz quyidagi ma'lumotlarni to'plashimiz mumkin:</p>
                <ul className="mt-3 space-y-2 pl-5">
                  <li className="list-disc">Ism, familiya va kontakt ma'lumotlari</li>
                  <li className="list-disc">Elektron pochta manzili va telefon raqami</li>
                  <li className="list-disc">Kompaniya yoki tashkilot nomi</li>
                  <li className="list-disc">Veb-saytdan foydalanish statistikasi</li>
                  <li className="list-disc">Ariza va so'rovnomalardagi ma'lumotlar</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">3. Ma'lumotlardan Foydalanish</h2>
                <p>Foydalanuvchi ma'lumotlari quyidagi maqsadlarda ishlatiladi:</p>
                <ul className="mt-3 space-y-2 pl-5">
                  <li className="list-disc">Xizmatlarimizni taqdim etish va yaxshilash</li>
                  <li className="list-disc">Foydalanuvchi so'rovlariga javob berish</li>
                  <li className="list-disc">Hub faoliyati haqida yangilanishlar yuborish</li>
                  <li className="list-disc">Statistik tahlil va hisobotlar tayyorlash</li>
                  <li className="list-disc">Huquqiy majburiyatlarni bajarish</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">4. Ma'lumotlar Xavfsizligi</h2>
                <p>Foydalanuvchi ma'lumotlarini himoya qilish uchun barcha texnik va tashkiliy choralarni ko'ramiz. Ma'lumotlar shifrlangan holda saqlanadi va faqat vakolatli xodimlar tomonidan qo'llaniladi.</p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">5. Ma'lumotlarni Uchinchi Tomonlarga Uzatish</h2>
                <p>Foydalanuvchi ma'lumotlari roziliksiz uchinchi tomonlarga uzatilmaydi, quyidagi holatlar bundan mustasno:</p>
                <ul className="mt-3 space-y-2 pl-5">
                  <li className="list-disc">Huquqiy talablar bo'yicha</li>
                  <li className="list-disc">Foydalanuvchi roziligi bilan</li>
                  <li className="list-disc">Xizmat ko'rsatish uchun zarur bo'lgan hollarda (masalan, hosting provayderlari)</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">6. Foydalanuvchi Huquqlari</h2>
                <p>Foydalanuvchi quyidagi huquqlarga ega:</p>
                <ul className="mt-3 space-y-2 pl-5">
                  <li className="list-disc">Shaxsiy ma'lumotlarini o'qish va tahrirlash</li>
                  <li className="list-disc">Ma'lumotlarini o'chirishni talab qilish</li>
                  <li className="list-disc">Ma'lumotlarini qayta ishlashga cheklov qo'yish</li>
                  <li className="list-disc">Ma'lumotlarini ko'chirib olish</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">7. Cookie Foydalanish</h2>
                <p>Veb-saytimiz foydalanuvchi tajribasini yaxshilash uchun cookie-fayllardan foydalanadi. Cookie-fayllarni brauzer sozlamalari orqali boshqarishingiz mumkin.</p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">8. Kontakt</h2>
                <p>Maxfiylik siyosati bo'yicha savollar yoki takliflar uchun:</p>
                <div className="mt-3 space-y-1 text-muted">
                  <p>📍 Istiqlol ko'chasi 15, Uychi tumani, Namangan viloyati</p>
                  <p>📞 +998 79 224 00 00</p>
                  <p>✉ privacy@uychi.uz</p>
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">9. O'zgartirishlar</h2>
                <p>Ushbu Maxfiylik Siyosati vaqti-vaqti bilan yangilanishi mumkin. O'zgartirishlar sahifada e'lon qilingan vaqtdan boshlab kuchga kiradi.</p>
              </section>
            </div>

            <div className="mt-12 border-t border-border pt-6 text-center text-[13px] text-muted-foreground">
              <p>Oxirgi yangilanish: 2026</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
