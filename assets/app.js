
const App = {
  state: {
    route: 'home',
    posts: [], news: [], works: [], books: [], events: [], users: []
  },
  routes: ['home','artikel','news','karya','resensi','event','perpus','komunitas','tentang','kontak'],
  async init(){
    // Routing
    document.querySelectorAll('[data-link]').forEach(a => {
      a.addEventListener('click', (e)=>{
        const r = e.target.getAttribute('data-link')
        if(!r) return
        e.preventDefault()
        this.go(r)
      })
    })
    window.onpopstate = ()=>{
      const hash = location.hash.replace('#','')
      this.state.route = this.routes.includes(hash) ? hash : 'home'
      this.render()
    }

    // Load data
    const [posts, news, works, books, events, users] = await Promise.all([
      fetch('data/posts.json').then(r=>r.json()),
      fetch('data/news.json').then(r=>r.json()),
      fetch('data/works.json').then(r=>r.json()),
      fetch('data/books.json').then(r=>r.json()),
      fetch('data/events.json').then(r=>r.json()),
      fetch('data/users.json').then(r=>r.json()),
    ])
    this.state.posts = posts
    this.state.news = news
    this.state.works = works
    this.state.books = books
    this.state.events = events
    this.state.users = users

    // Init route
    const hash = location.hash.replace('#','')
    this.state.route = this.routes.includes(hash) ? hash : 'home'
    this.render()
    document.getElementById('year').textContent = new Date().getFullYear()
  },
  go(route){
    if(!this.routes.includes(route)) route = 'home'
    history.pushState({}, '', `#${route}`)
    this.state.route = route
    this.render()
  },
  render(){
    const el = document.getElementById('app')
    const r = this.state.route
    if(r==='home') return el.innerHTML = this.viewHome()
    if(r==='artikel') return el.innerHTML = this.viewArtikel()
    if(r==='news') return el.innerHTML = this.viewNews()
    if(r==='karya') return el.innerHTML = this.viewKarya()
    if(r==='resensi') return el.innerHTML = this.viewResensi()
    if(r==='event') return el.innerHTML = this.viewEvent()
    if(r==='perpus') return el.innerHTML = this.viewPerpus()
    if(r==='komunitas') return el.innerHTML = this.viewKomunitas()
    if(r==='tentang') return el.innerHTML = this.viewTentang()
    if(r==='kontak') return el.innerHTML = this.viewKontak()
  },
  // Views
  viewHome(){
    const trending = this.state.posts.slice(0,3).map(p=>`
      <a class="item" data-link="artikel" onclick="App.go('artikel')">
        <div class="badge">${p.category}</div>
        <h3>${p.title}</h3>
        <div class="meta">${p.date} • ${p.author}</div>
      </a>
    `).join('')
    const news = this.state.news.slice(0,4).map(n=>`
      <div class="item">
        <div class="badge">News</div>
        <strong>${n.title}</strong>
        <div class="meta">${n.date}</div>
      </div>
    `).join('')
    return `
      <section class="hero">
        <div class="hero-card">
          <span class="kicker">Platform Literasi Modern</span>
          <h1>Bangun kebiasaan membaca & menulis dengan komunitas yang hidup.</h1>
          <p>Artikel, news, karya tulis, resensi, tantangan membaca, dan event—semua di satu tempat.</p>
          <div style="display:flex;gap:10px;margin-top:10px">
            <a class="btn primary" onclick="App.go('artikel')">Mulai Baca</a>
            <a class="btn ghost" onclick="App.go('karya')">Kirim Karya</a>
          </div>
        </div>
        <div class="grid">
          <div class="card">
            <div class="section-title"><h3>Trending Hari Ini</h3><a onclick="App.go('artikel')">Lihat semua →</a></div>
            <div class="list">${trending}</div>
          </div>
          <div class="card">
            <div class="section-title"><h3>News & Update</h3><a onclick="App.go('news')">Semua news →</a></div>
            <div class="list">${news}</div>
          </div>
        </div>
      </section>
    `
  },
  viewArtikel(){
    const search = `<div class="search"><input placeholder="Cari artikel..." oninput="App.filterList(this.value,'posts')"/></div>`
    const list = this.state.posts.map(p=>`
      <div class="item">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="badge">${p.category}</div>
          <div class="meta">${p.date} • ${p.author}</div>
        </div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <a class="btn ghost" href="${p.url}" target="_blank" rel="noopener">Baca selengkapnya</a>
      </div>
    `).join('')
    return `<section><div class="section-title"><h2>Artikel</h2></div>${search}<div id="list-posts" class="grid">${list}</div></section>`
  },
  viewNews(){
    const list = this.state.news.map(n=>`
      <div class="item">
        <strong>${n.title}</strong>
        <div class="meta">${n.date}</div>
        <p>${n.excerpt}</p>
      </div>
    `).join('')
    return `<section><div class="section-title"><h2>News</h2></div><div class="grid">${list}</div></section>`
  },
  viewKarya(){
    const list = this.state.works.map(w=>`
      <div class="item">
        <div class="badge">${w.type}</div>
        <h3>${w.title}</h3>
        <div class="meta">${w.author} • ${w.date}</div>
        <p>${w.excerpt}</p>
      </div>
    `).join('')
    return `<section><div class="section-title"><h2>Karya Tulis</h2><a class="btn ghost" onclick="alert('Form upload karya bisa diintegrasikan ke Google Forms / Netlify Forms / API nanti.')">Kirim Karya</a></div><div class="grid">${list}</div></section>`
  },
  viewResensi(){
    const list = this.state.books.map(b=>`
      <div class="item">
        <div class="badge">Buku</div>
        <h3>${b.title}</h3>
        <div class="meta">${b.author} • Rating ${b.rating}/5</div>
        <p>${b.review}</p>
      </div>
    `).join('')
    return `<section><div class="section-title"><h2>Resensi Buku</h2></div><div class="grid">${list}</div></section>`
  },
  viewEvent(){
    const list = this.state.events.map(e=>`
      <div class="item">
        <div class="badge">Event</div>
        <h3>${e.title}</h3>
        <div class="meta">${e.date} • ${e.location}</div>
        <p>${e.desc}</p>
        <a class="btn ghost" href="${e.link}" target="_blank" rel="noopener">Daftar</a>
      </div>
    `).join('')
    return `<section><div class="section-title"><h2>Event & Challenge</h2><a class="btn ghost" onclick="alert('Leaderboard & badge bisa ditambahkan di versi lanjutan.')">Lihat Leaderboard</a></div><div class="grid">${list}</div></section>`
  },
  viewPerpus(){
    const list = this.state.posts.slice(0,6).map(p=>`
      <div class="item">
        <div class="badge">E-Artikel</div>
        <h3>${p.title}</h3>
        <a class="btn ghost" href="${p.url}" target="_blank" rel="noopener">Buka</a>
      </div>
    `).join('')
    return `<section><div class="section-title"><h2>Perpustakaan Digital</h2><span class="meta">Koleksi bacaan pilihan & domain publik.</span></div><div class="grid">${list}</div></section>`
  },
  viewKomunitas(){
    const list = this.state.users.map(u=>`
      <div class="item">
        <div class="badge">Kontributor</div>
        <strong>${u.name}</strong>
        <div class="meta">${u.role}</div>
        <p>${u.bio}</p>
      </div>
    `).join('')
    return `<section><div class="section-title"><h2>Komunitas & Kontributor</h2><a class="btn ghost" onclick="alert('Login/akun bisa ditambahkan via Firebase/Auth later.')">Gabung</a></div><div class="grid">${list}</div></section>`
  },
  viewTentang(){
    return `<section class="grid">
      <div class="card">
        <span class="kicker">Tentang</span>
        <h2>LiterasiKita</h2>
        <p>Gerakan literasi digital yang menghadirkan konten berkualitas, komunitas aktif, dan tantangan membaca—agar kebiasaan literasi tumbuh menyenangkan.</p>
        <ul>
          <li>Konten kurasi: artikel, news, karya, resensi.</li>
          <li>Komunitas dan event berkala.</li>
          <li>Ramah diakses di perangkat apapun.</li>
        </ul>
      </div>
      <div class="card">
        <h3>Roadmap</h3>
        <ul>
          <li>Badge & gamifikasi</li>
          <li>Profil penulis & kirim karya terintegrasi</li>
          <li>Newsletter mingguan</li>
        </ul>
      </div>
    </section>`
  },
  viewKontak(){
    return `<section class="grid">
      <div class="card">
        <h2>Kontak</h2>
        <p>Email: <a href="mailto:hello@literasikita.org">hello@literasikita.org</a></p>
        <p>Instagram: <a href="https://instagram.com/literasikita" target="_blank" rel="noopener">@literasikita</a></p>
        <form onsubmit="event.preventDefault(); alert('Terkirim! (Integrasi form bisa ditambahkan)')">
          <div class="grid" style="grid-template-columns:1fr 1fr">
            <input placeholder="Nama" required />
            <input placeholder="Email" type="email" required />
          </div>
          <textarea placeholder="Pesan" style="width:100%;height:120px;margin-top:10px" required></textarea>
          <div style="margin-top:10px"><button class="btn primary" type="submit">Kirim</button></div>
        </form>
      </div>
    </section>`
  },
  filterList(q, which){
    q = (q||'').toLowerCase()
    const key = which==='posts' ? 'list-posts' : ''
    const listEl = document.getElementById(key)
    if(!listEl) return
    const html = this.state.posts
      .filter(p=> (p.title+p.excerpt+p.category+p.author).toLowerCase().includes(q))
      .map(p=>`
        <div class="item">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div class="badge">${p.category}</div>
            <div class="meta">${p.date} • ${p.author}</div>
          </div>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <a class="btn ghost" href="${p.url}" target="_blank" rel="noopener">Baca selengkapnya</a>
        </div>
      `).join('')
    listEl.innerHTML = html
  }
}
window.addEventListener('DOMContentLoaded', ()=> App.init())
