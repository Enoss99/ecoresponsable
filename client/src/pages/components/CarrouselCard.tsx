import React from 'react';
import "../../css/CarrouselCard.css";

interface Props {
  theme: string;
  image?: string;
  isActive?: boolean;
}

export default function CarrouselCard({ theme, image, isActive }: Props) {
  return (
    <div className={`carrousel-card${isActive ? ' active' : ''}`}>
      <div className="card-theme">{theme || "Thème de notation"}</div>
      <div className="card-image">{image || "Image correspondante"}</div>
    </div>
  );
}
