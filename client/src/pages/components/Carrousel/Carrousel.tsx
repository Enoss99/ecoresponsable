import React from 'react';
import CarrouselCard from '../CarrouselCard/CarrouselCard';
import CarrouselPagination from '../CarrouselPagination/CarrouselPagination';
import './Carrousel.css';

type Rubrique = {
  id: number;
  titre: string;
};

type Props = {
  rubriques: Rubrique[];
  onRubriqueClick: (id: number) => void;
};

export default function Carrousel({ rubriques, onRubriqueClick }: Props) {
  return (
    <div className="carrousel-container">
      <div className="carrousel-content">
        {Array.isArray(rubriques) && rubriques.map(rubrique => (
          <CarrouselCard key={rubrique.id} rubrique={rubrique} onClick={() => onRubriqueClick(rubrique.id)} />
        ))}
      </div>
      <CarrouselPagination count={rubriques.length} />
    </div>
  );
}
