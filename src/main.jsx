import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, animate } from "framer-motion";
import { Menu, X, ChevronDown, ArrowLeft, ArrowRight, Minus, Plus, Maximize2, Keyboard } from "lucide-react";
import { config } from "./data/config";
import { researchRows, useCases } from "./data/content";
import PlaceholderImage from "./components/PlaceholderImage";
import UseCasePanel from "./components/UseCasePanel";
import QRDemo from "./components/QRDemo";
import "./styles.css";

const slideNames = [
  "Beranda", "Agenda", "Pendahuluan", "Akar Masalah", "Solusi yang Ditawarkan",
  "Alasan Pemilihan Metode", "Rumusan Masalah", "Tujuan Penelitian", "Posisi Penelitian", "Manfaat Penelitian",
  "Metodologi Penelitian", "Tahapan Penelitian", "Increment 1", "Increment 2",
  "Increment 3", "Increment 4", "Live Demo", "Hasil Pengujian", "Kesimpulan & Saran"
];

function App() {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [fullscreen, setFullscreen] = useState(null);
  const [shortcuts, setShortcuts] = useState(false);
  const [zoom, setZoom] = useState(1);

  const go = (next) => setIndex(Math.max(0, Math.min(slideNames.length - 1, next)));
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault(); go(index + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault(); go(index - 1);
      }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(slideNames.length - 1);
      if (e.key === "Escape") { setMenu(false); setFullscreen(null); setShortcuts(false); }
      if (e.key === "?" || (e.shiftKey && e.key === "/")) setShortcuts(true);
    };
    const onGoSlide = (e) => go(e.detail);
    window.addEventListener("keydown", onKey);
    window.addEventListener("go-slide", onGoSlide);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("go-slide", onGoSlide); };
  }, [index]);

  return (
    <main className="app">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <header className="topbar">
        <div className="brand">
          <span className="brand-dot" />
          <span>TUGAS AKHIR</span>
          <i>·</i>
          <span>Muhammad Hasbi As'ari</span>
        </div>
        <nav className="web-nav" aria-label="Navigasi presentasi">
          <button className={index <= 1 ? "active" : ""} onClick={() => go(0)}>Beranda</button>
          <button className={index >= 2 && index <= 5 ? "active" : ""} onClick={() => go(3)}>Masalah</button>
          <button className={index >= 6 && index <= 11 ? "active" : ""} onClick={() => go(10)}>Metode</button>
          <button className={index >= 12 && index <= 15 ? "active" : ""} onClick={() => go(12)}>Pengembangan</button>
          <button className={index >= 16 && index <= 17 ? "active" : ""} onClick={() => go(16)}>Demo</button>
          <button className={index === 18 ? "active" : ""} onClick={() => go(18)}>Kesimpulan</button>
        </nav>
        <div className="top-actions">
          <div className="zoom-control" aria-label="Kontrol ukuran">
            <button title="Perkecil" onClick={()=>setZoom(z=>Math.max(.82, +(z-.05).toFixed(2)))}><Minus size={14}/></button>
            <button className="zoom-value" title="Kembalikan ukuran" onClick={()=>setZoom(1)}>{Math.round(zoom*100)}%</button>
            <button title="Perbesar" onClick={()=>setZoom(z=>Math.min(1.12, +(z+.05).toFixed(2)))}><Plus size={14}/></button>
          </div>
          <button className="icon-btn" title="Shortcut keyboard (?)" onClick={() => setShortcuts(true)}><Keyboard size={17}/></button>
          <button className="menu-btn" title="Lihat semua slide" onClick={() => setMenu(true)}><Menu size={18}/><span>Semua Slide</span></button>
        </div>
      </header>

      <div className="progress">
        <div className="progress-fill" style={{ height: `${((index + 1) / slideNames.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          key={index}
          className="scene"
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
          transition={{ duration: .45, ease: [.22, .8, .22, 1] }}
        >
          <div className="scene-scale" style={{"--scene-scale": zoom}}>
            <Slide
              index={index}
              setIndex={setIndex}
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
            />
          </div>
        </motion.section>
      </AnimatePresence>

      <div className="bottom-nav">
        <button onClick={() => go(index - 1)} disabled={index === 0}><ArrowLeft size={16}/></button>
        <span>{String(index + 1).padStart(2, "0")} / {String(slideNames.length).padStart(2, "0")}</span>
        <button onClick={() => go(index + 1)} disabled={index === slideNames.length - 1}><ArrowRight size={16}/></button>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div className="menu-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.aside className="slide-menu"
              initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}}
              transition={{duration:.35,ease:[.22,.8,.22,1]}}>
              <div className="slide-menu-head">
                <div>
                  <div className="eyebrow">PRESENTATION CONTROL</div>
                  <h2>Daftar Slide</h2>
                </div>
                <button className="close-menu" onClick={() => setMenu(false)}><X size={18}/></button>
              </div>
              <div className="slide-menu-progress">
                <span style={{width:`${((index+1)/slideNames.length)*100}%`}} />
              </div>
              <div className="slide-list">
                {slideNames.map((name, i) => (
                  <button key={name} className={i === index ? "active" : ""} onClick={() => { go(i); setMenu(false); }}>
                    <span className="slide-num">{String(i+1).padStart(2,"0")}</span>
                    <span className="slide-name">{name}</span>
                    {i === index && <span className="now-dot" />}
                  </button>
                ))}
              </div>
              <div className="keyboard-card">
                <b>Kontrol cepat</b>
                <div><kbd>↑</kbd><kbd>↓</kbd><span>Pindah slide</span></div>
                <div><kbd>Space</kbd><span>Slide berikutnya</span></div>
                <div><kbd>Home</kbd><kbd>End</kbd><span>Awal / akhir</span></div>
                <div><kbd>Esc</kbd><span>Tutup menu / perbesar</span></div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shortcuts && (
          <motion.div className="shortcut-modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShortcuts(false)}>
            <motion.div className="shortcut-panel" initial={{scale:.94,y:12}} animate={{scale:1,y:0}} exit={{scale:.94,y:12}} onClick={(e)=>e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShortcuts(false)}><X size={18}/></button>
              <div className="eyebrow">KEYBOARD SHORTCUTS</div>
              <h2>Presentasi tanpa menyentuh mouse.</h2>
              <div className="shortcut-grid">
                <div><kbd>↓</kbd><span>Slide berikutnya</span></div>
                <div><kbd>↑</kbd><span>Slide sebelumnya</span></div>
                <div><kbd>Space</kbd><span>Berikutnya</span></div>
                <div><kbd>Home</kbd><span>Slide pertama</span></div>
                <div><kbd>End</kbd><span>Slide terakhir</span></div>
                <div><kbd>Esc</kbd><span>Tutup overlay</span></div>
              </div>
              <button className="primary-btn shortcut-close" onClick={() => setShortcuts(false)}>Siap presentasi</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullscreen && (
          <motion.div className="image-modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setFullscreen(null)}>
            <button className="modal-close" onClick={() => setFullscreen(null)}><X/></button>
            <img src={fullscreen} alt="Use Case" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Slide({ index, setIndex, setFullscreen }) {
  switch(index) {
    case 0: return <Home setIndex={setIndex}/>;
    case 1: return <Agenda/>;
    case 2: return <Pendahuluan/>;
    case 3: return <Problem/>;
    case 4: return <Solution/>;
    case 5: return <MethodChoice/>;
    case 6: return <Rumusan/>;
    case 7: return <Tujuan/>;
    case 8: return <Posisi/>;
    case 9: return <Manfaat/>;
    case 10: return <Metodologi/>;
    case 11: return <Tahapan onOpen={() => setFullscreen("/assets/screenshots/tahapan-penelitian.png")}/>;
    case 12: return <UseCasePanel data={useCases[0]} onOpen={() => setFullscreen(useCases[0].image)}/>;
    case 13: return <UseCasePanel data={useCases[1]} onOpen={() => setFullscreen(useCases[1].image)}/>;
    case 14: return <UseCasePanel data={useCases[2]} onOpen={() => setFullscreen(useCases[2].image)}/>;
    case 15: return <UseCasePanel data={useCases[3]} onOpen={() => setFullscreen(useCases[3].image)}/>;
    case 16: return <Demo/>;
    case 17: return <Testing/>;
    case 18: return <Closing/>;
    default: return null;
  }
}

function Home({setIndex}) {
  return <div className="home-grid">
    <div className="home-copy">
      <div className="eyebrow">TUGAS AKHIR · 2026</div>
      <h1>Rancang Bangun <em>Sistem Informasi</em> Manajemen Inventaris</h1>
      <p className="home-sub">di Sekolah Tinggi Teknologi Cipasung dengan Fitur Predictive Maintenance Menggunakan Metode Incremental Development dan Algoritma Simple Moving Average.</p>
      <div className="author">{config.author} <span>·</span> {config.nim} <span>·</span> {config.program}</div>
      <button className="primary-btn" onClick={() => setIndex(1)}>Mulai Presentasi <ChevronDown size={17}/></button>
    </div>
    <div className="profile-card">
      <PlaceholderImage src={config.profile} alt={config.author}/>
      <div className="profile-glass">
        <strong>{config.author}</strong>
        <span>{config.campus}</span>
      </div>
    </div>
  </div>
}

function Agenda() {
  const items = [
    ["Pendahuluan", "Latar belakang, akar masalah, dan solusi yang ditawarkan.", 2],
    ["Rumusan & Tujuan", "Pertanyaan penelitian dan arah yang ingin dicapai.", 6],
    ["Posisi Penelitian", "Perbandingan penelitian terdahulu dan kontribusi penelitian.", 8],
    ["Manfaat", "Manfaat bagi pengelolaan inventaris dan pengembangan sistem.", 9],
    ["Metodologi", "Metode penelitian, tahapan, dan pendekatan pengembangan.", 10],
    ["Pengembangan", "Tahapan implementasi Increment 1 sampai Increment 4.", 12],
    ["Live Demo", "Menunjukkan sistem secara langsung melalui web dan QR.", 16],
    ["Hasil Pengujian", "Hasil Black Box Testing dan User Acceptance Testing.", 17],
    ["Kesimpulan & Saran", "Ringkasan hasil penelitian dan pengembangan selanjutnya.", 18]
  ];
  return <div className="agenda-scene">
    <div className="agenda-head"><div><div className="eyebrow">ROADMAP PRESENTASI</div><h1>Alur pembahasan.</h1></div><p>Presentasi disusun dari konteks masalah hingga pembuktian sistem melalui demo.</p></div>
    <div className="agenda-grid">{items.map(([x,d,target],i)=><button className="agenda-card" key={x} onClick={()=>window.dispatchEvent(new CustomEvent("go-slide",{detail:target}))}>
      <span className="agenda-num">{String(i+1).padStart(2,"0")}</span><div><b>{x}</b><p>{d}</p></div><span className="agenda-arrow">↗</span>
    </button>)}</div>
  </div>
}

function Pendahuluan() {
  return <div className="split-scene"><div><div className="eyebrow">BAB I · PENDAHULUAN</div><h1>Inventaris menjadi bagian penting dalam menunjang kegiatan akademik.</h1><p className="lead">Pengelolaan sarana dan prasarana berpengaruh terhadap efektivitas kegiatan akademik dan pelayanan terhadap mahasiswa.</p></div><div className="quote-card"><span>Temuan utama</span><strong>Pengelolaan peminjaman inventaris masih dilakukan secara manual menggunakan buku besar.</strong><p>Kondisi tersebut memicu lambatnya pencarian data, ketidakjelasan status barang, serta kurangnya transparansi manajemen inventaris.</p></div></div>
}

function Problem() {
  const cards = [
    ["01","Pencatatan Manual","Data peminjaman masih dicatat dalam buku besar."],
    ["02","Sulit Dipantau","Pencarian data dan status barang membutuhkan waktu."],
    ["03","Tidak Real-Time","Ketersediaan stok belum dapat dipantau secara langsung."],
    ["04","Pemeliharaan","Sebagian aset baru menjalani pemeliharaan setelah mengalami kerusakan."]
  ];
  return <div className="content-wide"><div className="eyebrow">AKAR MASALAH</div><h1>Masalah utama bukan hanya pencatatan.</h1><p className="lead narrow">Masalah muncul ketika data tidak mudah dicari, status aset tidak jelas, dan pemeliharaan belum menggunakan estimasi berbasis data penggunaan.</p><div className="card-grid four">{cards.map(c=><div className="info-card" key={c[0]}><span>{c[0]}</span><h3>{c[1]}</h3><p>{c[2]}</p></div>)}</div></div>
}

function Solution() {
  const cards = [
    ["01","Sistem Informasi","Digitalisasi pengelolaan peminjaman dan inventaris."],
    ["02","Incremental Development","Pengembangan dilakukan bertahap melalui empat increment."],
    ["03","Simple Moving Average","Rata-rata pemakaian mingguan menjadi dasar prediksi."],
    ["04","Predictive Maintenance","Memberikan peringatan dini ketika aset mendekati batas kelayakan."]
  ];
  return <div className="content-wide solution-scene">
    <div className="eyebrow">SOLUSI YANG DITAWARKAN · BAB I</div>
    <div className="solution-heading"><div><h1>Satu sistem, dikembangkan bertahap.</h1><p className="lead narrow">Solusi menggabungkan digitalisasi inventaris, pengembangan bertahap, pengolahan data pemakaian, dan prediksi pemeliharaan dalam satu sistem.</p></div><div className="solution-flow"><span>SISTEM</span><i>→</i><span>DATA</span><i>→</i><span>PREDIKSI</span><i>→</i><span>MAINTENANCE</span></div></div>
    <div className="solution-card-grid">{cards.map(c=><div className="solution-card-clean" key={c[0]}>
      <span className="solution-number">{c[0]}</span>
      <div className="solution-card-line" />
      <h2>{c[1]}</h2><p>{c[2]}</p>
    </div>)}</div>
  </div>
}

function MethodChoice() {
  return <div className="content-wide method-choice-scene">
    <div className="eyebrow">ALASAN PEMILIHAN METODE · BAB I</div>
    <h1>Mengapa Incremental Development?</h1>
    <p className="lead narrow">Penelitian menggunakan Incremental Development dengan pendekatan plan-driven karena sistem dibangun dalam beberapa bagian atau increment yang dapat dikembangkan dan dievaluasi secara bertahap.</p>
    <div className="method-compare">
      <div className="method-compare-card agile"><div className="compare-label">PENDEKATAN PEMBANDING</div><h2>Agile</h2><p>Increment dapat berukuran lebih kecil dan dirilis lebih cepat, dengan penentuan increment berikutnya menyesuaikan progres serta perubahan kebutuhan pengguna.</p><div className="compare-tags"><span>Adaptif</span><span>Iteratif</span><span>Rilis cepat</span></div></div>
      <div className="compare-vs">VS</div>
      <div className="method-compare-card chosen"><div className="compare-label">DIPILIH</div><h2>Plan-driven</h2><p>Seluruh increment sudah ditentukan sejak awal proyek dimulai, karena kebutuhan sistem seperti data master, transaksi, dan fitur prediksi sudah bisa dipetakan garis besarnya sejak penelitian dimulai.</p><div className="compare-tags"><span>4 Increment</span><span>Plan-driven</span><span>Evaluasi bertahap</span></div></div>
    </div>
    <div className="choice-reason"><span>ALASAN UTAMA</span><strong>Pengembangan dibagi menjadi bagian yang lebih kecil sehingga kebutuhan, implementasi, dan pengujian dapat dikelola secara bertahap.</strong><small>Increment 1 → Aset · Increment 2 → Peminjaman · Increment 3 → Prediksi · Increment 4 → Pelaporan</small></div>
  </div>
}

function Rumusan() {
  const qs = [
    "Bagaimana merancang dan membangun sistem informasi peminjaman inventaris di STT Cipasung menggunakan metode Incremental Development?",
    "Bagaimana mengimplementasikan algoritma Simple Moving Average (SMA) untuk memprediksi batas kelayakan pakai aset?",
    "Bagaimana melakukan pengujian fungsionalitas sistem menggunakan Blackbox Testing dan mengukur tingkat penerimaan pengguna menggunakan UAT?"
  ];
  return <div className="content-wide"><div className="eyebrow">RUMUSAN MASALAH</div><h1>Tiga pertanyaan yang menjadi dasar penelitian.</h1><div className="numbered-list">{qs.map((q,i)=><div key={q}><span>0{i+1}</span><p>{q}</p></div>)}</div></div>
}

function Tujuan() {
  const qs = [
    "Merancang dan membangun sistem informasi peminjaman inventaris di STT Cipasung menggunakan metode Incremental Development.",
    "Mengimplementasikan algoritma Simple Moving Average (SMA) untuk memprediksi batas kelayakan pakai aset.",
    "Melakukan pengujian fungsionalitas menggunakan Blackbox Testing dan mengukur tingkat penerimaan pengguna menggunakan UAT."
  ];
  return <div className="content-wide"><div className="eyebrow">TUJUAN PENELITIAN</div><h1>Tujuan yang ingin dicapai.</h1><div className="goal-grid">{qs.map((q,i)=><div className="goal-card" key={q}><span>0{i+1}</span><p>{q}</p></div>)}</div></div>
}

function Posisi() {
  return <div className="position-scene">
    <div className="eyebrow">POSISI PENELITIAN · TABEL 1.1</div>
    <h1>Perbandingan penelitian terdahulu.</h1>
    <div className="table-wrap">
      <table>
        <thead><tr><th>No</th><th>Peneliti</th><th>Hasil</th><th>Objek</th><th>Metode</th><th>Pengujian</th></tr></thead>
        <tbody>{researchRows.map(r=><tr className={r.no===6 ? "current" : ""} key={r.no}><td>{r.no}</td><td>{r.peneliti}</td><td>{r.hasil}</td><td>{r.objek}</td><td>{r.metode}</td><td>{r.uji}</td></tr>)}</tbody>
      </table>
    </div>
    <div className="position-summary">
      <div><b>Persamaan</b><p>Sama-sama mengarah pada digitalisasi pengelolaan inventaris/peminjaman dan peningkatan efisiensi pengelolaan data.</p></div>
      <div><b>Perbedaan</b><p>Penelitian ini mengintegrasikan predictive maintenance untuk memprediksi batas kelayakan aset dengan algoritma Simple Moving Average.</p></div>
      <div><b>Hasil Penelitian</b><p>Sistem inventaris dikembangkan melalui Incremental Development dan memberikan peringatan dini pemeliharaan, dengan Blackbox Testing dan UAT sebesar 100%.</p></div>
    </div>
  </div>
}

function Manfaat() {
  return <div className="content-wide"><div className="eyebrow">MANFAAT PENELITIAN</div><h1>Manfaat yang dituju.</h1><div className="benefit-grid"><div><span>ASPEK TEORITIS</span><p>Memberikan kontribusi pemahaman mengenai penerapan Incremental Development dalam pengembangan sistem informasi yang adaptif dan terstruktur.</p><p>Menjadi bahan kajian atau rujukan awal penelitian sejenis, khususnya penerapan algoritma prediksi pada digitalisasi manajemen inventaris.</p></div><div><span>ASPEK PRAKTIS</span><p><b>Unit Sarpras:</b> mempermudah pengawasan aset, rekapitulasi laporan, serta menyediakan data prediktif terkait masa pakai aset.</p><p><b>Mahasiswa:</b> memudahkan pengecekan ketersediaan stok secara real-time dan prosedur peminjaman fasilitas kampus.</p></div></div></div>
}

function Metodologi() {
  return <div className="content-wide"><div className="eyebrow">BAB III · METODOLOGI PENELITIAN</div><h1>Tahapan penelitian disusun secara sistematis.</h1><div className="method-flow">{["Identifikasi Masalah","Studi Literatur","Pengumpulan Data","Pengembangan Sistem","Pengujian & Validasi","Final Release"].map((x,i)=><div className="method-step" key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b>{i<5 && <i>→</i>}</div>)}</div><p className="method-note">Pengembangan sistem menggunakan pendekatan Incremental sehingga kebutuhan yang diperoleh menjadi dasar pengembangan modul secara bertahap.</p></div>
}

function Tahapan({ onOpen }) {
  return (
    <div className="split-scene tahapan-scene">
      <div className="tahapan-copy">
        <div className="eyebrow">TAHAPAN PENELITIAN</div>
        <h1>Alur penelitian.</h1>
        <p className="lead">
          Penelitian dilakukan secara sistematis mulai dari identifikasi masalah,
          pengumpulan kebutuhan, pengembangan sistem secara incremental,
          hingga pengujian dan evaluasi.
        </p>

        <div className="tahapan-info">
          <span>METODE</span>
          <strong>Incremental Development</strong>
        </div>
      </div>

            <div className="tahapan-image-card">
        <button type="button" className="tahapan-image-btn" onClick={onOpen}>
          <PlaceholderImage
            src="/assets/screenshots/tahapan-penelitian.png"
            alt="Tahapan Penelitian"
            className="tahapan-image"
          />
        </button>
      </div>
    </div>
  );
}

function Demo() {
  return <div className="content-wide"><QRDemo url={config.demoUrl}/></div>
}

function AnimatedNumber({ value, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [value]);

  return <>{displayValue}{suffix}</>;
}

function Testing() {
  return (
    <div className="content-wide">
      <div className="eyebrow">HASIL PENGUJIAN</div>
      <h1>Sistem diuji pada fungsi dan penerimaan pengguna.</h1>
      <div className="metric-grid">
        <div className="metric">
          <strong><AnimatedNumber value={83} /></strong>
          <span>Skenario Blackbox Testing</span>
          <small>100% valid</small>
        </div>
        <div className="metric">
          <strong><AnimatedNumber value={58} /></strong>
          <span>Skenario User Acceptance Testing</span>
          <small>100% valid · kategori Sangat Baik</small>
        </div>
        <div className="metric">
          <strong><AnimatedNumber value={100} suffix="%" /></strong>
          <span>Hasil pengujian</span>
          <small>sesuai laporan penelitian</small>
        </div>
      </div>
    </div>
  );
}

function Closing() {
  return <div className="closing-scene"><div className="eyebrow">BAB VI · KESIMPULAN & SARAN</div><h1>Kesimpulan</h1><p className="closing-lead">Sistem berhasil dirancang dan dibangun menggunakan Incremental Development dengan empat increment: autentikasi & manajemen aset, peminjaman & notifikasi, prediksi pemeliharaan, dan pelaporan.</p><p className="closing-lead">Simple Moving Average diterapkan untuk memprediksi batas kelayakan pakai aset, khususnya proyektor. Blackbox Testing pada 83 skenario dan UAT pada 58 skenario menghasilkan 100% valid.</p><div className="suggestion"><b>Saran</b><span>UAT dapat melibatkan Mahasiswa sebagai responden, integrasi jadwal perkuliahan dapat dikembangkan, dan penerapan prediksi dapat diperluas ke aset lain seperti AC, sound system, dan printer.</span></div><div className="thankyou">TERIMA KASIH</div></div>
}

createRoot(document.getElementById("root")).render(<App />);