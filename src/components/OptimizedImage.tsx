import { useState } from 'react';
import type { ProjectImage } from '../data/projects';

interface OptimizedImageProps {
  image: ProjectImage;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({
  image,
  sizes = '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw',
  className = 'w-full h-full object-cover',
  priority = false,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={
        image.blurDataURL && !loaded
          ? {
              backgroundImage: `url(${image.blurDataURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <picture>
        {image.avifSrcSet && (
          <source type="image/avif" srcSet={image.avifSrcSet} sizes={sizes} />
        )}
        {image.webpSrcSet && (
          <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} />
        )}
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setLoaded(true)}
          className={`${className} transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </picture>
    </div>
  );
}
