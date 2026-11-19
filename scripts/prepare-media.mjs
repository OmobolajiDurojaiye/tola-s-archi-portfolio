import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';

const ROOT = process.cwd();
const PUBLIC_PROJECTS = path.join(ROOT, 'public', 'projects');
const DATA_OUT = path.join(ROOT, 'src', 'data', 'projects.ts');

// Pure-Node JPEG dimension reader
function getJpegDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    if (
      marker === 0xc0 ||
      marker === 0xc1 ||
      marker === 0xc2 ||
      marker === 0xc3 ||
      marker === 0xc5 ||
      marker === 0xc6 ||
      marker === 0xc7 ||
      marker === 0xc9 ||
      marker === 0xca ||
      marker === 0xcb ||
      marker === 0xcd ||
      marker === 0xce ||
      marker === 0xcf
    ) {
      const height = buf.readUInt16BE(i + 5);
      const width = buf.readUInt16BE(i + 7);
      return { width, height };
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
  return { width: 1280, height: 960 };
}

const PROJECT_CATALOG = [
  {
    folder: '4 BEDROOM DUPLEX',
    slug: '4-bedroom-duplex',
    code: 'A-01',
    title: '4 Bedroom Duplex',
    shortTitle: '4 Bed Duplex',
    category: '3D & Walkthrough',
    tools: ['SketchUp', '3D Modelling'],
    year: '2026',
    highlight: true,
    deckCaption: '4 bedroom duplex in 3D',
    summary:
      'Contemporary two-storey residential duplex modelled in SketchUp with glass balcony balustrades, pergola shading fins, and a full exterior walkthrough.',
    specs: ['Residential', '2 Storeys', 'Walkthrough Video', '8 Views'],
    coverIndex: 0,
  },
  {
    folder: '2ND 4 BEDROOM TERRACE',
    slug: 'contemporary-4-bedroom-terrace',
    code: 'A-02',
    title: '4 Bedroom Terrace Residence',
    shortTitle: '4 Bed Terrace II',
    category: '3D & Walkthrough',
    tools: ['SketchUp', 'Facade Design'],
    year: '2026',
    highlight: true,
    deckCaption: 'terrace facade & walkthrough',
    summary:
      'Multi-unit terrace housing study pairing brick plinths, horizontal cladding louvers, and rhythmic recessed balconies with a guided 3D walkthrough.',
    specs: ['Multi-Unit', '3 Levels', 'Walkthrough Video', '9 Views'],
    coverIndex: 6,
  },
  {
    folder: '3 BEDROOM BUNGALOW',
    slug: '3-bedroom-bungalow',
    code: 'A-03',
    title: '3 Bedroom Bungalow',
    shortTitle: '3 Bed Bungalow',
    category: '3D & Walkthrough',
    tools: ['SketchUp', 'Roof & Detailing'],
    year: '2026',
    highlight: true,
    deckCaption: 'bungalow massing & tour',
    summary:
      'Single-level family bungalow exploring hipped roof geometry, entry porch proportion, window detailing, and a complete 360-degree digital walkthrough.',
    specs: ['Residential', 'Single Level', 'Walkthrough Video', '14 Views'],
    coverIndex: 4,
  },
  {
    folder: '4 BEDROOM TERRACE',
    slug: '4-bedroom-terrace-interiors',
    code: 'A-04',
    title: '4 Bedroom Terrace & Interiors',
    shortTitle: 'Terrace & Interiors',
    category: '3D & Walkthrough',
    tools: ['SketchUp', 'Interior Modelling'],
    year: '2026',
    highlight: true,
    deckCaption: 'interior scenes & detailing',
    summary:
      'Detailed SketchUp exterior and interior modelling for a four-bedroom terrace development, examining furniture scale, textures, lighting, and camera scenes.',
    specs: ['Residential', 'Interior + Exterior', '21 Views'],
    coverIndex: 0,
  },
  {
    folder: '5 BEDROOM MANSION',
    slug: '5-bedroom-mansion',
    code: 'A-05',
    title: '5 Bedroom Mansion',
    shortTitle: '5 Bed Mansion',
    category: 'Drafting & Studio',
    tools: ['Hand Drafting', 'Architectural Plates'],
    year: '2025',
    highlight: true,
    deckCaption: 'hand-drafted mansion plates',
    summary:
      'Full Nile University studio presentation set featuring hand-drafted floor plans, arched elevations, roof geometry, sections, and shaded facade studies.',
    specs: ['Academic Studio', 'Hand Drafted', '20 Plates'],
    coverIndex: 0,
  },
  {
    folder: 'HEALING AND THERAPEUTIC CARE CENTRE-ONGOING PROJECT',
    slug: 'healing-therapeutic-care-centre',
    code: 'A-06',
    title: 'Healing & Therapeutic Care Centre',
    shortTitle: 'Healing Centre',
    category: 'Physical Models',
    tools: ['Site Modelling', 'Institutional Design'],
    year: '2026 (Ongoing)',
    highlight: true,
    deckCaption: 'ongoing institutional site model',
    summary:
      'Ongoing 300-level institutional design project. Collaborative physical site model mapping road networks, water features, terrain contours, and green zones.',
    specs: ['Institutional', 'Ongoing 300L', 'Physical Site Model'],
    coverIndex: 0,
  },
  {
    folder: '2 BEDROOM BUNGALOW 2D DRAFT',
    slug: '2-bedroom-bungalow-2d-draft',
    code: 'A-07',
    title: '2 Bedroom Bungalow 2D Draft',
    shortTitle: '2 Bed 2D CAD',
    category: '2D CAD Drafting',
    tools: ['AutoCAD', 'Working Drawings'],
    year: '2026',
    highlight: false,
    deckCaption: '2D working drawings',
    summary:
      'Precision AutoCAD 2D working drawings covering dimensioned floor plans, gridlines, door and window schedules, elevations, and section cut annotations.',
    specs: ['AutoCAD', 'Dimensioned Plans', '5 Sheets'],
    coverIndex: 3,
  },
  {
    folder: '3 BEDROOM BUNGALOW 2D DRAFT',
    slug: '3-bedroom-bungalow-2d-draft',
    code: 'A-08',
    title: '3 Bedroom Bungalow 2D Draft',
    shortTitle: '3 Bed 2D CAD',
    category: '2D CAD Drafting',
    tools: ['AutoCAD', 'Plans & Sections'],
    year: '2026',
    highlight: true,
    deckCaption: 'AutoCAD plans & grids',
    summary:
      'Complete residential 2D CAD documentation with structural grid references, spatial zoning, sanitary layout, elevations, and construction dimensions.',
    specs: ['AutoCAD', 'Working Drawings', '6 Sheets'],
    coverIndex: 3,
  },
  {
    folder: 'BQ 2D DRAFT',
    slug: 'bq-2d-draft',
    code: 'A-09',
    title: 'Boys Quarters (BQ) 2D Draft',
    shortTitle: 'BQ 2D CAD',
    category: '2D CAD Drafting',
    tools: ['AutoCAD', 'Compact Planning'],
    year: '2026',
    highlight: false,
    deckCaption: 'compact BQ CAD drawings',
    summary:
      'Compact residential outbuilding drafted in AutoCAD, balancing efficient circulation, natural ventilation, and clean technical annotation.',
    specs: ['AutoCAD', 'Compact Layout', '4 Sheets'],
    coverIndex: 0,
  },
  {
    folder: 'KITCHEN MODEL',
    slug: 'kitchen-scale-model',
    code: 'A-10',
    title: 'Kitchen Interior Scale Model',
    shortTitle: 'Kitchen Model',
    category: 'Physical Models',
    tools: ['Interior Design', 'Physical Modelling'],
    year: '2025',
    highlight: true,
    deckCaption: 'handcrafted kitchen model',
    summary:
      'Handcrafted architectural interior scale model exploring kitchen work-triangle ergonomics, central island seating, cabinetry clearances, and finishes.',
    specs: ['Interior Model', 'Handcrafted', '7 Views'],
    coverIndex: 3,
  },
  {
    folder: 'STUDY ROOM',
    slug: 'study-room-interior',
    code: 'A-11',
    title: 'Study Room Interior Model',
    shortTitle: 'Study Room',
    category: 'Physical Models',
    tools: ['Interior Space Planning', 'Scale Model'],
    year: '2025',
    highlight: false,
    deckCaption: 'study room scale model',
    summary:
      'Physical interior design model investigating desk ergonomics, corner shelving geometry, furniture arrangement, and warm material contrasts.',
    specs: ['Interior Model', 'Space Planning', '9 Views'],
    coverIndex: 5,
  },
  {
    folder: 'LEANING TOWER OF PISA',
    slug: 'leaning-tower-of-pisa-model',
    code: 'A-12',
    title: 'Leaning Tower of Pisa Model',
    shortTitle: 'Tower of Pisa',
    category: 'Physical Models',
    tools: ['Timber Dowels', 'Structural Study'],
    year: '2025',
    highlight: false,
    deckCaption: 'cylindrical arcade study',
    summary:
      'Detailed physical craft study translating the circular colonnade, tiered arcades, and structural rhythm of the Leaning Tower of Pisa using wood dowels.',
    specs: ['Scale Model', 'Craft Study', '10 Views'],
    coverIndex: 6,
  },
  {
    folder: 'QGIS STATE MAP',
    slug: 'qgis-ekiti-state-mapping',
    code: 'A-13',
    title: 'QGIS Environmental Mapping',
    shortTitle: 'QGIS State Map',
    category: 'GIS & Analysis',
    tools: ['QGIS', 'Remote Sensing'],
    year: '2026',
    highlight: true,
    deckCaption: 'Ekiti State thematic maps',
    summary:
      'Thematic GIS cartography for Ekiti State (ARC 209 Remote Sensing and GIS), visualising land cover classes, elevation, rainfall, and climatic patterns.',
    specs: ['QGIS', 'ARC 209', '8 Thematic Maps'],
    coverIndex: 0,
  },
  {
    folder: '3 BED PROJECT',
    slug: '3-bed-residential-project',
    code: 'A-14',
    title: '3 Bedroom Residential Project',
    shortTitle: '3 Bed Project',
    category: 'Drafting & Studio',
    tools: ['Architectural Design', 'Spatial Planning'],
    year: '2025',
    highlight: false,
    deckCaption: '3 bedroom studio study',
    summary:
      'Residential studio exercise focusing on room adjacencies, living zone circulation, facade rhythm, and practical site orientation.',
    specs: ['Residential', 'Studio Design', '5 Views'],
    coverIndex: 4,
  },
  {
    folder: 'SHADES AND SHADOWS',
    slug: 'shades-and-shadows',
    code: 'A-15',
    title: 'Shades & Shadows Study',
    shortTitle: 'Shades & Shadows',
    category: 'Physical Models',
    tools: ['Form & Light', 'Model Craft'],
    year: '2025',
    highlight: false,
    deckCaption: 'light, form & shadow play',
    summary:
      'Architectural form and lighting study exploring how angled planes, layered cutouts, and directional light cast depth, contrast, and spatial drama.',
    specs: ['Light Study', 'Physical Craft', '9 Views'],
    coverIndex: 0,
  },
];

fs.mkdirSync(PUBLIC_PROJECTS, { recursive: true });
fs.mkdirSync(path.dirname(DATA_OUT), { recursive: true });

// Copy CV PDF
const cvSrc = path.join(ROOT, 'DUROJAIYE OMOTOLA OPEYEMI.pdf');
const cvDest = path.join(ROOT, 'public', 'DUROJAIYE_OMOTOLA_OPEYEMI_CV.pdf');
if (fs.existsSync(cvSrc)) {
  fs.copyFileSync(cvSrc, cvDest);
  console.log('Copied CV PDF to public/DUROJAIYE_OMOTOLA_OPEYEMI_CV.pdf');
}

const outputProjects = [];

for (const meta of PROJECT_CATALOG) {
  const srcDir = path.join(ROOT, meta.folder);
  if (!fs.existsSync(srcDir)) {
    console.warn(`Missing folder: ${meta.folder}`);
    continue;
  }

  const destDir = path.join(PUBLIC_PROJECTS, meta.slug);
  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir).sort();
  const images = [];
  let video = null;

  let imgIdx = 1;
  for (const file of entries) {
    // Skip duplicate copies like "photo_... (1).jpg"
    if (/\s*\(\d+\)\.(jpg|jpeg|png)$/i.test(file)) {
      console.log(`Skipping duplicate: ${meta.folder}/${file}`);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    const srcFile = path.join(srcDir, file);

    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const outName = `img-${String(imgIdx).padStart(2, '0')}${ext}`;
      const destFile = path.join(destDir, outName);
      if (!fs.existsSync(destFile)) {
        fs.copyFileSync(srcFile, destFile);
      }
      const dims = ext === '.jpg' || ext === '.jpeg' ? getJpegDimensions(srcFile) : { width: 1280, height: 960 };
      images.push({
        src: `/projects/${meta.slug}/${outName}`,
        width: dims.width,
        height: dims.height,
        alt: `${meta.title} view ${imgIdx}`,
      });
      imgIdx++;
    } else if (ext === '.mp4' || ext === '.mov' || ext === '.webm') {
      const outVideoName = 'walkthrough.mp4';
      const outPosterName = 'walkthrough-poster.jpg';
      const destVideo = path.join(destDir, outVideoName);
      const destPoster = path.join(destDir, outPosterName);

      if (!fs.existsSync(destVideo)) {
        console.log(`Transcoding video for ${meta.slug} (this takes a moment)...`);
        execFileSync(
          ffmpegPath,
          [
            '-y',
            '-i',
            srcFile,
            '-c:v',
            'libx264',
            '-profile:v',
            'main',
            '-level',
            '4.0',
            '-pix_fmt',
            'yuv420p',
            '-crf',
            '26',
            '-preset',
            'fast',
            '-vf',
            "scale='min(1280,iw)':-2",
            '-movflags',
            '+faststart',
            '-c:a',
            'aac',
            '-b:a',
            '128k',
            destVideo,
          ],
          { stdio: 'pipe' }
        );
        const origMB = (fs.statSync(srcFile).size / 1024 / 1024).toFixed(2);
        const newMB = (fs.statSync(destVideo).size / 1024 / 1024).toFixed(2);
        console.log(`  Done ${meta.slug}: ${origMB} MB -> ${newMB} MB`);
      }

      if (!fs.existsSync(destPoster)) {
        execFileSync(
          ffmpegPath,
          [
            '-y',
            '-ss',
            '00:00:01.5',
            '-i',
            destVideo,
            '-vframes',
            '1',
            '-q:v',
            '3',
            destPoster,
          ],
          { stdio: 'pipe' }
        );
      }

      const posterDims = getJpegDimensions(destPoster);
      video = {
        src: `/projects/${meta.slug}/${outVideoName}`,
        poster: `/projects/${meta.slug}/${outPosterName}`,
        width: posterDims.width,
        height: posterDims.height,
        title: `${meta.title} 3D Walkthrough`,
      };
    }
  }

  const cover = images[Math.min(meta.coverIndex || 0, Math.max(0, images.length - 1))] || images[0];

  outputProjects.push({
    slug: meta.slug,
    code: meta.code,
    title: meta.title,
    shortTitle: meta.shortTitle,
    category: meta.category,
    tools: meta.tools,
    year: meta.year,
    highlight: meta.highlight,
    deckCaption: meta.deckCaption,
    summary: meta.summary,
    specs: meta.specs,
    cover,
    images,
    video,
  });
}

const tsContent = `// Auto-generated by scripts/prepare-media.mjs

export interface ProjectImage {
  src: string;
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

export const PROJECTS: Project[] = ${JSON.stringify(outputProjects, null, 2)};

export const PROJECT_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  '3D & Walkthrough',
  '2D CAD Drafting',
  'Physical Models',
  'Drafting & Studio',
  'GIS & Analysis',
];
`;

fs.writeFileSync(DATA_OUT, tsContent, 'utf8');
console.log(`Generated ${DATA_OUT} with ${outputProjects.length} projects.`);
