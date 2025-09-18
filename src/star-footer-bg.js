// Animated star background for the footer
const STAR_COUNT = 160;
const STAR_COLORS = [
  '#A084E8', // main purple
  '#C084FC', // light purple
  '#8B5CF6', // accent
  '#fff',    // white
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createStar(canvas, ctx, width, height) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const r = randomBetween(0.7, 2.2);
  const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  const speed = randomBetween(0.08, 0.25);
  return { x, y, r, color, speed, twinkle: Math.random() };
}

function animateStars(canvas, ctx, stars) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    // Twinkle effect
    const alpha = 0.7 + 0.3 * Math.sin(Date.now() * 0.002 * star.twinkle + star.x);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = star.color;
    ctx.shadowColor = star.color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
    // Move star horizontally for subtle motion
    star.x += star.speed;
    if (star.x > canvas.width + 5) star.x = -5;
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(() => animateStars(canvas, ctx, stars));
}

export function setupFooterStars() {
  const footer = document.querySelector('footer.main-footer');
  if (!footer) return;
  let canvas = document.createElement('canvas');
  canvas.className = 'footer-star-bg';
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';
  footer.style.position = 'relative';
  footer.prepend(canvas);

  function resize() {
    canvas.width = footer.offsetWidth;
    canvas.height = footer.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const ctx = canvas.getContext('2d');
  let stars = Array.from({ length: STAR_COUNT }, () => createStar(canvas, ctx, canvas.width, canvas.height));
  animateStars(canvas, ctx, stars);
}

export function setupStarBackground(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  let canvas = document.createElement('canvas');
  canvas.className = 'star-bg-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';
  // Only set position: relative if not already positioned
  const computedStyle = window.getComputedStyle(target);
  if (computedStyle.position === 'static') {
    target.style.position = 'relative';
  }
  target.prepend(canvas);

  function resize() {
    canvas.width = target.offsetWidth;
    canvas.height = target.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const ctx = canvas.getContext('2d');
  let stars = Array.from({ length: STAR_COUNT }, () => createStar(canvas, ctx, canvas.width, canvas.height));
  animateStars(canvas, ctx, stars);
}

// Auto-run for footer only for backward compatibility
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    setupFooterStars();
    setupStarBackground('.custom--bg');
  });
}
