// ============================================================
// STACKLY SALEM — Full Exam Engine & Diagnostic Simulator Modal
// ============================================================

const ExamEngine = {
  selectedDomain: 'All',
  currentIdx: 0,
  selectedAnswers: {},
  flagged: {},
  secondsRemaining: 600,
  isSubmitted: false,
  showConfirmSubmit: false,
  timerInterval: null,

  getQuestions() {
    const list = window.MOCK_QUESTIONS || [];
    if (this.selectedDomain === 'All') return list;
    const filtered = list.filter((q) => {
      if (this.selectedDomain === 'TNPSC') return q.category === 'TNPSC' || (q.exam && q.exam.includes('TNPSC'));
      if (this.selectedDomain === 'Railways') return q.category === 'Railways' || (q.exam && q.exam.includes('Railways'));
      if (this.selectedDomain === 'Banking') return q.category === 'Banking' || (q.exam && q.exam.includes('Banking'));
      if (this.selectedDomain === 'AI_ML') return q.category === 'AI_ML' || (q.exam && q.exam.includes('AI'));
      if (this.selectedDomain === 'Programming') return q.category === 'Programming' || (q.exam && q.exam.includes('Programming'));
      if (this.selectedDomain === 'History_GK') return q.category === 'History_GK' || (q.exam && q.exam.includes('History'));
      if (this.selectedDomain === 'Kids') return q.category === 'Kids' || (q.exam && q.exam.includes('Kids'));
      if (this.selectedDomain === 'Senior') return q.category === 'Senior' || (q.exam && q.exam.includes('Senior'));
      if (this.selectedDomain === 'Global') {
        return !['TNPSC', 'Railways', 'Banking', 'AI_ML', 'Programming', 'History_GK', 'Kids', 'Senior'].includes(q.category || '');
      }
      return true;
    });
    return filtered.length > 0 ? filtered : list;
  },

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      if (this.secondsRemaining <= 1) {
        this.stopTimer();
        this.isSubmitted = true;
        this.render();
      } else {
        this.secondsRemaining--;
        const timerEl = document.getElementById('exam-live-timer');
        if (timerEl) {
          timerEl.textContent = this.formatTime(this.secondsRemaining);
          if (this.secondsRemaining < 120 && timerEl.parentElement) {
            timerEl.parentElement.className = 'flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold bg-rose-50 border-rose-300 text-rose-700 animate-pulse';
          }
        }
      }
    }, 1000);
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  },

  reset() {
    this.selectedAnswers = {};
    this.flagged = {};
    this.currentIdx = 0;
    this.secondsRemaining = 600;
    this.isSubmitted = false;
    this.showConfirmSubmit = false;
    this.startTimer();
    this.render();
  },

  selectOption(optIdx, qId) {
    this.selectedAnswers[qId] = optIdx;
    this.render();
  },

  toggleFlag(qId) {
    this.flagged[qId] = !this.flagged[qId];
    this.render();
  },

  setDomain(domain) {
    this.selectedDomain = domain;
    this.currentIdx = 0;
    this.render();
  },

  render() {
    const backdrop = document.getElementById('exam-modal-backdrop');
    if (!backdrop) return;

    const questions = this.getQuestions();
    const totalQuestions = questions.length;
    const safeIdx = Math.min(this.currentIdx, Math.max(0, totalQuestions - 1));
    const currentQ = questions[safeIdx] || questions[0];
    const answeredCount = Object.keys(this.selectedAnswers).length;
    const examTitle = AppState.pendingExamTitle || 'Stackly Salem Universal Diagnostic Simulation';
    const user = AppState.user;

    // Calculate score
    let correctCount = 0;
    questions.forEach((q) => {
      if (this.selectedAnswers[q.id] === q.correctAnswer) correctCount++;
    });
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const projectedPercentile = accuracy >= 80 ? '98th - 99th %ile' : accuracy >= 60 ? '84th - 92nd %ile' : '65th - 75th %ile';

    const domainTabs = [
      { id: 'All', label: 'All Exams (Universal)' },
      { id: 'TNPSC', label: 'TNPSC (Group 1, 2, 4)' },
      { id: 'Railways', label: 'Indian Railways RRB' },
      { id: 'Banking', label: 'Banking IBPS/SBI' },
      { id: 'AI_ML', label: 'AI & Machine Learning' },
      { id: 'Programming', label: 'Programming & Tech' },
      { id: 'History_GK', label: 'History & GK' },
      { id: 'Kids', label: 'Kids Olympiad' },
      { id: 'Senior', label: 'Senior Citizens' },
      { id: 'Global', label: 'GRE/GMAT/SAT' },
    ];

    let bodyHTML = '';

    if (!this.isSubmitted) {
      bodyHTML = `
        <!-- Filter Bar -->
        <div class="px-4 sm:px-6 py-2 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span class="text-slate-500 font-semibold shrink-0 flex items-center gap-1 mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            Filter Domain:
          </span>
          ${domainTabs.map(tab => `
            <button type="button" onclick="ExamEngine.setDomain('${tab.id}')"
              class="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${this.selectedDomain === tab.id ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}">
              ${tab.label}
            </button>
          `).join('')}
        </div>

        <!-- Main Workspace -->
        <div class="flex-1 overflow-y-auto flex flex-col md:flex-row">
          <!-- Question Screen -->
          <div class="flex-1 p-5 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                    ${currentQ.exam} • ${currentQ.section || 'General Section'}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[11px] font-bold ${currentQ.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                    ${currentQ.difficulty || 'Medium'} Difficulty
                  </span>
                </div>

                <button type="button" onclick="ExamEngine.toggleFlag(${currentQ.id})"
                  class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${this.flagged[currentQ.id] ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'text-slate-500 hover:text-slate-800 border border-slate-200 hover:bg-slate-50'}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${this.flagged[currentQ.id] ? '#d97706' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
                  <span>${this.flagged[currentQ.id] ? 'Flagged' : 'Flag for Review'}</span>
                </button>
              </div>

              <!-- Question Stem -->
              <div class="mb-6">
                <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Question ${safeIdx + 1} of ${totalQuestions}
                </div>
                <p class="text-base sm:text-lg text-slate-900 font-semibold leading-relaxed">
                  ${currentQ.question}
                </p>
                ${currentQ.codeSnippet ? `
                  <pre class="mt-3 p-3 bg-slate-900 text-emerald-400 text-xs rounded-xl font-mono overflow-x-auto"><code>${currentQ.codeSnippet}</code></pre>
                ` : ''}
              </div>

              <!-- Options -->
              <div class="space-y-3 mb-6">
                ${currentQ.options.map((opt, optIndex) => {
                  const isSelected = this.selectedAnswers[currentQ.id] === optIndex;
                  const letter = String.fromCharCode(65 + optIndex);
                  return `
                    <button type="button" onclick="ExamEngine.selectOption(${optIndex}, ${currentQ.id})"
                      class="w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${isSelected ? 'bg-indigo-50 border-indigo-600 text-slate-900 shadow-xs ring-1 ring-indigo-500 font-medium' : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50/80'}">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 border border-slate-300'}">
                        ${letter}
                      </div>
                      <span class="text-sm pt-0.5 leading-snug">${opt}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Bottom Nav -->
            <div class="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button type="button" onclick="ExamEngine.currentIdx = Math.max(0, ExamEngine.currentIdx - 1); ExamEngine.render()"
                ${safeIdx === 0 ? 'disabled' : ''}
                class="flex items-center gap-1 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none text-slate-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                <span>Previous</span>
              </button>

              <div class="text-xs text-slate-500 font-medium">
                ${answeredCount} of ${totalQuestions} Answered
              </div>

              ${safeIdx < totalQuestions - 1 ? `
                <button type="button" onclick="ExamEngine.currentIdx = Math.min(${totalQuestions - 1}, ExamEngine.currentIdx + 1); ExamEngine.render()"
                  class="flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs">
                  <span>Next Question</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ` : `
                <button type="button" onclick="ExamEngine.showConfirmSubmit = true; ExamEngine.render()"
                  class="flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-xs">
                  <span>Review &amp; Submit</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </button>
              `}
            </div>
          </div>

          <!-- Question Palette Sidebar -->
          <div class="w-full md:w-64 p-5 bg-slate-50 flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Question Palette</h4>
              <div class="grid grid-cols-5 gap-2 mb-6">
                ${questions.map((q, idx) => {
                  const isAnswered = this.selectedAnswers[q.id] !== undefined;
                  const isFlagged = this.flagged[q.id];
                  const isCurrent = idx === safeIdx;
                  let btnStyle = 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100';
                  if (isAnswered) btnStyle = 'bg-indigo-600 border-indigo-600 text-white font-bold';
                  if (isFlagged) btnStyle = 'bg-amber-100 border-amber-400 text-amber-800 font-bold';
                  if (isCurrent) btnStyle += ' ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-50';
                  return `
                    <button type="button" onclick="ExamEngine.currentIdx = ${idx}; ExamEngine.render()"
                      class="h-9 rounded-xl border text-xs flex items-center justify-center transition-all ${btnStyle}">
                      ${idx + 1}
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Legend -->
              <div class="space-y-2 text-[11px] text-slate-600 mb-6 font-medium">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded bg-indigo-600"></span>
                  <span>Answered (${answeredCount})</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded bg-amber-100 border border-amber-400"></span>
                  <span>Flagged (${Object.values(this.flagged).filter(Boolean).length})</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded bg-white border border-slate-200"></span>
                  <span>Not Answered (${totalQuestions - answeredCount})</span>
                </div>
              </div>
            </div>

            <div class="p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 shadow-2xs">
              <div class="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
                Adaptive IRT Engine
              </div>
              Calibrated via Stackly Salem cognitive algorithms.
            </div>
          </div>
        </div>
      `;
    } else {
      // Results & Solutions View
      bodyHTML = `
        <div class="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div class="p-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-slate-50 border border-indigo-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7.5"/><path d="M14 14.66V17c0 .55.45 1 1 1h1.5"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
              </div>
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Diagnostic Performance Completed
                </span>
                <h3 class="text-2xl font-extrabold text-slate-900 font-display">
                  ${accuracy >= 80 ? 'Mastery Tier Performance!' : accuracy >= 60 ? 'Strong Baseline Score' : 'Targeted Practice Recommended'}
                </h3>
                <p class="text-sm text-slate-600">
                  Raw Score: <strong class="text-slate-900">${correctCount}</strong> out of ${totalQuestions} correct • Time taken: ${this.formatTime(600 - this.secondsRemaining)}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 w-full md:w-auto">
              <div class="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
                <div class="text-xs text-slate-500">Projected Percentile</div>
                <div class="text-lg font-bold text-indigo-700 font-display">${projectedPercentile}</div>
              </div>
              <div class="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
                <div class="text-xs text-slate-500">Accuracy Rate</div>
                <div class="text-lg font-bold text-emerald-600 font-display">${accuracy}%</div>
              </div>
            </div>
          </div>

          <!-- Step-by-Step Solutions -->
          <div>
            <h4 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              Question Rationale &amp; Step-by-Step Solutions
            </h4>

            <div class="space-y-4">
              ${questions.map((q, qIdx) => {
                const userAns = this.selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                const letterUser = userAns !== undefined ? String.fromCharCode(65 + userAns) : 'Unanswered';
                const letterCorrect = String.fromCharCode(65 + q.correctAnswer);
                return `
                  <div class="p-4 rounded-2xl border ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Q${qIdx + 1} • ${q.exam} (${q.section || 'General'})
                      </span>
                      <span class="px-2 py-0.5 rounded-md text-xs font-bold ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                        ${isCorrect ? 'Correct (+1.0)' : 'Incorrect (0.0)'}
                      </span>
                    </div>

                    <p class="text-sm font-semibold text-slate-900 mb-3">${q.question}</p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      <div class="p-2.5 rounded-xl bg-white border border-slate-200">
                        <span class="text-slate-500">Your Selection: </span>
                        <span class="${isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}">
                          ${letterUser !== 'Unanswered' ? `Option ${letterUser}` : 'Not Answered'}
                        </span>
                      </div>
                      <div class="p-2.5 rounded-xl bg-white border border-slate-200">
                        <span class="text-slate-500">Correct Answer: </span>
                        <span class="text-emerald-700 font-bold">
                          Option ${letterCorrect}: ${q.options[q.correctAnswer]}
                        </span>
                      </div>
                    </div>

                    <div class="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200 mb-2">
                      <strong class="text-indigo-700">Explanation: </strong>
                      ${q.explanation}
                    </div>

                    <div class="text-xs text-amber-800 flex items-start gap-1.5 pt-1 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px;"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
                      <span><strong>Exam Tip:</strong> ${q.tip}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <button type="button" onclick="ExamEngine.reset()"
              class="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              <span>Retake Diagnostic Mock</span>
            </button>

            <button type="button" onclick="closeExamModal()"
              class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs">
              Close &amp; Explore Full Courses
            </button>
          </div>
        </div>
      `;
    }

    backdrop.innerHTML = `
      <div class="modal-backdrop" id="exam-inner-backdrop">
        <div class="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-800 my-auto">
          <!-- Top Header -->
          <div class="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-50 border-b border-slate-200 gap-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-xs p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="398 82 212 290" fill="currentColor" class="w-5 h-5 text-white">
                  <path fill="currentColor" opacity="1.000000" stroke="none" d=" M419.713867,256.179962   C408.001251,235.739304 410.215973,215.613876 419.889709,195.679504   C426.373138,182.319229 436.255493,171.444672 446.508270,160.904480   C457.075165,150.041229 468.783997,140.348602 478.792694,128.896606   C487.411407,119.035004 494.797852,108.464394 500.031921,96.425682   C500.738983,94.799370 501.001617,92.854477 502.785980,91.712807   C503.214905,91.838028 503.879059,91.821617 504.103485,92.127670   C514.526489,106.341171 522.003967,121.483376 518.287415,139.859406   C515.933533,151.498276 508.987885,160.308563 500.296600,167.942245   C487.788574,178.928223 473.634369,187.949692 462.046570,200.037262   C456.219025,206.116135 451.191589,212.659836 449.149933,221.054688   C445.376373,236.570572 454.272034,249.198563 470.197021,250.779221   C485.241028,252.272446 499.302216,248.880798 512.632202,241.996979   C514.021362,241.279602 515.213196,239.793518 517.062500,240.547546   C517.833252,242.063324 516.690857,242.794266 515.917847,243.562866   C502.480865,256.923462 487.519073,267.973206 468.591339,271.949402   C447.923096,276.291199 431.269562,272.383606 419.713867,256.179962  z"/>
                  <path fill="currentColor" opacity="1.000000" stroke="none" d=" M536.351807,311.352905   C521.089722,325.623138 508.631836,341.451172 501.644409,361.304535   C500.580017,360.856842 499.799347,360.777496 499.458496,360.348633   C491.323975,350.113098 485.458466,338.909088 484.707672,325.531189   C484.034546,313.536499 489.236786,303.909576 496.947052,295.363251   C506.737030,284.511749 519.089050,276.702271 530.329102,267.573334   C539.676453,259.981689 548.930542,252.352356 553.649658,240.719803   C556.247925,234.315125 556.803040,227.722214 555.167542,221.122284   C551.964783,208.197189 539.399353,200.886032 526.174622,203.877502   C513.911682,206.651428 503.242737,212.702515 493.079834,219.823700   C492.039246,220.552856 491.267578,221.851700 489.661957,221.557190   C488.659760,220.289383 489.653076,219.345703 490.287292,218.480408   C503.850159,199.976334 521.506714,187.674316 544.321167,183.636948   C574.742554,178.253418 599.437622,199.883118 594.804749,234.346802   C592.539368,251.198425 583.628967,264.794067 572.581299,277.156372   C561.558105,289.491241 548.610413,299.803345 536.351807,311.352905  z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 tracking-wide">${examTitle}</h3>
                <div class="text-xs text-slate-500 flex items-center gap-2">
                  <span>Stackly Psychometric Engine</span>
                  <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span class="text-indigo-600 font-semibold">Salem HQ Test Mode</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 ml-auto">
              ${!this.isSubmitted ? `
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold bg-white border-slate-200 text-slate-700 shadow-2xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span id="exam-live-timer">${this.formatTime(this.secondsRemaining)}</span>
                </div>
                <button type="button" onclick="ExamEngine.showConfirmSubmit = true; ExamEngine.render()"
                  class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs">
                  End Exam
                </button>
              ` : ''}

              <button type="button" onclick="closeExamModal()" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 transition" aria-label="Close mock test">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          <!-- Candidate Auth & Proctor Strip -->
          <div class="bg-indigo-900 text-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex flex-wrap items-center gap-3 sm:gap-4">
              <div class="flex items-center gap-1.5 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                <span>Candidate:</span>
                <strong class="text-white font-bold">${user?.name || 'Authorized Aspirant'}</strong>
              </div>
              <div class="hidden sm:flex items-center gap-1 text-indigo-200">
                <span>Roll:</span>
                <span class="font-mono font-semibold text-white">STK-2026-${(user?.id || '8492').slice(-4).toUpperCase()}</span>
              </div>
              <div class="hidden md:flex items-center gap-1 text-indigo-200">
                <span>Target Focus:</span>
                <span class="text-amber-300 font-semibold">${user?.targetExam || 'State & National Exams'}</span>
              </div>
            </div>

            <div class="flex items-center gap-2 text-[11px] text-indigo-200 ml-auto">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Live AI Proctor Active
              </span>
              <span class="hidden sm:inline text-indigo-300">Salem HQ Cloud Node 01</span>
            </div>
          </div>

          ${bodyHTML}

          <!-- Confirm Submit Dialog Overlay -->
          ${this.showConfirmSubmit ? `
            <div class="absolute inset-0 z-20 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
              <div class="max-w-md w-full p-6 bg-white border border-slate-200 rounded-3xl shadow-xl text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-3"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                <h4 class="text-lg font-bold text-slate-900 mb-1">Finish Diagnostic Mock?</h4>
                <p class="text-sm text-slate-600 mb-4">
                  You have answered <strong class="text-slate-900 font-bold">${answeredCount}</strong> of ${totalQuestions} questions. Unanswered items will receive 0 marks.
                </p>
                <div class="flex gap-3">
                  <button type="button" onclick="ExamEngine.showConfirmSubmit = false; ExamEngine.render()"
                    class="flex-1 py-2.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                    Return to Test
                  </button>
                  <button type="button" onclick="ExamEngine.showConfirmSubmit = false; ExamEngine.isSubmitted = true; ExamEngine.stopTimer(); ExamEngine.render()"
                    class="flex-1 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-xs">
                    Yes, Submit Now
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    const innerBackdrop = document.getElementById('exam-inner-backdrop');
    if (innerBackdrop) {
      innerBackdrop.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeExamModal();
      });
    }
  }
};

function renderExamModal() {
  ExamEngine.reset();
}

window.ExamEngine = ExamEngine;
window.renderExamModal = renderExamModal;
