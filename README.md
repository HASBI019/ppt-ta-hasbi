# Sidang TA Web Interaktif — V5

Versi ini dirapikan menjadi website presentasi full-screen, bukan PPT biasa.

## Perubahan utama
- Tidak ada speaker notes.
- Tidak ada stimulus & respon di tampilan.
- Penjelasan Use Case dibuat sebagai narasi inti di samping diagram.
- Posisi Penelitian menjadi satu scene utuh dengan tabel 6 penelitian + 3 kotak ringkasan: Persamaan, Perbedaan, Hasil Penelitian.
- Solusi dibuat dalam 4 kartu.
- Landasan Teori tidak ditampilkan.
- Tahapan Penelitian memiliki file gambar sendiri.
- Setiap scene memiliki komponen/file yang jelas.
- Demo + link + QR berada sebelum Hasil Pengujian, lalu Kesimpulan & Saran.
- Semua materi inti mengikuti dokumen TA yang diberikan.

## Jalankan
```bash
npm install
npm run dev
```

## Aset yang perlu diganti
- `public/assets/profile/foto-hasbi.png`
- `public/assets/logo/logo-sttc.png`
- `public/assets/screenshots/tahapan-penelitian.png`
- `public/assets/usecase/increment-01.png`
- `public/assets/usecase/increment-02.png`
- `public/assets/usecase/increment-03.png`
- `public/assets/usecase/increment-04.png`

## Link demo
Edit:
`src/data/config.js`

```js
demoUrl: "https://link-sistem.vercel.app"
```

QR akan otomatis mengikuti link tersebut.

## Navigasi
- Arrow Down / Space / PageDown: berikutnya
- Arrow Up / PageUp: sebelumnya
- Home / End: awal / akhir
- Tombol Navigasi: buka daftar scene
- Esc: tutup overlay

\n## Kontrol V5\n
- **Arrow Up / Down**: pindah slide
- **Space**: slide berikutnya
- **Home / End**: awal / akhir
- **?**: buka panel shortcut
- **Esc**: tutup overlay
- **Menu Slide**: membuka daftar slide lengkap + indikator slide aktif
- **Perbesar Use Case**: membuka diagram Use Case dalam mode layar penuh


### Update V7
- Bab I Solusi yang Ditawarkan memiliki ilustrasi visual untuk Sistem Informasi, Incremental Development, Simple Moving Average, dan Predictive Maintenance.
- Ditambahkan slide Alasan Pemilihan Metode yang membandingkan Agile dan Incremental serta alasan penggunaan Incremental Development.
- Struktur navigasi web, keyboard, zoom, dan menu slide tetap dipertahankan.
