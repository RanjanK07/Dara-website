/* =====================================================
   DARA — Digital Risk Academy & Advisory
   Main JavaScript
   ===================================================== */

// ===================== NAV ACTIVE STATE =====================
function setActiveNav() {
  const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.remove('active');
    if (a.dataset.page === page) a.classList.add('active');
  });
}

// ===================== RISK MATRIX (Advisory page) =====================
function buildMatrix() {
  const matrix = document.getElementById('riskMatrix');
  if (!matrix) return;
  const levels = [
    'low','low','low','med','med',
    'low','med','med','high','high',
    'med','med','high','high','critical',
    'med','high','high','critical','critical',
    'high','high','critical','critical','critical'
  ];
  matrix.innerHTML = '';
  levels.forEach(l => {
    const cell = document.createElement('div');
    cell.className = 'matrix-cell ' + l;
    matrix.appendChild(cell);
  });
}

// ===================== FILTER BUTTONS (Academy page) =====================
function initFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ===================== SCROLL FADE-IN =====================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.wwd-card, .fp-card, .testi-card, .insight-card, .offering-card, .fw-card, .track-card, .course-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===================== FORM SUBMIT (Advisory page) =====================
function initFormSubmit() {
  const form = document.querySelector('.form-submit');
  if (!form) return;
  form.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.form-input');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--orange)';
        valid = false;
      } else {
        input.style.borderColor = 'var(--border)';
      }
    });
    if (valid) {
      form.textContent = '✓ REQUEST SENT — WE\'LL BE IN TOUCH';
      form.style.background = '#1a5c1a';
      setTimeout(() => {
        form.textContent = 'REQUEST CONSULTATION';
        form.style.background = 'var(--orange)';
      }, 3000);
    }
  });
}

// ===================== SKILL BARS ANIMATION =====================
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.style.width;
        fill.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { fill.style.width = width; }, 100);
        });
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => observer.observe(f));
}

// ===================== NAV SCROLL SHRINK =====================
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.height = '60px';
      nav.style.borderBottomColor = 'rgba(255,255,255,0.12)';
    } else {
      nav.style.height = '72px';
      nav.style.borderBottomColor = 'var(--border)';
    }
  });
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  buildMatrix();
  initFilterButtons();
  initScrollAnimations();
  initFormSubmit();
  initSkillBars();
  initNavScroll();
});
