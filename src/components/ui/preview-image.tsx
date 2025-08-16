import Image from "next/image";
import { useState } from "react";

interface PreviewImageProps {
  src: string | Blob;
  alt?: string;
  className?: string;
}

export function PreviewImage({ src, alt, className }: PreviewImageProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  return (
    <>
      {/* Ảnh trong Markdown */}
      <img
        src={src}
        alt={alt}
        style={{ cursor: "zoom-in", maxWidth: "100%", borderRadius: 8 }}
        onClick={() => {
          const url = typeof src === "string" ? src : URL.createObjectURL(src);
          setPreviewSrc(url);
        }}
        className={className}
      />

      {/* Overlay preview */}
      {previewSrc && (
        <div
          onClick={() => setPreviewSrc(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img
            src={previewSrc}
            alt={alt || ""}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: 8,
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              cursor: "zoom-out",
            }}
          />
        </div>
      )}
    </>
  );
}
