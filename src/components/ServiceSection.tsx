import { useRef, type ReactNode } from 'react';
import type { Service } from '../types';
import { getManifestEntry } from '../data/manifest';
import { ResponsivePicture } from './ResponsivePicture';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ServiceSectionProps {
  service: Service;
}

function RevealBlock({
  side,
  className,
  children,
}: {
  side: 'left' | 'right';
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  return (
    <div ref={ref} className={`${className} hidden-${side}`}>
      {children}
    </div>
  );
}

export function ServiceSection({ service }: ServiceSectionProps) {
  const entry = getManifestEntry(service.imageKey);
  const imageAltMap: Record<string, string> = {
    bubble1: 'Wedding and engagement photography sample',
    bubble2: 'Graduation photography sample',
    bubble3: 'Business and headshot photography sample',
    bubble4: 'Event photography sample',
  };

  const imageBlock = (
    <RevealBlock side={service.imageSide} className="image-container">
      <ResponsivePicture
        entry={entry}
        alt={imageAltMap[service.imageKey] ?? service.title}
      />
    </RevealBlock>
  );

  const textSide = service.imageSide === 'left' ? 'right' : 'left';
  const textBlock = (
    <RevealBlock side={textSide} className="text-container description-card">
      <h3>{service.title}</h3>
      <p>
        <strong>{service.lead}</strong> {service.body}
      </p>
    </RevealBlock>
  );

  return (
    <section className="topic-section">
      {service.imageSide === 'left' ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </section>
  );
}
