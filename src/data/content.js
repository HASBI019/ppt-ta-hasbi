export const researchRows = [
  {
    no: 1, peneliti: "Kamilah dkk., 2024",
    judul: "E-Inventaris: Transformasi Digital Meningkatkan Efisiensi Pengelolaan Barang di SMAN 3 Pariaman",
    hasil: "Sistem berbasis web untuk digitalisasi pencatatan barang; data lebih akurat dan pelaporan lebih cepat.",
    objek: "SMAN 3 Pariaman", metode: "Waterfall", uji: "Unit, System & fungsionalitas"
  },
  {
    no: 2, peneliti: "Azzahra & Esabella, 2026",
    judul: "Penerapan Metode Agile dalam Perancangan Sistem Informasi Peminjaman dan Pengembalian Inventaris Barang pada Bagian Umum Sekretariat DPRD Sumbawa",
    hasil: "Pengelolaan data peminjaman dikembangkan secara cepat agar lebih akuntabel.",
    objek: "Sekretariat DPRD Sumbawa", metode: "Agile", uji: "Black Box Testing"
  },
  {
    no: 3, peneliti: "Erik dkk., 2025",
    judul: "Streamlining Inventory Management Through a Web-Based Information System: A Case Study in an Academic Computer Laboratory",
    hasil: "Sistem berbasis web untuk mendata aset laboratorium agar lebih terorganisir dan memudahkan pelaporan berkala.",
    objek: "Universitas Dharmas Indonesia", metode: "Waterfall", uji: "Black Box Testing"
  },
  {
    no: 4, peneliti: "Pratiwi dkk., 2025",
    judul: "Rancang Bangun Sistem Informasi Aduan Digital Desa Gadingan Menggunakan Metode Incremental",
    hasil: "Rancangan sistem aduan digital berbasis web berupa wireframe pelaporan masyarakat dan dashboard admin.",
    objek: "Desa Gadingan", metode: "Incremental", uji: "—"
  },
  {
    no: 5, peneliti: "Lestari dkk., 2023",
    judul: "Perancangan Sistem Informasi Peminjaman Proyektor Menggunakan Metode Agile Software Development pada Universitas",
    hasil: "Sistem peminjaman proyektor berbasis web dengan stok real-time untuk meningkatkan efisiensi peminjaman.",
    objek: "UIN Sultan Syarif Kasim", metode: "Agile", uji: "Black Box Testing"
  },
  {
    no: 6, peneliti: "As’ari, 2026",
    judul: "Rancang Bangun Sistem Informasi Manajemen Peminjaman Barang di Sekolah Tinggi Teknologi Cipasung",
    hasil: "Sistem informasi peminjaman inventaris berbasis web dengan fitur prediksi kelayakan aset.",
    objek: "STT Cipasung", metode: "Incremental", uji: "Black Box Testing"
  }
];

export const useCases = [
  {
    increment: "Increment 1",
    title: "Autentikasi & Manajemen Aset",
    image: "/assets/usecase/increment-01.png",
    intro: "Increment pertama membangun fondasi sistem melalui autentikasi dan pengelolaan data utama inventaris.",
    points: [
      "Autentikasi membatasi akses sesuai peran pengguna.",
      "Admin TU mengelola aset kelas, aset umum, dan data mahasiswa.",
      "Pimpinan memperoleh pemantauan aset melalui dashboard.",
      "Mahasiswa dapat melihat ketersediaan stok aset."
    ]
  },
  {
    increment: "Increment 2",
    title: "Peminjaman & Notifikasi",
    image: "/assets/usecase/increment-02.png",
    intro: "Increment kedua berfokus pada proses transaksi peminjaman agar pengajuan, persetujuan, pengembalian, dan ketersediaan aset dapat dikelola melalui sistem.",
    points: [
      "Pengajuan peminjaman dibedakan berdasarkan kebutuhan kuliah dan organisasi.",
      "Pengguna dapat mengelola pengajuan sendiri dan melakukan pengembalian.",
      "Admin TU memproses persetujuan dan booking peminjaman eksternal.",
      "Informasi laporan peminjaman dan jadwal ruangan tersedia dalam sistem."
    ]
  },
  {
    increment: "Increment 3",
    title: "Prediksi Pemeliharaan Proyektor",
    image: "/assets/usecase/increment-03.png",
    intro: "Increment ketiga memanfaatkan data jam pakai proyektor sebagai dasar prediksi kebutuhan pemeliharaan menggunakan Simple Moving Average.",
    points: [
      "Sistem menampilkan prediksi dan tren pemakaian proyektor.",
      "Jam pakai dan batas maksimal dapat dikelola oleh Admin TU.",
      "Status pemeliharaan dapat ditandai dari sistem.",
      "Hasil prediksi digunakan untuk memberikan peringatan dini ketika aset mendekati batas kelayakan."
    ]
  },
  {
    increment: "Increment 4",
    title: "Pelaporan",
    image: "/assets/usecase/increment-04.png",
    intro: "Increment keempat melengkapi sistem dengan pelaporan yang dapat digunakan untuk melihat dan mengekspor data.",
    points: [
      "Laporan servis proyektor dapat diekspor.",
      "Laporan peminjaman dapat diekspor.",
      "Data laporan disusun dari data transaksi dan pemeliharaan yang tersimpan di sistem."
    ]
  }
];