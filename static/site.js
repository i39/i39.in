/* Безопасное переключение темы, в том числе для Safari в приватном режиме. */
(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      try {
        window.localStorage.setItem('theme', nextTheme);
      } catch (error) {
        /* В Safari private browsing localStorage может быть недоступен. */
      }
    });
  }

  var slides = document.querySelectorAll('.hero__slide');
  var dots = document.querySelectorAll('.hero__dot');
  var activeSlide = 0;
  function showSlide(index) {
    var i;
    activeSlide = index;
    for (i = 0; i < slides.length; i++) {
      /* Второй аргумент classList.toggle не поддерживается в старых Safari. */
      if (i === index) {
        slides[i].classList.add('is-active');
        dots[i].classList.add('is-active');
      } else {
        slides[i].classList.remove('is-active');
        dots[i].classList.remove('is-active');
      }
    }
  }
  for (var dotIndex = 0; dotIndex < dots.length; dotIndex++) {
    (function (index) {
      dots[index].addEventListener('click', function () { showSlide(index); });
    }(dotIndex));
  }
  if (slides.length > 1) {
    window.setInterval(function () { showSlide((activeSlide + 1) % slides.length); }, 5500);
  }

  var form = document.getElementById('contact-form');
  var localHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (form && localHost) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var message = document.getElementById('form-message');
      if (!form.elements.phone.value.trim() && !form.elements.email.value.trim()) {
        message.textContent = 'Укажите телефон или e-mail.';
        return;
      }
      message.textContent = 'Спасибо! Ваше сообщение принято.';
      form.reset();
    });
  }
}());
