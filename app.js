(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const links = Array.from(document.querySelectorAll('.nav-link'));
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
    }));
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
      });
    }, {rootMargin:'-20% 0px -62% 0px', threshold:0});
    ['inicio','nosotros','servicios','proyectos','contacto'].forEach(id => {
      const section = document.getElementById(id); if (section) observer.observe(section);
    });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.namedItem('nombre');
    const email = form.elements.namedItem('email');
    const service = form.elements.namedItem('servicio');
    const message = form.elements.namedItem('mensaje');
    const valid = name.value.trim() && email.validity.valid && email.value.trim() && service.value && message.value.trim();
    if (!valid) {
      status.className = 'form-status error';
      status.textContent = 'Completa todos los campos con un correo válido para probar el formulario.';
      return;
    }
    status.className = 'form-status success';
    status.textContent = '¡Demostración completada! El formulario funciona visualmente, pero no envió ni almacenó ningún dato.';
    form.reset();
  });
})();