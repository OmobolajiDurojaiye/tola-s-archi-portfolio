import fs from 'node:fs';

const raw = fs.readFileSync('src/data/projects.ts', 'utf8');
const m = raw.match(/export const PROJECTS: Project\[\] = (\[[\s\S]*?\]);/);
if (!m) throw new Error('Could not parse projects.ts');
const projects = JSON.parse(m[1]);

const summaries = projects.map((p) => ({
  slug: p.slug,
  code: p.code,
  title: p.title,
  shortTitle: p.shortTitle,
  category: p.category,
  tools: p.tools,
  year: p.year,
  highlight: p.highlight,
  deckCaption: p.deckCaption,
  summary: p.summary,
  specs: p.specs,
  cover: p.cover,
  imageCount: p.images.length,
  video: p.video,
}));

const out = `import type { ProjectCategory, ProjectImage, ProjectVideo } from './projects';

export interface ProjectSummary {
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
  imageCount: number;
  video: ProjectVideo | null;
}

export const PROJECT_SUMMARIES: ProjectSummary[] = ${JSON.stringify(summaries, null, 2)};

export const PROJECT_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  '3D & Walkthrough',
  '2D CAD Drafting',
  'Physical Models',
  'Drafting & Studio',
  'GIS & Analysis',
];
`;

fs.writeFileSync('src/data/projectsSummary.ts', out, 'utf8');
console.log('Generated src/data/projectsSummary.ts:', (out.length / 1024).toFixed(1), 'KB');
