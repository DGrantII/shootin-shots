import { useCallback, useEffect, useRef } from 'react';
import type { GalleryImage } from '../types';
import { ResponsivePicture } from './ResponsivePicture';

interface GalleryLightboxProps {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const image = images[activeIndex];

  const goPrev = useCallback(() => {
    const next = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    onNavigate(next);
  }, [activeIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    const next = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    onNavigate(next);
  }, [activeIndex, images.length, onNavigate]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        goPrev();
      } else if (event.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  if (!image) {
    return null;
  }

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="gallery-lightbox-close"
        aria-label="Close photo viewer"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        &times;
      </button>

      <button
        type="button"
        className="gallery-lightbox-nav gallery-lightbox-nav--prev"
        aria-label="Previous photo"
        onClick={(event) => {
          event.stopPropagation();
          goPrev();
        }}
      >
        &#8249;
      </button>

      <div
        className="gallery-lightbox-image-wrap"
        onClick={(event) => event.stopPropagation()}
      >
        <ResponsivePicture
          entry={image.entry}
          alt={image.alt}
          sizes="100vw"
          loading="eager"
        />
      </div>

      <button
        type="button"
        className="gallery-lightbox-nav gallery-lightbox-nav--next"
        aria-label="Next photo"
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
      >
        &#8250;
      </button>
    </div>
  );
}
