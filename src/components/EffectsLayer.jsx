import { motion } from 'framer-motion';

const ambientParticles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: (index % 7) * 0.55,
  size: 5 + (index % 4) * 3,
}));

function EffectImage({ piece, type }) {
  const isWrong = type === 'incorrect';
  const isComplete = type === 'complete';
  const style = {
    '--start-x': `${piece.startX}px`,
    '--start-y': `${piece.startY}px`,
    '--mid-x': `${Math.round(piece.x * 0.45)}px`,
    '--mid-y': `${piece.startY + (isWrong ? 46 : -52)}px`,
    '--end-x': `${piece.x + piece.drift}px`,
    '--end-y': `${isWrong ? piece.y : -piece.y}px`,
    '--bubble-scale': piece.scale,
    '--bubble-end-scale': piece.scale * (isWrong ? 0.96 : 0.98),
    '--bubble-duration': `${piece.duration}s`,
    '--bubble-delay': `${piece.delay}s`,
  };

  if (isWrong) {
    return (
      <div className="burst-piece broken-piece bubble-piece bubble-piece--wrong" style={style}>
        <img className="effect-image effect-image--wrong" src={piece.imageSrc} alt="" />
      </div>
    );
  }

  return (
    <div
      className={`burst-piece bubble-piece bubble-piece--correct ${isComplete ? 'heart-piece--gold' : ''}`}
      style={style}
    >
      <img
        className={`effect-image ${isComplete ? 'effect-image--complete' : ''}`}
        src={piece.imageSrc}
        alt=""
      />
    </div>
  );
}

export default function EffectsLayer({ bursts, feedback, specialEffect }) {
  return (
    <>
      <div className="effects-layer" aria-hidden="true">
        <div className="light-ribbon light-ribbon--one" />
        <div className="light-ribbon light-ribbon--two" />
        <div className="ambient-field">
          {ambientParticles.map((particle) => (
            <span
              key={particle.id}
              className="ambient-heart"
              style={{
                '--left': particle.left,
                '--top': particle.top,
                '--delay': `${particle.delay}s`,
                '--size': `${particle.size}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="reaction-layer" aria-hidden="true">
        <motion.div
          className="mist-vignette"
          animate={{ opacity: feedback === 'incorrect' ? [0, 0.46, 0] : 0 }}
          transition={{ duration: 0.66 }}
        />
        {specialEffect?.type === 'kiss' && (
          <div key={specialEffect.id} className="special-effect kiss-effect">
            😘
          </div>
        )}
        {specialEffect?.type === 'timeStop' && (
          <div key={specialEffect.id} className="special-effect time-stop-effect">
            <span className="time-stop-ring time-stop-ring--one" />
            <span className="time-stop-ring time-stop-ring--two" />
            <span className="time-stop-ring time-stop-ring--three" />
            <span className="time-stop-ring time-stop-ring--four" />
          </div>
        )}
        <div className="burst-stage">
          {bursts.map((burst) =>
            burst.pieces.map((piece) => (
              <EffectImage key={piece.id} piece={piece} type={burst.type} />
            )),
          )}
        </div>
      </div>
    </>
  );
}
