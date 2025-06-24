import React from 'react';
import CarouselCard from '../CarrouselCard/CarrouselCard';
import "./Carrousel.css";

interface Theme {
  theme: string;
  note: string;
  image?: string;
}

interface Props {
  themes: Theme[];
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
}

export default function Carrousel({ themes, currentIndex, setCurrentIndex }: Props) {
  const handlePrev = () => setCurrentIndex(Math.max(0, currentIndex - 1));
  const handleNext = () => setCurrentIndex(Math.min(themes.length - 1, currentIndex + 1));

  // Affiche 4 cartes autour de currentIndex
  const visible = () => {
    if (currentIndex < 2) return themes.slice(0, 4);
    if (currentIndex > themes.length - 3) return themes.slice(themes.length - 4, themes.length);
    return themes.slice(currentIndex - 2, currentIndex + 2);
  };

  const visibleBase = currentIndex < 2 ? 0 : currentIndex > themes.length - 3 ? themes.length - 4 : currentIndex - 2;

  return (
    <div className="comparateur-carrousel">
      <button className="carrousel-arrow" onClick={handlePrev}>&lt;</button>
      {visible().map((item, idx) => (
        <CarouselCard
          key={idx}
          theme={item.theme}
          image={item.image}
          isActive={currentIndex === idx + visibleBase}
        />
      ))}
      <button className="carrousel-arrow" onClick={handleNext}>&gt;</button>
    </div>
  );
}
