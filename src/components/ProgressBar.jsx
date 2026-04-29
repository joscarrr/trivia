import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const progress = Math.round((current / total) * 100);

  return (
    <div className="progress-wrap" aria-label={`Pregunta ${current} de ${total}`}>
      <div className="progress-meta">
        <span>Pregunta {current}</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="progress-spark" />
        </motion.div>
      </div>
    </div>
  );
}
