// ============================================================
// STACKLY SALEM — Auth Modal Component
// ============================================================

function renderAuthModal() {
  const { authNotice, authInitialRole } = AppState;
  const backdropEl = document.getElementById('auth-modal-backdrop');
  if (!backdropEl) return;

  // State kept in AppState
  const tab = AppState.authTab || 'signin';
  const role = authInitialRole || 'student';
  let loading = false;

  function buildForm() {
    const isAdmin = role === 'admin';
    const defaultEmail = isAdmin ? 'admin@stackly.in' : 'student@aspirant.edu';

    return `
      <div class="modal-panel max-w-md w-full my-auto p-5 sm:p-6 text-slate-800" style="max-height: calc(100vh - 3rem); overflow-y: auto;">
        <!-- Close -->
        <button onclick="closeAuthModal()" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Header -->
        <div class="text-center mb-4">
          <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 mx-auto mb-2.5 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="398 82 212 290" fill="currentColor" class="w-6 h-6 text-white">
              <path fill="currentColor" opacity="1.000000" stroke="none" d=" M419.713867,256.179962   C408.001251,235.739304 410.215973,215.613876 419.889709,195.679504   C426.373138,182.319229 436.255493,171.444672 446.508270,160.904480   C457.075165,150.041229 468.783997,140.348602 478.792694,128.896606   C487.411407,119.035004 494.797852,108.464394 500.031921,96.425682   C500.738983,94.799370 501.001617,92.854477 502.785980,91.712807   C503.214905,91.838028 503.879059,91.821617 504.103485,92.127670   C514.526489,106.341171 522.003967,121.483376 518.287415,139.859406   C515.933533,151.498276 508.987885,160.308563 500.296600,167.942245   C487.788574,178.928223 473.634369,187.949692 462.046570,200.037262   C456.219025,206.116135 451.191589,212.659836 449.149933,221.054688   C445.376373,236.570572 454.272034,249.198563 470.197021,250.779221   C485.241028,252.272446 499.302216,248.880798 512.632202,241.996979   C514.021362,241.279602 515.213196,239.793518 517.062500,240.547546   C517.833252,242.063324 516.690857,242.794266 515.917847,243.562866   C502.480865,256.923462 487.519073,267.973206 468.591339,271.949402   C447.923096,276.291199 431.269562,272.383606 419.713867,256.179962  z"/>
              <path fill="currentColor" opacity="1.000000" stroke="none" d=" M536.351807,311.352905   C521.089722,325.623138 508.631836,341.451172 501.644409,361.304535   C500.580017,360.856842 499.799347,360.777496 499.458496,360.348633   C491.323975,350.113098 485.458466,338.909088 484.707672,325.531189   C484.034546,313.536499 489.236786,303.909576 496.947052,295.363251   C506.737030,284.511749 519.089050,276.702271 530.329102,267.573334   C539.676453,259.981689 548.930542,252.352356 553.649658,240.719803   C556.247925,234.315125 556.803040,227.722214 555.167542,221.122284   C551.964783,208.197189 539.399353,200.886032 526.174622,203.877502   C513.911682,206.651428 503.242737,212.702515 493.079834,219.823700   C492.039246,220.552856 491.267578,221.851700 489.661957,221.557190   C488.659760,220.289383 489.653076,219.345703 490.287292,218.480408   C503.850159,199.976334 521.506714,187.674316 544.321167,183.636948   C574.742554,178.253418 599.437622,199.883118 594.804749,234.346802   C592.539368,251.198425 583.628967,264.794067 572.581299,277.156372   C561.558105,289.491241 548.610413,299.803345 536.351807,311.352905  z"/>
            </svg>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
            <span>Stackly Portal Access</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display" id="auth-title">
            ${tab === 'signin' ? 'Sign In to Stackly' : 'Create Your Stackly Account'}
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">Select whether you are accessing as an Aspirant or Platform Administrator.</p>
        </div>

        <!-- Notice -->
        ${authNotice ? `
          <div class="mb-3.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <div>
              <div class="font-bold text-amber-950">Exam Security Gate Active</div>
              <div class="text-[11px] text-amber-800 mt-0.5 leading-relaxed">${authNotice}</div>
            </div>
          </div>` : ''}

        <!-- Tab Switcher -->
        <div class="flex p-1 mb-3.5 bg-slate-100 rounded-xl border border-slate-200">
          <button type="button" id="auth-tab-signin" onclick="switchAuthTab('signin')"
            class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${tab === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            Sign In
          </button>
          <button type="button" id="auth-tab-signup" onclick="switchAuthTab('signup')"
            class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${tab === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            Register
          </button>
        </div>

        <!-- Role Selector -->
        <div class="mb-3">
          <div class="flex items-center justify-between mb-1">
            <label class="block text-xs font-semibold text-slate-700">Access Role</label>
            ${tab === 'signup' ? '<span class="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Candidate Registration Only</span>' : ''}
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button type="button" id="auth-role-student" onclick="switchAuthRole('student')"
              class="py-1.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${role === 'student' ? 'bg-indigo-50 border-indigo-400 text-indigo-800 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}">
              Student Portal
            </button>
            <button type="button" id="auth-role-admin" ${tab === 'signup' ? 'disabled title="Admin accounts cannot be self-registered. Provisioned exclusively by Salem HQ Academic Directorate."' : 'onclick="switchAuthRole(\'admin\')'}
              class="py-1.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${tab === 'signup' ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60' : (role === 'admin' ? 'bg-indigo-50 border-indigo-400 text-indigo-800 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100')}">
              Admin Console ${tab === 'signup' ? '<span class="text-[10px] block text-slate-400 font-normal">(Restricted)</span>' : ''}
            </button>
          </div>
        </div>

        <!-- Error Msg -->
        <div id="auth-error" class="mb-3 p-2.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hidden flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span id="auth-error-text"></span>
        </div>

        <!-- Form -->
        <form id="auth-form" onsubmit="handleAuthSubmit(event)" class="space-y-3">
          <div id="auth-name-field" class="${tab === 'signup' ? '' : 'hidden'}">
            <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute" style="left:12px;top:50%;transform:translateY(-50%);"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" id="auth-name" placeholder="e.g. Jordan Hayes"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" style="padding:8px 12px 8px 36px;">
            </div>
          </div>

          <div id="auth-exam-field" class="${tab === 'signup' && role === 'student' ? '' : 'hidden'}">
            <label class="block text-xs font-semibold text-slate-700 mb-1">Target Exam</label>
            <select id="auth-exam" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500">
              <option value="TNPSC Group 1, 2 &amp; 4">TNPSC Group 1, 2 &amp; 4</option>
              <option value="Indian Railways RRB (NTPC/ALP)">Indian Railways RRB (NTPC/ALP)</option>
              <option value="Banking (IBPS &amp; SBI PO)">Banking (IBPS &amp; SBI PO)</option>
              <option value="AI &amp; Machine Learning">AI &amp; Machine Learning Certification</option>
              <option value="Programming &amp; Full Stack">Programming &amp; Full Stack Software</option>
              <option value="History &amp; General Knowledge">History &amp; General Knowledge (GK)</option>
              <option value="Kids &amp; Junior Olympiad">Kids &amp; Junior Olympiad (Grades 3-8)</option>
              <option value="Senior Citizens &amp; Lifelong">Senior Citizens &amp; Lifelong Learning</option>
              <option value="GRE General">GRE General Test</option>
              <option value="GMAT Focus">GMAT Focus Edition</option>
              <option value="MCAT Medical">MCAT Medical Prep</option>
              <option value="Digital SAT">Digital SAT Exam</option>
              <option value="GATE CS">GATE Computer Science</option>
              <option value="IELTS Academic">IELTS Academic</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute" style="left:12px;top:50%;transform:translateY(-50%);"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input type="email" id="auth-email" placeholder="${isAdmin ? 'admin@stackly.edu' : 'student@stackly.edu'}"
                value="${defaultEmail}" required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" style="padding:8px 12px 8px 36px;">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-semibold text-slate-700">Password</label>
              ${tab === 'signin' ? '<span class="text-[11px] text-slate-400">Demo test pwd: <strong>student123</strong> / <strong>admin123</strong> / <strong>demo</strong></span>' : ''}
            </div>
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute" style="left:12px;top:50%;transform:translateY(-50%);"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input type="password" id="auth-password" placeholder="••••••••••••" value="demo" required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" style="padding:8px 12px 8px 36px;">
            </div>
          </div>

          <button type="submit" id="auth-submit" class="w-full py-2.5 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer">
            <span id="auth-submit-text">${tab === 'signin' ? `Sign In as ${role === 'admin' ? 'Admin' : 'Student'}` : 'Register as Student'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </form>

        <!-- Footer note -->
        <div class="mt-4 pt-3 border-t border-slate-100 text-center">
          <div class="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>Secured by Stackly Salem Cloud Cluster • Instant access</span>
          </div>
        </div>
      </div>`;
  }

  backdropEl.innerHTML = `<div class="modal-backdrop" id="auth-inner-backdrop">${buildForm()}</div>`;

  // Close on backdrop click
  backdropEl.querySelector('#auth-inner-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAuthModal();
  });
}

// Tab and role switchers
window.switchAuthTab = function(newTab) {
  AppState.authTab = newTab;
  if (newTab === 'signup') {
    AppState.authInitialRole = 'student';
  }
  renderAuthModal();
};

window.switchAuthRole = function(newRole) {
  if (AppState.authTab === 'signup' && newRole === 'admin') {
    return;
  }
  AppState.authInitialRole = newRole;
  renderAuthModal();
};

window.handleAuthSubmit = function(e) {
  e.preventDefault();
  const emailEl    = document.getElementById('auth-email');
  const passwordEl = document.getElementById('auth-password');
  const nameEl     = document.getElementById('auth-name');
  const errEl      = document.getElementById('auth-error');
  const errText    = document.getElementById('auth-error-text');
  const submitBtn  = document.getElementById('auth-submit');
  const tab        = AppState.authTab || 'signin';

  const email    = emailEl?.value?.trim() || '';
  const password = passwordEl?.value?.trim() || '';
  const name     = nameEl?.value?.trim() || '';
  const role     = tab === 'signup' ? 'student' : (AppState.authInitialRole || 'student');

  function showError(msg) {
    if (errText) errText.textContent = msg;
    else if (errEl) errEl.textContent = msg;
    if (errEl) errEl.classList.remove('hidden');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>${tab === 'signin' ? `Sign In as ${role === 'admin' ? 'Admin' : 'Student'}` : 'Register as Student'}</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
    }
  }

  if (errEl) errEl.classList.add('hidden');

  if (!email || !password) {
    showError('Please enter both email and password.');
    return;
  }

  if (tab === 'signup') {
    if (!name) {
      showError('Please enter your full name.');
      return;
    }
    if (role === 'admin') {
      showError('Administrative accounts cannot be self-registered. Please contact Salem HQ Academic Directorate.');
      return;
    }
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div style="width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;"></div>';
  }

  setTimeout(() => {
    if (tab === 'signin') {
      // Validate credentials against registered store
      const validation = typeof validateUserLogin === 'function'
        ? validateUserLogin(email, password, role)
        : { success: true, user: { id: `user-${Date.now()}`, name: email.split('@')[0], email, role } };

      if (!validation.success) {
        showError(validation.error);
        return;
      }

      handleLoginSuccess(validation.user);
    } else {
      // Registration: Enforce student role and persist user
      const targetExam = document.getElementById('auth-exam')?.value || 'TNPSC Group 1, 2 & 4';
      const regResult = typeof registerNewUser === 'function'
        ? registerNewUser({ name, email, password, targetExam })
        : { success: true, user: { id: `user-${Date.now()}`, name, email, password, role: 'student', targetExam } };

      if (!regResult.success) {
        showError(regResult.error);
        return;
      }

      handleLoginSuccess(regResult.user);
    }
  }, 350);
};

window.renderAuthModal = renderAuthModal;

