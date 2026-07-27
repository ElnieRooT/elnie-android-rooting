/* ============================================
   ELNIE ANDROID ROOTING SERVICE
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ========== LOADER ==========
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2000);
  });
  // Prevent scroll during load
  document.body.style.overflow = 'hidden';

  // ========== AOS INIT ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: window.innerWidth < 768 ? 'mobile' : false
    });
  }

  // ========== TYPED.JS ==========
  if (typeof Typed !== 'undefined') {
    new Typed('.typed-text', {
      strings: [
        'Professional Android<br>Rooting Service',
        'Bootloader Unlock<br>& Magisk Setup',
        'Custom ROM & GSI<br>Installation',
        'Unbrick & Recovery<br>Specialists'
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 2200,
      startDelay: 400,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      contentType: 'html'
    });
  }

  // ========== PARTICLES.JS ==========
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 900 } },
        color: { value: '#00FF66' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.25,
          random: true,
          anim: { enable: true, speed: 0.8, opacity_min: 0.05, sync: false }
        },
        size: {
          value: 2.5,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#00FF66',
          opacity: 0.12,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
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
          grab: { distance: 140, line_linked: { opacity: 0.35 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  // ========== NAVBAR SCROLL ==========
  const navbar = document.getElementById('mainNav');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Navbar
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Progress bar
    scrollProgress.style.width = progress + '%';

    // Back to top
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== CURSOR GLOW ==========
  const cursorGlow = document.getElementById('cursor-glow');
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // ========== ANIMATED COUNTERS ==========
  const counters = document.querySelectorAll('.stat-number');
  let counted = false;

  function animateCounters() {
    if (counted) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      counted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'), 10);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(ease * target);
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
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
    compatForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const brand = document.getElementById('brand').value;
      const model = document.getElementById('model').value.trim();
      const android = document.getElementById('android').value;
      const service = document.getElementById('service').value;

      // Simulated compatibility logic
      let message = '';
      let isLikely = true;

      // Brands known for harder unlocks
      const restricted = ['OPPO', 'Vivo', 'Huawei', 'Honor'];
      if (restricted.includes(brand) && (service.includes('Root') || service.includes('Bootloader') || service.includes('Custom ROM') || service.includes('GSI'))) {
        isLikely = false;
        message = `<strong>${brand} ${model}</strong> (${android}) — Bootloader unlock and root are often restricted on this brand. Many models have locked bootloaders with no public unlock method. We can still check your exact model. Please message us on WhatsApp with your full model number and build number for a free assessment.`;
      } else if (service.includes('Unbrick') || service.includes('Bootloop')) {
        message = `<strong>${brand} ${model}</strong> (${android}) — Bootloop / unbrick recovery is available for most devices. Success depends on the exact condition. Please contact us on WhatsApp with photos of the error screen and model details so we can evaluate.`;
      } else {
        message = `<strong>${brand} ${model}</strong> (${android}) looking for <strong>${service}</strong> — This combination is generally supported. Please send us a WhatsApp message with your exact model number and current Android build so we can confirm compatibility and quote the final price.`;
      }

      resultText.innerHTML = message;
      compatResult.classList.remove('d-none');
      compatResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Update WhatsApp link with pre-filled message
      const waLink = compatResult.querySelector('a[href*="wa.me"]');
      if (waLink) {
        const text = encodeURIComponent(
          `Hi Elnie! Compatibility check:\nBrand: ${brand}\nModel: ${model}\nAndroid: ${android}\nService: ${service}\n\nPlease check if this is possible.`
        );
        waLink.href = `https://wa.me/639948620084?text=${text}`;
      }

      showToast('Compatibility check complete!');
    });
  }

  // ========== TOAST ==========
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ========== SMOOTH NAV CLOSE ON MOBILE ==========
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // ========== SERVICE CARD TILT (subtle) ==========
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.service-card, .pricing-card, .review-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ========== CONSOLE EASTER EGG ==========
  console.log(
    '%c⚡ ELNIE ANDROID ROOTING SERVICE',
    'color: #00FF66; font-size: 18px; font-weight: bold;'
  );
  console.log(
    '%cProfessional • Safe • Fast\nWhatsApp: 0994 862 0084',
    'color: #BFBFBF; font-size: 12px;'
  );
});
