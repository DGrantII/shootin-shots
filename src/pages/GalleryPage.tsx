import { useRef, useState } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { ResponsivePicture } from '../components/ResponsivePicture';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { PageMeta } from '../components/PageMeta';
import { galleryImages, splitGalleryColumns } from '../data/galleryImages';
import { useGalleryReveal } from '../hooks/useGalleryReveal';

export function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const galleryRef = useGalleryReveal(galleryImages.length);
  const [leftColumn, rightColumn] = splitGalleryColumns(galleryImages);

  const openLightbox = (index: number, trigger: HTMLElement) => {
    lastFocusedRef.current = trigger;
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
    lastFocusedRef.current?.focus();
  };

  const renderColumn = (images: typeof galleryImages) =>
    images.map((image) => {
      const globalIndex = galleryImages.findIndex((item) => item.key === image.key);
      const isFirst = image.order === 1;

      return (
        <button
          key={image.key}
          type="button"
          className="gallery-thumb"
          aria-label={`View ${image.alt} full screen`}
          onClick={(event) => openLightbox(globalIndex, event.currentTarget)}
        >
          <ResponsivePicture
            entry={image.entry}
            alt={image.alt}
            loading={isFirst ? 'eager' : 'lazy'}
            dataOrder={image.order}
          />
        </button>
      );
    });

  return (
    <>
      <PageMeta
        title="Gallery"
        description="Explore the captivating gallery showcasing the finest photography work by Cassidy Sophier. See graduations, events, and more."
        keywords="photography, videography, Cassidy Sophier, Shootin' Shots, photo gallery"
      />
      <SiteHeader />
      <main className="gallery-page">
        <h1>Gallery</h1>
        <div className="gallery" ref={galleryRef}>
          <div className="gallery-column">{renderColumn(leftColumn)}</div>
          <div className="gallery-column">{renderColumn(rightColumn)}</div>
        </div>
      </main>
      {activeIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
