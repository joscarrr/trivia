import { motion } from 'framer-motion';
import flowersImage from '../../images/flowers.png';
import CompletionState from './CompletionState';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';

export default function QuizContainer({
  currentIndex,
  feedback,
  isComplete,
  onAnswer,
  onRestart,
  question,
  score,
  selectedAnswerId,
  total,
}) {
  return (
    <motion.section
      className="quiz-shell"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div className="quiz-shell__shine" />
      <img className="quiz-flowers" src={flowersImage} alt="" aria-hidden="true" />
      {isComplete ? (
        <CompletionState score={score} total={total} onRestart={onRestart} />
      ) : (
        <>
          <ProgressBar current={currentIndex + 1} total={total} />
          <QuestionCard
            feedback={feedback}
            question={question}
            questionNumber={currentIndex + 1}
            score={score}
            selectedAnswerId={selectedAnswerId}
            total={total}
            onAnswer={onAnswer}
          />
        </>
      )}
    </motion.section>
  );
}
