const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -25px 0px' });

document.querySelectorAll('.hidden-left, .hidden-right').forEach(el => {
    observer.observe(el);
});
