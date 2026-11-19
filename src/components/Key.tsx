import { useEffect, useRef, useState, type ReactNode, type PointerEvent as RPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { getPerfFlags, hapticTap } from '../lib/perf';

type KeyIcon = 'arrow' | 'download' | 'play' | 'none';

interface KeyProps {
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  icon?: KeyIcon;
  to?: string;
  href?: string;
  external?: boolean;
  /** CV mode: icon drops into tray, progress fill, then opens file */
  download?: boolean;
  onClick?: () => void;
  className?: string;
  viewTransition?: boolean;
  onBeforeNavigate?: () => void;
  ariaLabel?: string;
}

/** Arrow drawn as a dimension line with end ticks. */
function DimArrow() {
  return (
    <svg className="key-dim" width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
      <line className="dim-tick" x1="1" y1="2" x2="1" y2="10" stroke="currentColor" strokeWidth="1.4" />
      <line className="dim-line" x1="1" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.4" />
      <path className="dim-head" d="M15 2.5 L19.5 6 L15 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadGlyph() {
  return (
    <svg className="dl-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2 V10 M4.5 6.8 L8 10.3 L11.5 6.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 13.5 H13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4 2.5 L11 7 L4 11.5 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Signature "extruded key" button.
 * - 3D plate: top face + darker side face via layered box-shadow (no borders)
 * - Hover: lifts, side face grows, tone-600 fill expands from cursor entry point
 * - Label roll, dimension-line arrow draws in
 * - Magnetic lean within ~40px (desktop), label shifts more than body (parallax)
 * - Press: travels down into its base with spring + haptic
 */
export function Key({
  label,
  variant = 'primary',
  size = 'md',
  icon = 'arrow',
  to,
  href,
  external,
  download,
  onClick,
  className = '',
  viewTransition,
  onBeforeNavigate,
  ariaLabel,
}: KeyProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const keyRef = useRef<HTMLElement | null>(null);
  const [downloading, setDownloading] = useState(false);

  // Draw-in arrow once visible
  useEffect(() => {
    const t = window.setTimeout(() => keyRef.current?.classList.add('is-drawn'), 250);
    return () => window.clearTimeout(t);
  }, []);

  const onEnterFace = (e: RPointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--fx', `${e.clientX - r.left}px`);
    el.style.setProperty('--fy', `${e.clientY - r.top}px`);
  };

  // Magnetic zone: wrapper extends ~40px around the key
  const rectRef = useRef<DOMRect | null>(null);
  const onZoneEnter = () => {
    if (!getPerfFlags().finePointer || getPerfFlags().reducedMotion) return;
    rectRef.current = keyRef.current?.getBoundingClientRect() ?? null;
  };
  const onZoneMove = (e: RPointerEvent<HTMLSpanElement>) => {
    const r = rectRef.current;
    const k = keyRef.current;
    if (!r || !k) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    k.style.setProperty('--mx-key', `${(dx * 0.18).toFixed(1)}px`);
    k.style.setProperty('--my-key', `${(dy * 0.22).toFixed(1)}px`);
    k.style.setProperty('--lx', `${(dx * 0.08).toFixed(1)}px`);
    k.style.setProperty('--ly', `${(dy * 0.08).toFixed(1)}px`);
  };
  const onZoneLeave = () => {
    const k = keyRef.current;
    if (!k) return;
    rectRef.current = null;
    k.style.setProperty('--mx-key', '0px');
    k.style.setProperty('--my-key', '0px');
    k.style.setProperty('--lx', '0px');
    k.style.setProperty('--ly', '0px');
  };

  const handleClick = (e: React.MouseEvent) => {
    hapticTap(8);
    if (download && href) {
      e.preventDefault();
      if (downloading) return;
      setDownloading(true);
      window.setTimeout(() => {
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
        window.setTimeout(() => setDownloading(false), 400);
      }, 760);
      return;
    }
    onBeforeNavigate?.();
    onClick?.();
  };

  const classes = [
    'key',
    variant === 'secondary' ? 'key--secondary' : '',
    size === 'sm' ? 'key--sm' : '',
    downloading ? 'is-downloading' : '',
    className,
  ].join(' ');

  const inner = (
    <>
      <span className="key-fill" aria-hidden="true" />
      {icon === 'download' && <DownloadGlyph />}
      {icon === 'play' && <PlayGlyph />}
      <span className="key-label">
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
      {icon === 'arrow' && <DimArrow />}
      {download && <span className="key-progress" aria-hidden="true" />}
    </>
  );

  const common = {
    className: classes,
    onPointerEnter: onEnterFace,
    onClick: handleClick,
    'data-cursor': 'button',
    'aria-label': ariaLabel,
  };

  let el: ReactNode;
  if (to) {
    el = (
      <Link ref={(n) => { keyRef.current = n; }} to={to} viewTransition={viewTransition} {...common}>
        {inner}
      </Link>
    );
  } else if (href) {
    el = (
      <a
        ref={(n) => { keyRef.current = n; }}
        href={href}
        target={external || download ? '_blank' : undefined}
        rel={external || download ? 'noopener noreferrer' : undefined}
        {...common}
      >
        {inner}
      </a>
    );
  } else {
    el = (
      <button ref={(n) => { keyRef.current = n; }} type="button" {...common}>
        {inner}
      </button>
    );
  }

  return (
    <span
      ref={wrapRef}
      onPointerEnter={onZoneEnter}
      onPointerMove={onZoneMove}
      onPointerLeave={onZoneLeave}
      className="inline-flex p-[14px] -m-[14px] shrink-0"
    >
      {el}
    </span>
  );
}
