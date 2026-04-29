import { motion } from 'framer-motion';

const optionLabels = ['A', 'B', 'C'];

function AnswerMedia({ answer }) {
  if (answer.type === 'image') {
    return <img className="answer-media" src={answer.content} alt="" />;
  }

  if (answer.type === 'audio') {
    return <audio className="answer-media" src={answer.content} controls />;
  }

  if (answer.type === 'video') {
    return <video className="answer-media" src={answer.content} controls />;
  }

  return <span>{answer.content}</span>;
}

export default function AnswerOption({
  answer,
  disabled,
  feedback,
  index,
  isSelected,
  onSelect,
}) {
  const stateClass = isSelected && feedback ? `answer-option--${feedback}` : '';

  return (
    <motion.button
      className={`answer-option ${stateClass}`}
      type="button"
      disabled={disabled}
      onClick={() => onSelect(answer)}
      whileHover={!disabled ? { scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      animate={
        isSelected
          ? {
              scale: feedback === 'correct' ? [1, 1.045, 1] : [1, 0.985, 1],
            }
          : { scale: 1 }
      }
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <span className="answer-option__label">{optionLabels[index]}</span>
      <span className="answer-option__content">
        <AnswerMedia answer={answer} />
      </span>
      <span className="answer-option__ripple" />
    </motion.button>
  );
}
