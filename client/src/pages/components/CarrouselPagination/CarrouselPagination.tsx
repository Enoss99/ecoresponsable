import React from 'react';
import './CarrouselPagination.css';

type Props = {
  count: number;
};

export default function CarrouselPagination({ count }: Props) {
  return (
    <div className="carrousel-pagination">
      {Array.from({ length: count }).map((_, idx) => (
        <span key={idx} className="dot" />
      ))}
    </div>
  );
}
