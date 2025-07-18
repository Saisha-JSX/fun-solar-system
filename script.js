// =====================
// Orbiting Animations
// =====================
const orbits = document.querySelectorAll('.orbit');
const speeds = [8, 12, 16, 20, 40, 60, 80, 100];

orbits.forEach((orbit, i) => {
  const initialRotation = Math.random() * 360;

  gsap.set(orbit, {
    rotation: initialRotation,
    transformOrigin: '50% 50%',
  });

  gsap.to(orbit, {
    rotation: initialRotation + 360,
    duration: speeds[i],
    repeat: -1,
    ease: 'linear',
    transformOrigin: '50% 50%',
  });
});


// Animate each planet orbiting around the sun
document.querySelectorAll(".orbit").forEach((orbit, index) => {
  const planet = orbit.querySelector(".planet");

  const duration = 5 + index * 4; // Inner planets orbit faster

  gsap.to(planet, {
    rotation: 360,
    duration: duration,
    repeat: -1,
    ease: "none",
    transformOrigin: "0 50%"
  });
});


// =====================
// Starfield Background
// =====================
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 200;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.2 + 0.3;
    this.alpha = Math.random();
    this.alphaChange = Math.random() * 0.02 + 0.005;
    this.increasing = Math.random() > 0.5;
    this.userAlpha = 1;
  }

  draw() {
    const finalAlpha = this.alpha * this.userAlpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`;
    ctx.fill();
  }

  update() {
    if (this.increasing) {
      this.alpha += this.alphaChange;
      if (this.alpha >= 1) {
        this.alpha = 1;
        this.increasing = false;
      }
    } else {
      this.alpha -= this.alphaChange;
      if (this.alpha <= 0.1) {
        this.alpha = 0.1;
        this.increasing = true;
      }
    }
  }
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star());
  }
}
createStars();

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// =======================
// Zoom Logic
// =======================
const universe = document.querySelector('.universe');
let scale = 1;

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  const zoomFactor = 0.1;
  const direction = e.deltaY > 0 ? -1 : 1;
  const newScale = scale + direction * zoomFactor;
  scale = Math.min(Math.max(newScale, 0.2), 5);
  updateTransform();
}, { passive: false });

function updateTransform() {
  universe.style.transform = `scale(${scale})`;

  // Planet + Orbit fade logic
 const planetThresholds = [1.4, 1.2, 1.0, 0.8, 0.6, 0.5, 0.4, 0.3];
  const planets = document.querySelectorAll('.planet');
  const orbits = document.querySelectorAll('.orbit');

  planets.forEach((planet, i) => {
    const visible = scale >= planetThresholds[i] ? '1' : '0';
    planet.style.opacity = visible;
    orbits[i].style.opacity = visible;
  });

  // Stars fade out as you zoom out
  const starAlpha = Math.max(0, Math.min(1, (scale - 0.2) / 0.8));
  stars.forEach(star => star.userAlpha = starAlpha);

  // Galaxy opacity (optional)
  const galaxyOpacity = 1 - starAlpha;
  document.body.style.setProperty('--galaxy-opacity', galaxyOpacity);
}

updateTransform();
