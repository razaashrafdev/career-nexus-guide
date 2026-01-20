import { useEffect, useRef } from 'react';
import { useCounter } from '@/hooks/useCounter';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1200,
  decimals = 0,
  className = '',
}: AnimatedCounterProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { count, startAnimation, hasAnimated } = useCounter(value, {
    duration,
    decimals,
  });
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (isVisible && !hasStartedRef.current && !hasAnimated) {
      startAnimation();
      hasStartedRef.current = true;
    }
  }, [isVisible, startAnimation, hasAnimated]);

  return (
    <span ref={ref as any} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};
