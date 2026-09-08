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

  // ── BUG-010: Inspect Live Video Proctoring Modal ──
  inspectLiveFeed(sessionId, studentName, exam) {
    const existing = document.getElementById('live-proctor-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'live-proctor-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn';
    modal.innerHTML = `
      <div class="bg-slate-900 text-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-800 flex flex-col" style="max-height: 90vh;">
        <!-- Header -->
        <div class="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span> LIVE PROCTOR FEED
            </span>
            <div>
              <h3 class="text-sm font-bold text-white">${studentName} <span class="text-xs text-slate-400 font-mono">(${sessionId})</span></h3>
              <div class="text-xs text-slate-400">${exam} • Salem CBT Examination Terminal 08</div>
            </div>
          </div>
          <button onclick="document.getElementById('live-proctor-modal').remove()" class="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Video Grids -->
        <div class="p-6 overflow-y-auto space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Primary Web Camera with AI bounding box -->
            <div class="relative bg-black rounded-xl overflow-hidden aspect-4/3 border border-slate-700 flex items-center justify-center">
              <img src="./assets/images/img-1534528741775-53.webp" alt="${studentName}" class="w-full h-full object-cover">
              
              <!-- AI Facial tracking box -->
              <div class="absolute inset-12 border-2 border-emerald-400/80 rounded-lg pointer-events-none flex flex-col justify-between p-1.5">
                <span class="text-[9px] bg-emerald-500 text-black font-mono font-bold px-1 rounded self-start">FACE CONFIRMED (99.4%)</span>
                <span class="text-[9px] bg-black/80 text-emerald-400 font-mono px-1 rounded self-end">GAZE: ON-SCREEN</span>
              </div>

              <div class="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Camera 1: Primary Facial Angle</span>
              </div>
            </div>

            <!-- Secondary Room / Screen Mirror -->
            <div class="relative bg-slate-950 rounded-xl overflow-hidden aspect-4/3 border border-slate-700 p-4 flex flex-col justify-between">
              <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Display Mirror: Terminal 08</span>
                <span class="text-emerald-400">Lockdown Browser Active</span>
              </div>

              <div class="p-4 bg-slate-900/90 rounded-lg border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
                <div class="text-indigo-400 font-bold">Active Question: 18 of 40</div>
                <div>Section: Quantitative Problem Solving</div>
                <div>Remaining Time: 42m 18s</div>
                <div>Full-Screen Violations: 0</div>
                <div>External Monitors: None Detected</div>
              </div>

              <div class="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span>Audio Waveform: Normal (24 dB Ambient)</span>
                </div>
                <span class="text-emerald-400 font-bold">STABLE</span>
              </div>
            </div>
          </div>

          <!-- Telemetry & Proctor Diagnostics -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <div class="text-slate-400 text-[11px]">Multiple Faces</div>
              <div class="text-base font-bold text-emerald-400 mt-0.5">0 (None)</div>
              <div class="text-[10px] text-slate-400">Single candidate verified</div>
            </div>
            <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <div class="text-slate-400 text-[11px]">Audio Anomaly</div>
              <div class="text-base font-bold text-emerald-400 mt-0.5">Clean</div>
              <div class="text-[10px] text-slate-400">No background speech</div>
            </div>
            <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <div class="text-slate-400 text-[11px]">Tab Blur Count</div>
              <div class="text-base font-bold text-emerald-400 mt-0.5">0 Events</div>
              <div class="text-[10px] text-slate-400">Continuous focus</div>
            </div>
            <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <div class="text-slate-400 text-[11px]">Biometric Score</div>
              <div class="text-base font-bold text-indigo-400 mt-0.5">99.8 / 100</div>
              <div class="text-[10px] text-emerald-400">Integrity High</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <div class="flex items-center gap-2">
              <button onclick="showToast('Audio warning chime transmitted to ${studentName}.')" class="px-3 py-1.5 bg-amber-600/90 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold transition cursor-pointer">
                Issue Audio Warning
              </button>
              <button onclick="showToast('360 degree environment scan requested on candidate device.')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer">
                Request Room Scan
              </button>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="AdminDashboardModule.pauseSession('${sessionId}'); document.getElementById('live-proctor-modal').remove()" class="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer">
                Pause Session
              </button>
              <button onclick="document.getElementById('live-proctor-modal').remove()" class="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer">
                Close Monitor
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  // ── BUG-011: Export Cohort Data (.csv download) ──
  exportCohortData() {
    const data = window.ADMIN_DASHBOARD_DATA;
    const roster = (data && data.studentRoster) || [];

    const headers = ['Student ID', 'Full Name', 'Email Address', 'Target Exam', 'Enrolled Course', 'Diagnostic Score', 'Mocks Completed', 'Registered Date', 'Status'];
    const rows = roster.map(s => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.exam}"`,
      `"${s.enrolledCourse}"`,
      `"${s.diagnosticScore}"`,
      s.mocksTaken,
      `"${s.registeredDate}"`,
      `"${s.status}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Stackly_Salem_Cohort_Export_${new Date().getFullYear()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${roster.length} candidate records to Stackly_Salem_Cohort_Export_${new Date().getFullYear()}.csv.`);
  },

  // ── BUG-012: Send Notice Compose Modal & Persistence ──
  sendNoticeModal(studentId, studentName) {
    const existing = document.getElementById('send-notice-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'send-notice-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn';
    modal.innerHTML = `
      <div class="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-slate-800">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 class="text-base font-bold text-slate-900 font-display">Dispatch Official Academic Notice</h3>
            <p class="text-xs text-slate-500">Recipient: <strong class="text-slate-800">${studentName}</strong> (${studentId})</p>
          </div>
          <button onclick="document.getElementById('send-notice-modal').remove()" class="text-slate-400 hover:text-slate-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onsubmit="AdminDashboardModule.dispatchNotice(event, '${studentId}', '${studentName.replace(/'/g, "\\'")}')" class="space-y-4 mt-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Notice Classification</label>
            <select id="notice-type" class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
              <option value="Academic Progress">Academic Progress &amp; IRT Trajectory</option>
              <option value="Schedule Change">Mandatory Proctored Mock Schedule</option>
              <option value="Performance Alert">Priority Topic Drill Alert</option>
              <option value="Direct Faculty Note">Direct Faculty Strategy Note</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Notice Title</label>
            <input type="text" id="notice-title" required value="Adaptive IRT Diagnostic Update &amp; Recommended Next Steps"
              class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Directive Message Body</label>
            <textarea id="notice-body" required rows="3" class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed">Your recent mock assessment shows mastery in core algebra and arithmetic. We recommend completing 20 targeted drills in Advanced Combinatorics before the Saturday national mock test.</textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onclick="document.getElementById('send-notice-modal').remove()"
              class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-xs">
              <span>Send Notice</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
  },

  dispatchNotice(e, studentId, studentName) {
    e.preventDefault();
    const type = document.getElementById('notice-type')?.value || 'Academic Progress';
    const title = document.getElementById('notice-title')?.value || 'Directorate Notice';
    const message = document.getElementById('notice-body')?.value || '';

    if (typeof addStudentNotification === 'function') {
      addStudentNotification({
        studentId,
        studentName,
        title,
        message,
        type,
        author: 'Dr. K. Arunkumar (Academic Director)',
      });
    }

    const modal = document.getElementById('send-notice-modal');
    if (modal) modal.remove();

    showToast(`Notice successfully dispatched to ${studentName} and archived in academic records.`);
  },

  // ── BUG-013: Sync IRT Psychometric Engine ──
  syncIRTEngine() {
    const btn = document.getElementById('irt-sync-btn');
    const icon = document.getElementById('irt-sync-icon');
    if (icon) icon.classList.add('animate-spin');

    setTimeout(() => {
      if (icon) icon.classList.remove('animate-spin');

      const nowStr = 'Just now';
      const syncData = {
        lastSynced: nowStr,
        timestamp: Date.now(),
        nodeLatency: '11ms',
        itemsCalibrated: 25400,
        status: 'Optimal Synchronized',
      };

      if (typeof setIRTSyncStatus === 'function') {
        setIRTSyncStatus(syncData);
      }

      // Re-calibrate question items in state
      this.questionList = this.questionList.map(q => ({
        ...q,
        status: 'Active Calibrated (Sync)',
      }));

      const clusterLabel = document.getElementById('cluster-sync-label');
      if (clusterLabel) {
        clusterLabel.textContent = `Salem Core Cluster: 99.98% Live • IRT Synced (${nowStr})`;
      }

      showToast('IRT Psychometric Engine synchronized across all Salem cluster nodes. Latency: 11ms.');
      this.render();
    }, 600);
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

    const irtStatus = typeof getIRTSyncStatus === 'function' ? getIRTSyncStatus() : { lastSynced: '2m ago' };

    const filteredSessions = this.liveSessions.filter(s =>
      this.selectedExamFilter === 'All' || s.exam.includes(this.selectedExamFilter)
    );

    const filteredQuestions = this.questionList.filter(q =>
      !this.searchQuery ||
      q.topic.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      q.id.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const tabs = [
      { id: 'proctor', label: 'Live Proctored Simulations', count: this.liveSessions.length },
      { id: 'qbank', label: 'Item Response Bank', count: this.questionList.length },
      { id: 'students', label: 'Student Cohort Diagnostics', count: (data.studentRoster || []).length },
      { id: 'cluster', label: 'Infrastructure & Nodes', count: (data.systemNodes || []).length },
    ];

    let tabContentHTML = '';

    if (this.activeTab === 'proctor') {
      tabContentHTML = `
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-slate-900 font-display">Active Monitored Test Sessions</h2>
              <p class="text-xs text-slate-500">Live dual-camera and audio proctoring streams connected to Salem CBT Server.</p>
            </div>

            <!-- Filter Pills -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              ${['All', 'GRE', 'GMAT', 'MCAT', 'SAT'].map(filter => `
                <button onclick="AdminDashboardModule.setExamFilter('${filter}')"
                  class="px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${this.selectedExamFilter === filter ? 'bg-indigo-600 text-white font-bold' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}">
                  ${filter}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th class="py-3.5 px-4">Candidate / ID</th>
                    <th class="py-3.5 px-4">Exam / Center</th>
                    <th class="py-3.5 px-4">Time Remaining</th>
                    <th class="py-3.5 px-4">AI Biometric Status</th>
                    <th class="py-3.5 px-4 text-right">Proctor Interventions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${filteredSessions.map(session => `
                    <tr class="hover:bg-slate-50/80 transition">
                      <td class="py-3.5 px-4">
                        <div class="flex items-center gap-3">
                          <img src="${session.avatar}" alt="${session.studentName}"
                            class="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 shrink-0">
                          <div>
                            <div class="font-bold text-slate-900">${session.studentName}</div>
                            <div class="text-[11px] text-slate-500 font-mono">${session.sessionId}</div>
                          </div>
                        </div>
                      </td>

                      <td class="py-3.5 px-4">
                        <div class="font-semibold text-slate-800">${session.exam}</div>
                        <div class="text-[11px] text-slate-500">${session.center}</div>
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
                          <button onclick="AdminDashboardModule.inspectLiveFeed('${session.sessionId}', '${session.studentName.replace(/'/g, "\\'")}', '${session.exam.replace(/'/g, "\\'")}')"
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
            <button onclick="AdminDashboardModule.exportCohortData()"
              class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Export Cohort Data (CSV)</span>
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
                  <button onclick="AdminDashboardModule.sendNoticeModal('${stu.id}', '${stu.name.replace(/'/g, "\\'")}')"
                    class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    <span>Send Notice</span>
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
                  <span id="cluster-sync-label">Salem Core Cluster: 99.98% Live • IRT: ${irtStatus.status || 'Synced'} (${irtStatus.lastSynced})</span>
                </div>

                <button id="irt-sync-btn" onclick="AdminDashboardModule.syncIRTEngine()"
                  class="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition cursor-pointer flex items-center gap-1.5" title="Recalibrate &amp; Sync IRT Engine">
                  <svg id="irt-sync-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
                  <span class="text-xs font-semibold hidden md:inline">Sync IRT</span>
                </button>

                <button onclick="navigate('student-dashboard')"
                  class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer" title="Switch to Student Dashboard View">
                  <span>Student View</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>

                <button onclick="AdminDashboardModule.showAddModal = true; AdminDashboardModule.render()"
                  class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>New Psychometric Item</span>
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
