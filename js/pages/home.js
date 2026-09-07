// ============================================================
// STACKLY SALEM — Home Page Component (13 Interactive Sections)
// ============================================================

const HomeModule = {
  // State variables
  selectedExamCategory: 'All',
  sampleQAns: null,
  sampleQChecked: false,
  predictorExam: 'GRE',
  studyHoursPerDay: 3,
  currentAccuracy: 75,
  dailyAnswer: null,
  dailySubmitted: false,
  dailyStreakCount: 14,
  dailyHint: null,
  testimonialFilter: 'All',
  plannerExam: 'GRE General',
  weeksUntilExam: 12,
  weeklyHours: 18,
  isAnnualPricing: true,
  activeFaqId: 'faq-1',
  heroSearch: '',

  // Icon mapper helper
  renderCategoryIcon(iconName) {
    switch (iconName) {
      case 'GraduationCap':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>';
      case 'Briefcase':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>';
      case 'Stethoscope':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>';
      case 'Activity':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2"/></svg>';
      case 'BookOpen':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>';
      case 'Cpu':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>';
      case 'Globe':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>';
      case 'Scale':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>';
      case 'Train':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>';
      case 'Landmark':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>';
      case 'Bot':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>';
      case 'Code':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';
      case 'History':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>';
      case 'Baby':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>';
      case 'HeartHandshake':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
      default:
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
    }
  },

  // Calculate predicted score
  calculatePredictedScore() {
    const accuracyFactor = this.currentAccuracy / 100;
    const hoursBonus = Math.min(1.2, 0.85 + this.studyHoursPerDay * 0.05);

    if (this.predictorExam === 'GRE') {
      const raw = Math.round(260 + (340 - 260) * accuracyFactor * hoursBonus);
      const score = Math.min(340, Math.max(280, raw));
      const percentile =
        score >= 330 ? '98th %ile' : score >= 320 ? '88th %ile' : score >= 310 ? '75th %ile' : '60th %ile';
      const targets =
        score >= 330
          ? 'MIT, Stanford, Harvard, Oxford'
          : score >= 320
          ? 'UC Berkeley, NYU, CMU, Columbia'
          : 'USC, Purdue, Texas A&M';
      return {
        score: score + ' / 340',
        percentile,
        targets,
        weeks: Math.max(4, Math.round(16 - this.studyHoursPerDay * 1.5)),
      };
    } else if (this.predictorExam === 'GMAT') {
      const raw = Math.round(455 + (805 - 455) * accuracyFactor * hoursBonus);
      const score = Math.min(805, Math.max(505, Math.round(raw / 10) * 10 + 5));
      const percentile = score >= 715 ? '99th %ile' : score >= 665 ? '90th %ile' : '70th %ile';
      const targets =
        score >= 715 ? 'Stanford GSB, Wharton, Harvard, INSEAD' : 'Kellogg, Booth, Columbia, LBS';
      return {
        score: score + ' / 805',
        percentile,
        targets,
        weeks: Math.max(4, Math.round(14 - this.studyHoursPerDay * 1.3)),
      };
    } else if (this.predictorExam === 'SAT') {
      const raw = Math.round(800 + (1600 - 800) * accuracyFactor * hoursBonus);
      const score = Math.min(1600, Math.max(950, Math.round(raw / 10) * 10));
      const percentile = score >= 1530 ? '99th %ile' : score >= 1420 ? '92nd %ile' : '78th %ile';
      const targets =
        score >= 1530
          ? 'Yale, Princeton, Caltech, MIT'
          : score >= 1420
          ? 'UMichigan, UCLA, UVA, Emory'
          : 'Penn State, Rutgers, UC Davis';
      return {
        score: score + ' / 1600',
        percentile,
        targets,
        weeks: Math.max(4, Math.round(10 - this.studyHoursPerDay * 1.1)),
      };
    } else {
      const raw = Math.round(472 + (528 - 472) * accuracyFactor * hoursBonus);
      const score = Math.min(528, Math.max(485, raw));
      const percentile = score >= 520 ? '98th %ile' : score >= 512 ? '85th %ile' : '65th %ile';
      const targets =
        score >= 520 ? 'Johns Hopkins, UCSF, Mayo Clinic, Penn' : 'Georgetown, Boston U, Emory Med';
      return {
        score: score + ' / 528',
        percentile,
        targets,
        weeks: Math.max(6, Math.round(20 - this.studyHoursPerDay * 1.8)),
      };
    }
  },

  // Setters
  setExamCategory(cat) {
    this.selectedExamCategory = cat;
    this.render();
  },

  setSampleAnswer(idx) {
    this.sampleQAns = idx;
    this.sampleQChecked = false;
    this.render();
  },

  checkSampleAnswer() {
    if (this.sampleQAns !== null) {
      this.sampleQChecked = true;
      this.render();
    }
  },

  setPredictorExam(exam) {
    this.predictorExam = exam;
    this.render();
  },

  setStudyHours(hrs) {
    this.studyHoursPerDay = Number(hrs);
    this.updatePredictorResults();
  },

  setAccuracy(acc) {
    this.currentAccuracy = Number(acc);
    this.updatePredictorResults();
  },

  updatePredictorResults() {
    const res = this.calculatePredictedScore();
    const scoreEl = document.getElementById('predictor-score-display');
    const pctEl = document.getElementById('predictor-pct-display');
    const weeksEl = document.getElementById('predictor-weeks-display');
    const targetsEl = document.getElementById('predictor-targets-display');
    const hoursLabel = document.getElementById('predictor-hours-label');
    const accLabel = document.getElementById('predictor-acc-label');

    if (scoreEl) scoreEl.textContent = res.score;
    if (pctEl) pctEl.textContent = res.percentile;
    if (weeksEl) weeksEl.textContent = res.weeks + ' Weeks to Peak Score';
    if (targetsEl) targetsEl.textContent = res.targets;
    if (hoursLabel) hoursLabel.textContent = this.studyHoursPerDay + ' Hours / Day';
    if (accLabel) accLabel.textContent = this.currentAccuracy + '% Accuracy';
  },

  setDailyAnswer(val) {
    this.dailyAnswer = Number(val);
    this.dailySubmitted = false;
    this.dailyHint = null;
    this.render();
  },

  submitDailyChallenge() {
    if (this.dailyAnswer === null) {
      this.dailyHint = 'Please select one of the numbers above first.';
      this.render();
      return;
    }
    if (this.dailyAnswer === 1) {
      this.dailySubmitted = true;
      this.dailyHint = null;
      this.dailyStreakCount += 1;
      this.render();
    } else {
      this.dailyHint = 'Hint: Add the two equations directly (3x+2y) + (2x+3y) = 18+12 without solving x or y!';
      this.render();
    }
  },

  setTestimonialFilter(filter) {
    this.testimonialFilter = filter;
    this.render();
  },

  setPlannerExam(exam) {
    this.plannerExam = exam;
  },

  setWeeksUntilExam(weeks) {
    this.weeksUntilExam = Number(weeks);
    this.updatePlannerResults();
  },

  setWeeklyHours(hours) {
    this.weeklyHours = Number(hours);
    this.updatePlannerResults();
  },

  updatePlannerResults() {
    const w = this.weeksUntilExam;
    const h = this.weeklyHours;

    const wLabel = document.getElementById('planner-weeks-label');
    const hLabel = document.getElementById('planner-hours-label');
    const totalEl = document.getElementById('planner-total-hours');
    const p1El = document.getElementById('planner-p1-text');
    const p2El = document.getElementById('planner-p2-text');
    const p3El = document.getElementById('planner-p3-text');

    if (wLabel) wLabel.textContent = 'Weeks Remaining: ' + w + ' Weeks';
    if (hLabel) hLabel.textContent = 'Study Bandwidth: ' + h + ' Hrs/Wk';
    if (totalEl) totalEl.textContent = (w * h) + ' Hours across ' + w + ' weeks.';
    if (p1El) p1El.textContent = 'Phase 1 (Wk 1-' + Math.round(w * 0.25) + ')';
    if (p2El) p2El.textContent = 'Phase 2 (Wk ' + (Math.round(w * 0.25) + 1) + '-' + Math.round(w * 0.6) + ')';
    if (p3El) p3El.textContent = 'Phase 3 (Wk ' + (Math.round(w * 0.6) + 1) + '-' + Math.round(w * 0.85) + ')';
  },

  togglePricing() {
    this.isAnnualPricing = !this.isAnnualPricing;
    this.render();
  },

  toggleFaq(faqId) {
    this.activeFaqId = this.activeFaqId === faqId ? null : faqId;
    this.render();
  },

  handleSearch(val) {
    this.heroSearch = val;
  },

  render() {
    const container = document.getElementById('page-home');
    if (!container) return;

    const user = AppState.user;
    const sampleQ = MOCK_QUESTIONS[0];
    const prediction = this.calculatePredictedScore();

    const filteredCategories =
      this.selectedExamCategory === 'All'
        ? EXAM_CATEGORIES
        : EXAM_CATEGORIES.filter((c) => c.category === this.selectedExamCategory);

    const filteredTestimonials =
      this.testimonialFilter === 'All'
        ? TESTIMONIALS
        : TESTIMONIALS.filter((t) => t.exam.toLowerCase().includes(this.testimonialFilter.toLowerCase()));

    container.innerHTML = `
      <div class="w-full text-slate-800 bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">

        <!-- ========================================================
             SECTION 1: HERO SECTION WITH MOVING / FLOATING IMAGES
             ======================================================== -->
        <section class="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden theme-hero-gradient border-b border-slate-200/80" id="hero-section">
          <!-- Dynamic Glow Effects -->
          <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-60"
               style="background: radial-gradient(circle, var(--theme-glow-1) 0%, transparent 70%);"></div>
          <div class="absolute top-40 right-10 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none opacity-50"
               style="background: radial-gradient(circle, var(--theme-glow-2) 0%, transparent 70%);"></div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <!-- Left Col: Headlines & Actions -->
              <div class="lg:col-span-7 text-left">
                <!-- Ticker Badges -->
                <div class="flex flex-wrap items-center gap-2.5 mb-6">
                  <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-2xs text-xs font-semibold">
                    <span class="flex h-2 w-2 relative">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span class="text-slate-900 font-bold">Stackly Salem Core 3.0</span>
                    <span class="text-slate-300">•</span>
                    <span class="text-slate-600">Adaptive Mock Engine Active</span>
                  </div>
                </div>

                <!-- Main Headline -->
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.12]">
                  Prepare Smarter.
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800">
                    Score in the 99th Percentile.
                  </span>
                </h1>

                <!-- Sub-headline -->
                <p class="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                  The premier standardized test platform engineered by <strong class="text-slate-900 font-semibold">Stackly Technologies, Salem</strong>.
                  Featuring section-adaptive mock tests, Item Response Theory (IRT) pacing diagnostics, and dedicated Student and Admin operation portals.
                </p>

                <!-- Quick Search -->
                <div class="mt-6 max-w-lg">
                  <div class="relative flex items-center">
                    <svg class="absolute left-4 w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input
                      type="text"
                      placeholder="Search exam (GRE, GMAT Focus, SAT, MCAT, USMLE)..."
                      value="${this.heroSearch}"
                      oninput="HomeModule.handleSearch(this.value)"
                      class="w-full pl-11 pr-24 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-xs"
                    />
                    <button
                      type="button"
                      onclick="navigate('courses'); window.scrollTo({ top: 0, behavior: 'smooth' });"
                      class="absolute right-1.5 px-4 py-2 glow-btn-primary text-white text-xs font-semibold rounded-xl transition shadow-xs cursor-pointer"
                    >
                      Explore
                    </button>
                  </div>

                  <!-- Popular badges -->
                  <div class="flex flex-wrap items-center gap-1.5 mt-3 text-xs text-slate-500">
                    <span>Trending:</span>
                    ${['GRE General', 'GMAT Focus', 'Digital SAT', 'MCAT', 'GATE CS'].map((tag) => `
                      <button
                        onclick="HomeModule.heroSearch = '${tag}'; navigate('courses');"
                        class="px-2 py-0.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-600 text-[11px] font-medium transition shadow-xs cursor-pointer"
                      >
                        ${tag}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- CTA Action Buttons -->
                <div class="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
                  <button
                    onclick="openExamModal()"
                    class="w-full sm:w-auto px-7 py-3.5 glow-btn-primary font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 group cursor-pointer"
                    id="hero-start-diagnostic-btn"
                  >
                    <svg class="w-4 h-4 text-white group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                    <span>Start Free Diagnostic Mock Test</span>
                  </button>

                  <button
                    onclick="${user ? "navigate('student-dashboard')" : "openAuthModal('student', 'Student Authentication Required: Please sign in or register to access your personal academic portal, test history, and study plan.')"}"
                    class="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    id="hero-student-portal-btn"
                  >
                    <svg class="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                    <span>Student Portal</span>
                  </button>

                  <button
                    onclick="${user && user.role === 'admin' ? "navigate('admin-dashboard')" : "openAuthModal('admin', 'Administrator Authentication Required: Please sign in with verified administrator credentials to access the Salem HQ Operations Console.')"}"
                    class="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    id="hero-admin-console-btn"
                  >
                    <svg class="w-4 h-4 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span>Admin Console</span>
                  </button>
                </div>

                <!-- Quick social proof -->
                <div class="mt-8 flex items-center gap-4 text-xs text-slate-500">
                  <div class="flex -space-x-2">
                    <img src="./assets/images/img-1534528741775-53.webp" alt="Aspirant" class="w-7 h-7 rounded-full object-cover ring-2 ring-white"/>
                    <img src="./assets/images/img-1507003211169-0a.webp" alt="Faculty" class="w-7 h-7 rounded-full object-cover ring-2 ring-white"/>
                    <img src="./assets/images/img-1494790108377-be.webp" alt="Scholar" class="w-7 h-7 rounded-full object-cover ring-2 ring-white"/>
                  </div>
                  <span><strong class="text-slate-800">520,000+ candidates</strong> prepared across 28 countries</span>
                </div>
              </div>

              <!-- Right Col: Animated Floating Showcase Cards -->
              <div class="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
                <!-- Main Showcase Card -->
                <div class="float-card relative w-full max-w-md rounded-3xl p-3 bg-white border border-slate-200/90 shadow-2xl shadow-indigo-100">
                  <div class="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-2">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <div class="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <svg class="w-3 h-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                      <span>Stackly Salem Test Suite</span>
                    </div>
                    <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">Live</span>
                  </div>

                  <div class="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100">
                    <img src="./assets/images/img-1523240795612-9a.webp" alt="Salem digital library" class="w-full h-full object-cover"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                      <div class="text-xs font-bold flex items-center gap-1 text-emerald-300">
                        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span>Salem AI Adaptive Session in Progress</span>
                      </div>
                      <div class="text-sm font-extrabold mt-0.5">Sectional Pacing: 78s / Item • 98% Accuracy</div>
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-100 text-center text-xs">
                    <div class="p-2 rounded-xl bg-slate-50">
                      <div class="font-extrabold text-slate-900">338/340</div>
                      <div class="text-[10px] text-slate-500">Top GRE Score</div>
                    </div>
                    <div class="p-2 rounded-xl bg-slate-50">
                      <div class="font-extrabold text-indigo-600">0.02s</div>
                      <div class="text-[10px] text-slate-500">Server Latency</div>
                    </div>
                    <div class="p-2 rounded-xl bg-slate-50">
                      <div class="font-extrabold text-emerald-600">100%</div>
                      <div class="text-[10px] text-slate-500">Official Format</div>
                    </div>
                  </div>
                </div>

                <!-- Satellite Badge 1 -->
                <div class="float-card-fast absolute -top-4 -right-4 sm:-right-8 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xl flex items-center gap-3 z-20">
                  <div class="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-2.34"/><path d="M14 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                  </div>
                  <div>
                    <div class="text-[10px] text-slate-400 font-bold uppercase">Recent Verified Score</div>
                    <div class="text-xs font-extrabold text-slate-900">Priya N. • GRE 336</div>
                    <div class="text-[10px] text-emerald-600 font-semibold">99th Percentile • Harvard Admit</div>
                  </div>
                </div>

                <!-- Satellite Badge 2 -->
                <div class="float-card-slow absolute -bottom-6 -left-4 sm:-left-8 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xl flex items-center gap-3 z-20">
                  <div class="w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04Z"/></svg>
                  </div>
                  <div>
                    <div class="text-[10px] text-indigo-600 font-bold uppercase">Salem IRT Algorithm</div>
                    <div class="text-xs font-extrabold text-slate-900">Multi-Stage Adaptive</div>
                    <div class="text-[10px] text-slate-500">Difficulty Auto-Scaling Live</div>
                  </div>
                </div>

                <!-- Satellite Badge 3 -->
                <div class="float-card-fast absolute bottom-20 -right-6 p-2.5 rounded-xl bg-white/95 backdrop-blur-xs border border-indigo-200 shadow-lg flex items-center gap-2 z-20">
                  <svg class="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                  <span class="text-[11px] font-bold text-slate-800">Salem HQ Certified</span>
                </div>
              </div>
            </div>

            <!-- Stats Bar -->
            <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div class="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <div class="text-3xl font-extrabold text-slate-900 font-display">98.4%</div>
                <div class="text-xs text-slate-500 mt-1">Top Decile Success Rate</div>
              </div>
              <div class="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <div class="text-3xl font-extrabold text-indigo-600 font-display">520,000+</div>
                <div class="text-xs text-slate-500 mt-1">Global Active Aspirants</div>
              </div>
              <div class="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <div class="text-3xl font-extrabold text-emerald-600 font-display">450+</div>
                <div class="text-xs text-slate-500 mt-1">Full Exam Simulations</div>
              </div>
              <div class="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <div class="text-3xl font-extrabold text-amber-600 font-display">+18 Pts</div>
                <div class="text-xs text-slate-500 mt-1">Average Score Improvement</div>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 2: TARGET EXAMS & CATEGORY FILTER MATRIX
             ======================================================== -->
        <section class="py-16 md:py-20 bg-white border-t border-slate-200 reveal tilt-in" id="exam-categories-section">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Exam Specializations</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Select Your Target Examination</h2>
                <p class="text-xs sm:text-sm text-slate-500 mt-1">
                  Curated question banks, timed test formats, and syllabus guides tailored to official test specifications.
                </p>
              </div>

              <!-- Filter Tabs -->
              <div class="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto max-w-full overflow-x-auto">
                ${[
                  { id: 'All', label: 'All Exams' },
                  { id: 'TNPSC', label: 'TNPSC' },
                  { id: 'Railways', label: 'Railways (RRB)' },
                  { id: 'Banking', label: 'Banking (IBPS/SBI)' },
                  { id: 'AI_ML', label: 'AI & Machine Learning' },
                  { id: 'Programming', label: 'Programming & Tech' },
                  { id: 'History_GK', label: 'History & GK' },
                  { id: 'Kids', label: 'Kids Olympiad' },
                  { id: 'Senior', label: 'Senior Citizens' },
                  { id: 'Graduate', label: 'Graduate (GRE/GMAT)' },
                  { id: 'Medical', label: 'Medical (MCAT/USMLE)' },
                  { id: 'Tech', label: 'Engineering (GATE)' },
                ].map((cat) => `
                  <button
                    onclick="HomeModule.setExamCategory('${cat.id}')"
                    class="px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
                      this.selectedExamCategory === cat.id
                        ? 'bg-white text-indigo-900 shadow-xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }"
                  >
                    ${cat.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              ${filteredCategories.map((exam) => `
                <div class="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-2xs">
                  <div class="h-1.5 w-full bg-gradient-to-r ${exam.badgeColor} absolute top-0 left-0"></div>

                  <div>
                    <div class="flex items-center justify-between mb-4 pt-1">
                      <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${exam.badgeColor} flex items-center justify-center text-white shadow-md shadow-indigo-500/15 group-hover:scale-110 transition-transform">
                        ${this.renderCategoryIcon(exam.iconName)}
                      </div>
                      <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-50 text-slate-800 border border-slate-200 group-hover:border-indigo-300 group-hover:bg-indigo-50 group-hover:text-indigo-900 transition">
                        Avg ${exam.avgScoreJump}
                      </span>
                    </div>

                    <h3 class="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition">${exam.name}</h3>
                    <p class="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">${exam.description}</p>

                    <div class="space-y-1.5 mb-5 text-[11px] text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                      <div class="flex items-center justify-between">
                        <span class="text-slate-500">Duration:</span>
                        <span class="font-semibold text-slate-900">${exam.duration}</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-slate-500">Active Aspirants:</span>
                        <span class="font-semibold text-slate-900">${exam.studentsCount}</span>
                      </div>
                    </div>
                  </div>

                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onclick="openExamModal()"
                      class="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 group/btn cursor-pointer py-1"
                    >
                      <svg class="w-3.5 h-3.5 text-indigo-400 group-hover/btn:text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <span>Take Exam</span>
                      <svg class="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>

                    <button
                      onclick="navigate('courses'); window.scrollTo({ top: 0, behavior: 'smooth' });"
                      class="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer"
                    >
                      View Courses
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 3: LIVE PRACTICE ARENA / MOCK TEST PREVIEW
             ======================================================== -->
        <section class="py-16 md:py-20 bg-slate-50 border-t border-slate-200 reveal fade-up" id="mock-preview-section">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-10">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Interactive Test Simulation Preview</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Experience the Official Exam Interface Live</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Try a real standardized test problem right now with instant step-by-step scoring rationale.</p>
            </div>

            <div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 text-xs text-slate-500">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">${sampleQ.exam}</span>
                  <span class="font-semibold text-slate-700">${sampleQ.section}</span>
                </div>
                <div class="flex items-center gap-1.5 text-amber-700 font-mono font-medium">
                  <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Paced Goal: 1m 45s</span>
                </div>
              </div>

              <div class="mb-6">
                <p class="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">${sampleQ.question}</p>
              </div>

              <div class="space-y-2.5 mb-6">
                ${sampleQ.options.map((opt, i) => {
                  const isSelected = this.sampleQAns === i;
                  const letter = String.fromCharCode(65 + i);
                  return `
                    <button
                      onclick="HomeModule.setSampleAnswer(${i})"
                      class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-white'
                      }"
                    >
                      <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }">${letter}</span>
                      <span>${opt}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              ${this.sampleQChecked ? `
                <div class="p-4 rounded-xl border mb-6 text-xs leading-relaxed ${
                  this.sampleQAns === sampleQ.correctAnswer
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }">
                  <div class="flex items-center gap-2 font-bold mb-1">
                    ${this.sampleQAns === sampleQ.correctAnswer
                      ? `<svg class="w-4 h-4 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span class="text-emerald-800">Correct Answer! (+1 Mark)</span>`
                      : `<svg class="w-4 h-4 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><span class="text-rose-800">Option B (13 / 30) is the correct answer.</span>`
                    }
                  </div>
                  <p class="mt-1 text-slate-700">${sampleQ.explanation}</p>
                  <p class="mt-2 text-amber-800 font-semibold">💡 ${sampleQ.tip}</p>
                </div>
              ` : ''}

              <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <button
                  onclick="HomeModule.checkSampleAnswer()"
                  ${this.sampleQAns === null ? 'disabled' : ''}
                  class="px-5 py-2.5 text-xs font-bold rounded-xl transition shadow-xs cursor-pointer ${
                    this.sampleQAns === null
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'glow-btn-primary'
                  }"
                >
                  ${this.sampleQAns === null ? 'Select an Option' : 'Check Answer'}
                </button>

                <button
                  onclick="openExamModal()"
                  class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer"
                >
                  <svg class="w-4 h-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <span>Launch Full 50-Q Adaptive Mock Exam</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 4: AI SCORE PREDICTOR & PERCENTILE CALCULATOR
             ======================================================== -->
        <section class="py-16 md:py-20 bg-white border-t border-slate-200 reveal fade-up" id="score-predictor-section">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Predictive Diagnostics Engine</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">AI Score & University Admissibility Predictor</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Simulate your target test outcome based on daily prep hours and current question accuracy.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-center">
              <!-- Controls -->
              <div class="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
                <!-- Exam Tabs -->
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">1. Target Examination</label>
                  <div class="grid grid-cols-4 gap-2">
                    ${['GRE', 'GMAT', 'SAT', 'MCAT'].map((ex) => `
                      <button
                        type="button"
                        onclick="HomeModule.setPredictorExam('${ex}')"
                        class="py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                          this.predictorExam === ex
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }"
                      >
                        ${ex}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Slider 1 -->
                <div>
                  <div class="flex justify-between items-center text-xs mb-2">
                    <span class="font-bold text-slate-700">2. Daily Dedicated Prep Time</span>
                    <span class="text-indigo-600 font-bold" id="predictor-hours-label">${this.studyHoursPerDay} Hours / Day</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value="${this.studyHoursPerDay}"
                    oninput="HomeModule.setStudyHours(this.value)"
                    class="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div class="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 hr (Casual)</span>
                    <span>4 hrs (Targeted)</span>
                    <span>8 hrs (Full Immersion)</span>
                  </div>
                </div>

                <!-- Slider 2 -->
                <div>
                  <div class="flex justify-between items-center text-xs mb-2">
                    <span class="font-bold text-slate-700">3. Current Baseline Accuracy</span>
                    <span class="text-emerald-700 font-bold" id="predictor-acc-label">${this.currentAccuracy}% Accuracy</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="95"
                    step="5"
                    value="${this.currentAccuracy}"
                    oninput="HomeModule.setAccuracy(this.value)"
                    class="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div class="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>40% Baseline</span>
                    <span>70% Intermediate</span>
                    <span>95% Advanced</span>
                  </div>
                </div>
              </div>

              <!-- Results Card -->
              <div class="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-indigo-50/50 border border-indigo-200 text-center shadow-lg">
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-4">
                  <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                  <span>Projected Target Result</span>
                </div>

                <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display mb-1" id="predictor-score-display">
                  ${prediction.score}
                </div>
                <div class="text-sm font-bold text-emerald-700 mb-6" id="predictor-pct-display">
                  ${prediction.percentile}
                </div>

                <div class="space-y-3 text-left text-xs bg-white p-4 rounded-2xl border border-slate-200 mb-6 shadow-2xs">
                  <div>
                    <span class="text-slate-500">Estimated Prep Timeline:</span>
                    <div class="font-bold text-slate-900 mt-0.5" id="predictor-weeks-display">${prediction.weeks} Weeks to Peak Score</div>
                  </div>
                  <div>
                    <span class="text-slate-500">Target Admissible Institutions:</span>
                    <div class="font-bold text-indigo-700 mt-0.5" id="predictor-targets-display">${prediction.targets}</div>
                  </div>
                </div>

                <button
                  onclick="openExamModal()"
                  class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition cursor-pointer"
                >
                  Validate with Full Diagnostic Test
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 5: FLAGSHIP COURSE PROGRAMS
             ======================================================== -->
        <section class="py-16 md:py-20 bg-slate-50 border-t border-slate-200" id="courses-section">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Curriculum Mastery</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Flagship Comprehensive Preparation Programs</h2>
                <p class="text-xs sm:text-sm text-slate-500 mt-1">Structured masterclasses featuring video lessons, adaptive drills, and guaranteed score gains.</p>
              </div>

              <button
                onclick="navigate('courses'); window.scrollTo({ top: 0, behavior: 'smooth' });"
                class="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
              >
                <span>View All 18+ Programs</span>
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${COURSES.slice(0, 3).map((course) => `
                <div class="rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                      <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                        ${course.exam} • ${course.level}
                      </span>
                      ${course.badge ? `
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ${course.badge}
                        </span>
                      ` : ''}
                    </div>

                    <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug">${course.title}</h3>

                    <div class="flex items-center gap-2 mb-4 text-xs text-slate-500">
                      <div class="flex items-center text-amber-500">
                        <svg class="w-3.5 h-3.5 fill-amber-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span class="font-bold">${course.rating}</span>
                      </div>
                      <span>(${course.reviewsCount} reviews)</span>
                      <span>•</span>
                      <span>${course.enrolledStudents.toLocaleString()} enrolled</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-4">
                      <div><span class="text-slate-400">Duration: </span><span class="font-semibold text-slate-900">${course.durationWeeks} Wks</span></div>
                      <div><span class="text-slate-400">Video Hours: </span><span class="font-semibold text-slate-900">${course.videoHours} Hrs</span></div>
                      <div><span class="text-slate-400">Questions: </span><span class="font-semibold text-slate-900">${course.practiceQuestions}+</span></div>
                      <div><span class="text-slate-400">Full Mocks: </span><span class="font-semibold text-slate-900">${course.fullMocksCount} Tests</span></div>
                    </div>

                    <div class="space-y-1.5 text-xs text-slate-600 mb-2">
                      ${course.highlights.slice(0, 2).map((h) => `
                        <div class="flex items-start gap-2">
                          <svg class="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                          <span>${h}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>

                  <div class="p-6 pt-0">
                    <div class="flex items-center justify-between pt-4 border-t border-slate-200 mb-4">
                      <div>
                        <div class="text-[10px] text-slate-400 uppercase font-semibold">Tuition Fee</div>
                        <div class="text-xl font-bold text-slate-900">
                          $${course.salePrice}
                          <span class="text-xs line-through text-slate-400 font-normal">$${course.originalPrice}</span>
                        </div>
                      </div>
                      <button
                        onclick="openSyllabusModal(COURSES.find(c => c.id === '${course.id}'))"
                        class="text-xs text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-4 cursor-pointer"
                      >
                        View Syllabus
                      </button>
                    </div>

                    <button
                      onclick="openSyllabusModal(COURSES.find(c => c.id === '${course.id}'))"
                      class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                    >
                      Enroll in Program
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 6: DAILY PRACTICE CHALLENGE & STREAK TRACKER
             ======================================================== -->
        <section class="py-16 md:py-20 bg-white border-t border-slate-200 reveal fade-up" id="daily-challenge-section">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-50/70 via-slate-50 to-white border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
              <!-- Left: Streak info -->
              <div class="max-w-md">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3 border border-amber-200">
                  <svg class="w-4 h-4 fill-amber-500 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                  <span>Daily Discipline & Focus Streak</span>
                </div>
                <h3 class="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                  Question of the Day: Keep Your ${this.dailyStreakCount}-Day Streak!
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Consistency is the single biggest predictor of 99th percentile test scores. Solve 1 micro-problem every single morning to keep cognitive endurance sharp.
                </p>

                <div class="flex items-center gap-6 mt-6">
                  <div>
                    <div class="text-2xl font-extrabold text-slate-900 font-display">+${this.dailyStreakCount * 50} XP</div>
                    <div class="text-xs text-slate-500">Streak Multiplier</div>
                  </div>
                  <div class="h-8 w-px bg-slate-200"></div>
                  <div>
                    <div class="text-2xl font-extrabold text-amber-600 font-display">Top 4%</div>
                    <div class="text-xs text-slate-500">Consistency Leaderboard</div>
                  </div>
                </div>
              </div>

              <!-- Right: Interactive Question Card -->
              <div class="w-full lg:max-w-md p-6 bg-white rounded-2xl border border-slate-200 shadow-md">
                <div class="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span class="font-bold text-indigo-700">Digital SAT Advanced Math</span>
                  <span class="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Reward: +50 XP</span>
                </div>

                <p class="text-xs sm:text-sm text-slate-900 font-medium mb-4">
                  If 3x + 2y = 18 and 2x + 3y = 12, what is the value of 5x + 5y?
                </p>

                <div class="grid grid-cols-2 gap-2 mb-4">
                  ${[
                    { id: 0, text: '24' },
                    { id: 1, text: '30' },
                    { id: 2, text: '36' },
                    { id: 3, text: '42' },
                  ].map((opt) => `
                    <button
                      onclick="HomeModule.setDailyAnswer(${opt.id})"
                      class="p-2.5 rounded-xl border text-xs font-bold text-center transition cursor-pointer ${
                        this.dailyAnswer === opt.id
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-200'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                      }"
                    >
                      ${opt.text}
                    </button>
                  `).join('')}
                </div>

                ${this.dailyHint ? `
                  <div class="p-3 mb-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs">
                    <span class="font-bold">Not quite:</span> ${this.dailyHint}
                  </div>
                ` : ''}

                ${this.dailySubmitted ? `
                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs">
                    <div class="font-bold flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span>Brilliant! (3x + 2y) + (2x + 3y) = 5x + 5y = 18 + 12 = 30.</span>
                    </div>
                    <p class="text-[11px] text-emerald-700 mt-1">
                      Streak extended to ${this.dailyStreakCount} days! +50 XP credited.
                    </p>
                  </div>
                ` : `
                  <button
                    onclick="HomeModule.submitDailyChallenge()"
                    ${this.dailyAnswer === null ? 'disabled' : ''}
                    class="w-full py-2.5 text-xs font-bold rounded-xl transition shadow-xs cursor-pointer ${
                      this.dailyAnswer === null
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'glow-btn-primary'
                    }"
                  >
                    ${this.dailyAnswer === null ? 'Select an Answer First' : 'Submit Daily Challenge'}
                  </button>
                `}
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 7: ADAPTIVE LEARNING & SMART ANALYTICS (IRT)
             ======================================================== -->
        <section class="py-16 md:py-20 bg-slate-50 border-t border-slate-200 reveal fade-up" id="technology-engine">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-14">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Cognitive Science & AI Architecture</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
                Engineered with 3-Parameter Item Response Theory
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">
                Static question banks waste your time. Stackly Salem actively recalibrates problem difficulty to expose and eliminate your exact cognitive vulnerabilities.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04Z"/></svg>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-2">Adaptive Difficulty Routing</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Matches the exact multi-stage algorithm used by ETS, College Board, and GMAC. Hard modules unlock higher score ceilings.
                </p>
              </div>

              <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-2">Cognitive Velocity Tracking</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Tracks milliseconds per item to identify hesitation points, rushed mistakes, and stamina drops in the 3rd hour.
                </p>
              </div>

              <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-2">Error Log Taxonomy</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Categorizes missed problems into: Conceptual Gap, Calculation Slip, Reading Trap, or Pacing Panic for targeted remediation.
                </p>
              </div>

              <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-2">Official Exam Simulator</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Faithful replication of the test-day software interface: strike-through tools, flagging, on-screen calculators, and timer alerts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 8: WORLD-CLASS FACULTY & MASTER MENTORS
             ======================================================== -->
        <section class="py-16 md:py-20 bg-white border-t border-slate-200 reveal scale-up" id="faculty-section">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Instructional Pedagogy</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
                  Learn from 99th-Percentile Master Instructors
                </h2>
                <p class="text-xs sm:text-sm text-slate-500 mt-1">
                  Harvard, Stanford, and Johns Hopkins alumni who have decoded standardized test engines.
                </p>
              </div>

              <button
                onclick="navigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' });"
                class="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
              >
                <span>Meet Full Academic Board</span>
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              ${FACULTY_MEMBERS.map((faculty) => `
                <div class="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white hover:shadow-lg transition flex flex-col justify-between">
                  <div>
                    <img src="${faculty.avatar}" alt="${faculty.name}" class="w-20 h-20 rounded-2xl object-cover mb-4 ring-2 ring-indigo-200 shadow-xs"/>
                    <div class="text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-1">${faculty.featuredExam}</div>
                    <h4 class="text-base font-bold text-slate-900">${faculty.name}</h4>
                    <div class="text-xs text-slate-500 mb-3">${faculty.credentials}</div>
                    <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">${faculty.bio}</p>
                  </div>

                  <div class="pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                    <div class="flex justify-between">
                      <span>Students Coached:</span>
                      <span class="text-slate-900 font-bold">${faculty.studentsTrained}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Average Student Score:</span>
                      <span class="text-emerald-700 font-bold">${faculty.avgScore}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 9: STUDENT SUCCESS STORIES & TESTIMONIALS
             ======================================================== -->
        <section class="py-16 md:py-20 bg-slate-50 border-t border-slate-200 reveal tilt-in" id="testimonials-section">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Verified Hall of Fame</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
                  Real Score Jumps. Real Ivy League & Top 10 Admits.
                </h2>
                <p class="text-xs sm:text-sm text-slate-500 mt-1">
                  Certified score reports verified by admissions consulting advisors.
                </p>
              </div>

              <!-- Filter Tabs -->
              <div class="flex flex-wrap gap-1.5 p-1 bg-white rounded-xl border border-slate-200 self-start md:self-auto shadow-xs">
                ${['All', 'GRE', 'GMAT', 'MCAT', 'SAT'].map((f) => `
                  <button
                    onclick="HomeModule.setTestimonialFilter('${f}')"
                    class="px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      this.testimonialFilter === f
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }"
                  >
                    ${f}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${filteredTestimonials.slice(0, 3).map((item) => `
                <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center gap-2">
                        <img src="${item.avatar}" alt="${item.name}" class="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100"/>
                        <div>
                          <h4 class="text-sm font-bold text-slate-900">${item.name}</h4>
                          <div class="text-[11px] text-slate-500">${item.exam} Candidate</div>
                        </div>
                      </div>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Verified
                      </span>
                    </div>

                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4 flex items-center justify-between text-xs">
                      <div>
                        <span class="text-slate-400">Score Jump: </span>
                        <span class="text-slate-500 line-through font-mono">${item.previousScore}</span> →
                        <span class="text-emerald-700 font-bold font-mono">${item.score}</span>
                      </div>
                      <span class="text-indigo-700 font-bold">${item.percentile}</span>
                    </div>

                    <p class="text-xs text-slate-600 italic leading-relaxed mb-4">"${item.quote}"</p>
                  </div>

                  <div class="pt-3 border-t border-slate-200 text-xs text-slate-600">
                    <span class="text-slate-400">Admitted To: </span>
                    <span class="text-slate-900 font-bold">${item.targetSchool}</span> (${item.program})
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 10: INTERACTIVE STUDY SCHEDULE PLANNER
             ======================================================== -->
        <section class="py-16 md:py-20 bg-white border-t border-slate-200 reveal fade-up" id="study-planner">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Personalized Roadmap Generator</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Generate Your 4-Phase Exam Roadmap</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us your target exam date and hours; we will balance diagnostic drilling with mock taper conditioning.
              </p>
            </div>

            <div class="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-md">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Target Exam</label>
                  <select
                    onchange="HomeModule.setPlannerExam(this.value)"
                    class="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="GRE General" ${this.plannerExam === 'GRE General' ? 'selected' : ''}>GRE General Test</option>
                    <option value="GMAT Focus" ${this.plannerExam === 'GMAT Focus' ? 'selected' : ''}>GMAT Focus Edition</option>
                    <option value="Digital SAT" ${this.plannerExam === 'Digital SAT' ? 'selected' : ''}>Digital SAT 1550+</option>
                    <option value="MCAT Medical" ${this.plannerExam === 'MCAT Medical' ? 'selected' : ''}>MCAT Medical Prep</option>
                    <option value="USMLE Step 1" ${this.plannerExam === 'USMLE Step 1' ? 'selected' : ''}>USMLE Step 1</option>
                    <option value="GATE CS" ${this.plannerExam === 'GATE CS' ? 'selected' : ''}>GATE Computer Science</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2" id="planner-weeks-label">
                    Weeks Remaining: ${this.weeksUntilExam} Weeks
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    step="2"
                    value="${this.weeksUntilExam}"
                    oninput="HomeModule.setWeeksUntilExam(this.value)"
                    class="w-full mt-2 accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2" id="planner-hours-label">
                    Study Bandwidth: ${this.weeklyHours} Hrs/Wk
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="35"
                    step="3"
                    value="${this.weeklyHours}"
                    oninput="HomeModule.setWeeklyHours(this.value)"
                    class="w-full mt-2 accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>

              <!-- 4-Phase Roadmap -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="p-4 rounded-2xl bg-white border border-indigo-200 shadow-2xs">
                  <div class="text-[10px] font-bold text-indigo-700 uppercase" id="planner-p1-text">
                    Phase 1 (Wk 1-${Math.round(this.weeksUntilExam * 0.25)})
                  </div>
                  <h4 class="text-sm font-bold text-slate-900 mt-1">Foundational Baseline</h4>
                  <p class="text-xs text-slate-600 mt-2">
                    1 Diagnostic mock + fundamental formula derivation & vocabulary palace indexing.
                  </p>
                </div>

                <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div class="text-[10px] font-bold text-slate-600 uppercase" id="planner-p2-text">
                    Phase 2 (Wk ${Math.round(this.weeksUntilExam * 0.25) + 1}-${Math.round(this.weeksUntilExam * 0.6)})
                  </div>
                  <h4 class="text-sm font-bold text-slate-900 mt-1">Sectional Speed Drills</h4>
                  <p class="text-xs text-slate-600 mt-2">
                    Sub-90 second timing drills per problem + cognitive error taxonomy classification.
                  </p>
                </div>

                <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div class="text-[10px] font-bold text-slate-600 uppercase" id="planner-p3-text">
                    Phase 3 (Wk ${Math.round(this.weeksUntilExam * 0.6) + 1}-${Math.round(this.weeksUntilExam * 0.85)})
                  </div>
                  <h4 class="text-sm font-bold text-slate-900 mt-1">Full Exam Conditioning</h4>
                  <p class="text-xs text-slate-600 mt-2">
                    2 Full-length proctored mocks per week under official time conditions with video review.
                  </p>
                </div>

                <div class="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs">
                  <div class="text-[10px] font-bold text-emerald-700 uppercase">Phase 4 (Final Weeks)</div>
                  <h4 class="text-sm font-bold text-slate-900 mt-1">Taper & Mental Peak</h4>
                  <p class="text-xs text-slate-600 mt-2">
                    Cheat-sheet memorization, sleep cycle alignment, and final confidence calibration.
                  </p>
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span class="text-slate-600">
                  Total Allocated Study Time: <strong class="text-slate-900" id="planner-total-hours">${this.weeksUntilExam * this.weeklyHours} Hours across ${this.weeksUntilExam} weeks.</strong>
                </span>
                <button
                  onclick="openExamModal()"
                  class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-xs cursor-pointer"
                >
                  Sync with My Study Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 11: TRANSPARENT PRICING & FLEXIBLE PLANS
             ======================================================== -->
        <section class="py-16 md:py-20 bg-slate-50 border-t border-slate-200 reveal tilt-in" id="pricing-section">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-10">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Subscription & Test Passes</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Transparent, Value-Driven Investment</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Backed by our 100% score boost guarantee. Cancel anytime with a single click.</p>

              <!-- Toggle -->
              <div class="flex items-center justify-center gap-3 mt-6">
                <span class="text-xs font-semibold ${!this.isAnnualPricing ? 'text-slate-900 font-bold' : 'text-slate-500'}">
                  Monthly Billing
                </span>
                <button
                  type="button"
                  onclick="HomeModule.togglePricing()"
                  class="w-12 h-6 flex items-center rounded-full p-1 transition duration-300 cursor-pointer ${
                    this.isAnnualPricing ? 'bg-indigo-600' : 'bg-slate-300'
                  }"
                >
                  <div class="bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                    this.isAnnualPricing ? 'translate-x-6' : ''
                  }"></div>
                </button>
                <span class="text-xs font-semibold ${this.isAnnualPricing ? 'text-slate-900 font-bold' : 'text-slate-500'}">
                  Annual Billing <span class="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full ml-1">Save 25%</span>
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
              ${PRICING_PLANS.map((plan) => {
                const price = this.isAnnualPricing ? plan.priceAnnual : plan.priceMonthly;
                return `
                  <div class="p-8 rounded-3xl flex flex-col justify-between relative transition ${
                    plan.isPopular
                      ? 'bg-white border-2 border-indigo-600 shadow-xl'
                      : 'bg-white border border-slate-200 shadow-xs'
                  }">
                    ${plan.badge ? `
                      <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                        ${plan.badge}
                      </div>
                    ` : ''}

                    <div>
                      <h3 class="text-xl font-bold text-slate-900 font-display mb-1">${plan.name}</h3>
                      <p class="text-xs text-slate-500 mb-6">${plan.description}</p>

                      <div class="flex items-baseline gap-1 mb-6">
                        <span class="text-4xl font-extrabold text-slate-900 font-display">$${price}</span>
                        <span class="text-xs text-slate-500">/ month</span>
                      </div>

                      <div class="space-y-3 mb-8">
                        ${plan.features.map((feat) => `
                          <div class="flex items-start gap-2.5 text-xs text-slate-700">
                            <svg class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>
                            <span>${feat}</span>
                          </div>
                        `).join('')}
                      </div>
                    </div>

                    <button
                      onclick="openAuthModal('student', 'Enroll in ${plan.name}')"
                      class="w-full py-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                        plan.isPopular
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }"
                    >
                      ${plan.ctaText}
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 12: FREQUENTLY ASKED QUESTIONS
             ======================================================== -->
        <section class="py-16 md:py-20 bg-white border-t border-slate-200 reveal fade-up" id="faq-section">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Clarity & Transparency</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Frequently Asked Candidate Questions</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">
                Everything you need to know about our tests, score guarantee, and adaptive scoring algorithms.
              </p>
            </div>

            <div class="space-y-3">
              ${FAQS.map((faq) => {
                const isOpen = this.activeFaqId === faq.id;
                return `
                  <div class="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onclick="HomeModule.toggleFaq('${faq.id}')"
                      class="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span class="text-sm font-bold text-slate-900">${faq.question}</span>
                      <svg class="w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    ${isOpen ? `
                      <div class="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-3">
                        ${faq.answer}
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>

        <!-- ========================================================
             SECTION 13: SALEM STACKLY FINAL CTA BANNER
             ======================================================== -->
        <section class="py-16 md:py-20 bg-gradient-to-b from-indigo-50/50 via-white to-indigo-50/30 border-t border-slate-200 reveal spring-pop" id="final-cta-section">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="max-w-3xl mx-auto">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-6 border border-indigo-200">
                <svg class="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                <span>Engineered at Stackly Tech Park, Salem</span>
              </div>

              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
                Start Your Journey to the Top 1% Percentile Today
              </h2>
              <p class="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Take the first step with our zero-risk, full diagnostic mock test. Instant question rationale, percentile calibration, and tailored study roadmap included.
              </p>

              <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onclick="openExamModal()"
                  class="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                  <span>Take 10-Minute Free Mock Exam</span>
                </button>

                <button
                  onclick="navigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' });"
                  class="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 transition shadow-xs cursor-pointer"
                >
                  Connect with Salem Counselors
                </button>
              </div>

              <div class="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
                <div class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>No Credit Card Required</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Instant Score Analytics</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Salem Tech Certified Tests</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    refreshScrollReveal();
  }
};

function render_home() {
  HomeModule.render();
}

window.HomeModule = HomeModule;
window.render_home = render_home;
