// Tiny client-side signal so hero sections know when the preloader
// has finished and the page is actually visible.

let revealed = false;
const EVENT = "app:reveal";

export function markAppRevealed() {
  if (revealed) return;
  revealed = true;
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function onAppReveal(cb: () => void): () => void {
  if (revealed) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(EVENT, handler, { once: true });
  return () => window.removeEventListener(EVENT, handler);
}

export function isAppRevealed() {
  return revealed;
}
