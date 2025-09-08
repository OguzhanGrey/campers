# 🚐 Campers

Campers, hayalinizdeki kampçıyı kolayca bulup kiralayabileceğiniz modern bir web uygulaması. React, Redux Toolkit ve Vite ile geliştirildi, tamamen responsive.

## ✨ Özellikler

- Konum, araç ekipmanı ve araç tipine göre filtreleme
- Sayfalama ve anlık filtreleme
- Araç detayları: görseller, özellikler, boyutlar
- 5 yıldızlı rating ve kullanıcı yorumları
- Rezervasyon formu (Formik + Yup ile validasyonlu)

## 🛠️ Teknolojiler

- **React**, **React Router DOM**, **Redux Toolkit**, **Vite**
- **Formik + Yup** (form yönetimi ve validasyon)
- **CSS Modules** (stil yönetimi)
- **Axios** (API istekleri)
- **React Modal** (modal görüntüleme)

## 🚀 Kurulum

```bash
git clone https://github.com/kullanici-adi/campers.git
cd campers
npm install
npm run dev
```

Tarayıcıda aç: `http://localhost:5173`
Production build: `npm run build`
Preview: `npm run preview`

## 📂 Proje Yapısı

```
src/
├── components/   # Button, Hero, FilterBar, Footer, VehicleCard vs.
├── pages/        # MainPage, CatalogPage, CamperDetailPage
├── redux/        # Slices & store
├── images/       # SVG ve görseller
└── routes.js
```

## 🔧 API

MockAPI: `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`
Araçlar, özellikler, yorumlar ve görselleri içeriyor.

## 👨‍💻 Geliştirici

**Oğuzhan ÖRS** – Full Stack Developer

⭐ Beğendiyseniz yıldız vermeyi unutmayın!
