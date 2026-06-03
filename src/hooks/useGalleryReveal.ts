import { useEffect, useRef } from 'react';

const STAGGER_MS = 150;

export function useGalleryReveal(imageCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || imageCount === 0) {
      return;
    }

    const images = Array.from(container.querySelectorAll('img'));
    images.sort(
      (a, b) =>
        Number.parseInt(a.dataset.order ?? '0', 10) -
        Number.parseInt(b.dataset.order ?? '0', 10),
    );

    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const showNext = () => {
      if (index < images.length) {
        images[index].classList.add('visible');
        index += 1;
        timeoutId = setTimeout(showNext, STAGGER_MS);
      }
    };

    showNext();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [imageCount]);

  return containerRef;
}
