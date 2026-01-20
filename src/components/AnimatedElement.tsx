import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const AnimatedElement = ({
  children,
  delay = 0,
  className = '',
  as: Component = 'div',
}: AnimatedElementProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    delay,
  });

  return (
    <Component
      ref={ref as any}
      className={`${className} ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-5'}`}
    >
      {children}
    </Component>
  );
};
