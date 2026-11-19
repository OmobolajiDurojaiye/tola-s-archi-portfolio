/** Sun position helpers: one warm hue family; only lightness + a few degrees of warmth shift. */

type RGB = [number, number, number];

const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

// Dawn: cooler / desaturated tint of the family. Golden hour: warmest. Night: deepest.
const SKY_STOPS: [number, RGB][] = [
  [0, hex('#e9e5de')],
  [0.4, hex('#f5f1ea')],
  [0.62, hex('#e6c9a6')],
  [0.8, hex('#8f6f52')],
  [1, hex('#1c130e')],
];

export function skyColor(t: number): string {
  for (let i = 0; i < SKY_STOPS.length - 1; i++) {
    const [a, ca] = SKY_STOPS[i];
    const [b, cb] = SKY_STOPS[i + 1];
    if (t >= a && t <= b) {
      const k = (t - a) / (b - a);
      const c = ca.map((v, j) => Math.round(v + (cb[j] - v) * k));
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
  }
  return 'rgb(28, 19, 14)';
}

export const SUN_LABELS: { t: number; label: string }[] = [
  { t: 0, label: 'Dawn' },
  { t: 0.4, label: 'Noon' },
  { t: 0.62, label: 'Golden hour' },
  { t: 0.8, label: 'Dusk' },
  { t: 1, label: 'Night' },
];

export function sunLabel(t: number) {
  let best = SUN_LABELS[0];
  for (const l of SUN_LABELS) if (Math.abs(l.t - t) < Math.abs(best.t - t)) best = l;
  return best.label;
}

export const isDark = (t: number) => t > 0.74;
