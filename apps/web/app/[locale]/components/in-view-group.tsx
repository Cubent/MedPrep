'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

type InViewGroupProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Flips `data-inview` to "true" the first time it scrolls into view, which is
 * what the dashboard preview's CSS keys its animations off. Users who prefer
 * reduced motion (or browsers without IntersectionObserver) get the final
 * state straight away. The server-rendered markup already contains every
 * value as real text, so the animation never hides content from crawlers.
 */
export const InViewGroup = ({ className, children }: InViewGroupProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-inview={inView} className={className}>
      {children}
    </div>
  );
};
