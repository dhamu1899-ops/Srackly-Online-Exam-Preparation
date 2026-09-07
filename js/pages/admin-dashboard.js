// ============================================================
// STACKLY SALEM — Admin Dashboard Component (Operations Cockpit)
// ============================================================

const AdminDashboardModule = {
  activeTab: 'proctor',
  searchQuery: '',
  selectedExamFilter: 'All',
  liveSessions: [],
  questionList: [],
  showAddModal: false,

  // New Question Form state
  newQuestionTopic: '',
  newQuestionExam: 'GRE',
  newQuestionDiff: 'Medium',

  init() {
    const data = window.ADMIN_DASHBOARD_DATA;
    if (data) {
      if (!this.liveSessions || this.liveSessions.length === 0) {
        this.liveSessions = JSON.parse(JSON.stringify(data.liveExams || []));
      }
      if (!this.questionList || this.questionList.length === 0) {
        this.questionList = JSON.parse(JSON.stringify(data.questionBankSummary || []));
      }
    }
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  setExamFilter(filter) {
    this.selectedExamFilter = filter;
    this.render();
  },

  setSearch(q) {
    this.searchQuery = q;
    this.render();
  },

  pauseSession(sessionId) {
    showToast(`Session ${sessionId} has been paused by Salem Proctor Admin.`);
  },

  flagSession(sessionId) {
    this.liveSessions = this.liveSessions.map(s =>
      s.sessionId === sessionId
        ? { ...s, antiCheatStatus: 'FLAGGED - Proctor Investigating' }
        : s
    );
    showToast(`Session ${sessionId} flagged for manual screen & audio review.`);
    this.render();
  },

  addQuestion(e) {
    e.preventDefault();
    if (!this.newQuestionTopic.trim()) return;

    const newItem = {
      id: `QB-${this.newQuestionExam}-Q${Math.floor(100 + Math.random() * 900)}`,
      exam: this.newQuestionExam,
      topic: this.newQuestionTopic,
      difficulty: `${this.newQuestionDiff} (b=0.85)`,
      discrimination: 'High (a=1.35)',
      accuracy: '54.0%',
      attempts: 0,
      status: 'Active Calibrated',
    };

    this.questionList.unshift(newItem);
    this.newQuestionTopic = '';
    this.showAddModal = false;
    showToast(`Item ${newItem.id} added to Stackly Question Bank.`);
    this.render();
  },

  render() {
    this.init();
    const el = document.getElementById('page-admin-dashboard');
    if (!el) return;

    const data = window.ADMIN_DASHBOARD_DATA || {
      kpis: {
        totalStudents: 14280,
        activeExamsToday: 3410,
        totalQuestions: 25400,
        platformRevenue: '$84,200',
        avgAccuracyPercent: 78.4,
      },
      studentRoster: [],
      systemNodes: [],
    };
    const kpis = data.kpis;

    const filteredSessions = this.liveSessions.filter(s =>
      this.selectedExamFilter === 'All' || s.exam.includes(this.selectedExamFilter)
    );

    const filteredQuestions = this.questionList.filter(q =>
      !this.searchQuery ||
      q.topic.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      q.id.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const tabs = [
      { id: 'proctor', label: 'Live Proctored Sessions', count: this.liveSessions.length },
      { id: 'qbank', label: 'Question Bank & IRT Calibration', count: this.questionList.length },
      { id: 'students', label: 'Candidate Roster & Analytics', count: (data.studentRoster || []).length },
      { id: 'cluster', label: 'Salem HQ Infrastructure Nodes', count: (data.systemNodes || []).length },
    ];

    let tabContentHTML = '';

    if (this.activeTab === 'proctor') {
      tabContentHTML = `
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-slate-900 font-display">Active Timed Exam Monitoring</h2>
              <p class="text-xs text-slate-500">Real-time candidate telemetry with automated browser lockdown and AI gaze analysis.</p>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500">Filter:</span>
              <select onchange="AdminDashboardModule.setExamFilter(this.value)"
                class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                <option value="All" ${this.selectedExamFilter === 'All' ? 'selected' : ''}>All Examinations</option>
                <option value="GRE" ${this.selectedExamFilter === 'GRE' ? 'selected' : ''}>GRE General</option>
                <option value="SAT" ${this.selectedExamFilter === 'SAT' ? 'selected' : ''}>Digital SAT</option>
                <option value="GATE" ${this.selectedExamFilter === 'GATE' ? 'selected' : ''}>GATE CS</option>
                <option value="MCAT" ${this.selectedExamFilter === 'MCAT' ? 'selected' : ''}>MCAT Medical</option>
              </select>
            </div>
          </div>

          <div class="overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th class="py-3.5 px-4">Session &amp; Candidate</th>
                    <th class="py-3.5 px-4">Exam &amp; Track</th>
                    <th class="py-3.5 px-4">Section &amp; Progress</th>
                    <th class="py-3.5 px-4">Time Spent</th>
                    <th class="py-3.5 px-4">Anti-Cheat Feed</th>
                    <th class="py-3.5 px-4 text-right">Proctor Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${filteredSessions.map(session => `
                    <tr class="hover:bg-slate-50/80 transition">
                      <td class="py-3.5 px-4">
                        <div class="font-bold text-slate-900">${session.studentName}</div>
                        <div class="text-[11px] text-slate-400 font-mono">${session.sessionId} • ${session.ipLocation}</div>
                      </td>

                      <td class="py-3.5 px-4">
                        <span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-[11px]">
                          ${session.exam}
                        </span>
                      </td>

                      <td class="py-3.5 px-4">
                        <div class="font-medium text-slate-800">${session.currentSection}</div>
                        <div class="text-[11px] text-slate-500">${session.questionsDone} items completed</div>
                      </td>

                      <td class="py-3.5 px-4 text-slate-700 font-mono">
                        ${session.timeElapsed}
                      </td>

                      <td class="py-3.5 px-4">
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${session.antiCheatStatus.includes('FLAGGED') ? 'bg-rose-100 text-rose-800 border-rose-300' : session.antiCheatStatus.includes('Lost') ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-emerald-50 text-emerald-800 border-emerald-300'}">
                          ${session.antiCheatStatus}
                        </span>
                      </td>

                      <td class="py-3.5 px-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <button onclick="showToast('Opening live webcam &amp; audio feed for ${session.studentName}...')"
                            class="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer" title="Inspect Live Video">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                          <button onclick="AdminDashboardModule.pauseSession('${session.sessionId}')"
                            class="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer" title="Pause Session">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          </button>
                          <button onclick="AdminDashboardModule.flagSession('${session.sessionId}')"
                            class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer" title="Flag Anomaly">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'qbank') {
      tabContentHTML = `
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-slate-900 font-display">Item Response Theory (IRT) Calibrated Bank</h2>
              <p class="text-xs text-slate-500">Every test item is calibrated with psychometric difficulty (b) and discrimination (a) indexes.</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Search by topic or code..."
                  value="${this.searchQuery}" oninput="AdminDashboardModule.setSearch(this.value)"
                  class="pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 w-48 sm:w-64">
              </div>

              <button onclick="AdminDashboardModule.showAddModal = true; AdminDashboardModule.render()"
                class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>New Item</span>
              </button>
            </div>
          </div>

          <div class="overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th class="py-3.5 px-4">Item Code</th>
                    <th class="py-3.5 px-4">Exam</th>
                    <th class="py-3.5 px-4">Topic / Domain</th>
                    <th class="py-3.5 px-4">IRT Difficulty (b)</th>
                    <th class="py-3.5 px-4">Discrimination (a)</th>
                    <th class="py-3.5 px-4">Accuracy</th>
                    <th class="py-3.5 px-4">Attempts</th>
                    <th class="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${filteredQuestions.map(item => `
                    <tr class="hover:bg-slate-50/80 transition">
                      <td class="py-3.5 px-4 font-mono font-bold text-slate-800">${item.id}</td>
                      <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[11px]">${item.exam}</span></td>
                      <td class="py-3.5 px-4 font-semibold text-slate-900">${item.topic}</td>
                      <td class="py-3.5 px-4 font-mono text-slate-700">${item.difficulty}</td>
                      <td class="py-3.5 px-4 font-mono text-slate-700">${item.discrimination}</td>
                      <td class="py-3.5 px-4 font-semibold text-indigo-600">${item.accuracy}</td>
                      <td class="py-3.5 px-4 text-slate-500 font-mono">${item.attempts.toLocaleString()}</td>
                      <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">${item.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'students') {
      tabContentHTML = `
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-slate-900 font-display">Student Roster &amp; Diagnostic Standings</h2>
              <p class="text-xs text-slate-500">Track candidate progression from initial baseline to final target score.</p>
            </div>
            <button onclick="showToast('Exporting student roster to encrypted CSV for Salem academic audits...')"
              class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition cursor-pointer">
              Export Cohort Data
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${(data.studentRoster || []).map(stu => `
              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span class="text-[10px] font-mono text-slate-400 uppercase">${stu.id}</span>
                      <h4 class="text-base font-bold text-slate-900">${stu.name}</h4>
                      <div class="text-xs text-slate-500">${stu.email}</div>
                    </div>
                    <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-semibold">${stu.exam}</span>
                  </div>

                  <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 space-y-1.5 text-xs">
                    <div class="flex justify-between"><span class="text-slate-500">Enrolled Track:</span><span class="font-semibold text-slate-800">${stu.enrolledCourse}</span></div>
                    <div class="flex justify-between"><span class="text-slate-500">Latest Diagnostic Score:</span><span class="font-bold text-emerald-600">${stu.diagnosticScore}</span></div>
                    <div class="flex justify-between"><span class="text-slate-500">Full Mocks Completed:</span><span class="font-bold text-slate-800">${stu.mocksTaken} Tests</span></div>
                    <div class="flex justify-between"><span class="text-slate-500">Registered:</span><span class="text-slate-600">${stu.registeredDate}</span></div>
                  </div>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-xs font-semibold text-indigo-600">${stu.status}</span>
                  <button onclick="showToast('Sent personalized academic progress notice to ${stu.name}.')"
                    class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer">
                    Send Notice
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (this.activeTab === 'cluster') {
      tabContentHTML = `
        <div class="space-y-6">
          <div>
            <h2 class="text-lg font-bold text-slate-900 font-display">Stackly Salem Infrastructure Cluster</h2>
            <p class="text-xs text-slate-500">Primary computing nodes hosted at Stackly Tech Park, Meyyanur Bypass, Salem, Tamil Nadu.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${(data.systemNodes || []).map((node, i) => `
              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                    <h4 class="text-sm font-bold text-slate-900">${node.name}</h4>
                  </div>
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>

                <div class="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>Status: <strong class="text-emerald-700">${node.status}</strong></span>
                  <span>Compute Load: <strong class="text-slate-900">${node.load}</strong></span>
                </div>

                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-indigo-600 h-full rounded-full" style="width: ${node.load}"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="p-6 rounded-2xl bg-slate-900 text-white shadow-md">
            <div class="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              <h3 class="text-sm font-bold font-display">Stackly High-Availability Architecture</h3>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed max-w-3xl">
              The Stackly exam engine is engineered in Salem with zero-downtime replication across South Asia, North America, and European edge points. Auto-scaling guarantees consistent sub-30ms test latency even during high-stakes national mocks with 50,000+ simultaneous test submissions.
            </p>
          </div>
        </div>
      `;
    }

    el.innerHTML = `
      <div class="w-full bg-slate-50 min-h-screen text-slate-900 pb-24">
        <!-- Admin Operations Header -->
        <section class="bg-white border-b border-slate-200/80 pt-8 pb-8 shadow-xs" id="admin-header">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                    ADMIN CONSOLE
                  </span>
                  <span class="text-xs text-slate-500 font-medium">Stackly Academic Engine • Salem HQ</span>
                </div>
                <h1 class="text-2xl font-bold text-slate-900 font-display mt-1">
                  Central Operations &amp; Proctoring Cockpit
                </h1>
                <p class="text-xs text-slate-500 mt-0.5">
                  Monitoring 3,400+ concurrent proctored simulations across international test centers.
                </p>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Salem Core Cluster: 99.98% Live</span>
                </div>

                <button onclick="showToast('Syncing all global IRT engine nodes with Salem Central...')"
                  class="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition cursor-pointer" title="Refresh Metrics">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
                </button>

                <button onclick="navigate('student-dashboard')"
                  class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer" title="Switch to Student Dashboard View">
                  <span>Student View</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>

                <button onclick="AdminDashboardModule.showAddModal = true; AdminDashboardModule.render()"
                  class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Add Test Item</span>
                </button>
              </div>
            </div>

            <!-- KPI Matrix -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 pt-6 border-t border-slate-100">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Total Scholars</div>
                <div class="text-xl font-bold text-slate-900 mt-1">${kpis.totalStudents.toLocaleString()}</div>
                <div class="text-[10px] text-emerald-600 font-semibold mt-0.5">+1,240 this week</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Active Exams Now</div>
                <div class="text-xl font-bold text-indigo-600 mt-1">${kpis.activeExamsToday.toLocaleString()}</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Live proctor feeds</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Calibrated Items</div>
                <div class="text-xl font-bold text-slate-900 mt-1">${kpis.totalQuestions.toLocaleString()}</div>
                <div class="text-[10px] text-slate-500 mt-0.5">IRT b &amp; a parameters</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Course Revenue</div>
                <div class="text-xl font-bold text-emerald-600 mt-1">${kpis.platformRevenue}</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Sept 2026 MTD</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Overall Accuracy</div>
                <div class="text-xl font-bold text-slate-900 mt-1">${kpis.avgAccuracyPercent}%</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Target: 75% - 82%</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div class="text-[11px] text-slate-500 font-semibold uppercase">Questions / Day</div>
                <div class="text-xl font-bold text-slate-900 mt-1">624.5k</div>
                <div class="text-[10px] text-indigo-600 font-semibold mt-0.5">High server load</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Admin Tabs -->
        <div class="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center gap-2 overflow-x-auto py-2.5 text-xs font-semibold scrollbar-none">
              ${tabs.map(tab => `
                <button onclick="AdminDashboardModule.setTab('${tab.id}')"
                  class="px-4 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-2 cursor-pointer ${this.activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
                  <span>${tab.label}</span>
                  <span class="text-[10px] px-1.5 py-0.2 rounded-full font-bold ${this.activeTab === tab.id ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'}">
                    ${tab.count}
                  </span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Tab Content Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          ${tabContentHTML}
        </section>

        <!-- Add Question Modal -->
        ${this.showAddModal ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div class="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
              <h3 class="text-base font-bold text-slate-900 mb-1 font-display">Add New Psychometric Test Item</h3>
              <p class="text-xs text-slate-500 mb-4">Enter question parameters to calibrate against Stackly IRT models.</p>

              <form onsubmit="AdminDashboardModule.addQuestion(event)" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Examination</label>
                  <select onchange="AdminDashboardModule.newQuestionExam = this.value"
                    class="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                    <option value="GRE">GRE General</option>
                    <option value="GMAT">GMAT Focus</option>
                    <option value="MCAT">MCAT Medical</option>
                    <option value="SAT">Digital SAT</option>
                    <option value="GATE">GATE Tech</option>
                    <option value="IELTS">IELTS English</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Domain / Topic</label>
                  <input type="text" required placeholder="e.g. Permutations &amp; Combinations"
                    value="${this.newQuestionTopic}" oninput="AdminDashboardModule.newQuestionTopic = this.value"
                    class="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Target Difficulty</label>
                  <select onchange="AdminDashboardModule.newQuestionDiff = this.value"
                    class="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                    <option value="Easy">Easy (b = -1.2 to -0.5)</option>
                    <option value="Medium" selected>Medium (b = 0.0 to 0.8)</option>
                    <option value="Hard">Hard (b = 1.2 to 2.2)</option>
                    <option value="Mastery">Mastery (b &gt; 2.2)</option>
                  </select>
                </div>

                <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onclick="AdminDashboardModule.showAddModal = false; AdminDashboardModule.render()"
                    class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer">
                    Save to Bank
                  </button>
                </div>
              </form>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
};

function render_admin_dashboard() {
  AdminDashboardModule.render();
}

window.AdminDashboardModule = AdminDashboardModule;
window.render_admin_dashboard = render_admin_dashboard;
