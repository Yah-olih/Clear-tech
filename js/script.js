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

document.addEventListener('click', (event) => {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.querySelector('.hamburger');

  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  }
});

window.addEventListener('scroll', () => {
  closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

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

const whatsappNumber = "5511985297730";

document.querySelectorAll(".service-card").forEach(card => {
  // Adiciona estilo de ponteiro do mouse para indicar que o card é clicável
  card.style.cursor = "pointer";

  card.addEventListener("click", event => {
    // Procura o link do WhatsApp dentro do card para pegar o nome do serviço
    const serviceLink = card.querySelector(".whatsapp-service");
    const service = serviceLink ? serviceLink.dataset.service : "serviço";

    const message = `Olá! Gostaria de solicitar um orçamento para ${service}.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  });
});