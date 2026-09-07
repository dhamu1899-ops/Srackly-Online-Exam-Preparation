// ============================================================
// STACKLY SALEM — Syllabus Modal Component
// ============================================================

function renderSyllabusModal(course) {
  if (!course) return;
  const backdropEl = document.getElementById('syllabus-modal-backdrop');
  if (!backdropEl) return;

  backdropEl.innerHTML = `
    <div class="modal-backdrop" id="syllabus-inner-backdrop">
      <div class="modal-panel" style="max-width:42rem;width:100%;margin:2rem auto;padding:1.5rem 2rem;display:flex;flex-direction:column;max-height:90vh;">
        <!-- Close -->
        <button onclick="closeSyllabusModal()" class="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Header -->
        <div class="mb-5 pb-4 border-b border-slate-100">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">${course.exam} Master Curriculum</span>
            <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-medium">${course.level} Level</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">${course.title}</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Instructor: <span class="text-slate-900 font-semibold">${course.instructor.name}</span> &bull; ${course.instructor.role}</p>
        </div>

        <!-- Key Metrics -->
        <div class="grid grid-cols-4 gap-2.5 mb-5 text-center">
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div class="text-xs text-slate-500 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Duration</span>
            </div>
            <div class="text-sm font-bold text-slate-900 mt-0.5">${course.durationWeeks} Wks</div>
          </div>
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div class="text-xs text-slate-500 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
              <span>Lectures</span>
            </div>
            <div class="text-sm font-bold text-slate-900 mt-0.5">${course.videoHours} Hrs</div>
          </div>
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div class="text-xs text-slate-500 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
              <span>Questions</span>
            </div>
            <div class="text-sm font-bold text-slate-900 mt-0.5">${course.practiceQuestions}+</div>
          </div>
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div class="text-xs text-slate-500 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
              <span>Full Mocks</span>
            </div>
            <div class="text-sm font-bold text-slate-900 mt-0.5">${course.fullMocksCount} Tests</div>
          </div>
        </div>

        <!-- Syllabus Modules (scrollable) -->
        <div style="flex:1;overflow-y:auto;padding-right:4px;" class="space-y-3.5">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Syllabus Structure &amp; Module Breakdown
          </h3>
          ${course.syllabus.map((mod, idx) => `
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-sm font-bold text-slate-900">${mod.moduleTitle}</h4>
                <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">${mod.quizzesCount} Practice Quizzes</span>
              </div>
              <ul class="space-y-1.5 text-xs text-slate-600">
                ${mod.lessons.map(lesson => `
                  <li class="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span>${lesson}</span>
                  </li>`).join('')}
              </ul>
            </div>`).join('')}
        </div>

        <!-- Footer -->
        <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div class="text-[10px] uppercase text-slate-400 font-bold">Enrollment Fee</div>
            <div class="text-2xl font-extrabold text-slate-900">
              \$${course.salePrice}
              <span class="text-xs line-through text-slate-400 font-normal">\$${course.originalPrice}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <button onclick="closeSyllabusModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">Close</button>
            <button onclick="handleEnroll(AppState.activeCourse)" class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition">Enroll in Program</button>
          </div>
        </div>
      </div>
    </div>`;

  backdropEl.querySelector('#syllabus-inner-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeSyllabusModal();
  });
}

window.renderSyllabusModal = renderSyllabusModal;

