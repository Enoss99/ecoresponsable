import React from 'react';
import "./CarrouselPagination.css";

interface Props {
  count: number;
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
}

export default function Pagination({ count, currentIndex, setCurrentIndex }: Props) {
  return (
    <div className="comparateur-pagination">
      {Array.from({ length: count }).map((_, idx) => (
        <span
          key={idx}
          className={currentIndex === idx ? "dot active" : "dot"}
          onClick={() => setCurrentIndex(idx)}
        ></span>
      ))}
    </div>
  );
}
