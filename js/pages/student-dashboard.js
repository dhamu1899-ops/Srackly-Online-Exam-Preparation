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
              ${(data.enrolledCourses || []).map(course => `
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
                    <button onclick="showToast('Resuming &quot;${course.title.replace(/'/g, "\\'")}&quot;. Opening video lecture module...')"
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
                  <button onclick="showToast('Loading detailed analysis report for ${mock.title.replace(/'/g, "\\'")}...')"
                    class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer">
                    View Report
                  </button>
                  <button onclick="openExam()"
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
                  <button onclick="showToast('Confirmed! Added to Google/Apple Calendar.')" class="text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer">
                    Add to Calendar
                  </button>
                  <button onclick="showToast('Entering virtual classroom lobby for &quot;${ev.title.replace(/'/g, "\\'")}&quot;...')"
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
                  <button onclick="showToast('Downloaded &quot;${res.title.replace(/'/g, "\\'")}&quot; successfully!')"
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
                  <img src="./assets/images/img-1534528741775-53.webp"
                    alt="Student Avatar" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-md">
                  <div class="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-white rounded-full text-[10px] ring-2 ring-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>

                <div>
                  <div class="flex items-center gap-2">
                    <h1 class="text-2xl font-bold text-slate-900 font-display">Welcome, ${profile.name}</h1>
                    <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                      Top 1% Track
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                    <span>Target: <strong class="text-slate-800">${profile.targetExam}</strong> (${profile.targetScore})</span>
                    <span>•</span>
                    <span>Exam Date: <strong class="text-slate-800">${profile.examDate}</strong></span>
                    <span>•</span>
                    <span class="text-indigo-600 font-medium">Stackly Salem Campus Enrolled</span>
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#d97706" stroke="#b45309" stroke-width="1"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                  <div class="text-left">
                    <div class="text-xs font-bold leading-none">${profile.streak} Days</div>
                    <div class="text-[10px] text-amber-700 leading-none mt-0.5">Study Streak</div>
                  </div>
                </div>

                <div class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#4f46e5" stroke="#4338ca" stroke-width="1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <div class="text-left">
                    <div class="text-xs font-bold leading-none">${profile.xp.toLocaleString()} XP</div>
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
                <div class="text-xl font-bold text-slate-900 mt-1">${profile.currentEstimate}</div>
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
