import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getEvaluationReponses,
  updateReponse,
  finishEvaluation,
  type EQR,
  type FinishScore,
} from '../services/ServiceEvaluation';
import './EvaluationQuestionnairePage.css'; 

type RouteParams = { evaluationId: string };

export default function EvaluationQuestionnairePage() {
  const { evaluationId } = useParams<RouteParams>();
  const [questions, setQuestions] = useState<EQR[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<null | { evaluation: any; score: FinishScore }>(null);

  useEffect(() => {
    if (!evaluationId) return;
    getEvaluationReponses(Number(evaluationId))
      .then((items) => setQuestions(items))
      .catch((err) => console.error('Erreur chargement questions (EQR)', err));
  }, [evaluationId]);

  const current = questions[currentIndex];

  const handleReponse = async (eqrId: number, choixIndex: number) => {
    try {
      await updateReponse(eqrId, choixIndex);
      setQuestions((prev) =>
        prev.map((q) => (q.id === eqrId ? { ...q, reponse: choixIndex } : q))
      );
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la sauvegarde de la réponse');
    }
  };

  const isAnswered = (q: EQR) => q.reponse !== null && q.reponse !== -1;
  const allAnswered = questions.length > 0 && questions.every(isAnswered);

  const handleFinish = async () => {
    if (!evaluationId) return;
    try {
      const data = await finishEvaluation(Number(evaluationId));
      setResult(data);
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la finalisation');
    }
  };

  return (
    <div className="questionnaire-page">
      {/* Bloc résultat après terminaison */}
      {result ? (
        <div className="question-section">
          <h2>Résultat de l’évaluation</h2>
          <p><strong>Moyenne :</strong> {result.score.avgOn4} / 4</p>
          <p><strong>Grade :</strong> {result.score.grade}</p>
          <p><strong>Pourcentage :</strong> {result.score.percent}%</p>
          <p><strong>Total :</strong> {result.score.total} / {result.score.max}</p>

          <h3>Détail par rubrique</h3>
          <ul>
            {result.score.breakdown.map((b) => (
              <li key={b.rubriqueId}>
                Rubrique #{b.rubriqueId} — Moyenne {b.avgOn4.toFixed(2)} / 4 — Grade {b.grade}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="question-section">
            {current ? (
              <>
                <p className="question-texte">{current.question.texte}</p>
                <ul className="choix-reponse-list">
                  {current.choixreponse.map((choix, index) => (
                    <li key={index} className="choix-reponse">
                      <input
                        type="radio"
                        name={`reponse-${current.id}`}
                        checked={current.reponse === index}
                        onChange={() => handleReponse(current.id, index)}
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
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className={`page-item ${index === currentIndex ? 'active' : ''} ${isAnswered(q) ? 'answered' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <div className="navigation-buttons">
              <button onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}>Retour</button>
              <button onClick={() => setCurrentIndex((i) => Math.min(i + 1, questions.length - 1))}>Avancer</button>
            </div>

            <button className="submit-button" disabled={!allAnswered} onClick={handleFinish}>
              Terminer l’évaluation
            </button>
            {!allAnswered && <small>Réponds à toutes les questions pour terminer.</small>}
          </div>
        </>
      )}
    </div>
  );
}
