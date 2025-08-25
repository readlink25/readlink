# LiterasiKita — Website Literasi Modern (Static, GitHub Pages Ready)

Website literasi modern: artikel, news, karya tulis, resensi buku, event & komunitas. Dibangun sebagai Single Page App (SPA) vanilla JS supaya ringan dan mudah di-host gratis via **GitHub Pages**.

## 🚀 Cara Deploy ke GitHub Pages
1. Buat repo baru di GitHub, misal `literasi-website`.
2. Upload semua file/folder dari proyek ini ke repo tersebut (atau `git init` lalu `git push`).
3. Di repo GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**. Pilih `main` dan folder `/ (root)`.
4. Simpan. Tunggu build berjalan. Situs akan tersedia di `https://USERNAME.github.io/literasi-website/`.
5. (Opsional) Ubah **Custom domain** di halaman Pages bila Anda punya domain sendiri.

> SPA sudah disiapkan `404.html` untuk mengarahkan ulang agar routing hash berfungsi di GitHub Pages.

## 📁 Struktur
```
.
├── assets/
│   ├── app.js
│   ├── styles.css
│   └── logo.svg
├── data/
│   ├── books.json
│   ├── events.json
│   ├── news.json
│   ├── posts.json
│   └── users.json
├── 404.html
├── .nojekyll
├── index.html
└── README.md
```

## ✍️ Edit Konten
- **Artikel/News/Karya/Resensi/Event**: edit file JSON di folder `data/`.
- Tambahkan field sesuai kebutuhan. Frontend mengambil data otomatis saat reload.

## 🧩 Kustomisasi
- Ganti warna dan tipografi di `assets/styles.css`.
- Ganti nama brand/logo di `index.html`.
- Tambah integrasi formulir (Google Forms/Netlify Forms) dan auth (Firebase) sesuai roadmap.

Selamat berkarya! 📚
