import React from "react";

interface GalleryProps {
  images: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  if (!images.length) return null;
  return (
    <section aria-labelledby="love-failures-heading">
      <h3 id="love-failures-heading" className="font-display text-2xl mb-3">Love Failures of Majlis</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <figure key={i} className="rounded-md overflow-hidden border">
            <img src={src} alt={`Love failure meme ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
