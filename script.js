// GSAP animation for orbiting planets
const orbits = document.querySelectorAll('.orbit');

const speeds = [8, 12, 20, 30]; // seconds per full rotation

orbits.forEach((orbit, i) => {
  gsap.to(orbit, {
    rotation: 360,
    duration: speeds[i],
    repeat: -1,
    ease: 'linear',
    transformOrigin: '50% 50%',
  });
});
