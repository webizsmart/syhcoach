/* ===================================================
   SONG YOUNG-HO — JavaScript Interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navigation scroll effect ── */
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── 2. Mobile Hamburger Menu ── */
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── 3. Hero Particle Generator ── */
  const particleContainer = document.getElementById('hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.setProperty('--dur', `${4 + Math.random() * 6}s`);
      p.style.setProperty('--delay', `${Math.random() * 8}s`);
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${20 + Math.random() * 60}%`;
      p.style.width = `${2 + Math.random() * 4}px`;
      p.style.height = p.style.width;
      // Alternate gold and blue
      if (Math.random() > 0.5) {
        p.style.background = '#d4a843';
      } else {
        p.style.background = '#3b82f6';
        p.style.opacity = '0';
      }
      particleContainer.appendChild(p);
    }
  }

  /* ── 4. Counter Animation ── */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    const heroStats = document.getElementById('hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1800;
        const startTime = performance.now();
        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      });
    }
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters(); // Try immediately too

  /* ── 5. Intersection Observer — Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const coachingCards = document.querySelectorAll('.coaching-card');
  const gpItems = document.querySelectorAll('.gp-item');

  const observerOpts = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  // Generic reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOpts);
  revealEls.forEach(el => revealObserver.observe(el));

  // Timeline items with stagger
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  timelineItems.forEach(el => timelineObserver.observe(el));

  // Coaching cards with stagger
  const coachingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.style.transitionDelay = `${i * 80}ms`;
        }, i * 80);
        coachingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  coachingCards.forEach(el => coachingObserver.observe(el));

  // Global points with stagger
  const gpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.style.transitionDelay = `${i * 120}ms`;
        }, i * 120);
        gpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  gpItems.forEach(el => gpObserver.observe(el));

  /* ── 6. About / Contact sections reveal ── */
  const aboutText = document.getElementById('about-text');
  const aboutVisual = document.getElementById('about-visual');
  const contactWrap = document.getElementById('contact-wrap');

  [aboutText, aboutVisual, contactWrap].forEach(el => {
    if (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    }
  });

  /* ── 7. Achievements reveal ── */
  const achMain = document.getElementById('ach-main');
  const achCards = document.querySelectorAll('.ach-card');
  if (achMain) {
    achMain.classList.add('reveal');
    revealObserver.observe(achMain);
  }
  achCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
          }, i * 150);
          obs.unobserve(card);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(card);
  });

  /* ── 8. Quote section reveal ── */
  const quoteBlock = document.getElementById('quote-block');
  if (quoteBlock) {
    quoteBlock.classList.add('reveal');
    revealObserver.observe(quoteBlock);
  }

  /* ── 9. Hero background parallax (subtle) ── */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
      heroContent.style.opacity = `${1 - scrollY / (window.innerHeight * 0.8)}`;
    }
  }, { passive: true });

  /* ── 10. Active nav link highlighting ── */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ── 11. Contact form submit ── */
  window.handleSubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-submit');
    const successMsg = document.getElementById('form-success');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>전송 중...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
      btn.innerHTML = '<span>✅ 전송 완료</span>';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #4ade80)';
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.style.opacity = '0';
        successMsg.style.transform = 'translateY(10px)';
        setTimeout(() => {
          successMsg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          successMsg.style.opacity = '1';
          successMsg.style.transform = 'translateY(0)';
        }, 50);
      }
      // Reset after 4 seconds
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.background = '';
        e.target.reset();
        if (successMsg) successMsg.style.display = 'none';
      }, 4000);
    }, 1500);
  };

  /* ── 12. Smooth nav active state CSS ── */
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .nav-links a.active {
      color: #d4a843 !important;
    }
    .nav-links a {
      position: relative;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      right: 50%;
      height: 2px;
      background: #d4a843;
      border-radius: 1px;
      transition: left 0.3s ease, right 0.3s ease;
    }
    .nav-links a:hover::after,
    .nav-links a.active::after {
      left: 10%;
      right: 10%;
    }
    .nav-links .nav-cta::after { display: none; }
  `;
  document.head.appendChild(styleEl);

  /* ── 13. Gold shimmer effect on hero title ── */
  const titleLine2 = document.querySelector('.title-line-2');
  if (titleLine2) {
    let angle = 135;
    let direction = 1;
    setInterval(() => {
      angle += direction * 0.5;
      if (angle > 160 || angle < 110) direction *= -1;
      titleLine2.style.backgroundImage = `linear-gradient(${angle}deg, #d4a843, #f8e09a, #d4a843)`;
    }, 50);
  }

  console.log('🏸 송영호 글로벌 코치 페이지 로드 완료');
});
