// ============================================================
// STACKLY SALEM — Courses Page Component
// ============================================================

const CoursesModule = {
  searchQuery: '',
  selectedExam: 'All',
  selectedLevel: 'All',
  sortBy: 'popular',
  downloadedResId: null,

  setSearch(q) {
    this.searchQuery = q;
    this.render();
  },

  setExam(ex) {
    this.selectedExam = ex;
    this.render();
  },

  setLevel(lvl) {
    this.selectedLevel = lvl;
    this.render();
  },

  setSort(sort) {
    this.sortBy = sort;
    this.render();
  },

  handleDownload(id, title) {
    this.downloadedResId = id;
    showToast(`"${title}" has been prepared and securely downloaded from Stackly Salem cloud.`);
    this.render();
  },

  render() {
    const el = document.getElementById('page-courses');
    if (!el) return;

    const allCourses = window.COURSES || [];
    const resources = window.HIGH_YIELD_RESOURCES || [];

    const filtered = allCourses.filter(c => {
      const q = this.searchQuery.toLowerCase();
      const matchesSearch = !q ||
        c.title.toLowerCase().includes(q) ||
        c.exam.toLowerCase().includes(q) ||
        (c.instructor && c.instructor.name.toLowerCase().includes(q));
      const matchesExam = this.selectedExam === 'All' || c.exam === this.selectedExam;
      const matchesLevel = this.selectedLevel === 'All' || c.level === this.selectedLevel;
      return matchesSearch && matchesExam && matchesLevel;
    }).sort((a, b) => {
      if (this.sortBy === 'rating') return b.rating - a.rating;
      if (this.sortBy === 'priceLow') return a.salePrice - b.salePrice;
      return b.enrolledStudents - a.enrolledStudents;
    });

    const examTabs = [
      { id: 'All', label: 'All' },
      { id: 'TNPSC', label: 'TNPSC' },
      { id: 'RRB', label: 'Railways' },
      { id: 'BANK', label: 'Banking' },
      { id: 'AI-ML', label: 'AI & ML' },
      { id: 'TECH-CODE', label: 'Programming' },
      { id: 'HIST-GK', label: 'History & GK' },
      { id: 'KIDS-OLY', label: 'Kids Olympiad' },
      { id: 'SENIOR-FIT', label: 'Senior Learning' },
      { id: 'GRE', label: 'GRE' },
      { id: 'GMAT', label: 'GMAT' },
      { id: 'MCAT', label: 'MCAT' },
      { id: 'SAT', label: 'SAT' },
    ];

    el.innerHTML = `
      <div class="w-full text-slate-800 bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
        <!-- Hero -->
        <section class="relative pt-14 pb-16 md:pt-20 md:pb-20 bg-gradient-to-b from-white via-indigo-50/40 to-slate-50 border-b border-slate-200" id="courses-hero">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-10">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 shadow-xs text-indigo-700 text-xs font-bold mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                <span>Stackly Salem Academic Curricula</span>
              </div>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display">
                Comprehensive Masterclasses &amp; Adaptive Test Banks
              </h1>
              <p class="mt-3 text-xs sm:text-sm text-slate-600">
                Select from specialized programs led by 99th percentile coaches, backed by real-time Item Response Theory mock simulators.
              </p>
            </div>

            <!-- Search & Filter Hub -->
            <div class="max-w-5xl mx-auto p-4 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
              <div class="flex flex-col sm:flex-row gap-3">
                <div class="relative flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3.5 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" placeholder="Search by exam (GRE, GMAT, SAT, MCAT...), topic, or instructor..."
                    value="${this.searchQuery}" oninput="CoursesModule.searchQuery = this.value; CoursesModule.render()"
                    class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                </div>

                <div class="flex gap-2">
                  <select onchange="CoursesModule.setLevel(this.value)"
                    class="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                    <option value="All" ${this.selectedLevel === 'All' ? 'selected' : ''}>All Levels</option>
                    <option value="Beginner" ${this.selectedLevel === 'Beginner' ? 'selected' : ''}>Beginner</option>
                    <option value="Intermediate" ${this.selectedLevel === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                    <option value="Mastery" ${this.selectedLevel === 'Mastery' ? 'selected' : ''}>Mastery</option>
                    <option value="Comprehensive" ${this.selectedLevel === 'Comprehensive' ? 'selected' : ''}>Comprehensive</option>
                  </select>

                  <select onchange="CoursesModule.setSort(this.value)"
                    class="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                    <option value="popular" ${this.sortBy === 'popular' ? 'selected' : ''}>Most Enrolled</option>
                    <option value="rating" ${this.sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
                    <option value="priceLow" ${this.sortBy === 'priceLow' ? 'selected' : ''}>Lowest Price</option>
                  </select>
                </div>
              </div>

              <!-- Exam Filter Pills -->
              <div class="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
                <span class="text-slate-500 mr-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                  Exam:
                </span>
                ${examTabs.map(ex => `
                  <button onclick="CoursesModule.setExam('${ex.id}')"
                    class="px-3 py-1 rounded-lg transition whitespace-nowrap cursor-pointer ${this.selectedExam === ex.id ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                    ${ex.label}
                  </button>
                `).join('')}
                <span class="ml-auto text-slate-500 text-[11px] font-medium">
                  Showing ${filtered.length} Programs
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Courses Grid (Always 100% visible on all viewports) -->
        <section class="py-16 md:py-20 bg-white border-b border-slate-200" id="courses-grid">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${filtered.map(course => `
                <div class="rounded-3xl bg-slate-50/60 border border-slate-200 hover:border-indigo-300 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                      <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                        ${course.exam} • ${course.level}
                      </span>
                      ${course.badge ? `
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ${course.badge}
                        </span>
                      ` : ''}
                    </div>

                    <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug">
                      ${course.title}
                    </h3>

                    <div class="flex items-center gap-2 mb-4 text-xs text-slate-500">
                      <div class="flex items-center text-amber-500 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1" class="mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span>${course.rating}</span>
                      </div>
                      <span>(${course.reviewsCount} reviews)</span>
                      <span>•</span>
                      <span>${course.enrolledStudents.toLocaleString()} students</span>
                    </div>

                    <!-- Instructor -->
                    <div class="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-200 mb-4 shadow-2xs">
                      <img src="${course.instructor.avatar}" alt="${course.instructor.name}" class="w-9 h-9 rounded-lg object-cover ring-1 ring-indigo-200 shrink-0">
                      <div class="truncate">
                        <div class="text-xs font-semibold text-slate-900">${course.instructor.name}</div>
                        <div class="text-[11px] text-slate-500 truncate">${course.instructor.role}</div>
                      </div>
                    </div>

                    <!-- Specs -->
                    <div class="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 mb-4">
                      <div><span class="text-slate-400">Duration: </span><span class="font-semibold text-slate-900">${course.durationWeeks} Weeks</span></div>
                      <div><span class="text-slate-400">Video Hours: </span><span class="font-semibold text-slate-900">${course.videoHours} Hours</span></div>
                      <div><span class="text-slate-400">Practice Bank: </span><span class="font-semibold text-slate-900">${course.practiceQuestions}+ Qs</span></div>
                      <div><span class="text-slate-400">Full Mocks: </span><span class="font-semibold text-slate-900">${course.fullMocksCount} Tests</span></div>
                    </div>

                    <!-- Highlights -->
                    <div class="space-y-1.5 text-xs text-slate-600 mb-2">
                      ${course.highlights.slice(0, 3).map(h => `
                        <div class="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                          <span>${h}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>

                  <div class="p-6 pt-0">
                    <div class="flex items-center justify-between pt-4 border-t border-slate-200 mb-4">
                      <div>
                        <div class="text-[10px] text-slate-400 uppercase font-semibold">Program Fee</div>
                        <div class="text-2xl font-bold text-slate-900">
                          $${course.salePrice}
                          <span class="text-xs line-through text-slate-400 font-normal ml-1">$${course.originalPrice}</span>
                        </div>
                      </div>
                      <button onclick="openSyllabus(COURSES.find(c => c.id === '${course.id}'))" class="text-xs text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-4 cursor-pointer">
                        Inspect Syllabus (${course.syllabus.length} Modules)
                      </button>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                      <button onclick="openSyllabus(COURSES.find(c => c.id === '${course.id}'))" class="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition text-center shadow-2xs cursor-pointer">
                        View Details
                      </button>
                      <button onclick="openSyllabus(COURSES.find(c => c.id === '${course.id}'))" class="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs text-center cursor-pointer">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Test Series Packages -->
        <section class="py-16 md:py-20 bg-slate-50 border-b border-slate-200" id="test-series">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Exam Simulation Engine</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Official-Format Mock Test Series Packages</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Need only timed simulations without video lectures? Choose our dedicated test series packs with Item Response Theory analytics.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Essential -->
              <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div class="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Essential Pack</div>
                  <h3 class="text-xl font-bold text-slate-900 mb-2">5 Full Adaptive Mocks</h3>
                  <p class="text-xs text-slate-500 mb-4">Ideal for a quick pre-exam calibration 3-4 weeks prior to test day.</p>
                  <div class="text-3xl font-extrabold text-slate-900 mb-4">$49</div>
                  <ul class="space-y-2 text-xs text-slate-700">
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>5 Section-adaptive full mock tests</span></li>
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Instant percentile &amp; raw score report</span></li>
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Complete step-by-step written explanations</span></li>
                  </ul>
                </div>
                <button onclick="openExam()" class="w-full mt-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer">
                  Try Free Sample Mock First
                </button>
              </div>

              <!-- Pro -->
              <div class="p-6 rounded-3xl bg-white border-2 border-indigo-600 shadow-xl flex flex-col justify-between relative">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase shadow-sm">
                  Most Comprehensive
                </div>
                <div>
                  <div class="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Pro Simulation Pack</div>
                  <h3 class="text-xl font-bold text-slate-900 mb-2">15 Adaptive Mocks + 50 Sectionals</h3>
                  <p class="text-xs text-slate-500 mb-4">The complete testing toolkit for thorough stamina building and time trials.</p>
                  <div class="text-3xl font-extrabold text-slate-900 mb-4">$99</div>
                  <ul class="space-y-2 text-xs text-slate-700">
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>15 Full-length proctored simulations</span></li>
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>50 Subject-specific timed speed drills</span></li>
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Cognitive latency tracking per question</span></li>
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Video solutions for all hard tier items</span></li>
                  </ul>
                </div>
                <button onclick="openExam()" class="w-full mt-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-indigo-600/20 cursor-pointer">
                  Access Pro Test Series
                </button>
              </div>

              <!-- Ultimate -->
              <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div class="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Ultimate Mastery</div>
                  <h3 class="text-xl font-bold text-slate-900 mb-2">Unlimited 30+ Mocks + AI Tutor</h3>
                  <p class="text-xs text-slate-500 mb-4">For candidates aiming for top 10 ranked global programs and medical boards.</p>
                  <div class="text-3xl font-extrabold text-slate-900 mb-4">$149</div>
                  <ul class="space-y-2 text-xs text-slate-700">
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Unlimited full-length tests &amp; resets</span></li>
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Personalized error log classification</span></li>
                    <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>3 1-on-1 Faculty Mock Review sessions</span></li>
                  </ul>
                </div>
                <button onclick="navigate('contact')" class="w-full mt-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Cheat Sheets -->
        <section class="py-16 md:py-20 bg-white border-b border-slate-200" id="cheat-sheets">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Open Academic Resources</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Free High-Yield Cheat Sheets &amp; Flashcard Decks</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Zero-cost formula books and reasoning summaries compiled by our master coaches in Salem.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              ${resources.map(res => `
                <div class="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-3 text-xs">
                      <span class="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-bold">${res.exam}</span>
                      <span class="text-slate-500">${res.format}</span>
                    </div>
                    <h4 class="text-sm font-bold text-slate-900 mb-2 leading-snug">${res.title}</h4>
                    <p class="text-xs text-slate-500 mb-4">${res.description}</p>
                  </div>

                  <div>
                    <div class="text-[11px] text-slate-500 mb-3">
                      Downloaded by <strong class="text-slate-900 font-bold">${res.downloads}</strong> aspirants
                    </div>
                    <button onclick="CoursesModule.handleDownload('${res.id}', '${res.title.replace(/'/g, "\\'")}')"
                      class="w-full py-2 border text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-2xs cursor-pointer ${this.downloadedResId === res.id ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white hover:bg-indigo-600 text-slate-700 hover:text-white border-slate-200 hover:border-indigo-600'}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      <span>${this.downloadedResId === res.id ? 'Downloaded ✓' : 'Download PDF Free'}</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Format Comparison -->
        <section class="py-16 md:py-20 bg-slate-50 border-b border-slate-200" id="comparison-matrix">
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Format Comparison</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Compare Preparation Formats</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Choose the level of accountability and instructor feedback that fits your schedule.</p>
            </div>

            <div class="overflow-x-auto bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500">
                    <th class="py-4 px-4 font-bold text-slate-900">Features &amp; Modules</th>
                    <th class="py-4 px-4 font-semibold">Self-Paced Pass</th>
                    <th class="py-4 px-4 font-bold text-indigo-700">Pro Comprehensive</th>
                    <th class="py-4 px-4 font-semibold">1-on-1 Mentorship</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td class="py-3.5 px-4 font-semibold text-slate-900">Adaptive Diagnostic Engine</td>
                    <td class="py-3.5 px-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></td>
                    <td class="py-3.5 px-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></td>
                    <td class="py-3.5 px-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></td>
                  </tr>
                  <tr>
                    <td class="py-3.5 px-4 font-semibold text-slate-900">Proctored Full-Length Mocks</td>
                    <td class="py-3.5 px-4">5 Tests</td>
                    <td class="py-3.5 px-4 font-bold text-indigo-700">15 Tests</td>
                    <td class="py-3.5 px-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td class="py-3.5 px-4 font-semibold text-slate-900">Video Masterclass Lessons</td>
                    <td class="py-3.5 px-4">Basic Library</td>
                    <td class="py-3.5 px-4 font-bold text-indigo-700">Complete 80+ Hours</td>
                    <td class="py-3.5 px-4">Complete + Recordings</td>
                  </tr>
                  <tr>
                    <td class="py-3.5 px-4 font-semibold text-slate-900">Live Doubt Resolution</td>
                    <td class="py-3.5 px-4 text-slate-400">—</td>
                    <td class="py-3.5 px-4 font-bold text-indigo-700">Weekly Live Hours</td>
                    <td class="py-3.5 px-4">Priority 15-Min Desk</td>
                  </tr>
                  <tr>
                    <td class="py-3.5 px-4 font-semibold text-slate-900">Score Improvement Guarantee</td>
                    <td class="py-3.5 px-4 text-slate-400">—</td>
                    <td class="py-3.5 px-4 font-bold text-emerald-600">100% Guaranteed</td>
                    <td class="py-3.5 px-4 font-bold text-emerald-600">100% Guaranteed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Guarantee -->
        <section class="py-16 md:py-20 bg-white" id="guarantee">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-4xl mx-auto shadow-sm">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                The Stackly Score Improvement Guarantee
              </h2>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
                We stand behind our curriculum with absolute confidence. If you complete at least 80% of video coursework and 8 proctored full-length mocks, we guarantee an official score jump over your verified baseline (e.g. +14 on GRE, +80 on GMAT, +150 on SAT). If you do not achieve this boost, you receive a 100% full refund with no hidden clauses, processed by Stackly Salem.
              </p>

              <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onclick="openExam()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition cursor-pointer">
                  Start Free Diagnostic Calibration
                </button>
                <button onclick="navigate('contact')" class="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition shadow-2xs cursor-pointer">
                  Speak with Salem Admissions Counselor
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

function render_courses() {
  CoursesModule.render();
}

window.CoursesModule = CoursesModule;
window.render_courses = render_courses;
