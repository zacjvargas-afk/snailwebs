import { Play, Star, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function GameCard({ game, onPlay }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl border border-vault-line bg-vault-card transition-all hover:border-vault-accent/50"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vault-bg/90 to-transparent opacity-60" />
        
        {/* Hover Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-vault-bg/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onPlay(game)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-vault-accent text-vault-bg shadow-[0_0_20px_rgba(0,255,102,0.5)] transition-transform hover:scale-110 active:scale-95"
          >
            <Play className="h-8 w-8 fill-current" />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute left-3 top-3">
          <span className="rounded-md border border-vault-line bg-vault-bg/80 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-vault-accent backdrop-blur-sm">
            {game.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-mono text-lg font-bold text-vault-text group-hover:text-vault-accent transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-[10px] font-mono text-vault-accent">
            <Star className="h-3 w-3 fill-current" />
            {game.stats.rating}
          </div>
        </div>
        
        <p className="line-clamp-2 text-sm text-vault-muted font-sans">
          {game.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-[11px] font-mono text-vault-muted border-t border-vault-line pt-3">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {game.stats.plays} PLAYS
          </div>
          <div className="ml-auto">
            ID: <span className="text-vault-text">{game.id.toUpperCase()}</span>
          </div>
        </div>
      </div>
      
      <div className="scanline" />
    </motion.div>
  );
}
