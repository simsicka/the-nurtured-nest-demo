const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const pageRegions = [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.announcement')];
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
  pageRegions.forEach(region => { region.inert = false; });
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  pageRegions.forEach(region => { region.inert = open; });
  if (open) {
    navigation.style.setProperty('--menu-top', `${navigation.getBoundingClientRect().top}px`);
  }
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Tab' && navigation.classList.contains('open')) {
    const controls = [document.querySelector('.brand'), toggle, ...navigation.querySelectorAll('a')];
    if (event.shiftKey && document.activeElement === controls[0]) {
      event.preventDefault();
      controls.at(-1).focus();
    } else if (!event.shiftKey && document.activeElement === controls.at(-1)) {
      event.preventDefault();
      controls[0].focus();
    }
  }
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width: 1201px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
document.querySelector('#year').textContent = new Date().getFullYear();


