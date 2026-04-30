import { motion } from 'framer-motion';
import onePieceLogo from '../../images/onepiecelogo.png';

export default function CompletionState({ onRestart, score, total }) {
  return (
    <motion.div
      className="completion"
      initial={{ opacity: 0, scale: 0.9, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="completion__crest"
      >
        <img src={onePieceLogo} alt="One Piece" />
      </motion.div>
      <p className="question-kicker">Puntaje final {score} / {total}</p>
      <h1>¡Felicidades, te has ganado la ubicación del ONE PIECE!</h1>
      <p className="completion__copy">
        Tendrás que irlo a buscar el viernes a las 5 de la tarde.
      </p>
      <iframe
        className="map-frame"
        title="Ubicación del ONE PIECE"
        src="https://maps.google.com/maps?q=Av.%20De%20La%20Mancha%20293&t=&z=16&ie=UTF8&iwloc=&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <motion.button
        className="restart-button"
        type="button"
        onClick={onRestart}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        Jugar de nuevo
      </motion.button>
    </motion.div>
  );
}
