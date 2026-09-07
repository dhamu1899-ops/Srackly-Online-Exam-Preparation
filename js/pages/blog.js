// ============================================================
// STACKLY SALEM — Blog Page Component (The Academic Gazette)
// ============================================================

const BlogModule = {
  activeCategory: 'All',
  searchQuery: '',
  selectedArticle: null,
  bookmarkedIds: [],
  downloadedCheatsheet: null,
  newsletterEmail: '',
  newsletterSubscribed: false,

  categories: ['All', 'Strategy', 'TNPSC', 'Aptitude', 'Current Affairs', 'Success Stories', 'Exam Alerts'],

  setCategory(cat) {
    this.activeCategory = cat;
    this.render();
  },

  setSearch(q) {
    this.searchQuery = q;
    this.render();
  },

  toggleBookmark(id) {
    if (this.bookmarkedIds.includes(id)) {
      this.bookmarkedIds = this.bookmarkedIds.filter(x => x !== id);
    } else {
      this.bookmarkedIds.push(id);
      showToast('Article saved to your personal reading list.');
    }
    this.render();
  },

  openArticle(post) {
    this.selectedArticle = post;
    this.render();
  },

  closeArticle() {
    this.selectedArticle = null;
    this.render();
  },

  downloadCheatsheet(title) {
    this.downloadedCheatsheet = title;
    showToast(`"${title}" has been downloaded from Stackly Salem Vault.`);
    this.render();
    setTimeout(() => {
      this.downloadedCheatsheet = null;
      this.render();
    }, 3000);
  },

  subscribeNewsletter(e) {
    e.preventDefault();
    if (!this.newsletterEmail) return;
    this.newsletterSubscribed = true;
    showToast('Subscribed! You will receive the Sunday Exam Gazette.');
    this.render();
  },

  render() {
    const el = document.getElementById('page-blog');
    if (!el) return;

    const posts = window.BLOG_POSTS || [];
    const cheatsheets = window.STUDY_CHEATSHEETS || [];
    const featured = posts.find(p => p.featured) || posts[0];

    const filtered = posts.filter(post => {
      const matchesCat = this.activeCategory === 'All' || post.category === this.activeCategory;
      const q = this.searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(q)));
      return matchesCat && matchesSearch;
    });

    el.innerHTML = `
      <div class="min-h-screen bg-slate-50 text-slate-800" id="blog-page-root">
        <!-- Hero Header -->
        <section class="bg-white border-b border-slate-200 pt-12 pb-14 relative overflow-hidden" id="blog-hero">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- News Ticker -->
            <div class="mb-6 p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-200/80 flex items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2 font-bold text-indigo-900 shrink-0">
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span class="uppercase tracking-wider text-[11px] bg-indigo-600 text-white px-2 py-0.5 rounded">
                  Salem Bulletin
                </span>
              </div>
              <div class="truncate text-slate-700 font-medium">
                TNPSC Group 1 &amp; 2 Notification update released. Free diagnostic mocks available at Salem HQ CBT center.
              </div>
              <span class="text-[11px] text-slate-600 font-bold shrink-0 hidden sm:inline">Updated Today</span>
            </div>

            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  <span>The Stackly Salem Academic Gazette</span>
                </div>
                <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-display">
                  Insights, Strategies &amp;
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                    Exam Intelligence
                  </span>
                </h1>
                <p class="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
                  Authored by 99th-percentile educators, former civil service rankers, and cognitive psychometricians based at our Salem Headquarters.
                </p>
              </div>

              <!-- Search -->
              <div class="relative w-full md:w-80 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3.5 top-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" value="${this.searchQuery}" oninput="BlogModule.setSearch(this.value)"
                  placeholder="Search articles, shortcuts, TNPSC..."
                  class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden transition">
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Editorial -->
        ${featured ? `
          <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6" id="featured-article">
            <div class="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12">
              <div class="lg:col-span-5 relative min-h-[260px] lg:min-h-[380px]">
                <img src="${featured.image}" alt="${featured.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent lg:hidden"></div>
                <span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md">
                  Featured Editorial
                </span>
              </div>

              <div class="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 text-xs text-indigo-300 mb-3">
                    <span class="font-bold px-2.5 py-0.5 rounded bg-white/10 border border-white/15">${featured.category}</span>
                    <span>•</span>
                    <span class="flex items-center gap-1 text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      ${featured.readTime}
                    </span>
                    <span>•</span>
                    <span class="text-slate-300">${featured.publishedAt}</span>
                  </div>

                  <h2 onclick="BlogModule.openArticle(BLOG_POSTS.find(p => p.id === '${featured.id}'))" class="text-2xl sm:text-3xl font-extrabold font-display leading-snug hover:text-indigo-300 transition cursor-pointer">
                    ${featured.title}
                  </h2>

                  <p class="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    ${featured.excerpt}
                  </p>

                  <div class="mt-4 flex flex-wrap gap-1.5">
                    ${(featured.tags || []).map(t => `<span class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">#${t}</span>`).join('')}
                  </div>
                </div>

                <div class="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <img src="${featured.author.avatar}" alt="${featured.author.name}" class="w-10 h-10 rounded-full object-cover border-2 border-indigo-400">
                    <div>
                      <div class="text-xs font-bold text-white">${featured.author.name}</div>
                      <div class="text-[10px] text-slate-400">${featured.author.role}</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button onclick="BlogModule.toggleBookmark('${featured.id}')" class="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition cursor-pointer" title="Bookmark article">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${this.bookmarkedIds.includes(featured.id) ? '#f59e0b' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${this.bookmarkedIds.includes(featured.id) ? 'text-amber-400' : ''}"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                    </button>
                    <button onclick="BlogModule.openArticle(BLOG_POSTS.find(p => p.id === '${featured.id}'))" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-md cursor-pointer">
                      <span>Read Full Blueprint</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- Filter Tabs & Articles -->
        <section class="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="articles-grid">
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 overflow-x-auto gap-2 scrollbar-none">
            <div class="flex items-center gap-1.5">
              ${this.categories.map(cat => `
                <button onclick="BlogModule.setCategory('${cat}')"
                  class="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${this.activeCategory === cat ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                  ${cat}
                </button>
              `).join('')}
            </div>
            <span class="text-xs text-slate-600 font-semibold shrink-0">Showing ${filtered.length} Articles</span>
          </div>

          <!-- Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${filtered.map(post => `
              <div class="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div class="relative h-48 overflow-hidden">
                    <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold">
                      ${post.category}
                    </span>
                    <button onclick="BlogModule.toggleBookmark('${post.id}')" class="absolute top-3 right-3 p-1.5 rounded-lg bg-white/90 backdrop-blur-xs text-slate-700 hover:text-amber-500 transition shadow-xs cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${this.bookmarkedIds.includes(post.id) ? '#f59e0b' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${this.bookmarkedIds.includes(post.id) ? 'text-amber-500' : ''}"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                    </button>
                  </div>

                  <div class="p-5">
                    <div class="flex items-center gap-2 text-[11px] text-slate-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>${post.readTime}</span>
                      <span>•</span>
                      <span>${post.publishedAt}</span>
                    </div>

                    <h3 onclick="BlogModule.openArticle(BLOG_POSTS.find(p => p.id === '${post.id}'))" class="text-base font-bold text-slate-900 font-display group-hover:text-indigo-600 transition cursor-pointer line-clamp-2">
                      ${post.title}
                    </h3>
                    <p class="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">${post.excerpt}</p>

                    <div class="mt-4 flex flex-wrap gap-1">
                      ${(post.tags || []).slice(0, 3).map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">#${t}</span>`).join('')}
                    </div>
                  </div>
                </div>

                <div class="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img src="${post.author.avatar}" alt="${post.author.name}" class="w-7 h-7 rounded-full object-cover">
                    <div class="text-[11px] font-semibold text-slate-800">${post.author.name}</div>
                  </div>

                  <button onclick="BlogModule.openArticle(BLOG_POSTS.find(p => p.id === '${post.id}'))" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer">
                    <span>Read</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Cheatsheets -->
        <section class="py-16 bg-gradient-to-b from-slate-100 to-indigo-50/40 border-t border-slate-200" id="study-cheatsheets">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
              <div>
                <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Free Study Vault</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">Downloadable Cheatsheets &amp; Formula Guides</h2>
                <p class="text-xs sm:text-sm text-slate-600 mt-1">Handcrafted revision cards prepared by Stackly Salem senior research associates.</p>
              </div>
              <button onclick="openExam()" class="mt-4 md:mt-0 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer">
                <span>Test Knowledge via Mock Engine</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              ${cheatsheets.map(cs => `
                <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">${cs.badge}</span>
                      <span class="text-[11px] text-slate-600 font-medium">${cs.fileSize}</span>
                    </div>
                    <h4 class="text-sm font-bold text-slate-900 leading-snug">${cs.title}</h4>
                    <p class="text-xs text-slate-600 mt-1">${cs.exam}</p>
                    <p class="text-[11px] text-slate-600 mt-2">Downloaded by ${cs.downloads} aspirants</p>
                  </div>

                  <div class="mt-5 pt-3 border-t border-slate-100">
                    <button onclick="BlogModule.downloadCheatsheet('${cs.title.replace(/'/g, "\\'")}')"
                      class="w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${this.downloadedCheatsheet === cs.title ? 'bg-emerald-600 text-white' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'}">
                      ${this.downloadedCheatsheet === cs.title ? `
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>Downloaded PDF</span>
                      ` : `
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        <span>Instant Download</span>
                      `}
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Newsletter Section -->
        <section class="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="newsletter-section">
          <div class="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
            <div class="relative z-10 max-w-xl mx-auto">
              <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>

              <h3 class="text-2xl sm:text-3xl font-bold font-display">Subscribe to the Salem Weekly Exam Gazette</h3>
              <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Every Sunday morning: 15 curated high-yield questions, Tamil Nadu current affairs digest, and official recruitment notifications delivered straight to your inbox.
              </p>

              ${this.newsletterSubscribed ? `
                <div class="mt-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Subscription Confirmed! You are registered for the next Sunday edition.</span>
                </div>
              ` : `
                <form onsubmit="BlogModule.subscribeNewsletter(event)" class="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
                  <input type="email" required placeholder="Enter your best email address..."
                    value="${this.newsletterEmail}" oninput="BlogModule.newsletterEmail = this.value"
                    class="flex-1 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-indigo-400 focus:outline-hidden">
                  <button type="submit" class="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition whitespace-nowrap cursor-pointer">
                    Subscribe Free
                  </button>
                </form>
              `}
              <div class="mt-4 text-[11px] text-slate-400">Zero spam. Unsubscribe anytime with one click.</div>
            </div>
          </div>
        </section>

        <!-- Article Reader Modal -->
        ${this.selectedArticle ? `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" id="article-reader-modal">
            <div class="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-800 my-8 max-h-[85vh] overflow-y-auto">
              <button onclick="BlogModule.closeArticle()" class="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>

              <div class="pr-6">
                <div class="flex items-center gap-2.5 text-xs text-indigo-700 mb-3">
                  <span class="font-bold px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-100">${this.selectedArticle.category}</span>
                  <span>•</span>
                  <span>${this.selectedArticle.readTime}</span>
                  <span>•</span>
                  <span>${this.selectedArticle.publishedAt}</span>
                </div>

                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
                  ${this.selectedArticle.title}
                </h2>

                <div class="mt-4 pb-6 border-b border-slate-200 flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <img src="${this.selectedArticle.author.avatar}" alt="${this.selectedArticle.author.name}" class="w-10 h-10 rounded-full object-cover border">
                    <div>
                      <div class="text-xs font-bold text-slate-900">${this.selectedArticle.author.name}</div>
                      <div class="text-[11px] text-slate-600">${this.selectedArticle.author.role}</div>
                    </div>
                  </div>

                  <button onclick="BlogModule.toggleBookmark('${this.selectedArticle.id}')" class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${this.bookmarkedIds.includes(this.selectedArticle.id) ? '#f59e0b' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${this.bookmarkedIds.includes(this.selectedArticle.id) ? 'text-amber-500' : ''}"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                  </button>
                </div>

                <div class="my-6 rounded-2xl overflow-hidden max-h-72">
                  <img src="${this.selectedArticle.image}" alt="${this.selectedArticle.title}" class="w-full h-full object-cover">
                </div>

                <div class="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  ${(this.selectedArticle.content || []).map(p => `<p>${p}</p>`).join('')}
                </div>

                <div class="mt-8 p-5 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 class="text-xs font-bold text-indigo-950">Ready to test these techniques?</h4>
                    <p class="text-[11px] text-indigo-800">Take our diagnostic exam to evaluate your baseline percentile.</p>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <button onclick="BlogModule.closeArticle(); navigate('courses')" class="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs rounded-xl shadow-2xs transition cursor-pointer">
                      View Courses
                    </button>
                    <button onclick="BlogModule.closeArticle(); openExam()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer">
                      Launch Adaptive Mock
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    refreshScrollReveal();
  }
};

function render_blog() {
  BlogModule.render();
}

window.BlogModule = BlogModule;
window.render_blog = render_blog;
