import { useEffect, useRef, useState } from 'react';

interface UseCounterOptions {
  duration?: number;
  startValue?: number;
  decimals?: number;
}

export const useCounter = (
  targetValue: number,
  options: UseCounterOptions = {}
) => {
  const { duration = 2500, startValue = 0, decimals = 0 } = options;
  const [count, setCount] = useState(startValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = startValue + (targetValue - startValue) * easeOut;

    setCount(currentValue);

    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setCount(targetValue);
      setHasAnimated(true);
    }
  };

  const startAnimation = () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || hasAnimated) {
      setCount(targetValue);
      setHasAnimated(true);
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    startTimeRef.current = null;
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toString();

  return {
    count: formattedCount,
    startAnimation,
    hasAnimated,
  };
};
