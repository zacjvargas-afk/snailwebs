import { Search, Gamepad2, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-vault-line bg-vault-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vault-accent/10 text-vault-accent border border-vault-accent/20 neon-glow">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <span className="hidden text-xl font-bold tracking-tighter text-vault-text sm:block uppercase font-mono">
            Game<span className="text-vault-accent">Vault</span>
          </span>
        </motion.div>

        <div className="flex flex-1 items-center justify-center px-4 md:px-20">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-vault-muted" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full border border-vault-line bg-vault-card px-10 text-sm placeholder:text-vault-muted focus:border-vault-accent focus:outline-none focus:ring-1 focus:ring-vault-accent transition-all font-mono"
            />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <button className="text-vault-muted hover:text-vault-accent transition-colors">
            <Info className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </header>
  );
}
