// ============================================================
// STACKLY SALEM — Contact Page Component
// ============================================================

const ContactModule = {
  formSubmitted: false,
  formData: {
    name: '',
    email: '',
    phone: '',
    exam: 'GRE General',
    stage: 'Starting Baseline',
    message: '',
  },
  activeCenterId: 'center-salem',
  copiedAddress: false,
  bookingStep: 1,
  bookingExam: 'GRE General',
  bookingDate: 'Tomorrow, 3:00 PM IST',
  bookingMentor: 'Dr. Julian Thorne (Quant Lead)',
  bookingConfirmed: false,

  setCenter(id) {
    this.activeCenterId = id;
    this.render();
  },

  copyAddress(address) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(address);
      this.copiedAddress = true;
      this.render();
      setTimeout(() => {
        this.copiedAddress = false;
        this.render();
      }, 2000);
    }
  },

  submitInquiry(e) {
    e.preventDefault();
    if (!this.formData.name || !this.formData.email) {
      alert('Please provide your name and email.');
      return;
    }
    this.formSubmitted = true;
    this.render();
  },

  setBookingStep(step) {
    this.bookingStep = step;
    this.render();
  },

  setBookingExam(ex) {
    this.bookingExam = ex;
    this.bookingStep = 2;
    this.render();
  },

  setBookingDate(date) {
    this.bookingDate = date;
    this.bookingStep = 3;
    this.render();
  },

  setBookingMentor(m) {
    this.bookingMentor = m;
    this.render();
  },

  confirmBooking() {
    this.bookingConfirmed = true;
    showToast(`1-on-1 strategy session booked with ${this.bookingMentor}!`);
    this.render();
  },

  render() {
    const el = document.getElementById('page-contact');
    if (!el) return;

    const centers = window.PREP_CENTERS || [];
    const info = window.SALEM_COMPANY_INFO || {
      phone: '+91 (427) 244-8890',
      emergencyPhone: '+91 98427 12345',
      email: 'contact@stackly.in',
      hours: 'Mon - Sat: 8:00 AM - 9:30 PM | Sun: 9:00 AM - 7:00 PM IST',
    };

    const activeCenter = centers.find(c => c.id === this.activeCenterId) || centers[0] || {
      id: 'center-salem',
      city: 'Salem, Tamil Nadu (HQ)',
      address: 'Stackly Tech Park, #42 Innovation Corridor, Meyyanur Bypass Road, Salem, Tamil Nadu 636004, India',
      phone: '+91 (427) 244-8890',
      email: 'salem.hq@stackly.in',
      hours: 'Mon - Sat: 8:00 AM - 9:30 PM',
      facilities: ['Proctored CBT Arena', 'AI Research Lab', 'Faculty Doubts Pods'],
      image: './assets/images/img-1497366216548-37.webp',
    };

    el.innerHTML = `
      <div class="w-full text-slate-800 bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
        <!-- Hero & Support Channels -->
        <section class="relative pt-14 pb-16 md:pt-20 md:pb-20 bg-gradient-to-b from-white via-indigo-50/40 to-slate-50 border-b border-slate-200" id="contact-hero">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 shadow-xs text-indigo-700 text-xs font-bold mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                <span>Stackly Salem Corporate Headquarters &amp; Support</span>
              </div>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display">
                Connect with Salem Academic Counselors &amp; Faculty
              </h1>
              <p class="mt-3 text-xs sm:text-sm text-slate-600">
                Whether you need study plan advisement, technical diagnostic help, or campus testing lab access at Salem Stackly, our dedicated team is ready to support you.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              <!-- Channel 1 -->
              <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l1.27-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-1">Salem HQ Direct Line</h4>
                <div class="text-xs text-indigo-700 font-bold mb-2">${info.phone}</div>
                <p class="text-xs text-slate-500 leading-relaxed">Direct corporate support at our Fairlands Salem office for enrollments and test dates.</p>
              </div>

              <!-- Channel 2 -->
              <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-1">Salem WhatsApp Desk</h4>
                <div class="text-xs text-emerald-700 font-bold mb-2">${info.emergencyPhone}</div>
                <p class="text-xs text-slate-500 leading-relaxed">Instant chat assistance with senior test counselors for rapid syllabus evaluations.</p>
              </div>

              <!-- Channel 3 -->
              <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-1">Official Communications</h4>
                <div class="text-xs text-blue-700 font-bold mb-2">${info.email}</div>
                <p class="text-xs text-slate-500 leading-relaxed">Official inquiries, mock score queries, and correspondence with the Salem team.</p>
              </div>

              <!-- Channel 4 -->
              <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-1">Operating Hours</h4>
                <div class="text-xs text-purple-700 font-bold mb-2">${info.hours}</div>
                <p class="text-xs text-slate-500 leading-relaxed">In-person counseling at Fairlands Salem, plus 24/7 digital mock servers.</p>
              </div>
            </div>

            <!-- Quick Mock Trigger -->
            <div class="mt-8 max-w-4xl mx-auto p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <div class="text-xs font-bold text-slate-900">Prefer an immediate test baseline?</div>
                <p class="text-[11px] text-slate-600">You can attempt our 10-minute adaptive psychometric diagnostic mock exam right now online.</p>
              </div>
              <button onclick="openExam()" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition shrink-0 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                <span>Launch Mock Test</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Counseling Form -->
        <section class="py-16 md:py-20 bg-white border-b border-slate-200" id="inquiry-form">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-10">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Academic Consultation</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Request a Custom Diagnostic Assessment</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Submit your target score and timeline; an expert Stackly mentor from Salem will review your profile.</p>
            </div>

            <div class="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
              ${this.formSubmitted ? `
                <div class="text-center py-10">
                  <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <h3 class="text-xl font-bold text-slate-900 font-display">Inquiry Successfully Received!</h3>
                  <p class="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                    Thank you, <strong class="text-slate-900">${this.formData.name}</strong>. A Stackly Salem academic counselor specializing in <span class="text-indigo-600 font-bold">${this.formData.exam}</span> will contact you at <span class="text-slate-900 font-medium">${this.formData.email}</span> within 2 hours with your tailored diagnostic recommendations.
                  </p>
                  <button type="button" onclick="ContactModule.formSubmitted = false; ContactModule.render()" class="mt-6 px-6 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl transition shadow-xs cursor-pointer">
                    Send Another Inquiry
                  </button>
                </div>
              ` : `
                <form onsubmit="ContactModule.submitInquiry(event)" class="space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input type="text" placeholder="e.g. Anand Kumar" required
                        value="${this.formData.name}" oninput="ContactModule.formData.name = this.value"
                        class="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input type="email" placeholder="student@example.com" required
                        value="${this.formData.email}" oninput="ContactModule.formData.email = this.value"
                        class="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                      <input type="tel" placeholder="+91 98765 43210"
                        value="${this.formData.phone}" oninput="ContactModule.formData.phone = this.value"
                        class="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 mb-1">Target Exam</label>
                      <select onchange="ContactModule.formData.exam = this.value"
                        class="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                        <option ${this.formData.exam === 'GRE General' ? 'selected' : ''}>GRE General</option>
                        <option ${this.formData.exam === 'GMAT Focus' ? 'selected' : ''}>GMAT Focus</option>
                        <option ${this.formData.exam === 'Digital SAT' ? 'selected' : ''}>Digital SAT</option>
                        <option ${this.formData.exam === 'MCAT Medical' ? 'selected' : ''}>MCAT Medical</option>
                        <option ${this.formData.exam === 'TNPSC Group 1, 2' ? 'selected' : ''}>TNPSC Group 1, 2</option>
                        <option ${this.formData.exam === 'GATE CS' ? 'selected' : ''}>GATE CS</option>
                        <option ${this.formData.exam === 'IELTS Academic' ? 'selected' : ''}>IELTS Academic</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 mb-1">Current Stage</label>
                      <select onchange="ContactModule.formData.stage = this.value"
                        class="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">
                        <option>Starting from Baseline</option>
                        <option>Intermediate Prep</option>
                        <option>Final Mock Testing (1-2 Mo)</option>
                        <option>Exam Retaker (Score Boost)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Specific Academic Questions or Target Scores</label>
                    <textarea rows="4" placeholder="Describe your current practice scores, target schools, or specific areas needing improvement..."
                      oninput="ContactModule.formData.message = this.value"
                      class="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500">${this.formData.message}</textarea>
                  </div>

                  <button type="submit" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    <span>Submit Inquiry to Salem Admissions Team</span>
                  </button>
                </form>
              `}
            </div>
          </div>
        </section>

        <!-- Interactive Map & Campus Location -->
        <section class="py-16 md:py-20 bg-slate-50 border-b border-slate-200" id="campus-centers">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-12">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                <span>Interactive Campus Navigator &amp; Map Location</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Visit Stackly Salem HQ &amp; Testing Arenas
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto leading-relaxed">
                Experience our flagship proctored CBT simulation suites and faculty counseling pods in Fairlands, Salem, or locate our authorized international test centers.
              </p>
            </div>

            <!-- Selector Pills -->
            <div class="flex items-center justify-center gap-2 flex-wrap mb-8">
              ${centers.map(c => `
                <button onclick="ContactModule.setCenter('${c.id}')"
                  class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${this.activeCenterId === c.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs'}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${this.activeCenterId === c.id ? 'white' : '#4f46e5'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>${c.city}</span>
                  ${c.id === 'center-salem' ? `<span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${this.activeCenterId === c.id ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}">HQ</span>` : ''}
                </button>
              `).join('')}
            </div>

            <!-- Map + Profile Dual Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <!-- Left Map -->
              <div class="lg:col-span-7 flex flex-col">
                <div class="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex-1 flex flex-col">
                  <div class="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                    <div class="flex items-center gap-2">
                      <span class="relative flex h-2.5 w-2.5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span class="text-xs font-bold text-slate-800">Live Map: ${activeCenter.city}</span>
                    </div>

                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeCenter.id === 'center-salem' ? 'Fairlands, Salem, Tamil Nadu, India' : activeCenter.address)}"
                      target="_blank" rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition">
                      <span>Open in Google Maps</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </div>

                  <!-- Google Map Iframe -->
                  <div class="relative w-full h-80 sm:h-96 lg:h-[420px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                    <iframe title="Map location"
                      src="https://maps.google.com/maps?q=${encodeURIComponent(activeCenter.id === 'center-salem' ? 'Fairlands, Salem, Tamil Nadu, India' : activeCenter.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      class="w-full h-full border-0" allowfullscreen="" loading="lazy"></iframe>
                    <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-md px-3 py-1.5 rounded-xl flex items-center gap-2 pointer-events-none">
                      <div class="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                      <span class="text-[11px] font-bold text-slate-900">${activeCenter.id === 'center-salem' ? 'Salem HQ • Fairlands' : activeCenter.city}</span>
                    </div>
                  </div>

                  <div class="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span class="hidden sm:inline">Use mouse scroll or touch pinch to zoom in/out</span>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeCenter.id === 'center-salem' ? 'Fairlands, Salem, Tamil Nadu 636004' : activeCenter.address)}"
                      target="_blank" rel="noopener noreferrer"
                      class="inline-flex items-center gap-1.5 font-bold text-indigo-700 hover:text-indigo-900 transition ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                      <span>Get Turn-by-Turn Driving Directions</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Right Info -->
              <div class="lg:col-span-5 flex flex-col space-y-4">
                <div class="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1.5">
                          ${activeCenter.id === 'center-salem' ? 'Corporate Headquarters' : 'Authorized Testing Arena'}
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 font-display">${activeCenter.city} Campus</h3>
                      </div>
                      <img src="${activeCenter.image}" alt="${activeCenter.city}" class="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs">
                    </div>

                    <!-- Address box -->
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
                      <div class="flex items-start gap-2 text-xs text-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span class="leading-relaxed font-medium">${activeCenter.address}</span>
                      </div>
                      <div class="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                        <button type="button" onclick="ContactModule.copyAddress('${activeCenter.address.replace(/'/g, "\\'")}')"
                          class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 transition cursor-pointer">
                          ${this.copiedAddress ? `
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            <span class="text-emerald-700">Address Copied!</span>
                          ` : `
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                            <span>Copy Full Address</span>
                          `}
                        </button>
                        <span class="text-[11px] text-slate-400">Pincode: 636004</span>
                      </div>
                    </div>

                    <!-- Hours & Phone -->
                    <div class="space-y-2.5 text-xs text-slate-600 mb-5">
                      <div class="flex items-start gap-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <div><strong class="text-slate-800">Visiting Hours: </strong><span>${activeCenter.hours}</span></div>
                      </div>
                      <div class="flex items-start gap-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l1.27-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <div><strong class="text-slate-800">Phone: </strong><a href="tel:${activeCenter.phone}" class="text-indigo-600 hover:underline">${activeCenter.phone}</a></div>
                      </div>
                      <div class="flex items-start gap-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <div><strong class="text-slate-800">Campus Email: </strong><a href="mailto:${activeCenter.email}" class="text-blue-600 hover:underline">${activeCenter.email}</a></div>
                      </div>
                    </div>

                    <!-- Transit Connectivity (Salem HQ) -->
                    ${activeCenter.id === 'center-salem' ? `
                      <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 mb-4">
                        <div class="text-[11px] font-bold uppercase tracking-wider text-indigo-900 mb-2 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                          <span>Salem Transit Connectivity &amp; Landmarks</span>
                        </div>
                        <div class="grid grid-cols-3 gap-2 text-center">
                          <div class="bg-white p-2 rounded-xl border border-indigo-100/80 shadow-2xs">
                            <div class="text-[10px] text-slate-500">Central Bus Stand</div>
                            <div class="text-xs font-bold text-slate-900">1.1 km</div>
                          </div>
                          <div class="bg-white p-2 rounded-xl border border-indigo-100/80 shadow-2xs">
                            <div class="text-[10px] text-slate-500">Salem Junction</div>
                            <div class="text-xs font-bold text-slate-900">3.2 km</div>
                          </div>
                          <div class="bg-white p-2 rounded-xl border border-indigo-100/80 shadow-2xs">
                            <div class="text-[10px] text-slate-500">Salem Airport</div>
                            <div class="text-xs font-bold text-slate-900">18.5 km</div>
                          </div>
                        </div>
                      </div>
                    ` : ''}

                    <!-- Facilities -->
                    <div>
                      <div class="text-xs font-bold uppercase text-slate-500 mb-2">Available On-Site Facilities:</div>
                      <div class="flex flex-wrap gap-1.5">
                        ${(activeCenter.facilities || []).map(fac => `
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            <span>${fac}</span>
                          </span>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeCenter.id === 'center-salem' ? 'Fairlands, Salem, Tamil Nadu 636004' : activeCenter.address)}"
                      target="_blank" rel="noopener noreferrer"
                      class="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 text-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                      <span>Get Directions</span>
                    </a>
                    <a href="tel:${activeCenter.phone.split('/')[0].trim()}"
                      class="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l1.27-.75a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <span>Call Campus</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 1-on-1 Scheduler -->
        <section class="py-16 md:py-20 bg-white border-b border-slate-200" id="scheduler">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-10">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Live Mentorship</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Book a Free 20-Minute Strategy Session</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Speak directly with a Stackly test veteran to evaluate your pacing and score bottlenecks.</p>
            </div>

            <div class="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
              ${this.bookingConfirmed ? `
                <div class="text-center py-8">
                  <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <h3 class="text-xl font-bold text-slate-900">Strategy Session Confirmed!</h3>
                  <p class="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                    Your 1-on-1 session for <strong class="text-slate-900">${this.bookingExam}</strong> with <span class="text-indigo-600 font-bold">${this.bookingMentor}</span> is scheduled for <strong class="text-slate-900">${this.bookingDate}</strong>. A Google Meet invitation and Salem campus calendar link have been sent.
                  </p>
                  <button type="button" onclick="ContactModule.bookingConfirmed = false; ContactModule.render()" class="mt-6 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition shadow-xs cursor-pointer">
                    Reschedule / New Slot
                  </button>
                </div>
              ` : `
                <div class="space-y-6">
                  <!-- Steps indicator -->
                  <div class="flex items-center justify-center gap-6 text-xs border-b border-slate-200 pb-4 font-semibold">
                    <span class="${this.bookingStep >= 1 ? 'text-indigo-600 font-bold' : 'text-slate-400'}">1. Select Exam</span>
                    <span class="text-slate-300">→</span>
                    <span class="${this.bookingStep >= 2 ? 'text-indigo-600 font-bold' : 'text-slate-400'}">2. Choose Date &amp; Time</span>
                    <span class="text-slate-300">→</span>
                    <span class="${this.bookingStep >= 3 ? 'text-indigo-600 font-bold' : 'text-slate-400'}">3. Match Mentor</span>
                  </div>

                  <!-- Step 1 -->
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-2">Step 1: Which exam are you targeting?</label>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      ${['GRE General', 'GMAT Focus', 'Digital SAT', 'MCAT Medical'].map(ex => `
                        <button type="button" onclick="ContactModule.setBookingExam('${ex}')"
                          class="py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${this.bookingExam === ex ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'}">
                          ${ex}
                        </button>
                      `).join('')}
                    </div>
                  </div>

                  <!-- Step 2 -->
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-2">Step 2: Available Counselor Time Slots</label>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      ${['Tomorrow, 10:00 AM IST', 'Tomorrow, 3:00 PM IST', 'Friday, 2:00 PM IST'].map(slot => `
                        <button type="button" onclick="ContactModule.setBookingDate('${slot}')"
                          class="p-2.5 text-xs font-medium rounded-xl border transition text-left cursor-pointer ${this.bookingDate === slot ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'}">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-1"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          <div>${slot}</div>
                        </button>
                      `).join('')}
                    </div>
                  </div>

                  <!-- Step 3 -->
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-2">Step 3: Recommended Master Mentor</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      ${[
                        { name: 'Dr. Julian Thorne (Quant Lead)', creds: 'Harvard PhD • Perfect 170/170 Quant' },
                        { name: 'Claire Kensington (Verbal/SAT Lead)', creds: 'Stanford Alum • 99th Percentile' },
                      ].map(m => `
                        <button type="button" onclick="ContactModule.setBookingMentor('${m.name}')"
                          class="p-3 rounded-xl border text-left text-xs transition cursor-pointer ${this.bookingMentor === m.name ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold' : 'bg-white border-slate-200 text-slate-700'}">
                          <div class="font-bold text-slate-900">${m.name}</div>
                          <div class="text-[11px] text-slate-500">${m.creds}</div>
                        </button>
                      `).join('')}
                    </div>
                  </div>

                  <button type="button" onclick="ContactModule.confirmBooking()"
                    class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-600/20 cursor-pointer">
                    Confirm Strategy Consultation Slot
                  </button>
                </div>
              `}
            </div>
          </div>
        </section>

        <!-- Emergency Support Desk -->
        <section class="py-16 md:py-20 bg-slate-50" id="emergency-support">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Exam Day Urgent Support Desk</h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Taking an official exam within 48 hours and encountering platform access or proctoring difficulties? Our emergency desk at Stackly Salem prioritizes your tickets.
            </p>

            <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <h4 class="text-xs font-bold text-slate-900 mb-1">System Check Utility</h4>
                  <p class="text-[11px] text-slate-500 leading-relaxed">Run an automated diagnostic check on your webcam, microphone, and browser latency prior to test day.</p>
                </div>
                <button onclick="navigate('not-found')" class="mt-3 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer text-left">
                  <span>Launch Hardware Check</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>

              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <h4 class="text-xs font-bold text-slate-900 mb-1">Testing Accommodation</h4>
                  <p class="text-[11px] text-slate-500 leading-relaxed">Guidance on official 1.5x / 2.0x extended time documentation filing for College Board and ETS.</p>
                </div>
                <button onclick="navigate('not-found')" class="mt-3 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer text-left">
                  <span>Accommodation Guide</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>

              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <h4 class="text-xs font-bold text-slate-900 mb-1">Score Verification Desk</h4>
                  <p class="text-[11px] text-slate-500 leading-relaxed">Assistance with submitting official score reports for university admissions deadlines.</p>
                </div>
                <button onclick="navigate('not-found')" class="mt-3 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer text-left">
                  <span>Score Expedite Portal</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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

function render_contact() {
  ContactModule.render();
}

window.ContactModule = ContactModule;
window.render_contact = render_contact;
