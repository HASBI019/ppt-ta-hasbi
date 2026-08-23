import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function QRDemo({ url }) {
  const [qr, setQr] = useState("");
  useEffect(() => {
    QRCode.toDataURL(url, { width: 420, margin: 2 })
      .then(setQr)
      .catch(() => setQr(""));
  }, [url]);

  return (
    <div className="demo-wrap">
      <div className="demo-copy">
        <div className="eyebrow">LIVE SYSTEM</div>
        <h2>Demonstrasi Sistem.</h2>
        <p>
          Setelah seluruh increment dikembangkan, sistem dapat diakses melalui
          tautan berikut atau dipindai menggunakan QR Code.
        </p>
        <a className="demo-link" href={url} target="_blank" rel="noreferrer">{url}</a>
        <a className="primary-btn" href={url} target="_blank" rel="noreferrer">Akses Sistem ↗</a>
      </div>
      <div className="qr-card">
        {qr ? <img src={qr} alt="QR Code sistem" /> : <div className="qr-placeholder">QR</div>}
        <span>Scan untuk membuka sistem</span>
      </div>
    </div>
  );
}