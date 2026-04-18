import { X, Maximize2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GameModal({ game, onClose }) {
  if (!game) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 lg:p-8"
      >
        <div className="absolute inset-0 bg-vault-bg/95 backdrop-blur-xl" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-vault-line bg-vault-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-vault-line bg-vault-bg/50 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-vault-accent/10 text-vault-accent border border-vault-accent/20">
                <div className="h-4 w-4 rounded-full bg-vault-accent neon-glow animate-pulse" />
              </div>
              <div>
                <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-vault-text">
                  {game.title}
                </h2>
                <p className="text-[10px] font-mono text-vault-muted">SESSION_ACTIVE</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => { window.location.reload(); }}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-vault-line text-vault-text hover:bg-vault-line transition-colors"
                title="Refresh Session"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button 
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-vault-line text-vault-text hover:bg-vault-line transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all transform active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="relative flex-1 bg-black">
            <iframe
              src={game.iframeUrl}
              className="h-full w-full border-none"
              title={game.title}
              allowFullScreen
              referrerPolicy="no-referrer"
            />
            <div className="scanline" />
          </div>

          {/* Footer Info */}
          <div className="border-t border-vault-line bg-vault-bg/50 px-6 py-4 backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] font-mono text-vault-muted">
              <div className="flex gap-6">
                <span>VER: 1.0.4</span>
                <span>ENC: AES-256</span>
                <span>LOC: US-EAST</span>
              </div>
              <div className="text-vault-accent">SECURE_BY_VAULT</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
