export default function PlaceholderImage({ src, alt, className = "" }) {
  return (
    <div className={`asset-frame ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.classList.add("missing-asset");
        }}
      />
      <div className="missing-label">Masukkan gambar di folder public/assets</div>
    </div>
  );
}