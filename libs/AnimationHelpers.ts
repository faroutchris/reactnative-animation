export function clamp(number: number, min: number, max: number): number {
  "worklet";
  return Math.max(min, Math.min(number, max));
}
