// Orbiting animations
const orbits = document.querySelectorAll('.orbit');

// Realistic speeds: inner planets are faster, outer are slower
const speeds = [8, 12, 16, 20, 40, 60, 80, 100]; // in seconds

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

// Starfield background
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
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
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
