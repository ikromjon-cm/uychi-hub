# Deploy qo'llanmasi

## 1-qadam: GitHub repo (bir marta)

```bash
# GitHub da yangi repo oching: https://github.com/new
# Nom: uychi-hub  (private yoki public)
# Keyin:
cd "/Users/user/Documents/it park/uychi-hub"
git remote add origin https://github.com/ikromjon-cm/uychi-hub.git
git push -u origin main
```

## 2-qadam: Resend (email, bepul)

1. https://resend.com ga boring → "Sign Up" → bepul hisob
2. "API Keys" → "Create API Key" → nusxa oling
3. `.env` faylga qo'shing:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
   ADMIN_EMAIL=sizning@email.com
   ```

## 3-qadam: Vercel (Next.js frontend, bepul)

```bash
cd "/Users/user/Documents/it park/uychi-hub"
npx vercel login          # browser ochiladi, email bilan kiring
npx vercel --prod         # deploy bo'ladi, URL beriladi
```

Vercel da muhit o'zgaruvchilari (Environment Variables):
- `NEXT_PUBLIC_API_URL` = `https://uychi-hub-api.onrender.com`

## 4-qadam: Render (Django backend, bepul)

1. https://render.com → "New" → "Web Service"
2. GitHub reponi ulang → `uychi-hub` ni tanlang
3. Render `render.yaml` ni avtomatik topadi
4. "Create Web Service" ni bosing

Render da muhit o'zgaruvchilari:
- `SECRET_KEY` = (Render avtomatik yaratadi)
- `RESEND_API_KEY` = (Resend dan olgan kalitingiz)
- `ADMIN_EMAIL` = sizning@email.com

## 5-qadam: Vercel API URL ni yangilang

Render deploy bo'lgandan keyin URL ko'rinadi (masalan `https://uychi-hub-api.onrender.com`).
`vercel.json` dagi URL ni shu bilan almashtiring va qayta deploy:

```bash
npx vercel --prod
```

---

## Mahalliy ishlatish

```bash
# Django
venv/bin/python manage.py runserver 8000

# Next.js (boshqa terminalda)
npm run dev
```

Admin panel: http://localhost:3001/admin/dashboard
API docs: http://localhost:8000/api/docs/
