// ============================================================
// STACKLY SALEM — Navbar Component
// ============================================================

function renderNavbar() {
  const { user, currentRoute } = AppState;
  const navLinks = [
    { id: 'home',     label: 'Home' },
    { id: 'about',    label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'courses',  label: 'Courses' },
    { id: 'blog',     label: 'Blog' },
    { id: 'contact',  label: 'Contact' },
  ];

  const desktopLinks = navLinks.map(link => {
    const isActive = currentRoute === link.id;
    return `
      <button data-nav-route="${link.id}" onclick="navigate('${link.id}')"
        class="nav-tab-btn ${isActive ? 'active' : ''}">
        ${isActive ? '<div class="nav-pill"></div>' : ''}
        <span class="nav-label">${link.label}</span>
      </button>`;
  }).join('');

  const mobileLinks = navLinks.map(link => {
    const isActive = currentRoute === link.id;
    return `
      <button data-nav-route="${link.id}" onclick="navigate('${link.id}');closeMobileMenu()"
        class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}">
        <span>${link.label}</span>
        ${isActive ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>` : ''}
      </button>`;
  }).join('');

  const userSection = user ? `
    <div class="relative user-dropdown-wrapper">
      <button onclick="toggleUserDropdown()" class="flex items-center gap-2.5 p-1.5 pl-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition text-left shadow-sm cursor-pointer">
        <div class="flex items-center gap-1 text-amber-800 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
          <span>${user.streakDays}d</span>
        </div>
        <img src="${user.avatar}" alt="${user.name}" class="w-8 h-8 rounded-lg object-cover border border-slate-200" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f46e5&color=fff'">
        <div class="hidden xl:block">
          <div class="text-xs font-bold text-slate-800 leading-tight">${user.name}</div>
          <div class="text-[10px] text-indigo-600 capitalize font-medium flex items-center gap-1">
            ${user.role === 'admin'
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg><span class="text-rose-700 font-bold">Admin Console</span>`
              : `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg><span>Student Portal</span>`}
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>

      <div class="user-dropdown">
        <div class="px-3 py-2 border-b border-slate-100">
          <div class="text-xs font-bold text-slate-900">${user.name}</div>
          <div class="text-[11px] text-slate-500 truncate">${user.email}</div>
          <div class="mt-1.5">
            <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}">
              ${user.role === 'admin' ? 'Platform Administrator' : 'Candidate Aspirant'}
            </span>
          </div>
        </div>
        <div class="py-2 space-y-1">
          ${user.role === 'admin'
            ? `<button onclick="navigate('admin-dashboard',{skipAuth:true});closeUserDropdown()" class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-800 rounded-xl transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                <span>Go to Admin Dashboard</span>
              </button>`
            : `<button onclick="navigate('student-dashboard',{skipAuth:true});closeUserDropdown()" class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-800 rounded-xl transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                <span>Go to Student Dashboard</span>
              </button>`}
          <button onclick="openExam();closeUserDropdown()" class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            <span>Launch Mock Exam</span>
          </button>
        </div>
        <div class="pt-2 border-t border-slate-100">
          <button onclick="handleLogout()" class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>` : `
    <button onclick="openLogin('student')" id="nav-signin-btn" class="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Sign In</span>
    </button>`;

  const mobileUserSection = user ? `
    <button onclick="navigate('${user.role === 'admin' ? 'admin-dashboard' : 'student-dashboard'}',{skipAuth:true});closeMobileMenu()"
      class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 transition cursor-pointer mt-2">
      <span>${user.role === 'admin' ? 'Admin Operations Console' : 'Student Dashboard'}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>` : '';

  const mobileSignOut = user ? `
    <button onclick="closeMobileMenu();handleLogout()" class="w-full py-2.5 px-4 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      <span>Sign Out (${user.name})</span>
    </button>` : `
    <button onclick="closeMobileMenu();openLogin('student')" class="w-full py-2.5 px-4 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Sign In</span>
    </button>`;

  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  navbar.innerHTML = `
    <header class="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style="height:72px;display:flex;align-items:center;justify-content:space-between;">
        <!-- Logo -->
        <button onclick="navigate('home')" class="flex items-center gap-3 text-left group focus:outline-none cursor-pointer" title="Stackly Home">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-200 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="398 82 212 290" fill="currentColor" class="w-6 h-6 text-white">
              <path fill="currentColor" opacity="1.000000" stroke="none" d=" M419.713867,256.179962   C408.001251,235.739304 410.215973,215.613876 419.889709,195.679504   C426.373138,182.319229 436.255493,171.444672 446.508270,160.904480   C457.075165,150.041229 468.783997,140.348602 478.792694,128.896606   C487.411407,119.035004 494.797852,108.464394 500.031921,96.425682   C500.738983,94.799370 501.001617,92.854477 502.785980,91.712807   C503.214905,91.838028 503.879059,91.821617 504.103485,92.127670   C514.526489,106.341171 522.003967,121.483376 518.287415,139.859406   C515.933533,151.498276 508.987885,160.308563 500.296600,167.942245   C487.788574,178.928223 473.634369,187.949692 462.046570,200.037262   C456.219025,206.116135 451.191589,212.659836 449.149933,221.054688   C445.376373,236.570572 454.272034,249.198563 470.197021,250.779221   C485.241028,252.272446 499.302216,248.880798 512.632202,241.996979   C514.021362,241.279602 515.213196,239.793518 517.062500,240.547546   C517.833252,242.063324 516.690857,242.794266 515.917847,243.562866   C502.480865,256.923462 487.519073,267.973206 468.591339,271.949402   C447.923096,276.291199 431.269562,272.383606 419.713867,256.179962  z"/>
              <path fill="currentColor" opacity="1.000000" stroke="none" d=" M536.351807,311.352905   C521.089722,325.623138 508.631836,341.451172 501.644409,361.304535   C500.580017,360.856842 499.799347,360.777496 499.458496,360.348633   C491.323975,350.113098 485.458466,338.909088 484.707672,325.531189   C484.034546,313.536499 489.236786,303.909576 496.947052,295.363251   C506.737030,284.511749 519.089050,276.702271 530.329102,267.573334   C539.676453,259.981689 548.930542,252.352356 553.649658,240.719803   C556.247925,234.315125 556.803040,227.722214 555.167542,221.122284   C551.964783,208.197189 539.399353,200.886032 526.174622,203.877502   C513.911682,206.651428 503.242737,212.702515 493.079834,219.823700   C492.039246,220.552856 491.267578,221.851700 489.661957,221.557190   C488.659760,220.289383 489.653076,219.345703 490.287292,218.480408   C503.850159,199.976334 521.506714,187.674316 544.321167,183.636948   C574.742554,178.253418 599.437622,199.883118 594.804749,234.346802   C592.539368,251.198425 583.628967,264.794067 572.581299,277.156372   C561.558105,289.491241 548.610413,299.803345 536.351807,311.352905  z"/>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-xl font-extrabold tracking-tight text-slate-900 font-display group-hover:text-indigo-600 transition-colors">Stackly</span>
              <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">Salem HQ</span>
            </div>
            <p class="text-[11px] text-slate-500 hidden sm:block" style="margin-top:-2px;">Exam Preparation &amp; Learning Systems</p>
          </div>
        </button>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-200" id="desktop-nav-menu">
          ${desktopLinks}
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-2 sm:gap-3">
          <button onclick="openExam()" id="nav-quick-mock-btn" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition shadow-sm group cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            <span>Free Mock Exam</span>
          </button>
          ${userSection}
          <button id="hamburger-btn" onclick="toggleMobileMenu()" class="flex lg:hidden items-center justify-center p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 border border-slate-200 transition cursor-pointer" aria-label="Toggle navigation menu" title="Toggle Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="hamburger-icon"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer -->
    <div id="mobile-menu" class="lg:hidden border-b border-slate-200 bg-white px-4 py-5 space-y-3 z-30 shadow-lg">
      <div class="space-y-1">
        ${mobileLinks}
        ${mobileUserSection}
      </div>
      <div class="pt-3 border-t border-slate-100 space-y-2">
        <button onclick="closeMobileMenu();openExam()" class="w-full py-2.5 px-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
          <span>Take Free Diagnostic Mock Test</span>
        </button>
        ${mobileSignOut}
      </div>
    </div>
  `;
}

window.renderNavbar = renderNavbar;

