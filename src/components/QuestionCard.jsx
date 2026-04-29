import { AnimatePresence, motion } from 'framer-motion';
import AnswerOption from './AnswerOption';

export default function QuestionCard({
  feedback,
  onAnswer,
  question,
  questionNumber,
  score,
  selectedAnswerId,
  total,
}) {
  return (
    <div className="question-card">
      <div className="question-card__topline">
        <span>{questionNumber} / {total}</span>
        <span>Pointo {score}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <p className="question-kicker">super mega trivia épica</p>
          <h1>{question.prompt}</h1>

          {question.media?.type === 'image' && (
            <figure className="question-media">
              <img src={question.media.src} alt={question.media.alt || ''} />
            </figure>
          )}

          {question.media?.type === 'video' && (
            <figure className="question-media question-media--video">
              <video src={question.media.src} controls preload="metadata">
                {question.media.label}
              </video>
            </figure>
          )}

          <div className="answers-grid">
            {question.answers.map((answer, index) => (
              <AnswerOption
                key={answer.id}
                answer={answer}
                disabled={Boolean(selectedAnswerId)}
                feedback={feedback}
                index={index}
                isSelected={selectedAnswerId === answer.id}
                onSelect={onAnswer}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
