import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Questionnaire.css';

type ChoixReponse = {
  texte: string;
  valeur: number;
};

type Question = {
  id: number;
  texte: string;
  choixreponse: ChoixReponse[];
};

type RouteParams = {
  id: string; // car useParams renvoie toujours des strings
};

export default function QuestionnairePage() {
  const { id } = useParams<RouteParams>();
  const rubriqueId = parseInt(id || '0');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reponses, setReponses] = useState<{ [id: number]: number }>({});
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (!rubriqueId) return;
    fetch(`http://localhost:4000/api/rubrique/${rubriqueId}/question`)
      .then(res => res.json())
      .then(setQuestions)
      .catch(err => console.error('Erreur chargement questions', err));
  }, [rubriqueId]);

 useEffect(() => {
    if (currentIndex < questions.length) {
        setCurrentQuestion(questions[currentIndex]);
    } else {
        setCurrentIndex(0);
        setCurrentQuestion(null);
    }
  }, [currentIndex, questions]);


  const handleReponse = (valeur: number) => {
    if (currentQuestion) {
      setReponses({ ...reponses, [currentQuestion.id]: valeur });
    }
  };

  const isAnswered = (id: number) => reponses.hasOwnProperty(id);

  return (
    <div className="questionnaire-page">
      <div className="question-section">
        {currentQuestion ? (
          <>
            <p className="question-texte">{currentQuestion.texte}</p>
            <ul className="choix-reponse-list">
              {currentQuestion.choixreponse?.map((choix, index) => (
                <li key={index} className="choix-reponse">
                  <input
                    type="radio"
                    name={`reponse-${currentQuestion.id}`}
                    checked={reponses[currentQuestion.id] === choix.valeur}
                    onChange={() => handleReponse(choix.valeur)}
                  />
                  <span>{choix.texte}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>

      <div className="pagination-section">
        <div className="pagination-box">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`page-item ${index === currentIndex ? 'active' : ''} ${isAnswered(questions[index].id) ? 'answered' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="navigation-buttons">
          <button onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}>Retour</button>
          <button onClick={() => setCurrentIndex(i => Math.min(i + 1, questions.length - 1))}>Avancer</button>
        </div>
      </div>
    </div>
  );
}
