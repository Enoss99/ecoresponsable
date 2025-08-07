import React from 'react';
import './CarrouselCard.css';

type Rubrique = {
  id: number;
  titre: string;
};

type Props = {
  rubrique: Rubrique;
  onClick: () => void;
};

export default function CarrouselCard({ rubrique, onClick }: Props) {
  return (
    <div className="carrousel-card" onClick={onClick}>
      <h3>{rubrique.titre}</h3>
    </div>
  );
}
