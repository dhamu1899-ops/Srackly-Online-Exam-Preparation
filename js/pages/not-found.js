// ============================================================
// STACKLY SALEM — Not Found Page (404)
// ============================================================

function render_not_found() {
  const el = document.getElementById('page-not-found');
  if (!el) return;

  el.innerHTML = `
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center bg-gradient-to-b from-slate-50 to-indigo-50/30 relative overflow-hidden">
    <!-- Glow orbs -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/6 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 max-w-lg">
      <!-- Animated 404 graphic -->
      <div class="relative mb-8">
        <div class="text-[120px] sm:text-[160px] font-extrabold font-display leading-none select-none" style="background:linear-gradient(135deg,#4f46e5,#818cf8,#a5b4fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0.15;">
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-28 h-28 rounded-3xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center shadow-xl shadow-indigo-200/50 animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/><line x1="14" x2="14.01" y1="14" y2="14"/></svg>
          </div>
        </div>
      </div>

      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
        404 Diagnostic &mdash; Resource Not Located
      </div>

      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mb-3 tracking-tight">
        Page Not Found
      </h1>
      <p class="text-sm text-slate-500 leading-relaxed mb-8 max-w-sm mx-auto">
        The Stackly Salem academic resource you requested has been relocated, archived, or doesn't exist yet. Our diagnostic system logged this miss. Let's get you back on track.
      </p>

      <!-- Error metadata card -->
      <div class="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-left mb-8 space-y-2 text-xs text-slate-500 max-w-xs mx-auto">
        <div class="flex items-center justify-between">
          <span class="font-medium text-slate-700">Error Code</span>
          <span class="font-mono text-rose-600 font-bold">HTTP 404</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-medium text-slate-700">Timestamp</span>
          <span class="font-mono text-slate-600" id="nf-timestamp"></span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-medium text-slate-700">Status</span>
          <span class="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Investigating
          </span>
        </div>
      </div>

      <!-- Quick Nav Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <button onclick="goBack()" class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Go Back
        </button>
        <button onclick="navigate('home')" class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home Platform
        </button>
        <button onclick="openExam()" class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
          Free Mock Test
        </button>
      </div>

      <!-- Quick links grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-sm mx-auto">
        ${[
          { label: 'About Salem HQ', route: 'about' },
          { label: 'Our Services', route: 'services' },
          { label: 'Course Catalog', route: 'courses' },
          { label: 'Exam Gazette', route: 'blog' },
          { label: 'Contact Us', route: 'contact' },
          { label: 'Student Portal', route: 'student-dashboard' },
        ].map(l => `
          <button onclick="navigate('${l.route}')" class="px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition cursor-pointer text-left">
            ${l.label}
          </button>`).join('')}
      </div>
    </div>
  </div>`;

  // Set timestamp
  const ts = document.getElementById('nf-timestamp');
  if (ts) ts.textContent = new Date().toLocaleTimeString();
}

window.render_not_found = render_not_found;

