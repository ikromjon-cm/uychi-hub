import resend
from django.conf import settings

SENDER = "Uychi Hub <onboarding@resend.dev>"


def _send(to: list[str], subject: str, html: str) -> None:
    api_key = getattr(settings, "RESEND_API_KEY", None)
    if not api_key:
        return
    resend.api_key = api_key
    resend.Emails.send({"from": SENDER, "to": to, "subject": subject, "html": html})


def _base(content: str) -> str:
    return f"""
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body{{font-family:Arial,sans-serif;background:#0a0a0a;color:#e4e4e7;margin:0;padding:0}}
  .wrap{{max-width:560px;margin:40px auto;padding:32px;background:#111;border-radius:12px;border:1px solid #222}}
  h2{{color:#22d3ee;margin-top:0}}
  .label{{color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:.05em}}
  .value{{color:#fff;margin:4px 0 16px}}
  .footer{{margin-top:24px;padding-top:16px;border-top:1px solid #222;color:#52525b;font-size:12px}}
</style></head><body><div class="wrap">{content}<div class="footer">Uychi AI & IT Hub · Uychi tumani, Namangan viloyati</div></div></body></html>
"""


# ── Contact ──────────────────────────────────────────────────────────────────

def contact_admin(s) -> None:
    html = _base(f"""
<h2>Yangi Xabar Keldi</h2>
<p class="label">Ism Familya</p><p class="value">{s.name}</p>
<p class="label">Kompaniya</p><p class="value">{s.company or '—'}</p>
<p class="label">Mamlakat</p><p class="value">{s.country or '—'}</p>
<p class="label">Elektron Pochta</p><p class="value">{s.email}</p>
<p class="label">Telefon</p><p class="value">{s.phone or '—'}</p>
<p class="label">Xabar</p><p class="value">{s.message}</p>
""")
    _send([settings.ADMIN_EMAIL], f"Yangi xabar: {s.name}", html)


def contact_confirm(s) -> None:
    html = _base(f"""
<h2>Xabaringiz Qabul Qilindi ✓</h2>
<p>Hurmatli <strong>{s.name}</strong>,</p>
<p>Xabaringiz muvaffaqiyatli qabul qilindi. Jamoamiz <strong>24 soat ichida</strong> siz bilan bog'lanadi.</p>
<p>Shoshilinch bo'lsa: <a href="tel:+998792240000" style="color:#22d3ee">+998 79 224 00 00</a></p>
""")
    _send([s.email], "Xabaringiz qabul qilindi — Uychi Hub", html)


# ── Startup Application ───────────────────────────────────────────────────────

def startup_admin(a) -> None:
    html = _base(f"""
<h2>Yangi Startap Arizasi</h2>
<p class="label">Startap Nomi</p><p class="value">{a.startup_name}</p>
<p class="label">Asoschi</p><p class="value">{a.founder_name}</p>
<p class="label">Soha / Bosqich</p><p class="value">{a.sector} · {a.stage}</p>
<p class="label">Elektron Pochta</p><p class="value">{a.email}</p>
<p class="label">Telefon</p><p class="value">{a.phone or '—'}</p>
<p class="label">Tavsif</p><p class="value">{a.description[:300]}{'...' if len(a.description) > 300 else ''}</p>
""")
    _send([settings.ADMIN_EMAIL], f"Yangi startap arizasi: {a.startup_name}", html)


def startup_confirm(a) -> None:
    html = _base(f"""
<h2>Arizangiz Qabul Qilindi ✓</h2>
<p>Hurmatli <strong>{a.founder_name}</strong>,</p>
<p><strong>{a.startup_name}</strong> uchun startap arizangiz muvaffaqiyatli qabul qilindi.</p>
<p>Inkubatsiya jamoamiz <strong>5 ish kuni ichida</strong> siz bilan bog'lanadi.</p>
<p>Savollar uchun: <a href="mailto:info@uychi.uz" style="color:#22d3ee">info@uychi.uz</a></p>
""")
    _send([a.email], "Startap arizangiz qabul qilindi — Uychi Hub", html)


# ── Investor Application ──────────────────────────────────────────────────────

def investor_admin(inv) -> None:
    html = _base(f"""
<h2>Yangi Investor Arizasi</h2>
<p class="label">Kompaniya</p><p class="value">{inv.company}</p>
<p class="label">Aloqa Shaxsi</p><p class="value">{inv.contact_name or '—'}</p>
<p class="label">Tur</p><p class="value">{inv.investor_type}</p>
<p class="label">Elektron Pochta</p><p class="value">{inv.email or '—'}</p>
<p class="label">Ticket Hajmi</p><p class="value">{inv.ticket_size or '—'}</p>
<p class="label">Izohlar</p><p class="value">{inv.notes[:300] if inv.notes else '—'}</p>
""")
    _send([settings.ADMIN_EMAIL], f"Yangi investor arizasi: {inv.company}", html)


def investor_confirm(inv) -> None:
    email = inv.email
    if not email:
        return
    html = _base(f"""
<h2>Arizangiz Qabul Qilindi ✓</h2>
<p>Hurmatli <strong>{inv.contact_name or inv.company}</strong>,</p>
<p>Investitsiya arizangiz muvaffaqiyatli qabul qilindi.</p>
<p>Hamkorlik jamoamiz <strong>48 soat ichida</strong> siz bilan bog'lanadi.</p>
<p>Savollar uchun: <a href="mailto:info@uychi.uz" style="color:#22d3ee">info@uychi.uz</a></p>
""")
    _send([email], "Investor arizangiz qabul qilindi — Uychi Hub", html)


# ── Newsletter ────────────────────────────────────────────────────────────────

def newsletter_confirm(sub) -> None:
    html = _base(f"""
<h2>Obuna Tasdiqlandi ✓</h2>
<p>Hurmatli <strong>{sub.name or 'Foydalanuvchi'}</strong>,</p>
<p>Uychi Hub yangiliklari obunasiga muvaffaqiyatli qo'shildingiz.</p>
<p>IT sohasidagi so'nggi yangiliklar, tadbirlar va imkoniyatlar haqida xabardor bo'lasiz.</p>
""")
    _send([sub.email], "Obunangiz tasdiqlandi — Uychi Hub", html)


# ── Registration ──────────────────────────────────────────────────────────────

def register_welcome(user) -> None:
    html = _base(f"""
<h2>Xush Kelibsiz, {user.first_name or user.username}! 🎉</h2>
<p>Uychi AI & IT Hub platformasiga muvaffaqiyatli ro'yxatdan o'tdingiz.</p>
<p class="label">Foydalanuvchi nomi</p><p class="value">{user.username}</p>
<p>Platformaga kirish uchun: <a href="https://uychi.uz/login" style="color:#22d3ee">uychi.uz/login</a></p>
""")
    _send([user.email], "Xush kelibsiz — Uychi Hub", html)
