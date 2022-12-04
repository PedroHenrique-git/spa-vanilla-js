export function execIfExists(fn: (() => void) | null | undefined) {
  if (!fn) return;

  fn();
}
