// ============================================================
// STACKLY SALEM — About Page Component
// ============================================================

const AboutModule = {
  activePillar: 0,

  pillars: [
    {
      number: '01',
      title: 'Precision Diagnostic Baseline',
      subtitle: 'Identify specific micro-deficits before studying a single page',
      description:
        'Most candidates waste hundreds of hours reviewing concepts they already understand. Our initial diagnostic exam measures both accuracy and response velocity across 48 sub-topics, generating an itemized cognitive deficit matrix.',
      metrics: ['48 Sub-topic breakdown', 'Velocity latency tracking', 'Zero unnecessary review'],
    },
    {
      number: '02',
      title: 'Micro-Concept & Shortcut Mastery',
      subtitle: 'Derivation formulas and rapid cognitive heuristics',
      description:
        'Rather than memorizing arbitrary formulas, we teach candidates how mathematical and logical patterns are constructed. Learn how to solve complex geometry in 30 seconds using symmetry, or deconstruct dense medical research passages at 350 words per minute.',
      metrics: ['Sub-75 second problem solving', 'High-yield memory palace', 'Pattern deconstruction'],
    },
    {
      number: '03',
      title: 'High-Pressure Cognitive Time Trials',
      subtitle: 'Drill under extreme clock conditions to build stamina',
      description:
        'Exam day failure is almost never due to lack of intelligence—it is caused by time pressure panic and cognitive exhaustion. Our timed sectional gauntlets simulate 110% of official test speed, so the actual test feels slow and predictable.',
      metrics: ['110% Pace pressure drills', 'Panic threshold elimination', 'Stamina building'],
    },
    {
      number: '04',
      title: 'Full-Length Proctored Conditioning',
      subtitle: 'Exact software simulation, biometric pacing, and error taxonomy',
      description:
        'Replicate the exact exam room ergonomics: identical software skin, on-screen calculators, keyboard shortcuts, and strict break timings. Every incorrect answer is classified into our 4-point error log to ensure mistakes never recur.',
      metrics: ['Identical test-day UI', 'Automated error categorization', 'True score predictability'],
    },
  ],

  milestones: [
    {
      year: '2021',
      title: 'Founding at Stackly Innovation Lab, Salem',
      desc: 'Formed by a coalition of standardized test 99th-percentile scorers and psychometric researchers at Stackly Technologies, Salem.',
    },
    {
      year: '2022',
      title: 'Adaptive IRT 1.0 Release',
      desc: 'Launched our proprietary Item Response Theory engine, helping the first 25,000 candidates achieve an average +14 point GRE jump.',
    },
    {
      year: '2023',
      title: 'Expansion to Medical & Business Boards',
      desc: 'Introduced comprehensive MCAT, USMLE Step 1, and GMAT Focus preparation modules with high-speed video case reviews.',
    },
    {
      year: '2024',
      title: 'Testing Labs & Salem Tech Center',
      desc: 'Opened state-of-the-art proctored simulation centers in Salem, Chennai, Boston, and Singapore.',
    },
    {
      year: '2026',
      title: 'Over 520,000 Aspirants Worldwide',
      desc: 'Ranked the #1 adaptive exam preparation ecosystem with over 42 million questions solved and 98.4% top-decile placements.',
    },
  ],

  setPillar(idx) {
    this.activePillar = idx;
    const p = this.pillars[idx];
    const detailsContainer = document.getElementById('pillar-details-container');
    const buttonsContainer = document.getElementById('pillar-buttons-container');

    if (detailsContainer && buttonsContainer) {
      detailsContainer.innerHTML = `
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Pillar ${p.number} Deep Dive</div>
          <h3 class="text-2xl font-bold text-slate-900 font-display mb-2">${p.title}</h3>
          <p class="text-xs text-indigo-700 font-semibold mb-4">${p.subtitle}</p>
          <p class="text-sm text-slate-600 leading-relaxed mb-6">${p.description}</p>
          <div class="space-y-2.5 pt-4 border-t border-slate-200">
            <div class="text-xs font-bold uppercase text-slate-500">Core Outcomes:</div>
            ${p.metrics.map(m => `
              <div class="flex items-center gap-2.5 text-xs text-slate-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>${m}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span class="text-slate-500">Standardized across all our exam modules</span>
          <button onclick="openExam()" class="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer">
            <span>Test Your Baseline</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      `;

      const btns = buttonsContainer.querySelectorAll('button');
      btns.forEach((btn, bIdx) => {
        const badge = btn.querySelector('.pillar-num-badge');
        if (bIdx === idx) {
          btn.className = 'w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer bg-white border-indigo-600 shadow-md text-slate-900';
          if (badge) badge.className = 'pillar-num-badge w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 bg-indigo-600 text-white shadow-xs';
        } else {
          btn.className = 'w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer bg-slate-50 border-slate-200 text-slate-600 hover:bg-white';
          if (badge) badge.className = 'pillar-num-badge w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 bg-slate-200 text-slate-700';
        }
      });
      return;
    }
    this.render();
  },

  render() {
    const el = document.getElementById('page-about');
    if (!el) return;

    const faculty = window.FACULTY_MEMBERS || [];
    const p = this.pillars[this.activePillar];

    el.innerHTML = `
      <div class="w-full text-slate-800 bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
        <!-- Hero -->
        <section class="relative pt-14 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50 border-b border-slate-200" id="about-hero">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div class="lg:col-span-7">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 shadow-xs text-indigo-700 text-xs font-bold mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                  <span>Stackly Technologies • Salem Headquarters</span>
                </div>

                <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display leading-tight">
                  Democratizing the Cognitive Science of
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                    Top 1% Test Performance.
                  </span>
                </h1>

                <p class="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Standardized testing has historically rewarded expensive private tutors and privileged insider access. Stackly was founded in Salem on a singular conviction: when candidates are equipped with adaptive cognitive diagnostics, high-yield pattern recognition, and relentless simulation, elite scores become accessible to every ambitious student worldwide.
                </p>

                <div class="mt-8 flex flex-wrap items-center gap-4">
                  <button onclick="openExam()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition cursor-pointer">
                    Experience Adaptive Testing
                  </button>
                  <button onclick="navigate('courses')" class="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition shadow-xs cursor-pointer">
                    Explore Master Courses
                  </button>
                </div>
              </div>

              <!-- Floating showcase -->
              <div class="lg:col-span-5 relative flex justify-center">
                <div class="relative rounded-3xl p-3 bg-white border border-slate-200 shadow-xl max-w-sm w-full animate-float">
                  <div class="rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 mb-3">
                    <img src="./assets/images/img-1516321318423-f0.webp" alt="Salem Cognitive Lab" class="w-full h-full object-cover">
                  </div>
                  <div class="p-2">
                    <div class="text-xs font-extrabold text-slate-900">Salem Cognitive Assessment Center</div>
                    <div class="text-[11px] text-slate-500 mt-0.5">Stackly Tech Park, Fairlands, Salem, Tamil Nadu</div>
                    <div class="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100 text-[11px] text-emerald-700 font-bold">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span>ISO 9001 Certified Psychometric Facility</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Methodology (Always visible, no reveal hide) -->
        <section class="py-16 md:py-20 bg-white border-b border-slate-200" id="methodology">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">The Stackly Formula</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Our 4-Pillar Pedagogical Framework</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Engineered to replace brute-force memorization with targeted neuro-cognitive conditioning.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
              <div class="lg:col-span-5 space-y-3" id="pillar-buttons-container">
                ${this.pillars.map((item, idx) => `
                  <button onclick="AboutModule.setPillar(${idx})"
                    class="w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${this.activePillar === idx ? 'bg-white border-indigo-600 shadow-md text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}">
                    <div class="pillar-num-badge w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${this.activePillar === idx ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-200 text-slate-700'}">
                      ${item.number}
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-slate-900">${item.title}</h4>
                      <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${item.subtitle}</p>
                    </div>
                  </button>
                `).join('')}
              </div>

              <div class="lg:col-span-7 p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between" id="pillar-details-container">
                <div>
                  <div class="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Pillar ${p.number} Deep Dive</div>
                  <h3 class="text-2xl font-bold text-slate-900 font-display mb-2">${p.title}</h3>
                  <p class="text-xs text-indigo-700 font-semibold mb-4">${p.subtitle}</p>
                  <p class="text-sm text-slate-600 leading-relaxed mb-6">${p.description}</p>
                  <div class="space-y-2.5 pt-4 border-t border-slate-200">
                    <div class="text-xs font-bold uppercase text-slate-500">Core Outcomes:</div>
                    ${p.metrics.map(m => `
                      <div class="flex items-center gap-2.5 text-xs text-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span>${m}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span class="text-slate-500">Standardized across all our exam modules</span>
                  <button onclick="openExam()" class="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer">
                    <span>Test Your Baseline</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Faculty Section -->
        <section class="py-16 md:py-20 bg-slate-50 border-b border-slate-200" id="advisory-board">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-14">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Academic Council</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Led by Elite Educators &amp; Cognitive Researchers</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Our faculty members average over 12 years of standardized test deconstruction and curriculum design.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              ${faculty.map(fac => `
                <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <img src="${fac.avatar}" alt="${fac.name}" class="w-24 h-24 rounded-2xl object-cover mb-4 ring-2 ring-indigo-200 shadow-2xs">
                    <h4 class="text-base font-bold text-slate-900">${fac.name}</h4>
                    <div class="text-xs text-indigo-600 font-bold mb-1">${fac.role}</div>
                    <div class="text-xs text-slate-500 mb-3">${fac.credentials}</div>
                    <p class="text-xs text-slate-600 leading-relaxed mb-4">${fac.bio}</p>
                  </div>
                  <div class="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    <span>Specialization: </span>
                    <span class="text-slate-900 font-semibold">${fac.specialization}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Milestones -->
        <section class="py-16 md:py-20 bg-white border-b border-slate-200" id="milestones">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-14">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Our Journey</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Milestones That Shaped Global Exam Prep</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">From the Salem innovation research lab to an internationally adopted prep platform.</p>
            </div>

            <div class="max-w-3xl mx-auto space-y-4">
              ${this.milestones.map(m => `
                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-2xs">
                  <div class="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-display min-w-20">${m.year}</div>
                  <div class="border-l border-slate-200 sm:pl-6">
                    <h4 class="text-base font-bold text-slate-900">${m.title}</h4>
                    <p class="text-xs text-slate-600 mt-1 leading-relaxed">${m.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- IRT Section -->
        <section class="py-16 md:py-20 bg-slate-50 border-b border-slate-200" id="irt-technology">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Mathematical Foundation</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">How Our Multi-Stage Adaptive Engine Calibrates Difficulty</h2>
                <p class="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                  Standardized tests like the Digital SAT, GRE, and GMAT do not simply add up correct answers. They employ mathematical Item Response Theory (IRT), where each question possesses three unique mathematical parameters:
                </p>

                <div class="mt-6 space-y-3 text-xs">
                  <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <strong class="text-indigo-700 font-bold block mb-1">Parameter a (Discrimination Power):</strong>
                    Determines how sharply a question differentiates between a 90th percentile student and a 99th percentile candidate.
                  </div>
                  <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <strong class="text-emerald-700 font-bold block mb-1">Parameter b (Difficulty Level):</strong>
                    The ability threshold required for a 50% probability of answering correctly.
                  </div>
                  <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <strong class="text-amber-700 font-bold block mb-1">Parameter c (Pseudo-Guessing Floor):</strong>
                    Adjusts score penalty curves for lucky random guesses.
                  </div>
                </div>
              </div>

              <div class="p-8 rounded-3xl bg-white border border-slate-200 shadow-md text-center">
                <div class="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Continuous Ability Convergence</h3>
                <p class="text-xs text-slate-600 max-w-md mx-auto mb-6">After just 15 questions, our algorithm narrows your true percentile score within a tight ±3% confidence interval.</p>
                <div class="grid grid-cols-2 gap-3 text-left text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <div class="text-slate-500">Convergence Speed:</div>
                    <div class="text-slate-900 font-bold">12-15 Questions</div>
                  </div>
                  <div>
                    <div class="text-slate-500">Confidence Band:</div>
                    <div class="text-emerald-700 font-bold">99.1% Statistical Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Standards -->
        <section class="py-16 md:py-20 bg-white" id="standards">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="max-w-3xl mx-auto">
              <div class="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Strict Alignment with Official Testing Guidelines</h2>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Stackly Salem adheres strictly to published test specifications and does not utilize leaked or copyrighted exam questions. All 25,000+ items in our proprietary bank are independently authored by subject matter PhDs to match official cognitive targets.
              </p>
              <div class="mt-8 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
                <button onclick="navigate('not-found')" class="flex items-center gap-2 hover:text-indigo-600 transition cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>ISO 9001 Pedagogical Quality Certified</span>
                </button>
                <button onclick="navigate('not-found')" class="flex items-center gap-2 hover:text-indigo-600 transition cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>FERPA &amp; GDPR Student Privacy Compliant</span>
                </button>
                <button onclick="navigate('not-found')" class="flex items-center gap-2 hover:text-indigo-600 transition cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Stackly Technologies Salem R&amp;D Lab</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    refreshScrollReveal();
  }
};

function render_about() {
  AboutModule.render();
}

window.AboutModule = AboutModule;
window.render_about = render_about;
