/* ============================================
   ELNIE ANDROID ROOTING SERVICE
   Heavy Animation Upgrade — Premium JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ========== LOADER ==========
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }, 1800);
  });
  document.body.style.overflow = 'hidden';

  // ========== AOS (stronger) ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 50,
      mirror: false
    });
  }

  // ========== TYPED.JS ==========
  if (typeof Typed !== 'undefined' && document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: [
        'Professional Android<br>Rooting Service',
        'Bootloader Unlock<br>& Magisk Setup',
        'Custom ROM & GSI<br>Installation',
        'Unbrick & Recovery<br>Specialists'
      ],
      typeSpeed: 42,
      backSpeed: 22,
      backDelay: 2400,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      contentType: 'html'
    });
  }

  // ========== PARTICLES (heavier & interactive) ==========
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 85, density: { enable: true, value_area: 800 } },
        color: { value: '#00FF66' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.35,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.08, sync: false }
        },
        size: {
          value: 2.8,
          random: true,
          anim: { enable: true, speed: 2.5, size_min: 0.4, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00FF66',
          opacity: 0.18,
          width: 1.1
        },
        move: {
          enable: true,
          speed: 1.6,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.45 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  // ========== NAVBAR + SCROLL PROGRESS ==========
  const navbar = document.getElementById('mainNav');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (navbar) {
      if (scrollY > 40) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    if (scrollProgress) scrollProgress.style.width = progress + '%';

    if (backToTop) {
      if (scrollY > 350) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }

    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 130) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== CURSOR GLOW (smooth follow) ==========
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });
    (function lerpCursor() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursorGlow.style.left = cx + 'px';
      cursorGlow.style.top = cy + 'px';
      requestAnimationFrame(lerpCursor);
    })();
  }

  // ========== ANIMATED COUNTERS ==========
  const counters = document.querySelectorAll('.stat-number');
  let counted = false;

  function animateCounters() {
    if (counted) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      counted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'), 10) || 0;
        const duration = 2200;
        const start = performance.now();
        function update(now) {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          counter.textContent = Math.floor(ease * target);
          if (t < 1) requestAnimationFrame(update);
          else counter.textContent = target;
        }
        requestAnimationFrame(update);
      });
    }
  }
  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  // ========== COMPATIBILITY FORM ==========
  const compatForm = document.getElementById('compatForm');
  const compatResult = document.getElementById('compatResult');
  const resultText = document.getElementById('resultText');

  if (compatForm) {
    compatForm.addEventListener('submit', e => {
      e.preventDefault();
      const brand = document.getElementById('brand').value;
      const model = document.getElementById('model').value.trim();
      const android = document.getElementById('android').value;
      const service = document.getElementById('service').value;

      const restricted = ['OPPO', 'Vivo', 'Huawei', 'Honor'];
      let message = '';
      if (restricted.includes(brand) && /Root|Bootloader|Custom ROM|GSI/i.test(service)) {
        message = '<strong>' + brand + ' ' + model + '</strong> (' + android + ') — Bootloader unlock and root are often restricted on this brand. Many models have locked bootloaders with no public unlock method. We can still check your exact model. Please message us on WhatsApp with your full model number and build number for a free assessment.';
      } else if (/Unbrick|Bootloop/i.test(service)) {
        message = '<strong>' + brand + ' ' + model + '</strong> (' + android + ') — Bootloop / unbrick recovery is available for most devices. Success depends on the exact condition. Please contact us on WhatsApp with photos of the error screen and model details so we can evaluate.';
      } else {
        message = '<strong>' + brand + ' ' + model + '</strong> (' + android + ') looking for <strong>' + service + '</strong> — This combination is generally supported. Please send us a WhatsApp message with your exact model number and current Android build so we can confirm compatibility and quote the final price.';
      }

      if (resultText) resultText.innerHTML = message;
      if (compatResult) {
        compatResult.classList.remove('d-none');
        compatResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const waLink = compatResult && compatResult.querySelector('a[href*="wa.me"]');
      if (waLink) {
        const text = encodeURIComponent(
          'Hi Elnie! Compatibility check:\nBrand: ' + brand + '\nModel: ' + model + '\nAndroid: ' + android + '\nService: ' + service + '\n\nPlease check if this is possible.'
        );
        waLink.href = 'https://wa.me/639948620084?text=' + text;
      }
      showToast('Compatibility check complete!');
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3000);
  }

  // ========== MOBILE NAV CLOSE ==========
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show') && typeof bootstrap !== 'undefined') {
        const bs = bootstrap.Collapse.getInstance(collapse);
        if (bs) bs.hide();
      }
    });
  });

  // ========== 3D TILT ON CARDS ==========
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.service-card, .pricing-card, .review-card, .donate-card, .why-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var midX = rect.width / 2;
        var midY = rect.height / 2;
        var rotateX = ((y - midY) / midY) * -6;
        var rotateY = ((x - midX) / midX) * 6;
        card.style.transform = 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // ========== MAGNETIC BUTTONS ==========
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn-neon, .btn-outline-neon').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.12) + 'px, ' + (y * 0.12) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  // ========== RIPPLE ON CLICK ==========
  document.querySelectorAll('.btn-neon, .btn-outline-neon, .whatsapp-hero-card').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var ripple = document.createElement('span');
      ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(0,255,102,0.35);width:20px;height:20px;pointer-events:none;transform:scale(0);animation:ripple-anim 0.6s ease-out;z-index:10;';
      var rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left - 10) + 'px';
      ripple.style.top = (e.clientY - rect.top - 10) + 'px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);
    });
  });

  var style = document.createElement('style');
  style.textContent = '@keyframes ripple-anim { to { transform: scale(18); opacity: 0; } }';
  document.head.appendChild(style);

  console.log('%c⚡ ELNIE ANDROID ROOTING SERVICE', 'color:#00FF66;font-size:16px;font-weight:bold;');
  console.log('%cHeavy animations loaded • WhatsApp: 0994 862 0084', 'color:#BFBFBF;font-size:11px;');
});
