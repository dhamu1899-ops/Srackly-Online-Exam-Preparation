// ============================================================
// STACKLY SALEM — Student Dashboard Component
// ============================================================

const StudentDashboardModule = {
  activeTab: 'overview',
  errorItems: [],

  init() {
    if (!this.errorItems || this.errorItems.length === 0) {
      const data = window.STUDENT_DASHBOARD_DATA;
      this.errorItems = data?.errorLogItems ? JSON.parse(JSON.stringify(data.errorLogItems)) : [];
    }
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  toggleResolve(id) {
    this.errorItems = this.errorItems.map(item =>
      item.id === id ? { ...item, resolved: !item.resolved } : item
    );
    showToast('Question status updated in your cognitive error matrix.');
    this.render();
  },

  // ── BUG-005: Resume Lesson Interactive Player Modal ──
  resumeLesson(courseId) {
    const enrolled = typeof getEnrolledCourses === 'function' ? getEnrolledCourses() : [];
    const course = enrolled.find(c => c.id === courseId || c.title === courseId) || enrolled[0] || {
      id: 'course-default',
      title: 'Advanced Diagnostic Course',
      nextLesson: 'Module 2: Core Psychometric Shortcuts',
      instructor: 'Stackly Academic Faculty',
      progress: 35,
    };

    const existingModal = document.getElementById('lesson-player-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'lesson-player-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col" style="max-height: 90vh;">
        <!-- Header -->
        <div class="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Active Lecture</span>
                <span class="text-xs text-slate-400">• ${course.instructor}</span>
              </div>
              <h3 class="text-sm font-bold text-white leading-tight mt-0.5">${course.title}</h3>
            </div>
          </div>
          <button onclick="document.getElementById('lesson-player-modal').remove()" class="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer" title="Close Lecture">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Video Simulation Screen -->
        <div class="relative bg-black aspect-video sm:aspect-21/9 flex items-center justify-center overflow-hidden group">
          <img src="${course.bannerImg || course.thumbnail || './assets/images/img-1434030216411-0b.webp'}" alt="Lecture Frame" class="w-full h-full object-cover opacity-60">
          
          <!-- Play Overlay -->
          <div class="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-t from-black/90 via-transparent to-black/40">
            <div class="flex items-center justify-between text-xs text-white/90">
              <span class="bg-indigo-600/90 text-white font-mono px-2 py-0.5 rounded text-[11px] font-bold">1080p HD Studio Stream</span>
              <span class="font-mono">Salem HQ Node 04</span>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600/90 text-white flex items-center justify-center mx-auto shadow-xl hover:scale-105 transition cursor-pointer border-2 border-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" class="ml-1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div class="text-white text-sm sm:text-base font-bold mt-3 text-shadow">${course.nextLesson || 'Chapter 3: Cognitive Speed Drills'}</div>
              <div class="text-xs text-slate-300">Click to resume lecture at 14:20</div>
            </div>

            <!-- Player Controls Scrubber Bar -->
            <div class="space-y-2">
              <div class="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div class="bg-indigo-500 h-full rounded-full" style="width: 32%"></div>
              </div>
              <div class="flex items-center justify-between text-[11px] text-white/80 font-mono">
                <div class="flex items-center gap-3">
                  <span>14:20 / 45:00</span>
                  <span class="px-1.5 py-0.5 rounded bg-white/10 text-indigo-300 font-bold">1.25x Speed</span>
                </div>
                <div class="flex items-center gap-2">
                  <span>Audio: HD Balanced</span>
                  <span>[CC English]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lesson Meta & Syllabus Outline -->
        <div class="p-6 bg-slate-50 flex-1 overflow-y-auto space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h4 class="text-sm font-bold text-slate-900">${course.nextLesson || 'Chapter 3: Cognitive Speed Drills'}</h4>
              <p class="text-xs text-slate-500 mt-0.5">High-frequency question patterns, item discrimination, and mental math shortcuts.</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <button onclick="StudentDashboardModule.markLessonComplete('${course.id}'); document.getElementById('lesson-player-modal').remove()"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Mark Lesson Complete</span>
              </button>
            </div>
          </div>

          <!-- Modules List -->
          <div class="space-y-2 text-xs">
            <div class="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Lesson Sequence</div>
            <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span class="font-semibold text-slate-800">1. Diagnostic Baseline Assessment</span>
              </div>
              <span class="text-slate-400 font-mono">25 mins</span>
            </div>
            <div class="p-3 bg-indigo-50/80 rounded-xl border border-indigo-200 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">▶</span>
                <span class="font-bold text-indigo-900">2. Derivation Formulas &amp; Cognitive Heuristics (Current)</span>
              </div>
              <span class="text-indigo-600 font-mono font-bold">45 mins</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-slate-600">
              <div class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-[10px]">3</span>
                <span class="font-medium text-slate-700">3. Full-Length Proctored Simulation Mock</span>
              </div>
              <span class="text-slate-400 font-mono">60 mins</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  markLessonComplete(courseId) {
    const enrolled = typeof getEnrolledCourses === 'function' ? getEnrolledCourses() : [];
    const course = enrolled.find(c => c.id === courseId || c.title === courseId);
    if (course) {
      course.progress = Math.min(100, (course.progress || 0) + 15);
      course.completedHours = (course.completedHours || 0) + 2;
      course.lastActive = 'Just Now';
      try {
        localStorage.setItem('stackly_enrolled_courses', JSON.stringify(enrolled));
      } catch (e) {}
    }
    showToast(`Lesson completed! Course progress updated to ${course ? course.progress : 50}%. +150 XP awarded!`);
    this.render();
  },

  // ── BUG-006: View Report Diagnostic Modal ──
  viewReport(mockTitle) {
    const existingModal = document.getElementById('diagnostic-report-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'diagnostic-report-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 flex flex-col" style="max-height: 90vh;">
        <!-- Header -->
        <div class="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">Official IRT Scorecard</span>
              <span class="text-xs text-slate-400">• Salem Central Exam Server</span>
            </div>
            <h3 class="text-lg font-bold text-white mt-1">${mockTitle}</h3>
          </div>
          <button onclick="document.getElementById('diagnostic-report-modal').remove()" class="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto space-y-6 text-slate-800">
          <!-- Score Summary Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-center">
              <div class="text-xs text-indigo-700 font-semibold uppercase">Total Scaled Score</div>
              <div class="text-3xl font-extrabold text-indigo-900 font-display mt-1">326 / 340</div>
              <div class="text-[11px] text-emerald-700 font-bold mt-0.5">96th National Percentile</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-xs text-slate-600 font-semibold uppercase">Quantitative Reasoning</div>
              <div class="text-3xl font-extrabold text-slate-900 font-display mt-1">168 / 170</div>
              <div class="text-[11px] text-indigo-600 font-bold mt-0.5">Accuracy: 94.2%</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-xs text-slate-600 font-semibold uppercase">Verbal Reasoning</div>
              <div class="text-3xl font-extrabold text-slate-900 font-display mt-1">158 / 170</div>
              <div class="text-[11px] text-indigo-600 font-bold mt-0.5">Accuracy: 88.5%</div>
            </div>
          </div>

          <!-- Pacing & Time Telemetry -->
          <div class="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Cognitive Velocity &amp; Latency</h4>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div class="p-3 bg-slate-50 rounded-lg">
                <div class="text-slate-500 text-[11px]">Avg. Time / Question</div>
                <div class="text-base font-bold text-slate-800 mt-0.5 font-mono">58 seconds</div>
                <div class="text-[10px] text-emerald-600 font-semibold">16s faster than target</div>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg">
                <div class="text-slate-500 text-[11px]">Panic Guessing Rate</div>
                <div class="text-base font-bold text-emerald-600 mt-0.5 font-mono">4.1%</div>
                <div class="text-[10px] text-slate-500">Exceptional stamina</div>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg">
                <div class="text-slate-500 text-[11px]">Hard Item Accuracy</div>
                <div class="text-base font-bold text-indigo-600 mt-0.5 font-mono">81.5%</div>
                <div class="text-[10px] text-indigo-600">Top 5% Cohort</div>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg">
                <div class="text-slate-500 text-[11px]">Flagged Review Delta</div>
                <div class="text-base font-bold text-slate-800 mt-0.5 font-mono">+4 Pts</div>
                <div class="text-[10px] text-emerald-600 font-semibold">Corrected on review</div>
              </div>
            </div>
          </div>

          <!-- Priority Weakness Recommendations -->
          <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <h4 class="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2">Directorate Diagnostic Recommendations</h4>
            <ul class="text-xs text-amber-900 space-y-1.5 list-disc pl-4">
              <li><strong>Advanced Combinatorics &amp; Probability:</strong> Missed 2 consecutive high-discrimination items on Section 2. Recommend 20 targeted drills.</li>
              <li><strong>Dense Reading Comprehension Inferences:</strong> Latency peaked at 1m 45s on dual-passage analysis. Review rhetorical function flashcards.</li>
            </ul>
          </div>

          <!-- Modal Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button onclick="document.getElementById('diagnostic-report-modal').remove()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer">
              Close Report
            </button>
            <button onclick="document.getElementById('diagnostic-report-modal').remove(); openExam('${mockTitle}')" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer">
              <span>Re-attempt Similar Adaptive Test</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  // ── BUG-007: Add to Calendar (.ics download) ──
  addToCalendar(title, timeStr, mentor, venue) {
    const now = new Date();
    const startDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const formatICS = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Stackly Salem//Exam Prep Live Session//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:stackly-${Date.now()}@stackly.edu`,
      `DTSTAMP:${formatICS(now)}`,
      `DTSTART:${formatICS(startDate)}`,
      `DTEND:${formatICS(endDate)}`,
      `SUMMARY:Stackly Salem: ${title}`,
      `DESCRIPTION:Live Mentorship & Proctored Session conducted by ${mentor} on ${venue}.\\nOrganized by Stackly Salem Academic Operations.`,
      `LOCATION:${venue}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Stackly_${title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded calendar invite (.ics) for "${title}". Event added to your calendar!`);
  },

  // ── BUG-008: Join Studio Room Virtual Classroom Modal ──
  joinStudioRoom(title, mentor) {
    const existingModal = document.getElementById('studio-room-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'studio-room-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn';
    modal.innerHTML = `
      <div class="bg-slate-900 text-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-800 flex flex-col" style="height: 85vh;">
        <!-- Top Studio Bar -->
        <div class="px-6 py-3.5 bg-slate-950 flex items-center justify-between border-b border-slate-800">
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider animate-pulse">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span> LIVE STUDIO
            </span>
            <div>
              <h3 class="text-sm font-bold text-white">${title}</h3>
              <div class="text-xs text-slate-400">Faculty Host: <span class="text-indigo-400 font-semibold">${mentor}</span> • Salem Studio 4</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>342 Aspirants Online</span>
            </span>
            <button onclick="document.getElementById('studio-room-modal').remove()" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition cursor-pointer">
              Leave Room
            </button>
          </div>
        </div>

        <!-- Classroom Main Body -->
        <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
          <!-- Video Presentation Area -->
          <div class="lg:col-span-2 bg-black relative flex flex-col justify-between p-6">
            <div class="relative w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img src="./assets/images/img-1534528741775-53.webp" alt="Faculty Stream" class="w-full h-full object-cover opacity-50">
              
              <!-- Slide Preview in Center -->
              <div class="absolute inset-8 rounded-xl bg-slate-900/90 border border-slate-700 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xs">
                <div>
                  <div class="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Live Lecture Slides • Slide 14 of 42</div>
                  <h2 class="text-lg font-bold text-white mt-1">Item Discrimination &amp; High-Yield Heuristics</h2>
                  <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                    Under standard 3-parameter IRT models, questions with discrimination parameter <strong>a &gt; 1.4</strong> yield the highest score leap when solved accurately within the first 45 seconds.
                  </p>
                </div>
                <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-xs text-indigo-300">
                  θ(Score) = Σ [a_i * (u_i - P_i(θ))] / √(Information)
                </div>
              </div>

              <!-- Mentor Picture-in-Picture -->
              <div class="absolute bottom-4 right-4 w-32 h-24 rounded-xl bg-slate-800 border-2 border-indigo-500 overflow-hidden shadow-lg">
                <img src="./assets/images/img-1507003211169-0a.webp" alt="${mentor}" class="w-full h-full object-cover">
                <div class="absolute bottom-1 left-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-bold text-white">${mentor.split(' ')[0]} (Live)</div>
              </div>
            </div>

            <!-- Controls bar -->
            <div class="mt-4 flex items-center justify-center gap-3">
              <button onclick="showToast('Microphone toggled muted/unmuted.')" class="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer" title="Toggle Mic">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              </button>
              <button onclick="showToast('Webcam feed toggled.')" class="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer" title="Toggle Video">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
              </button>
              <button onclick="showToast('Hand raised! Faculty mentor notified.')" class="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer" title="Raise Hand">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
              </button>
            </div>
          </div>

          <!-- Live Chat Stream -->
          <div class="bg-slate-950 border-l border-slate-800 flex flex-col justify-between">
            <div class="p-3.5 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Live Discussion Stream</span>
              <span class="text-emerald-400 font-normal text-[11px]">Chat Active</span>
            </div>

            <!-- Messages List -->
            <div id="studio-chat-stream" class="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              <div class="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span class="font-bold text-indigo-400">Vignesh S. (Salem)</span>
                  <span>10:14 AM</span>
                </div>
                <div class="text-slate-200 mt-1">Sir, does this derivation apply to the 2026 Focus format?</div>
              </div>

              <div class="p-2.5 bg-indigo-950/60 rounded-xl border border-indigo-800/60">
                <div class="flex items-center justify-between text-[11px] text-indigo-300">
                  <span class="font-bold text-indigo-300">${mentor} (Faculty)</span>
                  <span>10:15 AM</span>
                </div>
                <div class="text-slate-200 mt-1">Yes Vignesh, exactly. It cuts data sufficiency calculation time by 30 seconds.</div>
              </div>

              <div class="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span class="font-bold text-indigo-400">Meera R. (Chennai)</span>
                  <span>10:16 AM</span>
                </div>
                <div class="text-slate-200 mt-1">Understood! Can we download this slide deck after the lecture?</div>
              </div>
            </div>

            <!-- Chat Input -->
            <form onsubmit="event.preventDefault(); const input = document.getElementById('studio-chat-input'); if(input && input.value.trim()){ const div = document.createElement('div'); div.className='p-2.5 bg-indigo-950/50 rounded-xl border border-indigo-800/50'; div.innerHTML='<div class=\\'flex items-center justify-between text-[11px] text-slate-400\\'><span class=\\'font-bold text-emerald-400\\'>You</span><span>Just now</span></div><div class=\\'text-slate-200 mt-1\\">'+input.value.trim()+'</div>'; document.getElementById('studio-chat-stream').appendChild(div); input.value=''; document.getElementById('studio-chat-stream').scrollTop = 9999; }" class="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
              <input type="text" id="studio-chat-input" placeholder="Type a message or question..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-500">
              <button type="submit" class="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  // ── BUG-009: Download PDF Resource Guide ──
  downloadPDF(title, exam) {
    const pdfDocString = `%PDF-1.4
%âãÏÓ
1 0 obj
<< /Title (${title})
   /Author (Stackly Salem Academic Research Directorate)
   /Subject (${exam} High-Yield Formula Guide)
   /Keywords (Stackly, Salem, CBT, Exam Prep, Formulas)
   /Creator (Stackly Automated Psychometric Publisher)
>>
endobj
2 0 obj
<< /Type /Catalog
   /Pages 3 0 R
>>
endobj
3 0 obj
<< /Type /Pages
   /Kids [4 0 R]
   /Count 1
>>
endobj
4 0 obj
<< /Type /Page
   /Parent 3 0 R
   /MediaBox [0 0 612 792]
   /Contents 5 0 R
   /Resources << /Font << /F1 6 0 R >> >>
>>
endobj
5 0 obj
<< /Length 420 >>
stream
BT
/F1 20 Tf
50 720 Td
(STACKLY SALEM - OFFICIAL STUDY GUIDE) Tj
/F1 12 Tf
0 -30 Td
(Document: ${title}) Tj
0 -20 Td
(Target Curriculum: ${exam}) Tj
0 -20 Td
(Certified by: Salem HQ Academic Directorate, Meyyanur Bypass, Salem) Tj
0 -30 Td
(Key Concept: High-yield derivation formulas, shortcuts, and IRT speed pacing.) Tj
0 -20 Td
(All rights reserved. (c) 2026 Stackly Salem Global Learning Platform.) Tj
ET
endstream
endobj
6 0 obj
<< /Type /Font
   /Subtype /Type1
   /BaseFont /Helvetica-Bold
>>
endobj
xref
0 7
0000000000 65535 f 
0000000015 00000 n 
0000000210 00000 n 
0000000260 00000 n 
0000000318 00000 n 
0000000438 00000 n 
0000000910 00000 n 
trailer
<< /Size 7
   /Root 2 0 R
   /Info 1 0 R
>>
startxref
985
%%EOF`;

    const blob = new Blob([pdfDocString], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Stackly_${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded "${title}" (Official Stackly PDF Study Guide).`);
  },

  render() {
    this.init();
    const el = document.getElementById('page-student-dashboard');
    if (!el) return;

    const data = window.STUDENT_DASHBOARD_DATA || {
      profile: {
        name: 'Priya Narayanan',
        targetExam: 'GRE General',
        targetScore: '335+',
        examDate: 'Oct 24, 2026',
        streak: 18,
        xp: 14250,
        currentEstimate: '331 / 340',
        readinessPercentage: 88,
        accuracyRate: 79.4,
        avgTimePerQuestion: '1m 12s',
      },
      enrolledCourses: [],
      recentMockHistory: [],
    };

    // Load active enrollments dynamically from storage (BUG-004 fix)
    const enrolledList = (typeof getEnrolledCourses === 'function' ? getEnrolledCourses() : null) || data.enrolledCourses || [];
    const displayCourses = enrolledList.map(c => ({
      id: c.id,
      title: c.title,
      thumbnail: c.thumbnail || c.bannerImg || './assets/images/img-1434030216411-0b.webp',
      instructor: c.instructor || 'Stackly Academic Faculty',
      progress: c.progress !== undefined ? c.progress : 25,
      completedHours: c.completedHours || 8,
      totalHours: c.totalHours || 48,
      nextLesson: c.nextLesson || 'Module 2: Cognitive Shortcuts & Item Response Drills',
      lastActive: c.lastActive || 'Just Now'
    }));

    // Notifications from Salem Admin (BUG-012 recipient)
    const notifications = typeof getStudentNotifications === 'function' ? getStudentNotifications() : [];

    const resources = window.HIGH_YIELD_RESOURCES || [];
    const profile = data.profile;
    const pendingErrorsCount = this.errorItems.filter(e => !e.resolved).length;

    const tabs = [
      { id: 'overview', label: 'Overview & Learning Roadmap', icon: 'BookOpen' },
      { id: 'mocks', label: 'My Mocks & Score History', icon: 'BarChart3' },
      { id: 'errorLog', label: 'Cognitive Error Matrix', icon: 'AlertTriangle', badge: `${pendingErrorsCount} Pending` },
      { id: 'schedule', label: 'Live Mentorship & Classes', icon: 'Calendar' },
      { id: 'resources', label: 'High-Yield Formula Vault', icon: 'Download' },
    ];

    let tabContentHTML = '';

    if (this.activeTab === 'overview') {
      tabContentHTML = `
        <div class="space-y-8">
          <!-- Salem HQ Academic Notices & Directives (BUG-012 recipient) -->
          ${notifications.length > 0 ? `
            <div class="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 shadow-xs">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                  <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-950 font-display">Faculty &amp; Academic Directorate Notices</h3>
                </div>
                <span class="text-[11px] text-indigo-700 font-semibold">${notifications.length} Active Directives</span>
              </div>
              <div class="space-y-2.5">
                ${notifications.slice(0, 2).map(n => `
                  <div class="p-3 bg-white rounded-xl border border-indigo-100 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900">${n.title}</span>
                        <span class="px-2 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">${n.type}</span>
                      </div>
                      <p class="text-slate-600 mt-1 leading-relaxed">${n.message}</p>
                      <div class="text-[10px] text-slate-400 mt-1">Dispatched by ${n.author} • ${n.date}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div>
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-lg font-bold text-slate-900 font-display">Active Enrolled Curricula</h2>
                <p class="text-xs text-slate-500">Pick up right where you left off in your structured curriculum.</p>
              </div>
              <button onclick="navigate('courses')" class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer">
                <span>Browse All Courses</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${displayCourses.map(course => `
                <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-4 mb-4">
                      <img src="${course.thumbnail}" alt="${course.title}" class="w-20 h-20 rounded-xl object-cover shrink-0 shadow-xs">
                      <div>
                        <span class="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">Masterclass Pass</span>
                        <h3 class="text-sm font-bold text-slate-900 mt-0.5 leading-snug">${course.title}</h3>
                        <div class="text-xs text-slate-500 mt-1">Faculty: <strong class="text-slate-700">${course.instructor}</strong></div>
                      </div>
                    </div>

                    <div class="space-y-2 mb-4">
                      <div class="flex justify-between text-xs font-medium">
                        <span class="text-slate-600">Course Completion:</span>
                        <span class="text-slate-900 font-bold">${course.progress}%</span>
                      </div>
                      <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div class="bg-indigo-600 h-full rounded-full transition-all duration-500" style="width: ${course.progress}%"></div>
                      </div>
                      <div class="flex justify-between text-[11px] text-slate-500">
                        <span>${course.completedHours}h completed</span>
                        <span>${course.totalHours}h total syllabus</span>
                      </div>
                    </div>

                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-4 text-xs">
                      <div class="text-[11px] text-slate-500 font-semibold uppercase">Next Module in Queue:</div>
                      <div class="font-semibold text-slate-800 mt-0.5">${course.nextLesson}</div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span class="text-[11px] text-slate-500">Active: ${course.lastActive}</span>
                    <button onclick="StudentDashboardModule.resumeLesson('${course.id}')"
                      class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      <span>Resume Lesson</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Diagnostic Matrix -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-base font-bold text-slate-900 font-display">Adaptive Item Response Diagnostic Matrix</h3>
                <p class="text-xs text-slate-500">Calculated by Stackly IRT Engine based on question discrimination and response speed.</p>
              </div>
              <button onclick="openExam()" class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer">
                <span>Recalibrate Baseline</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs font-bold text-slate-900">Quantitative Reasoning</span>
                  <span class="text-xs font-bold text-indigo-600">168 / 170</span>
                </div>
                <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
                  <div class="bg-indigo-600 h-full rounded-full" style="width: 98%"></div>
                </div>
                <div class="space-y-1 text-xs text-slate-600">
                  <div class="flex justify-between"><span>Algebra &amp; Arithmetic:</span><span class="font-semibold text-emerald-600">99% (Mastered)</span></div>
                  <div class="flex justify-between"><span>Geometry &amp; 3D Planes:</span><span class="font-semibold text-amber-600">88% (Needs Drill)</span></div>
                  <div class="flex justify-between"><span>Data Interpretation:</span><span class="font-semibold text-emerald-600">95% (Strong)</span></div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs font-bold text-slate-900">Verbal Reasoning</span>
                  <span class="text-xs font-bold text-indigo-600">164 / 170</span>
                </div>
                <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
                  <div class="bg-indigo-600 h-full rounded-full" style="width: 91%"></div>
                </div>
                <div class="space-y-1 text-xs text-slate-600">
                  <div class="flex justify-between"><span>Reading Comprehension:</span><span class="font-semibold text-emerald-600">94% (Strong)</span></div>
                  <div class="flex justify-between"><span>Text Completion:</span><span class="font-semibold text-emerald-600">92% (Strong)</span></div>
                  <div class="flex justify-between"><span>Sentence Equivalence:</span><span class="font-semibold text-amber-600">86% (Needs Drill)</span></div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs font-bold text-slate-900">Analytical Writing (AWA)</span>
                  <span class="text-xs font-bold text-indigo-600">5.5 / 6.0</span>
                </div>
                <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
                  <div class="bg-indigo-600 h-full rounded-full" style="width: 92%"></div>
                </div>
                <div class="space-y-1 text-xs text-slate-600">
                  <div class="flex justify-between"><span>Thesis Coherence:</span><span class="font-semibold text-emerald-600">96% (Elite)</span></div>
                  <div class="flex justify-between"><span>Counterargument Rebuttal:</span><span class="font-semibold text-emerald-600">92% (Strong)</span></div>
                  <div class="flex justify-between"><span>Grammar &amp; Stylistics:</span><span class="font-semibold text-emerald-600">98% (Mastered)</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'mocks') {
      tabContentHTML = `
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-slate-900 font-display">Completed Mock Test History</h2>
              <p class="text-xs text-slate-500">Every simulation is archived with item-level latency and percentile rankings.</p>
            </div>
            <button onclick="openExam()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Start New Proctored Simulation</span>
            </button>
          </div>

          <div class="space-y-4">
            ${(data.recentMockHistory || []).map(mock => `
              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-xs">
                    ${mock.score.split('/')[0].trim()}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h4 class="text-sm font-bold text-slate-900">${mock.title}</h4>
                      <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">${mock.percentile}</span>
                    </div>
                    <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span>Date: <strong class="text-slate-700">${mock.date}</strong></span>
                      <span>•</span>
                      <span>Duration: <strong class="text-slate-700">${mock.duration}</strong></span>
                      ${mock.quantScore && mock.quantScore !== '—' ? `<span>•</span><span>Quant: <strong class="text-indigo-600">${mock.quantScore}</strong></span>` : ''}
                      ${mock.verbalScore && mock.verbalScore !== '—' ? `<span>•</span><span>Verbal: <strong class="text-indigo-600">${mock.verbalScore}</strong></span>` : ''}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 sm:self-center">
                  <button onclick="StudentDashboardModule.viewReport('${mock.title.replace(/'/g, "\\'")}')"
                    class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer">
                    View Report
                  </button>
                  <button onclick="openExam('${mock.title.replace(/'/g, "\\'")}')"
                    class="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl border border-indigo-200 transition cursor-pointer">
                    Re-attempt Similar
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (this.activeTab === 'errorLog') {
      tabContentHTML = `
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-slate-900 font-display">Personalized Cognitive Error Log</h2>
              <p class="text-xs text-slate-500">Targeted analysis of questions answered incorrectly or guessed under time panic.</p>
            </div>
            <div class="text-xs font-semibold text-slate-600 flex items-center gap-2">
              <span>Total Flagged: <strong>${this.errorItems.length}</strong></span>
              <span>•</span>
              <span class="text-emerald-600">Resolved: <strong>${this.errorItems.filter(e => e.resolved).length}</strong></span>
            </div>
          </div>

          <div class="space-y-3">
            ${this.errorItems.map(err => `
              <div class="p-5 rounded-2xl border transition-all ${err.resolved ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-amber-200 shadow-xs ring-1 ring-amber-100'}">
                <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div class="space-y-1.5 flex-1">
                    <div class="flex flex-wrap items-center gap-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${err.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                        ${err.difficulty} Difficulty
                      </span>
                      <span class="text-xs font-semibold text-indigo-600">${err.topic}</span>
                      <span class="text-[11px] text-slate-500">• Added ${err.dateAdded}</span>
                    </div>
                    <h4 class="text-sm font-bold text-slate-900 font-display">${err.question}</h4>
                    <div class="text-xs text-amber-800 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200/60 inline-block font-medium">
                      Root Deficit: <strong>${err.errorType}</strong>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <button onclick="StudentDashboardModule.toggleResolve('${err.id}')"
                      class="px-3 py-1.5 text-xs font-semibold rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${err.resolved ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span>${err.resolved ? 'Resolved' : 'Mark Resolved'}</span>
                    </button>
                    <button onclick="openExam()" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer">
                      Drill This Concept
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (this.activeTab === 'schedule') {
      tabContentHTML = `
        <div class="space-y-6">
          <div>
            <h2 class="text-lg font-bold text-slate-900 font-display">Upcoming Live Sessions &amp; Proctored Tests</h2>
            <p class="text-xs text-slate-500">Connect with Salem faculty via high-speed direct streams or attend national mocks.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${(data.upcomingEvents || []).map(ev => `
              <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">${ev.type}</span>
                    <span class="text-xs text-slate-500 font-medium">${ev.time}</span>
                  </div>
                  <h3 class="text-base font-bold text-slate-900 mb-2">${ev.title}</h3>
                  <div class="text-xs text-slate-600 space-y-1 mb-4">
                    <div>Host/Mentor: <strong class="text-slate-800">${ev.mentor}</strong></div>
                    <div>Venue: <strong class="text-slate-800">${ev.platform}</strong></div>
                  </div>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button onclick="StudentDashboardModule.addToCalendar('${ev.title.replace(/'/g, "\\'")}', '${ev.time.replace(/'/g, "\\'")}', '${ev.mentor.replace(/'/g, "\\'")}', '${ev.platform.replace(/'/g, "\\'")}')" class="text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer">
                    Add to Calendar
                  </button>
                  <button onclick="StudentDashboardModule.joinStudioRoom('${ev.title.replace(/'/g, "\\'")}', '${ev.mentor.replace(/'/g, "\\'")}')"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/></svg>
                    <span>Join Studio Room</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 class="text-sm font-bold text-indigo-950">Need an unscheduled 1-on-1 Strategy Review?</h4>
              <p class="text-xs text-indigo-700 mt-0.5">Book a direct 20-minute session with Stackly Salem campus academic directors.</p>
            </div>
            <button onclick="navigate('contact')" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition shrink-0 cursor-pointer">
              Schedule with Faculty
            </button>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'resources') {
      tabContentHTML = `
        <div class="space-y-6">
          <div>
            <h2 class="text-lg font-bold text-slate-900 font-display">Study Vault &amp; Download Center</h2>
            <p class="text-xs text-slate-500">Authoritative cheat sheets and mental shortcuts prepared by Stackly researchers.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${resources.map(res => `
              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-3 text-xs">
                    <span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">${res.exam}</span>
                    <span class="text-slate-500">${res.format}</span>
                  </div>
                  <h4 class="text-sm font-bold text-slate-900 mb-2 leading-snug">${res.title}</h4>
                  <p class="text-xs text-slate-600 mb-4">${res.description}</p>
                </div>

                <div>
                  <div class="text-[11px] text-slate-500 mb-3">Downloads: <span class="text-slate-800 font-semibold">${res.downloads}</span></div>
                  <button onclick="StudentDashboardModule.downloadPDF('${res.title.replace(/'/g, "\\'")}', '${res.exam.replace(/'/g, "\\'")}')"
                    class="w-full py-2 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    el.innerHTML = `
      <div class="w-full bg-slate-50 min-h-screen text-slate-900 pb-24">
        <!-- Student Header -->
        <section class="bg-white border-b border-slate-200/80 pt-8 pb-8 shadow-xs" id="student-header">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <img src="${(AppState.user && AppState.user.avatar) || './assets/images/img-1534528741775-53.webp'}"
                    alt="Student Avatar" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-md">
                  <div class="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-white rounded-full text-[10px] ring-2 ring-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h1 class="text-2xl font-bold text-slate-900 font-display">${(AppState.user && AppState.user.name) || profile.name}</h1>
                    <span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
                      ${(AppState.user && AppState.user.targetExam) || profile.targetExam} Aspirant
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1">
                    Target Score: <strong class="text-slate-800">${profile.targetScore}</strong> • Exam Date: <strong class="text-slate-800">${profile.examDate}</strong> • Salem HQ Center Pass
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#d97706" stroke="#b45309" stroke-width="1"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                  <div class="text-left">
                    <div class="text-xs font-bold leading-none">${(AppState.user && AppState.user.streakDays) || profile.streak} Days</div>
                    <div class="text-[10px] text-amber-700 leading-none mt-0.5">Study Streak</div>
                  </div>
                </div>

                <div class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#4f46e5" stroke="#4338ca" stroke-width="1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <div class="text-left">
                    <div class="text-xs font-bold leading-none">${((AppState.user && AppState.user.xpPoints) || profile.xp).toLocaleString()} XP</div>
                    <div class="text-[10px] text-indigo-700 leading-none mt-0.5">Cognitive Points</div>
                  </div>
                </div>

                <button onclick="openExam()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center gap-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <span>Launch Timed Mock</span>
                </button>
              </div>
            </div>

            <!-- Quick Metrics Bar -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 uppercase font-semibold">Current Predicted Score</div>
                <div class="text-xl font-bold text-slate-900 mt-1">${(AppState.user && AppState.user.predictedScore) || profile.currentEstimate}</div>
                <div class="text-[11px] text-emerald-600 font-medium mt-0.5">↑ +14 points above baseline</div>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 uppercase font-semibold">Test-Day Readiness</div>
                <div class="text-xl font-bold text-indigo-600 mt-1">${profile.readinessPercentage}%</div>
                <div class="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div class="bg-indigo-600 h-full rounded-full" style="width: ${profile.readinessPercentage}%"></div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 uppercase font-semibold">Average Accuracy Rate</div>
                <div class="text-xl font-bold text-slate-900 mt-1">${profile.accuracyRate}%</div>
                <div class="text-[11px] text-slate-500 mt-0.5">Over last 420 questions</div>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 uppercase font-semibold">Response Velocity</div>
                <div class="text-xl font-bold text-slate-900 mt-1">${profile.avgTimePerQuestion}</div>
                <div class="text-[11px] text-indigo-600 font-medium mt-0.5">18s faster than test pace</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Navigation Tabs -->
        <div class="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center gap-2 overflow-x-auto py-2.5 text-xs font-semibold scrollbar-none">
              ${tabs.map(tab => `
                <button onclick="StudentDashboardModule.setTab('${tab.id}')"
                  class="px-4 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-2 cursor-pointer ${this.activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
                  <span>${tab.label}</span>
                  ${tab.badge ? `
                    <span class="text-[10px] px-1.5 py-0.2 rounded-full font-bold ${this.activeTab === tab.id ? 'bg-indigo-700 text-white' : 'bg-rose-100 text-rose-700'}">
                      ${tab.badge}
                    </span>
                  ` : ''}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Tab Content -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          ${tabContentHTML}
        </section>
      </div>
    `;
  }
};

function render_student_dashboard() {
  StudentDashboardModule.render();
}

window.StudentDashboardModule = StudentDashboardModule;
window.render_student_dashboard = render_student_dashboard;
