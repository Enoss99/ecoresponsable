import React from 'react';

interface Props {
  theme: string;
  note: string;
  image?: string;
  isActive?: boolean;
}

export default function CarouselCard({ theme, note, image, isActive }: Props) {
  return (
    <div className={`carrousel-card${isActive ? ' active' : ''}`}>
      <div className="card-theme">{theme || "Thème de notation"}</div>
      <div className="card-image">{image || "Image correspondante"}</div>
      <div className="card-note">{note ? `note : ${note}` : "note"}</div>
    </div>
  );
}
