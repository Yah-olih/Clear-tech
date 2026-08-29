// MENU MOBILE Clean TECH
function toggleMenu(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('icon-open');
  const closeIcon = document.getElementById('icon-close');

  if (!menu || !openIcon || !closeIcon) return;

  const isOpen = menu.classList.toggle('open');
  openIcon.style.display = isOpen ? 'none' : 'block';
  closeIcon.style.display = isOpen ? 'block' : 'none';
}

function closeMenu() {
  const menu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('icon-open');
  const closeIcon = document.getElementById('icon-close');

  if (!menu || !openIcon || !closeIcon) return;

  menu.classList.remove('open');
  openIcon.style.display = 'block';
  closeIcon.style.display = 'none';
}

// Fechar o menu mobile quando o usuário toca/clica em QUALQUER lugar fora do menu
document.addEventListener('click', (event) => {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.querySelector('.hamburger');

  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  }
});

// Fechar o menu mobile imediatamente quando o usuário começa a rolar/escrolar a tela
window.addEventListener('scroll', () => {
  closeMenu();
});

// Fechar o menu mobile com a tecla Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// SCROLL REVEAL (INTERSECTION OBSERVER)
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
});

// ROLAR PARA O TOPO (INÍCIO / LOGO)
document.addEventListener('DOMContentLoaded', () => {
  const linksInicio = document.querySelectorAll('a[href="#inicio"]');

  linksInicio.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      closeMenu();
    });
  });
});

let startY = 0;
let currentY = 0;
let isPulling = false;

window.addEventListener('touchstart', (e) => {

  if (window.scrollY === 0) {
    startY = e.touches[0].clientY;
    isPulling = true;
  }
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  if (!isPulling) return;
  currentY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', () => {
  if (!isPulling) return;

  if (currentY - startY > 120 && window.scrollY === 0) {
    window.location.reload(); // Atualiza a página
  }

  isPulling = false;
  startY = 0;
  currentY = 0;
});