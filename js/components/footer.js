// ============================================================
// STACKLY SALEM — Footer Component
// ============================================================

function renderFooter() {
  const footerEl = document.getElementById('main-footer');
  if (!footerEl) return;

  footerEl.innerHTML = `
  <footer class="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
    <!-- Top Banner -->
    <div class="border-b border-slate-800/80 bg-slate-900/70 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4 text-left">
          <div class="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400 flex-shrink-0 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
          </div>
          <div>
            <h4 class="text-white font-bold text-base font-display">Ready to Gauge Your Baseline Today?</h4>
            <p class="text-xs text-slate-400 mt-0.5">Take our 10-minute section-adaptive diagnostic mock test calibrated by the Stackly Salem psychometrics lab.</p>
          </div>
        </div>
        <button onclick="openExam()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition flex-shrink-0 flex items-center gap-2 cursor-pointer">
          <span>Start Free Diagnostic Test</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>

    <!-- Main Footer Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        <!-- Brand Column (lg:col-span-2) -->
        <div class="lg:col-span-2 space-y-4 text-left">
          <button onclick="navigate('home')" class="flex items-center gap-3 text-left group cursor-pointer focus:outline-none" title="Stackly Home">
            <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-200 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="398 82 212 290" fill="currentColor" class="w-6 h-6 text-white">
                <path fill="currentColor" opacity="1.000000" stroke="none" d=" M419.713867,256.179962   C408.001251,235.739304 410.215973,215.613876 419.889709,195.679504   C426.373138,182.319229 436.255493,171.444672 446.508270,160.904480   C457.075165,150.041229 468.783997,140.348602 478.792694,128.896606   C487.411407,119.035004 494.797852,108.464394 500.031921,96.425682   C500.738983,94.799370 501.001617,92.854477 502.785980,91.712807   C503.214905,91.838028 503.879059,91.821617 504.103485,92.127670   C514.526489,106.341171 522.003967,121.483376 518.287415,139.859406   C515.933533,151.498276 508.987885,160.308563 500.296600,167.942245   C487.788574,178.928223 473.634369,187.949692 462.046570,200.037262   C456.219025,206.116135 451.191589,212.659836 449.149933,221.054688   C445.376373,236.570572 454.272034,249.198563 470.197021,250.779221   C485.241028,252.272446 499.302216,248.880798 512.632202,241.996979   C514.021362,241.279602 515.213196,239.793518 517.062500,240.547546   C517.833252,242.063324 516.690857,242.794266 515.917847,243.562866   C502.480865,256.923462 487.519073,267.973206 468.591339,271.949402   C447.923096,276.291199 431.269562,272.383606 419.713867,256.179962  z"/>
                <path fill="currentColor" opacity="1.000000" stroke="none" d=" M536.351807,311.352905   C521.089722,325.623138 508.631836,341.451172 501.644409,361.304535   C500.580017,360.856842 499.799347,360.777496 499.458496,360.348633   C491.323975,350.113098 485.458466,338.909088 484.707672,325.531189   C484.034546,313.536499 489.236786,303.909576 496.947052,295.363251   C506.737030,284.511749 519.089050,276.702271 530.329102,267.573334   C539.676453,259.981689 548.930542,252.352356 553.649658,240.719803   C556.247925,234.315125 556.803040,227.722214 555.167542,221.122284   C551.964783,208.197189 539.399353,200.886032 526.174622,203.877502   C513.911682,206.651428 503.242737,212.702515 493.079834,219.823700   C492.039246,220.552856 491.267578,221.851700 489.661957,221.557190   C488.659760,220.289383 489.653076,219.345703 490.287292,218.480408   C503.850159,199.976334 521.506714,187.674316 544.321167,183.636948   C574.742554,178.253418 599.437622,199.883118 594.804749,234.346802   C592.539368,251.198425 583.628967,264.794067 572.581299,277.156372   C561.558105,289.491241 548.610413,299.803345 536.351807,311.352905  z"/>
              </svg>
            </div>
            <div>
              <span class="text-xl font-extrabold text-white font-display group-hover:text-indigo-400 transition-colors">Stackly</span>
              <span class="ml-2 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-950/90 text-indigo-300 border border-indigo-800">Salem HQ</span>
            </div>
          </button>
          <p class="text-xs leading-relaxed text-slate-400 max-w-sm">
            Engineered with pride by <strong class="text-slate-200">Stackly Technologies, Salem</strong>. Empowering candidates worldwide to conquer standardized exams through cognitive science, IRT adaptive test mechanics, and elite faculty pedagogy.
          </p>
          <div class="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800/90 max-w-sm space-y-2 text-xs">
            <div class="flex items-start gap-2 text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px;"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
              <span><strong class="text-white">Global Headquarters:</strong> Stackly Tech Park, #42 Innovation Corridor, Meyyanur Bypass Road, Fairlands, Salem, Tamil Nadu 636004, India</span>
            </div>
            <div class="flex items-center gap-2 text-slate-400 pt-1 border-t border-slate-800/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l1.27-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+91 (427) 244-8890 / +91 98427 12345</span>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="pt-2">
            <div class="text-xs font-semibold text-slate-300 mb-2">Receive Weekly High-Yield Exam Problems &amp; Strategy:</div>
            <div id="newsletter-area">
              <form onsubmit="handleNewsletterSubmit(event)" class="flex gap-2 max-w-sm">
                <input type="email" id="newsletter-email" placeholder="Enter student email" required
                  class="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer flex-shrink-0">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <!-- Standardized Exams Column -->
        <div class="text-left">
          <h5 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Standardized Exams</h5>
          <ul class="space-y-2.5 text-xs text-slate-400">
            ${['GRE General Prep','GMAT Focus Edition','Digital SAT 1550+','MCAT Clinical Prep','USMLE Step 1 & 2','GATE Computer Science','IELTS Academic Band 8.5'].map(exam => `
              <li><button onclick="navigate('courses')" class="hover:text-indigo-400 transition cursor-pointer text-left">${exam}</button></li>`).join('')}
          </ul>
        </div>

        <!-- Navigation & Portals Column -->
        <div class="text-left">
          <h5 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Navigation &amp; Portals</h5>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><button onclick="navigate('home')" class="hover:text-indigo-400 transition cursor-pointer text-left">Home Platform</button></li>
            <li><button onclick="navigate('about')" class="hover:text-indigo-400 transition cursor-pointer text-left">About Stackly &amp; Salem HQ</button></li>
            <li><button onclick="navigate('services')" class="hover:text-indigo-400 transition cursor-pointer text-left">Academic Services &amp; CBT Lab</button></li>
            <li><button onclick="navigate('courses')" class="hover:text-indigo-400 transition cursor-pointer text-left">Course Catalog &amp; Mocks</button></li>
            <li><button onclick="navigate('blog')" class="hover:text-indigo-400 transition cursor-pointer text-left">Exam Gazette &amp; Strategy Blog</button></li>
            <li><button onclick="navigate('contact')" class="hover:text-indigo-400 transition cursor-pointer text-left">Salem Campus Contact &amp; Map</button></li>
          </ul>
        </div>

        <!-- Salem Tech Campus + Social -->
        <div class="text-left">
          <h5 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Salem Tech Campus</h5>
          <div class="space-y-3 text-xs text-slate-400">
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Meyyanur Bypass Rd, Fairlands, Salem, TN 636004</span>
            </div>
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l1.27-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+91 98427 12345 (Direct Hotline)</span>
            </div>
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>contact@stackly.in / support@stackly.in</span>
            </div>
            <div class="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
              <span>ISO 9001:2026 Certified Academic Engine</span>
            </div>
          </div>

          <!-- Social Media -->
          <div class="pt-4 mt-4 border-t border-slate-800/80">
            <div class="text-xs font-semibold text-slate-300 mb-2.5">Official Social Media:</div>
            <div class="flex items-center gap-2 flex-wrap">
              <!-- X -->
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" title="X (formerly Twitter)"
                class="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 hover:bg-black hover:border-slate-700 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <!-- LinkedIn -->
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"
                class="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 hover:text-white" style="transition:all 0.2s;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z"/></svg>
              </a>
              <!-- Instagram -->
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"
                class="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <!-- Facebook -->
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook"
                class="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>&copy; ${new Date().getFullYear()} Stackly Technologies Pvt. Ltd., Salem, Tamil Nadu, India. All rights reserved.</div>
        <div class="flex items-center gap-6 flex-wrap">
          <button onclick="navigate('not-found')" class="hover:text-slate-300 transition cursor-pointer text-xs">Privacy Policy</button>
          <button onclick="navigate('not-found')" class="hover:text-slate-300 transition cursor-pointer text-xs">Terms of Service</button>
          <button onclick="navigate('not-found')" class="hover:text-slate-300 transition cursor-pointer text-xs">Academic Honor Code</button>
          <button onclick="navigate('not-found')" class="hover:text-slate-300 transition cursor-pointer text-xs">Salem Security Audits</button>
        </div>
      </div>
    </div>
  </footer>
  `;
}

window.renderFooter = renderFooter;


window.handleNewsletterSubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email')?.value;
  if (!email) return;
  document.getElementById('newsletter-area').innerHTML = `
    <div class="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span>Subscribed! Check your inbox for the Stackly 100 Golden Formulas PDF.</span>
    </div>`;
};
