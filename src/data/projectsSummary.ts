import type { ProjectCategory, ProjectImage, ProjectVideo } from './projects';

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

export const PROJECT_SUMMARIES: ProjectSummary[] = [
  {
    "slug": "4-bedroom-duplex",
    "code": "A-01",
    "title": "4 Bedroom Duplex",
    "shortTitle": "4 Bed Duplex",
    "category": "3D & Walkthrough",
    "tools": [
      "SketchUp",
      "3D Modelling"
    ],
    "year": "2026",
    "highlight": true,
    "deckCaption": "4 bedroom duplex in 3D",
    "summary": "Contemporary two-storey residential duplex modelled in SketchUp with glass balcony balustrades, pergola shading fins, and a full exterior walkthrough.",
    "specs": [
      "Residential",
      "2 Storeys",
      "Walkthrough Video",
      "8 Views"
    ],
    "cover": {
      "src": "/projects/4-bedroom-duplex/img-01.jpg",
      "width": 1280,
      "height": 720,
      "alt": "4 Bedroom Duplex view 1",
      "avifSrcSet": "/projects/4-bedroom-duplex/img-01-480.avif 480w, /projects/4-bedroom-duplex/img-01-960.avif 960w",
      "webpSrcSet": "/projects/4-bedroom-duplex/img-01-480.webp 480w, /projects/4-bedroom-duplex/img-01-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAwCdASoUAAsAPxl4slCspySisAgBkCMJQBadBH2hQYEkGtJjI4AA97ry94Vd7YZtvAeYPgXjPafWS1iqFuSME3XtpkHWiape/wmPlFwS0whTYs//iFAA"
    },
    "imageCount": 8,
    "video": {
      "src": "/projects/4-bedroom-duplex/walkthrough.mp4",
      "poster": "/projects/4-bedroom-duplex/walkthrough-poster.webp",
      "width": 1280,
      "height": 720,
      "title": "4 Bedroom Duplex 3D Walkthrough"
    }
  },
  {
    "slug": "contemporary-4-bedroom-terrace",
    "code": "A-02",
    "title": "4 Bedroom Terrace Residence",
    "shortTitle": "4 Bed Terrace II",
    "category": "3D & Walkthrough",
    "tools": [
      "SketchUp",
      "Facade Design"
    ],
    "year": "2026",
    "highlight": true,
    "deckCaption": "terrace facade & walkthrough",
    "summary": "Multi-unit terrace housing study pairing brick plinths, horizontal cladding louvers, and rhythmic recessed balconies with a guided 3D walkthrough.",
    "specs": [
      "Multi-Unit",
      "3 Levels",
      "Walkthrough Video",
      "9 Views"
    ],
    "cover": {
      "src": "/projects/contemporary-4-bedroom-terrace/img-07.jpg",
      "width": 1280,
      "height": 720,
      "alt": "4 Bedroom Terrace Residence view 7",
      "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-07-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-07-960.avif 960w",
      "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-07-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-07-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABQBACdASoUAAsAPxl2slEspySisAgBkCMJZwDE3agBpaEqZ/+zhcRYoSZAAPag5NwJ72iDcJxPw4r0N/X2ABtHIwwNat1v8bsDXpmgzKbTtgveOlz4sA6/8MapBK4b+IYq2wcIROHDysexf4AAAA=="
    },
    "imageCount": 9,
    "video": {
      "src": "/projects/contemporary-4-bedroom-terrace/walkthrough.mp4",
      "poster": "/projects/contemporary-4-bedroom-terrace/walkthrough-poster.webp",
      "width": 1280,
      "height": 720,
      "title": "4 Bedroom Terrace Residence 3D Walkthrough"
    }
  },
  {
    "slug": "3-bedroom-bungalow",
    "code": "A-03",
    "title": "3 Bedroom Bungalow",
    "shortTitle": "3 Bed Bungalow",
    "category": "3D & Walkthrough",
    "tools": [
      "SketchUp",
      "Roof & Detailing"
    ],
    "year": "2026",
    "highlight": true,
    "deckCaption": "bungalow massing & tour",
    "summary": "Single-level family bungalow exploring hipped roof geometry, entry porch proportion, window detailing, and a complete 360-degree digital walkthrough.",
    "specs": [
      "Residential",
      "Single Level",
      "Walkthrough Video",
      "14 Views"
    ],
    "cover": {
      "src": "/projects/3-bedroom-bungalow/img-05.jpg",
      "width": 1280,
      "height": 720,
      "alt": "3 Bedroom Bungalow view 5",
      "avifSrcSet": "/projects/3-bedroom-bungalow/img-05-480.avif 480w, /projects/3-bedroom-bungalow/img-05-960.avif 960w",
      "webpSrcSet": "/projects/3-bedroom-bungalow/img-05-480.webp 480w, /projects/3-bedroom-bungalow/img-05-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADQAwCdASoUAAsAPxl2slEspySisAgBkCMJYwAAWPDR5tKY9Ga/VAAA+i4BS8Br9QBpBDypvuVejjNsDJgA/Ic32gQPbJ3iAAA="
    },
    "imageCount": 14,
    "video": {
      "src": "/projects/3-bedroom-bungalow/walkthrough.mp4",
      "poster": "/projects/3-bedroom-bungalow/walkthrough-poster.webp",
      "width": 1280,
      "height": 720,
      "title": "3 Bedroom Bungalow 3D Walkthrough"
    }
  },
  {
    "slug": "4-bedroom-terrace-interiors",
    "code": "A-04",
    "title": "4 Bedroom Terrace & Interiors",
    "shortTitle": "Terrace & Interiors",
    "category": "3D & Walkthrough",
    "tools": [
      "SketchUp",
      "Interior Modelling"
    ],
    "year": "2026",
    "highlight": true,
    "deckCaption": "interior scenes & detailing",
    "summary": "Detailed SketchUp exterior and interior modelling for a four-bedroom terrace development, examining furniture scale, textures, lighting, and camera scenes.",
    "specs": [
      "Residential",
      "Interior + Exterior",
      "21 Views"
    ],
    "cover": {
      "src": "/projects/4-bedroom-terrace-interiors/img-01.jpg",
      "width": 1280,
      "height": 720,
      "alt": "4 Bedroom Terrace & Interiors view 1",
      "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-01-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-01-960.avif 960w",
      "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-01-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-01-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACQAwCdASoUAAsAPxl2slEspySisAgBkCMJZwAAW7ttmo7yUWlgAP7UZyeR917oqzt2+MIebMKggUXS3On9Ug8Z0j/Y9Oz8/9U/J9isgqxa1XkVOxcgAA=="
    },
    "imageCount": 21,
    "video": null
  },
  {
    "slug": "5-bedroom-mansion",
    "code": "A-05",
    "title": "5 Bedroom Mansion",
    "shortTitle": "5 Bed Mansion",
    "category": "Drafting & Studio",
    "tools": [
      "Hand Drafting",
      "Architectural Plates"
    ],
    "year": "2025",
    "highlight": true,
    "deckCaption": "hand-drafted mansion plates",
    "summary": "Full Nile University studio presentation set featuring hand-drafted floor plans, arched elevations, roof geometry, sections, and shaded facade studies.",
    "specs": [
      "Academic Studio",
      "Hand Drafted",
      "20 Plates"
    ],
    "cover": {
      "src": "/projects/5-bedroom-mansion/img-01.jpg",
      "width": 1280,
      "height": 960,
      "alt": "5 Bedroom Mansion view 1",
      "avifSrcSet": "/projects/5-bedroom-mansion/img-01-480.avif 480w, /projects/5-bedroom-mansion/img-01-960.avif 960w",
      "webpSrcSet": "/projects/5-bedroom-mansion/img-01-480.webp 480w, /projects/5-bedroom-mansion/img-01-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACQAwCdASoUAA8APxl4tFGspyUisAgBkCMJZwDCgB9D/iGCYKAAAP5kR/ZGuP8u/caS7IeT1fulSqJN+GmTPwc5O+nTgAAA"
    },
    "imageCount": 20,
    "video": null
  },
  {
    "slug": "healing-therapeutic-care-centre",
    "code": "A-06",
    "title": "Healing & Therapeutic Care Centre",
    "shortTitle": "Healing Centre",
    "category": "Physical Models",
    "tools": [
      "Site Modelling",
      "Institutional Design"
    ],
    "year": "2026 (Ongoing)",
    "highlight": true,
    "deckCaption": "ongoing institutional site model",
    "summary": "Ongoing 300-level institutional design project. Collaborative physical site model mapping road networks, water features, terrain contours, and green zones.",
    "specs": [
      "Institutional",
      "Ongoing 300L",
      "Physical Site Model"
    ],
    "cover": {
      "src": "/projects/healing-therapeutic-care-centre/img-01.jpg",
      "width": 1280,
      "height": 960,
      "alt": "Healing & Therapeutic Care Centre view 1",
      "avifSrcSet": "/projects/healing-therapeutic-care-centre/img-01-480.avif 480w, /projects/healing-therapeutic-care-centre/img-01-960.avif 960w",
      "webpSrcSet": "/projects/healing-therapeutic-care-centre/img-01-480.webp 480w, /projects/healing-therapeutic-care-centre/img-01-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAADwAwCdASoUAA8APxl0sVCspqSisAgBkCMJYwC/OB8rKUeuAFAanHwAAP545ryx/vQDOKepBIbo3eFKqCJJWQNtlUBml5cSxa9IRoqnx/oNQ41QE/shOBhBBrwVWfpBATmZ6vQHp3c0VNv2nw/vlqgAAAA="
    },
    "imageCount": 3,
    "video": null
  },
  {
    "slug": "2-bedroom-bungalow-2d-draft",
    "code": "A-07",
    "title": "2 Bedroom Bungalow 2D Draft",
    "shortTitle": "2 Bed 2D CAD",
    "category": "2D CAD Drafting",
    "tools": [
      "AutoCAD",
      "Working Drawings"
    ],
    "year": "2026",
    "highlight": false,
    "deckCaption": "2D working drawings",
    "summary": "Precision AutoCAD 2D working drawings covering dimensioned floor plans, gridlines, door and window schedules, elevations, and section cut annotations.",
    "specs": [
      "AutoCAD",
      "Dimensioned Plans",
      "5 Sheets"
    ],
    "cover": {
      "src": "/projects/2-bedroom-bungalow-2d-draft/img-04.jpg",
      "width": 1280,
      "height": 904,
      "alt": "2 Bedroom Bungalow 2D Draft view 4",
      "avifSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-04-480.avif 480w, /projects/2-bedroom-bungalow-2d-draft/img-04-960.avif 960w",
      "webpSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-04-480.webp 480w, /projects/2-bedroom-bungalow-2d-draft/img-04-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAgCdASoUAA4APxl2sVCspySisAgBkCMJaQAAeyAA/u8eiIN0K86h0g3QRAAA"
    },
    "imageCount": 5,
    "video": null
  },
  {
    "slug": "3-bedroom-bungalow-2d-draft",
    "code": "A-08",
    "title": "3 Bedroom Bungalow 2D Draft",
    "shortTitle": "3 Bed 2D CAD",
    "category": "2D CAD Drafting",
    "tools": [
      "AutoCAD",
      "Plans & Sections"
    ],
    "year": "2026",
    "highlight": true,
    "deckCaption": "AutoCAD plans & grids",
    "summary": "Complete residential 2D CAD documentation with structural grid references, spatial zoning, sanitary layout, elevations, and construction dimensions.",
    "specs": [
      "AutoCAD",
      "Working Drawings",
      "6 Sheets"
    ],
    "cover": {
      "src": "/projects/3-bedroom-bungalow-2d-draft/img-04.jpg",
      "width": 1280,
      "height": 904,
      "alt": "3 Bedroom Bungalow 2D Draft view 4",
      "avifSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-04-480.avif 480w, /projects/3-bedroom-bungalow-2d-draft/img-04-960.avif 960w",
      "webpSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-04-480.webp 480w, /projects/3-bedroom-bungalow-2d-draft/img-04-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAgCdASoUAA4APxl2sVCspySisAgBkCMJaQAAeyAA/u8eiIN0K86h0g3QRAAA"
    },
    "imageCount": 6,
    "video": null
  },
  {
    "slug": "bq-2d-draft",
    "code": "A-09",
    "title": "Boys Quarters (BQ) 2D Draft",
    "shortTitle": "BQ 2D CAD",
    "category": "2D CAD Drafting",
    "tools": [
      "AutoCAD",
      "Compact Planning"
    ],
    "year": "2026",
    "highlight": false,
    "deckCaption": "compact BQ CAD drawings",
    "summary": "Compact residential outbuilding drafted in AutoCAD, balancing efficient circulation, natural ventilation, and clean technical annotation.",
    "specs": [
      "AutoCAD",
      "Compact Layout",
      "4 Sheets"
    ],
    "cover": {
      "src": "/projects/bq-2d-draft/img-01.jpg",
      "width": 1280,
      "height": 904,
      "alt": "Boys Quarters (BQ) 2D Draft view 1",
      "avifSrcSet": "/projects/bq-2d-draft/img-01-480.avif 480w, /projects/bq-2d-draft/img-01-960.avif 960w",
      "webpSrcSet": "/projects/bq-2d-draft/img-01-480.webp 480w, /projects/bq-2d-draft/img-01-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAAAQAwCdASoUAA4APxl2slEspySisAgBkCMJaQAAW+n7KEAA/u1Bj4pXl0z22PdoAAA="
    },
    "imageCount": 4,
    "video": null
  },
  {
    "slug": "kitchen-scale-model",
    "code": "A-10",
    "title": "Kitchen Interior Scale Model",
    "shortTitle": "Kitchen Model",
    "category": "Physical Models",
    "tools": [
      "Interior Design",
      "Physical Modelling"
    ],
    "year": "2025",
    "highlight": true,
    "deckCaption": "handcrafted kitchen model",
    "summary": "Handcrafted architectural interior scale model exploring kitchen work-triangle ergonomics, central island seating, cabinetry clearances, and finishes.",
    "specs": [
      "Interior Model",
      "Handcrafted",
      "7 Views"
    ],
    "cover": {
      "src": "/projects/kitchen-scale-model/img-04.jpg",
      "width": 960,
      "height": 1280,
      "alt": "Kitchen Interior Scale Model view 4",
      "avifSrcSet": "/projects/kitchen-scale-model/img-04-480.avif 480w, /projects/kitchen-scale-model/img-04-960.avif 960w",
      "webpSrcSet": "/projects/kitchen-scale-model/img-04-480.webp 480w, /projects/kitchen-scale-model/img-04-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAAAwBACdASoPABQAPxl2slEspySisAgBkCMJQBjeg6f9N+x4F4uoTLnwk0gA/hZcobr9LdEwxYD+HEdeSnZNfAt3w01hFJyk+QXD8qOmkyj78gpzNt7NqxqkQmH4sKKuXJj2skeYl6HzG5vqGkmFLwTgnH+oAA=="
    },
    "imageCount": 7,
    "video": null
  },
  {
    "slug": "study-room-interior",
    "code": "A-11",
    "title": "Study Room Interior Model",
    "shortTitle": "Study Room",
    "category": "Physical Models",
    "tools": [
      "Interior Space Planning",
      "Scale Model"
    ],
    "year": "2025",
    "highlight": false,
    "deckCaption": "study room scale model",
    "summary": "Physical interior design model investigating desk ergonomics, corner shelving geometry, furniture arrangement, and warm material contrasts.",
    "specs": [
      "Interior Model",
      "Space Planning",
      "9 Views"
    ],
    "cover": {
      "src": "/projects/study-room-interior/img-06.jpg",
      "width": 1280,
      "height": 960,
      "alt": "Study Room Interior Model view 6",
      "avifSrcSet": "/projects/study-room-interior/img-06-480.avif 480w, /projects/study-room-interior/img-06-960.avif 960w",
      "webpSrcSet": "/projects/study-room-interior/img-06-480.webp 480w, /projects/study-room-interior/img-06-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAACwBACdASoUAA8APxl0slCspqSisAgBkCMJZgCdMoADVLrlu37yNo6SH3y80qwAAMxR6g1S/XyaWu3wkQF1LGrSazklpLWhBqehun2XsApEm5WdHYgkA3k9ybhd7Atxqi/9V+ilUfGZd32tbSIF24131jpAwL8HnQgrsFQA"
    },
    "imageCount": 9,
    "video": null
  },
  {
    "slug": "leaning-tower-of-pisa-model",
    "code": "A-12",
    "title": "Leaning Tower of Pisa Model",
    "shortTitle": "Tower of Pisa",
    "category": "Physical Models",
    "tools": [
      "Timber Dowels",
      "Structural Study"
    ],
    "year": "2025",
    "highlight": false,
    "deckCaption": "cylindrical arcade study",
    "summary": "Detailed physical craft study translating the circular colonnade, tiered arcades, and structural rhythm of the Leaning Tower of Pisa using wood dowels.",
    "specs": [
      "Scale Model",
      "Craft Study",
      "10 Views"
    ],
    "cover": {
      "src": "/projects/leaning-tower-of-pisa-model/img-07.jpg",
      "width": 1280,
      "height": 960,
      "alt": "Leaning Tower of Pisa Model view 7",
      "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-07-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-07-960.avif 960w",
      "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-07-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-07-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADQAwCdASoUAA8APxl0slCspqSisAgBkCMJbACdACP16/qRu8JxT0AA/t1qzj14hr7IauFmOb4j+k2In0IggeG/PU0kgpY8fbVZaBGHRLd1o7LXSwfR3TpOv766MXVWZCqJMdrszngdXkMAAAA="
    },
    "imageCount": 10,
    "video": null
  },
  {
    "slug": "qgis-ekiti-state-mapping",
    "code": "A-13",
    "title": "QGIS Environmental Mapping",
    "shortTitle": "QGIS State Map",
    "category": "GIS & Analysis",
    "tools": [
      "QGIS",
      "Remote Sensing"
    ],
    "year": "2026",
    "highlight": true,
    "deckCaption": "Ekiti State thematic maps",
    "summary": "Thematic GIS cartography for Ekiti State (ARC 209 Remote Sensing and GIS), visualising land cover classes, elevation, rainfall, and climatic patterns.",
    "specs": [
      "QGIS",
      "ARC 209",
      "8 Thematic Maps"
    ],
    "cover": {
      "src": "/projects/qgis-ekiti-state-mapping/img-01.jpg",
      "width": 1280,
      "height": 905,
      "alt": "QGIS Environmental Mapping view 1",
      "avifSrcSet": "/projects/qgis-ekiti-state-mapping/img-01-480.avif 480w, /projects/qgis-ekiti-state-mapping/img-01-960.avif 960w",
      "webpSrcSet": "/projects/qgis-ekiti-state-mapping/img-01-480.webp 480w, /projects/qgis-ekiti-state-mapping/img-01-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACwAwCdASoUAA4APxl0slCspqSisAgBkCMJQBfnBDvtvuwlp/IEAAD+7VkIt1e7Gg0/F0eOsBxDztXhHyX4kN1xvjo4OO92+crarkxoGIM5AAAA"
    },
    "imageCount": 8,
    "video": null
  },
  {
    "slug": "3-bed-residential-project",
    "code": "A-14",
    "title": "3 Bedroom Residential Project",
    "shortTitle": "3 Bed Project",
    "category": "Drafting & Studio",
    "tools": [
      "Architectural Design",
      "Spatial Planning"
    ],
    "year": "2025",
    "highlight": false,
    "deckCaption": "3 bedroom studio study",
    "summary": "Residential studio exercise focusing on room adjacencies, living zone circulation, facade rhythm, and practical site orientation.",
    "specs": [
      "Residential",
      "Studio Design",
      "5 Views"
    ],
    "cover": {
      "src": "/projects/3-bed-residential-project/img-05.jpg",
      "width": 1280,
      "height": 960,
      "alt": "3 Bedroom Residential Project view 5",
      "avifSrcSet": "/projects/3-bed-residential-project/img-05-480.avif 480w, /projects/3-bed-residential-project/img-05-960.avif 960w",
      "webpSrcSet": "/projects/3-bed-residential-project/img-05-480.webp 480w, /projects/3-bed-residential-project/img-05-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAABwAwCdASoUAA8APxl0sVCspqSisAgBkCMJaQAADfVZQjQKOOAA0+we8kBPunvX895AZ1nLfkJLFJLeoDHCAAAA"
    },
    "imageCount": 5,
    "video": null
  },
  {
    "slug": "shades-and-shadows",
    "code": "A-15",
    "title": "Shades & Shadows Study",
    "shortTitle": "Shades & Shadows",
    "category": "Physical Models",
    "tools": [
      "Form & Light",
      "Model Craft"
    ],
    "year": "2025",
    "highlight": false,
    "deckCaption": "light, form & shadow play",
    "summary": "Architectural form and lighting study exploring how angled planes, layered cutouts, and directional light cast depth, contrast, and spatial drama.",
    "specs": [
      "Light Study",
      "Physical Craft",
      "9 Views"
    ],
    "cover": {
      "src": "/projects/shades-and-shadows/img-01.jpg",
      "width": 960,
      "height": 1280,
      "alt": "Shades & Shadows Study view 1",
      "avifSrcSet": "/projects/shades-and-shadows/img-01-480.avif 480w, /projects/shades-and-shadows/img-01-960.avif 960w",
      "webpSrcSet": "/projects/shades-and-shadows/img-01-480.webp 480w, /projects/shades-and-shadows/img-01-960.webp 960w",
      "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAACwAwCdASoPABQAPxl0sVCspqSisAgBkCMJQBOmUABYuyapIN4gAAD+ubcoBe7A8YMpEF9rSMcVsWc69LBQg5IY7Iyj8YJbwuwRESjO5Txas2aOl61lYAAA"
    },
    "imageCount": 9,
    "video": null
  }
];

export const PROJECT_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  '3D & Walkthrough',
  '2D CAD Drafting',
  'Physical Models',
  'Drafting & Studio',
  'GIS & Analysis',
];
