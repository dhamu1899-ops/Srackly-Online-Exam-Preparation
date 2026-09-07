// ============================================================
// STACKLY SALEM — Services Page Component
// ============================================================

const ServicesModule = {
  selectedCategory: 'All',
  selectedServiceForInquiry: null,
  inquirySuccess: false,
  inquiryForm: {
    name: '',
    phone: '',
    email: '',
    preferredBatch: 'Weekend Morning Batch (Sat & Sun 8:00 AM – 1:00 PM)',
    notes: '',
  },
  calcExam: 'TNPSC',
  calcMonths: 4,
  calcIncludeMentorship: true,
  calcIncludePhysicalLab: true,
  calcIncludeInterview: false,
  openFaq: 0,

  categories: ['All', 'Mock Labs', 'Mentorship', 'Classroom', 'Analytics', 'Interview', 'Institutional'],

  faqs: [
    {
      q: 'Can I combine online mocks with physical computer lab access at Salem HQ?',
      a: 'Yes! All Stackly Salem programs are hybrid-ready. You can take mock tests on your laptop at home or sit in our proctored, air-conditioned computer testing center at Fairlands, Salem, which replicates actual exam centers.',
    },
    {
      q: 'How are 1-on-1 mentorship sessions scheduled?',
      a: 'After an initial diagnostic test, you are paired with a dedicated 99th-percentile faculty member. Sessions are booked directly via your Student Portal for either in-person consultation in Salem or private high-definition video calls.',
    },
    {
      q: 'What is the refund policy if I cannot attend the physical Salem batch?',
      a: 'We offer an unconditional 7-day trial period. If you feel the batch or pacing does not suit your schedule, you receive a full refund or can switch to pure online self-paced mode with zero fee deductions.',
    },
    {
      q: 'Do you offer corporate or college on-campus placement programs outside Salem?',
      a: 'Yes, our Institutional Training Wing travels across Salem, Erode, Namakkal, Dharmapuri, and Coimbatore to conduct tailored quantitative aptitude and civil service orientation workshops.',
    },
  ],

  getIconSVG(name) {
    switch (name) {
      case 'Laptop':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>`;
      case 'UserCheck':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`;
      case 'GraduationCap':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`;
      case 'BarChart3':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333ea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`;
      case 'Award':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;
      case 'Building':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`;
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0l8.57-3.9a1 1 0 0 0 0-1.84Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`;
    }
  },

  setCategory(cat) {
    this.selectedCategory = cat;
    this.render();
  },

  setExam(ex) {
    this.calcExam = ex;
    this.render();
  },

  setMonths(m) {
    this.calcMonths = Number(m);
    this.render();
  },

  toggleAddon(key, checked) {
    this[key] = checked;
    this.render();
  },

  toggleFaq(idx) {
    this.openFaq = this.openFaq === idx ? null : idx;
    this.render();
  },

  openInquiry(serviceId) {
    const services = window.SERVICES_LIST || [];
    this.selectedServiceForInquiry = services.find(s => s.id === serviceId) || null;
    this.inquirySuccess = false;
    this.render();
  },

  closeInquiry() {
    this.selectedServiceForInquiry = null;
    this.render();
  },

  submitInquiry(e) {
    e.preventDefault();
    if (!this.inquiryForm.name || !this.inquiryForm.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    this.inquirySuccess = true;
    this.render();
  },

  render() {
    const el = document.getElementById('page-services');
    if (!el) return;

    const services = window.SERVICES_LIST || [];
    const filteredServices = this.selectedCategory === 'All'
      ? services
      : services.filter(s => s.category === this.selectedCategory);

    // Calculated stats
    const weeklyHours = 10 + this.calcMonths * 2 + (this.calcIncludeMentorship ? 4 : 0);
    const mockTests = Math.round(this.calcMonths * 7.5);
    const estimatedTuition =
      (this.calcMonths === 2 ? 6500 : this.calcMonths === 4 ? 11500 : 16500) +
      (this.calcIncludeMentorship ? 3500 : 0) +
      (this.calcIncludePhysicalLab ? 2000 : 0) +
      (this.calcIncludeInterview ? 2500 : 0);

    el.innerHTML = `
      <div class="min-h-screen bg-slate-50 text-slate-800" id="services-page-root">
        <!-- Hero -->
        <section class="relative pt-16 pb-20 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white" id="services-hero">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center max-w-3xl mx-auto">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-300 mb-6 shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
                <span>Stackly Salem Professional Academic Services</span>
              </div>

              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.12]">
                Specialized Coaching &amp;
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-amber-300">
                  Proctored Testing Infrastructure
                </span>
              </h1>

              <p class="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
                From adaptive computer-based testing suites to 1-on-1 cognitive mentorship at our Salem HQ. 
                Explore our full suite of professional services engineered to maximize score jumps.
              </p>

              <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button onclick="openExam()" class="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 cursor-pointer">
                  <span>Book Free Diagnostic Test</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <button onclick="document.getElementById('study-plan-estimator')?.scrollIntoView({ behavior: 'smooth' })"
                  class="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs sm:text-sm rounded-xl transition flex items-center gap-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></svg>
                  <span>Calculate Custom Study Plan</span>
                </button>
              </div>
            </div>

            <!-- Quick Metrics -->
            <div class="mt-14 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <div class="text-2xl font-black text-white font-display">60+ Seats</div>
                <div class="text-xs text-slate-400 mt-1">Salem CBT Lab Capacity</div>
              </div>
              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <div class="text-2xl font-black text-emerald-400 font-display">1-on-1</div>
                <div class="text-xs text-slate-400 mt-1">Dedicated Faculty Pods</div>
              </div>
              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <div class="text-2xl font-black text-cyan-300 font-display">±2 Pts</div>
                <div class="text-xs text-slate-400 mt-1">Predictive Score Accuracy</div>
              </div>
              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <div class="text-2xl font-black text-amber-300 font-display">100%</div>
                <div class="text-xs text-slate-400 mt-1">Proctored Compliance</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Services Portfolio -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="services-catalog">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
            <div>
              <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Service Portfolio</span>
              <h2 class="text-3xl font-extrabold text-slate-900 font-display mt-1">Engineered Academic Support Systems</h2>
              <p class="text-sm text-slate-600 mt-1">Select a specialized academic category or browse all Stackly Salem services.</p>
            </div>

            <!-- Category Tabs -->
            <div class="mt-4 md:mt-0 flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              ${this.categories.map(cat => `
                <button onclick="ServicesModule.setCategory('${cat}')"
                  class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${this.selectedCategory === cat ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                  ${cat}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Services Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            ${filteredServices.map(srv => `
              <div class="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div class="flex items-start justify-between gap-4 mb-4">
                    <div class="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      ${this.getIconSVG(srv.iconName)}
                    </div>
                    <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">${srv.category}</span>
                  </div>

                  <h3 class="text-xl font-bold text-slate-900 font-display group-hover:text-indigo-600 transition-colors">${srv.title}</h3>
                  <p class="text-xs font-semibold text-indigo-700 mt-1">${srv.subtitle}</p>
                  <p class="text-xs text-slate-600 mt-3 leading-relaxed">${srv.description}</p>

                  <div class="mt-5 pt-4 border-t border-slate-100">
                    <span class="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2">Key Advantages</span>
                    <div class="space-y-1.5">
                      ${srv.highlights.map(h => `
                        <div class="flex items-start gap-2 text-xs text-slate-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                          <span>${h}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>

                  <div class="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span><strong>Salem Center Access:</strong> ${srv.salemFacilityAccess}</span>
                  </div>
                </div>

                <div class="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span class="text-[10px] text-slate-600 uppercase tracking-wider block">Tuition Estimate</span>
                    <span class="text-sm font-bold text-slate-900">${srv.pricingEstimate}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button onclick="ServicesModule.openInquiry('${srv.id}')"
                      class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer">
                      Inquire / Book Slot
                    </button>
                    <button onclick="openExam()"
                      class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer">
                      Sample Mock
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Custom Study Plan Estimator -->
        <section class="py-16 bg-gradient-to-b from-slate-100 to-indigo-50/50 border-y border-slate-200" id="study-plan-estimator">
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-10">
              <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Custom Roadmap Builder</span>
              <h2 class="text-3xl font-extrabold text-slate-900 font-display mt-1">Personalized Study Hours &amp; Package Estimator</h2>
              <p class="text-xs sm:text-sm text-slate-600 mt-2">Select your examination target, available preparation timeline, and customized service requirements.</p>
            </div>

            <div class="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div class="lg:col-span-7 space-y-6">
                <!-- Exam choice -->
                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">1. Select Target Exam</label>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    ${['TNPSC', 'GRE', 'GMAT', 'Banking', 'UPSC'].map(ex => `
                      <button onclick="ServicesModule.setExam('${ex}')"
                        class="py-2 px-3 rounded-xl text-xs font-bold transition border cursor-pointer ${this.calcExam === ex ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}">
                        ${ex}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Duration Slider -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <label class="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Preparation Duration</label>
                    <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">${this.calcMonths} Months</span>
                  </div>
                  <input type="range" min="2" max="8" step="1" value="${this.calcMonths}" onchange="ServicesModule.setMonths(this.value)" class="w-full accent-indigo-600 cursor-pointer">
                  <div class="flex justify-between text-[10px] text-slate-600 mt-1">
                    <span>Fast Track (2 Mo)</span>
                    <span>Comprehensive (4 Mo)</span>
                    <span>Foundation (8 Mo)</span>
                  </div>
                </div>

                <!-- Add-on Deliverables -->
                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">3. Customize Core Deliverables</label>
                  <div class="space-y-2.5">
                    <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                      <div class="flex items-center gap-3">
                        <input type="checkbox" ${this.calcIncludeMentorship ? 'checked' : ''} onchange="ServicesModule.toggleAddon('calcIncludeMentorship', this.checked)" class="w-4 h-4 rounded text-indigo-600 accent-indigo-600">
                        <div>
                          <div class="text-xs font-bold text-slate-900">1-on-1 Faculty Mentorship</div>
                          <div class="text-[11px] text-slate-600">Weekly weakness diagnosis &amp; custom problem sets</div>
                        </div>
                      </div>
                      <span class="text-xs font-semibold text-emerald-600">+₹3,500</span>
                    </label>

                    <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                      <div class="flex items-center gap-3">
                        <input type="checkbox" ${this.calcIncludePhysicalLab ? 'checked' : ''} onchange="ServicesModule.toggleAddon('calcIncludePhysicalLab', this.checked)" class="w-4 h-4 rounded text-indigo-600 accent-indigo-600">
                        <div>
                          <div class="text-xs font-bold text-slate-900">Salem HQ Proctored CBT Lab Access</div>
                          <div class="text-[11px] text-slate-600">Physical terminal seats with biometric time-locks</div>
                        </div>
                      </div>
                      <span class="text-xs font-semibold text-emerald-600">+₹2,000</span>
                    </label>

                    <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                      <div class="flex items-center gap-3">
                        <input type="checkbox" ${this.calcIncludeInterview ? 'checked' : ''} onchange="ServicesModule.toggleAddon('calcIncludeInterview', this.checked)" class="w-4 h-4 rounded text-indigo-600 accent-indigo-600">
                        <div>
                          <div class="text-xs font-bold text-slate-900">Mock Board Interview &amp; Personality Coaching</div>
                          <div class="text-[11px] text-slate-600">Panel simulation with retired senior administrators</div>
                        </div>
                      </div>
                      <span class="text-xs font-semibold text-emerald-600">+₹2,500</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Right Summary Card -->
              <div class="lg:col-span-5 bg-gradient-to-b from-indigo-900 to-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                <div>
                  <div class="flex items-center justify-between border-b border-indigo-700/50 pb-3 mb-4">
                    <span class="text-xs font-bold text-indigo-300 uppercase tracking-wider">Calculated Curriculum</span>
                    <span class="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">${this.calcExam} Track</span>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-300">Recommended Study Commitment:</span>
                      <span class="text-sm font-bold text-amber-300">${weeklyHours} Hours/Week</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-300">Full-Length Proctored Mocks:</span>
                      <span class="text-sm font-bold text-cyan-300">${mockTests} Tests</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-300">Salem CBT Lab Allocation:</span>
                      <span class="text-sm font-bold text-white">${this.calcIncludePhysicalLab ? 'Unlimited (Fairlands Center)' : 'Digital Remote Only'}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-300">Target Score Velocity:</span>
                      <span class="text-sm font-bold text-emerald-400">99th Percentile Calibration</span>
                    </div>
                  </div>

                  <div class="mt-6 pt-4 border-t border-indigo-700/50">
                    <span class="text-[11px] text-slate-400 block mb-1">Estimated Comprehensive Investment</span>
                    <div class="text-3xl font-black text-white font-display">
                      ₹${estimatedTuition.toLocaleString('en-IN')}
                      <span class="text-xs font-normal text-slate-300 ml-1.5">/ ${this.calcMonths} Months</span>
                    </div>
                  </div>
                </div>

                <div class="mt-6 pt-4 space-y-2">
                  <button onclick="openExam()" class="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
                    <span>Start Free Diagnostic Benchmark</span>
                  </button>
                  <div class="flex items-center gap-2">
                    <button onclick="navigate('courses')" class="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition text-center cursor-pointer border border-white/15">
                      Browse Courses
                    </button>
                    <button onclick="openLogin('student')" class="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-white/15">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
                      <span>Student Login</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Facility Tour -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="infrastructure-tour">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Infrastructure Tour</span>
            <h2 class="text-3xl font-extrabold text-slate-900 font-display mt-1">Salem HQ Computer Testing &amp; Mentorship Facility</h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-2">Located at Fairlands, Salem, our physical learning center provides candidates with a distraction-free, scientifically optimized environment.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition">
              <img src="./assets/images/img-1516321318423-f0.webp" alt="CBT Computer Testing Lab" class="w-full h-40 object-cover">
              <div class="p-4">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">Lab Terminal 1</span>
                <h4 class="text-sm font-bold text-slate-900 mt-1.5">Air-Conditioned CBT Suite</h4>
                <p class="text-xs text-slate-600 mt-1">60 Individual testing booths equipped with standardized mechanical keyboards and high-contrast monitors.</p>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition">
              <img src="./assets/images/img-1497366216548-37.webp" alt="1-on-1 Mentorship Pod" class="w-full h-40 object-cover">
              <div class="p-4">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Acoustic Suite</span>
                <h4 class="text-sm font-bold text-slate-900 mt-1.5">Sound-Isolated Mentorship Pods</h4>
                <p class="text-xs text-slate-600 mt-1">Private glass consultation rooms for deep-dive cognitive error review with senior faculty.</p>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition">
              <img src="./assets/images/img-1524178232363-1f.webp" alt="Live Smart Classroom" class="w-full h-40 object-cover">
              <div class="p-4">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">Studio 4K</span>
                <h4 class="text-sm font-bold text-slate-900 mt-1.5">Digital Hybrid Smart Class</h4>
                <p class="text-xs text-slate-600 mt-1">Dual-camera interactive boards recording every mathematical derivation for remote playback.</p>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition">
              <img src="./assets/images/img-1521587760476-6c.webp" alt="Reading Room and Reference Library" class="w-full h-40 object-cover">
              <div class="p-4">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">24/7 Access</span>
                <h4 class="text-sm font-bold text-slate-900 mt-1.5">Quiet Reference Library</h4>
                <p class="text-xs text-slate-600 mt-1">Over 3,000 standard textbooks, Samacheer Kalvi volumes, and national competitive exam digests.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQs Accordion -->
        <section class="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="services-faq">
          <div class="text-center mb-10">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Everything You Need to Know About Stackly Services</h2>
          </div>

          <div class="space-y-3">
            ${this.faqs.map((f, idx) => {
              const isOpen = this.openFaq === idx;
              return `
                <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-2xs">
                  <button type="button" onclick="ServicesModule.toggleFaq(${idx})"
                    class="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition cursor-pointer">
                    <span class="text-sm font-bold text-slate-900">${f.q}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${isOpen ? '#4f46e5' : '#64748b'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  ${isOpen ? `
                    <div class="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      ${f.a}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- Inquiry Modal -->
        ${this.selectedServiceForInquiry ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" id="service-inquiry-modal">
            <div class="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-800 my-8">
              <button onclick="ServicesModule.closeInquiry()" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer">
                ✕
              </button>

              <div class="mb-5">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  ${this.selectedServiceForInquiry.category}
                </span>
                <h3 class="text-xl font-bold text-slate-900 font-display mt-2">
                  Inquire for ${this.selectedServiceForInquiry.title}
                </h3>
                <p class="text-xs text-slate-600 mt-1">${this.selectedServiceForInquiry.subtitle}</p>
              </div>

              ${this.inquirySuccess ? `
                <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div class="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h4 class="text-base font-bold text-emerald-950">Inquiry Received Successfully!</h4>
                  <p class="text-xs text-emerald-800">
                    A Stackly Salem Academic Counselor will reach out to you within 4 hours with batch availability, seat confirmation, and scholarship eligibility.
                  </p>
                  <button onclick="ServicesModule.closeInquiry()" class="px-5 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer">
                    Done
                  </button>
                </div>
              ` : `
                <form onsubmit="ServicesModule.submitInquiry(event)" class="space-y-3.5">
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input type="text" required placeholder="e.g. Senthil Kumar"
                      value="${this.inquiryForm.name}" oninput="ServicesModule.inquiryForm.name = this.value"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input type="tel" required placeholder="+91 98420 XXXXX"
                        value="${this.inquiryForm.phone}" oninput="ServicesModule.inquiryForm.phone = this.value"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <input type="email" placeholder="senthil@gmail.com"
                        value="${this.inquiryForm.email}" oninput="ServicesModule.inquiryForm.email = this.value"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Preferred Batch Timing</label>
                    <select onchange="ServicesModule.inquiryForm.preferredBatch = this.value"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white">
                      <option>Weekend Morning Batch (Sat &amp; Sun 8:00 AM – 1:00 PM)</option>
                      <option>Weekday Morning Intensive (Mon–Fri 6:30 AM – 8:30 AM)</option>
                      <option>Weekday Evening Batch (Mon–Fri 6:00 PM – 8:30 PM)</option>
                      <option>Pure Online Self-Paced + CBT Weekend Lab</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Notes / Target Exam Date</label>
                    <textarea rows="2" placeholder="e.g. Planning to sit for TNPSC Prelims in December. Need quant shortcuts."
                      oninput="ServicesModule.inquiryForm.notes = this.value"
                      class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">${this.inquiryForm.notes}</textarea>
                  </div>

                  <div class="pt-2">
                    <button type="submit" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer">
                      Submit Service Inquiry &amp; Reserve Demo
                    </button>
                  </div>
                </form>
              `}
            </div>
          </div>
        ` : ''}
      </div>
    `;
    refreshScrollReveal();
  }
};

function render_services() {
  ServicesModule.render();
}

window.ServicesModule = ServicesModule;
window.render_services = render_services;
