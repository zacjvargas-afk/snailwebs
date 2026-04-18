import { useState, useMemo } from 'react';
import Header from './components/Header.jsx';
import GameCard from './components/GameCard.jsx';
import GameModal from './components/GameModal.jsx';
import gamesData from './data/games.json';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

  const categories = useMemo(() => {
    const cats = gamesData.map(g => g.category);
    return ['All', ...Array.from(new Set(cats))];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-vault-bg selection:bg-vault-accent selection:text-vault-bg">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Categories Bar */}
        <div className="mb-10 flex flex-wrap gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all font-mono
                ${selectedCategory === cat 
                  ? 'border-vault-accent bg-vault-accent text-vault-bg shadow-[0_0_10px_rgba(0,255,102,0.3)]' 
                  : 'border-vault-line bg-vault-card text-vault-muted hover:border-vault-muted hover:text-vault-text'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        {!searchQuery && selectedCategory === 'All' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-12 overflow-hidden rounded-2xl border border-vault-line bg-[#0c0c10] p-8 md:p-12"
          >
            <div className="relative z-10 max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-vault-accent/30 bg-vault-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-vault-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-vault-accent" />
                New Games Available
              </div>
              <h1 className="mb-4 font-mono text-4xl font-extrabold tracking-tighter text-vault-text md:text-6xl uppercase">
                Unlock the <span className="text-vault-accent italic">Vault.</span>
              </h1>
              <p className="mb-8 text-lg text-vault-muted font-sans leading-relaxed">
                Access a curated terminal of high-performance, unblocked web games. 
                Zero latency, zero restrictions, pure arcade experience.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => document.getElementById('games-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-lg bg-vault-accent px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest text-vault-bg transition-transform hover:scale-105 active:scale-95"
                >
                  Browse Collection
                </button>
              </div>
            </div>
            
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
              <div className="h-full w-full bg-gradient-to-l from-vault-accent/20 to-transparent" />
            </div>
            <div className="scanline" />
          </motion.div>
        )}

        {/* Games Grid */}
        <div id="games-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={setActiveGame}
                />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-vault-line text-vault-muted">
                  ?
                </div>
                <h3 className="font-mono text-xl text-vault-text">NO_GAMES_FOUND</h3>
                <p className="text-vault-muted">Try adjusting your search or category filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <GameModal
        game={activeGame}
        onClose={() => setActiveGame(null)}
      />

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-vault-accent/5 blur-[120px]" />
        <div className="absolute -right-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <footer className="mt-20 border-t border-vault-line py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-vault-muted">
            &copy; 2026 GAMEVAULT INDUSTRIES // DISCRETE ARCADE TERMINAL // V1.0.4-STABLE
          </p>
        </div>
      </footer>
    </div>
  );
}
