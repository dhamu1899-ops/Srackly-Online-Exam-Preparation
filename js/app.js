// ============================================================
// STACKLY SALEM — Main Application State, Router & Utilities
// ============================================================

// ── Global State ──
const AppState = {
  currentRoute: null,
  previousRoute: 'home',
  user: null,
  isAuthOpen: false,
  isExamOpen: false,
  isSyllabusOpen: false,
  activeCourse: null,
  pendingRoute: null,
  pendingExamTitle: null,
  authNotice: null,
  authInitialRole: 'student',
  toastMessage: null,
  theme: 'royal',
  isAnnualPricing: true,
  isNavigating: false,
};

// ── Event Bus ──
const Events = (() => {
  const handlers = {};
  return {
    on(evt, fn) { (handlers[evt] = handlers[evt] || []).push(fn); },
    off(evt, fn) { if (handlers[evt]) handlers[evt] = handlers[evt].filter(h => h !== fn); },
    emit(evt, data) { (handlers[evt] || []).forEach(fn => fn(data)); },
  };
})();

// ── Scroll Progress Bar ──
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? scrollTop / docHeight : 0;
    bar.style.transform = `scaleX(${pct})`;
  }, { passive: true });
}

// ── Scroll Reveal (IntersectionObserver) ──
function initScrollReveal() {
  // Immediately ensure all elements in active page are visible
  document.querySelectorAll('.page-section.active .reveal, .page-section.active .stagger-grid').forEach(el => {
    el.classList.add('visible');
  });

  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal, .stagger-grid').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '150px 0px 150px 0px', threshold: 0 });

  document.querySelectorAll('.reveal, .stagger-grid').forEach(el => observer.observe(el));
}

// Re-run reveal when page changes or dynamic content updates
function refreshScrollReveal() {
  // Immediately ensure all elements in active page are visible
  document.querySelectorAll('.page-section.active .reveal, .page-section.active .stagger-grid').forEach(el => {
    el.classList.add('visible');
  });

  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal, .stagger-grid').forEach(el => el.classList.add('visible'));
    return;
  }
  setTimeout(() => {
    document.querySelectorAll('.page-section.active .reveal, .page-section.active .stagger-grid').forEach(el => {
      el.classList.add('visible');
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '150px 0px 150px 0px', threshold: 0 });
    document.querySelectorAll('.reveal:not(.visible), .stagger-grid:not(.visible)').forEach(el => observer.observe(el));
  }, 20);
}

// ── Router ──
const ROUTE_LABELS = {
  'home':             { title: 'Stackly Global Learning Platform',      tag: 'Home Dashboard' },
  'about':            { title: 'About Stackly & Salem Headquarters',    tag: 'Institutional Profile' },
  'services':         { title: 'Proctored Services & CBT Testing Lab',  tag: 'Academic Infrastructure' },
  'courses':          { title: 'Standardized Exam Course Catalog',      tag: 'Curriculum Vault' },
  'blog':             { title: 'Exam Gazette & High-Yield Analysis',     tag: 'Research Publications' },
  'contact':          { title: 'Salem Campus & Global Testing Arenas',  tag: 'Campus Navigator' },
  'student-dashboard':{ title: 'Student Academic Operations Portal',    tag: 'Candidate Portal' },
  'admin-dashboard':  { title: 'Salem HQ Admin Operations Console',     tag: 'Administration Suite' },
  'not-found':        { title: 'Resource Relocation & Recovery',        tag: '404 Diagnostic' },
};

function showPreloader(route = 'home', durationMs = 3000, onDone) {
  const pl = document.getElementById('preloader');
  if (!pl) { if (onDone) onDone(); return; }

  const meta = ROUTE_LABELS[route] || ROUTE_LABELS['home'];
  const tagEl = pl.querySelector('#preloader-tag');
  const titleEl = pl.querySelector('#preloader-title');
  const subEl = pl.querySelector('#preloader-sub');
  
  if (tagEl) tagEl.textContent = meta.tag || 'Loading Stackly';
  if (titleEl) titleEl.textContent = meta.title || 'Welcome to Stackly Salem';
  if (subEl) subEl.textContent = `Preparing ${meta.tag} & interactive academic modules...`;

  pl.classList.remove('hidden', 'hiding');
  pl.style.display = 'flex';

  let progress = 0;
  const fill = document.getElementById('preloader-progress-bar');
  const pct  = document.getElementById('preloader-percent');
  const start = Date.now();
  let completed = false;

  const finish = () => {
    if (completed) return;
    completed = true;
    clearInterval(tick);
    if (fill) fill.style.width = '100%';
    if (pct)  pct.textContent  = '100%';
    if (onDone) onDone();
    pl.classList.add('hiding');
    setTimeout(() => {
      pl.classList.add('hidden');
      pl.style.display = 'none';
    }, 150);
  };

  const tick = setInterval(() => {
    const elapsed = Date.now() - start;
    progress = Math.min(100, Math.floor((elapsed / durationMs) * 100));
    if (fill) fill.style.width = progress + '%';
    if (pct)  pct.textContent  = progress + '%';
    if (elapsed >= durationMs) finish();
  }, 16);

  // Skip button
  const skipBtn = document.getElementById('preloader-skip');
  if (skipBtn) skipBtn.onclick = finish;
}

function navigate(route, options = {}) {
  const { skipAuth = false, skipLoader = false, force = false } = options;

  // Auth guards
  if (!skipAuth) {
    if (route === 'student-dashboard' && !AppState.user) {
      openLogin('student', 'Student Authentication Required: Please sign in or register to access your personal academic portal, test history, and study plan.');
      showToast('Student Login Required: Please sign in to access your portal.');
      return;
    }
    if (route === 'admin-dashboard') {
      if (!AppState.user) {
        openLogin('admin', 'Administrator Authentication Required: Please sign in with verified administrator credentials to access the Salem HQ Operations Console.');
        showToast('Administrator Credentials Required: Please sign in to access Admin Console.');
        return;
      }
      if (AppState.user.role !== 'admin') {
        openLogin('admin', 'Access Restricted: Administrator role required. You are currently logged in as a candidate. Please sign in with an Administrator account.');
        showToast('Access Restricted: Admin privileges required.');
        return;
      }
    }
  }

  const targetEl = document.getElementById(`page-${route}`);
  if (!targetEl && typeof window !== 'undefined' && window.location) {
    const targetFile = route === 'home' ? 'index.html' : `${route}.html`;
    window.location.href = targetFile;
    return;
  }
  const hasContent = targetEl && targetEl.children.length > 0;

  // If already on this route, has content, and force is not requested, smooth scroll to top
  if (route === AppState.currentRoute && hasContent && !force) {
    if (typeof window.scrollTo === 'function') window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const applyRoute = () => {
    AppState.previousRoute = AppState.currentRoute || 'home';
    AppState.currentRoute  = route;

    // Update hash smoothly without trigger or page refresh
    if (typeof window !== 'undefined' && window.location && window.location.hash !== '#' + route) {
      if (typeof window.history !== 'undefined' && typeof window.history.pushState === 'function') {
        window.history.pushState(null, '', '#' + route);
      }
    }

    // Smoothly switch active container
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`page-${route}`);
    if (target) {
      target.classList.add('active');
      // Re-render page if it has a render fn
      const fnName = `render_${route.replace(/-/g, '_')}`;
      if (typeof window[fnName] === 'function') {
        window[fnName]();
      }
    }

    updateNavActiveState(route);
    closeMobileMenu();
    closeUserDropdown();
    if (typeof window.scrollTo === 'function') window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshScrollReveal();
    Events.emit('route-changed', route);
  };

  if (skipLoader) {
    applyRoute();
  } else {
    // Show high-speed sleek loading transition (3000ms / 3 seconds)
    showPreloader(route, 3000, applyRoute);
  }
}


function goBack() {
  const fallback = AppState.previousRoute === 'not-found' ? 'home' : AppState.previousRoute;
  navigate(fallback);
}

// ── Toast Notifications ──
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'toast';
  div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span style="font-size:0.75rem;font-weight:600;line-height:1.4;flex:1;">${msg}</span>
    <button onclick="this.parentElement.remove()" style="color:#94a3b8;background:none;border:none;padding:0.25rem;cursor:pointer;flex-shrink:0;line-height:1;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  container.appendChild(div);

  setTimeout(() => {
    div.classList.add('hiding');
    setTimeout(() => div.remove(), 320);
  }, 3800);
}

// ── Theme Switcher ──
function setTheme(themeId) {
  AppState.theme = themeId;
  document.documentElement.setAttribute('data-theme', themeId);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset?.theme === themeId);
  });
  localStorage.setItem('stackly-theme', themeId);
}

// ── Auth Modal ──
function openLogin(role = 'student', notice = null) {
  AppState.authInitialRole = role;
  AppState.authNotice = notice || (role === 'admin'
    ? 'Administrator Authentication Required: Please sign in with administrator credentials.'
    : 'Student Authentication Required: Please sign in to access your portal.');
  AppState.isAuthOpen = true;
  renderAuthModal();
  document.getElementById('auth-modal-backdrop').classList.remove('hidden');
}

function closeAuthModal() {
  AppState.isAuthOpen = false;
  AppState.authNotice = null;
  const backdrop = document.getElementById('auth-modal-backdrop');
  if (backdrop) backdrop.classList.add('hidden');
}

function handleLoginSuccess(userData) {
  AppState.user = userData;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('stackly_auth_user', JSON.stringify(userData));
    }
  } catch (e) {
    console.warn('Failed to save session to localStorage', e);
  }
  closeAuthModal();

  const destination = AppState.pendingRoute;
  AppState.pendingRoute = null;

  renderNavbar();

  if (destination === 'admin-dashboard' && userData.role === 'admin') {
    navigate('admin-dashboard', { skipAuth: true });
    showToast(`Welcome Administrator, ${userData.name}! Access granted to Admin Operations Console.`);
  } else if (destination === 'student-dashboard') {
    navigate('student-dashboard', { skipAuth: true });
    showToast(`Welcome back, ${userData.name}! Redirected to your Student Academic Portal.`);
  } else if (userData.role === 'admin') {
    navigate('admin-dashboard', { skipAuth: true });
    showToast(`Welcome Administrator, ${userData.name}! Redirected to Admin Operations Console.`);
  } else {
    navigate('student-dashboard', { skipAuth: true });
    showToast(`Welcome back, ${userData.name}! Redirected to your Student Academic Portal.`);
  }

  if (AppState.pendingExamTitle) {
    openExam(AppState.pendingExamTitle);
    showToast(`Access Verified! Launching ${AppState.pendingExamTitle}...`);
    AppState.pendingExamTitle = null;
  }
}

function handleLogout() {
  AppState.user = null;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('stackly_auth_user');
    }
  } catch (e) {
    console.warn('Failed to clear session from localStorage', e);
  }
  closeUserDropdown();
  renderNavbar();
  navigate('home', { skipAuth: true, skipPreloader: false });
  showToast('You have been signed out successfully.');
}

// ── Exam Modal ──
function openExam(examTitle) {
  if (!AppState.user) {
    AppState.pendingExamTitle = examTitle || 'Stackly Salem Comprehensive Exam Simulation';
    AppState.authNotice = 'Access Restricted: Under Stackly examination regulations, only registered & logged-in candidates can write exams, submit answers, and receive certified scorecards.';
    AppState.authInitialRole = 'student';
    AppState.pendingRoute = null;
    openLogin('student', AppState.authNotice);
    showToast('Candidate Login Required: Please sign in or register to write exams.');
    return;
  }
  AppState.pendingExamTitle = examTitle || 'Stackly Salem Section-Adaptive Diagnostic';
  AppState.isExamOpen = true;
  renderExamModal();
  document.getElementById('exam-modal-backdrop').classList.remove('hidden');
}

function closeExamModal() {
  AppState.isExamOpen = false;
  if (window.ExamEngine && typeof ExamEngine.stopTimer === 'function') {
    ExamEngine.stopTimer();
  }
  const backdrop = document.getElementById('exam-modal-backdrop');
  if (backdrop) backdrop.classList.add('hidden');
}

// ── Syllabus Modal ──
function openSyllabus(course) {
  AppState.activeCourse = course;
  AppState.isSyllabusOpen = true;
  renderSyllabusModal(course);
  document.getElementById('syllabus-modal-backdrop').classList.remove('hidden');
}

function closeSyllabusModal() {
  AppState.isSyllabusOpen = false;
  const backdrop = document.getElementById('syllabus-modal-backdrop');
  if (backdrop) backdrop.classList.add('hidden');
}

function handleEnroll(course) {
  closeSyllabusModal();
  
  if (typeof addEnrolledCourse === 'function') {
    const res = addEnrolledCourse(course);
    if (res.alreadyEnrolled) {
      showToast(`You are already enrolled in "${course.title}". Opening your curriculum dashboard...`);
    } else {
      showToast(`Successfully enrolled in "${course.title}"! Added to your Stackly Salem dashboard.`);
    }
  } else {
    showToast(`Enrolled in "${course.title}"! Added to your Stackly Salem dashboard.`);
  }

  // Trigger real-time dashboard refresh if rendered
  if (typeof window.render_student_dashboard === 'function') {
    window.render_student_dashboard();
  }

  if (AppState.user) {
    navigate('student-dashboard', { skipAuth: true });
  } else {
    AppState.pendingRoute = 'student-dashboard';
    openLogin('student', `Please sign in to access your newly enrolled curriculum: "${course.title}".`);
  }
}

// ── Navbar helpers ──
function updateNavActiveState(route) {
  document.querySelectorAll('[data-nav-route]').forEach(btn => {
    const isActive = btn.dataset.navRoute === route;
    const isDesktopBtn = btn.classList.contains('nav-tab-btn') || btn.querySelector('.nav-label');
    
    if (isDesktopBtn) {
      const pill = btn.querySelector('.nav-pill');
      if (isActive) {
        btn.classList.add('active');
        if (!pill) {
          const p = document.createElement('div');
          p.className = 'nav-pill';
          btn.prepend(p);
        }
      } else {
        btn.classList.remove('active');
        if (pill) pill.remove();
      }
    } else {
      // Mobile drawer nav links
      if (isActive) {
        btn.classList.add('bg-indigo-600', 'text-white', 'font-bold');
        btn.classList.remove('text-slate-700');
      } else {
        btn.classList.remove('bg-indigo-600', 'text-white', 'font-bold');
        btn.classList.add('text-slate-700');
      }
    }
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.classList.toggle('open');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.remove('open');
}

function toggleUserDropdown() {
  const dd = document.querySelector('.user-dropdown');
  if (dd) dd.classList.toggle('open');
}

function closeUserDropdown() {
  document.querySelectorAll('.user-dropdown').forEach(d => d.classList.remove('open'));
}

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-dropdown-wrapper')) closeUserDropdown();
  if (!e.target.closest('#mobile-menu') && !e.target.closest('#hamburger-btn')) closeMobileMenu();
});

// ── Stars renderer ──
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      html += `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    } else if (i === full && half) {
      html += `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    } else {
      html += `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
  }
  return html;
}

// ── Lucide icon helper ──
function icon(name, classes = 'w-4 h-4') {
  const [w, h] = classes.match(/w-(\d+(?:\.\d+)?)/)?.[1]
    ? [classes.match(/w-(\d+(?:\.\d+)?)/)[1], classes.match(/h-(\d+(?:\.\d+)?)/)?.[1] || classes.match(/w-(\d+(?:\.\d+)?)/)[1]]
    : [4, 4];
  const px = { '3': 12, '3.5': 14, '4': 16, '5': 20, '6': 24, '7': 28, '8': 32, '10': 40, '12': 48, '16': 64 };
  const size = px[w] || parseInt(w) * 4 || 16;
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px;display:inline-block;vertical-align:middle;"></i>`;
}

// ── Format numbers ──
function fmtNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000)    return (n/1000).toFixed(0) + 'K';
  return n.toString();
}

// ── Hash-based routing on load, file path support & history support ──
function initRouter() {
  const validRoutes = Object.keys(ROUTE_LABELS);
  let pageFromPath = '';
  if (typeof window !== 'undefined' && window.location && window.location.pathname) {
    const pathPart = window.location.pathname.split('/').pop() || '';
    const cleanName = pathPart.replace('.html', '').replace('.htm', '');
    if (cleanName && validRoutes.includes(cleanName)) {
      pageFromPath = cleanName;
    } else if (cleanName === 'index' || cleanName === '') {
      pageFromPath = 'home';
    }
  }

  const hash = (typeof window !== 'undefined' && window.location && window.location.hash.replace('#', '')) || '';
  const startRoute = (hash && validRoutes.includes(hash)) ? hash : (pageFromPath || 'home');

  // Listen for browser Back & Forward navigation
  window.addEventListener('popstate', () => {
    const newHash = window.location.hash.replace('#', '') || 'home';
    if (newHash !== AppState.currentRoute) {
      navigate(newHash, { skipAuth: false });
    }
  });

  // Immediately render the starting route with full content and 0ms initial delay!
  navigate(startRoute, { skipAuth: true, skipLoader: true, force: true });
}


// ── Global Aliases ──
window.AppState = AppState;
window.Events = Events;
window.navigate = navigate;
window.goBack = goBack;
window.showToast = showToast;
window.setTheme = setTheme;
window.openLogin = openLogin;
window.openAuthModal = openLogin;
window.closeAuthModal = closeAuthModal;
window.handleLoginSuccess = handleLoginSuccess;
window.handleLogout = handleLogout;
window.openExam = openExam;
window.openExamModal = openExam;
window.closeExamModal = closeExamModal;
window.openSyllabus = openSyllabus;
window.openSyllabusModal = openSyllabus;
window.closeSyllabusModal = closeSyllabusModal;
window.handleEnroll = handleEnroll;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.toggleUserDropdown = toggleUserDropdown;
window.closeUserDropdown = closeUserDropdown;
window.renderStars = renderStars;
window.icon = icon;
window.fmtNum = fmtNum;

// ── App Boot ──
document.addEventListener('DOMContentLoaded', () => {
  // Restore theme from localStorage
  const savedTheme = localStorage.getItem('stackly-theme') || 'royal';
  setTheme(savedTheme);

  // Restore user session from localStorage (BUG-003 fix)
  try {
    const storedUser = localStorage.getItem('stackly_auth_user');
    if (storedUser) {
      AppState.user = JSON.parse(storedUser);
    }
  } catch (e) {
    console.warn('Could not restore auth user session', e);
  }

  // Render static components
  if (typeof renderNavbar === 'function') renderNavbar();
  if (typeof renderFooter === 'function') renderFooter();

  // Init scroll progress
  initScrollProgress();

  // Init scroll reveal
  initScrollReveal();

  // Boot router
  initRouter();

  // Init lucide icons
  if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});


