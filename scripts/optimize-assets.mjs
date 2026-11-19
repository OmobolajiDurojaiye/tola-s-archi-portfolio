import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC_ART = path.join(ROOT, 'public', 'art');
const PUBLIC_PROJECTS = path.join(ROOT, 'public', 'projects');
const DATA_FILE = path.join(ROOT, 'src', 'data', 'projects.ts');

async function makeBlurDataURL(inputPath) {
  const buf = await sharp(inputPath)
    .resize(20, 20, { fit: 'inside' })
    .webp({ quality: 28 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

/**
 * Key out the flat cream studio backdrop from hero-elevation.jpg into real alpha transparency
 * so the building floats freely in 3D with ZERO rectangular card edges.
 */
async function buildHeroCutoutLayers() {
  const heroSrc = path.join(PUBLIC_ART, 'hero-elevation.jpg');
  if (!fs.existsSync(heroSrc)) throw new Error('Missing public/art/hero-elevation.jpg');

  // 1. Instant LCP static poster (AVIF + WebP, < 45KB)
  await sharp(heroSrc)
    .resize(1280)
    .avif({ quality: 52, effort: 4 })
    .toFile(path.join(PUBLIC_ART, 'hero-poster.avif'));

  await sharp(heroSrc)
    .resize(1280)
    .webp({ quality: 72 })
    .toFile(path.join(PUBLIC_ART, 'hero-poster.webp'));

  // 2. Alpha-keyed full elevation at 1200px wide for clean Z-depth slices in Three.js
  const { data, info } = await sharp(heroSrc)
    .resize(1200)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  // Sample top-left studio background RGB
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];

  const keyed = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = keyed[idx];
      const g = keyed[idx + 1];
      const b = keyed[idx + 2];
      const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);

      // Protect the interior white plaster building area from being keyed out
      const inUpperWhiteBox = x > width * 0.18 && x < width * 0.42 && y > height * 0.28 && y < height * 0.58;
      const inRightWhiteBox = x > width * 0.48 && x < width * 0.79 && y > height * 0.46 && y < height * 0.8;

      if (!inUpperWhiteBox && !inRightWhiteBox) {
        if (dist < 16) {
          keyed[idx + 3] = 0;
        } else if (dist < 30) {
          keyed[idx + 3] = Math.round(((dist - 16) / 14) * 255);
        }
      }
    }
  }

  // Save full transparent building cutout (used in Footer Ref B interlock + 3D fallback)
  await sharp(keyed, { raw: { width, height, channels } })
    .webp({ quality: 80, alphaQuality: 85 })
    .toFile(path.join(PUBLIC_ART, 'hero-cutout.webp'));

  // Split into 5 architectural Z-depth layers (cropped to full canvas UV or exact region)
  const layers = [
    { name: 'layer-rear', x0: 0.4, y0: 0.25, x1: 0.82, y1: 0.85 },
    { name: 'layer-stone', x0: 0.08, y0: 0.54, x1: 0.44, y1: 0.86 },
    { name: 'layer-upper', x0: 0.13, y0: 0.18, x1: 0.56, y1: 0.58 },
    { name: 'layer-roof', x0: 0.45, y0: 0.26, x1: 0.84, y1: 0.52 },
    { name: 'layer-tree', x0: 0.68, y0: 0.4, x1: 0.94, y1: 0.86 },
  ];

  for (const layer of layers) {
    const buf = Buffer.alloc(keyed.length, 0);
    const minX = Math.floor(layer.x0 * width);
    const maxX = Math.ceil(layer.x1 * width);
    const minY = Math.floor(layer.y0 * height);
    const maxY = Math.ceil(layer.y1 * height);

    for (let y = minY; y < maxY; y++) {
      for (let x = minX; x < maxX; x++) {
        const idx = (y * width + x) * channels;
        buf[idx] = keyed[idx];
        buf[idx + 1] = keyed[idx + 1];
        buf[idx + 2] = keyed[idx + 2];
        buf[idx + 3] = keyed[idx + 3];
      }
    }

    await sharp(buf, { raw: { width, height, channels } })
      .resize(960)
      .webp({ quality: 78, alphaQuality: 85 })
      .toFile(path.join(PUBLIC_ART, `${layer.name}.webp`));
  }

  // Also optimize studio-desk.jpg -> AVIF + WebP
  const deskSrc = path.join(PUBLIC_ART, 'studio-desk.jpg');
  if (fs.existsSync(deskSrc)) {
    await sharp(deskSrc)
      .resize(1200)
      .avif({ quality: 56, effort: 4 })
      .toFile(path.join(PUBLIC_ART, 'studio-desk.avif'));
    await sharp(deskSrc)
      .resize(1200)
      .webp({ quality: 76 })
      .toFile(path.join(PUBLIC_ART, 'studio-desk.webp'));
  }

  console.log('Generated hero poster (AVIF/WebP), 5 Z-depth cutout layers, and studio desk AVIF/WebP.');
}

async function optimizeProjectImages() {
  const tsRaw = fs.readFileSync(DATA_FILE, 'utf8');
  const match = tsRaw.match(/export const PROJECTS: Project\[\] = (\[[\s\S]*?\]);/);
  if (!match) throw new Error('Could not parse PROJECTS array in src/data/projects.ts');
  const projects = JSON.parse(match[1]);

  let processed = 0;

  for (const project of projects) {
    for (const img of project.images) {
      const absPath = path.join(ROOT, 'public', img.src.replace(/^\//, ''));
      if (!fs.existsSync(absPath)) continue;

      const dir = path.dirname(absPath);
      const base = path.basename(absPath, path.extname(absPath));
      const relDir = path.posix.dirname(img.src);

      const avif480 = path.join(dir, `${base}-480.avif`);
      const avif960 = path.join(dir, `${base}-960.avif`);
      const webp480 = path.join(dir, `${base}-480.webp`);
      const webp960 = path.join(dir, `${base}-960.webp`);

      if (!fs.existsSync(avif480)) {
        await sharp(absPath).resize({ width: 480, withoutEnlargement: true }).avif({ quality: 48, effort: 3 }).toFile(avif480);
      }
      if (!fs.existsSync(avif960)) {
        await sharp(absPath).resize({ width: 960, withoutEnlargement: true }).avif({ quality: 54, effort: 3 }).toFile(avif960);
      }
      if (!fs.existsSync(webp480)) {
        await sharp(absPath).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 72 }).toFile(webp480);
      }
      if (!fs.existsSync(webp960)) {
        await sharp(absPath).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 78 }).toFile(webp960);
      }

      img.avifSrcSet = `${relDir}/${base}-480.avif 480w, ${relDir}/${base}-960.avif 960w`;
      img.webpSrcSet = `${relDir}/${base}-480.webp 480w, ${relDir}/${base}-960.webp 960w`;
      img.blurDataURL = await makeBlurDataURL(absPath);
      processed++;
    }

    // Sync cover image with enriched fields
    const matchedCover = project.images.find((i) => i.src === project.cover.src) || project.images[0];
    if (matchedCover) {
      project.cover = { ...matchedCover };
    }

    // Optimize video poster to WebP/AVIF if present
    if (project.video?.poster) {
      const posterAbs = path.join(ROOT, 'public', project.video.poster.replace(/^\//, ''));
      if (fs.existsSync(posterAbs)) {
        const posterWebp = posterAbs.replace(/\.jpg$/i, '.webp');
        if (!fs.existsSync(posterWebp)) {
          await sharp(posterAbs).resize(960).webp({ quality: 74 }).toFile(posterWebp);
        }
        project.video.poster = project.video.poster.replace(/\.jpg$/i, '.webp');
      }
    }
  }

  const outTs = `// Auto-generated with AVIF/WebP responsive srcSet & <1KB blur placeholders

export interface ProjectImage {
  src: string;
  avifSrcSet?: string;
  webpSrcSet?: string;
  blurDataURL?: string;
  width: number;
  height: number;
  alt: string;
}

export interface ProjectVideo {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
}

export type ProjectCategory =
  | '3D & Walkthrough'
  | '2D CAD Drafting'
  | 'Physical Models'
  | 'Drafting & Studio'
  | 'GIS & Analysis';

export interface Project {
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  tools: string[];
  year: string;
  highlight: boolean;
  deckCaption: string;
  summary: string;
  specs: string[];
  cover: ProjectImage;
  images: ProjectImage[];
  video: ProjectVideo | null;
}

export const PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};

export const PROJECT_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  '3D & Walkthrough',
  '2D CAD Drafting',
  'Physical Models',
  'Drafting & Studio',
  'GIS & Analysis',
];
`;

  fs.writeFileSync(DATA_FILE, outTs, 'utf8');
  console.log(`Optimized ${processed} project images into AVIF + WebP + blur-up placeholders.`);
}

await buildHeroCutoutLayers();
await optimizeProjectImages();
