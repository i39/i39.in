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
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var message = document.getElementById('form-message');
      var button = form.querySelector('button[type="submit"]');
      var originalText = button.textContent;
      button.disabled = true;
      button.textContent = 'Отправка…';
      message.textContent = '';

      window.fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (!response.ok) { throw new Error('FormSubmit error'); }
        message.textContent = 'Спасибо! Ваше сообщение отправлено.';
        form.reset();
      }).catch(function () {
        message.textContent = 'Не удалось отправить форму. Позвоните нам или напишите на info@i39.in.';
      }).then(function () {
        button.disabled = false;
        button.textContent = originalText;
      });
    });
  }
}());
