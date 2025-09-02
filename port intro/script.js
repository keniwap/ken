// Set current year in footer
(function setYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
})();

// Smooth-scroll offset fix for in-page anchors on browsers that jump before CSS applies
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', targetId);
  });
});

// Active menu highlighting on scroll
(function enableActiveMenuHighlighting() {
  const links = Array.from(document.querySelectorAll('.menu a'));
  const sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        links.forEach(function (l) { l.removeAttribute('aria-current'); });
        const active = links.find(function (l) { return l.getAttribute('href') === id; });
        if (active) active.setAttribute('aria-current', 'page');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

  sections.forEach(function (sec) { observer.observe(sec); });
})();


