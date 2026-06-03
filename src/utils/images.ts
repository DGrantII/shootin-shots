const IMAGES_BASE = `${import.meta.env.BASE_URL}images/`;

/** Resolve manifest paths (./images/foo.webp) to Vite public URLs. */
export function resolveImagePath(manifestPath: string): string {
  const filename = manifestPath.replace(/^\.\/images\//, '');
  return `${IMAGES_BASE}${filename}`;
}

export function resolveSrcset(srcset: string): string {
  return srcset
    .split(',')
    .map((part) => {
      const trimmed = part.trim();
      const spaceIndex = trimmed.lastIndexOf(' ');
      if (spaceIndex === -1) {
        return resolveImagePath(trimmed);
      }
      const url = trimmed.slice(0, spaceIndex);
      const descriptor = trimmed.slice(spaceIndex + 1);
      return `${resolveImagePath(url)} ${descriptor}`;
    })
    .join(', ');
}
