let games = [];
let filteredGames = [];
let searchQuery = '';
let selectedCategory = 'All';

async function init() {
  try {
    const response = await fetch('./src/data/games.json');
    games = await response.json();
    renderCategories();
    updateFilteredGames();
  } catch (error) {
    console.error('Failed to load games:', error);
  }

  // Search Listener
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    updateFilteredGames();
  });

  // Modal Close Listener
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', closeModal);
}

function renderCategories() {
  const categories = ['All', ...new Set(games.map(g => g.category))];
  const container = document.getElementById('categories-container');
  
  container.innerHTML = categories.map(cat => `
    <button
      class="cat-btn rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all font-mono
      ${selectedCategory === cat 
        ? 'border-vault-accent bg-vault-accent text-vault-bg shadow-[0_0_10px_rgba(0,255,102,0.3)]' 
        : 'border-vault-line bg-vault-card text-vault-muted hover:border-vault-muted hover:text-vault-text'}"
      data-category="${cat}"
    >
      ${cat}
    </button>
  `).join('');

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      renderCategories();
      updateFilteredGames();
    });
  });
}

function updateFilteredGames() {
  filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery) || 
                          game.description.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderGames();
  updateHeroVisibility();
}

function renderGames() {
  const container = document.getElementById('games-grid');
  
  if (filteredGames.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 text-center">
        <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-vault-line text-vault-muted">?</div>
        <h3 class="font-mono text-xl text-vault-text uppercase">NO_GAMES_FOUND</h3>
        <p class="text-vault-muted">Try adjusting your search or filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredGames.map(game => `
    <div class="group relative overflow-hidden rounded-xl border border-vault-line bg-vault-card transition-all hover:border-vault-accent/50 cursor-pointer" onclick="openGame('${game.id}')">
      <div class="aspect-video relative overflow-hidden">
        <img src="${game.thumbnail}" alt="${game.title}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer">
        <div class="absolute inset-0 bg-gradient-to-t from-vault-bg/90 to-transparent opacity-60"></div>
        <div class="absolute inset-0 flex items-center justify-center bg-vault-bg/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-vault-accent text-vault-bg shadow-[0_0_20px_rgba(0,255,102,0.5)]">
            <svg class="h-8 w-8 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="absolute left-3 top-3">
          <span class="rounded-md border border-vault-line bg-vault-bg/80 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-vault-accent backdrop-blur-sm">${game.category}</span>
        </div>
      </div>
      <div class="p-4">
        <div class="mb-2 flex items-center justify-between">
          <h3 class="font-mono text-lg font-bold text-vault-text group-hover:text-vault-accent transition-colors uppercase">${game.title}</h3>
          <div class="flex items-center gap-1 text-[10px] font-mono text-vault-accent">
            <svg class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            ${game.stats.rating}
          </div>
        </div>
        <p class="line-clamp-2 text-sm text-vault-muted font-sans">${game.description}</p>
        <div class="mt-4 flex items-center gap-4 text-[11px] font-mono text-vault-muted border-t border-vault-line pt-3">
          <div class="flex items-center gap-1 uppercase">PLAYS: ${game.stats.plays}</div>
        </div>
      </div>
      <div class="scanline"></div>
    </div>
  `).join('');
}

function updateHeroVisibility() {
  const hero = document.getElementById('hero-section');
  if (searchQuery === '' && selectedCategory === 'All') {
    hero.classList.remove('hidden');
  } else {
    hero.classList.add('hidden');
  }
}

function openGame(gameId) {
  const game = games.find(g => g.id === gameId);
  if (!game) return;

  const modal = document.getElementById('game-modal');
  const iframe = document.getElementById('game-iframe');
  const title = document.getElementById('modal-title');

  title.innerText = game.title.toUpperCase();
  iframe.src = game.iframeUrl;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('game-modal');
  const iframe = document.getElementById('game-iframe');
  iframe.src = '';
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

window.initGameVault = init;
document.addEventListener('DOMContentLoaded', init);
