export interface ImageManifestEntry {
  base: string;
  preset: string;
  srcset: string;
  fallback: string;
  width: number;
  height: number;
  sizes: string;
  fallbackType: string;
}

export type ImageManifest = Record<string, ImageManifestEntry>;

export interface GalleryImage {
  key: string;
  order: number;
  alt: string;
  entry: ImageManifestEntry;
}

export interface Service {
  id: string;
  imageKey: string;
  title: string;
  lead: string;
  body: string;
  imageSide: 'left' | 'right';
}
