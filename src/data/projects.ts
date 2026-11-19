// Auto-generated with AVIF/WebP responsive srcSet & <1KB blur placeholders

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

export const PROJECTS: Project[] = [
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
    "images": [
      {
        "src": "/projects/4-bedroom-duplex/img-01.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Duplex view 1",
        "avifSrcSet": "/projects/4-bedroom-duplex/img-01-480.avif 480w, /projects/4-bedroom-duplex/img-01-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-duplex/img-01-480.webp 480w, /projects/4-bedroom-duplex/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAwCdASoUAAsAPxl4slCspySisAgBkCMJQBadBH2hQYEkGtJjI4AA97ry94Vd7YZtvAeYPgXjPafWS1iqFuSME3XtpkHWiape/wmPlFwS0whTYs//iFAA"
      },
      {
        "src": "/projects/4-bedroom-duplex/img-02.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Duplex view 2",
        "avifSrcSet": "/projects/4-bedroom-duplex/img-02-480.avif 480w, /projects/4-bedroom-duplex/img-02-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-duplex/img-02-480.webp 480w, /projects/4-bedroom-duplex/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAQBACdASoUAAsAPxl2sVCspySisAgBkCMJZwDCgCPpr7HU2MvjkpOUaAD+aIqFrQDgCnsp1lvAs+gYkzZLtYTgEBJUNm/GmZHgCCskLWVRps8XXCcUZfFi/oPAZ9kWJ+zyTJlCJhPAAA=="
      },
      {
        "src": "/projects/4-bedroom-duplex/img-03.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Duplex view 3",
        "avifSrcSet": "/projects/4-bedroom-duplex/img-03-480.avif 480w, /projects/4-bedroom-duplex/img-03-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-duplex/img-03-480.webp 480w, /projects/4-bedroom-duplex/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAABwAwCdASoUAAsAPxl0slEspqSisAgBkCMJZwDDNCFJ5fPKNAAA+Q6DxSBsujbiV+h+b7NxqnxeseYPdqnC1WpillIMDLn2Hj5cmmnqnKodXUgWQAA="
      },
      {
        "src": "/projects/4-bedroom-duplex/img-04.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Duplex view 4",
        "avifSrcSet": "/projects/4-bedroom-duplex/img-04-480.avif 480w, /projects/4-bedroom-duplex/img-04-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-duplex/img-04-480.webp 480w, /projects/4-bedroom-duplex/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACQAwCdASoUAAsAPxl0slCspqSisAgBkCMJZQDA3BxOAVguBtMgAP6vhLEJUR4bwT63P9pmgps8nsbpNJjm/kHooTr9fvN9G2yIlkfQDShoAA=="
      },
      {
        "src": "/projects/4-bedroom-duplex/img-05.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Duplex view 5",
        "avifSrcSet": "/projects/4-bedroom-duplex/img-05-480.avif 480w, /projects/4-bedroom-duplex/img-05-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-duplex/img-05-480.webp 480w, /projects/4-bedroom-duplex/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADQAwCdASoUAAsAPxl2slEspySisAgBkCMJZwAAXwqcZfJcDEY6TsAA/pPARTjNnYNwCoYg9GC4fmdxjG9LO1ndd9r32R3C1RHAcj5yF79ywSuu8+QQozaY2NhvSErBgYAAAA=="
      },
      {
        "src": "/projects/4-bedroom-duplex/img-06.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Duplex view 6",
        "avifSrcSet": "/projects/4-bedroom-duplex/img-06-480.avif 480w, /projects/4-bedroom-duplex/img-06-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-duplex/img-06-480.webp 480w, /projects/4-bedroom-duplex/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAACQAwCdASoUAAsAPxl2slEspySisAgBkCMJZQAAQyGqvu/FjWDIAP1Q+rLmxWEIOrQRX0PxLomHdPmB83qrerUkEdsFQtyYtNzOQzs33mqd49KLehrXHYfMHGD+Kg8mNgAAAA=="
      },
      {
        "src": "/projects/4-bedroom-duplex/img-07.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Duplex view 7",
        "avifSrcSet": "/projects/4-bedroom-duplex/img-07-480.avif 480w, /projects/4-bedroom-duplex/img-07-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-duplex/img-07-480.webp 480w, /projects/4-bedroom-duplex/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAwCdASoUAAsAPxl0sVCspqSisAgBkCMJZQDA3BexbtijVuCE5gAAy0sJXokmTVNyv+oe0MrwI8CX42RBn6PodxoXp9Atw/v3j3oU/uU2q3/Wdzm2qEHAAAA="
      },
      {
        "src": "/projects/4-bedroom-duplex/img-08.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Duplex view 8",
        "avifSrcSet": "/projects/4-bedroom-duplex/img-08-480.avif 480w, /projects/4-bedroom-duplex/img-08-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-duplex/img-08-480.webp 480w, /projects/4-bedroom-duplex/img-08-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACQAwCdASoUAAsAPxl0sVCspqSisAgBkCMJaQAAP9kouotoP9gAAP7nkas1xR6LMrf1bODzxRlrU3i6Iz1IOnICvUicbK65Tw6zdYKn5LN94TepRHAAAA=="
      }
    ],
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
    "images": [
      {
        "src": "/projects/contemporary-4-bedroom-terrace/img-01.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace Residence view 1",
        "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-01-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-01-960.avif 960w",
        "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-01-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAABwAwCdASoUAAsAPxl2slCspySisAgBkCMJaQAAR9xJmcCzEAAA/eH3+1BuZVg1UeRyEoiIDyypdGM2k5sAvY4ztWAwVcJT1BhVkMdQKhvVbIP/vggl0S+Qn0d4MotMUAA="
      },
      {
        "src": "/projects/contemporary-4-bedroom-terrace/img-02.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace Residence view 2",
        "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-02-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-02-960.avif 960w",
        "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-02-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAABwAwCdASoUAAsAPxl0slCspqSisAgBkCMJaQAAL0mVBeUxsAAA/mVPv28GQDm6PMYKCZpf96+tEjqS4YC6CpXzX2MXDX6etM24mpFG9ia+1GyASmd+IKByjgAAAA=="
      },
      {
        "src": "/projects/contemporary-4-bedroom-terrace/img-03.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace Residence view 3",
        "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-03-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-03-960.avif 960w",
        "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-03-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADwAwCdASoUAAsAPxl2slCspySisAgBkCMJaQAASlHsIZa6ODAtZeAAAPfIulh3TUU0Po1JZDogwxZVZ9Z6Qhm0UClkuNrl7Pwkxp/d7r2DkGLZ5woAAA=="
      },
      {
        "src": "/projects/contemporary-4-bedroom-terrace/img-04.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace Residence view 4",
        "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-04-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-04-960.avif 960w",
        "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-04-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAABQAwCdASoUAAsAPxl0sVCspqSisAgBkCMJaQAAW5RCgYPzgAD+sjFJdqhSaKe44GMj4X6ZMedLcpcvDHGY5BRgXIlTpxf44IigAA=="
      },
      {
        "src": "/projects/contemporary-4-bedroom-terrace/img-05.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace Residence view 5",
        "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-05-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-05-960.avif 960w",
        "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-05-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAABwAwCdASoUAAsAPxl0sVCspqSisAgBkCMJaQAATrl+2ZM4FQAA/rOxJxSdbj1OMTjXfOd4q2Kt/T1Icxq7Nh+HEU2J53TInXKOG9efLigAAA=="
      },
      {
        "src": "/projects/contemporary-4-bedroom-terrace/img-06.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace Residence view 6",
        "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-06-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-06-960.avif 960w",
        "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-06-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAABwAwCdASoUAAsAPxl2slCspySisAgBkCMJaQAAW9IBITcxGcAA/sSgJ7J+osmMI/0py+DYM2LJNZ1rJvH1QFpP35VEONO+0XeA24FfNgXwQTxwAAA="
      },
      {
        "src": "/projects/contemporary-4-bedroom-terrace/img-07.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace Residence view 7",
        "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-07-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-07-960.avif 960w",
        "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-07-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABQBACdASoUAAsAPxl2slEspySisAgBkCMJZwDE3agBpaEqZ/+zhcRYoSZAAPag5NwJ72iDcJxPw4r0N/X2ABtHIwwNat1v8bsDXpmgzKbTtgveOlz4sA6/8MapBK4b+IYq2wcIROHDysexf4AAAA=="
      },
      {
        "src": "/projects/contemporary-4-bedroom-terrace/img-08.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace Residence view 8",
        "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-08-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-08-960.avif 960w",
        "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-08-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-08-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAACwAwCdASoUAAsAPxl2slEspySisAgBkCMJaQAAUjW80ofv0dxiAAD82SBV7iyDFYa94aOklCwilfWW+CIuPnEEF5Ru4DuRVi0pcyrAGXpFAsOfMxnpqfyd+uswkMAA"
      },
      {
        "src": "/projects/contemporary-4-bedroom-terrace/img-09.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace Residence view 9",
        "avifSrcSet": "/projects/contemporary-4-bedroom-terrace/img-09-480.avif 480w, /projects/contemporary-4-bedroom-terrace/img-09-960.avif 960w",
        "webpSrcSet": "/projects/contemporary-4-bedroom-terrace/img-09-480.webp 480w, /projects/contemporary-4-bedroom-terrace/img-09-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAwCdASoUAAsAPxl2slEspySisAgBkCMJaQAAW+8vuJb90R1Ls6AA/t+DoBSH6i4cWQ9mh8QV8SwJYSwrFVCaQmAgnYsC3OuE8U3MOAA="
      }
    ],
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
    "images": [
      {
        "src": "/projects/3-bedroom-bungalow/img-01.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 1",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-01-480.avif 480w, /projects/3-bedroom-bungalow/img-01-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-01-480.webp 480w, /projects/3-bedroom-bungalow/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABwAwCdASoUAAsAPxl0slCspqSisAgBkCMJaQAAUuGxo7YtFgAA/tOdfCzbysrERqz0rOnplflMg/EfjgbmHpr73cYNUdX7rKziRGo1LAv/1qn4tYvZh6/oCIrxwAAA"
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-02.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 2",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-02-480.avif 480w, /projects/3-bedroom-bungalow/img-02-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-02-480.webp 480w, /projects/3-bedroom-bungalow/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADQAwCdASoUAAsAPxl2slEspySisAgBkCMJaQAAWzfj6YNH+YilXAAA/t600LadNpydyuXyRgNteJcZUBBHii33FIoEv7/gF6uqZLE6NzcOUTikpZ7vyBd02IryLpBcKHAAAA=="
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-03.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 3",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-03-480.avif 480w, /projects/3-bedroom-bungalow/img-03-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-03-480.webp 480w, /projects/3-bedroom-bungalow/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADQAwCdASoUAAsAPxl2sVCspySisAgBkCMJZwAAW/ARDAAojda9AwAA/t6ZOux6YtijTTncDWy69L0Xx+njzemfcgCftmBre81/2y/ZxHIRDVQoscD3mgRIqO0vgAAA"
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-04.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 4",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-04-480.avif 480w, /projects/3-bedroom-bungalow/img-04-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-04-480.webp 480w, /projects/3-bedroom-bungalow/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADQAwCdASoUAAsAPxl0slCspqSisAgBkCMJZwAAXe5Uj7j+szKpKAAA/t63fX9bKNa7KexkpmzEdFDWU1XQfowjS/NE97KerK7HVq9WCQPNxKrXpf3+GTDpS/1q+mMFewgL9BMNAwAAAA=="
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-05.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 5",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-05-480.avif 480w, /projects/3-bedroom-bungalow/img-05-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-05-480.webp 480w, /projects/3-bedroom-bungalow/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADQAwCdASoUAAsAPxl2slEspySisAgBkCMJYwAAWPDR5tKY9Ga/VAAA+i4BS8Br9QBpBDypvuVejjNsDJgA/Ic32gQPbJ3iAAA="
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-06.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 6",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-06-480.avif 480w, /projects/3-bedroom-bungalow/img-06-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-06-480.webp 480w, /projects/3-bedroom-bungalow/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAABwAwCdASoUAAsAPxl2slEspySisAgBkCMJZwAASnCLBv8EYAAA/NWSvqrlCeyMpja9utWzD95Ehc13rPUUovbsVlUgg5t7P3Zb6TwgbLbj8dpq0ayEVPaRQAA="
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-07.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 7",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-07-480.avif 480w, /projects/3-bedroom-bungalow/img-07-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-07-480.webp 480w, /projects/3-bedroom-bungalow/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACQAwCdASoUAAsAPxl2slCspySisAgBkCMJZwDG9BJ/2BCmhyagAPfR84Rwlok2CsviOwSlvbjCuYlGtQVVlHlmiJmoG9K9G8tCrfAA"
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-08.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 8",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-08-480.avif 480w, /projects/3-bedroom-bungalow/img-08-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-08-480.webp 480w, /projects/3-bedroom-bungalow/img-08-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAACwAwCdASoUAAsAPxl0sVCspqSisAgBkCMJZwDCgB3uHvppuqmawAD4QhrpFGqTfsE+pzhngfVsTdEtY8MTkZ58gkW67EOqNKAAAA=="
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-09.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 9",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-09-480.avif 480w, /projects/3-bedroom-bungalow/img-09-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-09-480.webp 480w, /projects/3-bedroom-bungalow/img-09-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAwCdASoUAAsAPxl2slCspySisAgBkCMJZQDCgCPvvAE6CTX3nPnoAN/ACZtshtd0yliiHlIub9U+jBeTbrkGACPMnO2N98fQRz98yPIEsau9Mnrr0QAA"
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-10.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 10",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-10-480.avif 480w, /projects/3-bedroom-bungalow/img-10-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-10-480.webp 480w, /projects/3-bedroom-bungalow/img-10-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoUAAsAPxl0slCspqSisAgBkCMJZQAALQuXlP2350AAAO632dvOdNJi8TwT53dI67pccNcE0Frjnz0sbf1AC6NIrRAqRxII9z2XgAAA"
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-11.jpg",
        "width": 1280,
        "height": 720,
        "alt": "3 Bedroom Bungalow view 11",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-11-480.avif 480w, /projects/3-bedroom-bungalow/img-11-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-11-480.webp 480w, /projects/3-bedroom-bungalow/img-11-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAwCdASoUAAsAPxl2slEspySisAgBkCMJZQDDNB0jlz5FeN4YtAAA3ExzsDkLfK2G/qeOSkvCpEmYcJAWBsEf4mMOsiJJ6/ykf08yaWyGCgAA"
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-12.jpg",
        "width": 960,
        "height": 1280,
        "alt": "3 Bedroom Bungalow view 12",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-12-480.avif 480w, /projects/3-bedroom-bungalow/img-12-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-12-480.webp 480w, /projects/3-bedroom-bungalow/img-12-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAwAwCdASoPABQAPxl2slEspySjsAgBkCMJQBdgA7ewCOkAAPFFLQYoee3E/ucfBj6BBfhe4mjMmqJNVqBUJMF9g0dblD7cE8Hg3C7C6BpprtexHJgAAA=="
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-13.jpg",
        "width": 720,
        "height": 1280,
        "alt": "3 Bedroom Bungalow view 13",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-13-480.avif 480w, /projects/3-bedroom-bungalow/img-13-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-13-480.webp 480w, /projects/3-bedroom-bungalow/img-13-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAABQAwCdASoLABQAPxl0slCspqSisAgBkCMJQAAKi9F4qszMAAD2Qn2dkX4trtnLrnlASa6LIJlmRkkP9OD3FzKWfnjgHyeOdlscUj+D4AA="
      },
      {
        "src": "/projects/3-bedroom-bungalow/img-14.jpg",
        "width": 720,
        "height": 1280,
        "alt": "3 Bedroom Bungalow view 14",
        "avifSrcSet": "/projects/3-bedroom-bungalow/img-14-480.avif 480w, /projects/3-bedroom-bungalow/img-14-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow/img-14-480.webp 480w, /projects/3-bedroom-bungalow/img-14-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAABQAwCdASoLABQAPxl2slEspySisAgBkCMJYwAAXfBMdkWQAAD30pv0Xr2aC/McKbQrXuRks4fECxiJv2yKJaGExqc2u5eAAAA="
      }
    ],
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
    "images": [
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-01.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 1",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-01-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-01-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-01-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACQAwCdASoUAAsAPxl2slEspySisAgBkCMJZwAAW7ttmo7yUWlgAP7UZyeR917oqzt2+MIebMKggUXS3On9Ug8Z0j/Y9Oz8/9U/J9isgqxa1XkVOxcgAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-02.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 2",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-02-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-02-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-02-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAACwAwCdASoUAAsAPxl2slEspySisAgBkCMJZwAAWplXA/TZcBUvQAD+xeHrum9qOY08YD5sNCUMymkw/hA53LpuRQJ9ORodFLY8xbmheHlaFOtcxXyk8CuReHx5qXgA"
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-03.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 3",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-03-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-03-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-03-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAACwAwCdASoUAAsAPxl0slCspqSisAgBkCMJZwDE2CHIxY29sm6ZcAD+kaipmEx+dHThBr2J25nlZLojBE3GcBxnrkFtR40cNVafX+ZkHYUwA4Ul2Ioes/+FYDQAAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-04.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 4",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-04-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-04-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-04-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAACQAwCdASoUAAsAPxl2slEspySisAgBkCMJZwDA3CKPoMZOvYYAAP7UOL/Gph38az6n6bJvNlw/LgCHTWv2Yhybdga9f9RVq7kJaTFoERRb3PSHMAA="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-05.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 5",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-05-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-05-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-05-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQBACdASoUAAsAPxl2slEspySisAgBkCMJZwDLLCHecllRfl9HVOv+AAD+1GUM60kVHBs5S4lK+e8FgMnP9ixpmozac8Lm8icnwZ+obkddg9RDrFdWwAAA"
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-06.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 6",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-06-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-06-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-06-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAwCdASoUAAsAPxl0slEspqSisAgBkCMJaQAAW+/FpACm1ZjXhAgAAP6Rt51PF/+3gbEHBQkX/mWXcrEav6gFr0N6GPf5FF91fM/W2IS0mJwoRg2J+eLkAAA="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-07.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 7",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-07-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-07-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-07-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoUAAsAPxl2slCspySisAgBkCMJaQDE2CHG7qaU2LgAAP3juVITxtajkC2PthoF9zMb6o9YybRlF3FFp+8NISjirx3j68E65bzOaAAA"
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-08.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 8",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-08-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-08-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-08-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-08-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADQAwCdASoUAAsAPxl0slCspqSisAgBkCMJZwDDNCIGQaAkzpTYuAAA/pG3iF1ONuJu2pUE1G4emMdUY85Z6IW1JSfv/B67lNZwWJtn/48o5JzmCl3ztOkX0UcAAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-09.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 9",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-09-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-09-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-09-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-09-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAABwAwCdASoUAAsAPxl2slEspySisAgBkCMJZwAAW8TzXi8q6AAA/pG3igTYD+iDhYAaKX4vCIUozfqCveg3QGZK2gbIN+yTtxEx6uzv9E/DbBHE9AYQAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-10.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 10",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-10-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-10-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-10-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-10-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAACwAwCdASoUAAsAPxl0sVCspqSisAgBkCMJZwDDNCHdmUVAMlqgSAD+kbeIM2W7XqJROiZJF6TXaQT6Wy6EtOHFx3p5ydglvF7IpNtJ06LxPxXcN5U3Tu6LNmAAAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-11.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 11",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-11-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-11-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-11-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-11-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACwAwCdASoUAAsAPxl2slCspySisAgBkCMJZwCzgCHg/3QCrUsMAAD+sjIpXF2EnD3SwtWhav0ZC3Y2OSHxoneNoD+mUs1+wpgBwpLszZDtXQ8gwgAAAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-12.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 12",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-12-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-12-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-12-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-12-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAACQAwCdASoUAAsAPxl2slEspySisAgBkCMJZwAAUwOG/NScnvwAAP7nktGHndmQ8ey45K5Bgb8jwtFqnvtu7dUN0WJs6pZHjXEjvn5j9kAk1itW8nK6XDRi/WVj0Bv6gvCAAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-13.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 13",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-13-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-13-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-13-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-13-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAACQAwCdASoUAAsAPxl2slEspySisAgBkCMJZwDE2BsvZblurMDQAL2dMQmVTp+80z/1t5VS4nn29X+cAV3wUP5fxCvBlf2rIIIgAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-14.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 14",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-14-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-14-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-14-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-14-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwAwCdASoUAAsAPxl2slEspySisAgBkCMJZwAAW7XPe/Cw25tdZEvAAOAnOQ0TWr0q2wnIuNmCT5YWKptkAgOouFy5kVGwWeOM/xNxuZwzUi6GNxap2QMQn/0HhFYUa8zgAB8YAUnAAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-15.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 15",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-15-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-15-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-15-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-15-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQAwCdASoUAAsAPxl2slCspySisAgBkCMJZwDG9BYSCNEHLXQAAPP/gp6mIXssdfaPUfEtY8g7XQrR7Bndow5nhuFOfhOzE4XJYFne8fklWRbiLVvQFvl2JvE/JLNqpp2s6oQqeAA="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-16.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 16",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-16-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-16-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-16-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-16-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAABQBACdASoUAAsAPxl2slCspySisAgBkCMJZwCAAAk7S6vvv+g9H+FOhIAAAPyrdbUApOWKn1whUSx6fOrKE4jLSCqr59xd3rPzWQdCtThJA+9RMWz4CTgA"
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-17.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 17",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-17-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-17-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-17-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-17-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACwAwCdASoUAAsAPxl2slEspySisAgBkCMJZQC7AA+PeVqddvyqAADx/OhAfacngyna/odgWs5DAMQCsTR4TVJr52O0i7cYhIitGHgtCl+IAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-18.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 18",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-18-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-18-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-18-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-18-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAwCdASoUAAsAPxl0sVCspqSisAgBkCMJZwAAVObmJ+50jSuh+wAA/dJkjoJFSaam8150pcprm6Js5uYHgvXya+WKO4wQnFr0ac1ESrv2dnK16yqD0PgA"
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-19.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 19",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-19-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-19-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-19-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-19-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACQAwCdASoUAAsAPxl2slEspySisAgBkCMJZQDE2A8kuNfRTPQAANxOeGUPUExefj3wRHbm62hNa12crQRHQq4z4a7fA6ui83xjGtXSyZDHGrxoSPQAAA=="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-20.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 20",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-20-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-20-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-20-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-20-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAACQAwCdASoUAAsAPxl2slEspySisAgBkCMJZwAAI2rS0EvHOe0AAP0cjebbOXxZOtEOey1xOGjGy97rQ1fUJ1RdwuJ2E0F+KvjjKli00Usv0b5eAAA="
      },
      {
        "src": "/projects/4-bedroom-terrace-interiors/img-21.jpg",
        "width": 1280,
        "height": 720,
        "alt": "4 Bedroom Terrace & Interiors view 21",
        "avifSrcSet": "/projects/4-bedroom-terrace-interiors/img-21-480.avif 480w, /projects/4-bedroom-terrace-interiors/img-21-960.avif 960w",
        "webpSrcSet": "/projects/4-bedroom-terrace-interiors/img-21-480.webp 480w, /projects/4-bedroom-terrace-interiors/img-21-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAABQAwCdASoUAAsAPxl2slEspySisAgBkCMJZQDE2Av300iDAADwvIJ8TPJLOmGKsKczGLdNAkQhVTb7ruAkfGG9Y3B7OiMED9igfuX2+b+wAAAA"
      }
    ],
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
    "images": [
      {
        "src": "/projects/5-bedroom-mansion/img-01.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 1",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-01-480.avif 480w, /projects/5-bedroom-mansion/img-01-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-01-480.webp 480w, /projects/5-bedroom-mansion/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACQAwCdASoUAA8APxl4tFGspyUisAgBkCMJZwDCgB9D/iGCYKAAAP5kR/ZGuP8u/caS7IeT1fulSqJN+GmTPwc5O+nTgAAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-02.jpg",
        "width": 720,
        "height": 1280,
        "alt": "5 Bedroom Mansion view 2",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-02-480.avif 480w, /projects/5-bedroom-mansion/img-02-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-02-480.webp 480w, /projects/5-bedroom-mansion/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACwAwCdASoLABQAPxl0sVCspqSisAgBkCMJYgAASjcJ38SoUxmBgAD7ZmmBXkfJVLet9QvFp3CIUlBv2E6600XKS2uhV3yJBq8jtIm60UAAAA=="
      },
      {
        "src": "/projects/5-bedroom-mansion/img-03.jpg",
        "width": 960,
        "height": 1280,
        "alt": "5 Bedroom Mansion view 3",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-03-480.avif 480w, /projects/5-bedroom-mansion/img-03-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-03-480.webp 480w, /projects/5-bedroom-mansion/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACQAwCdASoPABQAPxl2slEspySisAgBkCMJZADCgAjAaCh2UU8AAPxyK+SaU4ChmbECm/DH0t4A4A06itnQB3csm7OZrcqvweDSU2OQFSyB27jV+iviQX/SlIEVWFnG//7QjUpRvacCgAAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-04.jpg",
        "width": 960,
        "height": 1280,
        "alt": "5 Bedroom Mansion view 4",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-04-480.avif 480w, /projects/5-bedroom-mansion/img-04-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-04-480.webp 480w, /projects/5-bedroom-mansion/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAQBACdASoPABQAPxl0sVCspqSisAgBkCMJZQDCgCFN7N6lpMpL4Eh2AADOOCxeNutY9h3afMZNPdSA8L8uu7yq9SDsFLj9Y/yPCDXgWY92eaDJrUxIb8gttWiiuUQ+Qo0utrMvEnzoDQ7vKTAk5LAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-05.jpg",
        "width": 960,
        "height": 1280,
        "alt": "5 Bedroom Mansion view 5",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-05-480.avif 480w, /projects/5-bedroom-mansion/img-05-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-05-480.webp 480w, /projects/5-bedroom-mansion/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADwAwCdASoPABQAPxl0sVCspqSisAgBkCMJQBifCYhBYUJaSDfx9IewAP6th7I9O9XvwK+GnDwJms3oTC3RGSJhk6xBiHklOuvh7fO3SmUiE7/b0oc43GIgA1VmWMVTPVrfS4Hcc5/VZQ0iJEMe4H8M3a6xvuK7DGoYAWAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-06.jpg",
        "width": 960,
        "height": 1280,
        "alt": "5 Bedroom Mansion view 6",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-06-480.avif 480w, /projects/5-bedroom-mansion/img-06-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-06-480.webp 480w, /projects/5-bedroom-mansion/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAQBACdASoPABQAPxl0sVCspqSisAgBkCMJYwAAWpwGpVNS48IvA+5xwAD8x1LvNyhFkLx2MWbV/zhkq9z/rVXAFMiGy+IF96UnIB6ZXkEOam6SfnHh4L8b8nlKeO5Pq2BGFqLwAAA="
      },
      {
        "src": "/projects/5-bedroom-mansion/img-07.jpg",
        "width": 719,
        "height": 1280,
        "alt": "5 Bedroom Mansion view 7",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-07-480.avif 480w, /projects/5-bedroom-mansion/img-07-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-07-480.webp 480w, /projects/5-bedroom-mansion/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAwBACdASoLABQAPxl2slEspySisAgBkCMJQBWEDgBcUF/PHCcsgMl2m8AA/IbIlZOB6gSxrnMFUAcAue771nSwbDisnwFtytw3D6/DAx3nQ4LO2UHzZVkSWGrcBJh+ZsyWrMqTYGBJEAAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-08.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 8",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-08-480.avif 480w, /projects/5-bedroom-mansion/img-08-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-08-480.webp 480w, /projects/5-bedroom-mansion/img-08-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAAAwAwCdASoUAA8APxl4slEspySisAgBkCMJaQAAXAY503iAAP3zW01oykXOZD84D0rhvjhQAAA="
      },
      {
        "src": "/projects/5-bedroom-mansion/img-09.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 9",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-09-480.avif 480w, /projects/5-bedroom-mansion/img-09-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-09-480.webp 480w, /projects/5-bedroom-mansion/img-09-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAACwAwCdASoUAA8APxl2slEspySisAgBkCMJZwAAUqQp9stYS12BwAD8wSYevXz3O7F8sS/0tZEK94AE/iYlYfq3J1hgAA=="
      },
      {
        "src": "/projects/5-bedroom-mansion/img-10.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 10",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-10-480.avif 480w, /projects/5-bedroom-mansion/img-10-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-10-480.webp 480w, /projects/5-bedroom-mansion/img-10-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACQAwCdASoUAA8APxl2slEspySisAgBkCMJZwAAUqLKaSjlHP/sAPzEu3/7s06EIrJk344TRqvwd8dOm5f+/vrlAAA="
      },
      {
        "src": "/projects/5-bedroom-mansion/img-11.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 11",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-11-480.avif 480w, /projects/5-bedroom-mansion/img-11-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-11-480.webp 480w, /projects/5-bedroom-mansion/img-11-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAwAwCdASoUAA8APxl2slEspySisAgBkCMJZ1nyADc1oigAAP7dnHSMiKEKVPAfuEDrms5QHkAebqPlgm5O31jgAAA="
      },
      {
        "src": "/projects/5-bedroom-mansion/img-12.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 12",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-12-480.avif 480w, /projects/5-bedroom-mansion/img-12-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-12-480.webp 480w, /projects/5-bedroom-mansion/img-12-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAABQAwCdASoUAA8APxl2slEspySisAgBkCMJaWM+ADcAnRJQ4AD+26RrrdGCuKMI1zZUlcRVIj521TerYc6X2hDMTOAAAA=="
      },
      {
        "src": "/projects/5-bedroom-mansion/img-13.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 13",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-13-480.avif 480w, /projects/5-bedroom-mansion/img-13-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-13-480.webp 480w, /projects/5-bedroom-mansion/img-13-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACwAwCdASoUAA8APxl2slEspySisAgBkCMJZwAAUvLNwmacipY6AAD3JxuTTacFLeMXQOeMCtlW78YlidqPrf8hAApYCAAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-14.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 14",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-14-480.avif 480w, /projects/5-bedroom-mansion/img-14-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-14-480.webp 480w, /projects/5-bedroom-mansion/img-14-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAABQAwCdASoUAA8APxl2slEspySisAgBkCMJZwAAVFNbRhcD0AD3H/5UgXPbQAedAgxPK5ic6xVmjahhg1ih/VOsPmgb/Jmd95+CoAAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-15.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 15",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-15-480.avif 480w, /projects/5-bedroom-mansion/img-15-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-15-480.webp 480w, /projects/5-bedroom-mansion/img-15-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACQAwCdASoUAA8APxl2slCspySisAgBkCMJZwAAW72DBmON9TcAAPiL1IGbB06rcOFTCXQh1y5RcQHAAAA="
      },
      {
        "src": "/projects/5-bedroom-mansion/img-16.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 16",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-16-480.avif 480w, /projects/5-bedroom-mansion/img-16-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-16-480.webp 480w, /projects/5-bedroom-mansion/img-16-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACQAwCdASoUAA8APxl0sVCspqSisAgBkCMJZwAAUzMFKlgx4cmgAPxcjJZbEJtUEe0g2BImcbyMo7c7o0pYAMAbO0gA5vTZl9UdcgAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-17.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 17",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-17-480.avif 480w, /projects/5-bedroom-mansion/img-17-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-17-480.webp 480w, /projects/5-bedroom-mansion/img-17-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADQAwCdASoUAA8APxl0slEspqSisAgBkCMJZQDCgCHhLAVJg065WoAA/En3IVFllgS00T2dmWBQPPjb2KisBtZYzcgi9a8qg26aZs95em+GS+gAAAA="
      },
      {
        "src": "/projects/5-bedroom-mansion/img-18.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 18",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-18-480.avif 480w, /projects/5-bedroom-mansion/img-18-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-18-480.webp 480w, /projects/5-bedroom-mansion/img-18-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACwAwCdASoUAA8APxl0slCspqSisAgBkCMJZQDCu/7AMbK25J98AAD8n9u0AVwzoMH3T4ikPtDotTUj7eVsF/rTBwN7qwt1bWlm+J+BG1SGMrAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-19.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 19",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-19-480.avif 480w, /projects/5-bedroom-mansion/img-19-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-19-480.webp 480w, /projects/5-bedroom-mansion/img-19-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADwAwCdASoUAA8APxl0slEspqSisAgBkCMJZwDE2BmzD/W3taLhLtlgAPxUcFN29Uu5yMSgijGelJBEBOH8MxAO10IaG3LKaSwxoE0izhJhazvUA6amPujHVWHQ/HUxgLki0QAA"
      },
      {
        "src": "/projects/5-bedroom-mansion/img-20.jpg",
        "width": 1280,
        "height": 960,
        "alt": "5 Bedroom Mansion view 20",
        "avifSrcSet": "/projects/5-bedroom-mansion/img-20-480.avif 480w, /projects/5-bedroom-mansion/img-20-960.avif 960w",
        "webpSrcSet": "/projects/5-bedroom-mansion/img-20-480.webp 480w, /projects/5-bedroom-mansion/img-20-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACwAwCdASoUAA8APxl0slCspqSisAgBkCMJZQDDNB58W+oiff/wQAD3JwRmwZaduj6WF5YprD1tUZ3cA8rWXFfp7/VOTfAA"
      }
    ],
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
    "images": [
      {
        "src": "/projects/healing-therapeutic-care-centre/img-01.jpg",
        "width": 1280,
        "height": 960,
        "alt": "Healing & Therapeutic Care Centre view 1",
        "avifSrcSet": "/projects/healing-therapeutic-care-centre/img-01-480.avif 480w, /projects/healing-therapeutic-care-centre/img-01-960.avif 960w",
        "webpSrcSet": "/projects/healing-therapeutic-care-centre/img-01-480.webp 480w, /projects/healing-therapeutic-care-centre/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAADwAwCdASoUAA8APxl0sVCspqSisAgBkCMJYwC/OB8rKUeuAFAanHwAAP545ryx/vQDOKepBIbo3eFKqCJJWQNtlUBml5cSxa9IRoqnx/oNQ41QE/shOBhBBrwVWfpBATmZ6vQHp3c0VNv2nw/vlqgAAAA="
      },
      {
        "src": "/projects/healing-therapeutic-care-centre/img-02.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Healing & Therapeutic Care Centre view 2",
        "avifSrcSet": "/projects/healing-therapeutic-care-centre/img-02-480.avif 480w, /projects/healing-therapeutic-care-centre/img-02-960.avif 960w",
        "webpSrcSet": "/projects/healing-therapeutic-care-centre/img-02-480.webp 480w, /projects/healing-therapeutic-care-centre/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQBACdASoPABQAPxl0sVCspqSisAgBkCMJQBfnBF9x5j/57KlP494eBYEAAP6timHS5D5aEjwecr3VhkDYtMUFj6Zc1gTzRki7IfR1ArRpxyBbloRBcTctFvjnEp/lt3gAAA=="
      },
      {
        "src": "/projects/healing-therapeutic-care-centre/img-03.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Healing & Therapeutic Care Centre view 3",
        "avifSrcSet": "/projects/healing-therapeutic-care-centre/img-03-480.avif 480w, /projects/healing-therapeutic-care-centre/img-03-960.avif 960w",
        "webpSrcSet": "/projects/healing-therapeutic-care-centre/img-03-480.webp 480w, /projects/healing-therapeutic-care-centre/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAQBACdASoPABQAPxl0slEspqSisAgBkCMJbACw7CBj4coh6RwSPhGAQAD+s/3hcgGLq/drO+cgdHbnC3UrO5J4cjXr+rdJsLp6eipsIvLMrwd+4T/NhqYx9HZNicF0fVqUE9MHWsPkQqLdvSItwAAA"
      }
    ],
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
    "images": [
      {
        "src": "/projects/2-bedroom-bungalow-2d-draft/img-01.jpg",
        "width": 1280,
        "height": 904,
        "alt": "2 Bedroom Bungalow 2D Draft view 1",
        "avifSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-01-480.avif 480w, /projects/2-bedroom-bungalow-2d-draft/img-01-960.avif 960w",
        "webpSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-01-480.webp 480w, /projects/2-bedroom-bungalow-2d-draft/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAAAwAwCdASoUAA4APxl2slCspySisAgBkCMJaQAAW+tAdqxAAP7tN0ujymTqsF/L/d4AAAAA"
      },
      {
        "src": "/projects/2-bedroom-bungalow-2d-draft/img-02.jpg",
        "width": 1280,
        "height": 904,
        "alt": "2 Bedroom Bungalow 2D Draft view 2",
        "avifSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-02-480.avif 480w, /projects/2-bedroom-bungalow-2d-draft/img-02-960.avif 960w",
        "webpSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-02-480.webp 480w, /projects/2-bedroom-bungalow-2d-draft/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAABwAwCdASoUAA4APxl2slEspySisAgBkCMJZwAAW+ozdV7QQAAA/u083NhBPV93ZqeVjIQIZSGU9YAgAAA="
      },
      {
        "src": "/projects/2-bedroom-bungalow-2d-draft/img-03.jpg",
        "width": 1280,
        "height": 904,
        "alt": "2 Bedroom Bungalow 2D Draft view 3",
        "avifSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-03-480.avif 480w, /projects/2-bedroom-bungalow-2d-draft/img-03-960.avif 960w",
        "webpSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-03-480.webp 480w, /projects/2-bedroom-bungalow-2d-draft/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAABQAwCdASoUAA4APxl2slEspySisAgBkCMJZwAAW+qx985qAAD+7TcdpjhF9yq80QbBQAAA"
      },
      {
        "src": "/projects/2-bedroom-bungalow-2d-draft/img-04.jpg",
        "width": 1280,
        "height": 904,
        "alt": "2 Bedroom Bungalow 2D Draft view 4",
        "avifSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-04-480.avif 480w, /projects/2-bedroom-bungalow-2d-draft/img-04-960.avif 960w",
        "webpSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-04-480.webp 480w, /projects/2-bedroom-bungalow-2d-draft/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAgCdASoUAA4APxl2sVCspySisAgBkCMJaQAAeyAA/u8eiIN0K86h0g3QRAAA"
      },
      {
        "src": "/projects/2-bedroom-bungalow-2d-draft/img-05.jpg",
        "width": 1280,
        "height": 904,
        "alt": "2 Bedroom Bungalow 2D Draft view 5",
        "avifSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-05-480.avif 480w, /projects/2-bedroom-bungalow-2d-draft/img-05-960.avif 960w",
        "webpSrcSet": "/projects/2-bedroom-bungalow-2d-draft/img-05-480.webp 480w, /projects/2-bedroom-bungalow-2d-draft/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAAAwAwCdASoUAA4APxl2slCspySisAgBkCMJaQAAW4M5lbfAAP7tRyYWzNc9P3JD4uqul8cEWHAAAA=="
      }
    ],
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
    "images": [
      {
        "src": "/projects/3-bedroom-bungalow-2d-draft/img-01.jpg",
        "width": 1280,
        "height": 904,
        "alt": "3 Bedroom Bungalow 2D Draft view 1",
        "avifSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-01-480.avif 480w, /projects/3-bedroom-bungalow-2d-draft/img-01-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-01-480.webp 480w, /projects/3-bedroom-bungalow-2d-draft/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAAAwAwCdASoUAA4APxl2slCspySisAgBkCMJaQAAW+tAdqxAAP7tN0ujymTqsF/L/d4AAAAA"
      },
      {
        "src": "/projects/3-bedroom-bungalow-2d-draft/img-02.jpg",
        "width": 1280,
        "height": 904,
        "alt": "3 Bedroom Bungalow 2D Draft view 2",
        "avifSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-02-480.avif 480w, /projects/3-bedroom-bungalow-2d-draft/img-02-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-02-480.webp 480w, /projects/3-bedroom-bungalow-2d-draft/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAABwAwCdASoUAA4APxl2slEspySisAgBkCMJZwAAW+ozdV7QQAAA/u083NhBPV93ZqeVjIQIZSGU9YAgAAA="
      },
      {
        "src": "/projects/3-bedroom-bungalow-2d-draft/img-03.jpg",
        "width": 1280,
        "height": 904,
        "alt": "3 Bedroom Bungalow 2D Draft view 3",
        "avifSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-03-480.avif 480w, /projects/3-bedroom-bungalow-2d-draft/img-03-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-03-480.webp 480w, /projects/3-bedroom-bungalow-2d-draft/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAABQAwCdASoUAA4APxl2slEspySisAgBkCMJZwAAW+qx985qAAD+7TcdpjhF9yq80QbBQAAA"
      },
      {
        "src": "/projects/3-bedroom-bungalow-2d-draft/img-04.jpg",
        "width": 1280,
        "height": 904,
        "alt": "3 Bedroom Bungalow 2D Draft view 4",
        "avifSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-04-480.avif 480w, /projects/3-bedroom-bungalow-2d-draft/img-04-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-04-480.webp 480w, /projects/3-bedroom-bungalow-2d-draft/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAgCdASoUAA4APxl2sVCspySisAgBkCMJaQAAeyAA/u8eiIN0K86h0g3QRAAA"
      },
      {
        "src": "/projects/3-bedroom-bungalow-2d-draft/img-05.jpg",
        "width": 1280,
        "height": 904,
        "alt": "3 Bedroom Bungalow 2D Draft view 5",
        "avifSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-05-480.avif 480w, /projects/3-bedroom-bungalow-2d-draft/img-05-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-05-480.webp 480w, /projects/3-bedroom-bungalow-2d-draft/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAAAwAwCdASoUAA4APxl2slCspySisAgBkCMJaQAAW4M5lbfAAP7tRyYWzNc9P3JD4uqul8cEWHAAAA=="
      },
      {
        "src": "/projects/3-bedroom-bungalow-2d-draft/img-06.jpg",
        "width": 1280,
        "height": 904,
        "alt": "3 Bedroom Bungalow 2D Draft view 6",
        "avifSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-06-480.avif 480w, /projects/3-bedroom-bungalow-2d-draft/img-06-960.avif 960w",
        "webpSrcSet": "/projects/3-bedroom-bungalow-2d-draft/img-06-480.webp 480w, /projects/3-bedroom-bungalow-2d-draft/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAAAwAwCdASoUAA4APxl2slEspySisAgBkCMJaQAAWp9aNSEAAP7tWaNi5B+UF4/CYAA="
      }
    ],
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
    "images": [
      {
        "src": "/projects/bq-2d-draft/img-01.jpg",
        "width": 1280,
        "height": 904,
        "alt": "Boys Quarters (BQ) 2D Draft view 1",
        "avifSrcSet": "/projects/bq-2d-draft/img-01-480.avif 480w, /projects/bq-2d-draft/img-01-960.avif 960w",
        "webpSrcSet": "/projects/bq-2d-draft/img-01-480.webp 480w, /projects/bq-2d-draft/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAAAQAwCdASoUAA4APxl2slEspySisAgBkCMJaQAAW+n7KEAA/u1Bj4pXl0z22PdoAAA="
      },
      {
        "src": "/projects/bq-2d-draft/img-02.jpg",
        "width": 1280,
        "height": 904,
        "alt": "Boys Quarters (BQ) 2D Draft view 2",
        "avifSrcSet": "/projects/bq-2d-draft/img-02-480.avif 480w, /projects/bq-2d-draft/img-02-960.avif 960w",
        "webpSrcSet": "/projects/bq-2d-draft/img-02-480.webp 480w, /projects/bq-2d-draft/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAAAwAwCdASoUAA4APxl2slCspySisAgBkCMJZwAAW+p+KgIAAP7tOB0IOJkiyERjzsysgAAAAAA="
      },
      {
        "src": "/projects/bq-2d-draft/img-03.jpg",
        "width": 1280,
        "height": 904,
        "alt": "Boys Quarters (BQ) 2D Draft view 3",
        "avifSrcSet": "/projects/bq-2d-draft/img-03-480.avif 480w, /projects/bq-2d-draft/img-03-960.avif 960w",
        "webpSrcSet": "/projects/bq-2d-draft/img-03-480.webp 480w, /projects/bq-2d-draft/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAAAwAwCdASoUAA4APxl2slEspySisAgBkCMJaQAAW+pC9PIAAP7tN2ko4R4ZQAAA"
      },
      {
        "src": "/projects/bq-2d-draft/img-04.jpg",
        "width": 1280,
        "height": 904,
        "alt": "Boys Quarters (BQ) 2D Draft view 4",
        "avifSrcSet": "/projects/bq-2d-draft/img-04-480.avif 480w, /projects/bq-2d-draft/img-04-960.avif 960w",
        "webpSrcSet": "/projects/bq-2d-draft/img-04-480.webp 480w, /projects/bq-2d-draft/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAAAwAwCdASoUAA4APxl2slEspySisAgBkCMJZwAAW+siiOcAAP7tN2uuvJ4cTWn1xefwAA=="
      }
    ],
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
    "images": [
      {
        "src": "/projects/kitchen-scale-model/img-01.jpg",
        "width": 720,
        "height": 1280,
        "alt": "Kitchen Interior Scale Model view 1",
        "avifSrcSet": "/projects/kitchen-scale-model/img-01-480.avif 480w, /projects/kitchen-scale-model/img-01-960.avif 960w",
        "webpSrcSet": "/projects/kitchen-scale-model/img-01-480.webp 480w, /projects/kitchen-scale-model/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAQBACdASoLABQAPxl2slCspySisAgBkCMJZAC7MoACsx202PpiJdHZwAD58mGyLmMlRah8t3o0sEoRB/4ddBheeSShwDlKdqE4zts5qWE85fp1qXDDw0146VtOLmAAAAA="
      },
      {
        "src": "/projects/kitchen-scale-model/img-02.jpg",
        "width": 720,
        "height": 1280,
        "alt": "Kitchen Interior Scale Model view 2",
        "avifSrcSet": "/projects/kitchen-scale-model/img-02-480.avif 480w, /projects/kitchen-scale-model/img-02-960.avif 960w",
        "webpSrcSet": "/projects/kitchen-scale-model/img-02-480.webp 480w, /projects/kitchen-scale-model/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAACwAwCdASoLABQAPxl0sVCspqSisAgBkCMJQBdgA3G9UBfbvGQA0AD9dk+PH1pmlZOWpjtZY/L8Pd1rkTqfoorALVz90pxFYbDjnrI5OvAofv8u4oho0PksWKdhK5Q9v4AAAA=="
      },
      {
        "src": "/projects/kitchen-scale-model/img-03.jpg",
        "width": 720,
        "height": 1280,
        "alt": "Kitchen Interior Scale Model view 3",
        "avifSrcSet": "/projects/kitchen-scale-model/img-03-480.avif 480w, /projects/kitchen-scale-model/img-03-960.avif 960w",
        "webpSrcSet": "/projects/kitchen-scale-model/img-03-480.webp 480w, /projects/kitchen-scale-model/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADQAwCdASoLABQAPxl2slEspySisAgBkCMJYgAAW+855F1iZlDrxgAA/U0O6e6NhilvkPSXeax8s7oD7F35z6XZuAQwvLkkln624AiTziZc1GKGeNAKbHYDNsvgAA=="
      },
      {
        "src": "/projects/kitchen-scale-model/img-04.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Kitchen Interior Scale Model view 4",
        "avifSrcSet": "/projects/kitchen-scale-model/img-04-480.avif 480w, /projects/kitchen-scale-model/img-04-960.avif 960w",
        "webpSrcSet": "/projects/kitchen-scale-model/img-04-480.webp 480w, /projects/kitchen-scale-model/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAAAwBACdASoPABQAPxl2slEspySisAgBkCMJQBjeg6f9N+x4F4uoTLnwk0gA/hZcobr9LdEwxYD+HEdeSnZNfAt3w01hFJyk+QXD8qOmkyj78gpzNt7NqxqkQmH4sKKuXJj2skeYl6HzG5vqGkmFLwTgnH+oAA=="
      },
      {
        "src": "/projects/kitchen-scale-model/img-05.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Kitchen Interior Scale Model view 5",
        "avifSrcSet": "/projects/kitchen-scale-model/img-05-480.avif 480w, /projects/kitchen-scale-model/img-05-960.avif 960w",
        "webpSrcSet": "/projects/kitchen-scale-model/img-05-480.webp 480w, /projects/kitchen-scale-model/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQBACdASoPABQAPxl2slEspySisAgBkCMJYwCw7CKq1zP5k92PhvZogAD9MI/6o/m5Zi/3+ZIbxRO31SYAqQxi9G/3PAbxJPE+BhnbD7+77q3FHAesQkQA"
      },
      {
        "src": "/projects/kitchen-scale-model/img-06.jpg",
        "width": 1280,
        "height": 960,
        "alt": "Kitchen Interior Scale Model view 6",
        "avifSrcSet": "/projects/kitchen-scale-model/img-06-480.avif 480w, /projects/kitchen-scale-model/img-06-960.avif 960w",
        "webpSrcSet": "/projects/kitchen-scale-model/img-06-480.webp 480w, /projects/kitchen-scale-model/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAQBACdASoUAA8APxl2slEspySisAgBkCMJYwCdMoAC+/thEx7jephxgAD+Ph1k9BEJEUqe8mxVYrjn3VO0YAraj9qYlfSQELDXsj+WpfIY+WyxQDZtL7wQz54Q4ofyZpMAAA=="
      },
      {
        "src": "/projects/kitchen-scale-model/img-07.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Kitchen Interior Scale Model view 7",
        "avifSrcSet": "/projects/kitchen-scale-model/img-07-480.avif 480w, /projects/kitchen-scale-model/img-07-960.avif 960w",
        "webpSrcSet": "/projects/kitchen-scale-model/img-07-480.webp 480w, /projects/kitchen-scale-model/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAACwAwCdASoPABQAPxl0slCspqSisAgBkCMJYgCw7BtsVw0naN1agADt6NTgd1Pvy1jlCKyQsnDAD4THknKYaRcJucttRj4S6Z4n7tuPwbvlsqvaB9tOj6DwL7nz6TAA"
      }
    ],
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
    "images": [
      {
        "src": "/projects/study-room-interior/img-01.jpg",
        "width": 1280,
        "height": 960,
        "alt": "Study Room Interior Model view 1",
        "avifSrcSet": "/projects/study-room-interior/img-01-480.avif 480w, /projects/study-room-interior/img-01-960.avif 960w",
        "webpSrcSet": "/projects/study-room-interior/img-01-480.webp 480w, /projects/study-room-interior/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADQAwCdASoUAA8APxl0sVCspqSisAgBkCMJaQAAUk7226UThL1BTAAAzb5HTtkUogZX1VS5Rk9FGPJOKAA="
      },
      {
        "src": "/projects/study-room-interior/img-02.jpg",
        "width": 1280,
        "height": 960,
        "alt": "Study Room Interior Model view 2",
        "avifSrcSet": "/projects/study-room-interior/img-02-480.avif 480w, /projects/study-room-interior/img-02-960.avif 960w",
        "webpSrcSet": "/projects/study-room-interior/img-02-480.webp 480w, /projects/study-room-interior/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACQAwCdASoUAA8APxl4slCspySisAgBkCMJaQDM0B5+Z1h0sXS0APYBqSlC66x8Pe3FWD9w56SReW/ySZboXDIDAAA="
      },
      {
        "src": "/projects/study-room-interior/img-03.jpg",
        "width": 1280,
        "height": 960,
        "alt": "Study Room Interior Model view 3",
        "avifSrcSet": "/projects/study-room-interior/img-03-480.avif 480w, /projects/study-room-interior/img-03-960.avif 960w",
        "webpSrcSet": "/projects/study-room-interior/img-03-480.webp 480w, /projects/study-room-interior/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAAAwAwCdASoUAA8APxl4slEspySisAgBkCMJaQAAUZQhvKwAAP4WZCvMvcgtBZ0K80N6/nyYrPxm7wAA"
      },
      {
        "src": "/projects/study-room-interior/img-04.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Study Room Interior Model view 4",
        "avifSrcSet": "/projects/study-room-interior/img-04-480.avif 480w, /projects/study-room-interior/img-04-960.avif 960w",
        "webpSrcSet": "/projects/study-room-interior/img-04-480.webp 480w, /projects/study-room-interior/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAABwAwCdASoPABQAPxl2slEspySisAgBkCMJQAAFhjTdq84VI6AA/oEYUUcn2FBKiIQKtjJiXO5R1ORXZXX8ivKPAsE+Hu63oqGiyCoxlJDXX3J+sM0EAA=="
      },
      {
        "src": "/projects/study-room-interior/img-05.jpg",
        "width": 1280,
        "height": 960,
        "alt": "Study Room Interior Model view 5",
        "avifSrcSet": "/projects/study-room-interior/img-05-480.avif 480w, /projects/study-room-interior/img-05-960.avif 960w",
        "webpSrcSet": "/projects/study-room-interior/img-05-480.webp 480w, /projects/study-room-interior/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQBACdASoUAA8APxl2slEspySisAgBkCMJYwDE2CBUyynSVs8ykdy5Y93wAP7ceWGK8ZpVJswsntLIS9rmPOA3se+n6sdIgU1JAe9ioyJpt4o/2Ssk02JB/F3oiqKU6WVgAA=="
      },
      {
        "src": "/projects/study-room-interior/img-06.jpg",
        "width": 1280,
        "height": 960,
        "alt": "Study Room Interior Model view 6",
        "avifSrcSet": "/projects/study-room-interior/img-06-480.avif 480w, /projects/study-room-interior/img-06-960.avif 960w",
        "webpSrcSet": "/projects/study-room-interior/img-06-480.webp 480w, /projects/study-room-interior/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAACwBACdASoUAA8APxl0slCspqSisAgBkCMJZgCdMoADVLrlu37yNo6SH3y80qwAAMxR6g1S/XyaWu3wkQF1LGrSazklpLWhBqehun2XsApEm5WdHYgkA3k9ybhd7Atxqi/9V+ilUfGZd32tbSIF24131jpAwL8HnQgrsFQA"
      },
      {
        "src": "/projects/study-room-interior/img-07.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Study Room Interior Model view 7",
        "avifSrcSet": "/projects/study-room-interior/img-07-480.avif 480w, /projects/study-room-interior/img-07-960.avif 960w",
        "webpSrcSet": "/projects/study-room-interior/img-07-480.webp 480w, /projects/study-room-interior/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQBACdASoPABQAPxl0sVCspqSisAgBkCMJagCdMoCGACLIR42kp5k2WWQAAPP9JtWgG3qxIAMJl3jAw1AXMxuEu9QqQft0UHUpUyrBTNXkZXtsN7JOkpzf9wpQDojarIAAAA=="
      },
      {
        "src": "/projects/study-room-interior/img-08.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Study Room Interior Model view 8",
        "avifSrcSet": "/projects/study-room-interior/img-08-480.avif 480w, /projects/study-room-interior/img-08-960.avif 960w",
        "webpSrcSet": "/projects/study-room-interior/img-08-480.webp 480w, /projects/study-room-interior/img-08-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAQBACdASoPABQAPxl2slEspySisAgBkCMJZgCw7BuwrIs1JjXBMKPw8AD8XR3KykBI6nSelXjeI1DRmY6kC5mkx+E5ublV1ssE0YULPbBN2ZActpThsUBGmihOEgr5dUNPiflkpHM7NRMAAAA="
      },
      {
        "src": "/projects/study-room-interior/img-09.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Study Room Interior Model view 9",
        "avifSrcSet": "/projects/study-room-interior/img-09-480.avif 480w, /projects/study-room-interior/img-09-960.avif 960w",
        "webpSrcSet": "/projects/study-room-interior/img-09-480.webp 480w, /projects/study-room-interior/img-09-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAADwAwCdASoPABQAPxl0sVCspqSisAgBkCMJYgC7ACLJAm8IT0G6q4iwAM3vnfYO4RvTqpWS0ih5lkhSjZ3JAgFPV1q+lVzjQ1nWCW/ot+WxpZiZ6X0kHTklNYop6o+J27PjL+PvP9ehuZ7GP5LGWi3ZLb5YF2N0PzDHTfjKU3lBS6kaAAA="
      }
    ],
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
    "images": [
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-01.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Leaning Tower of Pisa Model view 1",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-01-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-01-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-01-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADQAwCdASoPABQAPxl0slCspqSisAgBkCMJYgC7ABkK6yJMW0uxXAAA/qunI889w9wofxssjgltTht0knLc3SPge/MUbdrqIPXKQIsOkQ6GFd0JJYFv0GkzC3qhYqtkjk9AjongS9MbO86KYEVwN2468SwJ53txjXgYcAAA"
      },
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-02.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Leaning Tower of Pisa Model view 2",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-02-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-02-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-02-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAACwAwCdASoPABQAPxl2slCspySisAgBkCMJQAAH0eS1kVyG6od6AAD9NaOeTiDt/O3lK42BNCQm6kUj92Gjt3aIPxAucLW7AwnrkZfX8NBWyX0I4I+WrJtaaBPI/GQkwrrJr3mb/zbHImZZ5CBD38iULE8AAA=="
      },
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-03.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Leaning Tower of Pisa Model view 3",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-03-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-03-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-03-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACQAwCdASoPABQAPxl2slEspySisAgBkCMJQBYdgd5l6JqqBNwAAPb1TfwjUDc0oBSsKMQrk7Ri2l/DiXbyPYrd5mO8M0ZO+SlE1LQYgl/yWj6VNYAAAA=="
      },
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-04.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Leaning Tower of Pisa Model view 4",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-04-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-04-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-04-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACwAwCdASoPABQAPxl2slEspySisAgBkCMJYgCdABRvdzJc/q7ugAD9H8QV4l5wWznmNJmDk5HWRjzYMUt1j9Cu1hSsv1uyhSSOxEa3aBQmeZVtsDn4AA=="
      },
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-05.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Leaning Tower of Pisa Model view 5",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-05-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-05-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-05-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAACQAwCdASoPABQAPxl2sVCspySisAgBkCMJQBfnAph4Q18PtZXAALyG+zx694hPuWD7eDplKo1SrXU553fSyS2KGjZFLDLsjxLkFNoVih8o3xZ3gfDGkCAA"
      },
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-06.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Leaning Tower of Pisa Model view 6",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-06-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-06-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-06-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAAAQBACdASoPABQAPxl2slCspySisAgBkCMJaACdACFqxwc2q/W2+BBKoAD+5GIsEvf2Y8OAr5l8PqnPLdqbUtU0dhWDoLjEdP4o8mQ4XOvjS+Y/yJ3zJU5prDQ50K3aYFOekQrTyNK+rqOv+EQd+DDsAIAAAA=="
      },
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-07.jpg",
        "width": 1280,
        "height": 960,
        "alt": "Leaning Tower of Pisa Model view 7",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-07-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-07-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-07-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADQAwCdASoUAA8APxl0slCspqSisAgBkCMJbACdACP16/qRu8JxT0AA/t1qzj14hr7IauFmOb4j+k2In0IggeG/PU0kgpY8fbVZaBGHRLd1o7LXSwfR3TpOv766MXVWZCqJMdrszngdXkMAAAA="
      },
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-08.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Leaning Tower of Pisa Model view 8",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-08-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-08-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-08-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-08-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAwAwCdASoPABQAPxl0slCspqSisAgBkCMJQBdgBH/JH/dgAPRO7wpuUKzgLqdosf/2G9nuukUexCesg/kgVmuY4Y9GAYKHUXzM1tUvjWRci67HiAAAAA=="
      },
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-09.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Leaning Tower of Pisa Model view 9",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-09-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-09-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-09-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-09-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAQBACdASoPABQAPxl0sVCspqSisAgBkCMJZgCsMoADUuhusUTNm5Ur1AD0AjVICo2tVqXMwCAYtvCEC+OyY9TC2epOGh7KTfWYrLoZVZenSUaCK0mzOQcZjRFDc9hf1pqtUmEm9yfQKIcQHavIU+C/hAbicCZ28cq4DBEAAAA="
      },
      {
        "src": "/projects/leaning-tower-of-pisa-model/img-10.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Leaning Tower of Pisa Model view 10",
        "avifSrcSet": "/projects/leaning-tower-of-pisa-model/img-10-480.avif 480w, /projects/leaning-tower-of-pisa-model/img-10-960.avif 960w",
        "webpSrcSet": "/projects/leaning-tower-of-pisa-model/img-10-480.webp 480w, /projects/leaning-tower-of-pisa-model/img-10-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAAAQBACdASoPABQAPxl0sVCspqSisAgBkCMJbAC06Bu2drK8Es6ClD64HAD7AQ1OFch1c9yPEuLIb/CMik/Dtqk5f7Bm7daLyqm4spqACrQ7QjILThs6svnJ3bbp7N7pUPiww41BSCyTmgVGgHWs6GpMEXF3J8cmtfvrac7qzlLQAA=="
      }
    ],
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
    "images": [
      {
        "src": "/projects/qgis-ekiti-state-mapping/img-01.jpg",
        "width": 1280,
        "height": 905,
        "alt": "QGIS Environmental Mapping view 1",
        "avifSrcSet": "/projects/qgis-ekiti-state-mapping/img-01-480.avif 480w, /projects/qgis-ekiti-state-mapping/img-01-960.avif 960w",
        "webpSrcSet": "/projects/qgis-ekiti-state-mapping/img-01-480.webp 480w, /projects/qgis-ekiti-state-mapping/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACwAwCdASoUAA4APxl0slCspqSisAgBkCMJQBfnBDvtvuwlp/IEAAD+7VkIt1e7Gg0/F0eOsBxDztXhHyX4kN1xvjo4OO92+crarkxoGIM5AAAA"
      },
      {
        "src": "/projects/qgis-ekiti-state-mapping/img-02.jpg",
        "width": 1280,
        "height": 905,
        "alt": "QGIS Environmental Mapping view 2",
        "avifSrcSet": "/projects/qgis-ekiti-state-mapping/img-02-480.avif 480w, /projects/qgis-ekiti-state-mapping/img-02-960.avif 960w",
        "webpSrcSet": "/projects/qgis-ekiti-state-mapping/img-02-480.webp 480w, /projects/qgis-ekiti-state-mapping/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADwAwCdASoUAA4APxl0slCspqSisAgBkCMJQBfrCYhgalVEt/jWeVVAAP7tWQi3WBVnN6OxpiTVsQJx2ljtAdjjPlNUmgKT8r4fwPBtAW632agAAAA="
      },
      {
        "src": "/projects/qgis-ekiti-state-mapping/img-03.jpg",
        "width": 1280,
        "height": 905,
        "alt": "QGIS Environmental Mapping view 3",
        "avifSrcSet": "/projects/qgis-ekiti-state-mapping/img-03-480.avif 480w, /projects/qgis-ekiti-state-mapping/img-03-960.avif 960w",
        "webpSrcSet": "/projects/qgis-ekiti-state-mapping/img-03-480.webp 480w, /projects/qgis-ekiti-state-mapping/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADQAwCdASoUAA4APxl2sVCspySisAgBkCMJQBfnBDvuH1C2Lv8piEgA/u1ZCLdXux4E/0+LuH78oTt7MowWraujvbS8eEC1xVoDX+tdSvsUoywAAAA="
      },
      {
        "src": "/projects/qgis-ekiti-state-mapping/img-04.jpg",
        "width": 1280,
        "height": 905,
        "alt": "QGIS Environmental Mapping view 4",
        "avifSrcSet": "/projects/qgis-ekiti-state-mapping/img-04-480.avif 480w, /projects/qgis-ekiti-state-mapping/img-04-960.avif 960w",
        "webpSrcSet": "/projects/qgis-ekiti-state-mapping/img-04-480.webp 480w, /projects/qgis-ekiti-state-mapping/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACwAwCdASoUAA4APxl2slEspySisAgBkCMJQAALfUr6eoyP9zn9AAD+7VkIngBoNDLckl8IcfLzl7vj2bZ2rEKtIyWZSlYslypX5dyu8goAAA=="
      },
      {
        "src": "/projects/qgis-ekiti-state-mapping/img-05.jpg",
        "width": 1280,
        "height": 905,
        "alt": "QGIS Environmental Mapping view 5",
        "avifSrcSet": "/projects/qgis-ekiti-state-mapping/img-05-480.avif 480w, /projects/qgis-ekiti-state-mapping/img-05-960.avif 960w",
        "webpSrcSet": "/projects/qgis-ekiti-state-mapping/img-05-480.webp 480w, /projects/qgis-ekiti-state-mapping/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAABwAwCdASoUAA4APxl0slCspqSisAgBkCMJZgAAQSPQ9tAF/1AA/u1f2pe2rbX1jI0w2kAeiXSn/AAYLMklyvEWZX9Fc/bw8xA2QsycABPxJD1s6YGnWvoL/svUHd4wAAA="
      },
      {
        "src": "/projects/qgis-ekiti-state-mapping/img-06.jpg",
        "width": 1280,
        "height": 905,
        "alt": "QGIS Environmental Mapping view 6",
        "avifSrcSet": "/projects/qgis-ekiti-state-mapping/img-06-480.avif 480w, /projects/qgis-ekiti-state-mapping/img-06-960.avif 960w",
        "webpSrcSet": "/projects/qgis-ekiti-state-mapping/img-06-480.webp 480w, /projects/qgis-ekiti-state-mapping/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoUAA4APxl2sVCspySisAgBkCMJQAALfT4Kd9CaBmwAAP7tWQieA7X3HLtBG7QyR7Y8jKlA+b8xm16g4z5TZ3Wy9MhgSxMMozCaNwAA"
      },
      {
        "src": "/projects/qgis-ekiti-state-mapping/img-07.jpg",
        "width": 1280,
        "height": 905,
        "alt": "QGIS Environmental Mapping view 7",
        "avifSrcSet": "/projects/qgis-ekiti-state-mapping/img-07-480.avif 480w, /projects/qgis-ekiti-state-mapping/img-07-960.avif 960w",
        "webpSrcSet": "/projects/qgis-ekiti-state-mapping/img-07-480.webp 480w, /projects/qgis-ekiti-state-mapping/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAACQAwCdASoUAA4APxl2slEspySisAgBkCMJZQAAVJkCTGfDnOYAAP7tX9rJHNLmdgSmo/bhC83KYlhpqst/U3gLt0h/Cg3nrc6F72gnJUyAY/nEAAA="
      },
      {
        "src": "/projects/qgis-ekiti-state-mapping/img-08.jpg",
        "width": 1280,
        "height": 905,
        "alt": "QGIS Environmental Mapping view 8",
        "avifSrcSet": "/projects/qgis-ekiti-state-mapping/img-08-480.avif 480w, /projects/qgis-ekiti-state-mapping/img-08-960.avif 960w",
        "webpSrcSet": "/projects/qgis-ekiti-state-mapping/img-08-480.webp 480w, /projects/qgis-ekiti-state-mapping/img-08-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoUAA4APxl0sVCspqSisAgBkCMJYwAAUp/zwq6iAtWAAP7tYOpRvDlbGzumsQnlNke1CF/cR6O6g4qXfR2M/60trb64YWsnUwNdiEAA"
      }
    ],
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
    "images": [
      {
        "src": "/projects/3-bed-residential-project/img-01.jpg",
        "width": 800,
        "height": 600,
        "alt": "3 Bedroom Residential Project view 1",
        "avifSrcSet": "/projects/3-bed-residential-project/img-01-480.avif 480w, /projects/3-bed-residential-project/img-01-960.avif 960w",
        "webpSrcSet": "/projects/3-bed-residential-project/img-01-480.webp 480w, /projects/3-bed-residential-project/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAADQAwCdASoUAA8APxl0sVCspqSisAgBkCMJZQC2yBVTUWZamm6S1awA9prd34rz1omlHKBYKcFqnY79rXcqudhittTrQ1wEYUGFoMnbuyJyM2goLY7K2+SVbjSJH2k38q9WGgdGddYEJ1cjPxfU3vfKJzi3AAAA"
      },
      {
        "src": "/projects/3-bed-residential-project/img-02.jpg",
        "width": 600,
        "height": 800,
        "alt": "3 Bedroom Residential Project view 2",
        "avifSrcSet": "/projects/3-bed-residential-project/img-02-480.avif 480w, /projects/3-bed-residential-project/img-02-960.avif 960w",
        "webpSrcSet": "/projects/3-bed-residential-project/img-02-480.webp 480w, /projects/3-bed-residential-project/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABQBACdASoPABQAPxl0slCspqSisAgBkCMJYwDKACICR3eZwsSIIti10iaAAPqconBsH8vfOmlQldGd8N7eCoSYhT/RmM16zJ98oyvbtel+d7HIDKVQeU3DNnM0Gh4w70OEdpWSuW5FKr6z1AA="
      },
      {
        "src": "/projects/3-bed-residential-project/img-03.jpg",
        "width": 800,
        "height": 600,
        "alt": "3 Bedroom Residential Project view 3",
        "avifSrcSet": "/projects/3-bed-residential-project/img-03-480.avif 480w, /projects/3-bed-residential-project/img-03-960.avif 960w",
        "webpSrcSet": "/projects/3-bed-residential-project/img-03-480.webp 480w, /projects/3-bed-residential-project/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAABQBACdASoUAA8APxl0slEspqSisAgBkCMJYwDCgy6pRk403+QsTHvIUfZwAP5Yb+GYVXLKMWZceww++CzY768HTVk+OlVSQeRSg/OPv2h0EmLO7+zm0OzD8K6mmMe0gYU8rS76uv4BSfxxjZGXruT4up8WtUIjoS61v/4A"
      },
      {
        "src": "/projects/3-bed-residential-project/img-04.jpg",
        "width": 800,
        "height": 600,
        "alt": "3 Bedroom Residential Project view 4",
        "avifSrcSet": "/projects/3-bed-residential-project/img-04-480.avif 480w, /projects/3-bed-residential-project/img-04-960.avif 960w",
        "webpSrcSet": "/projects/3-bed-residential-project/img-04-480.webp 480w, /projects/3-bed-residential-project/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAABQAwCdASoUAA8APxl0slCspqSisAgBkCMJZwAAH6wPKLb7AAD97YhPm7sRXjkwtY1qLBgAMc9P8q8+obdY5imdUJmiLTCnewTSh5NEp0uPjVEVGtdH74u5DJ+1rpvrJgF1QNG8KRyslpOsmvzpC9DqH4AAAA=="
      },
      {
        "src": "/projects/3-bed-residential-project/img-05.jpg",
        "width": 1280,
        "height": 960,
        "alt": "3 Bedroom Residential Project view 5",
        "avifSrcSet": "/projects/3-bed-residential-project/img-05-480.avif 480w, /projects/3-bed-residential-project/img-05-960.avif 960w",
        "webpSrcSet": "/projects/3-bed-residential-project/img-05-480.webp 480w, /projects/3-bed-residential-project/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAABwAwCdASoUAA8APxl0sVCspqSisAgBkCMJaQAADfVZQjQKOOAA0+we8kBPunvX895AZ1nLfkJLFJLeoDHCAAAA"
      }
    ],
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
    "images": [
      {
        "src": "/projects/shades-and-shadows/img-01.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Shades & Shadows Study view 1",
        "avifSrcSet": "/projects/shades-and-shadows/img-01-480.avif 480w, /projects/shades-and-shadows/img-01-960.avif 960w",
        "webpSrcSet": "/projects/shades-and-shadows/img-01-480.webp 480w, /projects/shades-and-shadows/img-01-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAACwAwCdASoPABQAPxl0sVCspqSisAgBkCMJQBOmUABYuyapIN4gAAD+ubcoBe7A8YMpEF9rSMcVsWc69LBQg5IY7Iyj8YJbwuwRESjO5Txas2aOl61lYAAA"
      },
      {
        "src": "/projects/shades-and-shadows/img-02.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Shades & Shadows Study view 2",
        "avifSrcSet": "/projects/shades-and-shadows/img-02-480.avif 480w, /projects/shades-and-shadows/img-02-960.avif 960w",
        "webpSrcSet": "/projects/shades-and-shadows/img-02-480.webp 480w, /projects/shades-and-shadows/img-02-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAAAQBACdASoPABQAPxl0slCspqSisAgBkCMJQBOmUABldSwzJwAoha4bgAD9b6I+5koSUJrkiYORjxRT9svkSWncO+ol5u1/z3vGBsfUrqWHACAA"
      },
      {
        "src": "/projects/shades-and-shadows/img-03.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Shades & Shadows Study view 3",
        "avifSrcSet": "/projects/shades-and-shadows/img-03-480.avif 480w, /projects/shades-and-shadows/img-03-960.avif 960w",
        "webpSrcSet": "/projects/shades-and-shadows/img-03-480.webp 480w, /projects/shades-and-shadows/img-03-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADwAwCdASoPABQAPxl4slEspySisAgBkCMJYwC7ACHf3KCMDAtt1MiAAP7YxRYmDzSC+8BMJjoyCcKALLvs4WWEj25psUMSEW2hm1J03FixLRqUAAA="
      },
      {
        "src": "/projects/shades-and-shadows/img-04.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Shades & Shadows Study view 4",
        "avifSrcSet": "/projects/shades-and-shadows/img-04-480.avif 480w, /projects/shades-and-shadows/img-04-960.avif 960w",
        "webpSrcSet": "/projects/shades-and-shadows/img-04-480.webp 480w, /projects/shades-and-shadows/img-04-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAQBACdASoPABQAPxl0sVCspqSisAgBkCMJYgCdACE9mnP13qApVaMcYAD+6+T8WvdxX35wcm5rZAooyKNRJbpHJ1dzBQJUQBQAOK3E4zIFMyMSxWU1+m4j0fso4sEEqVBtXYaHK0h4+kt8FqsQJAAA"
      },
      {
        "src": "/projects/shades-and-shadows/img-05.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Shades & Shadows Study view 5",
        "avifSrcSet": "/projects/shades-and-shadows/img-05-480.avif 480w, /projects/shades-and-shadows/img-05-960.avif 960w",
        "webpSrcSet": "/projects/shades-and-shadows/img-05-480.webp 480w, /projects/shades-and-shadows/img-05-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAADQAwCdASoPABQAPxl2slCspySisAgBkCMJZQCw7CIAN0FV5eWHxrAA/u6Jux6hqvVSvx92senRHjOHaV0ezC1TLljFlNpTRanA3aWiHxv0COe+UQeRmpCrth3sYS6sJZDUUQ3AE7iPQAgT3soNFfgIAAA="
      },
      {
        "src": "/projects/shades-and-shadows/img-06.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Shades & Shadows Study view 6",
        "avifSrcSet": "/projects/shades-and-shadows/img-06-480.avif 480w, /projects/shades-and-shadows/img-06-960.avif 960w",
        "webpSrcSet": "/projects/shades-and-shadows/img-06-480.webp 480w, /projects/shades-and-shadows/img-06-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAQBACdASoPABQAPxl2slEspySisAgBkCMJZQDCgCFgPPi4QISxedfY0AD+7EqASEamEXRCJOwXane3JLTMt2pAv0NeVOYbM238u0Rrs8vnvMsco0UwXHZ8hLoSDYGKenaElAxwAAA="
      },
      {
        "src": "/projects/shades-and-shadows/img-07.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Shades & Shadows Study view 7",
        "avifSrcSet": "/projects/shades-and-shadows/img-07-480.avif 480w, /projects/shades-and-shadows/img-07-960.avif 960w",
        "webpSrcSet": "/projects/shades-and-shadows/img-07-480.webp 480w, /projects/shades-and-shadows/img-07-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAADwAwCdASoPABQAPxl2s1EspySisAgBkCMJZQC7ACHhC07iTCBXCaYAAP7uh+S1UgBbIOrqPWgWPsSoQr03uaVEYGZAbf8RqWafQonM5pcQG4edBiCg3WYi9SfMEdHWboAlhGgif3TAkAAA"
      },
      {
        "src": "/projects/shades-and-shadows/img-08.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Shades & Shadows Study view 8",
        "avifSrcSet": "/projects/shades-and-shadows/img-08-480.avif 480w, /projects/shades-and-shadows/img-08-960.avif 960w",
        "webpSrcSet": "/projects/shades-and-shadows/img-08-480.webp 480w, /projects/shades-and-shadows/img-08-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADQAwCdASoPABQAPxl0slCspqSisAgBkCMJYwCo9CG5Z2Hk6EVeMWgA/u6TzNU6EmcBektyx0GrZCYhTNSFf2d+SSWQUG2tHkA7nXOiP3OWYZFLmk2r+qu6pxpk3rbnEgQmGHoZAT2k+HggMcLcRfcTuokAAA=="
      },
      {
        "src": "/projects/shades-and-shadows/img-09.jpg",
        "width": 960,
        "height": 1280,
        "alt": "Shades & Shadows Study view 9",
        "avifSrcSet": "/projects/shades-and-shadows/img-09-480.avif 480w, /projects/shades-and-shadows/img-09-960.avif 960w",
        "webpSrcSet": "/projects/shades-and-shadows/img-09-480.webp 480w, /projects/shades-and-shadows/img-09-960.webp 960w",
        "blurDataURL": "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAwBACdASoPABQAPxl0slEspqSisAgBkCMJZQCw7CILTc07Z/TAx9u48gAA/u6T0Ekds3v5EJDpWm89lUkGB77gZXkqAL57vftRuXnEvHJeeZ0535uP7x9WYoE6ak0E4jiPElY9WU30Ew3ZVhCZf4QPvshy7BBY+5qVTWAAAAA="
      }
    ],
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
