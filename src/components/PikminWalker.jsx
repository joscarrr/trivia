import { useCallback, useEffect, useRef, useState } from 'react';
import pikminWalk from '../../images/pikminwalk.gif';

function createWalk() {
  const leftToRight = Math.random() > 0.5;
  return {
    id: Date.now(),
    direction: leftToRight ? 'ltr' : 'rtl',
    duration: Number((7.5 + Math.random() * 2).toFixed(2)),
  };
}

function randomDelay() {
  return Math.round(2500 + Math.random() * 5500);
}

export default function PikminWalker({ paused = false }) {
  const [walk, setWalk] = useState(null);
  const timerRef = useRef();
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const scheduleNextWalk = useCallback((delay = randomDelay()) => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (pausedRef.current) {
        scheduleNextWalk(500);
        return;
      }
      setWalk(createWalk());
    }, delay);
  }, []);

  useEffect(() => {
    scheduleNextWalk();
    return () => window.clearTimeout(timerRef.current);
  }, [scheduleNextWalk]);

  const handleAnimationEnd = () => {
    setWalk(null);
    scheduleNextWalk();
  };

  return (
    <div className="pikmin-layer" aria-hidden="true">
      {walk && (
        <img
          key={walk.id}
          className={`pikmin-walker pikmin-walker--${walk.direction} ${paused ? 'pikmin-walker--paused' : ''}`}
          src={pikminWalk}
          alt=""
          style={{
            '--walk-duration': `${walk.duration}s`,
          }}
          onAnimationEnd={handleAnimationEnd}
        />
      )}
    </div>
  );
}
