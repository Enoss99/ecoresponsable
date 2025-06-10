import React from 'react';

export default function NotFound() {
  return (
    <div>
      <h2>404 - Page non trouvée</h2>
      <p>Oups ! Cette page n'existe pas.</p>
    <img 
    src="/img/404.jpg"
    alt="Page perdue"
    style={{ display: 'block', margin: '2rem auto' }}></img>
    </div>
  );
}
