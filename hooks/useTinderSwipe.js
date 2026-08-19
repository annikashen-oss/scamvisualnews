// src/pages/ScamVisualNews/hooks/useTinderSwipe.js
import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * 自定义 Hook：Tinder 风格卡片滑动
 * @param {Object} options
 * @param {number} options.threshold - 触发滑动的阈值（像素），默认 100
 * @param {Function} options.onSwipeLeft - 左滑回调（通常表示“安全/拒绝”）
 * @param {Function} options.onSwipeRight - 右滑回调（通常表示“风险/接受”）
 * @param {number} options.flyDistance - 飞出距离，默认 250
 * @returns {Object} { ref, style, resetPosition, isDragging }
 */
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
  const pointerIdRef = useRef(null);

  // 重置卡片到初始位置（无动画）
  const resetPosition = useCallback(() => {
    setTransform('translateX(0px) rotate(0deg)');
    setIsFlying(false);
    currentX.current = 0;
  }, []);

  // 主动触发飞出（供外部按钮调用）
  const flyOut = useCallback(
    (direction) => {
      if (isFlying) return;
      setIsFlying(true);
      const dx = direction === 'right' ? flyDistance : -flyDistance;
      const rot = direction === 'right' ? 30 : -30;
      setTransform(`translateX(${dx}px) translateY(50px) rotate(${rot}deg) scale(0.5)`);
      setTransform((prev) => prev); // 确保状态更新

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
      pointerIdRef.current = e.pointerId;
      startX.current = e.clientX;
      element.setPointerCapture(e.pointerId);
      element.style.transition = 'none'; // 拖动时取消过渡动画
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
        // 右滑（风险）
        setIsFlying(true);
        setTransform(`translateX(${flyDistance}px) translateY(50px) rotate(30deg) scale(0.5)`);
        setTimeout(() => {
          onSwipeRight?.();
          resetPosition();
          setIsFlying(false);
        }, 300);
      } else if (dist < -threshold) {
        // 左滑（安全）
        setIsFlying(true);
        setTransform(`translateX(-${flyDistance}px) translateY(50px) rotate(-30deg) scale(0.5)`);
        setTimeout(() => {
          onSwipeLeft?.();
          resetPosition();
          setIsFlying(false);
        }, 300);
      } else {
        // 未达阈值，回正
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
    flyOut,      // 供按钮调用：flyOut('left') 或 flyOut('right')
    resetPosition,
  };
};
