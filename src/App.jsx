import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { questions } from './data/questions';
import QuizContainer from './components/QuizContainer';
import EffectsLayer from './components/EffectsLayer';
import PikminWalker from './components/PikminWalker';
import shoesukeIcon from '../images/shoesuke.webp';
import onePieceRealAudio from '../audio/onepiecereal.mp3';

const FEEDBACK_DELAY = 1250;
const correctEffectImages = Object.values(
  import.meta.glob('../images/correct*.{png,jpg,jpeg,gif,webp}', {
    eager: true,
    import: 'default',
  }),
);
const wrongEffectImages = Object.values(
  import.meta.glob('../images/wrong*.{png,jpg,jpeg,gif,webp}', {
    eager: true,
    import: 'default',
  }),
);

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function playAudioUntilDone(src, fallbackMs) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(fallbackMs);
      return;
    }

    const audio = new Audio(src);
    let settled = false;
    let fallbackTimer = window.setTimeout(() => finish(fallbackMs), fallbackMs);

    function finish(delayMs) {
      if (settled) return;
      settled = true;
      window.clearTimeout(fallbackTimer);
      resolve(delayMs);
    }

    audio.addEventListener('ended', () => finish(0), { once: true });
    audio.addEventListener('error', () => finish(fallbackMs), { once: true });
    audio.addEventListener(
      'loadedmetadata',
      () => {
        if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
        window.clearTimeout(fallbackTimer);
        fallbackTimer = window.setTimeout(() => finish(fallbackMs), audio.duration * 1000 + 700);
      },
      { once: true },
    );

    audio.play().catch(() => finish(fallbackMs));
  });
}

function playAudioForDuration(src, durationMs) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(durationMs);
      return;
    }

    const audio = new Audio(src);
    const timer = window.setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      resolve(0);
    }, durationMs);

    audio.addEventListener(
      'error',
      () => {
        window.clearTimeout(timer);
        resolve(durationMs);
      },
      { once: true },
    );

    audio.play().catch(() => {
      window.clearTimeout(timer);
      resolve(durationMs);
    });
  });
}

function playAudio(src) {
  if (!src) return;
  const audio = new Audio(src);
  audio.play().catch(() => {});
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [bursts, setBursts] = useState([]);
  const [shakeKey, setShakeKey] = useState(0);
  const [specialEffect, setSpecialEffect] = useState(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    document.title = 'super mega trivia épica';

    const selector = 'link[rel="icon"]';
    let favicon = document.querySelector(selector);
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    favicon.type = 'image/webp';
    favicon.href = shoesukeIcon;
  }, []);

  useEffect(() => {
    [...correctEffectImages, ...wrongEffectImages].forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (!isComplete) return;
    playAudio(onePieceRealAudio);
  }, [isComplete]);

  const pushBurst = useCallback((type, count) => {
    const id = `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const sourceImages = type === 'incorrect' ? wrongEffectImages : correctEffectImages;
    const pieces = Array.from({ length: count }, (_, index) => ({
      id: `${id}-${index}`,
      imageSrc: randomFrom(sourceImages),
      startX: Math.round((Math.random() - 0.5) * 180),
      startY: Math.round((Math.random() - 0.5) * 90),
      x: Math.round((Math.random() - 0.5) * 520),
      y: Math.round(130 + Math.random() * 240),
      drift: Math.round((Math.random() - 0.5) * 170),
      delay: Number((Math.random() * 0.26).toFixed(2)),
      duration: Number((1.65 + Math.random() * 0.55).toFixed(2)),
      scale: Number((0.88 + Math.random() * 0.38).toFixed(2)),
    }));

    setBursts((active) => [...active, { id, type, pieces }]);
    window.setTimeout(() => {
      setBursts((active) => active.filter((burst) => burst.id !== id));
    }, 2500);
  }, []);

  const handleAnswer = useCallback(
    async (answer) => {
      if (selectedAnswerId) return;

      const isCorrect = answer.correct;
      const correctEffect = isCorrect ? currentQuestion.correctEffect : null;
      let delayedEffectTimer;
      setSelectedAnswerId(answer.id);
      setFeedback(isCorrect ? 'correct' : 'incorrect');

      if (isCorrect) {
        setScore((value) => value + 1);
        if (correctEffect) {
          setBursts([]);
          if (correctEffect.type === 'kiss') {
            setSpecialEffect({
              id: `${correctEffect.type}-${Date.now()}`,
              type: correctEffect.type,
            });
          }
          if (correctEffect.type === 'timeStop') {
            delayedEffectTimer = window.setTimeout(() => {
              setSpecialEffect({
                id: `${correctEffect.type}-${Date.now()}`,
                type: correctEffect.type,
              });
            }, 1000);
          }
        } else {
          playAudio(currentQuestion.correctAudio);
          pushBurst('correct', 8);
        }
      } else {
        playAudio(currentQuestion.incorrectAudio);
        setShakeKey((value) => value + 1);
        pushBurst('incorrect', 6);
      }

      const effectDelay = correctEffect
        ? correctEffect.type === 'kiss'
          ? await playAudioForDuration(correctEffect.audio, 1450)
          : await playAudioUntilDone(correctEffect.audio, 3200)
        : FEEDBACK_DELAY;

      window.setTimeout(() => {
        if (delayedEffectTimer) {
          window.clearTimeout(delayedEffectTimer);
        }
        const nextIndex = currentIndex + 1;
        if (nextIndex >= questions.length) {
          setIsComplete(true);
        } else {
          setCurrentIndex(nextIndex);
        }
        setSelectedAnswerId(null);
        setFeedback(null);
        setSpecialEffect(null);
      }, effectDelay);
    },
    [currentIndex, currentQuestion, pushBurst, selectedAnswerId],
  );

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswerId(null);
    setFeedback(null);
    setIsComplete(false);
    setSpecialEffect(null);
  }, []);

  const appMotion = useMemo(
    () =>
      feedback === 'incorrect'
        ? {
            x: [0, -9, 8, -5, 4, 0],
            filter: [
              'saturate(1)',
              'saturate(1.3)',
              'saturate(1.15)',
              'saturate(1)',
            ],
            transition: { duration: 0.46, ease: 'easeOut' },
          }
        : {},
    [feedback, shakeKey],
  );

  return (
    <main className="app-shell">
      <div className="background-image" />
      <div className="background-veil" />
      <PikminWalker paused={specialEffect?.type === 'timeStop'} />
      <EffectsLayer bursts={bursts} feedback={feedback} specialEffect={specialEffect} />

      <motion.div key={shakeKey} className="stage" animate={appMotion}>
        <AnimatePresence mode="wait">
          <QuizContainer
            key={isComplete ? 'complete' : currentQuestion.id}
            currentIndex={currentIndex}
            feedback={feedback}
            isComplete={isComplete}
            onAnswer={handleAnswer}
            onRestart={handleRestart}
            question={currentQuestion}
            score={score}
            selectedAnswerId={selectedAnswerId}
            total={questions.length}
          />
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
