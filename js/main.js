document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ──────────────────────────────────────────────
  // 1. Mobile hamburger menu
  // ──────────────────────────────────────────────
  var burgerBtn = document.getElementById('burger-btn');
  var mainNav = document.getElementById('main-nav');

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('header__nav--open');
      burgerBtn.classList.toggle('header__burger--active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('header__nav--open');
        burgerBtn.classList.remove('header__burger--active');
        document.body.style.overflow = '';
      });
    });
  }

  // ──────────────────────────────────────────────
  // 2. Tab switching
  // ──────────────────────────────────────────────
  var tabButtons = document.querySelectorAll('[data-tab]');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');

      tabButtons.forEach(function (b) {
        b.classList.remove('products__tab--active');
      });
      btn.classList.add('products__tab--active');

      document.querySelectorAll('.products__tab-content').forEach(function (panel) {
        panel.classList.add('products__tab-content--hidden');
      });

      var activePanel = document.getElementById('tab-' + target);
      if (activePanel) {
        activePanel.classList.remove('products__tab-content--hidden');
      }
    });
  });

  // ──────────────────────────────────────────────
  // 3. Swiper carousel initialization
  // ──────────────────────────────────────────────
  var swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 }
    }
  };

  if (typeof Swiper !== 'undefined') {
    new Swiper('.products-swiper-popular', Object.assign({}, swiperConfig, {
      navigation: {
        nextEl: '.products-swiper-popular .swiper-button-next',
        prevEl: '.products-swiper-popular .swiper-button-prev'
      }
    }));

    new Swiper('.products-swiper-discounts', Object.assign({}, swiperConfig, {
      navigation: {
        nextEl: '.products-swiper-discounts .swiper-button-next',
        prevEl: '.products-swiper-discounts .swiper-button-prev'
      }
    }));

    new Swiper('.new-arrivals-swiper', Object.assign({}, swiperConfig, {
      navigation: {
        nextEl: '.new-arrivals-swiper .swiper-button-next',
        prevEl: '.new-arrivals-swiper .swiper-button-prev'
      }
    }));
  }

  // ──────────────────────────────────────────────
  // 4. Form validation
  // ──────────────────────────────────────────────
  var form = document.querySelector('.consultation__form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var honeypot = form.querySelector('[name="website"]');
      if (honeypot && honeypot.value) return;

      var isValid = true;
      var phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;

      // Clear previous errors
      form.querySelectorAll('.form__group--error').forEach(function (g) {
        g.classList.remove('form__group--error');
        var msg = g.querySelector('.form__error');
        if (msg) msg.remove();
      });

      function showError(input, message) {
        var group = input.closest('.form__group');
        if (!group) return;
        group.classList.add('form__group--error');
        var span = document.createElement('span');
        span.className = 'form__error';
        span.textContent = message;
        group.appendChild(span);
        isValid = false;
      }

      var nameInput = form.querySelector('[name="name"]');
      var phoneInput = form.querySelector('[name="phone"]');
      var messageInput = form.querySelector('[name="message"]');
      var privacyInput = form.querySelector('[name="privacy"]');

      if (nameInput && !nameInput.value.trim()) {
        showError(nameInput, 'Введите ваше имя');
      }

      if (phoneInput) {
        if (!phoneInput.value.trim()) {
          showError(phoneInput, 'Введите номер телефона');
        } else if (!phoneRegex.test(phoneInput.value.trim())) {
          showError(phoneInput, 'Введите корректный номер телефона');
        }
      }

      if (messageInput && !messageInput.value.trim()) {
        showError(messageInput, 'Введите ваш вопрос');
      }

      if (privacyInput && !privacyInput.checked) {
        showError(privacyInput, 'Необходимо принять политику конфиденциальности');
      }

      if (isValid) {
        form.style.display = 'none';
        var successMsg = document.createElement('div');
        successMsg.className = 'consultation__success';
        successMsg.innerHTML = '<p>Спасибо! Мы перезвоним вам в течение 15 минут.</p>';
        form.parentNode.insertBefore(successMsg, form.nextSibling);
      }
    });
  }

  // ──────────────────────────────────────────────
  // 5. Cookie banner
  // ──────────────────────────────────────────────
  var cookieBanner = document.getElementById('cookie-banner');
  var cookieAcceptBtn = document.getElementById('cookie-accept');

  if (cookieBanner) {
    if (localStorage.getItem('cookieAccepted')) {
      cookieBanner.style.display = 'none';
    } else {
      cookieBanner.style.display = '';
    }

    if (cookieAcceptBtn) {
      cookieAcceptBtn.addEventListener('click', function () {
        localStorage.setItem('cookieAccepted', 'true');
        cookieBanner.style.opacity = '0';
        cookieBanner.style.transition = 'opacity 0.4s ease';
        setTimeout(function () {
          cookieBanner.style.display = 'none';
        }, 400);
      });
    }
  }

  // ──────────────────────────────────────────────
  // 6. AOS initialization
  // ──────────────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }

  // ──────────────────────────────────────────────
  // 7. Smooth scroll for anchor links
  // ──────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
