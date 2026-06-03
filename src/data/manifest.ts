import type { ImageManifestEntry } from '../types';
import manifest from '../../public/images/manifest.json';

export function getManifestEntry(key: string): ImageManifestEntry {
  const entry = (manifest as Record<string, ImageManifestEntry>)[key];
  if (!entry) {
    throw new Error(`Missing manifest entry for "${key}"`);
  }
  return entry;
}

export { manifest };
