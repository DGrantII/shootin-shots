import type { GalleryImage, ImageManifest } from '../types';
import { manifest } from './manifest';

function buildGalleryImages(): GalleryImage[] {
  const entries = Object.entries(manifest as ImageManifest)
    .filter(([key]) => /^image\d+$/.test(key))
    .map(([key, entry]) => {
      const order = Number.parseInt(key.replace('image', ''), 10);
      return {
        key,
        order,
        alt: `Gallery photo ${order}`,
        entry,
      };
    })
    .sort((a, b) => a.order - b.order);

  return entries;
}

export const galleryImages = buildGalleryImages();

/** Split sorted images into two columns (odd / even order). */
export function splitGalleryColumns(images: GalleryImage[]): [GalleryImage[], GalleryImage[]] {
  const left: GalleryImage[] = [];
  const right: GalleryImage[] = [];

  for (const image of images) {
    if (image.order % 2 === 1) {
      left.push(image);
    } else {
      right.push(image);
    }
  }

  return [left, right];
}
