import type { ImgHTMLAttributes } from 'react';
import type { ImageManifestEntry } from '../types';
import { resolveImagePath, resolveSrcset } from '../utils/images';

interface ResponsivePictureProps {
  entry: ImageManifestEntry;
  alt: string;
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  sizes?: string;
  className?: string;
  imgClassName?: string;
  dataOrder?: number;
  onClick?: () => void;
}

export function ResponsivePicture({
  entry,
  alt,
  loading = 'lazy',
  sizes,
  className,
  imgClassName,
  dataOrder,
  onClick,
}: ResponsivePictureProps) {
  return (
    <picture className={className}>
      <source
        type="image/webp"
        srcSet={resolveSrcset(entry.srcset)}
        sizes={sizes ?? entry.sizes}
      />
      <img
        src={resolveImagePath(entry.fallback)}
        width={entry.width}
        height={entry.height}
        alt={alt}
        loading={loading}
        decoding="async"
        className={imgClassName}
        data-order={dataOrder}
        onClick={onClick}
      />
    </picture>
  );
}
