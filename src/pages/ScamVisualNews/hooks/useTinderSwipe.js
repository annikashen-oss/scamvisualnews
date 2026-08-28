// src/pages/ScamVisualNews/hooks/useTinderSwipe.js
import { useRef, useState, useEffect, useCallback } from 'react';

export const useTinderSwipe = ({
  threshold = 100,
  flyDistance = 250,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState('translateX(0px) rotate(0deg)');
  const [isDragging, setIsDragging] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const startX = useRef(0);
  const currentX = useRef(0);

  const resetPosition = useCallback(() => {
    setTransform('translateX(0px) rotate(0deg)');
    setIsFlying(false);
    currentX.current = 0;
  }, []);

  const flyOut = useCallback(
    (direction) => {
      if (isFlying) return;
      setIsFlying(true);
      const dx = direction === 'right' ? flyDistance : -flyDistance;
      const rot = direction === 'right' ? 30 : -30;
      setTransform(`translateX(${dx}px) translateY(50px) rotate(${rot}deg) scale(0.5)`);

      setTimeout(() => {
        if (direction === 'right') {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
        resetPosition();
      }, 300);
    },
    [flyDistance, isFlying, onSwipeLeft, onSwipeRight, resetPosition]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onPointerDown = (e) => {
      if (isFlying) return;
      setIsDragging(true);
      startX.current = e.clientX;
      element.setPointerCapture(e.pointerId);
      element.style.transition = 'none';
    };

    const onPointerMove = (e) => {
      if (!isDragging || isFlying) return;
      currentX.current = e.clientX - startX.current;
      const rot = currentX.current * 0.05;
      setTransform(`translateX(${currentX.current}px) rotate(${rot}deg)`);
    };

    const onPointerUp = (e) => {
      if (!isDragging || isFlying) return;
      setIsDragging(false);
      element.releasePointerCapture(e.pointerId);
      element.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

      const dist = currentX.current;

      if (dist > threshold) {
        // 右滑 ➔ 進入右邊箱子
        setIsFlying(true);
        setTransform(`translateX(${flyDistance}px) translateY(50px) rotate(30deg) scale(0.5)`);
        setTimeout(() => {
          onSwipeRight?.();
          resetPosition();
          setIsFlying(false);
        }, 300);
      } else if (dist < -threshold) {
        // 左滑 ➔ 進入左邊箱子
        setIsFlying(true);
        setTransform(`translateX(-${flyDistance}px) translateY(50px) rotate(-30deg) scale(0.5)`);
        setTimeout(() => {
          onSwipeLeft?.();
          resetPosition();
          setIsFlying(false);
        }, 300);
      } else {
        setTransform('translateX(0px) rotate(0deg)');
        currentX.current = 0;
      }
    };

    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerup', onPointerUp);

    return () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
    };
  }, [isDragging, isFlying, threshold, flyDistance, onSwipeLeft, onSwipeRight, resetPosition]);

  return {
    ref,
    style: { transform, transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' },
    isDragging,
    isFlying,
    flyOut,
    resetPosition,
  };
};
