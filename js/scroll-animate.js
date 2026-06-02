/**
 * Home page scroll-in animations for service topic sections.
 * Loaded on index.html only.
 */

// Reveal elements when they enter the viewport (once per element)
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
);

document.querySelectorAll('.hidden-left, .hidden-right').forEach((el) => {
    observer.observe(el);
});
