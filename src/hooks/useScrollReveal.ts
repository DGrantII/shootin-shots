import { useEffect, type RefObject } from 'react';

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, OBSERVER_OPTIONS);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);
}
