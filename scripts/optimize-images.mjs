/**
 * Resize and compress site images to match on-screen display sizes.
 * Generates WebP srcset variants and smaller JPEG/PNG fallbacks in public/images/.
 *
 * Usage: npm run optimize-images
 * Optional: place full-resolution masters in images-source/ (used when present).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imagesDir = path.join(root, 'public', 'images');
const sourceDir = path.join(root, 'images-source');
const manifestPath = path.join(imagesDir, 'manifest.json');

/** @type {Record<string, { widths: number[], sizes: string, webpQuality: number, jpegQuality: number, pngQuality?: number }>} */
const PRESETS = {
  gallery: {
    widths: [480, 960],
    sizes: '(max-width: 500px) 100vw, 50vw',
    webpQuality: 82,
    jpegQuality: 85,
  },
  home: {
    widths: [400, 800],
    sizes: '(max-width: 500px) 70vw, min(50vw, 500px)',
    webpQuality: 82,
    jpegQuality: 85,
  },
  profile: {
    widths: [300, 600],
    sizes: '(max-width: 800px) 300px, 300px',
    webpQuality: 82,
    jpegQuality: 85,
  },
  logo: {
    widths: [640, 1000],
    sizes: '(max-width: 1000px) 100vw, 1000px',
    webpQuality: 90,
    jpegQuality: 90,
    pngQuality: 90,
  },
};

function presetForFile(name) {
  if (/^image\d+\.jpe?g$/i.test(name)) {
    return 'gallery';
  }
  if (/^bubble\d+\.jpe?g$/i.test(name)) {
    return 'home';
  }
  if (/^profile\.jpe?g$/i.test(name)) {
    return 'profile';
  }
  if (/^shootin-shots-logo\.png$/i.test(name)) {
    return 'logo';
  }
  return null;
}

function variantName(base, width, ext) {
  return `${base}-${width}w.${ext}`;
}

async function resolveInputPath(fileName) {
  const fromSource = path.join(sourceDir, fileName);
  try {
    await fs.access(fromSource);
    return fromSource;
  } catch {
    return path.join(imagesDir, fileName);
  }
}

/**
 * @param {string} fileName
 * @returns {Promise<{ base: string, preset: string, srcset: string, fallback: string, width: number, height: number, sizes: string, fallbackType: string } | null>}
 */
async function optimizeFile(fileName) {
  const presetKey = presetForFile(fileName);
  if (!presetKey) {
    return null;
  }

  const preset = PRESETS[presetKey];
  const inputPath = await resolveInputPath(fileName);
  const ext = path.extname(fileName).toLowerCase();
  const base = path.basename(fileName, ext);
  const isLogo = presetKey === 'logo';

  const inputBuffer = await fs.readFile(inputPath);
  const orientedBuffer = await sharp(inputBuffer).rotate().toBuffer();
  const metadata = await sharp(orientedBuffer).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read dimensions for ${fileName}`);
  }

  const cap = Math.min(metadata.width, Math.max(...preset.widths));
  let targetWidths = preset.widths.filter((w) => w <= cap);
  if (!targetWidths.length || targetWidths[targetWidths.length - 1] < cap) {
    targetWidths.push(cap);
  }
  targetWidths = [...new Set(targetWidths)].sort((a, b) => a - b);
  const maxWidth = targetWidths[targetWidths.length - 1];

  const webpSources = [];

  for (const width of targetWidths) {
    const webpName = variantName(base, width, 'webp');
    const webpPath = path.join(imagesDir, webpName);
    await sharp(orientedBuffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: preset.webpQuality })
      .toFile(webpPath);
    webpSources.push({ width, file: webpName });
  }

  let fallbackName;
  let fallbackType;
  let outWidth;
  let outHeight;

  if (isLogo) {
    fallbackName = fileName;
    fallbackType = 'image/png';
    const out = await sharp(orientedBuffer)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .png({ quality: preset.pngQuality ?? 90, compressionLevel: 9 })
      .toBuffer();
    const info = await sharp(out).metadata();
    outWidth = info.width ?? maxWidth;
    outHeight = info.height ?? metadata.height;
    await fs.writeFile(path.join(imagesDir, fallbackName), out);
  } else {
    const jpegExt = ext === '.jpg' ? '.jpg' : '.jpeg';
    fallbackName = `${base}${jpegExt}`;
    fallbackType = 'image/jpeg';
    const out = await sharp(orientedBuffer)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality: preset.jpegQuality, mozjpeg: true })
      .toBuffer();
    const info = await sharp(out).metadata();
    outWidth = info.width ?? maxWidth;
    outHeight = info.height ?? metadata.height;
    await fs.writeFile(path.join(imagesDir, fallbackName), out);
  }

  const srcset = webpSources.map(({ file, width }) => `./images/${file} ${width}w`).join(', ');

  return {
    base,
    preset: presetKey,
    srcset,
    fallback: `./images/${fallbackName}`,
    width: outWidth,
    height: outHeight,
    sizes: preset.sizes,
    fallbackType,
  };
}

async function pruneOldVariants() {
  const files = await fs.readdir(imagesDir);
  await Promise.all(
    files
      .filter((name) => /-\d+w\.(webp|jpe?g|png)$/i.test(name))
      .map((name) => fs.unlink(path.join(imagesDir, name))),
  );
}

async function main() {
  await fs.mkdir(imagesDir, { recursive: true });

  const useSource = await fs
    .access(sourceDir)
    .then(() => true)
    .catch(() => false);
  if (useSource) {
    console.log('Using masters from images-source/');
  }

  await pruneOldVariants();

  const dir = useSource ? sourceDir : imagesDir;
  const names = (await fs.readdir(dir)).filter((name) => presetForFile(name));
  /** @type {Record<string, Awaited<ReturnType<typeof optimizeFile>>>} */
  const manifest = {};

  for (const name of names) {
    console.log(`Optimizing ${name}…`);
    const result = await optimizeFile(name);
    if (result) {
      manifest[result.base] = result;
    }
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`Done. Processed ${names.length} image(s). Wrote manifest.json.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
